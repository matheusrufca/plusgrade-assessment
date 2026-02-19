import { useCallback, useState } from 'react'

import type { TaxCalculatorFormValues } from '@/pages/tax-calculator/TaxCalculatorForm'
import { fetchTaxBrackets } from '@/services/api/taxCalculator'
import { calculateTax, type TaxCalculationResult } from '@/services/taxCalculator'
import { logger } from '@/utils/logger'

export type TaxCalculationStatus = 'idle' | 'loading' | 'success' | 'error'

export type TaxCalculationState = {
  status: TaxCalculationStatus
  result?: TaxCalculationResult
  error?: Error
}

export const useTaxCalculator = () => {
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculationState>({ status: 'idle' })

  const calculateTaxForValues = useCallback(async (values: TaxCalculatorFormValues) => {
    setTaxCalculation((previous) => ({ ...previous, status: 'loading', error: undefined }))

    try {
      const income = Number(values.annualIncome)

      if (!Number.isFinite(income) || income < 0) {
        throw new Error('Income must be a non-negative number.')
      }

      const incomeCents = Math.round(income * 100)

      const { tax_brackets: brackets } = await fetchTaxBrackets(values.taxYear)
      const result = calculateTax(incomeCents, brackets)

      setTaxCalculation((previous) => ({ ...previous, status: 'success', result }))
    } catch (error) {
      logger.error('Tax calculation failed', error)
      setTaxCalculation((previous) => ({
        ...previous,
        status: 'error',
        error: error as Error,
      }))
    }
  }, [])

  return {
    status: taxCalculation.status,
    result: taxCalculation.result,
    error: taxCalculation.error,
    calculateTax: calculateTaxForValues,
  }
}
