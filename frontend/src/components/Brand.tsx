export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white"
      >
        SF
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">Smart Finance</span>
    </div>
  )
}
