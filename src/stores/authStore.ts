import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  showLoginModal: boolean
  loginRedirect: string | null
  login: (user: User) => void
  logout: () => void
  openLoginModal: (redirect?: string) => void
  closeLoginModal: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      showLoginModal: false,
      loginRedirect: null,
      login: (user) => set({ user, isLoggedIn: true, showLoginModal: false }),
      logout: () => set({ user: null, isLoggedIn: false }),
      openLoginModal: (redirect) => set({ showLoginModal: true, loginRedirect: redirect || null }),
      closeLoginModal: () => set({ showLoginModal: false, loginRedirect: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
)