import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Brand } from '../components/Brand'
import { SidebarNav } from '../components/SidebarNav'

export function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  // 抽屜開啟時：按 Esc 關閉，並鎖住背景捲動
  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className="min-h-dvh">
      {/* 電腦版：固定側邊欄（寬度 ≥ 1024px） */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center px-5">
          <Brand />
        </div>
        <SidebarNav />
      </aside>

      {/* 手機與平板：上方標題列 */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-slate-200 bg-white/95 px-2 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="開啟選單"
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          className="flex size-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Brand />
      </header>

      {/* 手機與平板：抽屜式選單 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-slate-900/40" onClick={closeDrawer} />
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="主要導覽選單"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl"
          >
            <div className="flex h-14 items-center justify-between pl-4 pr-2">
              <Brand />
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="關閉選單"
                className="flex size-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <SidebarNav onNavigate={closeDrawer} />
          </div>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
