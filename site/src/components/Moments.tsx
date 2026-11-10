// Adapted from 21st.dev "Testimonials with Marquee" (serafimcloud): infinite row, pause on hover, faded edges.
// Used for "moments sieste" rather than customer reviews, since the brand has no real reviews yet.
import { Clock } from 'lucide-react'
import { MOMENTS } from '../data'
import { SectionHead } from './ui'

export function Moments() {
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHead center eyebrow="Moments sieste" title="Il y a toujours une bonne heure pour un nuage." />
      </div>
      <div className="relative mt-14 flex w-full flex-col items-center overflow-hidden">
        <div className="group flex flex-row overflow-hidden p-2 [--duration:45s] [--gap:1.25rem] [gap:var(--gap)]">
          {[0, 1].map((set) => (
            <div
              key={set}
              aria-hidden={set === 1}
              className="flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]"
            >
              {MOMENTS.map((m) => (
                <article key={m.title} className="clay flex w-[300px] flex-col gap-3 rounded-[28px] p-6 sm:w-[340px]">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-foam px-3 py-1 text-sm font-bold text-dusk">
                    <Clock className="size-4" aria-hidden="true" />
                    {m.time}
                  </span>
                  <h3 className="text-2xl font-semibold">{m.title}</h3>
                  <p className="text-mute">{m.text}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-sky sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-sky sm:block" />
      </div>
    </section>
  )
}
