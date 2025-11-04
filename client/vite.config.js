// vite.config.js
// =================================================================
// VITE CONFIGURATION FILE
// =================================================================
// Vite is a modern build tool that provides:
// 1. Lightning-fast dev server with Hot Module Replacement (HMR)
// 2. Optimized production builds
// 3. Built-in TypeScript/JSX support
// 4. Plugin system for extended functionality
// =================================================================

// Import the defineConfig helper from Vite
// This provides TypeScript autocompletion and type checking for the config
import { defineConfig } from "vite";

// Import the official React plugin for Vite
// This plugin enables:
// - JSX transformation (converts JSX syntax to JavaScript)
// - Fast Refresh (hot reload React components without losing state)
// - Optimized builds for React applications
import react from "@vitejs/plugin-react";

// =================================================================
// EXPORT CONFIGURATION
// =================================================================
// defineConfig() validates and exports the Vite configuration
export default defineConfig({
  // =================================================================
  // PLUGINS
  // =================================================================
  // Plugins extend Vite's functionality
  // The React plugin is essential for any React project
  plugins: [react()],

  // =================================================================
  // DEVELOPMENT SERVER CONFIGURATION
  // =================================================================
  // These settings ONLY apply during development (npm run dev)
  // They are NOT used in production builds
  server: {
    // Port for the development server
    // Your React app will run at http://localhost:3000 during development
    port: 3000,

    // =================================================================
    // PROXY CONFIGURATION (Development only)
    // =================================================================
    // WHAT IS A PROXY?
    // A proxy forwards requests from one server to another
    // 
    // WHY DO WE NEED IT?
    // During development:
    // - Frontend runs on http://localhost:3000 (Vite dev server)
    // - Backend runs on http://localhost:4000 (Express server)
    // - Browsers block cross-origin requests (CORS policy)
    // - Proxy solves this by making backend requests appear same-origin
    //
    // HOW IT WORKS:
    // 1. Frontend makes request to: /api/message
    // 2. Vite intercepts this request (sees /api prefix)
    // 3. Vite forwards it to: http://localhost:4000/api/message
    // 4. Backend responds to Vite
    // 5. Vite forwards response back to frontend
    // 6. Browser thinks it's all from localhost:3000 (no CORS issue!)
    //
    // IMPORTANT: This proxy is ONLY for development convenience
    // In production, nginx handles proxying (see nginx.conf)
    proxy: {
      // =================================================================
      // API PROXY RULE
      // =================================================================
      // "/api" - Match any request starting with /api
      "/api": {
        // target: The backend server to forward requests to
        // This should match where your Express server runs
        target: "http://localhost:4000",

        // changeOrigin: Modify the Origin header to match the target
        // TECHNICAL EXPLANATION:
        // - HTTP requests include an "Origin" header
        // - This tells the server where the request came from
        // - changeOrigin: true makes the Origin header say "http://localhost:4000"
        // - This prevents the backend from rejecting the proxied request
        // - Essential for virtual hosted sites and some security configurations
        changeOrigin: true,

        // secure: Whether to verify SSL certificates
        // false = Don't verify SSL certificates (okay for local development)
        // true = Verify SSL (use in production with HTTPS)
        // Since we're using http (not https) locally, this is false
        secure: false,

        // =================================================================
        // ADDITIONAL PROXY OPTIONS (commonly used)
        // =================================================================
        // Uncomment and modify as needed:

        // rewrite: Modify the request path before forwarding
        // Example: Remove /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
        
        // ws: Enable WebSocket proxying
        // ws: true,
        
        // configure: Custom proxy behavior
        // configure: (proxy, options) => {
        //   proxy.on('error', (err, req, res) => {
        //     console.log('Proxy error:', err);
        //   });
        // }
      },

      // =================================================================
      // EXAMPLE: Additional proxy rules
      // =================================================================
      // You can add multiple proxy rules for different paths:
      
      // Proxy WebSocket connections
      // "/socket.io": {
      //   target: "http://localhost:4000",
      //   ws: true,
      // },
      
      // Proxy to a different backend service
      // "/auth": {
      //   target: "http://localhost:5000",
      //   changeOrigin: true,
      // },
    },

    // =================================================================
    // OTHER USEFUL SERVER OPTIONS
    // =================================================================
    // Uncomment as needed:

    // host: Make server accessible from network (not just localhost)
    // host: true, // or '0.0.0.0'

    // open: Automatically open browser when dev server starts
    // open: true,

    // strictPort: Exit if port is already in use (instead of trying next port)
    // strictPort: true,

    // cors: Enable CORS for the dev server
    // cors: true,

    // hmr: Hot Module Replacement settings
    // hmr: {
    //   overlay: true, // Show errors as overlay in browser
    // },
  },

  // =================================================================
  // BUILD CONFIGURATION (Production)
  // =================================================================
  // These settings apply when running: npm run build
  // build: {
  //   outDir: 'dist', // Output directory for production build
  //   sourcemap: true, // Generate source maps for debugging
  //   minify: 'esbuild', // Minification tool (esbuild is faster)
  //   chunkSizeWarningLimit: 1000, // Warn if chunks exceed this size (KB)
  // },

  // =================================================================
  // PREVIEW SERVER (for testing production build locally)
  // =================================================================
  // Settings for: npm run preview
  // preview: {
  //   port: 3000,
  //   strictPort: true,
  // },
});

// =================================================================
// DEVELOPMENT VS PRODUCTION PROXY COMPARISON
// =================================================================
//
// DEVELOPMENT (this config):
// Request: fetch('/api/message')
// ├─> Vite dev server (localhost:3000)
// ├─> Proxy to Express (localhost:4000)
// └─> Response back to browser
//
// PRODUCTION (Docker with nginx):
// Request: fetch('/api/message')
// ├─> nginx (localhost:80)
// ├─> Proxy to Express container (backend:4000)
// └─> Response back to browser
//
// =================================================================
// COMMON ISSUES & SOLUTIONS
// =================================================================
//
// 1. PROXY NOT WORKING?
//    - Ensure backend is running (npm start in server folder)
//    - Check target URL matches backend port
//    - Verify /api path matches your fetch calls
//
// 2. CORS ERRORS DESPITE PROXY?
//    - Restart Vite dev server
//    - Clear browser cache
//    - Check browser console for actual error
//
// 3. 404 ERRORS ON API CALLS?
//    - Check if path starts with /api
//    - Verify backend route exists
//    - Check proxy rewrite rules
//
// =================================================================
