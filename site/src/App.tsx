import { CartProvider } from './cart'
import { Nav, useNight } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { FoamDemo } from './components/FoamDemo'
import { HeightProfile } from './components/HeightProfile'
import { Features } from './components/Features'
import { Quiz } from './components/Quiz'
import { Compare, Offer } from './components/Offer'
import { Moments } from './components/Moments'
import { Steps, Faq, Final, Footer } from './components/Sections'
import { CartDrawer, StickyBuy } from './components/Cart'

export default function App() {
  const [night, setNight] = useNight()
  return (
    <CartProvider>
      <a href="#appuie" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sky">
        Aller au contenu
      </a>
      <Nav night={night} setNight={setNight} />
      <main>
        <Hero night={night} />
        <Ticker />
        <FoamDemo />
        <HeightProfile />
        <Features />
        <Quiz />
        <Compare />
        <Offer />
        <Moments />
        <Steps />
        <Faq />
        <Final />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuy />
    </CartProvider>
  )
}
