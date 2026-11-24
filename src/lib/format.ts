const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Agrega la base de la web a una dirección interna ("/videos/" → "/base/videos/"). */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE}${path}`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Markdown mínimo para los textos que escribe Agustín: *cursiva*, **negrita** y [links](https://…).
 * Todo lo demás se escapa, así que desde el contenido no se puede romper el HTML.
 */
export function inline(value: string): string {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label: string, href: string) => {
    const url = href.replace(/&amp;/g, '&');
    if (!/^(https?:\/\/|mailto:|\/)/.test(url) || url.startsWith('//')) return match;
    const target = url.startsWith('/') ? withBase(url) : url;
    return `<a href="${escapeHtml(target)}"${/^https?:/.test(url) ? ' rel="noopener"' : ''}>${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  return html;
}

/** Párrafos separados por una línea en blanco. */
export function paragraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
    .map(inline);
}

/** 1 → "1 foto", 25 → "25 fotos". */
export function count(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** 39.4 → "0:39", 71 → "1:11". */
export function duration(seconds: number): string {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** "https://www.instagram.com/acamachorisso" → "@acamachorisso". */
export function handle(url: string): string {
  try {
    const last = new URL(url).pathname.split('/').filter(Boolean).pop() ?? '';
    return last ? (last.startsWith('@') ? last : `@${last}`) : url.replace(/^mailto:/, '');
  } catch {
    return url;
  }
}
