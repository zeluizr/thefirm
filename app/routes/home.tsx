import { Eras } from '~/components/Eras'
import { Footer } from '~/components/Footer'
import { Hero } from '~/components/Hero'
import { Lab } from '~/components/Lab'
import { Operations } from '~/components/Operations'
import { Ticker } from '~/components/Ticker'
import { TopBar } from '~/components/TopBar'

import type { Route } from './+types/home'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'the firm — reactivado' },
    {
      name: 'description',
      content:
        'thefirm.com.br — mi primer dominio, de vuelta a la vida. Las marcas, los experimentos, la historia. 2007 → 2027.',
    },
  ]
}

export default function Home() {
  return (
    <>
      <TopBar />
      <Hero />
      <Ticker />
      <main>
        <Eras />
        <Operations />
        <Lab />
      </main>
      <Footer />
    </>
  )
}
