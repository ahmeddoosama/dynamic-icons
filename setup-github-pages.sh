#!/bin/bash

# GitHub Pages Setup Script for DynamicIcons
echo "🚀 Setting up GitHub Pages for DynamicIcons..."

# Get the current repository name
REPO_NAME=$(basename -s .git `git config --get remote.origin.url` 2>/dev/null)

if [ -z "$REPO_NAME" ]; then
    echo "❌ Error: Could not determine repository name. Make sure you're in a git repository."
    exit 1
fi

echo "📦 Repository name: $REPO_NAME"

# Get GitHub username
GITHUB_USERNAME=$(git config --get remote.origin.url | sed -n 's/.*github\.com[:/]\([^/]*\).*/\1/p')

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: Could not determine GitHub username. Please enter it manually:"
    read -p "GitHub username: " GITHUB_USERNAME
fi

echo "👤 GitHub username: $GITHUB_USERNAME"

# Update package.json with correct base-href
echo "📝 Updating package.json..."
sed -i.bak "s|--base-href=/dynamic-icons/|--base-href=/$REPO_NAME/|g" package.json
rm package.json.bak

# Update README.md with correct URL
echo "📝 Updating README.md..."
sed -i.bak "s|yourusername|$GITHUB_USERNAME|g" README.md
sed -i.bak "s|dynamic-icons|$REPO_NAME|g" README.md
rm README.md.bak

# Update GitHub Actions workflow
echo "📝 Updating GitHub Actions workflow..."
sed -i.bak "s|dynamic-icons|$REPO_NAME|g" .github/workflows/deploy.yml
rm .github/workflows/deploy.yml.bak

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push your changes to GitHub:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Pages setup'"
echo "   git push origin main"
echo ""
echo "2. Enable GitHub Pages in your repository settings:"
echo "   - Go to Settings → Pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: gh-pages, Folder: /(root)"
echo ""
echo "3. Enable GitHub Actions:"
echo "   - Go to Settings → Actions → General"
echo "   - Allow all actions and reusable workflows"
echo ""
echo "4. Your site will be available at:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "🎉 Happy coding!"
