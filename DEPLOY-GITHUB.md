# Revelación de Género - Guía de Despliegue

## 🚀 Cómo subir a GitHub y hacer pública la página

### 1. Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Click en el botón "+" arriba a la derecha → "New repository"
3. Nombre del repositorio: `revelacion-genero`
4. Descripción: "Sitio web para revelación de género del bebé"
5. Marca como **Público**
6. NO marques "Initialize with README" (ya tienes uno)
7. Click en "Create repository"

### 2. Subir el código a GitHub

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd C:\Users\iandc\Desktop\revelacion

# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - Revelación de género"

# Conectar con GitHub (reemplaza TU-USUARIO por tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/revelacion-genero.git

# Subir el código
git push -u origin main
```

### 3. Desplegar GRATIS en Vercel (sin necesidad de servidor)

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up" e inicia sesión con tu cuenta de GitHub
3. Click en "Add New..." → "Project"
4. Busca tu repositorio `revelacion-genero`
5. Click en "Import"
6. **NO cambies nada**, Vercel detecta automáticamente Next.js
7. Click en "Deploy"
8. ¡Espera 2-3 minutos!

### 4. ¡Tu página estará pública!

Vercel te dará una URL como:
```
https://revelacion-genero.vercel.app
```

Cada vez que hagas cambios y los subas a GitHub, Vercel actualizará automáticamente la página.

---

## 📝 Hacer cambios posteriores

```powershell
# 1. Hacer tus cambios en los archivos

# 2. Guardar cambios en git
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente en 2-3 minutos
```

---

## 🎯 Características de la página

- ✅ Votación Team Niña vs Team Niño
- ✅ Lista de invitados confirmados en tiempo real
- ✅ Cuenta regresiva para el 24 de diciembre
- ✅ Mapa de ubicación en Coyotepec
- ✅ Reproductor de música con playlist de Spotify
- ✅ Muro de dedicatorias
- ✅ Animación de bienvenida

---

## ⚠️ Nota importante sobre localStorage

El almacenamiento actual usa **localStorage del navegador**, que es local a cada dispositivo.

Para que los votos y dedicatorias se compartan entre todos los invitados, necesitarías:

1. **Opción gratis**: Firebase (configuración de 10 minutos)
2. **Opción más simple**: Supabase (lo que teníamos antes)

¿Quieres que configure una base de datos compartida?

---

## 🎨 Personalización

- **Fecha del evento**: Ya está configurada para el 24 de diciembre
- **Ubicación**: Natura Pao Jimenez, Coyotepec
- **Playlist**: Ya configurada con tu playlist de Spotify
- **Instagram**: @voz_eterea en el footer

---

¡Tu página está lista para compartirse! 🎉
