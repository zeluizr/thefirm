import type { ReactNode } from 'react'

type EyebrowProps = {
  children: ReactNode
  variant?: 'teal' | 'orange'
}

export function Eyebrow({ children, variant = 'teal' }: EyebrowProps) {
  return (
    <span className='inline-flex items-center gap-[10px] font-mono text-[13px] uppercase tracking-[3px] text-ink'>
      <span
        className={`inline-block h-[13px] w-[13px] border-2 border-ink ${
          variant === 'orange' ? 'bg-orange' : 'bg-teal'
        }`}
        aria-hidden='true'
      />
      {children}
    </span>
  )
}
