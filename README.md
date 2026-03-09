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

### `npm run lint`

Runs ESLint across the project.

### `npm test`

Runs unit tests with Vitest.

### `npm run test:e2e`

Runs end-to-end tests with Playwright.

Local default: Chromium only.

CI: Chromium + Firefox + WebKit.

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

Run one e2e file:

```bash
npx playwright test tests/login.spec.js
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

## Troubleshooting

### "logs in with valid credentials from env" is skipped

Check that `.env` contains non-empty values for:

- `LOGIN_EMAIL`
- `LOGIN_PASSWORD`

The test is intentionally skipped when these are missing or placeholders.

### Difference between unit and e2e tests

- `npm test` runs Vitest unit tests from `src/**/*.test.js`.
- `npm run test:e2e` runs Playwright browser tests from `tests/*.spec.js`.
