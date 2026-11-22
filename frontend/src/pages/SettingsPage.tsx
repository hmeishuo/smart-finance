import { BackendStatus } from '../components/BackendStatus'
import { NotImplementedCard } from '../components/NotImplementedCard'
import { PageHeader } from '../components/PageHeader'
import type { NavItem } from '../navigation'

type SettingsPageProps = {
  item: NavItem
}

export function SettingsPage({ item }: SettingsPageProps) {
  return (
    <>
      <PageHeader title={item.title} subtitle={item.subtitle} />
      <div className="space-y-4">
        <BackendStatus />
        <NotImplementedCard description={item.description} plannedPhase={item.plannedPhase} />
      </div>
    </>
  )
}
