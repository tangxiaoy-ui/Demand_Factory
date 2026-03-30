import { Badge } from '@/components/common/Badge'
import { useAuthStore } from '@/stores/authStore'
import type { Case } from '@/types'

interface CaseCardProps {
  caseData: Case
}

export function CaseCard({ caseData }: CaseCardProps) {
  const { isLoggedIn, openLoginModal } = useAuthStore()

  const handleClick = () => {
    if (isLoggedIn) {
      window.open(`/cases/${caseData.id}`, '_blank')
    } else {
      openLoginModal(`/cases/${caseData.id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img
          src={caseData.thumbnail}
          alt={caseData.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{caseData.industry}</span>
          <span className="text-xs text-gray-500">{caseData.completionDate}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{caseData.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{caseData.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {caseData.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{caseData.scale}</span>
        </div>
      </div>
    </div>
  )
}