# AGENTS.md

Rules for AI coding agents. Codex reads this file directly; Claude Code reads it through `CLAUDE.md`, which imports it.

## Project

<!-- Replace with one paragraph: what the app does and for whom. -->
A full-stack TypeScript app: `web/` is the React frontend (Vite), `api/` is the Node.js backend (Express).

This is a learning project. The developer is a student who must understand every line that goes into a pull request.

## Commands

Run from the repo root:

- `pnpm install`: install everything
- `pnpm dev`: start web (http://localhost:5173) and api (http://localhost:3000) together; `/api` is proxied to the api
- `pnpm check`: lint, typecheck, tests and production build; must pass before every commit (CI runs the same)

## How to work here

- One issue = one branch = one pull request. Never commit to `main`.
- Before writing code, explain the plan in a few sentences and wait for approval.
- After the change, explain what you changed and why, in plain language, so the student can defend it in review.
- Write or update tests for every behaviour change (`vitest`, next to the code as `*.test.ts`, in `api/` and `web/`).
- Keep changes small. If the task grows, stop and propose splitting it.
- Prefer the standard library and the existing stack; ask before adding a dependency and say why it is needed.
- Code, names, comments and commit messages are in English.

## Never

- Never commit secrets. Configuration goes to `api/.env` (git-ignored); document new variables in `api/.env.example`.
- Never put secrets in `web/`. Everything in the frontend, including `VITE_*` variables, ends up in public JavaScript.
- Never disable a lint rule, a type check or a test to make something pass.
- Never run destructive commands (`rm -rf`, `git push --force`, dropping databases) without asking.
