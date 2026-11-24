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

export type CategoryGroup = {
  category: Category;
  slug: string;
  albums: Array<{ album: Album; slug: string }>;
  photoCount: number;
};

/** Categorías de Fotos en su orden, solo las visibles que tienen álbumes visibles. */
export async function getPhotoGroups(): Promise<CategoryGroup[]> {
  const [categories, albums] = await Promise.all([
    getCollection('photoCategories', (c) => !c.data.hidden),
    getCollection('albums', (a) => !a.data.hidden),
  ]);
  const groups = categories
    .sort(byOrder)
    .map((category) => {
      const items = albums
        .filter((a) => a.data.category.id === category.id)
        .sort(byOrder)
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
  const [sections, videos] = await Promise.all([
    getCollection('videoSections', (s) => !s.data.hidden),
    getCollection('videos', (v) => !v.data.hidden),
  ]);
  return sections
    .sort(byOrder)
    .map((section) => ({
      section,
      anchor: slugOf(section),
      items: videos
        .filter((v) => v.data.section.id === section.id)
        .sort((a, b) => Number(a.data.soon) - Number(b.data.soon) || byOrder(a, b))
        .map((video) => {
          const seconds = video.data.file ? mp4Duration(video.data.file) : undefined;
          return { video, duration: seconds ? duration(seconds) : undefined };
        }),
    }))
    .filter((g) => g.items.length > 0);
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
