import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'
import { PHOTO_LIT } from '../data'
import { cn } from '../lib/utils'
import { Head, LinkBtn, Reveal } from './ui'

const TICKER = ['Mousse à mémoire de forme', 'Double face', 'Housse lavable', 'Essai 30 nuits', 'Livré sous vide', '5 coloris']

export function Band() {
  const row = (
    <span className="flex shrink-0 items-center">
      {TICKER.map((t) => (
        <span key={t} className="flex items-center gap-10 pr-10 whitespace-nowrap">
          {t}
          <span className="h-px w-8 bg-white/30" />
        </span>
      ))}
    </span>
  )
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-4 text-[13px] font-medium tracking-[0.18em] text-white/80 uppercase" aria-hidden="true">
      <div className="flex w-max animate-[tick_40s_linear_infinite]">
        {row}
        {row}
      </div>
      <style>{`@keyframes tick{to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

const ROWS: [string, string, string][] = [
  ['Forme', 'Épaisse, creusée', 'Nuage, double face'],
  ['Hauteur', 'Une seule', 'Deux, selon la position'],
  ['Aspect', 'Médical', 'Objet de chambre'],
  ['Housse', 'Souvent fixe', 'Amovible, lavable'],
]

export function Compare() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
        <Head eyebrow="Comparatif" title="Pas un oreiller ergonomique de plus." />
        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-ink">
                <th className="eyebrow py-4 pr-4 text-[11px] font-semibold text-mute" scope="col">
                  Critère
                </th>
                <th className="eyebrow py-4 pr-4 text-[11px] font-semibold text-mute" scope="col">
                  Ergonomique classique
                </th>
                <th className="eyebrow py-4 text-[11px] font-semibold" scope="col">
                  Cloud Pillow
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k} className="border-b border-rule">
                  <th scope="row" className="py-5 pr-4 font-display font-semibold">
                    {k}
                  </th>
                  <td className="py-5 pr-4 text-mute">{a}</td>
                  <td className="py-5 font-medium">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}

const FAQ = [
  ['Pourquoi deux hauteurs ?', 'Un côté bas, un côté haut. Sur le dos, la tête a besoin de peu de hauteur ; sur le côté, il faut combler l’espace entre l’épaule et la tête. Il suffit de le retourner.'],
  ['Comment fonctionne l’essai de 30 nuits ?', 'Dormez dessus pendant 30 nuits. S’il ne vous convient pas, contactez-nous et nous organisons le retour. Comptez quelques nuits d’adaptation, c’est normal avec une mousse à mémoire de forme.'],
  ['Il arrive compressé, est-ce normal ?', 'Oui. Il est roulé sous vide pour le transport. Sortez-le de son emballage et laissez-le reprendre sa forme quelques heures avant la première nuit.'],
  ['Comment l’entretenir ?', 'La housse s’enlève et se lave en machine. La mousse ne se lave pas : aérez-la simplement de temps en temps.'],
  ['Où est-il fabriqué ?', 'Il est conçu par Maison Sieste et fabriqué par un partenaire sélectionné. Matières et certifications seront détaillées sur la fiche produit avant le lancement.'],
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <Head eyebrow="Questions" title="Avant de commander." />
        <div className="border-t border-ink">
          {FAQ.map(([q, a], i) => {
            const on = open === i
            return (
              <div key={q} className="border-b border-rule">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`pfaq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold tracking-[-0.01em]"
                  >
                    {q}
                    {on ? <Minus className="size-4 shrink-0" /> : <Plus className="size-4 shrink-0" />}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`pfaq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="max-w-[60ch] pb-6 text-mute">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Final() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-32 text-center text-white sm:py-44">
      <img src={PHOTO_LIT} alt="" className="absolute inset-0 -z-10 size-full object-cover object-[60%_center] opacity-35 grayscale" />
      <div className="mx-auto grid max-w-[900px] justify-items-center gap-8 px-4">
        <p className="eyebrow text-white/70">Maison Sieste</p>
        <h2 className="text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] font-extrabold">Ce soir, dormez mieux.</h2>
        <LinkBtn href="#produit" variant="light">
          Commander le Cloud Pillow
        </LinkBtn>
      </div>
    </section>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <footer className="metal-dark pt-16 pb-28 text-white/80 md:pb-12">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 md:grid-cols-[1fr_1fr]">
        <div className="grid content-start gap-4">
          <p className="font-display text-[15px] font-bold tracking-[0.28em] text-white uppercase">Maison Sieste</p>
          <p className="max-w-[40ch] text-sm">L’oreiller nuage, pour les siestes, les grasses matinées et toutes les nuits entre les deux.</p>
        </div>
        <form
          className="grid content-start gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (email.includes('@')) setSent(true)
          }}
        >
          <label htmlFor="pnews" className="eyebrow text-white/60">
            Lettre d’information · −10 % au lancement
          </label>
          {sent ? (
            <p role="status" className="font-medium text-white">
              Merci. Nous vous préviendrons dès le lancement.
            </p>
          ) : (
            <div className="flex border-b border-white/30 focus-within:border-white">
              <input
                id="pnews"
                type="email"
                required
                autoComplete="email"
                placeholder="votre@email.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
              />
              <button type="submit" className="cursor-pointer px-2 text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
                S’inscrire
              </button>
            </div>
          )}
        </form>
      </div>
      <div className={cn('mx-auto mt-14 flex max-w-[1320px] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-4 pt-6 text-[13px] text-white/55 sm:px-8')}>
        <nav aria-label="Informations" className="flex flex-wrap gap-x-6 gap-y-2">
          {['Contact', 'CGV', 'Mentions légales', 'Retours', 'Confidentialité'].map((l) => (
            <a key={l} href="#top" className="hover:text-white">
              {l}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Maison Sieste · Version de travail : photos, prix et livraison à confirmer</p>
      </div>
    </footer>
  )
}
