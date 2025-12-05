import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "MyGym - Conquer Weakness",
        short_name: "MyGym",
        description: "Your personal fitness companion",
        theme_color: "#ef4444",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-core';
          }
          // All Radix UI components in one chunk
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Charts
          if (id.includes('recharts')) {
            return 'charts';
          }
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          // Utilities
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Smaller chunks for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        toplevel: true,
        if_return: true,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Reduce bundle size
    reportCompressedSize: false,
    // Image optimization
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
}));
