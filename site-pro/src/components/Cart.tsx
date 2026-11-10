import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, X } from 'lucide-react'
import { PACKS, colorOf, type ColorId } from '../data'
import { useCart } from '../cart'
import { euro } from '../lib/utils'
import { Btn } from './ui'

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, add } = useCart()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    if (!open) return
    setNotice(false)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  const solo = lines.find((l) => l.id === 'solo')
  const hasDuo = lines.some((l) => l.id === 'duo')

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-50 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Votre panier"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-rule px-6">
              <h2 className="eyebrow text-[13px]">Panier</h2>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Fermer le panier" className="grid size-11 cursor-pointer place-items-center">
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="grid justify-items-center gap-5 px-6 pt-20 text-center">
                  <p className="text-mute">Votre panier est vide.</p>
                  <Btn onClick={() => add('duo')}>Ajouter le duo · 79 €</Btn>
                </div>
              ) : (
                <ul className="divide-y divide-rule">
                  {lines.map((l) => {
                    const p = PACKS[l.id]
                    const c = colorOf(l.color)
                    return (
                      <li key={l.key} className="grid grid-cols-[96px_1fr] gap-5 px-6 py-6">
                        <div className="metal grid aspect-square place-items-center p-2">
                          <img src={c.src} alt="" className="w-full" />
                        </div>
                        <div className="grid content-between gap-3">
                          <div className="flex justify-between gap-3">
                            <span>
                              <b className="block font-display font-semibold">{p.name}</b>
                              <span className="text-sm text-mute">{c.name}</span>
                            </span>
                            <span className="font-display font-semibold tabular-nums">{euro(p.price * l.qty)}</span>
                          </div>
                          <div className="flex w-fit items-center ring-1 ring-rule">
                            <button type="button" aria-label={`Retirer un ${p.name}`} onClick={() => setQty(l.key, l.qty - 1)} className="grid size-10 cursor-pointer place-items-center hover:bg-paper">
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                              {l.qty}
                            </span>
                            <button type="button" aria-label={`Ajouter un ${p.name}`} onClick={() => setQty(l.key, l.qty + 1)} className="grid size-10 cursor-pointer place-items-center hover:bg-paper">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
              {solo && !hasDuo && (
                <div className="mx-6 mb-6 grid gap-3 border border-ink p-5">
                  <p className="font-display font-semibold">Passez au duo : 79 € les deux.</p>
                  <p className="text-sm text-mute">Économisez 19 € avec un second oreiller.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQty(solo.key, solo.qty - 1)
                      add('duo', solo.color)
                    }}
                    className="w-fit cursor-pointer text-sm font-semibold underline underline-offset-4"
                  >
                    Passer au duo
                  </button>
                </div>
              )}
            </div>
            {lines.length > 0 && (
              <div className="grid gap-3 border-t border-rule px-6 py-6">
                <div className="flex justify-between font-display text-lg font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">{euro(total)}</span>
                </div>
                <p className="text-sm text-mute">Essai de 30 nuits inclus. Livraison calculée au paiement.</p>
                <Btn onClick={() => setNotice(true)} className="min-h-14 w-full">
                  Paiement
                </Btn>
                {notice && (
                  <p role="status" className="text-center text-sm font-medium">
                    Le paiement sécurisé arrive bientôt (boutique Shopify en préparation).
                  </p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function StickyBuy({ color }: { color: ColorId }) {
  const { add } = useCart()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const r = document.getElementById('produit')?.getBoundingClientRect()
      const inside = r ? r.top < innerHeight && r.bottom > 0 : false
      setShow(scrollY > innerHeight && !inside)
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-rule bg-white/95 px-4 py-3 backdrop-blur md:hidden"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          <span className="text-sm leading-tight">
            <b className="block font-display">Cloud Pillow</b>
            <span className="text-mute">49 € · 2 pour 79 €</span>
          </span>
          <Btn onClick={() => add('duo', color)}>Le duo · 79 €</Btn>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
