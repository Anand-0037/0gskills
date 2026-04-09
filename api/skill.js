import {
  ALLOWED_TOPICS,
  CACHE_HEADERS,
  CORS_HEADERS,
  extractMdLinks,
  pickSummary,
  pickTitle,
  skillPathForTopic,
  splitSections,
  stripFrontmatter,
  topicFromInternalPath,
} from './_skillCore.js';

export const config = { runtime: 'edge' };

function json(data, status = 200, extra = {}) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...CORS_HEADERS,
    ...extra,
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
  const topicRaw = (url.searchParams.get('topic') || 'index').trim().toLowerCase();
  const format = (url.searchParams.get('format') || 'json').toLowerCase();
  const depth = Math.min(4, Math.max(0, parseInt(url.searchParams.get('depth') || '0', 10) || 0));

  if (!ALLOWED_TOPICS.has(topicRaw)) {
    return json(
      {
        error: 'not_found',
        message: `Unknown topic "${topicRaw}".`,
        topics: [...ALLOWED_TOPICS].sort(),
      },
      404,
    );
  }

  const origin = url.origin;
  const mdPath = skillPathForTopic(topicRaw);
  const mdUrl = `${origin}${mdPath}`;

  let mdText;
  try {
    const r = await fetch(mdUrl, {
      headers: { Accept: 'text/markdown, text/plain, */*' },
    });
    if (!r.ok) {
      return json(
        {
          error: 'upstream_error',
          message: `Could not load ${mdPath} (${r.status}).`,
          topic: topicRaw,
        },
        r.status === 404 ? 404 : 502,
      );
    }
    mdText = await r.text();
  } catch {
    return json(
      { error: 'fetch_failed', message: 'Failed to reach static markdown.', topic: topicRaw },
      502,
    );
  }

  if (format === 'markdown' || format === 'md') {
    return new Response(mdText, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        ...CORS_HEADERS,
        ...CACHE_HEADERS,
      },
    });
  }

  if (format !== 'json') {
    return json(
      { error: 'bad_request', message: 'Supported format values: json, markdown.', topic: topicRaw },
      400,
    );
  }

  const { fm, body } = stripFrontmatter(mdText);
  const title = pickTitle(body, fm, topicRaw);
  const { introText, sections } = splitSections(body);
  const summary = pickSummary(body, fm, introText);
  const links = extractMdLinks(mdText);

  /** @type {Record<string, unknown>} */
  const payload = {
    topic: topicRaw,
    title,
    summary,
    markdownUrl: mdUrl,
    apiUrl: `${origin}/api/skill?topic=${encodeURIComponent(topicRaw)}&format=json`,
    sections,
    links,
    depth,
  };

  if (depth >= 2) {
    const relatedTopics = [];
    for (const href of links) {
      const t = topicFromInternalPath(href);
      if (!t || t === topicRaw || !ALLOWED_TOPICS.has(t)) continue;
      if (relatedTopics.includes(t)) continue;
      relatedTopics.push(t);
      if (relatedTopics.length >= 8) break;
    }

    const related = await Promise.all(
      relatedTopics.map(async (t) => {
        const p = skillPathForTopic(t);
        try {
          const r = await fetch(`${origin}${p}`, { headers: { Accept: 'text/markdown, */*' } });
          if (!r.ok) return { topic: t, title: t, summary: '', error: r.status };
          const raw = await r.text();
          const { fm: rFm, body: rBody } = stripFrontmatter(raw);
          const { introText: introR, sections: secR } = splitSections(rBody);
          return {
            topic: t,
            title: pickTitle(rBody, rFm, t),
            summary: pickSummary(rBody, rFm, introR),
            previewSectionCount: secR.length,
            markdownUrl: `${origin}${p}`,
          };
        } catch {
          return { topic: t, title: t, summary: '', error: 'fetch_failed' };
        }
      }),
    );
    payload.related = related;
  }

  return json(payload, 200);
}
