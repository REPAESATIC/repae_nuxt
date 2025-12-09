import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
  ],

  // Global CSS (Tailwind v4 + Font Awesome)
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/tailwind.css',
  ],

  // App configuration with dark mode script
  app: {
    head: {
      script: [
        {
          // Inline script to prevent flash of wrong theme
          // Runs immediately before page render
          innerHTML: `
            (function() {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Vite configuration with Tailwind v4 plugin
  vite: {
    plugins: [tailwindcss()],
  },

  // Font Awesome: configured via app/plugins/fontawesome.ts
})
