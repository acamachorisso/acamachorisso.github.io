import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';
import { MAX_HERO_VIDEO_MB, MAX_VIDEO_MB } from './config';

// Los mensajes de error están en español porque los lee Agustín cuando una publicación falla.
// Astro ya dice el archivo y el campo; el mensaje explica qué arreglar.
// Si un dato está mal, la publicación se frena y queda online la versión anterior.

/** Pages CMS a veces guarda un campo vacío como '' o null: lo tratamos como "no está". */
const empty = (v: unknown) => (v === '' || v === null ? undefined : v);

const text = (what: string) =>
  z.string({ error: `Falta ${what}.` }).trim().min(1, { error: `Falta ${what}: el campo está vacío.` });

const optionalText = z.preprocess(empty, z.string().trim().optional());

/** Pages CMS puede guardar números y casillas como texto o vacíos: se aceptan las dos formas. */
const toNumber = (v: unknown) =>
  typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v)) ? Number(v) : empty(v);
const toBoolean = (v: unknown) => (v === 'true' ? true : v === 'false' ? false : empty(v));
const flag = z.preprocess(toBoolean, z.boolean().default(false));
const order = z.preprocess(toNumber, z.number({ error: 'El orden tiene que ser un número (1 va primero).' }).default(99));

/** Una lista que puede venir vacía, como null, sin escribir o con un solo elemento suelto. */
const list = <T extends z.ZodType>(item: T) =>
  z.preprocess((v) => (v == null || v === '' ? [] : Array.isArray(v) ? v : [v]), z.array(item));

/**
 * Pages CMS guarda una referencia como ruta ("src/content/photo-categories/viajes.yaml").
 * Astro usa solo el nombre del archivo ("viajes").
 */
const fileId = (v: unknown) => (typeof v === 'string' ? v.trim().replace(/^.*\//, '').replace(/\.ya?ml$/, '') : empty(v));

/** "/src/assets/x.jpg", "src/assets/x.jpg" → "/src/assets/x.jpg". */
const normalizePath = (v: string) => '/' + v.trim().replace(/\\/g, '/').replace(/^\/+/, '');

/** Una imagen subida a src/assets/ desde Pages CMS. */
const imageBase = z
  .string()
  .transform(normalizePath)
  .refine((v) => !/\.(heic|heif)$/i.test(v), { error: 'Las fotos .HEIC del iPhone no se pueden usar en la web. Exportala como JPG y subila de nuevo.', abort: true })
  .refine((v) => v.startsWith('/src/assets/') && /\.(jpe?g|png|webp)$/i.test(v), { error: 'La imagen tiene que estar en src/assets/ y ser .jpg, .png o .webp.', abort: true })
  .refine((v) => existsSync(join(process.cwd(), v)), { error: 'No encuentro esa imagen. Revisá que no la hayas borrado o subila de nuevo.', abort: true });

const image = (what: string) => z.preprocess(empty, z.string({ error: `Falta ${what}.` }).pipe(imageBase));
const optionalImage = z.preprocess(empty, imageBase.optional());

/** Un MP4 subido a public/videos/. Se aceptan "/videos/x.mp4", "videos/x.mp4" y "public/videos/x.mp4". */
const videoFile = (maxMb: number, tooBig: string) =>
  z
    .string()
    .transform((v) => normalizePath(v).replace(/^\/public\//, '/'))
    .refine((v) => !/\.mov$/i.test(v), { error: 'Los videos .MOV del celular no se ven en todos los navegadores. Exportalo como MP4 y subilo de nuevo.', abort: true })
    .refine((v) => v.startsWith('/videos/') && /\.mp4$/i.test(v), { error: 'El video tiene que estar en la carpeta de videos y ser .mp4.', abort: true })
    .refine((v) => existsSync(join(process.cwd(), 'public', v)), { error: 'No encuentro ese video. Revisá que no lo hayas borrado o subilo de nuevo.', abort: true })
    .refine(
      (v) => {
        const file = join(process.cwd(), 'public', v);
        return !existsSync(file) || statSync(file).size <= maxMb * 1024 * 1024;
      },
      { error: tooBig, abort: true },
    );

/** Un link de YouTube en cualquier forma (watch, youtu.be, shorts, embed) o el ID solo → el ID. */
export function youtubeId(value: string): string {
  const s = value.trim();
  const m = s.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : s;
}

const youtube = z.preprocess(
  (v) => (typeof v === 'string' ? (v.trim() === '' ? undefined : youtubeId(v)) : empty(v)),
  z
    .string()
    .regex(/^[\w-]{11}$/, { error: 'No reconozco ese link de YouTube. Copiá el link del video desde YouTube (Compartir → Copiar).' })
    .optional(),
);

const link = z
  .string({ error: 'Falta el link.' })
  .trim()
  .regex(/^(https?:\/\/|mailto:)/, { error: 'El link tiene que empezar con https:// o mailto:.' });

// ---------- Fotos ----------

const photoCategories = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/photo-categories' }),
  schema: z.object({
    title: text('el nombre de la categoría'),
    order,
    hidden: flag,
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/albums' }),
  schema: z.object({
    title: text('el nombre del álbum'),
    category: z.preprocess(fileId, reference('photoCategories')),
    kind: optionalText,
    description: optionalText,
    cover: image('la portada'),
    photos: list(image('una foto')).refine((v) => v.length > 0, { error: 'El álbum no tiene fotos. Subí al menos una.' }),
    order,
    hidden: flag,
  }),
});

// ---------- Videos ----------

const videoSections = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/video-sections' }),
  schema: z.object({
    title: text('el nombre de la sección'),
    format: z.preprocess(
      (v) => empty(v) ?? 'horizontal',
      z.enum(['horizontal', 'vertical'], { error: 'El formato tiene que ser Horizontal o Vertical.' }),
    ),
    order,
    hidden: flag,
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/videos' }),
  schema: z
    .object({
      title: text('el título del video'),
      section: z.preprocess(fileId, reference('videoSections')),
      type: optionalText,
      youtube,
      file: z.preprocess(
        empty,
        videoFile(
          MAX_VIDEO_MB,
          `El video pesa más de ${MAX_VIDEO_MB} MB y GitHub no lo acepta. Comprimilo o subilo a YouTube y pegá el link.`,
        ).optional(),
      ),
      poster: optionalImage,
      soon: flag,
      order,
      hidden: flag,
    })
    .refine((v) => !(v.youtube && v.file), {
      error: 'Cada video lleva un link de YouTube o un archivo MP4, no los dos. Borrá uno.',
    })
    .refine((v) => v.soon || v.youtube || v.file, {
      error: 'Falta el video: pegá el link de YouTube o subí el MP4. Si todavía no está, marcá "Próximamente".',
    })
    .refine((v) => !v.file || v.poster, {
      error: 'Los videos MP4 necesitan una imagen de portada (un cuadro del video, en JPG).',
    })
    .refine((v) => !v.soon || v.poster, {
      error: 'Los videos "Próximamente" necesitan una imagen de portada.',
    }),
});

// ---------- Datos generales ----------

// site.yaml es un solo objeto, no una lista: lo carga un loader propio.
const SITE_FILE = 'src/data/site.yaml';

const site = defineCollection({
  loader: {
    name: 'site-yaml',
    load: async ({ store, parseData, watcher }) => {
      const sync = async () => {
        const data = await parseData({
          id: 'site',
          data: parseYaml(readFileSync(join(process.cwd(), SITE_FILE), 'utf8')),
          filePath: SITE_FILE,
        });
        store.clear();
        store.set({ id: 'site', data });
      };
      await sync();
      watcher?.add(join(process.cwd(), SITE_FILE));
      watcher?.on('change', async (changed) => {
        if (changed.replace(/\\/g, '/').endsWith(SITE_FILE)) await sync();
      });
    },
  },
  schema: z.object({
    name: text('el nombre'),
    tagline: text('la frase de debajo del nombre (por ejemplo Fotógrafo — Filmmaker)'),
    location: optionalText,
    description: optionalText,
    logo: image('el logo'),
    hero_video: z.preprocess(
      empty,
      z
        .string({ error: 'Falta el video del inicio.' })
        .pipe(
          videoFile(
            MAX_HERO_VIDEO_MB,
            `El video del inicio pesa más de ${MAX_HERO_VIDEO_MB} MB y tardaría mucho en arrancar. Exportalo en 1080p, sin audio y de menos de 15 MB.`,
          ),
        ),
    ),
    hero_poster: image('la imagen del video del inicio (se ve mientras carga)'),
    showreel: z.preprocess(fileId, reference('videos').optional()),
    bio_short: text('el texto corto de Sobre mí del inicio'),
    about_background: image('la foto de fondo de Sobre mí en el inicio'),
    videos_cover: image('la foto del acceso a Videos del inicio'),
    photos_cover: image('la foto del acceso a Fotos del inicio'),
    portrait: image('el retrato de Sobre mí'),
    bio_lead: text('la primera frase de Sobre mí'),
    bio: text('la bio'),
    facts: list(z.object({ label: text('la etiqueta del dato'), text: text('el texto del dato') })),
    contact_intro: optionalText,
    contact_image: optionalImage,
    email: z.string({ error: 'Falta el email.' }).trim().pipe(z.email({ error: 'El email no es válido.' })),
    links: list(z.object({ label: text('el nombre de la red'), url: link })),
    share_image: optionalImage,
  }),
});

export const collections = { photoCategories, albums, videoSections, videos, site };
