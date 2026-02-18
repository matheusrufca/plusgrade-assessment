import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import { forwardRef } from 'react'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', children, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={`w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 ${className}`}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'

export default Button
