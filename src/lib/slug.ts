/** Convierte un nombre en una dirección: "Campo de la Tahona" → "campo-de-la-tahona", "España" → "espana". */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
