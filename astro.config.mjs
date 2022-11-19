// @ts-check

import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import { resolve } from "node:path"
import yaml from "@rollup/plugin-yaml"
const __dirname = new URL(".", import.meta.url).pathname

export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    vite: {
      plugins: [yaml()],
      resolve: {
        alias: {
          "@": resolve(__dirname, "src"),
        },
      },
      ssr: {
        noExternal: ["@acab/reset.css"],
      },
    },
    integrations: [svelte(), mdx()],
    site: "https://tetracalibers.github.io",
    base: "/a11y-practice-ground",
  },
)
