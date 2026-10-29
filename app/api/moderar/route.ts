import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const NIVELES = ['UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'VERY_LIKELY']
const nivel = (s?: string) => Math.max(0, NIVELES.indexOf(s ?? 'UNKNOWN'))
const PERRO = /dog|puppy|canidae|retriever|terrier|hound|shepherd|poodle|bulldog|chihuahua|husky|collie|beagle|boxer/i

// Revisa las fotos con Google Cloud Vision. Si todo está limpio aprueba; si no, deja la publicación pendiente.
export async function POST(req: Request) {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!)
  const token = req.headers.get('authorization')?.replace('Bearer ', '') ?? ''
  const { data: auth } = await sb.auth.getUser(token)
  const { id } = await req.json().catch(() => ({ id: null }))
  if (!auth.user || !id) return NextResponse.json({ error: 'no autorizado' }, { status: 401 })

  const { data: p } = await sb.from('perros').select('id,user_id,estado,fotos,ia_revisada').eq('id', id).single()
  // Solo el dueño, solo publicaciones pendientes y una sola revisión por publicación
  if (!p || p.user_id !== auth.user.id || p.estado !== 'pendiente' || p.ia_revisada) {
    return NextResponse.json({ estado: p?.estado ?? null })
  }

  let estado = 'pendiente'
  let nota = ''
  try {
    const requests = await Promise.all(
      p.fotos.map(async (url: string) => {
        const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
        return {
          image: { content: buf.toString('base64') },
          features: [{ type: 'LABEL_DETECTION', maxResults: 15 }, { type: 'SAFE_SEARCH_DETECTION' }],
        }
      })
    )
    const r = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    })
    const j = await r.json()
    if (!r.ok || j.responses?.some((x: any) => x.error)) throw new Error('vision')

    const res = j.responses as any[]
    const sensible = res.some((x) => {
      const s = x.safeSearchAnnotation ?? {}
      return nivel(s.adult) >= 3 || nivel(s.violence) >= 3 || nivel(s.racy) >= 4 || nivel(s.medical) >= 4
    })
    const hayPerro = res.some((x) => (x.labelAnnotations ?? []).some((l: any) => l.score >= 0.6 && PERRO.test(l.description)))

    if (sensible) nota = 'Posible contenido sensible (adulto, violencia o heridas). Revisar.'
    else if (!hayPerro) nota = 'Ninguna foto parece mostrar un perro. Revisar.'
    else estado = 'activo'
  } catch {
    nota = 'No se pudo revisar con la IA. Revisar a mano.'
  }

  await sb.from('perros').update({ estado, ia_revisada: true, ia_nota: nota || null }).eq('id', id)
  return NextResponse.json({ estado })
}
