import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

//https://github.com/BuilderIO/partytown/issues/72 for ganalytics


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false, }), mdx(), sitemap()],
  output: "static",
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true
  },
  site: "https://www.jainhydraulics.com"
});