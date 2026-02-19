import { memo, type FC, type ReactNode } from 'react'

import type { TaxCalculationResult } from '@/services/taxCalculator'
import { formatCurrency, formatPercent } from '@/utils/formatters'

type Props = {
  result?: TaxCalculationResult
}

type LabelValueProps = {
  label: string
  value: ReactNode
}

const LabelValue: FC<LabelValueProps> = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
      <p className="text-xs uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

const TaxResultsPanel: FC<Props> = ({ result }) => {
  return (
    <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-slate-300">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Results</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <LabelValue label="Total tax" value={result ? formatCurrency(result.totalTax) : '$0.00'} />
        <LabelValue
          label="Effective rate"
          value={result ? formatPercent(result.effectiveRate) : '0%'}
        />
        <LabelValue label="Brackets" value={result ? result.breakdown.length : 0} />
      </div>
      {result && result.breakdown.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">By bracket</p>
          <div className="grid gap-3">
            {result.breakdown.map((bracket) => (
              <div
                key={`${bracket.min}-${bracket.max ?? 'max'}`}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-slate-300">
                    {formatCurrency(bracket.min)} -{' '}
                    {bracket.max ? formatCurrency(bracket.max) : '∞'}
                  </span>
                  <span className="font-semibold text-white">{formatPercent(bracket.rate)}</span>
                </div>
                <div className="mt-2 text-slate-400">
                  Taxed {formatCurrency(bracket.taxable)} →{' '}
                  <span className="text-white">{formatCurrency(bracket.tax)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(TaxResultsPanel)
