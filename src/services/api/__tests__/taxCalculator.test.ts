import { describe, expect, it, vi } from 'vitest'

import { fetchTaxBrackets } from '../taxCalculator'

describe('fetchTaxBrackets', () => {
  it('returns tax brackets from the API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ tax_brackets: [{ min: 0, rate: 0.15 }] }),
    })

    vi.stubGlobal('fetch', fetchMock)

    const result = await fetchTaxBrackets('2022')

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(result.tax_brackets).toHaveLength(1)

    vi.unstubAllGlobals()
  })

  it('throws when response payload is invalid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({}),
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchTaxBrackets('2022')).rejects.toThrow('Unexpected API response.')

    vi.unstubAllGlobals()
  })
})
