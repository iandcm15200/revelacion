-- =====================================================
-- SCHEMA DE BASE DE DATOS PARA REVELACIÓN DE GÉNERO
-- Supabase SQL
-- =====================================================

-- Tabla: guests (Invitados)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla: votes (Votos de predicción)
CREATE TABLE IF NOT EXISTS public.votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE NOT NULL,
    team VARCHAR(10) CHECK (team IN ('girl', 'boy')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(guest_id) -- Un voto por invitado
);

-- Tabla: dedications (Dedicatorias para el bebé)
CREATE TABLE IF NOT EXISTS public.dedications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    approved BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla: videos (Videos subidos - opcional)
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    approved BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_votes_guest_id ON public.votes(guest_id);
CREATE INDEX IF NOT EXISTS idx_votes_team ON public.votes(team);
CREATE INDEX IF NOT EXISTS idx_dedications_guest_id ON public.dedications(guest_id);
CREATE INDEX IF NOT EXISTS idx_dedications_approved ON public.dedications(approved);
CREATE INDEX IF NOT EXISTS idx_videos_guest_id ON public.videos(guest_id);
CREATE INDEX IF NOT EXISTS idx_videos_approved ON public.videos(approved);

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (Row Level Security)
-- =====================================================

-- Habilitar RLS
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dedications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Políticas para guests
CREATE POLICY "Permitir lectura de invitados" ON public.guests
    FOR SELECT USING (true);

CREATE POLICY "Permitir inserción de invitados" ON public.guests
    FOR INSERT WITH CHECK (true);

-- Políticas para votes
CREATE POLICY "Permitir lectura de votos" ON public.votes
    FOR SELECT USING (true);

CREATE POLICY "Permitir inserción de votos" ON public.votes
    FOR INSERT WITH CHECK (true);

-- Políticas para dedications
CREATE POLICY "Permitir lectura de dedicatorias aprobadas" ON public.dedications
    FOR SELECT USING (approved = true);

CREATE POLICY "Permitir inserción de dedicatorias" ON public.dedications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir lectura de todas las dedicatorias (admin)" ON public.dedications
    FOR SELECT USING (true);

-- Políticas para videos
CREATE POLICY "Permitir lectura de videos aprobados" ON public.videos
    FOR SELECT USING (approved = true);

CREATE POLICY "Permitir inserción de videos" ON public.videos
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener el conteo de votos
CREATE OR REPLACE FUNCTION get_vote_counts()
RETURNS TABLE (
    team VARCHAR(10),
    count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT votes.team, COUNT(*) as count
    FROM public.votes
    GROUP BY votes.team;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- DATOS DE PRUEBA (OPCIONAL - Comentar en producción)
-- =====================================================

/*
-- Invitados de prueba
INSERT INTO public.guests (name, phone, email) VALUES
    ('Juan Pérez', '+1234567890', 'juan@example.com'),
    ('María García', '+0987654321', 'maria@example.com'),
    ('Carlos López', NULL, 'carlos@example.com');

-- Votos de prueba
INSERT INTO public.votes (guest_id, team)
SELECT id, 'girl' FROM public.guests WHERE name = 'Juan Pérez';

INSERT INTO public.votes (guest_id, team)
SELECT id, 'boy' FROM public.guests WHERE name = 'María García';

-- Dedicatorias de prueba
INSERT INTO public.dedications (guest_id, message, approved)
SELECT id, '¡Felicidades! Que venga con mucha salud y amor.', true
FROM public.guests WHERE name = 'Juan Pérez';
*/

-- =====================================================
-- NOTAS DE CONFIGURACIÓN
-- =====================================================

/*
1. Ejecuta este script en el Editor SQL de Supabase
2. Verifica que todas las tablas se hayan creado correctamente
3. Asegúrate de que RLS esté habilitado
4. Para producción, ajusta las políticas de seguridad según tus necesidades
5. Considera agregar autenticación más robusta si es necesario

REALTIME:
Para habilitar actualizaciones en tiempo real, ve a:
Database > Replication > y habilita las tablas que necesites
*/
