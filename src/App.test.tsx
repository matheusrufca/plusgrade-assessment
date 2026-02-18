import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders the tax calculator heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /tax calculator/i })).toBeInTheDocument()
  })
})
