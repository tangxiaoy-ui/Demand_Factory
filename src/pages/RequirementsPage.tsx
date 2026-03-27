import { AdminPageLayout } from '@/components/layout/AdminPageLayout'
import { RequirementList } from '@/components/requirement/RequirementList'

export function RequirementsPage() {
  return (
    <AdminPageLayout>
      <div className="px-6 py-6">
        <div className="w-[1200px] mx-auto">
          <RequirementList />
        </div>
      </div>
    </AdminPageLayout>
  )
}