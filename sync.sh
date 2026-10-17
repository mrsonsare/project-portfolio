#!/usr/bin/env bash
# Script to quickly sync changes with GitHub

# Set commit message (defaults to timestamp if not provided)
MSG="${1:-Update: $(date '+%Y-%m-%d %H:%M:%S')}"

echo "📦 Staging changes..."
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No new changes to commit."
else
    echo "💾 Committing changes: '$MSG'"
    git commit -m "$MSG"
fi

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Sync complete!"
