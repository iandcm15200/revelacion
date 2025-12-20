# 🎉 Revelación de Género - Invitación Digital

Una aplicación web moderna y elegante para invitar a tus seres queridos a la revelación de género de tu bebé, con votaciones en tiempo real, dedicatorias, información del evento y mucho más.

## ✨ Características

- 👤 **Sistema de Login/Registro** - Registro simple de invitados
- 🎬 **Animación de Bienvenida** - Efecto estilo Banksy con desgarramiento de foto
- 🎵 **Reproductor de Música** - Música de fondo con Spotify
- 🗳️ **Módulo de Apuestas** - Vota por niña o niño con resultados en tiempo real
- 🎁 **Sección de Contribuciones** - Sugerencias según la predicción
- ⏰ **Contador Regresivo** - Cuenta regresiva dinámica hasta el evento
- 🗺️ **Información del Evento** - Fecha, hora, ubicación con mapa
- 💝 **Dedicatorias** - Muro para escribir mensajes para el bebé
- 🍽️ **Menú del Evento** - Muestra el menú de comidas y bebidas
- 📱 **Diseño Responsivo** - Optimizado para móviles y desktop
- 🎨 **Animaciones Suaves** - Framer Motion para experiencia fluida
- 📊 **Base de Datos en Tiempo Real** - Supabase para sincronización instantánea

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilos responsivos
- **Framer Motion** para animaciones
- **Supabase** para base de datos y autenticación
- **React Hook Form** para manejo de formularios
- **Zustand** para manejo de estado global
- **Recharts** para gráficos
- **date-fns** para manejo de fechas

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd revelacion
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y completa las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase

# UploadThing (opcional, para videos)
UPLOADTHING_SECRET=tu_secret
UPLOADTHING_APP_ID=tu_app_id

# Configuración del Evento
NEXT_PUBLIC_EVENT_DATE=2025-01-15T18:00:00
NEXT_PUBLIC_EVENT_LOCATION=Salón de Eventos Ejemplo
NEXT_PUBLIC_EVENT_ADDRESS=Calle Principal #123, Ciudad
NEXT_PUBLIC_EVENT_COORDINATES=40.7128,-74.0060

# Spotify
NEXT_PUBLIC_SPOTIFY_TRACK_ID=6rPO02ozF3bM7NnOV4h6s2
NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID=tu_playlist_id
```

### 4. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ejecuta el siguiente SQL en el editor SQL de Supabase:

```sql
-- Ver archivo database.sql
```

4. Copia la URL y la Anon Key a tu archivo `.env.local`

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
revelacion/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   ├── login/
│   │   └── page.tsx        # Página de login/registro
│   └── globals.css         # Estilos globales
├── components/
│   ├── WelcomeAnimation.tsx      # Animación de bienvenida
│   ├── Navbar.tsx               # Barra de navegación
│   ├── MusicPlayer.tsx          # Reproductor de música
│   ├── VotingModule.tsx         # Módulo de votación
│   ├── ContributionsSection.tsx # Sección de contribuciones
│   ├── EventInfo.tsx            # Info y countdown del evento
│   ├── DedicationsModule.tsx    # Módulo de dedicatorias
│   ├── MenuSection.tsx          # Menú del evento
│   └── Footer.tsx               # Footer
├── lib/
│   └── supabase.ts         # Cliente de Supabase
├── store/
│   ├── guestStore.ts       # Store de invitados
│   └── votingStore.ts      # Store de votación
├── public/
│   ├── couple-photo.jpg    # Foto de la pareja (agregar)
│   └── music/
│       └── indigo.mp3      # Música (opcional)
└── README.md
```

## 🎨 Personalización

### Cambiar Colores

Edita el archivo `tailwind.config.ts` para ajustar la paleta de colores:

```typescript
colors: {
  pink: { ... },
  blue: { ... },
  beige: { ... },
}
```

### Cambiar Foto de Portada

Coloca tu foto de pareja en `public/couple-photo.jpg` o actualiza la ruta en `WelcomeAnimation.tsx`.

### Ajustar Información del Evento

Modifica las variables de entorno en `.env.local` para cambiar la fecha, ubicación y otros detalles.

### Personalizar Menú

Edita el archivo `components/MenuSection.tsx` para agregar o modificar los platillos del menú.

## 🚀 Deployment

### Vercel (Recomendado)

1. Haz push de tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Despliega

```bash
npm run build
```

### Otros Proveedores

La aplicación puede desplegarse en cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🗄️ Base de Datos

### Tablas de Supabase

- **guests** - Información de invitados
- **votes** - Votos de predicción
- **dedications** - Mensajes para el bebé
- **videos** - URLs de videos subidos (opcional)

Ver `database.sql` para el schema completo.

## 🎵 Música

### Opción 1: Spotify Embed (Recomendado)

La aplicación usa Spotify Web API. Configura:
- `NEXT_PUBLIC_SPOTIFY_TRACK_ID` con el ID de "Índigo" de Camilo
- `NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID` con tu playlist personalizada

### Opción 2: Archivo Local

Coloca el archivo de audio en `public/music/indigo.mp3`.

## 📱 Agregar a la Pantalla de Inicio

Los invitados pueden agregar la app a su pantalla de inicio en móviles para una experiencia tipo app nativa.

## 🐛 Troubleshooting

### La música no se reproduce automáticamente

Los navegadores bloquean la reproducción automática. Los usuarios deben hacer clic en el botón de música.

### Los votos no se actualizan en tiempo real

Verifica que las suscripciones en tiempo real de Supabase estén habilitadas en tu proyecto.

### Error de autenticación con Supabase

Verifica que las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén correctas.

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de modificarlo según tus necesidades.

## 🙏 Créditos

- Diseño de animación inspirado en Banksy
- Iconos de emojis nativos
- Música: "Índigo" de Camilo

## 💝 Soporte

Si tienes preguntas o necesitas ayuda, no dudes en contactar.

---

**¡Disfruta tu revelación de género! 👶💗💙**
