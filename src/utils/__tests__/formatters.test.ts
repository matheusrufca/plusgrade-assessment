import { describe, expect, it } from 'vitest'

import { formatCurrency, formatPercent } from '../formatters'

describe('formatters', () => {
  it('formats cents as currency', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(12345)).toBe('$123.45')
  })

  it('formats percent values', () => {
    expect(formatPercent(0)).toBe('0.00%')
    expect(formatPercent(0.1234)).toBe('12.34%')
  })
})
