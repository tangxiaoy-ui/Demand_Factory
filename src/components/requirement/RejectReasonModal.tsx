import { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'

interface RejectReasonModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
}

export function RejectReasonModal({ isOpen, onClose, onConfirm }: RejectReasonModalProps) {
  const [reason, setReason] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reason.trim()) {
      onConfirm(reason.trim())
      setReason('')
      onClose()
    }
  }

  const handleCancel = () => {
    setReason('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">拒绝需求</h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                拒绝原因 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="请输入拒绝该需求的原因..."
                required
                autoFocus
              />
              <p className="mt-2 text-xs text-gray-500">
                请详细说明拒绝原因，将帮助需求方改进和优化
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 px-6 pt-4 pb-6 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              确认拒绝
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
