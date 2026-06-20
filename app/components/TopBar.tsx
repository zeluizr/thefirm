import { Wrap } from './Wrap'

const navLinks = [
  { label: 'origen', href: '#origin' },
  { label: 'la firma', href: '#firm' },
  { label: 'el lab', href: '#lab' },
  { label: 'contacto', href: '#contacto' },
]

export function TopBar() {
  return (
    <div className='sticky top-0 z-50 border-b-[3px] border-ink bg-paper'>
      <Wrap>
        <div className='flex h-[58px] items-center justify-between'>
          <span className='font-mono text-[15px] font-bold tracking-[1px]'>
            thefirm<b className='text-orange'>.</b>com.br
          </span>
          <nav className='hidden gap-1 bp:flex'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='border-2 border-transparent px-3 py-[6px] font-mono text-[13px] uppercase tracking-[1px] transition-colors duration-150 hover:border-ink hover:bg-teal motion-reduce:transition-none'
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Wrap>
    </div>
  )
}
