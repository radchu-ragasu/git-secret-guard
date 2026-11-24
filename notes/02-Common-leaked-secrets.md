# 02 - Common Secrets Leaked in Git Repositories

1. **Cloud Provider Keys (AWS / GCP / Azure):** Keys starting with `AKIA...` give attackers direct access to cloud servers and billing.
2. **Version Control Tokens (GitHub PAT):** Tokens starting with `ghp_...` allow unauthorized code pushes or private repo access.
3. **Database & API Credentials:** Hardcoded `password`, `api_key`, or `secret` strings inside `.js` or `.py` files instead of `.env` files.
4. **Private Keys:** PEM blocks (`-----BEGIN RSA PRIVATE KEY-----`) used for SSH server logins.