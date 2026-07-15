#!/usr/bin/env bash
# Wechselt auf content-drafts (legt Branch lokal an falls noch nicht auf GitHub).
set -euo pipefail

git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git fetch origin main
git fetch origin content-drafts 2>/dev/null || true

if git show-ref --verify --quiet refs/remotes/origin/content-drafts; then
  git checkout content-drafts
  git pull origin content-drafts --rebase 2>/dev/null || git pull origin content-drafts
else
  echo "Branch content-drafts existiert noch nicht – wird von main abgeleitet."
  git checkout -B content-drafts origin/main
fi
