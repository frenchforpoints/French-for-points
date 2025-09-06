import * as React from 'react'
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className='', ...props }, ref) => (
    <textarea ref={ref} className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 ${className}`} {...props} />
  )
)
Textarea.displayName = 'Textarea'
