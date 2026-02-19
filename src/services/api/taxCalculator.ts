import type { TaxBracketResponse } from '@/types/taxCalculator'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchTaxBrackets = async (year: string): Promise<TaxBracketResponse> => {
  const url = `${BASE_URL}/tax-calculator/tax-year/${year}`
  const response = await fetch(url)

  const data = (await response.json()) as TaxBracketResponse

  if (!Array.isArray(data.tax_brackets)) {
    throw new Error('Unexpected API response.')
  }

  return data
}
