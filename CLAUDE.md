# CLAUDE.md

Portfolio de **Agustín Camacho** (fotógrafo y filmmaker), en español, para `acamachorisso.github.io`. Lo construye Juani y después lo edita Agustín solo, sin tocar código, desde Pages CMS.

El plan completo (decisiones, modelo de contenido, etapas, pruebas y riesgos) está en [docs/PLAN.md](docs/PLAN.md). La guía para Agustín, en [docs/GUIA.md](docs/GUIA.md). Leelos antes de proponer cambios.

## Estado actual

- Diseño: **A · Reel**, la página "Agustín Camacho" del canvas https://claude.ai/artifact/8gkBu9WP3M4iE2VqfYe1WR, con los cambios del 24/11 anotados en el plan (inicio).
- Repo: `origin` es `acamachorisso/acamachorisso.github.io` (Juani es colaborador).
- Online en https://acamachorisso.github.io desde el 24/11 (etapas 1 a 6). Falta lo que necesita la cuenta de Agustín o un navegador real (ver "Pendientes" en el plan).

## Stack

- Astro 7.4, salida estática, TypeScript estricto, Node 24 LTS.
- Contenido en YAML bajo `src/content/` y `src/data/site.yaml`, validado con zod en `src/content.config.ts`.
- Fotos en `src/assets/`, optimizadas por Astro (sharp). Videos MP4 en `public/videos/`.
- Editor: Pages CMS (`.pages.yml`), con etiquetas en español.
- Deploy: GitHub Actions a GitHub Pages. `site` y `base` se configuran en `astro.config.mjs` (y `BASE` en `scripts/check-links.mjs`).
- CSS propio en `src/styles/global.css`, sin Tailwind ni React. JS solo en: menú que se esconde al bajar (`src/components/Nav.astro`), visor de fotos y videos (`src/components/Viewer.astro`, con `<dialog>`), flechas del carrusel, formulario y arranque del video del inicio (arranca también con "reducir movimiento", a pedido de Agustín). Sin JS, todo se ve y los links llevan a la foto, al MP4 o a YouTube.

## Reglas que no se discuten

- Sin pull requests ni `develop`: desde el 24/11 se trabaja directo en `main`, que es lo que está online. Cada push publica, así que `npm test` (tipos, esquemas, build y links) tiene que pasar antes.
- Agustín también edita `main` desde Pages CMS. Antes de trabajar, traé lo último: `git pull --rebase`.
- Antes de cada push, Juani revisa con `npm run dev`. No hagas push ni toques la cuenta de GitHub de Agustín sin que te lo pidan.
- Categorías de Fotos y secciones de Videos son contenido, no código: el menú, el inicio y los contadores se arman solos. Una categoría o sección sin contenido no aparece.
- Cada categoría lista sus álbumes y cada sección sus videos, en orden (en el editor se arrastran). Un álbum o video va en una sola lista; si no está en ninguna, no se ve.
- Categorías y álbumes comparten `/fotos/<nombre>/`: si coinciden, el build frena con un error que dice cuál cambiar.
- Cada video lleva un link de YouTube **o** un MP4. Los MP4 y los "Próximamente" necesitan portada. El video del inicio, hasta 20 MB; los demás, hasta 95 MB (GitHub bloquea más de 100 MB).
- Los errores de contenido dicen qué archivo y qué campo arreglar, en palabras que entienda Agustín.
- La clave de Web3Forms va en `src/config.ts` a propósito: igual es pública en el HTML.
- Accesibilidad y rendimiento: HTML semántico, teclado, contraste de 4.5 a 1, Lighthouse 90 o más.
- El precio del trabajo no aparece en ningún archivo ni documento que vea Agustín.

## Contenido que edita Agustín

| Carpeta o archivo | Qué es |
| --- | --- |
| `src/content/albums/` | Un YAML por álbum. `photos` es la lista ordenada |
| `src/content/photo-categories/` | Categorías de Fotos (Viajes, Trabajos, Personales y las que cree). `albums` es la lista ordenada de sus álbumes |
| `src/content/videos/` | Un YAML por video |
| `src/content/video-sections/` | Secciones de Videos, con formato horizontal o vertical. `videos` es la lista ordenada de sus videos |
| `src/data/site.yaml` | Textos, fotos fijas, video del inicio, showreel, email y redes |
| `src/assets/`, `public/videos/` | Fotos, imágenes y videos |

Si el pedido es de contenido (agregar un álbum, cambiar la bio), editá solo esos archivos y no toques el código.
