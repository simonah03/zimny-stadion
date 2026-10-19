# Project template

Starter for PixelNode Academy projects: a React frontend and a Node.js API in TypeScript, with tests, linting, CI and rules for AI coding agents.

## Start a project from it

1. Click **Use this template → Create a new repository** and create it **on your own account**, public.
2. Add your mentor as a collaborator (**Settings → Collaborators**).
3. Protect `main` (**Settings → Rules → Rulesets**): require a pull request with 1 approval and the `check` status check.
4. Clone it and run:

You need Node.js 24 LTS (or 22.12+). Then:

```bash
corepack enable        # makes the right pnpm version available
                       # if it fails (e.g. Windows without admin): npm install -g pnpm@11.28.6
pnpm install
cp api/.env.example api/.env   # Windows cmd: copy api\.env.example api\.env
pnpm dev               # http://localhost:5173
```

You should see "API status: ok".

## Structure

| Path | What |
|---|---|
| `web/` | React + Vite frontend |
| `api/` | Express API (`src/app.ts` builds the app, `src/server.ts` starts it) |
| `AGENTS.md` | Rules for AI agents; `CLAUDE.md` imports it, so Claude Code and Codex follow the same rules |
| `.github/` | CI, pull request and issue templates |

## Workflow

Issue → branch → code (with your AI agent) → `pnpm check` → pull request → review → fix → merge.
Every line in your pull request is yours: be ready to explain it.
