# 🛡️ git-secret-guard

A lightweight, zero-dependency Node.js CLI security tool that acts as a **Git `pre-commit` hook** to detect and block accidental commits of API keys, passwords, tokens, and private keys.

## 🚀 Features
- **Real-time Pre-Commit Scanning:** Automatically inspects staged files (`git diff --cached`) before a commit is finalized.
- **Secret Pattern Detection:** Catches AWS Access Keys, GitHub Personal Access Tokens, Private Keys, and hardcoded passwords/API keys.
- **Zero External Dependencies:** Built purely using native Node.js (`fs`, `path`, `child_process`).
- **One-Command Hook Setup:** Easy installation into any Git repository.

## 📦 Installation & Setup

1. Clone this repository:
   ```bash
   git clone [https://github.com/radchu-ragasu/git-secret-guard.git](https://github.com/radchu-ragasu/git-secret-guard.git)
   cd git-secret-guard