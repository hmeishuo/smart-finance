import { NavLink } from 'react-router'
import { NAV_ITEMS } from '../navigation'

type SidebarNavProps = {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="主要導覽" className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'flex min-h-11 items-center rounded-lg px-3 text-[15px] transition-colors',
                  isActive
                    ? 'bg-brand-50 font-semibold text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                ].join(' ')
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
