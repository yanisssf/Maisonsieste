import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { SectionHead, Reveal } from './ui'
import { useCart } from '../cart'
import type { ColorId } from '../data'

const Q = [
  { id: 'pos', title: 'Comment tu t’endors le plus souvent ?', opts: [['dos', 'Sur le dos'], ['cote', 'Sur le côté'], ['ventre', 'Sur le ventre']] },
  { id: 'actuel', title: 'Ton oreiller actuel, il est…', opts: [['plat', 'Trop plat'], ['haut', 'Trop haut'], ['ok', 'Ça va, mais pas top']] },
  { id: 'matin', title: 'Le matin, tu te réveilles plutôt…', opts: [['raide', 'La nuque un peu raide'], ['bras', 'Le bras engourdi'], ['forme', 'En forme, je veux juste mieux']] },
] as const

export function Quiz({ color }: { color: ColorId }) {
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState<Record<string, string>>({})
  const { add } = useCart()
  const done = step >= Q.length
  const cur = Q[Math.min(step, Q.length - 1)]

  let title = 'Côté bas'
  let text = 'Sur le dos, ta tête a besoin de peu de hauteur : le côté bas la laisse se poser pendant que la vague soutient ta nuque.'
  if (ans.pos === 'cote') {
    title = 'Côté haut'
    text = 'Sur le côté, il faut combler l’espace entre ton épaule et ta tête : le côté haut garde ta tête dans l’axe de ton buste.'
  } else if (ans.pos === 'ventre') {
    text = 'Sur le ventre, moins c’est haut, mieux c’est : prends le côté bas, et essaie de glisser un peu sur le côté pour en profiter pleinement.'
  }
  if (ans.actuel === 'haut') text += ' Comme ton oreiller actuel te paraît trop haut, tu vas sentir la différence dès la première nuit.'
  if (ans.actuel === 'plat') text += ' Et contrairement à ton oreiller actuel, la mousse ne s’écrase pas au fil de la nuit.'

  return (
    <section id="quiz" className="relative overflow-hidden bg-gradient-to-b from-sky to-sky-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[760px] px-4 sm:px-6">
        <SectionHead center eyebrow="Quiz · 30 secondes" title="Quel côté est fait pour toi ?" />
        <Reveal className="clay mt-10 rounded-[36px] p-6 sm:p-10">
          <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-foam" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={Math.min(step, 3)} aria-label="Progression du quiz">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-dusk to-peach" animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                <p className="text-[15px] text-mute">Question {step + 1} sur 3</p>
                <h3 className="mt-2 text-3xl font-semibold">{cur.title}</h3>
                <div className="mt-6 grid gap-3">
                  {cur.opts.map(([v, l], i) => (
                    <motion.button
                      key={v}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setAns({ ...ans, [cur.id]: v })
                        setStep(step + 1)
                      }}
                      className="min-h-14 cursor-pointer rounded-2xl bg-foam px-5 py-4 text-left text-lg font-semibold ring-2 ring-line transition-colors hover:ring-dusk"
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 font-bold text-dusk">
                    <ArrowLeft className="size-4" /> Question précédente
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} aria-live="polite">
                <p className="text-[15px] text-mute">Ton résultat</p>
                <h3 className="mt-1 bg-gradient-to-r from-dusk to-peach bg-clip-text text-5xl font-bold text-transparent">{title}</h3>
                <p className="mt-4 text-lg">{text}</p>
                <p className="mt-3 text-mute">Laisse-toi quelques nuits pour t’habituer, c’est normal avec une mousse à mémoire de forme. Et tu as 30 nuits pour l’essayer.</p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => add('solo', color)} className="btn-sun min-h-14 cursor-pointer rounded-full px-7 font-display text-lg font-semibold">
                    Je veux mon Cloud Pillow · 49 €
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0)
                      setAns({})
                    }}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-bold text-dusk"
                  >
                    <RotateCcw className="size-4" /> Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
