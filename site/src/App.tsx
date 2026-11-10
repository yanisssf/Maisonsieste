import { useState } from 'react'
import { CartProvider } from './cart'
import type { ColorId } from './data'
import { Nav, useNight } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { ColorsScene, DoubleFaceScene, PhotoScene, TextParallaxContent } from './components/Parallax'
import { FoamDemo } from './components/FoamDemo'
import { HeightProfile } from './components/HeightProfile'
import { ColorShowcase } from './components/ColorShowcase'
import { Features } from './components/Features'
import { Quiz } from './components/Quiz'
import { Compare, Offer } from './components/Offer'
import { Moments } from './components/Moments'
import { Steps, Faq, Final, Footer } from './components/Sections'
import { CartDrawer, StickyBuy } from './components/Cart'

export default function App() {
  const [night, setNight] = useNight()
  const [color, setColor] = useState<ColorId>('marine')
  return (
    <CartProvider>
      <a href="#histoire" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sky">
        Aller au contenu
      </a>
      <Nav night={night} setNight={setNight} />
      <main>
        <Hero color={color} setColor={setColor} />
        <Ticker />
        <div className="pt-12">
          <TextParallaxContent id="histoire" scene={<PhotoScene />} subheading="Le Cloud Pillow" heading="La nuque posée sur un nuage.">
            <FoamDemo />
          </TextParallaxContent>
          <TextParallaxContent light scene={<DoubleFaceScene />} subheading="Double face" heading="Un côté bas. Un côté haut.">
            <HeightProfile />
          </TextParallaxContent>
          <TextParallaxContent light scene={<ColorsScene />} subheading="5 coloris" heading="Choisis la couleur de ton ciel.">
            <ColorShowcase color={color} setColor={setColor} />
          </TextParallaxContent>
        </div>
        <Features />
        <Quiz color={color} />
        <Compare />
        <Offer color={color} setColor={setColor} />
        <Moments />
        <Steps />
        <Faq />
        <Final color={color} />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuy color={color} />
    </CartProvider>
  )
}
