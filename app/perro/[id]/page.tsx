'use client'
import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { supabase, useUser } from '@/lib/supabase'
import { borrarPerro } from '@/lib/borrar'

export default function Detalle() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const u = useUser()
  const [p, setP] = useState<any>(undefined) // undefined = cargando, null = no existe / no visible
  const [tel, setTel] = useState<string>()
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    supabase.from('perros').select('*').eq('id', id).maybeSingle().then(({ data }) => setP(data))
  }, [id])
  useEffect(() => {
    if (!u) return
    supabase.from('contactos').select('whatsapp').eq('perro_id', id).maybeSingle().then(({ data }) => setTel(data?.whatsapp))
    supabase.rpc('is_admin').then(({ data }) => setAdmin(!!data))
  }, [u, id])

  if (p === undefined) return <p className="muted">Cargando…</p>
  if (p === null) return <p>Esta publicación no existe o todavía está en revisión.</p>

  const esDueno = u?.id === p.user_id
  const resolver = async () => {
    await supabase.from('perros').update({ estado: 'resuelto' }).eq('id', id)
    setP({ ...p, estado: 'resuelto' })
  }
  const aprobar = async () => {
    await supabase.from('perros').update({ estado: 'activo' }).eq('id', id)
    setP({ ...p, estado: 'activo' })
  }
  const borrar = async () => {
    if (!confirm('¿Borrar esta publicación y sus fotos? No se puede deshacer.')) return
    if (await borrarPerro(p)) router.push(admin ? '/admin' : '/')
  }
  const datos = [['Raza', p.raza], ['Tamaño', p.tamano], ['Sexo', p.sexo], ['Edad', p.edad], ['Pelo', p.pelo],
    ['Colores', p.colores.join(', ')], ['Collar', p.collar], ['Chapita', p.chapita], ['Castrado', p.castrado],
    ['Zona', p.barrio], ['Fecha', p.fecha]]

  return (
    <>
      <h1><span className={`tag ${p.tipo}`}>{p.tipo === 'perdido' ? 'Perdido' : 'Encontrado'}</span>{p.nombre}</h1>
      {p.estado === 'pendiente' && (
        <p><b>En revisión.</b> {esDueno ? 'Tu publicación se va a mostrar cuando la aprobemos.' : 'Todavía no es pública.'}</p>
      )}
      {p.estado === 'resuelto' && <p><b>Esta publicación ya fue resuelta.</b></p>}
      <div className="photos">{p.fotos.map((s: string) => <img key={s} src={s} alt="Foto del perro" />)}</div>
      <dl>{datos.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}</dl>
      {p.senas && <p><b>Señas:</b> {p.senas}</p>}
      {u ? (
        tel && <a className="btn wa" target="_blank" href={`https://wa.me/${tel.replace(/\D/g, '')}`}>Escribir por WhatsApp</a>
      ) : (
        <p><Link href="/login">Ingresá</Link> para ver el contacto.</p>
      )}
      {esDueno && p.estado === 'activo' && (
        <p><button className="btn g" onClick={resolver}>Ya lo encontré / ya apareció</button></p>
      )}
      {(esDueno || admin) && (
        <p>
          {admin && p.estado === 'pendiente' && <button className="btn" onClick={aprobar}>Aprobar</button>}{' '}
          <button className="btn g" onClick={borrar}>Borrar publicación</button>
        </p>
      )}
    </>
  )
}
