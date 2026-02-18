import type { FC, PropsWithChildren } from 'react'
import { useCallback } from 'react'

import { useTaxCalculator } from '@/hooks/useTaxCalculator'
import ResultsPanel from '@/pages/tax-calculator/ResultsPanel'
import TaxCalculatorHeader from '@/pages/tax-calculator/TaxCalculatorHeader'
import TaxForm, { type TaxFormValues } from '@/pages/tax-calculator/TaxForm'

const ResultsStateCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-slate-300">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Results</p>
      <p className="mt-3 text-base text-slate-300">{children}</p>
    </div>
  )
}

const TaxCalculatorPage: FC = () => {
  const { status, result, error, calculateTax } = useTaxCalculator()

  const handleSubmit = useCallback(
    async (values: TaxFormValues) => {
      await calculateTax(values)
    },
    [calculateTax],
  )

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <TaxCalculatorHeader />

      <main className="mt-10 space-y-8">
        <TaxForm onSubmit={handleSubmit} isCalculating={status === 'loading'} />

        {status === 'idle' && (
          <ResultsStateCard>Enter an income and tax year to see the breakdown.</ResultsStateCard>
        )}
        {status === 'loading' && <ResultsStateCard>Loading calculation…</ResultsStateCard>}
        {status === 'success' && <ResultsPanel result={result} error={error} />}
      </main>
    </div>
  )
}

export default TaxCalculatorPage
