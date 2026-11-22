import { NotImplementedCard } from '../components/NotImplementedCard'
import { PageHeader } from '../components/PageHeader'
import type { NavItem } from '../navigation'

type PlaceholderPageProps = {
  item: NavItem
}

export function PlaceholderPage({ item }: PlaceholderPageProps) {
  return (
    <>
      <PageHeader title={item.title} subtitle={item.subtitle} />
      <NotImplementedCard description={item.description} plannedPhase={item.plannedPhase} />
    </>
  )
}
