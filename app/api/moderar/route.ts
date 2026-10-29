import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const NIVELES = ['UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE', 'LIKELY', 'VERY_LIKELY']
const nivel = (s?: string) => Math.max(0, NIVELES.indexOf(s ?? 'UNKNOWN'))
const PERRO = /\b(dog|puppy)\b|dog breed/i

export async function POST(req: Request) {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!)
  const token = req.headers.get('authorization')?.replace('Bearer ', '') ?? ''
  const { data: auth } = await sb.auth.getUser(token)
  const { id } = await req.json().catch(() => ({ id: null }))
  if (!auth.user || !id) return NextResponse.json({ error: 'no autorizado' }, { status: 401 })

  const { data: p } = await sb.from('perros').select('id,user_id,estado,fotos,ia_revisada').eq('id', id).single()
  if (!p || p.user_id !== auth.user.id || p.estado !== 'pendiente' || p.ia_revisada) {
    return NextResponse.json({ estado: p?.estado ?? null })
  }

  let estado: string = 'pendiente'
  let nota = ''
  let motivo = ''
  let fallidas: number[] = []
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
    if (!r.ok || j.responses?.some((x: any) => x.error)) {
      console.error('Vision:', JSON.stringify(j))
      throw new Error('vision')
    }

    const res = j.responses as any[]
    const seguridad = res.map((x) => x.safeSearchAnnotation ?? {})
    const esPerro = res.map((x) =>
      (x.labelAnnotations ?? []).some((l: any) => l.score >= 0.6 && PERRO.test(l.description))
    )
    fallidas = esPerro.map((ok, i) => (ok ? 0 : i + 1)).filter(Boolean)

    const sensible = seguridad.some((s) => nivel(s.adult) >= 3 || nivel(s.racy) >= 4 || nivel(s.violence) >= 4)
    const revisar = seguridad.some((s) => nivel(s.violence) >= 3 || nivel(s.medical) >= 4)

    if (sensible) { estado = 'rechazado'; motivo = 'sensible' }
    else if (fallidas.length) { estado = 'rechazado'; motivo = 'no_perro' }
    else if (revisar) nota = 'Posibles heridas o violencia. Revisar.'
    else estado = 'activo'
  } catch {
    nota = 'No se pudo revisar con la IA. Revisar a mano.'
  }

  if (estado === 'rechazado') {
    const paths = p.fotos.map((s: string) => decodeURIComponent(s.split('/fotos/')[1] ?? '')).filter(Boolean)
    if (paths.length) await sb.storage.from('fotos').remove(paths)
    await sb.from('perros').delete().eq('id', id)
    return NextResponse.json({ estado, motivo, fallidas })
  }

  await sb.from('perros').update({ estado, ia_revisada: true, ia_nota: nota || null }).eq('id', id)
  return NextResponse.json({ estado })
}