// ANTES DE PUBLICAR: reemplazá estos dos valores
const RESPONSABLE = 'Gonza Val'
const CONTACTO = 'filmavolando@gmail.com'

const APP = 'Perros de Mar del Plata'
const SITIO = 'https://www.mardelperdidos.online'

export const metadata = { title: 'Política de privacidad' }

export default function Privacidad() {
  return (
    <article style={{ maxWidth: 720, lineHeight: 1.7 }}>
      <h1>Política de privacidad</h1>
      <p>Última actualización: 30 de octubre de 2026.</p>

      <h2>1. Quiénes somos</h2>
      <p>
        {APP} ({SITIO}) es un sitio web gratuito que ayuda a las personas de Mar del Plata a reencontrar
        perros perdidos con sus familias. Permite publicar un perro perdido o encontrado, buscar entre las
        publicaciones y contactarse con quien publicó. El responsable del sitio es {RESPONSABLE}. Para
        cualquier consulta sobre esta política podés escribir a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <ul>
        <li><b>Datos de tu cuenta:</b> tu dirección de mail y, si ingresás con Google, tu nombre y tu foto de perfil.</li>
        <li><b>Datos de tus publicaciones:</b> fotos del perro (hasta 3), raza, tamaño, sexo, edad aproximada, color, tipo de pelo, si tiene collar o chapita, señas particulares, zona o barrio y fecha en que se perdió o se encontró.</li>
        <li><b>Dato de contacto:</b> el número de WhatsApp que cargues al publicar.</li>
        <li><b>Datos técnicos:</b> información básica que generan los servidores al visitar el sitio, como la dirección IP y el tipo de navegador, que usamos para la seguridad y el funcionamiento del servicio.</li>
      </ul>

      <h2>3. Datos que recibimos de Google</h2>
      <p>
        Si elegís ingresar con Google, Google nos comparte tu dirección de mail, tu nombre y tu foto de
        perfil. Solicitamos únicamente los permisos básicos de inicio de sesión (email, perfil y openid).
        No accedemos a tu Gmail, tus contactos, tu calendario, tu Drive ni a ningún otro dato de tu cuenta
        de Google.
      </p>
      <p>
        Usamos estos datos solamente para crear tu cuenta, identificarte, mantener tu sesión iniciada y
        asociar tus publicaciones a tu cuenta. No los vendemos, no los usamos para publicidad, no los
        usamos para entrenar sistemas de inteligencia artificial y no los compartimos con terceros, salvo
        con los proveedores técnicos indicados en la sección 6.
      </p>
      <p>
        El uso que hacemos de la información recibida de las API de Google cumple con la{' '}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Política de Datos de Usuario de los Servicios de API de Google
        </a>
        , incluidos los requisitos de Uso Limitado.
      </p>

      <h2>4. Para qué usamos tus datos</h2>
      <ul>
        <li>Permitirte ingresar y publicar.</li>
        <li>Mostrar las publicaciones a quienes buscan un perro y permitir que te contacten.</li>
        <li>Revisar las fotos para evitar contenido inapropiado y publicaciones falsas.</li>
        <li>Mantener la seguridad del sitio y prevenir abusos o estafas.</li>
        <li>Responder tus consultas y pedidos sobre tus datos.</li>
      </ul>
      <p>No usamos tus datos para publicidad ni los vendemos a nadie.</p>

      <h2>5. Qué información es pública</h2>
      <p>
        Las publicaciones (fotos, características del perro, zona y fecha) son públicas y las puede ver
        cualquier persona. Tu número de WhatsApp lo ven solamente las personas que ingresaron con su
        cuenta. Tu dirección de mail no se muestra a otros usuarios. Te recomendamos no incluir en las
        fotos ni en las señas datos personales como tu dirección exacta.
      </p>

      <h2>6. Con quién compartimos datos</h2>
      <p>No vendemos ni alquilamos tus datos. Para que el sitio funcione usamos estos proveedores, que procesan datos por cuenta nuestra:</p>
      <ul>
        <li><b>Google:</b> inicio de sesión con Google.</li>
        <li><b>Google Cloud Vision:</b> análisis automático de las fotos que subís, para detectar si muestran un perro y si contienen contenido inapropiado. Las fotos se envían solo para esa revisión.</li>
        <li><b>Supabase:</b> base de datos, autenticación y almacenamiento de las fotos.</li>
        <li><b>Vercel:</b> alojamiento del sitio.</li>
      </ul>
      <p>
        Estos proveedores pueden procesar datos en servidores ubicados fuera de la Argentina. También
        podemos divulgar información si una autoridad competente nos lo exige por ley.
      </p>

      <h2>7. Revisión automática de fotos</h2>
      <p>
        Cuando publicás, las fotos se analizan automáticamente. Si no muestran un perro o contienen
        contenido inapropiado, la publicación se rechaza y las fotos se eliminan. En algunos casos una
        persona del equipo puede revisar la publicación manualmente.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        La conexión al sitio está cifrada (HTTPS). Los datos se guardan en servicios con controles de
        acceso: solo vos podés modificar tus publicaciones y el número de WhatsApp solo es visible para
        usuarios registrados. Ningún sistema es completamente infalible, pero tomamos medidas razonables
        para proteger tu información.
      </p>

      <h2>9. Cuánto tiempo conservamos tus datos</h2>
      <p>
        Conservamos tus datos mientras tengas una cuenta o publicaciones activas. Podés marcar una
        publicación como resuelta o borrarla en cualquier momento desde el sitio, y al hacerlo se eliminan
        también sus fotos. Si querés que borremos tu cuenta y todos tus datos, escribinos a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a> y lo hacemos dentro de los 30 días.
      </p>

      <h2>10. Cookies y almacenamiento del navegador</h2>
      <p>
        Usamos únicamente el almacenamiento del navegador necesario para mantener tu sesión iniciada. No
        usamos cookies de publicidad ni de seguimiento de terceros.
      </p>

      <h2>11. Tus derechos</h2>
      <p>
        Podés pedirnos acceso, corrección o eliminación de tus datos en cualquier momento escribiendo a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>. También podés revocar el acceso que le diste al
        sitio desde la configuración de tu cuenta de Google, en{' '}
        <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>. En
        Argentina rige la Ley 25.326 de Protección de los Datos Personales, y la Agencia de Acceso a la
        Información Pública es el organismo que recibe las denuncias por incumplimientos.
      </p>

      <h2>12. Menores de edad</h2>
      <p>El sitio está dirigido a personas mayores de 18 años y no recopilamos datos de menores de forma intencional.</p>

      <h2>13. Cambios en esta política</h2>
      <p>
        Si modificamos esta política, publicaremos la versión nueva en esta misma página y actualizaremos
        la fecha de arriba.
      </p>
    </article>
  )
}