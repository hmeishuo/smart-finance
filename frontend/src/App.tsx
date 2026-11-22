import { BrowserRouter, Route, Routes } from 'react-router'
import { AppLayout } from './layouts/AppLayout'
import { NAV_ITEMS } from './navigation'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {NAV_ITEMS.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={
                item.path === '/settings' ? (
                  <SettingsPage item={item} />
                ) : (
                  <PlaceholderPage item={item} />
                )
              }
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
