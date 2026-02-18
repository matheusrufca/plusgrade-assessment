import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Select from '../Select'

describe('Select', () => {
  it('renders options and selected value', () => {
    render(
      <Select aria-label="Tax year" defaultValue="2022">
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </Select>,
    )

    const select = screen.getByLabelText(/tax year/i) as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('2022')
    expect(screen.getByRole('option', { name: '2021' })).toBeInTheDocument()
  })
})
