# Guía para editar tu web

Tu web está en **https://acamachorisso.github.io**. La cambiás desde **Pages CMS**, un editor que funciona en el navegador. No hace falta tocar código.

## Cómo funciona

1. Entrás al editor y cambiás algo: un álbum, un video, un texto.
2. Tocás **Save** (Guardar).
3. En 1 o 2 minutos el cambio está online. Si no lo ves, recargá la página de tu web.

Si algo quedó mal cargado (por ejemplo, una foto que falta o un link de YouTube roto), **la web no se rompe**: el cambio no se publica y queda online la versión anterior. Más abajo está cómo ver qué pasó.

## Entrar al editor

1. Abrí **https://app.pagescms.org**.
2. Tocá **Sign in with GitHub** y entrá con tu cuenta `acamachorisso`.
3. Elegí el repositorio **acamachorisso.github.io** y la rama **main**.

A la izquierda vas a ver:

| En el editor | Qué es |
| --- | --- |
| Álbumes de fotos | Cada álbum, con sus fotos |
| Categorías de fotos | Viajes, Trabajos, Personales y las que crees |
| Videos | Cada video, de YouTube o MP4 |
| Secciones de videos | Proyectos, Videos cortos y las que crees |
| Datos generales | Textos, fotos de la web, video del inicio, email y redes |
| Media | Todos los archivos subidos (fotos y videos) |

## Fotos

### Antes de subir: exportá bien las fotos

- **JPG**, con el lado más largo en **2500 px** y calidad de 80 a 85 % (en Lightroom: Exportar → Cambiar tamaño → Lado largo 2500 px).
- Las fotos **.HEIC** del iPhone no sirven: exportalas como JPG.
- Si subís una foto enorme (20 MB), la web igual la achica, pero tarda más en publicarse.

### Crear un álbum

1. **Álbumes de fotos** → **Add an entry** (Agregar).
2. Completá:
   - **Nombre del álbum**: por ejemplo "Italia". También arma la dirección: `/fotos/italia/`.
   - **Categoría**: elegila de la lista (Viajes, Trabajos…).
   - **Tipo** (opcional): una etiqueta corta, como Evento o Producto.
   - **Descripción** (opcional): una o dos líneas.
   - **Portada**: la foto que se ve en la lista de álbumes.
   - **Fotos**: subí varias a la vez desde la compu. **Arrastralas para cambiar el orden**: así se ven en la web.
   - **Orden dentro de la categoría**: 1 va primero.
3. **Save**.

### Cambiar las fotos de un álbum

- **Agregar**: en el campo Fotos, subí o elegí las nuevas.
- **Ordenar**: arrastralas.
- **Sacar una foto**: tocá la cruz de esa foto y guardá. Deja de verse en la web.

Sacar una foto del álbum **no la borra**: sigue guardada y ocupa lugar. Para borrarla del todo, andá a **Media → Fotos de los álbumes**, buscala y borrala. Borrá solo fotos que ya sacaste de todos los álbumes. Si borrás una que un álbum todavía usa, la publicación se frena con un aviso.

### Ocultar o borrar un álbum

- **Ocultar (sin borrarlo)**: tildalo y guardá. No se ve, pero queda guardado para después.
- **Borrar**: en la lista de álbumes, borralo. Después borrá sus fotos desde Media si no las vas a usar.

### Categorías de fotos (Viajes, Trabajos, Personales…)

- **Crear una**: **Categorías de fotos** → **Add an entry** → nombre y orden → **Save**. Después elegila en los álbumes que van ahí.
- Una categoría **sin álbumes no aparece** en la web.
- **Orden**: es la posición en el menú Fotos (1 va primero).
- Una categoría **no puede llamarse igual que un álbum**, porque los dos usarían la misma dirección (`/fotos/…`). Si pasa, la publicación se frena y te avisa cuál cambiar.
- **Antes de borrar una categoría**, pasá sus álbumes a otra. Si un álbum queda apuntando a una categoría que no existe, la publicación se frena.

## Videos

### Agregar un video de YouTube

1. **Videos** → **Add an entry**.
2. **Título**, **Sección** (Proyectos, Videos cortos…) y **Tipo** (Videoclip, Publicidad…).
3. **Link de YouTube**: en YouTube, tocá Compartir → Copiar y pegalo acá.
4. **Portada** (opcional): si la dejás vacía, se usa la miniatura de YouTube.
5. **Save**.

### Agregar un video MP4 (por ejemplo, un video corto)

1. Exportalo en **MP4 (H.264)**, lo más liviano posible. Para los cortos, menos de 15 MB. Los **.MOV** del celular no sirven.
2. **Videos** → **Add an entry** → título y sección.
3. **Archivo MP4**: subilo.
4. **Portada**: obligatoria. Es un cuadro del video en JPG.
5. **Save**. La duración se calcula sola.

Cada video lleva **un link de YouTube o un MP4, no los dos**.

### Videos "Próximamente" (como Porsche)

- Con **Próximamente** tildado, el video se ve en gris con el cartel "Próximamente" y sin link. Necesita una portada.
- **Cuando salga**: pegá el link de YouTube, destildá Próximamente y guardá.

### Secciones de videos (Proyectos, Videos cortos…)

- **Crear una**: **Secciones de videos** → **Add an entry** → nombre, formato y orden.
- **Formato**:
  - **Horizontal**: grilla de 16:9, como Proyectos.
  - **Vertical**: carrusel de 9:16, como Videos cortos.
- Una sección **sin videos no aparece**. Los contadores, como "Proyectos (9)", se calculan solos.

## Inicio y showreel

### Video de fondo del inicio

Es el video que se ve atrás de tu nombre: corto, sin sonido y en loop.

1. Exportalo así: **MP4 (H.264), 1080p, sin audio, de 10 a 20 segundos y de menos de 15 MB**.
2. **Datos generales** → **Video del inicio** → subí el nuevo.
3. **Imagen del video del inicio**: subí un cuadro del video en JPG. Se ve mientras el video carga y en celulares con ahorro de batería.
4. **Save**.

Si el video pesa más de 20 MB, la publicación se frena: tardaría mucho en arrancar, sobre todo en el celular.

### Botón "Ver showreel"

1. Cuando tengas el showreel completo en YouTube, abrí el video **Showreel** en **Videos**, pegá el link y destildá **Próximamente**.
2. En **Datos generales → Showreel** ya está elegido ese video. El botón "Ver showreel" aparece solo en el inicio.

## Datos generales

Ahí están los textos y las fotos fijas de la web:

- Nombre y frase ("Fotógrafo — Filmmaker").
- **Sobre mí corto** (inicio), **primera frase**, **bio** y **ficha** (Sobre mí). En la bio, un párrafo nuevo es una línea en blanco.
- Fotos del inicio, retrato, foto de Contacto y logo.
- Email y redes (se muestran en Contacto y en el pie).
- **Imagen al compartir el link**: la que aparece cuando alguien pega el link de tu web en WhatsApp o Instagram.

Los mensajes del formulario de Contacto llegan a **acamacho.contacto@gmail.com**. Si querés cambiar esa casilla, hay que hacerlo en Web3Forms: pedíselo a Juani.

## Si algo no se publica

1. Entrá a **https://github.com/acamachorisso/acamachorisso.github.io/actions**.
2. El último intento con una **cruz roja** es el que falló. Tocalo y después tocá **build**.
3. Buscá el mensaje en español. Dice qué archivo y qué campo arreglar. Por ejemplo:
   - `albums → italia` · `photos.3: No encuentro esa imagen…` → en el álbum Italia, la foto número 4 (se cuenta desde 0) no está.
   - `videos → dvd` · `Cada video lleva un link de YouTube o un archivo MP4, no los dos.`
4. Arreglalo en el editor y guardá. Se vuelve a publicar solo.

Mientras tanto, la web sigue mostrando la última versión que funcionó. Si no entendés el mensaje, mandale una captura a Juani.

## Qué no tocar

Desde el editor no podés romper nada. En GitHub, en cambio, no modifiques archivos fuera de `src/content`, `src/data`, `src/assets` y `public/videos`: ahí está el código de la web.
