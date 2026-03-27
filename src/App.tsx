import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { AICollectionPage } from '@/pages/AICollectionPage'
import { RequirementsPage } from '@/pages/RequirementsPage'
import { RequirementDetailPage } from '@/pages/RequirementDetailPage'
import { RequirementManagementPage } from '@/pages/RequirementManagementPage'
import { AdminOverviewPage } from '@/pages/AdminOverviewPage'
import { AdminSettingsPage } from '@/pages/AdminSettingsPage'
import { AdminCasesPage } from '@/pages/AdminCasesPage'
import { CasesPage } from '@/pages/CasesPage'
import { CaseDetailPage } from '@/pages/CaseDetailPage'
import { useHistoryStore } from '@/stores/historyStore'
import { mockHistorySessions } from '@/mock/historySessions'

const MOCK_DATA_VERSION = '3.0'

function App() {
  const historyStore = useHistoryStore()

  useEffect(() => {
    const storedVersion = localStorage.getItem('mock-data-version')
    
    if (storedVersion !== MOCK_DATA_VERSION) {
      historyStore.clearHistory()
      mockHistorySessions.forEach((session) => {
        historyStore.addSession(session)
      })
      localStorage.setItem('mock-data-version', MOCK_DATA_VERSION)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collection" element={<AICollectionPage />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/requirements/:id" element={<RequirementDetailPage />} />
        <Route path="/admin/overview" element={<AdminOverviewPage />} />
        <Route path="/admin/requirements" element={<RequirementManagementPage />} />
        <Route path="/admin/cases" element={<AdminCasesPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App