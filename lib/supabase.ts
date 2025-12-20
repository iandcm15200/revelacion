// LocalStorage Database - Simple y sin configuración externa

// Types
export type Guest = {
  id: string
  name: string
  phone?: string
  email?: string
  created_at: string
}

export type Vote = {
  id: string
  guest_id: string
  team: 'girl' | 'boy'
  created_at: string
}

export type Dedication = {
  id: string
  guest_id: string
  message: string
  approved: boolean
  created_at: string
}

export type Video = {
  id: string
  guest_id: string
  url: string
  approved: boolean
  created_at: string
}

// Helper para generar IDs
const generateId = () => crypto.randomUUID()

// Helper para obtener datos del localStorage
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

// Helper para guardar en localStorage
const saveToStorage = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// API Local para Guests
export const guestsDB = {
  async insert(guest: Omit<Guest, 'id' | 'created_at'>) {
    const guests = getFromStorage<Guest>('guests')
    const newGuest: Guest = {
      ...guest,
      id: generateId(),
      created_at: new Date().toISOString(),
    }
    guests.push(newGuest)
    saveToStorage('guests', guests)
    
    // Disparar evento para actualización en tiempo real
    window.dispatchEvent(new CustomEvent('guestsUpdated'))
    
    return { data: newGuest, error: null }
  },

  async getAll() {
    return { data: getFromStorage<Guest>('guests'), error: null }
  },

  async getById(id: string) {
    const guests = getFromStorage<Guest>('guests')
    const guest = guests.find(g => g.id === id)
    return { data: guest, error: guest ? null : new Error('Not found') }
  },

  subscribe(callback: () => void) {
    window.addEventListener('guestsUpdated', callback)
    return {
      unsubscribe: () => window.removeEventListener('guestsUpdated', callback)
    }
  },
}

// API Local para Votes
export const votesDB = {
  async insert(vote: Omit<Vote, 'id' | 'created_at'>) {
    const votes = getFromStorage<Vote>('votes')
    
    // Verificar si ya votó
    const existingVote = votes.find(v => v.guest_id === vote.guest_id)
    if (existingVote) {
      return { data: null, error: new Error('Ya has votado') }
    }

    const newVote: Vote = {
      ...vote,
      id: generateId(),
      created_at: new Date().toISOString(),
    }
    votes.push(newVote)
    saveToStorage('votes', votes)
    
    // Disparar evento personalizado para actualización en tiempo real
    window.dispatchEvent(new CustomEvent('votesUpdated'))
    
    return { data: newVote, error: null }
  },

  async getAll() {
    return { data: getFromStorage<Vote>('votes'), error: null }
  },

  async getByGuestId(guestId: string) {
    const votes = getFromStorage<Vote>('votes')
    const vote = votes.find(v => v.guest_id === guestId)
    return { data: vote, error: null }
  },

  subscribe(callback: () => void) {
    window.addEventListener('votesUpdated', callback)
    return {
      unsubscribe: () => window.removeEventListener('votesUpdated', callback)
    }
  },
}

// API Local para Dedications
export const dedicationsDB = {
  async insert(dedication: Omit<Dedication, 'id' | 'created_at'>) {
    const dedications = getFromStorage<Dedication>('dedications')
    const newDedication: Dedication = {
      ...dedication,
      id: generateId(),
      created_at: new Date().toISOString(),
      approved: true, // Auto-aprobar
    }
    dedications.push(newDedication)
    saveToStorage('dedications', dedications)
    
    // Disparar evento para actualización en tiempo real
    window.dispatchEvent(new CustomEvent('dedicationsUpdated'))
    
    return { data: newDedication, error: null }
  },

  async getAll() {
    const dedications = getFromStorage<Dedication>('dedications')
    return { data: dedications.filter(d => d.approved), error: null }
  },

  subscribe(callback: () => void) {
    window.addEventListener('dedicationsUpdated', callback)
    return {
      unsubscribe: () => window.removeEventListener('dedicationsUpdated', callback)
    }
  },
}
