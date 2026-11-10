import type { SVGProps } from 'react'

/** Brand cloud mark (logo). */
export function CloudMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 36 24" aria-hidden="true" {...props}>
      <path d="M8 22a7 7 0 0 1-1-13.9A9 9 0 0 1 24 5a7 7 0 0 1 5 13A5 5 0 0 1 28 22Z" fill="currentColor" />
    </svg>
  )
}

/** Soft decorative cloud for skies. */
export function SkyCloud({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 110" aria-hidden="true" className={className} style={{ opacity }}>
      <path
        d="M40 100c-22 0-36-16-32-34 3-15 18-24 32-21 2-22 22-38 46-34 12-14 40-16 56 2 22-6 44 10 44 34 16 4 22 20 16 34-5 12-16 19-30 19Z"
        fill="var(--cloud)"
      />
    </svg>
  )
}

/** The Cloud Pillow itself, as an illustration. */
export function PillowArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 300" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="pg" cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor="var(--pw-1)" />
          <stop offset=".75" stopColor="var(--pw-2)" />
          <stop offset="1" stopColor="var(--pw-3)" />
        </radialGradient>
        <linearGradient id="ps" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M90 250c-48 0-70-40-56-78 10-28 38-38 52-36-6-40 26-76 70-70 18-38 74-50 108-20 40-20 98 4 102 56 42 2 72 40 60 84-8 36-44 56-80 54-30 26-96 30-134 8-30 18-88 14-122 2Z"
        transform="translate(10 -20)"
        fill="url(#pg)"
        stroke="var(--pw-3)"
        strokeWidth="3"
      />
      <path d="M130 222c40 18 170 22 230 0" transform="translate(10 -20)" fill="none" stroke="var(--pw-3)" strokeWidth="4" strokeLinecap="round" />
      <path d="M155 185c30 10 120 12 170 0" transform="translate(10 -20)" fill="none" stroke="var(--pw-3)" strokeWidth="3" strokeLinecap="round" opacity=".7" />
    </svg>
  )
}
