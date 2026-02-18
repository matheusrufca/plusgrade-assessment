import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Label from '../Label'

const renderLabel = () => {
  render(
    <div>
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" />
    </div>,
  )
}

describe('Label', () => {
  it('associates with a form control', () => {
    renderLabel()

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })
})
