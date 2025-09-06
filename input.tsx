import * as React from 'react'
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className='', ...props }, ref) => (
    <input ref={ref} className={`h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 ${className}`} {...props} />
  )
)
Input.displayName = 'Input'
