import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { Reveal, SectionHead } from './ui'
import { cn } from '../lib/utils'

type Pos = 'dos' | 'cote'
type Pillow = 'classique' | 'nuage'

// Same command structure for every case so the path can morph.
const pillowPath = (yl: number, ym: number, yr: number) =>
  `M20 172 L20 ${yl} C 60 ${yl - 6} 100 ${ym} 140 ${ym} C 156 ${ym} 166 ${yr} 178 ${yr} L 178 172 Z`

const CASES = {
  dos: {
    classique: { pillow: pillowPath(108, 108, 108), head: 80, ok: false, verdict: 'Tête relevée, nuque pliée' },
    nuage: { pillow: pillowPath(158, 158, 136), head: 130, ok: true, verdict: 'Côté bas : tête et nuque dans l’axe' },
  },
  cote: {
    classique: { pillow: pillowPath(160, 160, 160), head: 132, ok: false, verdict: 'Oreiller écrasé : la tête tombe' },
    nuage: { pillow: pillowPath(140, 140, 120), head: 112, ok: true, verdict: 'Côté haut : tête dans l’axe du buste' },
  },
} as const

const TORSO = { dos: { y: 124, h: 46 }, cote: { y: 58, h: 112 } }

export function HeightProfile() {
  const [pos, setPos] = useState<Pos>('dos')
  const [pil, setPil] = useState<Pillow>('classique')
  const c = CASES[pos][pil]
  const t = TORSO[pos]
  const spineY = t.y + t.h / 2
  const color = c.ok ? 'var(--dusk)' : '#E8590C'
  const spring = { type: 'spring', stiffness: 120, damping: 16 } as const

  return (
    <section id="hauteur" className="relative bg-cloud py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead eyebrow="Double hauteur" title="Un côté bas. Un côté haut.">
            Sur le dos, ta tête a besoin de peu de hauteur. Sur le côté, il faut combler l’espace entre l’épaule et la tête. Le Cloud Pillow se tourne selon ta position.
          </SectionHead>
          <Reveal className="mt-8 grid gap-5">
            <Toggle
              label="Tu dors…"
              value={pos}
              onChange={setPos}
              options={[
                ['dos', 'Sur le dos'],
                ['cote', 'Sur le côté'],
              ]}
            />
            <Toggle
              label="Sur…"
              value={pil}
              onChange={setPil}
              options={[
                ['classique', 'Un oreiller classique'],
                ['nuage', 'Le Cloud Pillow'],
              ]}
            />
            <motion.p
              key={c.verdict}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 font-display text-2xl font-semibold"
              style={{ color }}
              aria-live="polite"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full text-[#fff]" style={{ background: color }}>
                {c.ok ? <Check className="size-5" /> : <X className="size-5" />}
              </span>
              {c.verdict}
            </motion.p>
          </Reveal>
        </div>
        <Reveal>
          <figure className="rounded-[36px] bg-foam p-6 ring-2 ring-line sm:p-8">
            <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label={`Schéma de profil : ${c.verdict}`}>
              <rect x="0" y="172" width="400" height="34" rx="12" fill="var(--line)" />
              <motion.path initial={false} animate={{ d: c.pillow }} transition={spring} fill="var(--pw-1)" stroke="var(--pw-3)" strokeWidth="3" />
              <motion.rect initial={false} x="180" width="212" rx="26" animate={{ y: t.y, height: t.h }} transition={spring} fill="var(--lilac)" opacity=".9" />
              <motion.circle initial={false} cx="85" r="30" animate={{ cy: c.head }} transition={spring} fill="var(--dusk)" />
              <motion.line
                initial={false}
                x1="85"
                x2="300"
                animate={{ y1: c.head, y2: spineY, stroke: color }}
                transition={spring}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="2 9"
              />
              <motion.circle initial={false} cx="85" r="6" animate={{ cy: c.head, fill: color }} transition={spring} />
              <motion.circle initial={false} cx="300" r="6" animate={{ cy: spineY, fill: color }} transition={spring} />
            </svg>
            <figcaption className="mt-4 text-[15px] text-mute">Schéma de profil. La ligne relie la tête et le buste : plus elle est droite, mieux ta nuque est alignée.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function Toggle<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: [T, string][]
}) {
  return (
    <div role="group" aria-label={label} className="grid gap-2">
      <span className="text-[15px] font-bold text-mute">{label}</span>
      <div className="relative inline-flex w-fit flex-wrap gap-1 rounded-full bg-foam p-1.5 ring-1 ring-line">
        {options.map(([v, l]) => (
          <button
            key={v}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={cn(
              'relative min-h-11 cursor-pointer rounded-full px-5 font-bold transition-colors',
              value === v ? 'text-on-dusk' : 'text-ink hover:text-dusk',
            )}
          >
            {value === v && (
              <motion.span layoutId={`pill-${label}`} className="absolute inset-0 rounded-full bg-dusk" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
            <span className="relative">{l}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
