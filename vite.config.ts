import react from '@vitejs/plugin-react'
import fs from 'fs'
import lessToJS from 'less-vars-to-js'
import { dirname, resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'

const DIRNAME = dirname(fileURLToPath(import.meta.url))

const root = resolve(DIRNAME, 'src')
const outDir = resolve(DIRNAME, 'dist')

const pathResolver = (path: string) => resolve(root, path)
const themeVariables = lessToJS(fs.readFileSync(pathResolver('./styles/antd/themes.less'), 'utf8'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => {
            if (name === 'col' || name === 'row') {
              return 'antd/lib/style/index.less'
            }
            return `antd/es/${name}/style/index.less`
          },
        },
      ],
    }),
    visualizer((opts) => {
      return { filename: resolve(outDir, 'stats.html') }
    }), // should be last plugin
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
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
        dir: resolve(DIRNAME, 'dist'),
      },
    },
  },
})
