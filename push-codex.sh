#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Checking for changes..."
git add -A
if git diff --cached --quiet; then
  echo "✅ No local changes to push."
  exit 0
fi

git commit -m "chore: sync latest Codex updates"
git pull --rebase origin main || true
git push origin main

echo "🚀 Successfully pushed Codex changes to GitHub!"
