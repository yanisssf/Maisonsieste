import { useState } from 'react'
import { CartProvider } from './cart'
import type { ColorId } from './data'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Product } from './components/Product'
import { Colors, Details, Parallax, PhotoScene, SteelScene } from './components/Story'
import { Band, Compare, Faq, Final, Footer } from './components/Sections'
import { CartDrawer, StickyBuy } from './components/Cart'

export default function App() {
  const [color, setColor] = useState<ColorId>('marine')
  return (
    <CartProvider>
      <a href="#produit" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Aller au produit
      </a>
      <Nav />
      <main>
        <Hero />
        <Band />
        <Product color={color} setColor={setColor} />
        <div className="bg-paper">
          <Parallax scene={<PhotoScene />} eyebrow="La nuit" heading="La nuque soutenue, la tête posée." />
          <Parallax light scene={<SteelScene />} eyebrow="Double face" heading="Un côté bas. Un côté haut.">
            <Details />
          </Parallax>
        </div>
        <Colors color={color} setColor={setColor} />
        <Compare />
        <Faq />
        <Final />
      </main>
      <Footer />
      <CartDrawer />
      <StickyBuy color={color} />
    </CartProvider>
  )
}
