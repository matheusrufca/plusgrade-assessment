export type TaxBracket = {
  min: number
  max?: number
  rate: number
}

export type TaxBracketResponse = {
  tax_brackets: TaxBracket[]
  error?: string
}

export type TaxBreakdown = {
  min: number
  max?: number
  rate: number
  taxable: number
  tax: number
}

export type TaxCalculationResult = {
  totalTax: number
  effectiveRate: number
  breakdown: TaxBreakdown[]
}
