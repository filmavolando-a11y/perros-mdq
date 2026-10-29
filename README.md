# Perros perdidos Mar del Plata (MVP 1)

1. Creá un proyecto en supabase.com y pegá `supabase/schema.sql` en el SQL Editor.
2. Authentication > Providers: activá **Email** (magic link) y **Google** (ID y secret de Google Cloud Console, credencial OAuth "Aplicación web"; como URI de redireccionamiento autorizada usá la que te muestra Supabase).
3. Authentication > URL Configuration: Site URL `http://localhost:3000` (y después tu dominio de Vercel) y agregalo también en Redirect URLs.
4. Copiá `.env.example` a `.env.local` con la URL y la anon key (Project Settings > API).
5. `npm install` y `npm run dev`. Para publicarla: subila a GitHub e importala en vercel.com con las mismas variables.
