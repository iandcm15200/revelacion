// Script para limpiar la base de datos de Firebase
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

async function clearDatabase() {
  console.log('🧹 Limpiando base de datos...\n')
  
  try {
    // Eliminar invitados
    const guestsRef = ref(database, 'guests')
    await remove(guestsRef)
    console.log('✅ Invitados eliminados')
    
    // Eliminar votos
    const votesRef = ref(database, 'votes')
    await remove(votesRef)
    console.log('✅ Votos eliminados')
    
    // Eliminar dedicatorias
    const dedicationsRef = ref(database, 'dedications')
    await remove(dedicationsRef)
    console.log('✅ Dedicatorias eliminadas')
    
    console.log('\n🎉 Base de datos limpiada exitosamente!')
    console.log('📊 Estado actual: 0 invitados, 0 votos, 0 dedicatorias')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

clearDatabase()
