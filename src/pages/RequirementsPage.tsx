import { PageLayout } from '@/components/layout/PageLayout'
import { RequirementList } from '@/components/requirement/RequirementList'

export function RequirementsPage() {
  return (
    <PageLayout>
      <div className="px-6 py-6">
        <div className="w-[1200px] mx-auto">
          <RequirementList />
        </div>
      </div>
    </PageLayout>
  )
}