---
name: audit-indexing
description: "Ensuring consistency across event logs, subgraphs, and offchain state."
---

# Audit: Indexing

**Audit: Indexing** — Ensuring consistency across event logs, subgraphs, and offchain state on 0G.

This track focuses on the audit of offchain data monitors, subgraphs, and downstream databases that rely on 0G Chain events.

---

## 📡 Event Consistency Checklist

- [ ] **Event Coverage**: Does every critical state transition on 0G emit a corresponding event? (Common flaw: `internal` functions missing events).
- [ ] **Indexing Latency**: Does the indexer handle the "finality window" of 0G Chain? Are "Safe" vs "Finalized" blocks distinguished correctly?
- [ ] **Data Completeness**: If the indexer filters by `address`, could it miss events emitted via `delegatecall` or system contracts?
- [ ] **Duplicate Handling**: Does the indexing database handle `blockNumber` + `transactionIndex` + `logIndex` as a unique primary key?

---

## 🔄 Reorg & Sync Safety

- [ ] **Reorg Handling**: If 0G Chain has a deep reorg (e.g., Galileo testnet), is the indexer capable of rolling back its local database to the last safe block?
- [ ] **Sync Integrity**: Does the system verify the `blockHash` matches the expected chain state during batch indexing?
- [ ] **Pruning Risks**: If the 0G RPC node prunes history, can the indexer recover from a complete sync loss?
- [ ] **Health Checks**: Does the API surface an `isSynced` flag or block timestamp so agents know they are reading fresh data?

---

## 🗄️ Database & Search Security

- [ ] **Injection Attacks**: Are search queries over indexed 0G data (via the indexer API) properly sanitized?
- [ ] **Rate Limiting**: Can an agent DoS the indexing service by requesting massive ranges of historic events?
- [ ] **Data Exposure**: Does the indexer accidentally expose sensitive offchain metadata that should remain private?

---

## 📑 Indexing Severity Rubric

- **Critical**: Indexer shows "Successful" for a failed transaction (Resulting in fund theft or state desync).
- **High**: Indexer is stuck or lags behind the chain without alerts, leading to protocol drift.
- **Medium**: Missing events for non-critical parameters (e.g., UI labels).
- **Low**: Inefficient indexing leading to high RPC gas costs or slow queries.

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/api/skill?topic=audit-indexing
```

MIT License — contributions welcome.
