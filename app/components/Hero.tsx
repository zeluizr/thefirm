import { motion, useReducedMotion } from 'framer-motion'

import { Eyebrow } from './Eyebrow'
import { Wrap } from './Wrap'

function Stamp() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className='absolute right-[12px] bottom-[-6px] rotate-[-7deg] border-4 border-orange px-[11px] py-[7px] text-center font-mono font-bold uppercase leading-[1.1] tracking-[2px] text-orange bp:top-[84px] bp:right-[18px] bp:bottom-auto bp:px-4 bp:py-[10px]'
      initial={
        reduceMotion
          ? { scale: 1, opacity: 1, rotate: -7 }
          : { scale: 2.6, opacity: 0, rotate: -7 }
      }
      animate={{ scale: 1, opacity: 1, rotate: -7 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay: 0.3, ease: [0.2, 1.3, 0.5, 1] }
      }
    >
      <span className='block text-[17px] bp:text-[24px]'>reactivated</span>
      <span className='text-[12px] tracking-[4px] opacity-85'>
        back from the dead
      </span>
    </motion.div>
  )
}

function Anniversary() {
  return (
    <div className='mt-7 inline-flex items-stretch border-[3px] border-ink shadow-hard-sm'>
      <span className='flex items-center bg-ink px-[14px] py-[8px] font-display text-[30px] leading-none text-teal bp:px-[18px] bp:py-[10px] bp:text-[38px]'>
        20
      </span>
      <span className='flex flex-col justify-center px-[18px] font-mono'>
        <span className='text-[14px] font-bold uppercase tracking-[2px]'>
          años rodando
        </span>
        <span className='mt-[2px] text-[12px] tracking-[1px] text-muted'>
          <b className='font-bold text-orange'>2007</b> →{' '}
          <b className='font-bold text-orange'>2027</b>
        </span>
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <header className='relative pt-[70px] pb-10'>
      <Wrap>
        <div className='mb-6'>
          <Eyebrow variant='orange'>est. 20/03/2007 · santiago, cl · v2.0</Eyebrow>
        </div>

        <h1 className='font-display text-[clamp(72px,16vw,188px)] uppercase leading-[0.82] tracking-[-0.03em]'>
          the
          <br />
          firm<span className='text-orange'>.</span>
        </h1>

        <Stamp />

        <p className='mt-[34px] max-w-[620px] text-[clamp(18px,2.2vw,22px)] font-medium leading-[1.5]'>
          Empezó como una broma con la marca de skate. Durante años fue mi nombre
          como freelancer. Después{' '}
          <b className='bg-teal px-1 font-bold'>murió</b>. Ahora es territorio
          libre — sin clientes que complacer, solo lo que yo quiera construir.
        </p>

        <Anniversary />
      </Wrap>
    </header>
  )
}
