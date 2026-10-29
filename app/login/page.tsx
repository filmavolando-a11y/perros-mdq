'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const google = () =>
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })

  async function magic(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    setMsg(error ? 'No pudimos enviar el mail. Revisá la dirección e intentá de nuevo.' : 'Listo. Te enviamos un link a tu mail: tocalo para entrar.')
  }

  return (
    <div className="form">
      <h1>Ingresar</h1>
      <button className="btn g" onClick={google}>Continuar con Google</button>
      <p className="muted">o recibí un link en tu mail, sin contraseña</p>
      <form className="form" onSubmit={magic}>
        <input type="email" required placeholder="tu@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn">Enviarme el link</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
