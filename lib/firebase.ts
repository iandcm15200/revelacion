// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set, onValue, get, remove } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAC-LumMPhqeCZkTYL9XOQT0Ls_m8I_tnI",
  authDomain: "revelacion-bebe-2025.firebaseapp.com",
  databaseURL: "https://revelacion-bebe-2025-default-rtdb.firebaseio.com",
  projectId: "revelacion-bebe-2025",
  storageBucket: "revelacion-bebe-2025.firebasestorage.app",
  messagingSenderId: "681559315108",
  appId: "1:681559315108:web:219ccfbacb81694cb58c31"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Helper functions
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Guests Database
export const guestsDB = {
  insert: async (data: any) => {
    try {
      const id = generateId()
      const guestRef = ref(database, `guests/${id}`)
      await set(guestRef, { ...data, id, createdAt: new Date().toISOString() })
      return { data: { ...data, id }, error: null }
    } catch (error) {
      console.error('Error inserting guest:', error)
      return { data: null, error }
    }
  },

  getAll: async () => {
    try {
      const guestsRef = ref(database, 'guests')
      const snapshot = await get(guestsRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        return { data: Object.values(data), error: null }
      }
      return { data: [], error: null }
    } catch (error) {
      console.error('Error getting guests:', error)
      return { data: [], error }
    }
  },

  subscribe: (callback: (data: any[]) => void) => {
    const guestsRef = ref(database, 'guests')
    const unsubscribe = onValue(guestsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        callback(Object.values(data))
      } else {
        callback([])
      }
    })
    return unsubscribe
  }
}

// Votes Database
export const votesDB = {
  insert: async (data: any) => {
    try {
      const id = generateId()
      const voteRef = ref(database, `votes/${id}`)
      await set(voteRef, { ...data, id, createdAt: new Date().toISOString() })
      return { data: { ...data, id }, error: null }
    } catch (error) {
      console.error('Error inserting vote:', error)
      return { data: null, error }
    }
  },

  getAll: async () => {
    try {
      const votesRef = ref(database, 'votes')
      const snapshot = await get(votesRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        return { data: Object.values(data), error: null }
      }
      return { data: [], error: null }
    } catch (error) {
      console.error('Error getting votes:', error)
      return { data: [], error }
    }
  },

  subscribe: (callback: (data: any[]) => void) => {
    const votesRef = ref(database, 'votes')
    const unsubscribe = onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        callback(Object.values(data))
      } else {
        callback([])
      }
    })
    return unsubscribe
  }
}

// Dedications Database
export const dedicationsDB = {
  insert: async (data: any) => {
    try {
      const id = generateId()
      const dedicationRef = ref(database, `dedications/${id}`)
      await set(dedicationRef, { ...data, id, createdAt: new Date().toISOString() })
      return { data: { ...data, id }, error: null }
    } catch (error) {
      console.error('Error inserting dedication:', error)
      return { data: null, error }
    }
  },

  getAll: async () => {
    try {
      const dedicationsRef = ref(database, 'dedications')
      const snapshot = await get(dedicationsRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        return { data: Object.values(data), error: null }
      }
      return { data: [], error: null }
    } catch (error) {
      console.error('Error getting dedications:', error)
      return { data: [], error }
    }
  },

  subscribe: (callback: (data: any[]) => void) => {
    const dedicationsRef = ref(database, 'dedications')
    const unsubscribe = onValue(dedicationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        callback(Object.values(data))
      } else {
        callback([])
      }
    })
    return unsubscribe
  }
}

// Función para limpiar toda la base de datos
export const clearAllData = async () => {
  try {
    const guestsRef = ref(database, 'guests')
    const votesRef = ref(database, 'votes')
    const dedicationsRef = ref(database, 'dedications')
    
    await remove(guestsRef)
    await remove(votesRef)
    await remove(dedicationsRef)
    
    console.log('✅ Base de datos limpiada exitosamente')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error limpiando base de datos:', error)
    return { success: false, error }
  }
}
