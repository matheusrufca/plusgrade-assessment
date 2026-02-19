import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TaxResultsPanel from '../TaxResultsPanel'

const sampleResult = {
  totalTax: 12345,
  effectiveRate: 0.1234,
  breakdown: [
    { min: 0, max: 10000, rate: 0.1, taxable: 10000, tax: 1000 },
    { min: 10000, max: undefined, rate: 0.2, taxable: 2345, tax: 469 },
  ],
}

describe('TaxResultsPanel', () => {
  it('renders summary values', () => {
    render(<TaxResultsPanel result={sampleResult} />)

    expect(screen.getByText(/total tax/i)).toBeInTheDocument()
    expect(screen.getByText('$123.45')).toBeInTheDocument()
    expect(screen.getByText('12.34%')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders breakdown rows', () => {
    render(<TaxResultsPanel result={sampleResult} />)

    expect(screen.getByText(/by bracket/i)).toBeInTheDocument()
    expect(screen.getByText('$0.00 - $100.00')).toBeInTheDocument()
    expect(screen.getByText('Taxed $100.00 →')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('$100.00 - ∞')).toBeInTheDocument()
  })

  it('shows defaults when result is missing', () => {
    render(<TaxResultsPanel />)

    expect(screen.getByText('$0.00')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.queryByText(/by bracket/i)).not.toBeInTheDocument()
  })
})
