import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import { forwardRef } from 'react'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

const Button: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', children, disabled, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      disabled={disabled}
      className={`w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 ${
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      } ${className}`}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'

export default Button
