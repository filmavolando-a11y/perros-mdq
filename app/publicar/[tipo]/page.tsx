'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { supabase, useUser } from '@/lib/supabase'
import { shrink } from '@/lib/img'
import Sel, { Colores } from '@/components/Sel'
import { RAZAS, COLORES, BARRIOS, TAMANOS, SEXOS, EDADES, PELOS, SNN } from '@/lib/options'

export default function Publicar() {
  const { tipo } = useParams<{ tipo: string }>()
  const router = useRouter()
  const u = useUser()
  const [f, setF] = useState<Record<string, string>>({
    raza: RAZAS[0], tamano: 'Mediano', sexo: 'No sé', edad: 'Adulto', pelo: 'Corto',
    collar: 'No sé', chapita: 'No sé', castrado: 'No sé', barrio: BARRIOS[0],
    fecha: new Date().toISOString().slice(0, 10), senas: '', nombre: '', whatsapp: '',
  })
  const [cols, setCols] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k: string) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  if (u === undefined) return null
  if (!u) return <p>Para publicar primero <Link href="/login">ingresá con Google o con tu mail</Link>.</p>

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!files.length) return setErr('Subí al menos una foto.')
    if (!cols.length) return setErr('Elegí al menos un color.')
    setBusy(true); setErr('')
    try {
      const urls: string[] = []
      for (const file of files) {
        const path = `${u!.id}/${crypto.randomUUID()}.jpg`
        const { error } = await supabase.storage.from('fotos').upload(path, await shrink(file), { contentType: 'image/jpeg' })
        if (error) throw error
        urls.push(supabase.storage.from('fotos').getPublicUrl(path).data.publicUrl)
      }
      const { whatsapp, ...rest } = f
      const { data, error } = await supabase.from('perros').insert({ ...rest, tipo, colores: cols, fotos: urls }).select('id').single()
      if (error) throw error
      await supabase.from('contactos').insert({ perro_id: data.id, whatsapp })
      try {
        const { data: s } = await supabase.auth.getSession()
        await fetch('/api/moderar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${s.session?.access_token}` },
          body: JSON.stringify({ id: data.id }),
        })  
      } catch {}
      router.push(`/perro/${data.id}`)
    } catch {
      setErr('No pudimos publicar. Revisá los datos e intentá de nuevo.')
      setBusy(false)
    }
  }

  return (
    <form className="form" onSubmit={send}>
      <h1>{tipo === 'perdido' ? 'Perdí a mi perro' : 'Encontré un perro'}</h1>
      <label className="f"><span>Fotos (hasta 3)</span>
        <input type="file" accept="image/*" multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 3))} />
      </label>
      {tipo === 'perdido' && (
        <label className="f"><span>Nombre del perro</span>
          <input type="text" value={f.nombre} onChange={(e) => set('nombre')(e.target.value)} />
        </label>
      )}
      <Sel label="Raza (si no sabés, dejá Mestizo / no sé)" value={f.raza} onChange={set('raza')} options={RAZAS} />
      <Sel label="Tamaño" value={f.tamano} onChange={set('tamano')} options={TAMANOS} />
      <Sel label="Sexo" value={f.sexo} onChange={set('sexo')} options={SEXOS} />
      <Sel label="Edad aproximada" value={f.edad} onChange={set('edad')} options={EDADES} />
      <Sel label="Pelo" value={f.pelo} onChange={set('pelo')} options={PELOS} />
      <div className="f"><span>Colores</span><Colores value={cols} onChange={setCols} options={COLORES} /></div>
      <Sel label="Tiene collar" value={f.collar} onChange={set('collar')} options={SNN} />
      <Sel label="Tiene chapita" value={f.chapita} onChange={set('chapita')} options={SNN} />
      <Sel label="Castrado" value={f.castrado} onChange={set('castrado')} options={SNN} />
      <label className="f"><span>Señas particulares (manchas, cicatrices, oreja caída…)</span>
        <textarea rows={3} value={f.senas} onChange={(e) => set('senas')(e.target.value)} />
      </label>
      <Sel label={tipo === 'perdido' ? 'Zona donde se perdió' : 'Zona donde lo encontraste'} value={f.barrio} onChange={set('barrio')} options={BARRIOS} />
      <label className="f"><span>Fecha</span>
        <input type="date" required value={f.fecha} onChange={(e) => set('fecha')(e.target.value)} />
      </label>
      <label className="f"><span>WhatsApp de contacto (solo lo ven usuarios registrados)</span>
        <input type="text" required placeholder="+54 223 ..." value={f.whatsapp} onChange={(e) => set('whatsapp')(e.target.value)} />
      </label>
      {err && <p className="err">{err}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Publicando…' : 'Publicar'}</button>
    </form>
  )
}
