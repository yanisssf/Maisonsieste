// Text-parallax pattern (21st.dev "Text Parallax Content"), restyled square and monochrome.
import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { COLORS, PHOTO_LIT, SIZE, colorOf, type ColorId } from '../data'
import { cn } from '../lib/utils'
import { Head, Reveal } from './ui'

const TOP = 64

export function Parallax({ scene, eyebrow, heading, light, children, id }: { scene: ReactNode; eyebrow: string; heading: string; light?: boolean; children?: ReactNode; id?: string }) {
  const sRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const s = useScroll({ target: sRef, offset: ['end end', 'end start'] })
  const c = useScroll({ target: cRef, offset: ['start end', 'end start'] })
  const scale = useTransform(s.scrollYProgress, [0, 1], [1, 0.88])
  const dim = useTransform(s.scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(c.scrollYProgress, [0, 1], [220, -220])
  const op = useTransform(c.scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])
  return (
    <div id={id}>
      <div className="relative h-[150vh]">
        <motion.div ref={sRef} style={{ height: `calc(100vh - ${TOP}px)`, top: TOP, scale: reduce ? 1 : scale }} className="sticky z-0 overflow-hidden">
          {scene}
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: reduce ? 0 : dim }} />
        </motion.div>
        <motion.div
          ref={cRef}
          style={reduce ? undefined : { y, opacity: op }}
          className={cn('absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-start px-4 pt-[22vh] text-center', light ? 'text-ink' : 'text-white')}
        >
          <p className={cn('eyebrow', light ? 'text-mute' : 'text-white/75')}>{eyebrow}</p>
          <p className="mt-5 max-w-[15ch] font-display text-[clamp(2.6rem,7.5vw,6.4rem)] leading-[0.95] font-extrabold tracking-[-0.035em]">{heading}</p>
        </motion.div>
      </div>
      {children}
    </div>
  )
}

export const PhotoScene = () => (
  <>
    <img src={PHOTO_LIT} alt="" className="absolute inset-0 size-full object-cover object-[60%_center] grayscale-[25%]" />
    <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/40" />
  </>
)

export function SteelScene() {
  const reduce = useReducedMotion()
  return (
    <div className="metal absolute inset-0">
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />
      <motion.img
        src={colorOf('marine').src}
        alt=""
        className="absolute top-[68%] left-1/2 w-[min(78%,640px)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_50px_35px_rgb(17_19_24/0.35)]"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ---------- Details: specs + height diagram ---------- */

const SPECS = [
  ['Garnissage', 'Mousse à mémoire de forme'],
  ['Format', `${SIZE}, double face`],
  ['Hauteurs', 'Côté bas (dos) · côté haut (côté)'],
  ['Housse', 'Amovible, lavable en machine'],
  ['Livraison', 'Roulé sous vide, prêt en quelques heures'],
  ['Essai', '30 nuits'],
]

type Pos = 'dos' | 'cote'
const pth = (yl: number, ym: number, yr: number) => `M20 172 L20 ${yl} C 60 ${yl - 6} 100 ${ym} 140 ${ym} C 156 ${ym} 166 ${yr} 178 ${yr} L 178 172 Z`
const CASES = {
  dos: { pillow: pth(158, 158, 136), head: 130, torso: { y: 124, h: 46 }, label: 'Côté bas · sur le dos' },
  cote: { pillow: pth(140, 140, 120), head: 112, torso: { y: 58, h: 112 }, label: 'Côté haut · sur le côté' },
}

export function Details() {
  const [pos, setPos] = useState<Pos>('dos')
  const k = CASES[pos]
  const sp = { type: 'spring', stiffness: 120, damping: 18 } as const
  const spine = k.torso.y + k.torso.h / 2
  return (
    <section id="details" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-16 px-4 sm:px-8 lg:grid-cols-2">
        <div className="grid content-start gap-10">
          <Head eyebrow="Caractéristiques" title="Conçu pour la nuque.">
            Une forme en vague qui soutient la nuque et laisse la tête se poser. Retournez-le selon votre position.
          </Head>
          <Reveal>
            <dl className="divide-y divide-rule border-y border-rule">
              {SPECS.map(([dt, dd]) => (
                <div key={dt} className="grid grid-cols-[140px_1fr] gap-4 py-4 text-[15px] sm:grid-cols-[180px_1fr]">
                  <dt className="eyebrow pt-0.5 text-[11px] text-mute">{dt}</dt>
                  <dd className="font-medium">{dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal className="grid content-start gap-4">
          <figure className="metal grid gap-6 p-6 sm:p-10">
            <div role="group" aria-label="Position de sommeil" className="flex w-fit gap-px bg-rule p-px">
              {(
                [
                  ['dos', 'Sur le dos'],
                  ['cote', 'Sur le côté'],
                ] as const
              ).map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={pos === v}
                  onClick={() => setPos(v)}
                  className={cn('min-h-11 cursor-pointer px-5 text-sm font-semibold transition-colors', pos === v ? 'bg-ink text-white' : 'bg-white/80 hover:bg-white')}
                >
                  {l}
                </button>
              ))}
            </div>
            <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label={`Schéma de profil : ${k.label}, tête et nuque dans l’axe`}>
              <rect x="0" y="172" width="400" height="30" fill="#9aa1ab" opacity=".5" />
              <motion.path initial={false} animate={{ d: k.pillow }} transition={sp} fill="#2F3F72" />
              <motion.rect initial={false} x="180" width="212" animate={{ y: k.torso.y, height: k.torso.h }} transition={sp} fill="#111318" opacity=".85" />
              <motion.circle initial={false} cx="85" r="30" animate={{ cy: k.head }} transition={sp} fill="#111318" />
              <motion.line initial={false} x1="85" x2="300" animate={{ y1: k.head, y2: spine }} transition={sp} stroke="#fff" strokeWidth="2" strokeDasharray="4 6" />
            </svg>
            <figcaption className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold">{k.label}</span>
              <span className="text-mute">Tête et nuque dans l’axe</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Colors ---------- */

export function Colors({ color, setColor }: { color: ColorId; setColor: (c: ColorId) => void }) {
  return (
    <section id="coloris" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <Head eyebrow="Coloris" title="Cinq teintes. Une forme." />
        <div className="mt-14 grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className="h-full">
              <button
                type="button"
                aria-pressed={color === c.id}
                onClick={() => {
                  setColor(c.id)
                  document.getElementById('produit')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn('group grid h-full w-full cursor-pointer gap-6 p-6 text-left transition-colors', color === c.id ? 'bg-white' : 'bg-paper hover:bg-white')}
              >
                <img src={c.src} alt="" className="w-full transition-transform duration-500 group-hover:-translate-y-1.5" />
                <span className="flex items-center justify-between gap-2 border-t border-rule pt-4 text-sm">
                  <span className="font-semibold">{c.name}</span>
                  <span className="size-3.5 rounded-[1px] ring-1 ring-ink/15" style={{ background: c.hex }} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-mute">Choisir une teinte la sélectionne dans la fiche produit.</p>
      </div>
    </section>
  )
}
