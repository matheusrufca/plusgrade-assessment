import type { FC, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: FC<Props> = ({ className = '', ...rest }) => {
  return (
    <input
      {...rest}
      className={`w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-slate-500 ${className}`}
    />
  )
}

export default Input
