'use client'
import Link from 'next/link'
import { supabase, useUser } from '@/lib/supabase'

export default function Header() {
  const u = useUser()
  return (
    <header>
      <Link href="/" className="logo">Mardel Perdidos</Link>
      <nav>
        {u ? (
          <>
            <span className="mail">{u.email}</span>
            <button className="link" onClick={() => supabase.auth.signOut()}>Salir</button>
          </>
        ) : u === null ? <Link href="/login">Ingresar</Link> : null}
      </nav>
    </header>
  )
}
