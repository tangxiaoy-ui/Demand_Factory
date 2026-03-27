import { useState, useEffect } from 'react'
import { X, Shield } from 'lucide-react'
import type { Case } from '@/types'

interface PublishCaseModalProps {
  caseItem: Case | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PublishCaseData) => void
}

export interface PublishCaseData {
  id: string
  title: string
  description: string
  tags: string[]
  isAnonymized: boolean
  industry: string
  scale: string
}

const INDUSTRY_OPTIONS = [
  '电商零售',
  '企业服务',
  '人工智能',
  '教育培训',
  '物流运输',
  '医疗健康',
  '金融科技',
  '餐饮外卖',
  '智慧城市',
  '社交网络',
  '智能制造',
]

const SCALE_OPTIONS = ['小型', '中型', '大型']

export function PublishCaseModal({ caseItem, isOpen, onClose, onSubmit }: PublishCaseModalProps) {
  const [formData, setFormData] = useState<PublishCaseData>({
    id: '',
    title: '',
    description: '',
    tags: [],
    isAnonymized: false,
    industry: '',
    scale: '',
  })

  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (caseItem) {
      setFormData({
        id: caseItem.id,
        title: caseItem.title,
        description: caseItem.description,
        tags: caseItem.tags || [],
        isAnonymized: caseItem.isAnonymized || false,
        industry: caseItem.industry,
        scale: caseItem.scale,
      })
    }
  }, [caseItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    })
  }

  const handleAnonymize = () => {
    const anonymizedName = formData.title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').substring(0, 4)
    const anonymizedDesc = formData.description.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').substring(0, 20)
    
    setFormData({
      ...formData,
      title: anonymizedName || '已脱敏项目',
      description: anonymizedDesc || '该案例已进行脱敏处理',
      isAnonymized: true,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">上架案例</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                案例名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="输入案例名称"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                案例描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="输入案例描述"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                标签
              </label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="输入标签后按回车添加"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所属行业 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">请选择行业</option>
                {INDUSTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目规模 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.scale}
                onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">请选择规模</option>
                {SCALE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">一键脱敏</div>
                    <div className="text-xs text-gray-500">自动隐藏敏感信息</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAnonymize}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-700"
                >
                  执行脱敏
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAnonymized"
                checked={formData.isAnonymized}
                onChange={(e) => setFormData({ ...formData, isAnonymized: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="isAnonymized" className="ml-2 text-sm text-gray-700">
                该案例已脱敏
              </label>
            </div>
          </div>
          </div>

          <div className="flex justify-end space-x-3 px-6 pt-6 pb-6 border-t border-gray-100 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              确认上架
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
