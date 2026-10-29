import { createClient, User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// undefined = cargando, null = sin sesión
export function useUser() {
  const [u, setU] = useState<User | null | undefined>(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setU(data.session?.user ?? null))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setU(s?.user ?? null))
    return () => data.subscription.unsubscribe()
  }, [])
  return u
}
