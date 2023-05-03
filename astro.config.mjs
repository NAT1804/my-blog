import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
// import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://tuanna184-blog.netlify.app/",
  integrations: [mdx(), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
});
