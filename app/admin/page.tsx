'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, useUser } from '@/lib/supabase'
import { borrarPerro } from '@/lib/borrar'

export default function Admin() {
  const u = useUser()
  const [ok, setOk] = useState<boolean | null>(null)
  const [vista, setVista] = useState<'pendiente' | 'activo'>('pendiente')
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    if (u) supabase.rpc('is_admin').then(({ data }) => setOk(!!data))
  }, [u])

  const cargar = useCallback(() => {
    supabase.from('perros').select('*').eq('estado', vista).order('created_at', { ascending: false })
      .then(({ data }) => setRows(data ?? []))
  }, [vista])
  useEffect(() => { if (ok) cargar() }, [ok, cargar])

  if (u === undefined) return null
  if (!u) return <p>Ingresá con tu cuenta de administrador.</p>
  if (ok === null) return null
  if (!ok) return <p>No tenés acceso a esta página.</p>

  const aprobar = async (id: string) => {
    await supabase.from('perros').update({ estado: 'activo' }).eq('id', id)
    cargar()
  }
  const borrar = async (p: any) => {
    if (!confirm('¿Borrar esta publicación y sus fotos? No se puede deshacer.')) return
    await borrarPerro(p)
    cargar()
  }

  return (
    <>
      <h1>Moderación</h1>
      <p>
        <button className={vista === 'pendiente' ? 'btn' : 'btn g'} onClick={() => setVista('pendiente')}>Pendientes</button>{' '}
        <button className={vista === 'activo' ? 'btn' : 'btn g'} onClick={() => setVista('activo')}>Publicadas</button>
      </p>
      {rows.length === 0 && <p className="muted">No hay publicaciones en esta lista.</p>}
      <div className="grid">
        {rows.map((p) => (
          <div key={p.id} className="card">
            {p.fotos.map((s: string) => <img key={s} src={s} alt="Foto" />)}
            <div>
              <span className={`tag ${p.tipo}`}>{p.tipo}</span><b>{p.raza}</b>
              <br />{p.sexo}, {p.tamano} · {p.colores.join(', ')}
              <br /><span className="muted">{p.barrio}, {p.fecha}</span>
              {p.senas && <p>{p.senas}</p>}
              {p.ia_nota && <p className="muted">IA: {p.ia_nota}</p>}
              <p>
                {p.estado === 'pendiente' && <button className="btn" onClick={() => aprobar(p.id)}>Aprobar</button>}{' '}
                <button className="btn g" onClick={() => borrar(p)}>Borrar</button>{' '}
                <Link href={`/perro/${p.id}`}>Ver</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}