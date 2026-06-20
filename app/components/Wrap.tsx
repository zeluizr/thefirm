import type { ReactNode } from 'react'

export function Wrap({ children }: { children: ReactNode }) {
  return <div className='mx-auto max-w-[1180px] px-6'>{children}</div>
}
