# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages for your DynamicIcons Angular project.

## Prerequisites

1. Your project must be pushed to a GitHub repository
2. You need admin access to the repository

## Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch and **/(root)** folder
6. Click **Save**

## Step 2: Configure Repository Settings

### Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under **Actions permissions**, select **Allow all actions and reusable workflows**
3. Click **Save**

### Set up Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule** for the `main` branch
3. Enable **Require status checks to pass before merging**
4. Enable **Require branches to be up to date before merging**
5. Click **Create**

## Step 3: Update Repository URL

Replace `yourusername` in the following files with your actual GitHub username:

- `README.md` - Update the GitHub Pages URL
- `package.json` - Update the base-href in the build:gh-pages script

## Step 4: First Deployment

### Option A: Manual Deployment

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

### Option B: Automatic Deployment via GitHub Actions

1. Push your code to the `main` branch
2. GitHub Actions will automatically:
   - Build the project
   - Deploy to the `gh-pages` branch
   - Make it available at `https://yourusername.github.io/dynamic-icons/`

## Step 5: Verify Deployment

1. Wait a few minutes for the deployment to complete
2. Visit `https://yourusername.github.io/dynamic-icons/`
3. You should see your DynamicIcons demo running

## Troubleshooting

### Common Issues

**404 Error on GitHub Pages**
- Ensure the `gh-pages` branch exists
- Check that the base-href in `package.json` matches your repository name
- Verify GitHub Pages is enabled in repository settings

**Build Failures**
- Check the GitHub Actions logs for build errors
- Ensure all dependencies are properly installed
- Verify the Angular build configuration

**Icons Not Loading**
- Check that the base-href is correctly set
- Verify that all assets are being built correctly
- Check browser console for any 404 errors

### Manual Troubleshooting Steps

1. **Check GitHub Actions**: Go to **Actions** tab to see deployment status
2. **Verify gh-pages branch**: Ensure the branch exists and contains built files
3. **Check repository settings**: Verify GitHub Pages is enabled and pointing to the correct branch
4. **Clear cache**: Try accessing the site in an incognito window

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Configure your DNS settings to point to `yourusername.github.io`
3. Add a `CNAME` file to your repository root with your domain name

## Security Considerations

- The `GITHUB_TOKEN` is automatically provided by GitHub Actions
- No additional secrets are required for basic deployment
- The deployment only happens on pushes to the main branch

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://pages.github.com/)
2. Review the [Angular deployment guide](https://angular.io/guide/deployment)
3. Check the GitHub Actions logs for specific error messages
