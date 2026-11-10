import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../cart'
import { cn } from '../lib/utils'

const LINKS = [
  ['#produit', 'Le Cloud Pillow'],
  ['#details', 'Détails'],
  ['#coloris', 'Coloris'],
  ['#faq', 'Questions'],
]

export function Nav() {
  const { count, setOpen } = useCart()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(scrollY > innerHeight * 0.6)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,color,border-color] duration-500',
        solid ? 'border-b border-rule bg-white/90 text-ink backdrop-blur-xl' : 'border-b border-white/15 text-white',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" className="font-display text-[15px] font-bold tracking-[0.28em] uppercase">
          Maison Sieste
        </a>
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-9 text-[13px] font-medium tracking-[0.08em] uppercase">
            {LINKS.map(([h, l]) => (
              <li key={h}>
                <a href={h} className="opacity-75 transition-opacity hover:opacity-100">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ouvrir le panier, ${count} article${count > 1 ? 's' : ''}`}
          className="flex min-h-11 cursor-pointer items-center gap-2 text-[13px] font-medium tracking-[0.08em] uppercase"
        >
          <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
          <span className="hidden sm:inline">Panier</span>
          <span className="tabular-nums">({count})</span>
        </button>
      </div>
    </header>
  )
}
