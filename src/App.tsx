import type { FC } from 'react'

import TaxCalculatorPage from '@/pages/tax-calculator/TaxCalculatorPage'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TaxCalculatorPage />
    </div>
  )
}

export default App
