import {fileURLToPath, URL} from 'node:url'
import {VitePWA} from 'vite-plugin-pwa'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        basicSsl(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'inline',
            workbox: {
                globPatterns: ["**/*"],
            },
            includeAssets: [
                "**/*",
            ],
            manifest: {
                "theme_color": "#f69435",
                "background_color": "#f69435",
                "display": "standalone",
                "scope": "/",
                "start_url": "/",
                "short_name": "phb",
                "description": "PHB",
                "name": "phb",
                "icons": [
                    {
                        "src": "/icon-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "/icon-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
            }
        })
    ],
    preview: {
        port: 1222,
        https: true,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
