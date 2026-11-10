import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { PHOTO_LIT, SIZE } from '../data'
import { LinkBtn } from './ui'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14])

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-graphite text-white sm:min-h-[92vh]">
      <motion.img
        src={PHOTO_LIT}
        alt=""
        style={reduce ? undefined : { y, scale }}
        className="absolute inset-0 -z-20 size-full object-cover object-[62%_center] grayscale-[35%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(17_19_24/0.55)_0%,rgb(17_19_24/0.35)_45%,rgb(17_19_24/0.7)_100%)]" />

      <div className="mx-auto grid w-full max-w-[1320px] justify-items-center px-4 pt-24 pb-28 text-center sm:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow text-white/80">
          Maison Sieste · Cloud Pillow
        </motion.p>
        <h1 className="mt-6 max-w-[14ch] text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.92] font-extrabold">
          {['Dormez', 'sur', 'un', 'nuage.'].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <motion.span
                className="mr-[0.22em] inline-block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-7 max-w-[46ch] text-lg text-white/85 sm:text-xl"
        >
          L’oreiller en mousse à mémoire de forme, double face. Un côté bas pour le dos, un côté haut pour le côté.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-10 flex flex-wrap justify-center gap-3">
          <LinkBtn href="#produit" variant="light">
            Commander · 49 €
          </LinkBtn>
          <LinkBtn href="#details" className="bg-ink/80 text-white ring-1 ring-white/20 backdrop-blur hover:bg-ink">
            Découvrir
          </LinkBtn>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/15">
        <dl className="mx-auto grid max-w-[1320px] grid-cols-3 divide-x divide-white/15 px-4 text-center sm:px-8">
          {[
            ['Essai', '30 nuits'],
            ['Format', SIZE],
            ['Coloris', '5 teintes'],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-0.5 py-4">
              <dt className="eyebrow text-[10px] text-white/60">{k}</dt>
              <dd className="font-display text-sm font-semibold sm:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
