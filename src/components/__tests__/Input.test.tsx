import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Input from '../Input'

const renderInput = () => {
  render(<Input aria-label="Annual income" type="number" value="50000" readOnly />)
}

describe('Input', () => {
  it('renders with provided attributes', () => {
    renderInput()

    const input = screen.getByLabelText(/annual income/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveValue(50000)
  })
})
