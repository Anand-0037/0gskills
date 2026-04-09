---
name: audit-storage
description: "Verifying data availability, blob integrity, and storage SDK safety."
---

# Audit: Storage

**Audit: Storage** — Verifying data availability, blob integrity, and storage SDK safety on 0G.

This track focuses on the integration with 0G Storage Nodes and the Data Availability (DA) layer.

---

## 📦 Blob Integrity & Verification

- [ ] **Hash Matching**: Does the contract/agent verify that the `dataHash` returned by 0G matches the expected local hash (e.g., Keccak256 or Poseidon)?
- [ ] **Onchain Anchoring**: Are the storage metadata pointers (Transaction ID, Leaf Info) anchored on 0G Chain for future retrieval proofs?
- [ ] **Merkle Proof Scrutiny**: If the app uses partial blob reads, does it correctly verify Merkle proofs against the `rootHash` of the stored blob?
- [ ] **Data Life-cycle**: Does the app handle "expired" or "pruned" blobs? (0G storage has configurable expiration).

---

## 🛠️ SDK Implementation Safety

- [ ] **Dependency Pinning**: Are you using `@0gfoundation/0g-ts-sdk` at a verified stable version? (Avoid `latest` in production audits).
- [ ] **Secret Exposure**: Does the indexing or storage job log the `private key` used to sign storage transactions?
- [ ] **Concurrency Issues**: How does the storage client handle 429 (Rate Limit) or 503 (Overloaded) responses from storage nodes?
- [ ] **Mock Data**: Are test environments accidentally using mock DA layers that behave differently than the production `Aristotle` mainnet?

---

## 📡 Retrieval & Availability

- [ ] **Safe Retrieval**: Does the retrieval logic verify the downloaded blob matches its hash **before** passing it to sensitive logic or ML inference?
- [ ] **DA Confirms**: Does the protocol wait for enough 0G Chain confirmations before considering a blob "available" for subordinate tasks?
- [ ] **Node Redundancy**: If a single storage node goes offline, does the agent have a fallback RPC or node URL to ensure uptime?

---

## 📑 Common Storage Findings

- **Critical**: App accepts unverified blobs from the storage node (Malicious node could inject data).
- **High**: Metadata storage uses insecure indexing, leading to "lost" blob pointers.
- **Medium**: Missing retry logic on storage uploads leading to protocol stalls.
- **Low**: Inefficient blob packing leading to higher-than-necessary 0G gas costs.

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/api/skill?topic=audit-storage
```

MIT License — contributions welcome.
