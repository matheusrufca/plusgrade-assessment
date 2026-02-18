import type { FC } from 'react'

const ResultsPanel: FC = () => {
  return (
    <section className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-slate-300">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Results</p>
      <p className="mt-3 text-base text-slate-300">
        Results will appear here once the API integration is wired up.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Total tax</p>
          <p className="mt-2 text-lg font-semibold text-white">$0.00</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Effective rate</p>
          <p className="mt-2 text-lg font-semibold text-white">0%</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Brackets</p>
          <p className="mt-2 text-lg font-semibold text-white">0</p>
        </div>
      </div>
    </section>
  )
}

export default ResultsPanel
