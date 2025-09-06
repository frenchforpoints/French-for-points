import * as React from 'react'
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={`bg-white border border-slate-200 ${className}`} {...props} />
)
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={`px-5 pt-5 ${className}`} {...props} />
)
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className='', ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props} />
)
export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className='', ...props }) => (
  <p className={`text-sm text-slate-600 mt-1 ${className}`} {...props} />
)
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={`px-5 pb-2 ${className}`} {...props} />
)
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={`px-5 pb-5 ${className}`} {...props} />
)
