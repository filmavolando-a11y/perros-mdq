'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase, useUser } from '@/lib/supabase'

export default function Detalle() {
  const { id } = useParams<{ id: string }>()
  const u = useUser()
  const [p, setP] = useState<any>(null)
  const [tel, setTel] = useState<string>()

  useEffect(() => {
    supabase.from('perros').select('*').eq('id', id).single().then(({ data }) => setP(data))
  }, [id])
  useEffect(() => {
    if (u) supabase.from('contactos').select('whatsapp').eq('perro_id', id).single().then(({ data }) => setTel(data?.whatsapp))
  }, [u, id])

  if (!p) return <p className="muted">Cargando…</p>

  const resolver = async () => {
    await supabase.from('perros').update({ estado: 'resuelto' }).eq('id', id)
    setP({ ...p, estado: 'resuelto' })
  }
  const datos = [['Raza', p.raza], ['Tamaño', p.tamano], ['Sexo', p.sexo], ['Edad', p.edad], ['Pelo', p.pelo],
    ['Colores', p.colores.join(', ')], ['Collar', p.collar], ['Chapita', p.chapita], ['Castrado', p.castrado],
    ['Zona', p.barrio], ['Fecha', p.fecha]]

  return (
    <>
      <h1><span className={`tag ${p.tipo}`}>{p.tipo === 'perdido' ? 'Perdido' : 'Encontrado'}</span>{p.nombre}</h1>
      {p.estado === 'resuelto' && <p><b>Esta publicación ya fue resuelta.</b></p>}
      <div className="photos">{p.fotos.map((s: string) => <img key={s} src={s} alt="Foto del perro" />)}</div>
      <dl>{datos.map(([k, v]) => <><dt key={k}>{k}</dt><dd>{v}</dd></>)}</dl>
      {p.senas && <p><b>Señas:</b> {p.senas}</p>}
      {u ? (
        tel && <a className="btn wa" target="_blank" href={`https://wa.me/${tel.replace(/\D/g, '')}`}>Escribir por WhatsApp</a>
      ) : (
        <p><Link href="/login">Ingresá</Link> para ver el contacto.</p>
      )}
      {u?.id === p.user_id && p.estado === 'activo' && (
        <p><button className="btn g" onClick={resolver}>Ya lo encontré / ya apareció</button></p>
      )}
    </>
  )
}
