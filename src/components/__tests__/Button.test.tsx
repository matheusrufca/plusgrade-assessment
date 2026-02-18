import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Button from '../Button'

describe('Button', () => {
  it('renders children and forwards props', () => {
    const handleClick = vi.fn()

    render(
      <Button type="button" onClick={handleClick}>
        Press me
      </Button>,
    )

    const button = screen.getByRole('button', { name: /press me/i })
    button.click()

    expect(button).toBeInTheDocument()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
