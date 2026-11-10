import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, MoonStar, RotateCcw, Truck } from 'lucide-react'
import { COLORS, PACKS, PHOTO_LIT, SIZE, colorOf, type ColorId, type PackId } from '../data'
import { useCart } from '../cart'
import { cn, euro } from '../lib/utils'
import { Btn } from './ui'

type View = 'produit' | 'lit'

export function Product({ color, setColor }: { color: ColorId; setColor: (c: ColorId) => void }) {
  const [pack, setPack] = useState<PackId>('duo')
  const [view, setView] = useState<View>('produit')
  const { add } = useCart()
  const c = colorOf(color)
  const p = PACKS[pack]

  return (
    <section id="produit" className="bg-white">
      <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[1.25fr_1fr]">
        {/* gallery */}
        <div className="grid gap-px bg-rule lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:grid-rows-[1fr_auto]">
          <div className="metal relative grid min-h-[380px] place-items-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {view === 'produit' ? (
                <motion.img
                  key={c.id}
                  src={c.src}
                  alt={`Cloud Pillow, coloris ${c.name}`}
                  className="w-[min(82%,640px)] drop-shadow-[0_40px_30px_rgb(17_19_24/0.28)]"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : (
                <motion.img
                  key="lit"
                  src={PHOTO_LIT}
                  alt="Une femme dort sur le dos, la nuque posée sur le Cloud Pillow bleu nuit"
                  className="absolute inset-0 size-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            <span className="eyebrow absolute top-5 left-5 text-[11px] text-ink/60">Cloud Pillow · {c.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-px">
            {(
              [
                ['produit', 'Produit', c.src],
                ['lit', 'Au lit', PHOTO_LIT],
              ] as const
            ).map(([v, l, src]) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn('flex h-20 cursor-pointer items-center gap-3 px-5 text-left text-sm font-medium transition-colors', view === v ? 'bg-white' : 'bg-paper text-mute hover:bg-white')}
              >
                <img src={src} alt="" className={cn('h-12 w-16 object-cover', v === 'produit' && 'object-contain')} />
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div className="grid content-start gap-8 border-rule px-4 py-12 sm:px-10 lg:border-l lg:py-16">
          <div className="grid gap-3">
            <p className="eyebrow text-mute">Oreiller · mousse à mémoire de forme</p>
            <h2 className="text-5xl font-extrabold sm:text-6xl">Cloud Pillow</h2>
            <p className="font-display text-2xl font-semibold tabular-nums">
              {euro(p.price)}
              {p.was && <s className="ml-3 text-lg font-medium text-mute">{euro(p.was)}</s>}
            </p>
            <p className="max-w-[48ch] text-mute">
              Double face, double hauteur. La mousse épouse la forme de votre tête et soutient la nuque, puis reprend lentement sa forme. Housse amovible, lavable en machine.
            </p>
          </div>

          <fieldset className="grid gap-3 border-t border-rule pt-6">
            <legend className="mb-3 flex w-full justify-between text-sm">
              <span className="eyebrow text-mute">Coloris</span>
              <span className="font-medium">{c.name}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((k) => (
                <label key={k.id} title={k.name} className="cursor-pointer">
                  <input type="radio" name="pro-color" value={k.id} checked={color === k.id} onChange={() => setColor(k.id)} className="peer sr-only" />
                  <span className="sr-only">{k.name}</span>
                  <span
                    className={cn(
                      'block size-11 rounded-[2px] ring-1 ring-offset-[3px] ring-offset-white transition peer-focus-visible:outline-2 peer-focus-visible:outline-ink',
                      color === k.id ? 'ring-ink' : 'ring-rule hover:ring-mute',
                    )}
                    style={{ background: k.hex }}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-3 border-t border-rule pt-6">
            <legend className="eyebrow mb-3 text-mute">Format</legend>
            {(Object.keys(PACKS) as PackId[]).map((id) => {
              const k = PACKS[id]
              const on = pack === id
              return (
                <label key={id} className={cn('flex cursor-pointer items-center justify-between gap-4 rounded-[3px] px-5 py-4 ring-1 transition', on ? 'ring-ink' : 'ring-rule hover:ring-mute')}>
                  <input type="radio" name="pro-pack" value={id} checked={on} onChange={() => setPack(id)} className="peer sr-only" />
                  <span className="flex items-center gap-4">
                    <span className={cn('grid size-5 place-items-center rounded-[2px] ring-1 transition peer-focus-visible:outline-2', on ? 'bg-ink ring-ink' : 'ring-mute')}>
                      {on && <Check className="size-3.5 text-white" strokeWidth={3} />}
                    </span>
                    <span>
                      <b className="block font-display font-semibold">{k.name}</b>
                      <span className="text-sm text-mute">{id === 'duo' ? '2 oreillers · 39,50 € l’unité · économie de 19 €' : 'Un oreiller'}</span>
                    </span>
                  </span>
                  <span className="font-display font-semibold tabular-nums">{euro(k.price)}</span>
                </label>
              )
            })}
          </fieldset>

          <div className="grid gap-3">
            <Btn onClick={() => add(pack, color)} className="min-h-14 w-full text-base">
              Ajouter au panier · {euro(p.price)}
            </Btn>
            <p className="text-center text-sm text-mute">Paiement sécurisé · Expédié depuis la France</p>
          </div>

          <ul className="grid divide-y divide-rule border-y border-rule text-sm">
            {[
              [MoonStar, 'Essai de 30 nuits', 'Il ne vous convient pas ? Nous organisons le retour.'],
              [Truck, 'Livré roulé sous vide', `Colis compact. ${SIZE} une fois déployé.`],
              [RotateCcw, 'Housse amovible', 'Lavable en machine. La mousse s’aère simplement.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Truck
              return (
                <li key={t as string} className="flex gap-4 py-4">
                  <I className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <b className="block font-semibold">{t as string}</b>
                    <span className="text-mute">{d as string}</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
