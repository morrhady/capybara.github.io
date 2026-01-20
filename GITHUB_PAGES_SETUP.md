# GitHub Pages Setup Instructions

## Problem

The website at `https://morrhady.github.io/capybara.github.io/` is not accessible because the base GitHub Pages domain `morrhady.github.io` has not been established.

## Root Cause

This repository (`capybara.github.io`) is configured as a **Project Pages** site, which means it should be accessible at:
```
https://morrhady.github.io/capybara.github.io/
```

However, GitHub requires a **User Pages** repository to exist first to establish the base domain `morrhady.github.io`. Without this base repository, DNS for the subdomain is not configured, and project pages cannot be accessed.

## Solution

You need to create a User Pages repository to establish the base GitHub Pages domain. Follow these steps:

### Step 1: Create User Pages Repository

1. Go to https://github.com/new
2. Create a new repository named exactly: `morrhady.github.io`
3. Make it public
4. Initialize with a README (optional)

### Step 2: Enable GitHub Pages for User Repository

1. Go to the new repository Settings → Pages
2. Under "Source", select either:
   - "Deploy from a branch" and choose `main` branch
   - OR "GitHub Actions" (if you want to deploy a custom site)
3. Add a simple `index.html` file to the repository (if using branch deployment):

```html
<!DOCTYPE html>
<html>
<head>
    <title>Morrhady's GitHub Pages</title>
</head>
<body>
    <h1>Welcome to morrhady's GitHub Pages</h1>
    <p>Visit my projects:</p>
    <ul>
        <li><a href="/capybara.github.io/">Capybara - Mental Health & Productivity Companion</a></li>
    </ul>
</body>
</html>
```

4. Commit and push the file
5. Wait a few minutes for the site to deploy

### Step 3: Verify This Project Works

Once the user pages site is deployed:

1. The base domain `https://morrhady.github.io/` will be accessible
2. This project will automatically become accessible at `https://morrhady.github.io/capybara.github.io/`
3. No changes to this repository are needed - the GitHub Actions workflow is already configured correctly

### Step 4: Configure GitHub Pages for This Repository (Already Done)

The following is already configured in this repository, but for reference:

1. Go to this repository's Settings → Pages
2. Under "Source", ensure "GitHub Actions" is selected
3. The workflow file `.github/workflows/deploy.yml` handles the deployment

## Current Status

✅ GitHub Actions workflow is configured correctly
✅ Vite build configuration has the correct base path `/capybara.github.io/`
✅ Deployments are succeeding
❌ Base GitHub Pages domain not established (requires user pages repository)

## Verification

After completing the steps above, verify the website is accessible:

```bash
curl -I https://morrhady.github.io/capybara.github.io/
```

You should receive a `200 OK` response.

## Alternative Solution

If you want this to be your primary GitHub Pages site instead of a project site:

1. Rename this repository from `capybara.github.io` to `morrhady.github.io`
2. Update the base path in `vite.config.ts` from `/capybara.github.io/` to `/`
3. The site will be accessible directly at `https://morrhady.github.io/`

**Note:** You can only have one user pages repository per GitHub account.
