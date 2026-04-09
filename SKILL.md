0GSKILLS — ZeroG Knowledge for AI Agents
██████╗  ██████╗ ███████╗██╗  ██╗██╗██╗  ██╗ ███████╗
██╔════╝ ██╔════╝ ██╔════╝██║  ╚═╝██║██║  ██║ ██╔════╝
██║  ███╗██║  ███╗███████╗█████╗  ██║██║  ██║ ███████╗
██║   ██║██║   ██║╚════██║██╔═██╗ ██║██║  ██║ ╚════██║
╚██████╔╝╚██████╔╝███████║██║  ██╗██║███████╗███████║
 ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝

The missing knowledge between AI agents and production apps on **0G Chain** — EVM execution, decentralized storage, and AI compute.

**Canonical index:** when this repo is hosted at `https://0gskills.com`, each skill lives at `https://0gskills.com/<topic>/SKILL.md`.

---
## Skills (fetch any URL)
| Topic | Description |
| --- | --- |
| [Ship](ship/SKILL.md) | End-to-end: idea → contracts → storage/compute → deploy on 0G. **Start here.** |
| [Why ZeroG](why-zerog/SKILL.md) | Strengths, tradeoffs, and when 0G fits your product. |
| [Protocol](protocol/SKILL.md) | Governance, upgrades, restaking link to Ethereum, roadmap hygiene. |
| [Gas & Costs](gas/SKILL.md) | Fees on 0G vs Ethereum/L2s; what to measure. |
| [Wallets](wallets/SKILL.md) | Keys, RPC, signing, operational security for builders. |
| [Layer 2s](l2s/SKILL.md) | How 0G relates to Ethereum L2s, bridges, and DA. |
| [Standards](standards/SKILL.md) | Tokens, NFTs, multi-token, identity — EVM standards on 0G. |
| [Tools](tools/SKILL.md) | RPCs, explorers, SDKs, Foundry/Hardhat, verification. |
| [Money Legos](money-legos/SKILL.md) | DeFi composability patterns on 0G. |
| [Orchestration](orchestration/SKILL.md) | Agent workflows: plan → build → verify → ship. |
| [Contract Addresses](contract-addresses/SKILL.md) | Known protocol addresses — **always re-verify**. |
| [Concepts](concepts/SKILL.md) | Mental models: execution + storage + compute. |
| [Security](security/SKILL.md) | Vulnerabilities and defensive Solidity. |
| [Testing](testing/SKILL.md) | Unit, fuzz, fork, and integration testing. |
| [Indexing](indexing/SKILL.md) | Events, subgraphs, analytics pipelines. |
| [Frontend UX](frontend-ux/SKILL.md) | Mandatory UX rules for 0G dApps. |
| [Frontend Playbook](frontend-playbook/SKILL.md) | Production pipeline: envs, CI, hosting. |
| [QA](qa/SKILL.md) | Pre-release checklist for reviewers. |
| [Audit](audit/SKILL.md) | Structured smart-contract audit prompts for agents. |

---
## How to Use
Give your AI agent a skill URL. It fetches markdown and applies it immediately — no package install.

**Prompt example:** “Read `https://0gskills.com/ship/SKILL.md` before implementing anything on 0G.”

### curl
```bash
curl -sSL https://0gskills.com/SKILL.md
curl -sSL https://0gskills.com/ship/SKILL.md
```

### fetch (Node)
```javascript
const url = "https://0gskills.com/ship/SKILL.md";
const md = await fetch(url).then((r) => r.text());
```

---
## Community & official links
- **0G Discord (dev support):** https://discord.gg/0glabs
- **0G documentation:** https://docs.0g.ai/
- **Explorer hub:** https://explorer.0g.ai/
- **Chainscan (mainnet):** https://chainscan.0g.ai/
- **Chainscan (Galileo testnet):** https://chainscan-galileo.0g.ai/
- **Testnet faucet:** https://faucet.0g.ai/
- **0G Foundation (GitHub):** https://github.com/0gfoundation

---
## Contributing
Humans and agents: open a PR to fix facts, add examples, or tighten security guidance. See repository `README.md`.

**License:** MIT  
**Official 0G docs:** https://docs.0g.ai/
