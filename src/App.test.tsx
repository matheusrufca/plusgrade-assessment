import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import App from './App'

vi.mock('/vite.svg', () => ({ default: 'vite.svg' }))
vi.mock('./assets/react.svg', () => ({ default: 'react.svg' }))

describe('App', () => {
	it('renders the starter heading', () => {
		render(<App />)

		expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()
	})
})
