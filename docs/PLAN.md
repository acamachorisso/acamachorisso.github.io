# Plan: web de Agustín Camacho

Última actualización: 24/11/2026. Resume todo lo decidido antes de escribir código.

## Links

| Qué | Link |
| --- | --- |
| Diseño elegido y prototipos (canvas) | https://claude.ai/artifact/8gkBu9WP3M4iE2VqfYe1WR (página "Agustín Camacho") |
| Guía de GitHub para Agustín | https://claude.ai/artifact/GWVfnw33EEy91GwP8fVPXv |
| Web anterior en Wix (de donde sale el contenido) | https://acamachorisso.wixstudio.com/my-site?rc=test-site |

## Contexto

- Agustín Camacho es fotógrafo y filmmaker uruguayo. La web es su portfolio, en español.
- Referencia visual: reilinjoey.com. Eligió el prototipo **A · Reel**: negro, Archivo ancho en mayúsculas, showreel a pantalla completa.
- La estructura sale de su Wix: Videos (proyectos y videos cortos), Fotos con tres categorías y álbumes, Sobre mí y Contacto. Las categorías y secciones se pueden ampliar desde el editor.
- Juani construye y entrega. Después Agustín la mantiene solo, sin tocar código.
- El precio del trabajo no aparece en ningún archivo ni documento que vea Agustín.

## Estado

1. Diseño elegido: la página "Agustín Camacho" del canvas, con su contenido real (24/11).
2. Agustín creó la cuenta `acamachorisso` y el repo vacío `acamachorisso.github.io`, activó Pages con GitHub Actions y sumó a Juani como colaborador (24/11).
3. Clave de Web3Forms creada con acamacho.contacto@gmail.com. Está en `src/config.ts` (ver Formulario); el `.env` ya no se usa.
4. Repo clonado en `C:\Users\Usuario\Documents\juani\agustin`.
5. Revisado el material del canvas (24/11): las 196 fotos, los 7 videos cortos, el clip del inicio, los posters, el logo (PNG de 2000 × 2000) y los 7 links de YouTube están completos. En el canvas algunas imágenes no se ven porque usan carga diferida (`loading="lazy"`), pero los archivos están bien.
6. **Etapas 1 a 6 hechas y publicadas en `main` (24/11).** `npm test` pasa: tipos, esquemas, 21 páginas y 1592 links internos. Revisado con capturas a 1440 y 390 px contra el canvas. Probado con Edge: visor de fotos (clic, flechas, Escape y foco), YouTube y MP4 en el visor, y los errores de contenido (foto que falta, categoría que no existe, YouTube y MP4 juntos, .MOV, .HEIC, link de YouTube roto, categoría y álbum con el mismo nombre, foto sin usar). Lighthouse en celular: rendimiento de 92 a 100 (inicio 96), 100 en accesibilidad, buenas prácticas y SEO; en compu, 100.

## Pendientes

| Qué | Quién | Estado |
| --- | --- | --- |
| Showreel definitivo | Agustín, más adelante | Provisorio: el clip de 13 s del canvas (`reel.mp4`, el mismo que `Descargas/IMG_2912.MOV`). Cuando tenga el definitivo, sube el fragmento del fondo y pega el link de YouTube desde el editor |
| Video de Porsche | Agustín | Sigue en "Próximamente". Cuando salga, carga el link desde el editor |
| Fotos en mejor calidad | Agustín, más adelante | Se arranca con las del Wix (191 de 196 están a 1500 px). Las reemplaza él desde el editor; la guía explica cómo |
| Bio vigente y trabajos nuevos o a sacar | Agustín | Preguntado |
| ¿Web en inglés? | Agustín | Preguntado. Si dice que sí, cambia la estructura y se habla antes de publicar |
| Probar Pages CMS | Juani, con la web online | Subir varias fotos juntas, reordenarlas arrastrando, borrar una, el selector de categoría y sección, y subir un MP4. Si la subida múltiple falla, ver Riesgos |
| Mensaje de prueba del formulario | Juani, con la web online | Con y sin JavaScript, y uno con el honeypot completo (no tiene que llegar). Llega a acamacho.contacto@gmail.com |
| Celulares reales y vista previa del link | Juani, con la web online | iPhone y Android: video del inicio, videos con sonido, visor con el dedo. Pegar el link en WhatsApp |
| Capturas para la guía | Juani, después de probar Pages CMS | `docs/GUIA.md` está escrita sin capturas |

## Decisiones tomadas

| Tema | Decisión |
| --- | --- |
| Stack | Astro 7.4 (salida estática) + Pages CMS como editor. Igual que la web de Pablo |
| Repo | `acamachorisso/acamachorisso.github.io`, en la cuenta de Agustín. Juani es colaborador |
| Dirección | https://acamachorisso.github.io. Sin dominio propio por ahora; se puede sumar después |
| Ramas | Sin pull requests. Desde el 24/11 se trabaja directo en `main`, que es lo que está online (antes había un `develop` que solo validaba) |
| Contacto | Email acamacho.contacto@gmail.com, sin teléfono. Redes: Instagram, YouTube y TikTok (@acamachorisso) |
| Formulario | Web3Forms (gratis hasta 250 mensajes por mes). Campos: Nombre (obligatorio), Apellido, Email (obligatorio), Propuesta |
| Categorías editables | Agustín puede crear, renombrar, ordenar u ocultar desde el editor las categorías de Fotos (hoy Viajes, Trabajos y Personales) y las secciones de Videos (hoy Proyectos y Videos cortos), sin tocar código. El menú, el inicio y los contadores se arman solos |
| Videos largos | En YouTube. Se reproducen en la web al tocar la miniatura (iframe de youtube-nocookie que carga recién al tocar) |
| Videos cortos | Archivos MP4 verticales en el repo, comprimidos (hoy son 7 y pesan unos 50 MB). Cualquier video puede ser de YouTube o un MP4, en cualquier sección |
| Showreel | Dos partes. **Fondo del inicio:** un MP4 corto, sin sonido y en loop (hoy el clip de 13 s a 1094 × 616 que ya está en el canvas). **Showreel completo:** link de YouTube en Videos y botón "Ver showreel" en el inicio; mientras no exista, queda en "Próximamente". Agustín cambia los dos desde "Datos generales" en el editor. El campo acepta solo `.mp4` y la publicación se frena si pesa más de 20 MB; la guía explica cómo exportarlo (1080p, H.264, sin audio, menos de 15 MB) |
| Fotos | En el repo, optimizadas al compilar (WebP, varios tamaños). Hoy son 196 en 11 álbumes |
| Álbumes | Cada álbum tiene su propia página (`/fotos/<álbum>/`), con link para compartir. En el prototipo se abría en la misma página |
| Editor | Pages CMS con etiquetas en español |

## Cambios al diseño del canvas (pedidos por Juani el 24/11)

El canvas no se modifica: estos cambios van directo en la web.

- **Inicio, portada (25/11):** el nombre en una línea y "Fotógrafo — Filmmaker" debajo, centrados en la pantalla y chicos (38 px en 1440), como en el Wix y en la página de Reilin Joey. "Ver trabajos" con flecha abajo al centro. Sin "Uruguay" en la portada ni en el pie.
- **Links (25/11):** sin subrayados. La página actual del menú y todo texto que se puede tocar se pintan de azul acero (`--accent: #8db3dc`) con el mouse encima, como el menú del Wix (#76A8DE) pero más apagado para ir con el negro.
- **Inicio, Sobre mí:** con las proporciones de la sección del Wix: alto de un tercio del ancho (494 px en 1440), título "Sobre mí" grande (43 px en 1440), texto de 18 px y un degradado corto y suave que cubre solo el 56 % izquierdo de la foto. En el celular el degradado cubre toda la foto, más suave, para que el texto se lea.
- **Inicio, Trabajo:** solo Videos y Fotos. Se sacan Viajes, Trabajos y Personales, que son categorías de Fotos.

## Stack y decisiones técnicas

- Astro 7.4 con salida 100% estática, TypeScript estricto y Node 24 LTS, el mismo en local y en GitHub Actions.
- Contenido en YAML y Markdown, validado con zod en `src/content.config.ts`.
- Deploy con GitHub Actions a GitHub Pages, con el mismo workflow que la web de Pablo. `site` y `base` se configuran en un solo lugar.
- Tipografía Archivo servida desde la propia web. CSS propio con variables, sin Tailwind ni React.
- JavaScript solo donde hace falta: menú de celular, visor de fotos, reproductor de videos cortos, carga de YouTube y envío del formulario. Sin JavaScript, todo se puede ver y el formulario se envía igual.
- Accesibilidad: HTML semántico, navegación con teclado y contraste de 4.5 a 1. Meta: 90 o más en Lighthouse. Con video de fondo y muchas fotos, 95 puede no ser realista.
- SEO: título y descripción por página, Open Graph con imagen, sitemap, robots.txt y URL canónica.

## Formulario

- El formulario manda los datos a `https://api.web3forms.com/submit` con `fetch` y muestra la confirmación en la página. Sin JavaScript, hace un POST normal y Web3Forms redirige a `/contacto/gracias/`.
- La clave va directo en el código, en `src/config.ts`, fuera de lo que Agustín ve en el editor. Igual queda visible en el HTML publicado, porque así funciona Web3Forms, así que guardarla como secret no agrega seguridad. Así no hacen falta `.env` ni un secret en GitHub (decidido el 24/11).
- No es un riesgo: la clave solo sirve para mandarle mensajes a Agustín. Si alguien la usa para mandar spam, se genera una nueva en Web3Forms y se cambia en ese archivo.
- Antispam: el campo oculto `botcheck` (honeypot) que trae Web3Forms. Si llega spam, se suma hCaptcha, que el plan gratis incluye.

## Estructura del repo

```text
acamachorisso.github.io/
├─ src/
│  ├─ content/                  ← lo que edita Agustín
│  │  ├─ photo-categories/      un .yaml por categoría de Fotos (Viajes, Trabajos…)
│  │  ├─ albums/                un .yaml por álbum
│  │  ├─ video-sections/        un .yaml por sección de Videos (Proyectos, Videos cortos…)
│  │  └─ videos/                un .yaml por video (de YouTube o MP4)
│  ├─ data/site.yaml            ← nombre, frase, bios, email, redes, video del inicio
│  ├─ assets/fotos/<álbum>/     ← fotos de cada álbum (se optimizan al compilar)
│  ├─ assets/site/              ← logo, foto de Sobre mí, fondos
│  ├─ content.config.ts
│  ├─ config.ts                 ← clave de Web3Forms y ajustes que no edita Agustín
│  ├─ layouts/  components/  pages/  styles/  lib/
├─ public/
│  ├─ videos/                   ← showreel y videos cortos (MP4)
│  └─ favicon…
├─ .github/workflows/deploy.yml
├─ .pages.yml                   configuración de Pages CMS
├─ docs/PLAN.md  docs/GUIA.md
├─ CLAUDE.md  README.md  astro.config.mjs  package.json
```

## Modelo de contenido

**Categorías de Fotos** (`src/content/photo-categories/`): `title` (Viajes, Trabajos, Personales…), `order` (posición en el menú y en el inicio), `hidden`. El nombre del archivo es la dirección: `viajes.yaml` → `/fotos/viajes/`.

**Álbumes** (`src/content/albums/`)

| Campo | Obligatorio | Uso |
| --- | --- | --- |
| `title` | Sí | Nombre del álbum, por ejemplo "Inglaterra" |
| `category` | Sí | Categoría de Fotos (selector con las que existen) |
| `kind` | No | Etiqueta corta: Evento, Producto, Backstage… |
| `description` | No | Una o dos líneas, por ejemplo "Capturadas en abril de 2022 en Londres, Oxford y Bath." |
| `cover` | Sí | Foto de portada |
| `photos` | Sí | Lista de fotos en el orden en que se muestran. En el editor se suben varias a la vez, se reordenan arrastrando y se sacan con un botón |
| `order` | No | Posición dentro de su subsección |
| `hidden` | No | Oculta el álbum sin borrarlo |

**Secciones de Videos** (`src/content/video-sections/`): `title` (Proyectos, Videos cortos…), `format` (Horizontal: grilla 16:9, como Proyectos; Vertical: carrusel 9:16, como Videos cortos), `order`, `hidden`.

**Videos** (`src/content/videos/`): `title`, `section` (selector con las que existen), `type` (etiqueta libre: Videoclip, Publicidad, Cortometraje, Reel…), `youtube` (link o ID; se guarda el ID) **o** `file` (MP4), uno de los dos, `poster` (obligatorio para MP4; con YouTube, si falta se usa su miniatura), `soon` (Próximamente: se muestra sin link y sin `youtube` ni `file`), `order`, `hidden`. La duración de los MP4 se calcula al compilar.

Sacar una foto de la lista la quita de la web, pero el archivo sigue en el repo ocupando lugar. Al compilar, un aviso (no un error) lista las fotos que están en la carpeta de un álbum y no se usan, y la guía explica cómo borrarlas de la biblioteca de archivos del editor.

Si un álbum o un video apunta a una categoría o sección que no existe, la publicación se frena con un error que dice cuál. Lo mismo si una categoría y un álbum tienen el mismo nombre de archivo, porque comparten la dirección `/fotos/…`.

**Datos generales** (`src/data/site.yaml`): `name`, `tagline` ("Fotógrafo — Filmmaker"), `location`, `bio_short` (inicio), `bio` (Sobre mí, admite párrafos), `facts` (pares etiqueta y texto de Sobre mí), `email`, `links` (etiqueta y URL), `hero_video` y `hero_poster`, `portrait` y `about_background`.

Una sección o subsección sin contenido no aparece en el menú ni genera página.

## Páginas

| Página | Dirección | Comportamiento |
| --- | --- | --- |
| Inicio | `/` | Video a pantalla completa (`100svh`), nombre, Sobre mí corto sobre una foto de fondo y, en Trabajo, solo los accesos a Videos y Fotos (las categorías de Fotos están en el menú y en `/fotos/`) |
| Videos | `/videos/` | Una sección por cada sección de Videos, en orden, con su contador ("Proyectos (9)"). Las horizontales en grilla y las verticales en carrusel con reproductor; los "Próximamente" al final de cada una |
| Fotos | `/fotos/` | Redirige a la primera categoría con álbumes |
| Categoría | `/fotos/<categoría>/` (hoy `viajes`, `trabajos`, `personales`) | Álbumes con portada, cantidad de fotos y descripción |
| Álbum | `/fotos/<álbum>/` | Grilla de fotos, visor a pantalla completa (teclado y gestos), álbum anterior y siguiente |
| Sobre mí | `/sobre-mi/` | Retrato, bio completa y ficha |
| Contacto | `/contacto/` | Formulario, email y redes |
| Gracias | `/contacto/gracias/` | Confirmación cuando el formulario se envía sin JavaScript |
| 404 | cualquier otra | Mensaje y link al inicio |

## Etapas

Son unas 33 horas en total. Con Claude Code, el tiempo de Juani se estima en 13 a 16 horas, repartidas en unas 4 o 5 sesiones.

| # | Etapa | Qué se hace | Lista cuando | Horas |
| --- | --- | --- | --- | --- |
| 1 | Esqueleto y deploy | Proyecto Astro, workflow, marco común (menú con Fotos desplegable, pie) y páginas vacías publicadas en `acamachorisso.github.io` | Se recorren las páginas desde el menú online | 3 |
| 2 | Contenido como datos | Esquemas de categorías, álbumes, secciones de videos, videos y `site.yaml`; las fotos y videos del canvas pasan al repo | Un dato mal escrito frena la publicación con un error claro | 6 |
| 3 | Páginas con el diseño | Cada página como en el canvas: hero, carrusel y reproductor, álbumes, visor, versión de celular. Menú, inicio y Videos armados desde las categorías y secciones | Se ve igual al diseño a 1440 y a 390 px. **Primera ronda de cambios de Agustín** | 11 |
| 4 | Formulario, SEO y calidad | Web3Forms con y sin JavaScript, Open Graph, sitemap, compresión de videos, Lighthouse | Un mensaje de prueba llega a acamacho.contacto@gmail.com y se probó en celulares reales. **Segunda ronda de cambios** | 5 |
| 5 | Editor (Pages CMS) | `.pages.yml` en español; probar subir un álbum entero (varias fotos a la vez), reordenar y borrar fotos, reemplazar fotos de un álbum, y crear un video corto, una categoría y una sección nuevas, todo desde la compu | Agustín crea un álbum y lo ve online a los 2 minutos | 4 |
| 6 | Documentación y entrega | `docs/GUIA.md` con capturas reales, README y CLAUDE.md | Agustín sigue la guía sin ayuda | 3 |

## Pruebas

**Automáticas, en cada publicación:** tipos de TypeScript, esquemas de todo el contenido, build completo y links internos rotos.

**Manuales, antes de entregar:**

- [ ] Cada página a 390, 768 y 1440 px
- [ ] Chrome, Safari y Firefox; un iPhone y un Android reales
- [ ] El video del inicio arranca solo y sin sonido en iPhone (modo ahorro de batería incluido: se ve el poster)
- [ ] Los videos cortos se reproducen con sonido al tocarlos, también en iPhone
- [ ] Los videos de YouTube cargan recién al tocarlos
- [ ] El visor de fotos anda con teclado, con flechas y con deslizar en el celular
- [ ] Toda la web recorrida solo con el teclado
- [ ] Lighthouse con 90 o más en las cuatro categorías
- [ ] El formulario llega al mail, con JavaScript y sin él; un envío con el honeypot completo no llega
- [ ] Un campo mal escrito frena la publicación con un error entendible
- [ ] Una categoría sin álbumes no aparece en el menú ni en el inicio
- [ ] Una categoría nueva creada desde el editor aparece en el menú, en el inicio y con su página
- [ ] Una sección de videos nueva aparece en Videos con su formato y su contador
- [ ] Un video de YouTube en una sección vertical y un MP4 en una horizontal se reproducen bien
- [ ] El link directo a un álbum abre ese álbum
- [ ] La vista previa del link se ve bien en WhatsApp e Instagram
- [ ] Una dirección inventada muestra la 404
- [ ] Un cambio desde Pages CMS aparece online en menos de 2 minutos
- [ ] Desde el editor: subir 20 fotos juntas, reordenarlas arrastrando y borrar una, y verlo así online
- [ ] Una foto borrada de la biblioteca del editor deja de estar en el repo

## Riesgos

| Riesgo | Qué hacemos |
| --- | --- |
| El repo crece mucho con videos y fotos | GitHub Pages admite sitios de hasta 1 GB. Los videos se comprimen antes de subirlos y las fotos originales se achican a 2500 px. Si se acerca al límite, los videos cortos pasan a YouTube Shorts o a un hosting de video |
| Pages CMS no deja subir videos grandes desde la compu | Se prueba en la etapa 5. Si falla, los videos se suben desde github.com o los sube Juani |
| Agustín sube fotos sin achicar (20 MB cada una) | El build las optimiza igual. La guía explica cómo exportarlas a 2500 px |
| Pages CMS no deja subir muchas fotos juntas o reordenar cómodo | Se prueba en la etapa 5, antes de escribir la guía. Si la subida múltiple falla, se suben arrastrando la carpeta en github.com (hasta 100 archivos por vez) y se ordenan en el editor |
| El selector de categoría o sección no anda bien en Pages CMS | Se prueba en la etapa 5. Si falla, se usa un campo de texto con la lista de opciones válidas en la ayuda, y el build frena si el nombre no existe |
| El showreel no está listo | El inicio sigue con el clip actual; cambiarlo es reemplazar un archivo |
| Web3Forms cambia el plan gratis o llega spam | Se cambia a Formspree tocando un solo componente; hCaptcha está incluido |
| Crece el alcance (tienda, blog, dominio propio) | Queda fuera de este plan y se habla aparte. El dominio propio se conecta sin rehacer nada |

## Cómo se trabaja con Claude Code

1. Antes de cada etapa, Claude dice qué archivos va a crear o cambiar, y arranca con el OK de Juani.
2. Al terminar, corre las pruebas automáticas y muestra el resultado tal cual, aunque falle.
3. Juani lo mira con `npm run dev` y lo compara con el canvas.
4. Con el OK, `npm test`, commit a `main` y push: GitHub Actions valida y publica en 1 o 2 minutos.

Claude no hace push ni cambios en la cuenta de Agustín sin que se lo pidan.
