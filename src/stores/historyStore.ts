import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatSession } from '@/types'
import { mockSessions } from '@/mock/sessions'

interface HistoryState {
  sessions: ChatSession[]
  addSession: (session: ChatSession) => void
  removeSession: (sessionId: string) => void
  updateSession: (sessionId: string, updates: Partial<ChatSession>) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      sessions: mockSessions,
      addSession: (session) =>
        set((state) => ({
          sessions: [
            { ...session, updatedAt: new Date().toISOString() },
            ...state.sessions.filter((s) => s.id !== session.id),
          ],
        })),
      removeSession: (sessionId) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
        })),
      updateSession: (sessionId, updates) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          ),
        })),
      clearHistory: () => set({ sessions: [] }),
    }),
    {
      name: 'history-storage',
      version: 2,
    }
  )
)
