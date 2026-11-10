import { COLORS, type ColorId, colorOf } from '../data'
import { useCart } from '../cart'
import { cn } from '../lib/utils'
import { ColorStage } from './Hero'
import { Reveal, SectionHead } from './ui'

export function ColorShowcase({ color, setColor }: { color: ColorId; setColor: (c: ColorId) => void }) {
  const { add } = useCart()
  const c = colorOf(color)
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead eyebrow="Choisis ton nuage" title="Cinq couleurs, une seule forme.">
            Bleu nuit pour la chambre sobre, rose poudré pour la chambre douce. La housse s’enlève et passe en machine.
          </SectionHead>
          <Reveal className="mt-8 grid gap-3">
            <div role="radiogroup" aria-label="Couleur" className="flex flex-wrap gap-3">
              {COLORS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  role="radio"
                  aria-checked={color === k.id}
                  onClick={() => setColor(k.id)}
                  className={cn(
                    'flex min-h-12 cursor-pointer items-center gap-2 rounded-full py-2 pr-4 pl-2 font-bold ring-2 transition',
                    color === k.id ? 'bg-cloud ring-dusk' : 'ring-line hover:ring-dusk/60',
                  )}
                >
                  <span className="size-8 rounded-full ring-1 ring-ink/10" style={{ background: k.hex }} />
                  {k.name}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => add('solo', color)} className="btn-sun mt-4 min-h-14 w-fit cursor-pointer rounded-full px-7 font-display text-lg font-semibold">
              Ajouter en {c.name} · 49 €
            </button>
          </Reveal>
        </div>
        <Reveal>
          <ColorStage color={color} className="clay rounded-[36px] p-6" />
        </Reveal>
      </div>
    </section>
  )
}
