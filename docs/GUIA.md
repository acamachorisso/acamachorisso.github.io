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
3. Elegí el proyecto **acamachorisso.github.io**. Si no aparece en la lista, entrá directo a **https://app.pagescms.org/acamachorisso/acamachorisso.github.io/main** y guardalo en favoritos.

A la izquierda vas a ver:

| En el editor | Qué es |
| --- | --- |
| Álbumes de fotos | Cada álbum, con sus fotos |
| Categorías de fotos | Viajes, Trabajos, Personales y las que crees. Adentro de cada una, sus álbumes en orden |
| Videos | Cada video, de YouTube o MP4 |
| Secciones de videos | Proyectos, Videos cortos y las que crees. Adentro de cada una, sus videos en orden |
| Datos generales | Textos, fotos de la web, video del inicio, email y redes |
| Media | Todos los archivos subidos (fotos y videos) |

### Los botones (el editor está en inglés)

- **Add an entry**: crear algo nuevo. **Edit**: abrir uno de la lista. **Save**: guardar y publicar (está gris hasta que cambiás algo).
- **⋮**: menú con **Delete** (borrar), **Rename** y **View on GitHub**, en cada fila de la lista y arriba a la derecha cuando editás algo.
- **Upload**: subir desde la compu. **Select**: elegir algo ya subido. **Add an item**: sumar un renglón a una lista. **Required**: obligatorio.
- **Volver a la lista**: tocá el nombre de la sección arriba a la izquierda (por ejemplo, *Álbumes de fotos › Editing "Inglaterra"*).
- **Ocultar** y **Próximamente** son interruptores: gris es apagado y verde es prendido.
- **No uses Rename**: cambia la dirección del álbum o video y lo saca de su categoría o sección. Para cambiar el nombre que se ve, editá el campo Nombre o Título.

## Fotos

### Antes de subir: exportá bien las fotos

- **Cada foto, hasta 3 MB.** El editor no sube archivos más pesados: tira **error 413** (quiere decir "archivo demasiado grande"). Las fotos tal cual salen de la cámara (20 MB) no entran.
- **Para achicarlas, entrá a https://acamachorisso.github.io/achicar/** (guardala en favoritos). Arrastrá todas las fotos juntas, aunque sean cientos, o elegí la carpeta entera. Se achican en tu compu, sin subirse a ningún lado, y te bajás un **.zip** con todas: descomprimilo y subí esas fotos al editor. Quedan en 3000 px y calidad 90: la web muestra hasta 2560 px, así que se ven igual que el original.
- Si exportás desde Lightroom, también sirve: JPG, lado largo 3000 px, calidad 90.
- Las fotos **.HEIC** del iPhone no sirven: exportalas como JPG.

### Crear un álbum

1. **Álbumes de fotos** → **Add an entry** (Agregar).
2. Completá:
   - **Nombre del álbum**: por ejemplo "Italia". También arma la dirección: `/fotos/italia/`.
   - **Tipo** (opcional): una etiqueta corta, como Evento o Producto.
   - **Descripción** (opcional): una o dos líneas.
   - **Portada**: la foto que se ve en la lista de álbumes.
   - **Fotos**: con **Upload** elegís varias a la vez en la ventana de la compu (Ctrl o Shift); con **Select**, las que ya subiste. **Arrastrá las miniaturas para cambiar el orden**: así se ven en la web.
3. **Save**.
4. **Sumalo a su categoría**: **Categorías de fotos** → por ejemplo **Viajes** → en **Álbumes**, tocá **Add an item**, elegí el álbum nuevo, arrastralo al lugar donde lo querés y tocá **Save**. Hasta que no esté en una categoría, el álbum no se ve en la web.

### Ordenar los álbumes

Los álbumes se ordenan **adentro de cada categoría**: **Categorías de fotos** → la categoría → en **Álbumes**, arrastralos desde los puntitos ⠿ hacia arriba o hacia abajo → **Save**. El primero de la lista es el primero en la web, y "Álbum anterior" y "Álbum siguiente" siguen ese mismo orden.

- **Pasar un álbum a otra categoría**: sacalo de la lista de una (con el tacho de su renglón) y sumalo en la otra. Un álbum va en **una sola categoría**: si queda en dos, la publicación se frena y te avisa cuál sacar.

### Cambiar las fotos de un álbum

- **Agregar**: en el campo Fotos, subí o elegí las nuevas.
- **Ordenar**: arrastralas.
- **Sacar una foto**: tocá el tacho abajo a la derecha de la miniatura y guardá. Deja de verse en la web.

Sacar una foto del álbum **no la borra**: sigue guardada y ocupa lugar. Para borrarla del todo, andá a **Media → Fotos de los álbumes**, buscala y tocá **⋮ → Delete**. Borrá solo fotos que ya sacaste de todos los álbumes. Si borrás una que un álbum todavía usa, la publicación se frena con un aviso. Ojo: ese mismo menú con Delete aparece en la ventana de **Select**; cuando elegís fotos, tocá la foto, no los tres puntos.

### Ocultar o borrar un álbum

- **Ocultar (sin borrarlo)**: prendé el interruptor y guardá. No se ve, pero queda guardado para después.
- **Borrar**: en la lista de álbumes, **⋮ → Delete**. Si sigue en la lista de su categoría, no pasa nada: se ignora (igual podés sacarlo de ahí para que quede prolijo). Después borrá sus fotos desde Media si no las vas a usar.

### Categorías de fotos (Viajes, Trabajos, Personales…)

- **Crear una**: **Categorías de fotos** → **Add an entry** → nombre, orden y sus álbumes → **Save**.
- Una categoría **sin álbumes no aparece** en la web.
- **Orden**: es la posición en el menú Fotos (1 va primero).
- Una categoría **no puede llamarse igual que un álbum**, porque los dos usarían la misma dirección (`/fotos/…`). Si pasa, la publicación se frena y te avisa cuál cambiar.
- **Antes de borrar una categoría**, pasá sus álbumes a otra. Si no, esos álbumes dejan de verse en la web.

## Videos

### Agregar un video de YouTube

1. **Videos** → **Add an entry**.
2. **Título** y **Tipo** (Videoclip, Publicidad…).
3. **Link de YouTube**: en YouTube, tocá Compartir → Copiar y pegalo acá.
4. **Portada** (opcional): si la dejás vacía, se usa la miniatura de YouTube.
5. **Save**.
6. **Sumalo a su sección**: **Secciones de videos** → por ejemplo **Proyectos** → en **Videos**, tocá **Add an item**, elegí el video, arrastralo a su lugar y tocá **Save**. Hasta que no esté en una sección, el video no se ve en la web.

### Agregar un video MP4 (por ejemplo, un video corto)

1. Exportalo en **MP4 (H.264)**, lo más liviano posible. Para los cortos, menos de 15 MB. Los **.MOV** del celular no sirven.
2. **Videos** → **Add an entry** → título.
3. **Archivo MP4**: subilo. El editor sube **hasta 3 MB**; si pesa más, tira **error 413**. En ese caso, subilo desde GitHub (ver [Videos de más de 3 MB](#videos-de-más-de-3-mb)) y después elegilo acá de la lista.
4. **Portada**: obligatoria. Es un cuadro del video en JPG.
5. **Save**. La duración se calcula sola.
6. Sumalo a su sección, como en el paso 6 de arriba.

Cada video lleva **un link de YouTube o un MP4, no los dos**.

### Videos de más de 3 MB

El editor no sube archivos de más de 3 MB (tira **error 413**), y casi todos los MP4 pesan más. Se suben desde la web de GitHub, que acepta hasta 25 MB:

1. Poné al archivo un nombre en minúsculas, sin espacios ni tildes, con guiones: por ejemplo `be-like-me.mp4`.
2. Entrá a **https://github.com/acamachorisso/acamachorisso.github.io/tree/main/public/videos** con tu cuenta.
3. **Add file** → **Upload files** → arrastrá el MP4 → **Commit changes**.
4. Volvé al editor: en **Archivo MP4** (o **Video del inicio**), tocá para elegir un archivo y el video ya aparece en la lista. Elegilo y guardá.

### Créditos (opcional)

Salen chicos debajo del título cuando se abre el video.

- **Créditos**: tocá **Add an item** por cada persona o equipo y completá **Rol** (Cámara, Dirección, Edición y Color…) y **Nombre**. Se ordenan arrastrando.
- **Nota**: una línea suelta que va arriba de los créditos, como "(Publicidad no oficial)".

### Videos "Próximamente" (como Porsche)

- Con **Próximamente** prendido, el video se ve en gris con el cartel "Próximamente" y sin link. Necesita una portada.
- **Cuando salga**: pegá el link de YouTube, apagá Próximamente y guardá.

### Secciones de videos (Proyectos, Videos cortos…)

- **Crear una**: **Secciones de videos** → **Add an entry** → nombre, formato, orden y sus videos.
- **Ordenar los videos**: **Secciones de videos** → la sección → en **Videos**, arrastralos desde los puntitos ⠿ → **Save**. Los "Próximamente" se muestran siempre al final. Un video va en **una sola sección**.
- **Orden** (el número): es la posición de la sección en la página Videos (1 va primero).
- **Formato**:
  - **Horizontal**: grilla de 16:9, como Proyectos.
  - **Vertical**: carrusel de 9:16, como Videos cortos.
- Una sección **sin videos no aparece**. Los contadores, como "Proyectos (9)", se calculan solos.

## Inicio y showreel

### Video de fondo del inicio

Es el video que se ve atrás de tu nombre: corto, sin sonido y en loop.

1. Exportalo así: **MP4 (H.264), 1080p, sin audio, de 10 a 20 segundos y de menos de 15 MB**.
2. **Datos generales** → **Video del inicio** → sacá el actual con el tacho y subí el nuevo con **Upload**. Si pesa más de 3 MB, el editor tira **error 413**: subilo desde GitHub (ver [Videos de más de 3 MB](#videos-de-más-de-3-mb)) y elegilo de la lista.
3. **Imagen del video del inicio**: subí un cuadro del video en JPG. Se ve mientras el video carga y en celulares con ahorro de batería.
4. **Save**.

Si el video pesa más de 20 MB, la publicación se frena: tardaría mucho en arrancar, sobre todo en el celular.

### Botón "Ver showreel"

El campo **Datos generales → Showreel** no es un video ni un link: dice cuál de tus videos es el showreel. Ya está elegido el video **Showreel**, que hoy está en Próximamente, y por eso el botón no aparece.

1. Cuando tengas el showreel completo en YouTube, abrí el video **Showreel** en **Videos**, pegá el link y apagá **Próximamente**.
2. **Save**. En 1 o 2 minutos aparece "Ver showreel" en el inicio, debajo de "Fotógrafo — Filmmaker".

## Datos generales

Ahí están los textos y las fotos fijas de la web:

- Nombre y frase ("Fotógrafo — Filmmaker").
- **Sobre mí corto** (inicio), **primera frase** y **bio** (página Sobre mí). En la bio, un párrafo nuevo es una línea en blanco.
- Fotos del inicio, retrato, foto de Contacto y logo. La vista previa del logo parece un cuadro vacío porque es blanco sobre blanco: está bien así.
- Email y redes: salen en el pie. En Contacto sale solo Instagram, abajo de la foto. El texto de Contacto (arriba del formulario) se puede dejar vacío.
- **Imagen al compartir el link**: la que aparece cuando alguien pega el link de tu web en WhatsApp o Instagram.

Los mensajes del formulario de Contacto llegan a **acamacho.contacto@gmail.com**. Si querés cambiar esa casilla, hay que hacerlo en Web3Forms: pedíselo a Juani.

## Si el editor tira "error 413" al subir

El archivo pesa más de 3 MB, el máximo que sube el editor (el mensaje lo pone el editor, en inglés, y no se puede cambiar).

- **Fotos**: achicalas en **https://acamachorisso.github.io/achicar/** (ver [Antes de subir](#antes-de-subir-exportá-bien-las-fotos)).
- **Videos**: subilos desde GitHub (ver [Videos de más de 3 MB](#videos-de-más-de-3-mb)).

## Si algo no se publica

1. Entrá a **https://github.com/acamachorisso/acamachorisso.github.io/actions** con tu cuenta de GitHub (sin entrar, no se ven los mensajes).
2. El último intento con una **cruz roja** es el que falló. Tocalo y después tocá **build**.
3. Buscá el mensaje en español. Dice qué archivo y qué campo arreglar. Por ejemplo:
   - `albums → italia` · `photos.3: No encuentro esa imagen…` → en el álbum Italia, la foto número 4 (se cuenta desde 0) no está.
   - `videos → dvd` · `Cada video lleva un link de YouTube o un archivo MP4, no los dos.`
4. Arreglalo en el editor y guardá. Se vuelve a publicar solo.

Mientras tanto, la web sigue mostrando la última versión que funcionó. Si no entendés el mensaje, mandale una captura a Juani.

## Qué no tocar

Desde el editor no podés romper nada. En GitHub, en cambio, no modifiques archivos fuera de `src/content`, `src/data`, `src/assets` y `public/videos`: ahí está el código de la web.
