---
name: audit-orchestration
description: "Validating multi-step agent transaction workflows and failure recovery."
---

# Audit: Orchestration

**Audit: Orchestration** — Validating multi-step agent transaction workflows and failure recovery on 0G.

This track focuses on the audit of logic that coordinates multiple 0G Chain transactions, storage uploads, and compute jobs (AI agents).

---

## 🏗️ State Machine Verification

- [ ] **State Clarity**: Is the agent's workflow modeled as a formal state machine with explicit transitions (`Pending -> Signed -> Confirmed -> Indexed`)?
- [ ] **Stuck States**: What happens if a transaction is "lost" by the mempool? Does the agent have a timeout and reship logic?
- [ ] **Race Conditions**: If multiple agents are running, is there a locking mechanism (onchain or offchain) to prevent duplicate execution of the same 0G task?
- [ ] **Idempotency**: If the same "Plan" is executed twice (e.g., after a crash), does the system prevent duplicate minting or duplicate storage charges?

---

## 🛡️ Failure Recovery & Slashing Safety

- [ ] **Revert Handling**: If a 0G contract reverts in a multi-step sequence (e.g., Step 3 of 5), does the agent roll back its offchain state or trigger an alert?
- [ ] **Gas Outage**: If the wallet runs out of 0G mid-workflow, can the agent resume from the last successful checkpoint once refilled?
- [ ] **Slashing Risks**: If the orchestration logic is part of a validator or restaking bot, do the safety guards prevent "double-sign" or "invalid-claim" triggers?

---

## ⚖️ Cross-Task Consistency

- [ ] **Atomic Links**: Does the agent verify that the `DataHash` from Step 1 (Storage) is the exact one used in Step 2 (Contract Call)?
- [ ] **Oracle Dependency**: If a workflow depends on an oracle (e.g., for gas price), is there a sanity check for extreme outliers?
- [ ] **Event Binding**: Does the orchestrator "wait" for the specific event Log it triggered, or does it blindly assume success based on receiving a transaction hash?

---

## 📑 Orchestration Severity Rubric

- **Critical**: Agent is stuck in an infinite loop of signing transactions (Draining the wallet).
- **High**: Protocol state desync where Step 1 succeeds but offchain DB thinks it failed (Duplicate actions).
- **Medium**: Missing failure alerts, leading to silent protocol stalls.
- **Low**: Verbose logging that tracks duplicate hashes without cleanup.

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/api/skill?topic=audit-orchestration
```

MIT License — contributions welcome.
