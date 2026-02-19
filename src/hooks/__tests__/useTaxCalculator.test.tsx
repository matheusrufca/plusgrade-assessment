import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTaxCalculator } from '../useTaxCalculator'

const mocks = vi.hoisted(() => ({
  fetchTaxBracketsMock: vi.fn(),
  loggerErrorMock: vi.fn(),
}))

vi.mock('@/services/api/taxCalculator', () => ({
  fetchTaxBrackets: mocks.fetchTaxBracketsMock,
}))

vi.mock('@/hooks/useLogger', () => ({
  useLogger: () => ({
    error: mocks.loggerErrorMock,
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  }),
}))

const getState = () => {
  const { result } = renderHook(() => useTaxCalculator())
  return result
}

describe('useTaxCalculator', () => {
  beforeEach(() => {
    mocks.fetchTaxBracketsMock.mockReset()
    mocks.loggerErrorMock.mockReset()
  })

  it('returns success state with calculated result', async () => {
    mocks.fetchTaxBracketsMock.mockResolvedValue({
      tax_brackets: [{ min: 0, rate: 0.1 }],
    })

    const result = getState()

    await act(async () => {
      await result.current.calculateTax({ annualIncome: '100', taxYear: '2022' })
    })

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.result?.totalTax).toBe(1000)
    expect(result.current.result?.effectiveRate).toBeCloseTo(0.1, 4)
  })

  it('sets error state and logs on failure', async () => {
    mocks.fetchTaxBracketsMock.mockRejectedValue(new Error('Network error'))

    const result = getState()

    await act(async () => {
      await result.current.calculateTax({ annualIncome: '100', taxYear: '2022' })
    })

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(mocks.loggerErrorMock).toHaveBeenCalledTimes(1)
  })

  it('rejects invalid income', async () => {
    const result = getState()

    await act(async () => {
      await result.current.calculateTax({ annualIncome: '-1', taxYear: '2022' })
    })

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(mocks.fetchTaxBracketsMock).not.toHaveBeenCalled()
  })
})
