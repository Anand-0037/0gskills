import {
  CACHE_HEADERS,
  CORS_HEADERS,
  SKILL_SEARCH_INDEX,
  scoreSearchItem,
} from './_skillCore.js';

export const config = { runtime: 'edge' };

function json(data, status = 200) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...CORS_HEADERS,
  };
  if (status === 200) Object.assign(headers, CACHE_HEADERS);
  return new Response(JSON.stringify(data), { status, headers });
}

/**
 * @param {Request} request
 */
export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...CORS_HEADERS } });
  }
  if (request.method !== 'GET') {
    return json({ error: 'method_not_allowed', message: 'Use GET.' }, 405);
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
  const limit = Math.min(20, Math.max(1, parseInt(url.searchParams.get('limit') || '8', 10) || 8));

  if (!q) {
    return json(
      {
        error: 'bad_request',
        message: 'Missing query parameter q (e.g. /api/search?q=deploy).',
      },
      400,
    );
  }

  const scored = SKILL_SEARCH_INDEX.map((item) => ({
    topic: item.topic,
    title: item.title,
    description: item.description,
    score: scoreSearchItem(q, item),
  }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const origin = url.origin;
  return json({
    query: q,
    results: scored.map((r) => ({
      topic: r.topic,
      title: r.title,
      score: r.score,
      markdownUrl: `${origin}${r.topic === 'index' ? '/SKILL.md' : `/${r.topic}/SKILL.md`}`,
      apiUrl: `${origin}/api/skill?topic=${encodeURIComponent(r.topic)}&format=json`,
    })),
  });
}
