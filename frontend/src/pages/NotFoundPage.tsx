import { Link } from 'react-router'
import { PageHeader } from '../components/PageHeader'

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="找不到頁面" subtitle="404" />
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-slate-700">您要找的頁面不存在，可能是網址輸入錯誤。</p>
        <Link
          to="/"
          className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          回到財務總覽
        </Link>
      </section>
    </>
  )
}
