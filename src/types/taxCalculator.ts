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
