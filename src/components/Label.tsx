import type { FC, LabelHTMLAttributes, ReactNode } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
}

const Label: FC<Props> = ({ className = '', children, ...rest }) => {
  return (
    <label {...rest} className={`text-sm font-medium text-slate-200 ${className}`}>
      {children}
    </label>
  )
}

export default Label
