# acamachorisso.github.io

Portfolio de **Agustín Camacho**, fotógrafo y filmmaker: https://acamachorisso.github.io

- Para editar el contenido (álbumes, videos, textos): [docs/GUIA.md](docs/GUIA.md).
- Decisiones, modelo de contenido, etapas y pruebas: [docs/PLAN.md](docs/PLAN.md).

## Desarrollo

Requiere Node 24.

```sh
npm install
npm run dev      # http://localhost:4321
npm test         # tipos, esquemas del contenido, build y links internos
```

`npm test` es lo mismo que corre GitHub Actions en cada push. `develop` se valida y no se publica; `main` se publica en GitHub Pages.

## Dónde está cada cosa

| Carpeta o archivo | Qué es |
| --- | --- |
| `src/content/albums/`, `photo-categories/` | Álbumes y categorías de Fotos (un YAML cada uno) |
| `src/content/videos/`, `video-sections/` | Videos (YouTube o MP4) y secciones de Videos |
| `src/data/site.yaml` | Textos, fotos fijas, video del inicio, email y redes |
| `src/assets/fotos/<álbum>/` | Fotos de los álbumes; se optimizan al compilar (WebP, varios tamaños) |
| `src/assets/site/`, `src/assets/videos/` | Imágenes de la web y portadas de videos |
| `public/videos/` | Video del inicio y videos MP4 |
| `src/content.config.ts` | Esquemas del contenido, con los mensajes de error en español |
| `src/config.ts` | Clave de Web3Forms y límites de peso de los videos |
| `.pages.yml` | Configuración del editor (Pages CMS) |
