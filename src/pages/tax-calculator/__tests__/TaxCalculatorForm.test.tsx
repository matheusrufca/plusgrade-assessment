import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TaxCalculatorForm from '../TaxCalculatorForm'

describe('TaxCalculatorForm', () => {
  it('submits the current values', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<TaxCalculatorForm onSubmit={handleSubmit} />)

    const incomeInput = screen.getByLabelText(/annual income/i)
    const yearSelect = screen.getByLabelText(/tax year/i)

    await user.clear(incomeInput)
    await user.type(incomeInput, '85000')
    await user.selectOptions(yearSelect, '2021')

    await user.click(screen.getByRole('button', { name: /calculate taxes/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      annualIncome: '85000',
      taxYear: '2021',
    })
  })

  it('defaults to 2022 when untouched', () => {
    const handleSubmit = vi.fn()

    render(<TaxCalculatorForm onSubmit={handleSubmit} />)

    const yearSelect = screen.getByLabelText(/tax year/i)
    expect(yearSelect).toHaveValue('2022')
  })

  it('does not submit without income', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(<TaxCalculatorForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: /calculate taxes/i }))

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('shows only supported tax years', () => {
    const handleSubmit = vi.fn()

    render(<TaxCalculatorForm onSubmit={handleSubmit} />)

    const options = screen.getAllByRole('option').map((option) => option.textContent)

    expect(options).toEqual(['2019', '2020', '2021', '2022'])
  })
})
