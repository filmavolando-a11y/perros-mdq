create table perros (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  tipo text not null check (tipo in ('perdido','encontrado')),
  nombre text, raza text, tamano text, sexo text, edad text, pelo text,
  colores text[] not null default '{}',
  collar text, chapita text, castrado text, senas text,
  barrio text, fecha date,
  fotos text[] not null check (cardinality(fotos) between 1 and 3),
  estado text not null default 'activo' check (estado in ('activo','resuelto')),
  created_at timestamptz not null default now()
);
create table contactos (
  perro_id uuid primary key references perros on delete cascade,
  whatsapp text not null
);
alter table perros enable row level security;
alter table contactos enable row level security;

create policy "ver perros" on perros for select using (true);
create policy "crear perro" on perros for insert to authenticated with check (auth.uid() = user_id);
create policy "editar perro" on perros for update to authenticated using (auth.uid() = user_id);
create policy "borrar perro" on perros for delete to authenticated using (auth.uid() = user_id);

-- el WhatsApp solo lo ven usuarios logueados
create policy "ver contacto" on contactos for select to authenticated using (true);
create policy "crear contacto" on contactos for insert to authenticated
  with check (exists (select 1 from perros p where p.id = perro_id and p.user_id = auth.uid()));

insert into storage.buckets (id, name, public) values ('fotos','fotos',true) on conflict do nothing;
create policy "fotos lectura" on storage.objects for select using (bucket_id = 'fotos');
create policy "fotos subir" on storage.objects for insert to authenticated
  with check (bucket_id = 'fotos' and (storage.foldername(name))[1] = auth.uid()::text);
