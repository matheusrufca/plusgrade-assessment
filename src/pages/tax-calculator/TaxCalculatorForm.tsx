import type { ChangeEventHandler, FC, SubmitEventHandler } from 'react'
import { useCallback, useState, useTransition } from 'react'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Select from '@/components/Select'

export type TaxCalculatorFormValues = {
  annualIncome: string
  taxYear: string
}

type Props = {
  onSubmit: (values: TaxCalculatorFormValues) => Promise<void> | void
}

const AVAILABLE_YEARS = Object.freeze<number[]>([2019, 2020, 2021, 2022])

const TaxCalculatorForm: FC<Props> = ({ onSubmit }) => {
  const [annualIncome, setAnnualIncome] = useState('')
  const [taxYear, setTaxYear] = useState('2022')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = useCallback<SubmitEventHandler>(
    async (event) => {
      event.preventDefault()
      if (!taxYear || !annualIncome) return

      startTransition(() => {
        void onSubmit({ annualIncome, taxYear })
      })
    },
    [annualIncome, onSubmit, taxYear],
  )

  const handleIncomeChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    setAnnualIncome(event.target.value)
  }, [])

  const handleTaxYearChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((event) => {
    setTaxYear(event.target.value)
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="income">Annual income</Label>
          <Input
            id="income"
            name="income"
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="e.g. 85000"
            value={annualIncome}
            onChange={handleIncomeChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Tax year</Label>
          <Select id="year" name="year" value={taxYear} onChange={handleTaxYearChange}>
            {AVAILABLE_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        Calculate taxes
      </Button>
    </form>
  )
}

export default TaxCalculatorForm
