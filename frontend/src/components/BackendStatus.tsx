import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'

type Status = 'checking' | 'ok' | 'error'

const TIMEOUT_MS = 5000

async function checkHealth(signal: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { signal })
    if (!response.ok) return false
    const body = (await response.json()) as { status?: unknown }
    return body.status === 'ok'
  } catch {
    return false
  }
}

const STATUS_VIEW: Record<Status, { label: string; dot: string; text: string }> = {
  checking: { label: '檢查中…', dot: 'bg-slate-400', text: 'text-slate-600' },
  ok: { label: '正常', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  error: { label: '無法連線', dot: 'bg-rose-500', text: 'text-rose-700' },
}

// 呼叫後端 GET /health，顯示連線狀態。
export function BackendStatus() {
  const [status, setStatus] = useState<Status>('checking')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

    checkHealth(controller.signal).then((ok) => {
      if (!cancelled) setStatus(ok ? 'ok' : 'error')
    })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [attempt])

  const recheck = () => {
    setStatus('checking')
    setAttempt((value) => value + 1)
  }

  const view = STATUS_VIEW[status]

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-slate-900">後端連線狀態</h2>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className={`flex items-center gap-2 font-medium ${view.text}`} role="status" aria-live="polite">
          <span aria-hidden="true" className={`size-2.5 rounded-full ${view.dot}`} />
          {view.label}
        </p>
        <button
          type="button"
          onClick={recheck}
          disabled={status === 'checking'}
          className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          重新檢查
        </button>
      </div>
      <p className="mt-2 text-xs break-all text-slate-500">API 位址：{API_BASE_URL}</p>
    </section>
  )
}
