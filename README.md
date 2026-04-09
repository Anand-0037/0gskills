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

This repo is a **static** site: markdown skills, `index.html`, and assets. No build step is required.

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), **Import** the project — framework **Other**, root **`/`**, output **`.`** (default static).
3. `vercel.json` sets **`Content-Type: text/markdown; charset=utf-8`** for `*.md` and **`Access-Control-Allow-Origin: *`** so agents and browsers can fetch skills cleanly.
4. Add your domain (e.g. `0gskills.com`) under Project → **Domains** and follow DNS instructions.
5. Optional: turn on **Vercel Web Analytics** in the project so `/_vercel/insights/script.js` (already referenced in `index.html`) collects traffic. Or swap in [Plausible](https://plausible.io/) / other analytics if you prefer.

After deploy: `https://<your-domain>/SKILL.md`, `https://<your-domain>/ship/SKILL.md`, plus `robots.txt` and `sitemap.xml` at the site root.

## Community

- [0G Discord](https://discord.gg/0glabs) — developer support and network updates  
- [0G Labs on X](https://x.com/0G_labs) — announcements and ecosystem updates  
- [0G documentation](https://docs.0g.ai/) — canonical chain, RPC, and contract details  

## Contributing

Corrections and new sections are welcome via pull request. Keep each skill self-contained, link to authoritative 0G docs, and note when values are testnet-specific or may change.

## License

MIT — see [LICENSE](LICENSE).
