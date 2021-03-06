import react from '@vitejs/plugin-react'
import fs from 'fs'
import lessToJS from 'less-vars-to-js'
import { dirname, resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import Inspect from 'vite-plugin-inspect'

// Various paths
const DIRNAME = dirname(fileURLToPath(import.meta.url))
const root = resolve(DIRNAME)
const src = resolve(DIRNAME, 'src')
const customTheme = resolve(src, 'styles/antd/themes.less')
const outDir = resolve(DIRNAME, 'dist')

const customThemeVariables = lessToJS(fs.readFileSync(customTheme, 'utf8'))

// https://vitejs.dev/config/
export default defineConfig({
  root,
  resolve: {
    alias: {
      '@': src, // TODO: Remove when ViteAliases is fixed
    },
  },
  plugins: [
    react(),
    optimizeLodashImports(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            if (name === 'col' || name === 'row') {
              return 'antd/es/grid/style/index.less' // col and row require special treatment
            }
            return `antd/es/${name}/style/index.less`
          },
        },
      ],
    }),
    Inspect(), // Note: Requires node >14.2.0 (plugin makes use of optional chaining)
    visualizer(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: customThemeVariables,
      },
      scss: { additionalData: `@import "./src/styles/global";` },
    },
  },

  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: true,
    manifest: true, // ref: https://github.com/MrBin99/django-vite
    chunkSizeWarningLimit: 1024 * 1024, // 1MB
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        dir: outDir,
      },
    },
  },
})
