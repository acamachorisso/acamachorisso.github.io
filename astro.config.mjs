// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// La dirección de la web se configura solo acá.
// Si algún día cambia (un dominio propio, por ejemplo), se toca solo esto y BASE en scripts/check-links.mjs.
const SITE = 'https://acamachorisso.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.includes('/contacto/gracias/') })],
});
