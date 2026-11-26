/**
 * Aire a la izquierda de cada letra en los títulos (Archivo ancho, 800, mayúsculas), en em.
 * Medido en el navegador: es la distancia entre el borde de la caja y donde empieza la tinta.
 * Sirve para que un título grande arranque exactamente donde arranca el texto chico de arriba,
 * sea cual sea su primera letra: la "P" tiene mucho aire y la "V" casi nada.
 */
const LEFT_BEARING: Record<string, number> = {
  A: 0.015, B: 0.085, C: 0.055, D: 0.085, E: 0.0825, F: 0.085, G: 0.055, H: 0.085, I: 0.085,
  J: 0.0275, K: 0.085, L: 0.085, M: 0.085, N: 0.085, Ñ: 0.085, O: 0.055, P: 0.085, Q: 0.055,
  R: 0.085, S: 0.05, T: 0.0225, U: 0.08, V: 0.0125, W: 0.0075, X: 0.0225, Y: 0.0175, Z: 0.0325,
  Á: 0.015, É: 0.0825, Í: 0.0775, Ó: 0.055, Ú: 0.08,
  0: 0.045, 1: 0.07, 2: 0.05, 3: 0.0425, 4: 0.0225, 5: 0.0425, 6: 0.045, 7: 0.02, 8: 0.0425, 9: 0.04,
};

/** El aire de la primera letra del texto, en em (si no está en la tabla, uno intermedio). */
export function leftBearing(text: string): number {
  const first = text.trim().charAt(0).toLocaleUpperCase('es');
  return LEFT_BEARING[first] ?? 0.06;
}

/**
 * Ancho de cada letra en los mismos títulos, en em, con el espaciado de -0.05em incluido.
 * Medido en el navegador (20 letras iguales seguidas, dividido por 20). La suma da un poco más que
 * la palabra real (entre 0 y 8 %, porque algunos pares de letras se juntan), nunca menos.
 */
const GLYPH_WIDTH: Record<string, number> = {
  A: 0.925, B: 0.906, C: 0.934, D: 0.925, E: 0.855, F: 0.791, G: 1.004, H: 0.981, I: 0.365,
  J: 0.726, K: 0.943, L: 0.746, M: 1.14, N: 0.98, Ñ: 0.98, O: 1.005, P: 0.853, Q: 1.005,
  R: 0.924, S: 0.859, T: 0.84, U: 0.96, V: 0.896, W: 1.205, X: 0.932, Y: 0.91, Z: 0.849,
  Á: 0.925, É: 0.855, Í: 0.365, Ó: 1.005, Ú: 0.96, Ü: 0.96,
  0: 0.778, 1: 0.695, 2: 0.775, 3: 0.781, 4: 0.773, 5: 0.781, 6: 0.783, 7: 0.708, 8: 0.795, 9: 0.783,
  '&': 0.993, "'": 0.27, '.': 0.341, ',': 0.341, '-': 0.408, ':': 0.336, '!': 0.35, '¡': 0.35,
  '?': 0.707, '¿': 0.707, '(': 0.363, ')': 0.363, '"': 0.514, '/': 0.3, '+': 0.728,
};

/**
 * Ancho de la palabra más larga del título, en em: en el celular el título se achica lo justo para que
 * esa palabra entre en el ancho de la pantalla (ver `.title.fit` en global.css). Una letra que no está
 * en la tabla cuenta como una de las más anchas, para no quedarse corto.
 */
export function titleFit(text: string): number {
  const words = text.toLocaleUpperCase('es').split(/\s+/);
  const widths = words.map((word) => [...word].reduce((sum, c) => sum + (GLYPH_WIDTH[c] ?? 1.2), 0));
  return Math.ceil(Math.max(1, ...widths) * 1000) / 1000;
}
