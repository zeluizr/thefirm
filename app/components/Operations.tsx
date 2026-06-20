import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Boxes } from 'lucide-react'

import { SectionHead } from './SectionHead'
import { Wrap } from './Wrap'

type Operation = {
  name: string
  /** trailing part of the wordmark rendered in orange, e.g. `.me` */
  accent?: string
  /** short category label, mirrors the meta tag on the lab cards */
  kind: string
  desc: string
  href: string
}

const operations: Operation[] = [
  {
    name: 'commente',
    accent: '.me',
    kind: 'consultoría',
    desc: 'Consultoría boutique de e-commerce. VTEX, mercado LATAM, del catálogo al checkout.',
    href: 'https://commente.me',
  },
  {
    name: 'integram',
    accent: '.me',
    kind: 'saas · b2b',
    desc: 'Middleware B2B en SaaS. ERP → VTEX sin dolor, con integración que no se rompe.',
    href: 'https://integram.me',
  },
  {
    // TODO(zeluiz): confirmar URL, acento del wordmark y copy en español de inmmerce
    name: 'inmmerce',
    kind: 'escuela',
    desc: 'Nuestra escuela de e-commerce. (descripción por definir)',
    href: '#',
  },
]

function OpCard({ op }: { op: Operation }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={op.href}
      target='_blank'
      rel='noopener'
      className='group relative flex flex-col border-[3px] border-bone bg-void-2 p-[30px] no-underline'
      style={{ boxShadow: '7px 7px 0 #ff41b4' }}
      whileHover={
        reduceMotion ? undefined : { x: -3, y: -3, boxShadow: '10px 10px 0 #ff41b4' }
      }
      whileTap={
        reduceMotion ? undefined : { x: 4, y: 4, boxShadow: '1px 1px 0 #ff41b4' }
      }
    >
      <span className='font-mono text-[12px] uppercase tracking-[2px] text-bone-dim group-hover:text-magenta motion-reduce:group-hover:text-bone-dim'>
        {op.kind}
      </span>
      <div className='mt-3 font-display text-[clamp(26px,4vw,40px)] lowercase tracking-[-0.02em] text-bone'>
        {op.name}
        {op.accent ? <span className='text-wire'>{op.accent}</span> : null}
      </div>
      <div className='mt-[10px] flex-1 font-medium text-bone-dim'>{op.desc}</div>
      <span className='mt-[26px] inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[1px] text-bone'>
        visitar
        <ArrowUpRight
          className='transition-transform duration-150 group-hover:translate-x-[4px] group-hover:-translate-y-[4px] motion-reduce:transition-none'
          size={16}
          strokeWidth={2.5}
          aria-hidden='true'
        />
      </span>
    </motion.a>
  )
}

export function Operations() {
  return (
    <section id='firm' className='py-[84px]'>
      <Wrap>
        <SectionHead
          icon={Boxes}
          eyebrow='la firma'
          count='03 marcas'
          title='las operaciones'
        />
        <div className='grid grid-cols-1 gap-[26px] bp:grid-cols-3'>
          {operations.map((op) => (
            <OpCard key={op.name} op={op} />
          ))}
        </div>
      </Wrap>
    </section>
  )
}
