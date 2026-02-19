import { useCallback, useState } from 'react'

import { useLogger } from '@/hooks/useLogger'
import type { TaxCalculatorFormValues } from '@/pages/tax-calculator/TaxCalculatorForm'
import type {
  TaxBracket,
  TaxBracketResponse,
  TaxBreakdown,
  TaxCalculationResult,
} from '@/types/taxCalculator'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchTaxBrackets = async (year: string): Promise<TaxBracketResponse> => {
  const url = `${BASE_URL}/tax-calculator/tax-year/${year}`
  const response = await fetch(url)

  const data = (await response.json()) as TaxBracketResponse

  if (!Array.isArray(data.tax_brackets)) {
    throw new Error('Unexpected API response.')
  }

  return data
}

const calculateTax = (income: number, brackets: TaxBracket[]): TaxCalculationResult => {
  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min)
  const initial = { totalTax: 0, breakdown: [] as TaxBreakdown[] }
  const { totalTax, breakdown } = sortedBrackets.reduce((accumulator, bracket) => {
    const upper = bracket.max ?? income
    const taxable = Math.max(0, Math.min(income, upper) - bracket.min)

    if (taxable <= 0) {
      return accumulator
    }

    const tax = taxable * bracket.rate

    accumulator.breakdown.push({
      min: bracket.min,
      max: bracket.max,
      rate: bracket.rate,
      taxable,
      tax,
    })

    return {
      breakdown: accumulator.breakdown,
      totalTax: accumulator.totalTax + tax,
    }
  }, initial)

  const effectiveRate = income > 0 ? totalTax / income : 0

  return {
    totalTax: Number(totalTax.toFixed(2)),
    effectiveRate,
    breakdown,
  }
}

export type TaxCalculationStatus = 'idle' | 'loading' | 'success' | 'error'

export type TaxCalculationState = {
  status: TaxCalculationStatus
  result?: TaxCalculationResult
  error?: string
}

export const useTaxCalculator = () => {
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculationState>({ status: 'idle' })
  const logger = useLogger()

  const calculateTaxForValues = useCallback(
    async (values: TaxCalculatorFormValues) => {
      setTaxCalculation((previous) => ({ ...previous, status: 'loading', error: undefined }))

      try {
        const income = Number(values.annualIncome)

        if (!Number.isFinite(income) || income < 0) {
          throw new Error('Income must be a non-negative number.')
        }

        const { tax_brackets: brackets } = await fetchTaxBrackets(values.taxYear)
        const result = calculateTax(income, brackets)

        setTaxCalculation((previous) => ({ ...previous, status: 'success', result }))
      } catch (error) {
        logger.error('Tax calculation failed', error)
        setTaxCalculation((previous) => ({
          ...previous,
          status: 'error',
          error: 'We ran into an issue calculating your taxes. Please try again.',
        }))
      }
    },
    [logger],
  )

  return {
    status: taxCalculation.status,
    result: taxCalculation.result,
    error: taxCalculation.error,
    calculateTax: calculateTaxForValues,
  }
}
