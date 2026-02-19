# Tax Calculator UI

A React + TypeScript + Vite frontend for calculating Canadian federal tax brackets by year. The UI fetches tax brackets from the API and shows a breakdown of tax by bracket. Money values are handled in integer cents to avoid floating-point rounding issues.

## Features

- Tax calculation by year (2019–2022)
- Breakdown by bracket with effective rate
- Loading/idle/error states
- Integer-cents math for money values
- Custom logger utility

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Vitest + Testing Library

## Requirements

- Node.js 18+
- pnpm

## Getting Started

1. Install dependencies

```powershell
pnpm install
```

2. Set the API base URL

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5001
```

3. Start the dev server

```powershell
pnpm dev
```

## Scripts

```powershell
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm format
pnpm test:run
```

## Project Structure

- `src/pages/tax-calculator/TaxCalculatorPage.tsx`: Page composition and UI states
- `src/pages/tax-calculator/TaxCalculatorForm.tsx`: Form inputs and submit flow
- `src/pages/tax-calculator/TaxResultsPanel.tsx`: Results display
- `src/services/api/taxCalculator.ts`: API client for tax brackets
- `src/services/taxCalculator.ts`: Pure tax calculation logic (cents-based)
- `src/hooks/useTaxCalculator.ts`: Orchestrates fetching, calculation, and UI state
- `src/utils/formatters.ts`: Money and percent formatting
- `src/utils/logger.ts`: Fake logger utility (`logger.error/info/debug/warn`)

## Implementation and Project Customization Notes

- Update `VITE_API_BASE_URL` when pointing to a different backend.
- Expand `src/services/api` to add new endpoints while keeping hooks thin.
- Husky + lint-staged run checks on pre-commit.
- Money calculations use integer cents to avoid floating-point rounding errors.
- Import aliases (`@`).
- Build optimizations include vendor splitting, compression, and explicit minification.
- A fake logger provides `error`, `warn`, `info`, and `debug` methods for monitoring.
- Basic unit testing for components, hooks, and services.

## Testing

```powershell
pnpm test:run
```
