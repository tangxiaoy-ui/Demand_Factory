import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Requirement, Attachment } from '@/types'
import { mockRequirements, mockAttachments } from '@/mock/requirements'

interface RequirementState {
  requirements: Requirement[]
  currentRequirement: Requirement | null
  attachments: Attachment[]
  setCurrentRequirement: (requirement: Requirement | null) => void
  addRequirement: (requirement: Requirement) => void
  updateRequirement: (id: string, updates: Partial<Requirement>) => void
  deleteRequirement: (id: string) => void
  getAttachmentsByRequirementId: (requirementId: string) => Attachment[]
  addAttachment: (attachment: Attachment) => void
}

export const useRequirementStore = create<RequirementState>()(
  persist(
    (set, get) => ({
      requirements: mockRequirements,
      currentRequirement: null,
      attachments: mockAttachments,
      setCurrentRequirement: (requirement) => set({ currentRequirement: requirement }),
      addRequirement: (requirement) =>
        set((state) => ({ requirements: [...state.requirements, requirement] })),
      updateRequirement: (id, updates) =>
        set((state) => ({
          requirements: state.requirements.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),
      deleteRequirement: (id) =>
        set((state) => ({
          requirements: state.requirements.filter((r) => r.id !== id),
        })),
      getAttachmentsByRequirementId: (requirementId) =>
        get().attachments.filter((a) => a.requirementId === requirementId),
      addAttachment: (attachment) =>
        set((state) => ({ attachments: [...state.attachments, attachment] })),
    }),
    {
      name: 'requirement-storage',
      version: 6,
      migrate: (persistedState: any, version: number) => {
        if (version < 6) {
          return {
            requirements: mockRequirements,
            currentRequirement: null,
            attachments: mockAttachments,
          }
        }
        return persistedState
      },
    }
  )
)