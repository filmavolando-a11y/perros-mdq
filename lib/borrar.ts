import { supabase } from '@/lib/supabase'

// Borra las fotos del storage y la publicación
export async function borrarPerro(p: { id: string; fotos: string[] }) {
  const paths = p.fotos.map((s) => decodeURIComponent(s.split('/fotos/')[1] ?? '')).filter(Boolean)
  if (paths.length) await supabase.storage.from('fotos').remove(paths)
  const { error } = await supabase.from('perros').delete().eq('id', p.id)
  return !error
}
