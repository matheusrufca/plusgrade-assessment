import type { TaxBracket, TaxBreakdown } from '@/types/taxCalculator'

export type TaxCalculationResult = {
  totalTax: number
  effectiveRate: number
  breakdown: TaxBreakdown[]
}

export const calculateTax = (incomeCents: number, brackets: TaxBracket[]): TaxCalculationResult => {
  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min)
  const initial = { totalTax: 0, breakdown: [] as TaxBreakdown[] }
  const { totalTax, breakdown } = sortedBrackets.reduce((accumulator, bracket) => {
    const minCents = Math.round(bracket.min * 100)
    const maxCents = bracket.max === undefined ? undefined : Math.round(bracket.max * 100)
    const upper = maxCents ?? incomeCents
    const taxable = Math.max(0, Math.min(incomeCents, upper) - minCents)

    if (taxable <= 0) {
      return accumulator
    }

    const tax = Math.round(taxable * bracket.rate)

    accumulator.breakdown.push({
      min: minCents,
      max: maxCents,
      rate: bracket.rate,
      taxable,
      tax,
    })

    return {
      breakdown: accumulator.breakdown,
      totalTax: accumulator.totalTax + tax,
    }
  }, initial)

  const effectiveRate = incomeCents > 0 ? totalTax / incomeCents : 0

  return {
    totalTax,
    effectiveRate,
    breakdown,
  }
}
