type NotImplementedCardProps = {
  description: string
  plannedPhase: string
}

// 尚未實作的頁面一律顯示此卡片，不使用任何假財務資料（決策 D12）。
export function NotImplementedCard({ description, plannedPhase }: NotImplementedCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 ring-inset">
        尚未實作
      </span>
      <p className="mt-3 text-slate-700">{description}</p>
      <p className="mt-2 text-sm text-slate-500">預計於{plannedPhase}實作。</p>
    </section>
  )
}
