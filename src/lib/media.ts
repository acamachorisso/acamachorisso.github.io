import { closeSync, existsSync, openSync, readSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { ImageMetadata } from 'astro';

// Todas las imágenes de src/assets/. El contenido las nombra por su ruta ("/src/assets/fotos/espana/esp-01.jpg"),
// que es como las guarda Pages CMS.
const images = import.meta.glob<ImageMetadata>('/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

/** La imagen que corresponde a una ruta del contenido. Los esquemas ya revisaron que exista. */
export function img(path: string): ImageMetadata {
  const found = images[path];
  if (!found) throw new Error(`No encuentro la imagen ${path} en src/assets/.`);
  return found;
}

export function maybeImg(path: string | undefined): ImageMetadata | undefined {
  return path ? img(path) : undefined;
}

/** Todas las rutas de imágenes que hay en una carpeta de src/assets/ (por ejemplo "/src/assets/fotos/"). */
export function imagesIn(folder: string): string[] {
  return Object.keys(images).filter((k) => k.startsWith(folder));
}

/** Un archivo de public/ a partir de su dirección en la web ("/videos/x.mp4"). */
export const publicFile = (path: string) => join(process.cwd(), 'public', path);

export const fileMb = (path: string) => (existsSync(publicFile(path)) ? statSync(publicFile(path)).size / 1024 / 1024 : 0);

/**
 * Duración de un MP4 en segundos, leída de su encabezado (la caja "mvhd").
 * Se lee solo lo necesario: el encabezado puede estar al principio o al final del archivo.
 */
export function mp4Duration(path: string): number | undefined {
  const file = publicFile(path);
  if (!existsSync(file)) return undefined;
  const fd = openSync(file, 'r');
  try {
    const size = statSync(file).size;
    const read = (pos: number, len: number) => {
      const buf = Buffer.alloc(len);
      readSync(fd, buf, 0, len, pos);
      return buf;
    };
    const walk = (start: number, end: number): number | undefined => {
      let pos = start;
      while (pos + 8 <= end) {
        const head = read(pos, 16);
        let boxSize = head.readUInt32BE(0);
        const type = head.toString('latin1', 4, 8);
        let headerSize = 8;
        if (boxSize === 1) {
          boxSize = Number(head.readBigUInt64BE(8));
          headerSize = 16;
        } else if (boxSize === 0) {
          boxSize = end - pos;
        }
        if (boxSize < headerSize) return undefined;
        if (type === 'moov') return walk(pos + headerSize, pos + boxSize);
        if (type === 'mvhd') {
          const body = read(pos + headerSize, 32);
          const version = body[0];
          const timescale = version === 1 ? body.readUInt32BE(20) : body.readUInt32BE(12);
          const length = version === 1 ? Number(body.readBigUInt64BE(24)) : body.readUInt32BE(16);
          return timescale ? length / timescale : undefined;
        }
        pos += boxSize;
      }
      return undefined;
    };
    return walk(0, size);
  } finally {
    closeSync(fd);
  }
}
