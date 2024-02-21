import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import viteBundler from "@vuepress/bundler-vite";

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "j2cc",
  description: "Obfuscation through Transpilation",

  theme,

  bundler: viteBundler({
    viteOptions: {

    },
    vuePluginOptions: {

    },

  })

  // Enable it with pwa
  // shouldPrefetch: false,
});
