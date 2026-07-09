#!/usr/bin/env bash
# Committet Änderungen auf content-drafts und pusht (kein Production-Deploy).
set -euo pipefail

COMMIT_MSG="${1:?Commit message required}"

git add src/content/ content/data/

if git diff --staged --quiet; then
  echo "Keine Änderungen – nichts zu committen."
  exit 0
fi

git commit -m "${COMMIT_MSG}"
git push origin content-drafts

echo "Entwurf auf content-drafts gepusht."
