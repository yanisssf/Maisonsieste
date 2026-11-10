import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { PACKS } from '../data'
import { useCart } from '../cart'
import { euro } from '../lib/utils'
import { PillowArt } from './Cloud'

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

  const hasSolo = lines.some((l) => l.id === 'solo')
  const hasDuo = lines.some((l) => l.id === 'duo')

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-[#18204A]/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Ton panier"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-sky shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b-2 border-line px-6 py-5">
              <h2 className="text-2xl font-semibold">Ton panier</h2>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Fermer le panier" className="grid size-11 cursor-pointer place-items-center rounded-full ring-2 ring-line hover:ring-dusk">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <div className="grid justify-items-center gap-4 pt-16 text-center text-mute">
                  <ShoppingBag className="size-10" aria-hidden="true" />
                  <p>Ton panier est vide. Un nuage ?</p>
                  <button type="button" onClick={() => add('duo')} className="btn-sun min-h-12 cursor-pointer rounded-full px-6 font-display font-semibold">
                    Ajouter le duo · 79 €
                  </button>
                </div>
              ) : (
                <ul className="grid gap-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const p = PACKS[l.id]
                      return (
                        <motion.li
                          key={l.id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          className="clay grid grid-cols-[80px_1fr] items-center gap-4 rounded-3xl p-4"
                        >
                          <div className="grid aspect-square place-items-center rounded-2xl bg-foam p-1">
                            <PillowArt className="w-full" />
                          </div>
                          <div className="grid gap-2">
                            <div className="flex justify-between gap-2 font-display text-lg font-semibold">
                              <span>{p.name}</span>
                              <span className="tabular-nums">{euro(p.price * l.qty)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button type="button" aria-label={`Retirer un ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)} className="grid size-11 cursor-pointer place-items-center rounded-full bg-foam ring-1 ring-line">
                                <Minus className="size-4" />
                              </button>
                              <span className="w-6 text-center font-bold tabular-nums" aria-live="polite">
                                {l.qty}
                              </span>
                              <button type="button" aria-label={`Ajouter un ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)} className="grid size-11 cursor-pointer place-items-center rounded-full bg-foam ring-1 ring-line">
                                <Plus className="size-4" />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
              )}
              {hasSolo && !hasDuo && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-3xl bg-dusk p-5 text-on-dusk">
                  <p className="font-display text-lg font-semibold">Passe au duo, économise 19 €</p>
                  <p className="mt-1 text-[15px] opacity-85">Un nuage pour toi, un pour l’autre côté du lit.</p>
                  <button
                    type="button"
                    onClick={() => {
                      const solo = lines.find((l) => l.id === 'solo')!
                      setQty('solo', solo.qty - 1)
                      add('duo')
                    }}
                    className="mt-3 min-h-11 cursor-pointer rounded-full bg-on-dusk px-5 font-bold text-dusk"
                  >
                    Passer au duo
                  </button>
                </motion.div>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t-2 border-line px-6 py-5">
                <div className="flex justify-between font-display text-xl font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">{euro(total)}</span>
                </div>
                <p className="mt-1 text-[15px] text-mute">Essai 30 nuits inclus. Frais de livraison calculés au paiement.</p>
                <button type="button" onClick={() => setNotice(true)} className="btn-sun mt-4 min-h-14 w-full cursor-pointer rounded-full font-display text-lg font-semibold">
                  Passer au paiement
                </button>
                {notice && (
                  <p role="status" className="mt-3 text-center font-bold text-dusk">
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

export function StickyBuy() {
  const { add } = useCart()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const offer = document.getElementById('offre')?.getBoundingClientRect()
      const inOffer = offer ? offer.top < innerHeight && offer.bottom > 0 : false
      setShow(scrollY > innerHeight * 0.9 && !inOffer)
    }
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-full bg-cloud/90 py-2 pr-2 pl-5 shadow-2xl ring-1 ring-line backdrop-blur-xl md:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <span className="font-display leading-tight font-semibold">
            Cloud Pillow
            <span className="block text-sm text-mute">dès 49 € · 2 pour 79 €</span>
          </span>
          <button type="button" onClick={() => add('duo')} className="btn-sun min-h-12 cursor-pointer rounded-full px-5 font-display font-semibold">
            Le duo · 79 €
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
