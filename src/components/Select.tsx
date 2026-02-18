import type { FC, SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const Select: FC<Props> = ({ className = '', ...rest }) => {
  return (
    <select
      {...rest}
      className={`w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-slate-500 ${className}`}
    />
  )
}

export default Select
