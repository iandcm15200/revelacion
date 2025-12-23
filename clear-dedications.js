// Script para eliminar solo las dedicatorias en Firebase Realtime Database
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, remove } = require('firebase/database')

const firebaseConfig = {
  apiKey: "AIzaSyAC-LumMPhqeCZkTYL9XOQT0Ls_m8I_tnI",
  authDomain: "revelacion-bebe-2025.firebaseapp.com",
  databaseURL: "https://revelacion-bebe-2025-default-rtdb.firebaseio.com",
  projectId: "revelacion-bebe-2025",
  storageBucket: "revelacion-bebe-2025.firebasestorage.app",
  messagingSenderId: "681559315108",
  appId: "1:681559315108:web:219ccfbacb81694cb58c31"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

async function clearDedications() {
  console.log('🧹 Eliminando dedicatorias...')
  try {
    const dedicationsRef = ref(database, 'dedications')
    await remove(dedicationsRef)
    console.log('✅ Dedicatorias eliminadas')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error eliminando dedicatorias:', error.message)
    process.exit(1)
  }
}

clearDedications()
