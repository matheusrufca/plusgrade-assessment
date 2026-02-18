import type { FC } from 'react'

const TaxCalculatorHeader: FC = () => {
  return (
    <header className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        Points Interview Assessment
      </p>
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">Tax Calculator</h1>
      <p className="text-base text-slate-300">
        Enter an annual income and tax year to calculate total tax, band breakdown, and effective
        rate.
      </p>
    </header>
  )
}

export default TaxCalculatorHeader
