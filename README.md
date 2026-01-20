# 🦫 Capybara: Mental Health & Productivity Companion

A calm, non-clinical helper that blends Pomodoro focus cycles, mood check-ins, playful boxing-bag quotes, and lightweight task organization. Built with Vite + React + TypeScript.

## Features

- Pomodoro timer with adjustable focus/break durations, start/pause/reset, and session counter.
- Emoji-based mood check-ins (pre/post) with recent history.
- Task organizer with quick-add, category tags, and priority pills.
- Boxing bag interaction: 10 taps unlock a random motivational quote, then resets.
- Emergency contact rotation card for a reachable person.

## Getting started

```bash
npm install
npm run dev
```

- Dev server: http://localhost:5173
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Project structure

- [src/App.tsx](src/App.tsx): Main UI (timer, mood, tasks, boxing bag, contacts).
- [src/App.css](src/App.css) & [src/index.css](src/index.css): Styling for the calming, mascot-friendly layout.

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The workflow:
1. Runs on every push to the `main` branch
2. Installs dependencies and builds the project
3. Deploys the built files from the `dist` folder to GitHub Pages

**⚠️ IMPORTANT:** Before this site can be accessed, you need to set up a base GitHub Pages repository.

- **Quick setup:** See [QUICKSTART.md](QUICKSTART.md) (5 minutes)
- **Detailed guide:** See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)

In brief:
1. Create a repository named `morrhady.github.io`
2. Enable GitHub Pages in that repository
3. This project will then be accessible at `https://morrhady.github.io/capybara.github.io/`

Note: This is a GitHub Pages project site and is served at `/capybara.github.io/`.

## Notes

- Guidance for AI helpers lives in [.github/copilot-instructions.md](.github/copilot-instructions.md) 