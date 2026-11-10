import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { COLORS, PACKS, colorOf, type ColorId, type PackId } from '../data'
import { useCart } from '../cart'
import { euro, cn } from '../lib/utils'
import { Eyebrow, Reveal, SectionHead } from './ui'

export function Compare() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHead eyebrow="Pourquoi un nuage" title="Pas un oreiller ergonomique de plus.">
          La plupart des oreillers à mémoire de forme se ressemblent : gros, rigides, médicaux. On a cherché l’inverse.
        </SectionHead>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="grid content-start gap-5 rounded-[36px] p-8 ring-2 ring-line sm:p-10">
            <Eyebrow className="text-mute">L’ergonomique classique</Eyebrow>
            <h3 className="text-3xl font-semibold">Gros, dur, carré</h3>
            <ul className="grid gap-3 text-mute">
              {['Forme épaisse et creusée, look médical', 'Vendu partout, au même prix', 'Pensé pour la pharmacie, pas pour ta chambre'].map((t) => (
                <li key={t} className="flex gap-3 font-semibold">
                  <X className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative grid content-start gap-5 overflow-hidden rounded-[36px] bg-dusk p-8 text-on-dusk sm:p-10">
            <motion.div
              aria-hidden="true"
              className="absolute -top-20 -right-20 size-64 rounded-full bg-lilac/40 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <p className="relative font-display text-sm font-semibold tracking-[0.14em] uppercase opacity-80">Le Cloud Pillow</p>
            <h3 className="relative text-3xl font-semibold">Doux, arrondi, beau</h3>
            <ul className="relative grid gap-3">
              {['Forme nuage tout en rondeurs', 'Soutien de la nuque, sans effet « orthopédique »', 'Un objet qu’on a envie de laisser sur son lit'].map((t) => (
                <li key={t} className="flex gap-3 font-semibold">
                  <Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Offer({ color, setColor }: { color: ColorId; setColor: (c: ColorId) => void }) {
  const [pack, setPack] = useState<PackId>('duo')
  const { add } = useCart()
  const p = PACKS[pack]

  return (
    <section id="offre" className="px-4 py-12 sm:px-6">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[40px] bg-[#18204A] text-[#EEF1FF]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-1 rounded-full bg-[#FFD9A8]"
              style={{ left: `${(i * 41) % 100}%`, top: `${(i * 29) % 100}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.13 }}
            />
          ))}
        </div>
        <div className="relative grid items-center gap-12 p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.14em] text-[#FFD9A8] uppercase">Commander</p>
            <h2 className="mt-3 text-[clamp(2.4rem,5vw,4rem)] font-bold">Un nuage, ou deux ?</h2>
            <p className="mt-4 max-w-[36ch] text-lg opacity-80">On dort rarement seul. Le duo te fait économiser 19 €, et tu as 30 nuits pour l’essayer.</p>
            <div className="relative mt-8 grid aspect-[1.6] max-w-[520px] place-items-center">
              <div className="absolute inset-[10%] rounded-full blur-3xl" style={{ background: colorOf(color).hex, opacity: 0.35 }} />
              <AnimatePresence mode="popLayout" initial={false}>
                {Array.from({ length: PACKS[pack].pillows }).map((_, i) => (
                  <motion.img
                    key={`${color}-${pack}-${i}`}
                    src={colorOf(color).src}
                    alt={i === 0 ? `Cloud Pillow ${colorOf(color).name}` : ''}
                    className="absolute w-[78%] drop-shadow-[0_30px_30px_rgb(0_0_0/0.45)]"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: pack === 'duo' ? 0.82 : 1, x: pack === 'duo' ? (i === 0 ? '-14%' : '14%') : 0, y: pack === 'duo' ? (i === 0 ? -18 : 18) : 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              add(pack, color)
            }}
          >
            <fieldset className="mb-6 grid gap-3">
              <legend className="mb-3 font-display text-sm font-semibold tracking-[0.14em] text-[#FFD9A8] uppercase">Couleur · {colorOf(color).name}</legend>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <label key={c.id} className="cursor-pointer" title={c.name}>
                    <input type="radio" name="color" value={c.id} checked={color === c.id} onChange={() => setColor(c.id)} className="peer sr-only" />
                    <span className="sr-only">{c.name}</span>
                    <span
                      className={cn('block size-11 rounded-full ring-2 ring-offset-4 ring-offset-[#18204A] transition peer-focus-visible:outline-3 peer-focus-visible:outline-[#FF9466]', color === c.id ? 'ring-[#FF9466]' : 'ring-transparent hover:ring-white/40')}
                      style={{ background: c.hex }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="grid gap-4">
              <legend className="mb-3 font-display text-sm font-semibold tracking-[0.14em] text-[#FFD9A8] uppercase">Choisis ton offre</legend>
              {(Object.keys(PACKS) as PackId[]).map((id) => {
                const k = PACKS[id]
                const on = pack === id
                return (
                  <label
                    key={id}
                    className={cn(
                      'relative grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-3xl p-5 ring-2 transition-all',
                      on ? 'bg-[#FF9466]/10 ring-[#FF9466]' : 'ring-white/20 hover:ring-white/40',
                    )}
                  >
                    <input type="radio" name="pack" value={id} checked={on} onChange={() => setPack(id)} className="peer sr-only" />
                    <span className="grid size-6 place-items-center rounded-full ring-2 ring-white/60 peer-focus-visible:outline-3 peer-focus-visible:outline-[#FF9466]">
                      <motion.span animate={{ scale: on ? 1 : 0 }} className="size-3 rounded-full bg-[#FF9466]" />
                    </span>
                    <span>
                      <b className="block font-display text-xl font-semibold">{k.name}</b>
                      <small className="text-[15px] opacity-75">{k.sub}</small>
                    </span>
                    <span className="text-right font-display text-2xl font-semibold tabular-nums">
                      {k.was && <s className="block text-sm font-medium opacity-60">{euro(k.was)}</s>}
                      {euro(k.price)}
                    </span>
                    {id === 'duo' && (
                      <span className="absolute -top-3 right-5 rounded-full bg-[#FF9466] px-3 py-1 font-display text-xs font-semibold tracking-wide text-[#2A1408] uppercase">
                        Le plus choisi
                      </span>
                    )}
                  </label>
                )
              })}
            </fieldset>
            <motion.button whileTap={{ scale: 0.97 }} type="submit" className="btn-sun mt-6 min-h-14 w-full cursor-pointer rounded-full font-display text-xl font-semibold">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={pack} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="inline-block">
                  Ajouter au panier · {euro(p.price)}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <p className="mt-3 text-center text-[15px] opacity-75">Paiement sécurisé · Essai 30 nuits · Livré en France</p>
          </form>
        </div>
      </div>
    </section>
  )
}
