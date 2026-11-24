// Ajustes que no se editan desde Pages CMS.

/**
 * Clave de Web3Forms para el formulario de Contacto. Los mensajes llegan a acamacho.contacto@gmail.com.
 * Va en el código a propósito: Web3Forms la necesita en el HTML publicado, así que igual es visible
 * y guardarla como secret no agrega seguridad. Solo sirve para mandarle mensajes a Agustín.
 * Si llega spam con ella, se genera una nueva en https://web3forms.com y se cambia acá.
 */
export const WEB3FORMS_KEY = '3aab40b8-34f5-44c8-8b19-7c91f4264fe7';

/** Peso máximo de los videos que se suben al repo (GitHub no acepta archivos de más de 100 MB). */
export const MAX_VIDEO_MB = 95;

/** Peso máximo del video de fondo del inicio: más pesado tarda en arrancar, sobre todo en el celular. */
export const MAX_HERO_VIDEO_MB = 20;
