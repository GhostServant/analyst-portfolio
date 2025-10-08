import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ghostservant.github.io/analyst-portfolio',
  base: '/analyst-portfolio',
  build: {
    assets: '_astro'
  },
  output: 'static'
});

