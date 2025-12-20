# 🚀 Guía Rápida de Configuración de Supabase

## Paso 1: Crear Cuenta y Proyecto

1. Ve a [https://supabase.com](https://supabase.com)
2. Click en "Start your project"
3. Regístrate con GitHub, Google o email
4. Click en "New Project"
5. Completa:
   - **Name:** revelacion-genero
   - **Database Password:** Guarda esta contraseña (la necesitarás)
   - **Region:** Elige la más cercana a tu ubicación
   - **Plan:** Free (suficiente para este proyecto)
6. Click en "Create new project" (tardará 1-2 minutos)

## Paso 2: Ejecutar el SQL

1. En el dashboard de Supabase, ve al menú izquierdo
2. Click en **SQL Editor**
3. Click en **New query**
4. Abre el archivo `database.sql` de este proyecto
5. Copia TODO el contenido del archivo
6. Pégalo en el editor SQL de Supabase
7. Click en **RUN** (o presiona Ctrl+Enter)
8. Verás "Success. No rows returned" - ¡Eso está bien!

## Paso 3: Verificar las Tablas

1. Ve a **Table Editor** en el menú izquierdo
2. Deberías ver 4 tablas:
   - ✅ guests
   - ✅ votes
   - ✅ dedications
   - ✅ videos

## Paso 4: Habilitar Realtime

1. Ve a **Database** > **Replication**
2. Busca la tabla **votes**
3. Habilita el switch de Replication
4. Haz lo mismo para **dedications**
5. Esto permitirá actualizaciones en tiempo real

## Paso 5: Obtener las Credenciales

1. Ve a **Settings** > **API** (en el menú izquierdo)
2. Encontrarás dos valores importantes:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
Copia esto y pégalo en `.env.local` como `NEXT_PUBLIC_SUPABASE_URL`

### Anon Key (anon/public)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Copia esto y pégalo en `.env.local` como `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Paso 6: Actualizar .env.local

Abre el archivo `.env.local` en tu proyecto y reemplaza:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ Verificación

Para verificar que todo funciona:

1. Inicia el servidor de desarrollo: `npm run dev`
2. Abre [http://localhost:3000/login](http://localhost:3000/login)
3. Registra un invitado de prueba
4. Si te redirige a la página principal, ¡Supabase está configurado correctamente!

## 🔍 Revisar Datos

Para ver los datos que se van guardando:

1. Ve a **Table Editor** en Supabase
2. Click en la tabla **guests**
3. Verás los invitados registrados
4. Lo mismo para **votes** y **dedications**

## 🛟 Troubleshooting

### Error: "Invalid API key"
- Verifica que copiaste correctamente la Anon Key
- Asegúrate de no tener espacios al inicio o final

### Error: "relation does not exist"
- Las tablas no se crearon correctamente
- Vuelve al SQL Editor y ejecuta `database.sql` nuevamente

### No se guardan los datos
- Verifica que Row Level Security esté habilitado
- Ve a **Authentication** > **Policies** y verifica las políticas

## 📊 Dashboard de Supabase

Usa el dashboard para:
- Ver todos los invitados registrados
- Monitorear los votos en tiempo real
- Revisar las dedicatorias
- Ver estadísticas de uso
- Exportar datos si es necesario

## 🔒 Seguridad

- ✅ Row Level Security está habilitado
- ✅ Las políticas permiten lectura pública
- ✅ La Anon Key es segura para el cliente
- ✅ No hay secrets expuestos

---

**¡Listo!** Con esto, tu base de datos estará completamente configurada y lista para usar. 🎉

**Siguiente paso:** Ejecutar `npm run dev` y probar la aplicación.
