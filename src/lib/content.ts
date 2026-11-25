import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { count, duration } from './format';
import { imagesIn, mp4Duration } from './media';
import { slugify } from './slug';

export type Album = CollectionEntry<'albums'>;
export type Category = CollectionEntry<'photoCategories'>;
export type Video = CollectionEntry<'videos'>;
export type VideoSection = CollectionEntry<'videoSections'>;

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('Falta el archivo src/data/site.yaml.');
  return entry.data;
}

type Ordered = { data: { order: number; title: string } };
const byOrder = (a: Ordered, b: Ordered) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'es');

/** La dirección de una categoría o un álbum dentro de /fotos/, sacada del nombre del archivo. */
export const slugOf = (entry: { id: string }) => slugify(entry.id);

// ---------- Listas ordenadas ----------
// Cada categoría tiene la lista de sus álbumes y cada sección la de sus videos, en el orden en que se ven
// (en el editor se ordenan arrastrando). Un álbum o video va en una sola lista; si no está en ninguna, no aparece.

type Entry = { id: string; filePath?: string; data: { title: string } };

/** Busca por nombre de archivo ("campo", lo que guarda el editor) o por id de Astro. */
function indexByFile<T extends Entry>(entries: T[]): Map<string, T> {
  const map = new Map<string, T>();
  for (const e of entries) {
    map.set(e.id, e);
    const stem = e.filePath?.replace(/^.*[\\/]/, '').replace(/\.ya?ml$/, '');
    if (stem) map.set(stem, e);
  }
  return map;
}

/** Los elementos de una lista, en orden, sin repetidos ni los que ya no existen. */
function resolveList<T extends Entry>(ids: string[], index: Map<string, T>): T[] {
  const out: T[] = [];
  for (const id of ids) {
    const entry = index.get(id);
    if (entry && !out.includes(entry)) out.push(entry);
  }
  return out;
}

/** Frena la publicación si un álbum (o video) está en la lista de dos categorías (o secciones). */
function ownersOf<P extends Entry, T extends Entry>(
  parents: P[],
  listOf: (p: P) => string[],
  index: Map<string, T>,
  error: (item: T, a: P, b: P) => string,
): Map<T, P> {
  const owner = new Map<T, P>();
  for (const parent of parents) {
    for (const item of resolveList(listOf(parent), index)) {
      const other = owner.get(item);
      if (other) throw new Error(error(item, other, parent));
      owner.set(item, parent);
    }
  }
  return owner;
}

async function photoIndex() {
  const [categories, albums] = await Promise.all([getCollection('photoCategories'), getCollection('albums')]);
  const index = indexByFile(albums);
  const owner = ownersOf(
    categories,
    (c) => c.data.albums,
    index,
    (album, a, b) =>
      `El álbum "${album.data.title}" está en dos categorías: ${a.data.title} y ${b.data.title}. ` +
      `Un álbum va en una sola: sacalo de una de las dos en "Categorías de fotos".`,
  );
  return { categories, albums, index, owner };
}

async function videoIndex() {
  const [sections, videos] = await Promise.all([getCollection('videoSections'), getCollection('videos')]);
  const index = indexByFile(videos);
  const owner = ownersOf(
    sections,
    (s) => s.data.videos,
    index,
    (video, a, b) =>
      `El video "${video.data.title}" está en dos secciones: ${a.data.title} y ${b.data.title}. ` +
      `Un video va en una sola: sacalo de una de las dos en "Secciones de videos".`,
  );
  return { sections, videos, index, owner };
}

export type CategoryGroup = {
  category: Category;
  slug: string;
  albums: Array<{ album: Album; slug: string }>;
  photoCount: number;
};

/** Categorías de Fotos en su orden, solo las visibles que tienen álbumes visibles. */
export async function getPhotoGroups(): Promise<CategoryGroup[]> {
  const { categories, index } = await photoIndex();
  const groups = categories
    .filter((c) => !c.data.hidden)
    .sort(byOrder)
    .map((category) => {
      const items = resolveList(category.data.albums, index)
        .filter((a) => !a.data.hidden)
        .map((album) => ({ album, slug: slugOf(album) }));
      return {
        category,
        slug: slugOf(category),
        albums: items,
        photoCount: items.reduce((n, { album }) => n + album.data.photos.length, 0),
      };
    })
    .filter((g) => g.albums.length > 0);

  // Las categorías y los álbumes comparten /fotos/<nombre>/: dos con el mismo nombre se pisarían.
  const seen = new Map<string, string>();
  const claim = (slug: string, what: string) => {
    const other = seen.get(slug);
    if (other) {
      const first = other.charAt(0).toUpperCase() + other.slice(1);
      throw new Error(
        `${first} y ${what} tendrían la misma dirección (/fotos/${slug}/). Cambiale el nombre a uno de los dos.`,
      );
    }
    seen.set(slug, what);
  };
  for (const g of groups) {
    claim(g.slug, `la categoría "${g.category.data.title}"`);
    for (const { album, slug } of g.albums) claim(slug, `el álbum "${album.data.title}"`);
  }
  return groups;
}

/**
 * Avisos para el log de la publicación (no la frenan): álbumes que no están en ninguna categoría
 * y álbumes de una lista que ya no existen.
 */
export async function getAlbumWarnings(): Promise<string[]> {
  const { categories, albums, index, owner } = await photoIndex();
  const notes: string[] = [];
  for (const album of albums) {
    if (!album.data.hidden && !owner.has(album)) {
      notes.push(`El álbum "${album.data.title}" no está en ninguna categoría: no se ve en la web.`);
    }
  }
  for (const c of categories) {
    for (const id of c.data.albums) {
      if (!index.has(id)) notes.push(`La categoría ${c.data.title} tiene en su lista un álbum que ya no existe (${id}): se ignora.`);
    }
  }
  return notes;
}

/**
 * Fotos que están en src/assets/fotos/ pero ningún álbum usa (ni como foto ni como portada).
 * No frenan la publicación, pero ocupan lugar en el repo.
 */
export async function getUnusedPhotos(): Promise<string[]> {
  const albums = await getCollection('albums');
  const used = new Set(albums.flatMap((a) => [a.data.cover, ...a.data.photos]));
  return imagesIn('/src/assets/fotos/').filter((path) => !used.has(path));
}

export type VideoItem = {
  video: Video;
  /** Duración de los MP4, por ejemplo "0:39". */
  duration?: string;
};

export type VideoGroup = { section: VideoSection; anchor: string; items: VideoItem[] };

/** Secciones de Videos en su orden, solo las que tienen videos. Los "Próximamente" van al final. */
export async function getVideoGroups(): Promise<VideoGroup[]> {
  const { sections, index } = await videoIndex();
  return sections
    .filter((s) => !s.data.hidden)
    .sort(byOrder)
    .map((section) => ({
      section,
      anchor: slugOf(section),
      items: resolveList(section.data.videos, index)
        .filter((v) => !v.data.hidden)
        // En el orden de la lista, pero los "Próximamente" al final (sort es estable).
        .sort((a, b) => Number(a.data.soon) - Number(b.data.soon))
        .map((video) => {
          const seconds = video.data.file ? mp4Duration(video.data.file) : undefined;
          return { video, duration: seconds ? duration(seconds) : undefined };
        }),
    }))
    .filter((g) => g.items.length > 0);
}

/** Como getAlbumWarnings, para los videos. El del showreel puede no estar en ninguna sección. */
export async function getVideoWarnings(): Promise<string[]> {
  const [{ sections, videos, index, owner }, site] = await Promise.all([videoIndex(), getSite()]);
  const notes: string[] = [];
  for (const video of videos) {
    if (!video.data.hidden && !owner.has(video) && video.id !== site.showreel?.id) {
      notes.push(`El video "${video.data.title}" no está en ninguna sección: no se ve en la web.`);
    }
  }
  for (const s of sections) {
    for (const id of s.data.videos) {
      if (!index.has(id)) notes.push(`La sección ${s.data.title} tiene en su lista un video que ya no existe (${id}): se ignora.`);
    }
  }
  return notes;
}

/** "9 proyectos · 7 videos cortos", para el acceso a Videos del inicio. */
export function videoSummary(groups: VideoGroup[]): string {
  return groups
    .map((g) => `${g.items.length} ${g.section.data.title.toLowerCase()}`)
    .join(' · ');
}

/** El showreel para el botón del inicio: solo si ya tiene link o archivo. */
export async function getShowreel(): Promise<Video | undefined> {
  const site = await getSite();
  if (!site.showreel) return undefined;
  const video = await getEntry(site.showreel);
  if (!video || video.data.hidden || video.data.soon) return undefined;
  return video;
}

export type NavItem = { key: string; label: string; href: string; children?: Array<{ key: string; label: string; href: string }> };

/** El menú: Inicio, Sobre mí y Contacto siempre; Videos y Fotos solo si tienen contenido. */
export async function getNav(): Promise<NavItem[]> {
  const [photos, videos] = await Promise.all([getPhotoGroups(), getVideoGroups()]);
  const nav: NavItem[] = [{ key: 'inicio', label: 'Inicio', href: '/' }];
  if (videos.length) nav.push({ key: 'videos', label: 'Videos', href: '/videos/' });
  if (photos.length) {
    nav.push({
      key: 'fotos',
      label: 'Fotos',
      href: `/fotos/${photos[0].slug}/`,
      children: photos.map((g) => ({ key: g.slug, label: g.category.data.title, href: `/fotos/${g.slug}/` })),
    });
  }
  nav.push({ key: 'sobre-mi', label: 'Sobre mí', href: '/sobre-mi/' });
  nav.push({ key: 'contacto', label: 'Contacto', href: '/contacto/' });
  return nav;
}

export const photosLabel = (n: number) => count(n, 'foto', 'fotos');
export const albumsLabel = (n: number) => count(n, 'álbum', 'álbumes');
