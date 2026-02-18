import type { FC, SubmitEventHandler } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Label from '../../components/Label'
import Select from '../../components/Select'

type Props = {
  annualIncome: string
  taxYear: string
  onIncomeChange: (value: string) => void
  onYearChange: (value: string) => void
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

const AVAILABLE_YEARS = Object.freeze<number[]>([2019, 2020, 2021, 2022])

const TaxForm: FC<Props> = ({ annualIncome, taxYear, onIncomeChange, onYearChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
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
            onChange={(event) => onIncomeChange(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Tax year</Label>
          <Select
            id="year"
            name="year"
            value={taxYear}
            onChange={(event) => onYearChange(event.target.value)}
          >
            {AVAILABLE_YEARS.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </Select>
        </div>
      </div>

      <Button type="submit">Calculate taxes</Button>
    </form>
  )
}

export default TaxForm
