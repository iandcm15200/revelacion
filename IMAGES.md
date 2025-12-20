# Instrucciones de Imágenes y Assets

## 📸 Imágenes Requeridas

Coloca las siguientes imágenes en la carpeta `public/`:

### 1. Foto de la Pareja
- **Nombre**: `couple-photo.jpg`
- **Ubicación**: `public/couple-photo.jpg`
- **Dimensiones recomendadas**: 800x1000px (proporción 4:5)
- **Formato**: JPG, PNG o WebP
- **Tamaño máximo**: 2MB
- **Descripción**: Esta es la foto que se mostrará en la animación de bienvenida

### 2. Favicon (Opcional)
- **Nombre**: `favicon.ico`
- **Ubicación**: `public/favicon.ico`
- **Dimensiones**: 32x32px o 64x64px
- **Descripción**: Icono que aparece en la pestaña del navegador

### 3. Música (Opcional)
- **Nombre**: `indigo.mp3`
- **Ubicación**: `public/music/indigo.mp3`
- **Formato**: MP3
- **Descripción**: Canción "Índigo" de Camilo
- **Nota**: Alternativamente, usa Spotify Embed (recomendado)

## 🎵 Configurar Música con Spotify

### Opción 1: Spotify Embed (Recomendado)

1. Ve a [https://open.spotify.com](https://open.spotify.com)
2. Busca "Índigo - Camilo"
3. Click derecho > Compartir > Copiar enlace de la canción
4. El ID está en la URL: `https://open.spotify.com/track/6rPO02ozF3bM7NnOV4h6s2`
5. Usa `6rPO02ozF3bM7NnOV4h6s2` como `NEXT_PUBLIC_SPOTIFY_TRACK_ID`

### Opción 2: Archivo Local

```bash
mkdir -p public/music
# Coloca tu archivo indigo.mp3 en public/music/
```

## 🎨 Cómo Agregar tu Foto

### Usando la foto del attachment:

La foto que adjuntaste de la pareja debe ser:

1. Renombrada a `couple-photo.jpg`
2. Colocada en la carpeta `public/`
3. La ruta final debe ser: `revelacion/public/couple-photo.jpg`

### Usando PowerShell:

```powershell
# Crea la carpeta public si no existe
New-Item -ItemType Directory -Force -Path "public"

# Copia tu foto (ajusta la ruta de origen)
Copy-Item "C:\ruta\a\tu\foto.jpg" -Destination "public\couple-photo.jpg"
```

## 📁 Estructura Final de `public/`

```
public/
├── couple-photo.jpg    # ← FOTO PRINCIPAL (REQUERIDA)
├── favicon.ico         # ← Opcional
└── music/
    └── indigo.mp3      # ← Opcional (si no usas Spotify)
```

## ✅ Verificación

Después de agregar las imágenes, verifica que:

1. La foto existe en `public/couple-photo.jpg`
2. Puedes accederla en `http://localhost:3000/couple-photo.jpg` cuando el servidor esté corriendo
3. La imagen no pesa más de 2MB para mejor rendimiento

## 🖼️ Optimización de Imágenes

Para mejor rendimiento, considera optimizar tus imágenes:

### Usando Online:
- [TinyPNG](https://tinypng.com) - Compresión de PNG/JPG
- [Squoosh](https://squoosh.app) - Compresión y conversión

### Usando Comandos:

Con ImageMagick (si lo tienes instalado):
```bash
magick convert couple-photo.jpg -resize 800x1000 -quality 85 couple-photo-optimized.jpg
```

## 🎨 Placeholder

Si aún no tienes la imagen, puedes usar un placeholder temporal:

1. Ve a [https://placeholder.com](https://placeholder.com)
2. Descarga una imagen de 800x1000
3. Renómbrala a `couple-photo.jpg`
4. Colócala en `public/`
5. Reemplázala con tu foto real más tarde

---

**Nota**: La foto de la pareja que compartiste en el attachment se ve perfecta para usar. Solo guárdala como `couple-photo.jpg` en la carpeta `public/`.
