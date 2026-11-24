# 01 - How Git Pre-Commit Hooks Work

## What is a Git Hook?
- Git Hooks are custom scripts that Git automatically runs before or after specific events like `commit`, `push`, and `merge`.
- Every Git repository has a hidden `.git/hooks/` folder containing sample hook scripts.

## Why Use `pre-commit` for Security?
- The `pre-commit` hook runs **before** Git creates a commit.
- Our scanner checks staged files for sensitive patterns (API keys, passwords, tokens).
- If a secret is found, the script exits with code `1` (error), and **Git automatically blocks the commit** — preventing leaked credentials from ever entering the Git history.