import { build } from "vite";

// vite.config.js
export default {
    base: '/project-car-hunt/',
    rollupOptions: {
        output: {
            manualChunks: false,
            inlineDynamicImports: true,
            entryFileNames: '[name].js',   // currently does not work for the legacy bundle
            assetFileNames: '[name].[ext]', // currently does not work for images
        },
    },
    build: {
        assetsInlineLimit: 0,
    },
}