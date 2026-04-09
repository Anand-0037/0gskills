---
name: audit-wallets
description: "Security checklist for keys, signing, and agent isolation on 0G."
---

# Audit: Wallets

**Audit: Wallets** — Security checklist for keys, signing, and agent isolation on 0G.

This track focuses on the infrastructure layer where agents interact with the chain via signatures.

---

## 🔑 Key Management Checklist

- [ ] **Secret Hardening**: Are private keys stored in secure environment variables or HSMs rather than hardcoded?
- [ ] **Agent Isolation**: If using multiple agents, does each have a unique, capped-fund key to limit blast radius?
- [ ] **Credential Leaks**: Scrutinize logs and error messages. Do they ever leak the `PRIVATE_KEY` during failure?
- [ ] **Rotation Logic**: Is there an audited process for rotating compromised keys without bricking protocol operations?
- [ ] **Validator Keys**: Are validator hot-keys (`priv_validator_key.json`) kept separate from deployment keys?

---

## 🖊️ Signing & Transaction Safety

- [ ] **EIP-712 Integrity**: Verify domain separators. Are they unique to the 0G Chain ID (`16602` or `16661`)?
- [ ] **Replay Protection**: Check if signatures can be replayed across different contracts or testnet/mainnet environments.
- [ ] **Payload Validation**: Before signing, does the agent verify the transaction `data`, `value`, and `to` address against expected state?
- [ ] **Estimation Safety**: Does the agent handle `gasLimit` failures gracefully, or could it spin in a recursive loop burning 0G on failing calls?
- [ ] **Permit Pitfalls**: If using EIP-2612 `permit`, scrutinize the deadline and nonces used in agent-generated payloads.

---

## 🤖 Agent Operational Security (OpSec)

- [ ] **Innocent Logging**: Ensure that "debug" level logs don't output raw `TransactionResponse` objects containing sensitive nonces or private state.
- [ ] **CI/CD Traces**: Check GitHub Actions or GitLab CI logs for masked secrets that might still be recoverable via "verbose" output.
- [ ] **Rate Limits**: Does the wallet handler have a rate-limiter to prevent an "agent hallucination" from draining the wallet in seconds via rapid RPC calls?

---

## 📝 Findings Summary List

*Use this when reviewing code:*
- **Critical**: Private key leaked via log.
- **High**: Replay attack possible between Galileo and Aristotle.
- **Medium**: Missing rate limits on transaction signing.
- **Low**: Insecure storage of non-sensitive validator metadata.

---

## How to fetch this skill

```bash
curl -sSL https://0gskills.com/api/skill?topic=audit-wallets
```

MIT License — contributions welcome.
