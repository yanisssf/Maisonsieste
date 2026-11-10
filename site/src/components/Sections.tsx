import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Plus } from 'lucide-react'
import { FAQ } from '../data'
import { cn } from '../lib/utils'
import { CloudMark, SkyCloud } from './Cloud'
import { colorOf, type ColorId } from '../data'
import { Reveal, SectionHead } from './ui'

export function Steps() {
  const steps = [
    ['Tu commandes', 'En deux clics, paiement sécurisé par carte.'],
    ['Il arrive roulé', 'Un colis compact, livré chez toi en France.'],
    ['Tu testes 30 nuits', 'Pas convaincu ? Tu nous le renvoies.'],
  ]
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHead eyebrow="Comment ça marche" title="De la commande au premier rêve." />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3">
          <motion.span
            aria-hidden="true"
            className="absolute top-8 left-8 hidden h-1 origin-left rounded-full bg-gradient-to-r from-dusk via-lilac to-peach md:block"
            style={{ right: '16%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={0.2 + i * 0.25} className="relative grid gap-3">
              <span className="clay grid size-16 place-items-center rounded-full font-display text-3xl font-bold text-dusk ring-4 ring-sky">{i + 1}</span>
              <h3 className="text-2xl font-semibold">{t}</h3>
              <p className="text-mute">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6">
        <SectionHead eyebrow="Questions" title="Tout ce que tu te demandes." />
        <div className="mt-12 grid gap-3">
          {FAQ.map((f, i) => {
            const on = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05} className="clay overflow-hidden rounded-3xl">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-display text-xl font-semibold"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className={cn('grid size-9 shrink-0 place-items-center rounded-full transition-colors', on ? 'bg-dusk text-on-dusk' : 'bg-foam')}>
                      <Plus className="size-5" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p className="max-w-[62ch] px-6 pb-6 text-mute">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Final({ color }: { color: ColorId }) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0.8, 1], [80, 0])
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky to-sky-2 pt-24 pb-10 text-center sm:pt-32">
      <SkyCloud className="absolute top-10 -left-10 w-64 opacity-70" />
      <SkyCloud className="absolute top-40 -right-16 w-80 opacity-60" />
      <div className="relative mx-auto grid max-w-[900px] justify-items-center gap-7 px-4">
        <Reveal>
          <h2 className="text-[clamp(3rem,9vw,6.5rem)] font-bold">
            Ce soir,
            <br />
            <span className="bg-gradient-to-r from-dusk via-lilac to-peach bg-clip-text text-transparent">dors mieux.</span>
          </h2>
        </Reveal>
        <a href="#offre" className="btn-sun inline-flex min-h-14 items-center rounded-full px-8 font-display text-xl font-semibold">
          Je veux mon nuage
        </a>
        <motion.div style={{ y }} className="w-full max-w-[520px]">
          <img src={colorOf(color).src} alt={`Cloud Pillow ${colorOf(color).name}`} className="w-full drop-shadow-[0_30px_30px_rgb(24_32_74/0.3)]" />
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <footer className="border-t-2 border-line bg-sky pt-14 pb-28 md:pb-14">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr]">
        <div className="grid content-start gap-4">
          <a href="#top" className="flex items-center gap-2.5 font-display text-2xl font-semibold">
            <CloudMark className="h-6 w-9 text-dusk" /> Maison Sieste
          </a>
          <p className="max-w-[40ch] text-mute">L’oreiller nuage, pensé pour les siestes, les grasses mat’ et toutes les nuits entre les deux.</p>
        </div>
        <form
          className="grid content-start gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (email.includes('@')) setSent(true)
          }}
        >
          <label htmlFor="news" className="font-display text-lg font-semibold">
            Reçois nos conseils sommeil (et −10 % au lancement)
          </label>
          {sent ? (
            <p className="font-bold text-dusk" role="status">
              C’est noté, merci ! On te prévient dès le lancement.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <input
                id="news"
                type="email"
                required
                autoComplete="email"
                placeholder="ton@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 min-w-0 flex-1 rounded-2xl bg-cloud px-4 ring-2 ring-line outline-none focus:ring-dusk"
              />
              <button type="submit" className="min-h-12 cursor-pointer rounded-2xl bg-ink px-5 font-bold text-sky">
                Recevoir
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 text-[15px] text-mute sm:px-6">
        <nav aria-label="Informations" className="flex flex-wrap gap-x-6 gap-y-2">
          {['Contact', 'CGV', 'Mentions légales', 'Retours', 'Confidentialité'].map((l) => (
            <a key={l} href="#top" className="hover:text-ink">
              {l}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Maison Sieste · Version de travail : photos, prix et livraison à confirmer</p>
      </div>
    </footer>
  )
}
