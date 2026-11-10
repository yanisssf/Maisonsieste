import { TICKER } from '../data'

export function Ticker() {
  const row = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      {TICKER.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          {t}
          <i className="inline-block size-2.5 rounded-full bg-peach" />
        </span>
      ))}
    </span>
  )
  return (
    <div className="-rotate-1 overflow-hidden bg-ink py-4 font-display text-lg font-semibold text-sky" aria-hidden="true">
      <div className="flex w-max animate-[tick_30s_linear_infinite]">
        {row}
        {row}
      </div>
      <style>{`@keyframes tick{to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
