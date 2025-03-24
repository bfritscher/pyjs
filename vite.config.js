import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // Output to Django's static folder
    outDir: 'demo/static/demo',
    assetsDir: '',
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Bundle configuration
    lib: {
      entry: resolve(__dirname, 'static_src/js/editor.js'),
      name: 'EditorBundle',
      fileName: 'editor-bundle',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [],
      output: {
        // Global variables to use in the UMD build
        globals: {}
      }
    }
  }
});
