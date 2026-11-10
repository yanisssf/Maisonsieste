// Adapted from 21st.dev "Features With Panel" (scrollxui): numbered list + sticky media panel.
// Media are animated illustrations instead of videos, until real product shots exist.
import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../lib/utils'
import { SectionHead } from './ui'

const loop = { repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' } as const

function Stage({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true">{children}</svg>
}
const PILLOW = 'M70 220c-30 0-44-26-34-48 7-16 22-22 34-20-2-26 18-46 46-42 12-22 46-28 66-10 26-12 60 4 62 34 26 2 44 24 36 50-6 22-28 34-50 34-18 16-60 18-82 4-20 12-56 8-78-2Z'

const ITEMS: { title: string; text: string; spec: string; media: ReactNode }[] = [
  {
    title: 'Mousse à mémoire de forme',
    text: 'Elle s’adapte à ta tête et à ta nuque, quelle que soit ta position, puis reprend doucement sa forme.',
    spec: 'Soutien enveloppant',
    media: (
      <Stage>
        <motion.path d={PILLOW} transform="translate(20 0)" fill="var(--pw-1)" stroke="var(--pw-3)" strokeWidth="3"
          animate={{ scaleY: [1, 0.86, 0.86, 1] }} style={{ originY: '220px' }} transition={{ duration: 3.2, ...loop }} />
        <motion.circle cx="200" r="34" fill="var(--dusk)" animate={{ cy: [40, 118, 118, 40], opacity: [0, 1, 1, 0] }} transition={{ duration: 3.2, ...loop }} />
      </Stage>
    ),
  },
  {
    title: 'Double hauteur',
    text: 'Un côté bas pour dormir sur le dos, un côté haut pour dormir sur le côté. Tu le tournes, c’est tout.',
    spec: '2 hauteurs en 1',
    media: (
      <Stage>
        <motion.g style={{ originX: '200px', originY: '170px' }} animate={{ rotate: [0, 0, 180, 180, 360] }} transition={{ duration: 4.5, ...loop }}>
          <path d="M80 200 C 130 196 190 180 240 180 C 270 180 300 140 320 140 L 320 200 Z" fill="var(--pw-1)" stroke="var(--pw-3)" strokeWidth="3" />
        </motion.g>
        <motion.text x="200" y="80" textAnchor="middle" className="font-display" fontSize="28" fontWeight="600" fill="var(--dusk)"
          animate={{ opacity: [1, 1, 0, 0, 1] }} transition={{ duration: 4.5, ...loop }}>côté bas</motion.text>
        <motion.text x="200" y="80" textAnchor="middle" className="font-display" fontSize="28" fontWeight="600" fill="var(--peach)"
          animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 4.5, ...loop }}>côté haut</motion.text>
      </Stage>
    ),
  },
  {
    title: 'Housse amovible et lavable',
    text: 'Elle s’enlève en quelques secondes et passe à la machine. La mousse, elle, s’aère simplement.',
    spec: 'Lavable en machine',
    media: (
      <Stage>
        <path d={PILLOW} transform="translate(20 0)" fill="var(--foam)" stroke="var(--line)" strokeWidth="3" strokeDasharray="6 8" />
        <motion.path d={PILLOW} transform="translate(20 0)" fill="var(--lilac)" opacity=".85"
          animate={{ x: [0, 0, 260, 260, 0], opacity: [0.85, 0.85, 0, 0, 0.85] }} transition={{ duration: 4, ...loop }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle key={i} cx={120 + i * 40} r={6 + (i % 3) * 3} fill="none" stroke="var(--dusk)" strokeWidth="2"
            animate={{ cy: [250, 60], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }} />
        ))}
      </Stage>
    ),
  },
  {
    title: 'Livré roulé sous vide',
    text: 'Il arrive dans un colis compact. Tu l’ouvres, et il gonfle en quelques heures.',
    spec: 'Prêt en quelques heures',
    media: (
      <Stage>
        <rect x="130" y="190" width="140" height="70" rx="10" fill="var(--peach)" opacity=".85" />
        <motion.g style={{ originX: '200px', originY: '190px' }} animate={{ scale: [0.25, 0.25, 1, 1, 0.25], y: [40, 40, -30, -30, 40] }} transition={{ duration: 4.5, ...loop }}>
          <path d={PILLOW} transform="translate(20 -40)" fill="var(--pw-1)" stroke="var(--pw-3)" strokeWidth="3" />
        </motion.g>
        <rect x="130" y="190" width="140" height="18" rx="6" fill="var(--peach)" />
      </Stage>
    ),
  },
]

export function Features() {
  const [active, setActive] = useState(0)
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <SectionHead eyebrow="Ce qu’il y a dedans" title="Simple, et bien fait." />
            <ul className="mt-10 flex flex-col gap-2">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: 'easeOut' }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={active === i}
                    className={cn(
                      'w-full cursor-pointer rounded-3xl p-5 text-left transition-all duration-200',
                      active === i ? 'clay ring-2 ring-dusk' : 'ring-2 ring-transparent hover:bg-cloud/60',
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={cn(
                          'grid size-10 shrink-0 place-items-center rounded-full font-display text-lg font-semibold transition-colors',
                          active === i ? 'bg-dusk text-on-dusk' : 'bg-foam text-mute',
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className={cn('font-display text-xl font-semibold', active !== i && 'text-mute')}>{item.title}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-3 pl-14 text-mute">{item.text}</span>
                          <span className="block pt-2 pl-14 font-display font-semibold text-dusk">{item.spec}</span>
                          <span className="mt-4 block aspect-[4/3] overflow-hidden rounded-3xl bg-foam lg:hidden">{item.media}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="sticky top-28 hidden lg:block">
            <div className="clay relative aspect-[4/3] w-full overflow-hidden rounded-[36px] bg-foam">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 bg-foam"
                >
                  {ITEMS[active].media}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
