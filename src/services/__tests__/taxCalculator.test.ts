import { describe, expect, it } from 'vitest'

import { calculateTax } from '../taxCalculator'

const BRACKETS = [
  { min: 0, max: 100, rate: 0.1 },
  { min: 100, max: 200, rate: 0.2 },
  { min: 200, rate: 0.3 },
]

describe('calculateTax', () => {
  it('calculates tax in cents across brackets', () => {
    const result = calculateTax(25000, BRACKETS)

    expect(result.totalTax).toBe(4500)
    expect(result.effectiveRate).toBeCloseTo(0.18, 4)
    expect(result.breakdown).toEqual([
      { min: 0, max: 10000, rate: 0.1, taxable: 10000, tax: 1000 },
      { min: 10000, max: 20000, rate: 0.2, taxable: 10000, tax: 2000 },
      { min: 20000, max: undefined, rate: 0.3, taxable: 5000, tax: 1500 },
    ])
  })

  it('returns zero tax when income is zero', () => {
    const result = calculateTax(0, BRACKETS)

    expect(result.totalTax).toBe(0)
    expect(result.effectiveRate).toBe(0)
    expect(result.breakdown).toEqual([])
  })
})
