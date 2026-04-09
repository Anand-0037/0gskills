---
name: audit
description: "Structured smart-contract review prompts for AI agents (0G / EVM)."
---

# Audit

**Audit** — Structured smart-contract review prompts for AI agents (0G / EVM).


Use for **external** or **high-value** codebases. This is **not** a substitute for professional auditors.

---

## How to run an agent audit

1. Freeze **commit hash** and **compiler settings** (`cancun`, optimizer runs).
2. Collect **deployment addresses** + **Chainscan verification** status.
3. Spawn **parallel** sub-agents per domain below.
4. Merge findings; **dedupe** by root cause.
5. File issues with **severity**, **exploit sketch**, **fix recommendation**, **test idea**.

---

## Domain checklist

### A. Access control & upgrades

- Missing modifiers; role admin rotation; initializer replay; storage slot collisions in proxies.

### B. Assets & accounting

- Rounding; donation attacks; inflation; fee-on-transfer tokens; rebasing.

### C. External calls & reentrancy

- CEI violations; read-only reentrancy; cross-function reentrancy.

### D. Oracles & price

- Spot manipulation; TWAP windows; sequencer uptime assumptions (if any).

### E. Cryptography & signatures

- EIP-712 domain correctness; replay across chains/contracts; malleability.

### F. Precompiles & system contracts

- Input validation; failure handling; gas griefing on 0G precompile paths ([deploy doc](https://docs.0g.ai/developer-hub/building-on-0g/contracts-on-0g/deploy-contracts)).

### G. Bridging & cross-chain (if present)

- Message ordering; replay; handler permissions.

### H. Denial of service

- Unbounded loops; griefable sorting; block stuffing assumptions.

### I. Events & indexing

- Missing critical events; incorrect indexing for offchain monitors.

### J. Testing gaps

- Absent fuzz/invariant tests for core invariants.

---

## Severity rubric (suggested)

- **Critical** — Direct fund loss, protocol brick, universal theft.
- **High** — Material loss under plausible conditions.
- **Medium** — Loss for subset / grief / DoS with economic cost.
- **Low** — UX / inefficiency / edge-case reverting.

---

## Output template (per finding)

```
Title: ...
Severity: ...
Contracts: ...
Description: ...
Attack sketch: ...
Recommended fix: ...
Regression test: ...
```

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/audit/SKILL.md
```

---

## Related skills

- [Security](../security/SKILL.md)
- [Testing](../testing/SKILL.md)
- [QA](../qa/SKILL.md)

MIT License — contributions welcome.
