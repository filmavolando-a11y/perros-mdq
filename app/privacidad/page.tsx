// ANTES DE PUBLICAR: reemplazá estos dos valores
const RESPONSABLE = 'TU NOMBRE COMPLETO'
const CONTACTO = 'tu-mail@ejemplo.com'

export const metadata = { title: 'Política de privacidad' }

export default function Privacidad() {
  return (
    <article style={{ maxWidth: 680, lineHeight: 1.7 }}>
      <h1>Política de privacidad</h1>
      <p>Última actualización: 29 de octubre de 2026.</p>
      <p>
        Esta web ayuda a las personas de Mar del Plata a reencontrar perros perdidos con sus familias.
        El responsable del sitio es {RESPONSABLE}. Podés escribirnos a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>.
      </p>

      <h2>Qué datos guardamos</h2>
      <p>Cuando ingresás con Google, recibimos tu mail, tu nombre y tu foto de perfil. Cuando ingresás con link por mail, guardamos solo tu mail. Cuando publicás, guardamos lo que cargues: fotos del perro, características, zona, fecha, señas particulares y tu número de WhatsApp.</p>

      <h2>Para qué los usamos</h2>
      <p>Para identificarte, mostrar tus publicaciones, permitir que otras personas te contacten y evitar abusos o publicaciones falsas. No vendemos tus datos ni los usamos para publicidad.</p>

      <h2>Qué ve cada persona</h2>
      <p>Las publicaciones (fotos, características y zona) son públicas. Tu número de WhatsApp lo ven solo las personas que ingresaron con su cuenta. Tu mail no se muestra a nadie. Te recomendamos no incluir en las fotos ni en las señas datos como tu dirección exacta.</p>

      <h2>Servicios que usamos</h2>
      <p>Para funcionar usamos Google (inicio de sesión), Supabase (base de datos, autenticación y almacenamiento de fotos) y Vercel (alojamiento del sitio). Estos proveedores pueden procesar datos en servidores fuera de Argentina.</p>

      <h2>Cookies</h2>
      <p>Usamos solo el almacenamiento del navegador necesario para mantener tu sesión iniciada. No usamos cookies de publicidad ni de seguimiento.</p>

      <h2>Cuánto tiempo los conservamos</h2>
      <p>Mientras tengas cuenta o publicaciones activas. Podés marcar una publicación como resuelta, y podés pedirnos en cualquier momento que borremos tu cuenta y tus publicaciones.</p>

      <h2>Tus derechos</h2>
      <p>
        Podés pedirnos acceso, corrección o eliminación de tus datos escribiendo a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>. Respondemos en un plazo razonable. En Argentina rige la
        Ley 25.326 de Protección de los Datos Personales. La Agencia de Acceso a la Información Pública
        es el organismo que recibe denuncias por incumplimientos.
      </p>

      <h2>Menores de edad</h2>
      <p>El sitio está pensado para personas mayores de 18 años.</p>

      <h2>Cambios</h2>
      <p>Si cambiamos esta política, actualizaremos la fecha de arriba.</p>
    </article>
  )
}