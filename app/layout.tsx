import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Perros perdidos y encontrados en Mar del Plata',
  description: 'Publicá o buscá un perro perdido o encontrado en Mar del Plata.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
