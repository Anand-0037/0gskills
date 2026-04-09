/**
 * Shared helpers for Edge routes /api/skill and /api/search.
 * Underscore prefix: not deployed as its own Vercel function.
 */

export const ALLOWED_TOPICS = new Set([
  'index',
  'ship',
  'why-zerog',
  'protocol',
  'gas',
  'wallets',
  'l2s',
  'standards',
  'tools',
  'money-legos',
  'orchestration',
  'contract-addresses',
  'concepts',
  'security',
  'testing',
  'indexing',
  'frontend-ux',
  'frontend-playbook',
  'qa',
  'audit',
  'audit-wallets',
  'audit-storage',
  'audit-indexing',
  'audit-orchestration',
  'audit-frontend',
]);

/** Lightweight search corpus (topic metadata); keep in sync with topic SKILL.md frontmatter. */
export const SKILL_SEARCH_INDEX = [
  {
    topic: 'index',
    title: '0GSKILLS',
    description:
      'Modular SKILL.md index for 0G Chain — agents fetch markdown over HTTPS. Canonical table of all topics.',
  },
  {
    topic: 'ship',
    title: 'Ship',
    description: 'End-to-end path from idea to production on 0G Chain.',
  },
  {
    topic: 'why-zerog',
    title: 'Why ZeroG',
    description: 'When 0G Chain is the right foundation, and honest tradeoffs.',
  },
  {
    topic: 'protocol',
    title: 'Protocol',
    description: 'How 0G evolves, how it connects to Ethereum, and how to stay current.',
  },
  {
    topic: 'gas',
    title: 'Gas & Costs',
    description: 'How to think about fees on 0G vs Ethereum and L2s.',
  },
  {
    topic: 'wallets',
    title: 'Wallets',
    description: 'Keys, accounts, and safe signing for 0G builders and agents.',
  },
  {
    topic: 'l2s',
    title: 'Layer 2s',
    description: 'How 0G relates to Ethereum rollups, bridges, and data availability.',
  },
  {
    topic: 'standards',
    title: 'Standards',
    description: 'Token, NFT, and identity patterns on 0G’s EVM layer.',
  },
  {
    topic: 'tools',
    title: 'Tools',
    description: 'Frameworks, RPCs, explorers, and SDKs for 0G.',
  },
  {
    topic: 'money-legos',
    title: 'Money Legos',
    description: 'DeFi composability on 0G’s EVM layer.',
  },
  {
    topic: 'orchestration',
    title: 'Orchestration',
    description: 'How AI agents should plan, execute, and verify multi-step 0G dApps.',
  },
  {
    topic: 'contract-addresses',
    title: 'Contract Addresses',
    description:
      'Known precompiles, contracts, and network endpoints — verify on Chainscan before production.',
  },
  {
    topic: 'concepts',
    title: 'Concepts',
    description: 'Mental models for building on 0G.',
  },
  {
    topic: 'security',
    title: 'Security',
    description: 'Vulnerabilities and defensive coding for Solidity on 0G.',
  },
  {
    topic: 'testing',
    title: 'Testing',
    description: 'Unit, fuzz, fork, and integration testing for 0G contracts and apps.',
  },
  {
    topic: 'indexing',
    title: 'Indexing',
    description: 'Querying 0G chain data responsibly (events, subgraphs, analytics).',
  },
  {
    topic: 'frontend-ux',
    title: 'Frontend UX',
    description: 'Mandatory UX rules for 0G dApps (EVM + wallet flows).',
  },
  {
    topic: 'frontend-playbook',
    title: 'Frontend Playbook',
    description: 'Production pipeline for 0G web apps.',
  },
  {
    topic: 'qa',
    title: 'QA',
    description: 'Checklist for reviewing a 0G dApp before release.',
  },
  {
    topic: 'audit',
    title: 'Audit',
    description: 'Structured smart-contract review prompts for AI agents (0G / EVM).',
  },
  {
    topic: 'audit-wallets',
    title: 'Audit: Wallets',
    description: 'Security checklist for keys, signing, and agent isolation on 0G.',
  },
  {
    topic: 'audit-storage',
    title: 'Audit: Storage',
    description: 'Verifying data availability, blob integrity, and storage SDK safety.',
  },
  {
    topic: 'audit-indexing',
    title: 'Audit: Indexing',
    description: 'Ensuring consistency across event logs, subgraphs, and offchain state.',
  },
  {
    topic: 'audit-orchestration',
    title: 'Audit: Orchestration',
    description: 'Validating multi-step agent transaction workflows and failure recovery.',
  },
  {
    topic: 'audit-frontend',
    title: 'Audit: Frontend',
    description: 'UX-level verification for 0G-specific errors and chain switching.',
  },
];

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export function skillPathForTopic(topic) {
  if (topic === 'index') return '/SKILL.md';
  return `/${topic}/SKILL.md`;
}

export function topicFromInternalPath(p) {
  if (p === '/SKILL.md') return 'index';
  const m = String(p).match(/^\/([\w-]+)\/SKILL\.md$/);
  return m ? m[1] : null;
}

export function stripFrontmatter(md) {
  if (!md.startsWith('---\n')) return { fm: {}, body: md };
  const end = md.indexOf('\n---\n', 4);
  if (end === -1) return { fm: {}, body: md };
  const fmRaw = md.slice(4, end);
  const body = md.slice(end + 5);
  return { fm: parseSimpleYaml(fmRaw), body };
}

function parseSimpleYaml(raw) {
  const fm = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    fm[m[1]] = v;
  }
  return fm;
}

export function extractMdLinks(md) {
  const seen = new Set();
  const out = [];
  const re = /\]\((\/[^)]+\.md)\)/g;
  let m;
  while ((m = re.exec(md))) {
    const href = m[1];
    if (!seen.has(href)) {
      seen.add(href);
      out.push(href);
    }
  }
  return out;
}

export function splitSections(body) {
  const lines = body.split('\n');
  /** @type {{ heading: string | null, lines: string[] }[]} */
  const chunks = [];
  let cur = { heading: /** @type {string | null} */ (null), lines: /** @type {string[]} */ ([]) };

  for (const line of lines) {
    const hm = line.match(/^## (.+)$/);
    if (hm) {
      chunks.push(cur);
      cur = { heading: hm[1].trim(), lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  chunks.push(cur);

  const intro = chunks[0].heading === null ? chunks.shift() : null;
  const introText = intro ? intro.lines.join('\n').trim() : '';

  const sections = chunks
    .filter((c) => c.heading)
    .map((c) => ({
      heading: c.heading,
      content: c.lines.join('\n').trim(),
    }));

  return { introText, sections };
}

export function pickTitle(body, fm, topic) {
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  if (fm.name) {
    const n = String(fm.name);
    return n
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return topic === 'index' ? '0GSKILLS' : topic;
}

export function pickSummary(body, fm, introText) {
  if (fm.description) return fm.description;
  const bold = body.match(/\*\*([^*]+)\*\*/);
  if (bold) return bold[1].trim();
  const line = introText.split('\n').find((l) => l.trim());
  return line ? line.replace(/^[-*]\s*/, '').trim() : '';
}

/**
 * @param {string} q
 * @param {{ topic: string, title: string, description: string }} item
 */
export function scoreSearchItem(q, item) {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\w-]/g, ''))
    .filter((t) => t.length > 1);
  if (!terms.length) return 0;

  const hay = `${item.topic} ${item.title} ${item.description}`.toLowerCase();
  const lowerTopic = item.topic.toLowerCase();
  const lowerTitle = item.title.toLowerCase();
  const lowerQ = q.toLowerCase();

  let score = 0;

  // Exact match boosts
  if (lowerTopic === lowerQ) score += 10;
  if (lowerTitle === lowerQ) score += 5;

  for (const t of terms) {
    if (lowerTopic.includes(t)) score += 3;
    if (lowerTitle.includes(t)) score += 2;
    if (hay.includes(t)) score += 1;
  }
  const max = (terms.length * 6) + 10;
  return Math.round((score / max) * 1000) / 1000;
}
