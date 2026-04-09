# 0Gskills

**The missing knowledge layer between AI agents and 0G application builds.**

0Gskills provides modular, machine-readable `SKILL.md` guides for the [0G Chain](https://docs.0g.ai/) ecosystem, covering EVM compatibility, storage orchestration, and decentralized compute.

## Overview

- **Modular Knowledge**: Each topic is a standalone, version-controlled `SKILL.md` guide.
- **Agent-First Design**: Content is optimized for consumption by LLM-based agents and IDEs.
- **Protocol Aligned**: Aligned with official 0G documentation to ensure build accuracy.

## Agent API

The system provides a high-performance, structured API for automated discovery and consumption of 0G skills.

### Endpoints

#### 1. Skill Discovery
Retrieve a specific skill by topic name.

```bash
# Get a specific skill as JSON
curl -sS "https://0gskills.com/api/skill?topic=ship"

# Get only metadata (title, summary) for fast discovery
curl -sS "https://0gskills.com/api/skill?topic=ship&compact=true"

# List all available topics
curl -sS "https://0gskills.com/api/skill?topics=list"
```

#### 2. Deep Context
Follow internal cross-links and include summaries of related skills.

```bash
# Fetch skill with related context (depth=2)
curl -sS "https://0gskills.com/api/skill?topic=ship&depth=2"
```

#### 3. Global Search
Keyword search over all skill titles and descriptions.

```bash
# Search for specific 0G concepts
curl -sS "https://0gskills.com/api/search?q=storage%20provider"
```

### Response Formats

- **JSON (Default)**: Parsed structure with `title`, `summary`, `sections[]`, and `links[]`.
- **Markdown**: Raw `SKILL.md` passthrough via `format=markdown` parameter.

## Local Development

For developers contributing to the 0Gskills knowledge layer:

```bash
# Serve content statically
python3 -m http.server 8080
```

## Contributing

We welcome contributions to the knowledge layer. Please ensure each `SKILL.md` is self-contained and links to authoritative source documentation.

## Community

- **Discord**: [0G Labs Official](https://discord.gg/0glabs)
- **Official Docs**: [docs.0g.ai](https://docs.0g.ai/)

## License

Released under the [MIT License](LICENSE).
