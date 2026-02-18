import type { FC, SubmitEvent } from 'react'
import { useState } from 'react'

import AppHeader from '@/pages/tax-calculator/AppHeader'
import ResultsPanel from '@/pages/tax-calculator/ResultsPanel'
import TaxForm from '@/pages/tax-calculator/TaxForm'

const App: FC = () => {
  const [annualIncome, setAnnualIncome] = useState('')
  const [taxYear, setTaxYear] = useState('2022')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <AppHeader />

        <main className="mt-10 space-y-8">
          <TaxForm
            annualIncome={annualIncome}
            taxYear={taxYear}
            onIncomeChange={setAnnualIncome}
            onYearChange={setTaxYear}
            onSubmit={handleSubmit}
          />

          <ResultsPanel />
        </main>
      </div>
    </div>
  )
}

export default App
