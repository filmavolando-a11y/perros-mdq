// ANTES DE PUBLICAR: reemplazá estos dos valores
const RESPONSABLE = 'TU NOMBRE COMPLETO'
const CONTACTO = 'tu-mail@ejemplo.com'

export const metadata = { title: 'Términos y condiciones' }

export default function Terminos() {
  return (
    <article style={{ maxWidth: 680, lineHeight: 1.7 }}>
      <h1>Términos y condiciones</h1>
      <p>Última actualización: 29 de octubre de 2026.</p>
      <p>Al usar este sitio aceptás estas condiciones. Si no estás de acuerdo, no lo uses.</p>

      <h2>Qué es este sitio</h2>
      <p>Es un espacio gratuito donde las personas publican perros perdidos o encontrados en Mar del Plata y se contactan entre sí. {RESPONSABLE} es solo el intermediario: no participa de los encuentros ni garantiza que un perro aparezca o que una publicación sea verdadera.</p>

      <h2>Tu cuenta</h2>
      <p>Para publicar o ver contactos tenés que ingresar con Google o con tu mail. Sos responsable de lo que se haga desde tu cuenta.</p>

      <h2>Reglas para publicar</h2>
      <p>Al publicar te comprometés a:</p>
      <ul>
        <li>Cargar información verdadera y fotos del perro en cuestión.</li>
        <li>No publicar fotos de personas, ni datos de terceros sin su permiso.</li>
        <li>No pedir ni ofrecer dinero a cambio de devolver un perro, ni intentar estafar a nadie.</li>
        <li>No publicar contenido ilegal, ofensivo, comercial o que no tenga que ver con perros perdidos o encontrados.</li>
        <li>Usar el contacto de WhatsApp solo para el fin de la publicación, y no para spam ni acoso.</li>
      </ul>

      <h2>Consejos de seguridad</h2>
      <p>Antes de entregar un perro, pedí a quien lo reclama que describa señas que no estén en la publicación. Si se encuentran en persona, elijan un lugar público y a plena luz del día. Desconfiá de quien te pida dinero por adelantado.</p>

      <h2>Contenido que subís</h2>
      <p>Seguís siendo dueño de tus fotos y textos. Nos das permiso para mostrarlos en el sitio mientras la publicación esté activa. Podemos editar o eliminar publicaciones que incumplan estas reglas, y bloquear cuentas que abusen del sitio.</p>

      <h2>Limitación de responsabilidad</h2>
      <p>El sitio se ofrece tal como está, sin garantías de disponibilidad ni de resultados. No nos hacemos responsables por las acciones de las personas usuarias, por datos falsos publicados, ni por lo que ocurra en un encuentro entre ellas.</p>

      <h2>Reportes y contacto</h2>
      <p>
        Si ves una publicación falsa o abusiva, o querés borrar tu cuenta, escribinos a{' '}
        <a href={`mailto:${CONTACTO}`}>{CONTACTO}</a>.
      </p>

      <h2>Cambios y ley aplicable</h2>
      <p>Podemos modificar estos términos; la versión vigente es la publicada acá. Se rigen por las leyes de la República Argentina y, ante cualquier conflicto, serán competentes los tribunales ordinarios del Departamento Judicial de Mar del Plata.</p>
    </article>
  )
}