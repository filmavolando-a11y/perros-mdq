'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Sel, { Colores } from '@/components/Sel'
import { RAZAS, COLORES, BARRIOS, TAMANOS, SEXOS, EDADES, PELOS, SNN } from '@/lib/options'

export default function Home() {
  const [f, setF] = useState<Record<string, string>>({})
  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<any[] | null>(null)
  const set = (k: string) => (v: string) => setF((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    let q = supabase.from('perros').select('*').eq('estado', 'activo').order('created_at', { ascending: false }).limit(60)
    for (const [k, v] of Object.entries(f)) if (v) q = q.eq(k, v)
    if (cols.length) q = q.overlaps('colores', cols)
    q.then(({ data }) => setRows(data ?? []))
  }, [f, cols])

  return (
    <>
      <h1>¿Perdiste o encontraste un perro en Mar del Plata?</h1>
      <div className="cta">
        <Link href="/publicar/perdido" className="big perdido">Perdí a mi perro</Link>
        <Link href="/publicar/encontrado" className="big encontrado">Encontré un perro</Link>
      </div>

      <div className="filters">
        <Sel label="Tipo" value={f.tipo ?? ''} onChange={set('tipo')} options={['perdido', 'encontrado']} all />
        <Sel label="Raza" value={f.raza ?? ''} onChange={set('raza')} options={RAZAS} all />
        <Sel label="Tamaño" value={f.tamano ?? ''} onChange={set('tamano')} options={TAMANOS} all />
        <Sel label="Sexo" value={f.sexo ?? ''} onChange={set('sexo')} options={SEXOS} all />
        <Sel label="Edad" value={f.edad ?? ''} onChange={set('edad')} options={EDADES} all />
        <Sel label="Pelo" value={f.pelo ?? ''} onChange={set('pelo')} options={PELOS} all />
        <Sel label="Collar" value={f.collar ?? ''} onChange={set('collar')} options={SNN} all />
        <Sel label="Zona" value={f.barrio ?? ''} onChange={set('barrio')} options={BARRIOS} all />
      </div>
      <Colores value={cols} onChange={setCols} options={COLORES} />

      {rows === null ? <p className="muted">Cargando…</p> : rows.length === 0 ? (
        <p className="muted">No hay publicaciones con esos filtros. Probá sacar alguno.</p>
      ) : (
        <div className="grid">
          {rows.map((p) => (
            <Link key={p.id} href={`/perro/${p.id}`} className="card">
              <img src={p.fotos[0]} alt={`Perro ${p.tipo}`} />
              <div>
                <span className={`tag ${p.tipo}`}>{p.tipo === 'perdido' ? 'Perdido' : 'Encontrado'}</span>
                <b>{p.raza}</b>
                <br />{p.sexo}, {p.tamano} · {p.colores.join(', ')}
                <br /><span className="muted">{p.barrio}, {p.fecha}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
