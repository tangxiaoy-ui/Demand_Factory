import { create } from 'zustand'
import type { Message, ChatSession } from '@/types'

interface ChatState {
  session: ChatSession | null
  messages: Message[]
  progress: number
  isGenerating: boolean
  docGenerated: boolean
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setProgress: (progress: number) => void
  setIsGenerating: (isGenerating: boolean) => void
  setDocGenerated: (generated: boolean) => void
  resetChat: () => void
}

const initialMessages: Message[] = []

export const useChatStore = create<ChatState>((set) => ({
  session: null,
  messages: initialMessages,
  progress: 0,
  isGenerating: false,
  docGenerated: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setProgress: (progress) => set({ progress }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setDocGenerated: (generated) => set({ docGenerated: generated }),
  resetChat: () =>
    set({
      messages: initialMessages,
      progress: 0,
      isGenerating: false,
      docGenerated: false,
    }),
}))