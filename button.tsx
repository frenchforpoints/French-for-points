import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'ghost'|'secondary', size?: 'sm'|'md'|'lg' }
export const Button: React.FC<Props> = ({ className = '', variant = 'default', size='md', ...props }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const sizeCls = size==='lg' ? 'px-5 py-3 text-base' : size==='sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
  const variantCls = variant==='ghost' ? 'bg-transparent text-slate-700 hover:bg-slate-100'
    : variant==='secondary' ? 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-50'
    : 'bg-slate-900 text-white hover:bg-slate-800'
  return <button className={`${base} ${sizeCls} ${variantCls} ${className}`} {...props} />
}
