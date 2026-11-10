import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Moon, ShoppingBag, Sun } from 'lucide-react'
import { CloudMark } from './Cloud'
import { useCart } from '../cart'
import { cn } from '../lib/utils'

const LINKS = [
  { href: '#histoire', label: 'Le Cloud Pillow' },
  { href: '#offre', label: 'Coloris & prix' },
  { href: '#quiz', label: 'Quiz' },
  { href: '#faq', label: 'FAQ' },
]

export function useNight() {
  const [night, setNight] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = night ? 'night' : 'day'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#0F1430' : '#E9EEFF')
  }, [night])
  return [night, setNight] as const
}

export function Nav({ night, setNight }: { night: boolean; setNight: (n: boolean) => void }) {
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow] duration-300',
        scrolled && 'bg-sky/80 shadow-[0_10px_30px_-24px_rgb(24_32_74/0.5)] backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl font-semibold" aria-label="Maison Sieste, accueil">
          <CloudMark className="h-6 w-9 text-dusk" />
          Maison Sieste
        </a>
        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-7 text-[15px] font-bold">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="opacity-75 transition-opacity hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setNight(!night)}
            aria-label={night ? 'Passer en mode jour' : 'Passer en mode nuit'}
            aria-pressed={night}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink ring-2 ring-line transition hover:ring-dusk"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={night ? 'moon' : 'sun'}
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {night ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Ouvrir le panier, ${count} oreiller${count > 1 ? 's' : ''}`}
            className="relative grid size-11 cursor-pointer place-items-center rounded-full text-ink ring-2 ring-line transition hover:ring-dusk"
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 18 }}
                  className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-peach px-1 text-xs font-extrabold text-peach-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a href="#offre" className="btn-sun hidden min-h-11 items-center rounded-full px-5 font-display font-semibold sm:inline-flex">
            Commander
          </a>
        </div>
      </div>
    </header>
  )
}
