import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

//https://github.com/BuilderIO/partytown/issues/72 for ganalytics

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), sitemap(), compress()],
  output: "static",
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true
  },
  site: "https://jainhydraulics.com"
});