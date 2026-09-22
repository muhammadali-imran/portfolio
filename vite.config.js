import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 runs through its Vite plugin: no postcss.config.js or tailwind.config.js needed.
export default defineConfig(({ mode }) =>{

  const env = loadEnv(mode, process.cwd(), '');
  
  // Fallback order: VITE_SITE_URL -> Vercel Deployment URL -> localhost
  const siteUrl = env.VITE_SITE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');

  return {

    plugins: [
      react(), 
      tailwindcss()
    ],
    // Inject VITE_SITE_URL for HTML replacement even if missing in .env
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    },
    transformIndexHtml(html) {
      return html.replace(/%VITE_SITE_URL%/g, siteUrl);
    },
  };
});
