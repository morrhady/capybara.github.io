# Quick Start: Fix "Website is Gone" Issue

## TL;DR

**The problem:** GitHub Pages project sites need a base user pages repository to work.

**The fix:** Create a repository named `morrhady.github.io` with GitHub Pages enabled.

## Step-by-Step (5 minutes)

### 1. Create Base Repository

```bash
# Go to: https://github.com/new
# Repository name: morrhady.github.io
# Public: ✓
# Initialize with README: ✓
# Click "Create repository"
```

### 2. Add Simple Index Page

Create `index.html` in the new repository:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morrhady's Projects</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 { color: #333; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Welcome! 👋</h1>
    <p>My GitHub Pages Projects:</p>
    <ul>
        <li>
            <a href="/capybara.github.io/">🦫 Capybara</a> - 
            Mental Health & Productivity Companion
        </li>
    </ul>
</body>
</html>
```

### 3. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: `main` branch
3. Folder: `/ (root)`
4. Click "Save"

### 4. Wait & Verify

```bash
# Wait 2-3 minutes for deployment
# Then test:
curl -I https://morrhady.github.io/

# Test this project:
curl -I https://morrhady.github.io/capybara.github.io/
```

## That's It!

Both sites should now be accessible:
- Base site: `https://morrhady.github.io/`
- This project: `https://morrhady.github.io/capybara.github.io/`

## Need More Details?

See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for comprehensive documentation.

## Alternative: Make This Your Main Site

Don't want to create a second repository? You can make this your main GitHub Pages site instead:

1. Rename this repository to `morrhady.github.io`
2. Update `vite.config.ts`: change `base: '/capybara.github.io/'` to `base: '/'`
3. Site will be at `https://morrhady.github.io/` (no subdirectory)

**Note:** You can only have one user pages repository per account.
