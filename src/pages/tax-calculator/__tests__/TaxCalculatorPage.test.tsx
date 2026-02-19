import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import TaxCalculatorPage from '../TaxCalculatorPage'

const mocks = vi.hoisted(() => ({
  useTaxCalculatorMock: vi.fn(),
}))

vi.mock('@/hooks/useTaxCalculator', () => ({
  useTaxCalculator: () => mocks.useTaxCalculatorMock(),
}))
const baseHookState = {
  status: 'idle' as const,
  result: undefined,
  error: undefined,
  calculateTax: vi.fn(),
}

describe('TaxCalculatorPage', () => {
  beforeEach(() => {
    mocks.useTaxCalculatorMock.mockReset()
  })

  it('renders idle state', () => {
    mocks.useTaxCalculatorMock.mockReturnValue(baseHookState)

    render(<TaxCalculatorPage />)

    expect(
      screen.getByText(/enter an income and tax year to see the breakdown/i),
    ).toBeInTheDocument()
  })

  it('renders loading state', () => {
    mocks.useTaxCalculatorMock.mockReturnValue({
      ...baseHookState,
      status: 'loading' as const,
    })

    render(<TaxCalculatorPage />)

    expect(screen.getByText(/loading calculation/i)).toBeInTheDocument()
  })

  it('renders success state', () => {
    mocks.useTaxCalculatorMock.mockReturnValue({
      ...baseHookState,
      status: 'success' as const,
      result: {
        totalTax: 12345,
        effectiveRate: 0.1234,
        breakdown: [],
      },
    })

    render(<TaxCalculatorPage />)

    const resultsSection = screen.getByText('Results').closest('section')
    if (!resultsSection) {
      throw new Error('Results section not found')
    }

    expect(within(resultsSection).getByText(/total tax/i)).toBeInTheDocument()
    expect(within(resultsSection).getByText('$123.45')).toBeInTheDocument()
  })

  it('renders error state', () => {
    mocks.useTaxCalculatorMock.mockReturnValue({
      ...baseHookState,
      status: 'error' as const,
      error: new Error('Boom'),
    })

    render(<TaxCalculatorPage />)

    expect(screen.getByText(/we ran into an issue calculating your taxes/i)).toBeInTheDocument()
  })
})
