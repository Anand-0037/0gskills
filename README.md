# 0Gskills.com

**The missing layer between AI agents and 0G apps** — modular `SKILL.md` guides for [0G Chain](https://docs.0g.ai/) (EVM, storage, compute). Includes [`robots.txt`](robots.txt) and [`sitemap.xml`](sitemap.xml) for crawlers.

## How it works

- Each topic is a **standalone** `SKILL.md` under its own directory (for example `ship/SKILL.md`).
- Agents and humans fetch raw markdown over HTTP — no install required.
- Content is sourced from and aligned with [official 0G documentation](https://docs.0g.ai/) where possible; **verify** addresses, chain IDs, and RPC URLs against current docs before production use.

## Local preview

Serve the repo root as static files:

```bash
cd /path/to/0gskills.com
python3 -m http.server 8080
```

Then open `http://localhost:8080/SKILL.md` or any skill path.

## Deploy (Vercel)

This repo is mostly **static** (markdown skills, `index.html`, assets) plus **Vercel Edge** routes in `api/`. No npm build step is required for deploy.

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), **Import** the project — framework **Other**, root **`/`**, output **`.`** (default static).
3. `vercel.json` sets **`Content-Type: text/markdown; charset=utf-8`** for `*.md` and **`Access-Control-Allow-Origin: *`** so agents and browsers can fetch skills cleanly.
4. Add your domain (e.g. `0gskills.com`) under Project → **Domains** and follow DNS instructions.
5. Optional: turn on **Vercel Web Analytics** in the project so `/_vercel/insights/script.js` (already referenced in `index.html`) collects traffic. Or swap in [Plausible](https://plausible.io/) / other analytics if you prefer.

After deploy: `https://<your-domain>/SKILL.md`, `https://<your-domain>/ship/SKILL.md`, plus `robots.txt` and `sitemap.xml` at the site root.

Vercel also deploys **Edge Functions** under `api/` (no separate backend). Same repo, same domain.

## Agent API (JSON + search)

Structured responses for IDEs and agents (CORS `*`, CDN-friendly caching on success):

```bash
# Structured skill (parsed sections + internal .md links)
curl -sS "https://0gskills.com/api/skill?topic=ship"

# Raw markdown passthrough (same files as static hosting)
curl -sS "https://0gskills.com/api/skill?topic=ship&format=markdown"

# Root index as JSON (topic=index)
curl -sS "https://0gskills.com/api/skill?topic=index"

# Follow cross-links: include summaries of linked skills (max 8)
curl -sS "https://0gskills.com/api/skill?topic=ship&depth=2"

# Keyword search over topic titles/descriptions (lightweight, no vector DB)
curl -sS "https://0gskills.com/api/search?q=deploy%20contract"
```

Example in JavaScript:

```js
const r = await fetch("https://0gskills.com/api/skill?topic=ship");
const skill = await r.json();
// skill.title, skill.summary, skill.sections[], skill.links[]
```

Local preview of APIs: install [Vercel CLI](https://vercel.com/docs/cli) and run `vercel dev` from the repo root (plain `python -m http.server` will **not** run `/api/*`).

### Cursor prompt (copy-paste to extend this layer)

Use when you want the assistant to evolve the agent API without breaking static markdown:

> **Task:** Improve the 0GSKILLS agent API in this repo (`api/skill.js`, `api/search.js`, `api/_skillCore.js`). Constraints: stay on **Vercel Edge** (no new servers, no auth, no database). Keep all existing `*/SKILL.md` URLs and content working unchanged.  
> **Goals:** (1) Extend `/api/skill` only if needed — e.g. optional `format`, `depth`, or richer JSON fields — document new query params in README and `llms.txt`. (2) Improve `/api/search` relevance (still keyword-based) or add optional `limit` — avoid heavy dependencies. (3) Add `Access-Control-Allow-Origin: *` on all API responses and handle `OPTIONS`. (4) Do not cache HTTP error responses aggressively. (5) After changes, run `node --check` on touched files and update `.github/workflows/verify.yml` if you add required paths.

## Community

- [0G Discord](https://discord.gg/0glabs) — developer support and network updates  
- [0G Labs on X](https://x.com/0G_labs) — announcements and ecosystem updates  
- [0G documentation](https://docs.0g.ai/) — canonical chain, RPC, and contract details  

## Contributing

Corrections and new sections are welcome via pull request. Keep each skill self-contained, link to authoritative 0G docs, and note when values are testnet-specific or may change.

## License

MIT — see [LICENSE](LICENSE).
