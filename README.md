# Workflow Repo (CA)

Frontend project with:
- unit tests using Vitest
- e2e tests using Playwright
- code quality checks with ESLint + Prettier
- pre-commit checks using Husky + lint-staged

## Requirements

- Node.js 18+ (Node.js 20 recommended)
- npm

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create local environment file (if not already present):

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Build/watch Tailwind CSS during development:

```bash
npm run dev
```

## Available Scripts

### `npm run dev`
Runs Tailwind in watch mode and outputs to `css/style.css`.

### `npm test`
Runs unit tests with Vitest.

### `npm run test:e2e`
Runs end-to-end tests with Playwright.

### `npm run prepare`
Installs Husky Git hooks.

## Testing

### Unit tests

```bash
npm test
```

### E2E tests

```bash
npm run test:e2e
```

## Linting and Formatting on Commit

The project uses Husky + lint-staged on pre-commit:
- `*.html` -> `prettier --write`
- `*.js` -> `prettier --write` then `eslint --fix`

This ensures staged files are formatted and linted before commit.

## Environment Variables

Required environment variable names:
- `LOGIN_EMAIL`
- `LOGIN_PASSWORD`

Do not commit real values. Keep secrets in your local `.env` only.

## Notes

- `.env` is ignored by Git.
- `.env.example` is committed and should only contain variable names/placeholders.
