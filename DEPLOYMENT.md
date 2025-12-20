# Guía de Deployment en Vercel

## Pasos para Desplegar en Vercel

### 1. Preparar el Proyecto

Asegúrate de que todo el código esté commiteado en GitHub:

```bash
git add .
git commit -m "Proyecto de revelación de género completo"
git push origin main
```

### 2. Crear Cuenta en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Regístrate con tu cuenta de GitHub

### 3. Importar Proyecto

1. Click en "Add New Project"
2. Selecciona el repositorio de GitHub
3. Vercel detectará automáticamente que es un proyecto Next.js

### 4. Configurar Variables de Entorno

En la sección "Environment Variables", agrega todas las variables de tu `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
NEXT_PUBLIC_EVENT_DATE=2025-01-15T18:00:00
NEXT_PUBLIC_EVENT_LOCATION=Nombre del Lugar
NEXT_PUBLIC_EVENT_ADDRESS=Dirección Completa
NEXT_PUBLIC_SPOTIFY_TRACK_ID=6rPO02ozF3bM7NnOV4h6s2
NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID=tu_playlist_id
```

### 5. Deploy

1. Click en "Deploy"
2. Espera a que termine el deployment (2-3 minutos)
3. ¡Tu sitio estará en vivo!

### 6. Configurar Dominio Personalizado (Opcional)

1. Ve a Settings > Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar el DNS

## Actualizaciones Futuras

Cada vez que hagas push a tu repositorio, Vercel desplegará automáticamente los cambios.

```bash
git add .
git commit -m "Actualización"
git push origin main
```

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## Troubleshooting

### Error de Build

Si el build falla, revisa:
1. Que todas las dependencias estén en `package.json`
2. Que no haya errores de TypeScript
3. Que las variables de entorno estén configuradas

### Imágenes no Cargan

Asegúrate de que las imágenes estén en la carpeta `public/` y que las rutas sean correctas.

### Base de Datos no Conecta

Verifica que las variables de Supabase estén correctamente configuradas en Vercel.

## Optimizaciones de Producción

1. **Imágenes**: Usa Next.js Image component para optimización automática
2. **Fonts**: Las fuentes de Google se cargan automáticamente optimizadas
3. **Caching**: Vercel maneja el caching automáticamente
4. **Analytics**: Considera agregar Vercel Analytics

## Seguridad

- Las variables de entorno con `NEXT_PUBLIC_` son visibles en el cliente
- Las keys de Supabase Anon son seguras para el cliente
- Nunca expongas secrets del servidor en el cliente
- Habilita Row Level Security en Supabase

## Monitoreo

1. Ve a tu dashboard de Vercel
2. Revisa Analytics para ver visitantes
3. Revisa Logs si hay errores
4. Configura alertas si es necesario

---

¡Listo! Tu invitación de revelación de género está en vivo 🎉👶💗💙
