import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikizv.github.io',
  base: '/portfolio',
  build: {
    assets: '_astro'
  },
  output: 'static'
});

