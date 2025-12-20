import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Guest = {
  id: string
  name: string
  phone?: string
  email?: string
}

type GuestStore = {
  guest: Guest | null
  setGuest: (guest: Guest) => void
  clearGuest: () => void
}

export const useGuestStore = create<GuestStore>()(
  persist(
    (set) => ({
      guest: null,
      setGuest: (guest) => set({ guest }),
      clearGuest: () => set({ guest: null }),
    }),
    {
      name: 'guest-storage',
    }
  )
)
