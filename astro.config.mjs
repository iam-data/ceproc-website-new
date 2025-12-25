import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],

});


export default defineConfig({
  output: 'hybrid', // Key change: allows API routes
  adapter: netlify(),
});