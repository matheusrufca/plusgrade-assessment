import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect } from 'react'

import { useLogger } from '@/hooks/useLogger'
import { useTaxCalculator } from '@/hooks/useTaxCalculator'
import TaxResultsPanel from '@/pages/tax-calculator/TaxResultsPanel'
import TaxCalculatorHeader from '@/pages/tax-calculator/TaxCalculatorHeader'
import type { TaxCalculatorFormValues } from './TaxCalculatorForm'
import TaxCalculatorForm from './TaxCalculatorForm'

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
  const logger = useLogger()

  const handleSubmit = useCallback(
    async (values: TaxCalculatorFormValues) => {
      await calculateTax(values)
    },
    [calculateTax],
  )

  useEffect(() => {
    if (status !== 'error') {
      return
    }

    logger.error('Tax calculator failed in page', { message: error })
  }, [error, logger, status])

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <TaxCalculatorHeader />

      <main className="mt-10 space-y-8">
        <TaxCalculatorForm onSubmit={handleSubmit} />

        {status === 'idle' && (
          <ResultsStateCard>Enter an income and tax year to see the breakdown.</ResultsStateCard>
        )}
        {status === 'loading' && <ResultsStateCard>Loading calculation…</ResultsStateCard>}
        {status === 'success' && <TaxResultsPanel result={result} error={error} />}
        {status === 'error' && (
          <ResultsStateCard>
            We ran into an issue calculating your taxes. Please try again.
          </ResultsStateCard>
        )}
      </main>
    </div>
  )
}

export default TaxCalculatorPage
