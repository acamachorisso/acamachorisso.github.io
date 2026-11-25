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
