import * as React from 'react'
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className='', ...props }) => (
  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-slate-900 text-white ${className}`} {...props} />
)
