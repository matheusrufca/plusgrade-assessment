# Tax Calculator UI

A React + TypeScript + Vite frontend for calculating Canadian federal tax brackets by year. The UI fetches tax brackets from the API and shows a breakdown of tax by bracket. Money values are handled in integer cents to avoid floating-point rounding issues.

## Features

- Tax calculation by year (2019–2022)
- Breakdown by bracket with effective rate
- Loading/idle/error states
- Integer-cents math for money values
- Custom logger utility and hook

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
- `src/pages/tax-calculator/ResultsPanel.tsx`: Results display
- `src/hooks/useTaxCalculator.ts`: Fetch + calculation logic
- `src/utils/formatters.ts`: Money and percent formatting
- `src/utils/logger.ts`: Fake logger utility (`logger.error/info/debug/warn`)
- `src/hooks/useLogger.ts`: Hook wrapper for the logger

## Money Handling

All monetary values are calculated in integer cents. Formatting converts cents to dollars for display.

## Testing

```powershell
pnpm test:run
```
