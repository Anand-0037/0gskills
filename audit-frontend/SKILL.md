---
name: audit-frontend
description: "UX-level verification for 0G-specific errors and chain switching."
---

# Audit: Frontend

**Audit: Frontend** — UX-level verification for 0G-specific errors and chain switching on 0G.

This track focuses on the user interface and the bridge between external agents/users and the 0G Chain.

---

## ⛓️ Chain Integration Checklist

- [ ] **Network Selection**: Does the frontend correctly prompt for `16602` (Galileo) or `16661` (Aristotle)?
- [ ] **Wrong Chain Guard**: Are all transaction buttons disabled or hidden if the user is connected to a different EVM network?
- [ ] **RPC Resilience**: Does the frontend have a timeout for RPC calls, and does it surface a meaningful error if the 0G-Evm node is unresponsive?
- [ ] **Block Explorer Links**: Are all transaction hashes and contract addresses hyperlinked to the correct Chainscan instance?

---

## ⚠️ Error Surfacing & UX

- [ ] **Precompile Failure Clarity**: If an interaction with a 0G precompile (e.g., DA) fails, does the frontend show a raw hex string, or a human-readable explanation (e.g., "Storage deposit too low")?
- [ ] **Pending States**: Is there clear visual feedback during the "long" storage wait times? (Storage blobs take slightly longer to finalize than EVM state).
- [ ] **Approval UX**: When interacting with DeFi legos, does the frontend explain *why* an approval is needed before the main transaction?
- [ ] **Gas Estimation**: Does the frontend handle "Execution reverted" errors during `eth_estimateGas` and prevent the user from attempting a guaranteed-to-fail transaction?

---

## 🔐 Secure Interactions

- [ ] **Sensitive Logs**: Check the browser console during a session. Does the app accidentally log signed messages, storage IDs, or (critically) raw secret keys?
- [ ] **Key Handling**: For non-agent browser apps, enforce `BrowserProvider` (MetaMask/WalletConnect) rather than asking the user to paste a private key.
- [ ] **Clipboard Safety**: Does the app have a "copy" button that works reliably and has visual feedback?

---

## 📑 Frontend Severity Rubric

- **Critical**: Frontend allows a transaction to be sent to the "wrong" chain ID with the same address (Potential loss of funds).
- **High**: Frontend crashes or hangs on specific 0G precompile errors, leaving the user with a "pending" state indefinitely.
- **Medium**: Dead links to explorers or missing gas estimation before clicks.
- **Low**: Aesthetic typos or inconsistent 0G branding.

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/api/skill?topic=audit-frontend
```

MIT License — contributions welcome.
