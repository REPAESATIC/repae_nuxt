import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
  ],

  // Global CSS (Tailwind v4 + Font Awesome + Animate.css)
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/tailwind.css',
    'animate.css',
  ],

  // App configuration with dark mode script
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
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

  // Runtime config pour les URLs API
  // Surchargeables via .env : NUXT_PUBLIC_CONTENT_API_BASE, NUXT_PUBLIC_IDENTITY_API_BASE
  runtimeConfig: {
    public: {
      contentApiBase: '',
      identityApiBase: '',
      umamiId: '',
      umamiHost: '',

      // Observabilité SigNoz / OpenTelemetry (voir app/plugins/00.otel.client.ts)
      // Toutes ces valeurs sont surchargeables via .env avec le préfixe NUXT_PUBLIC_OTEL_*
      otel: {
        // 'true' pour activer l'instrumentation (désactivée par défaut en local)
        enabled: '',
        // Base du collecteur OTLP/HTTP self-hosted, ex : https://otel.alumni-esatic.com
        // Les chemins /v1/traces, /v1/logs, /v1/metrics sont ajoutés automatiquement
        collectorUrl: '',
        // Surcharges optionnelles si les signaux passent par des endpoints différents
        tracesUrl: '',
        logsUrl: '',
        metricsUrl: '',
        // Identité du service telle qu'elle apparaîtra dans SigNoz
        serviceName: 'repae-frontend',
        serviceVersion: '',
        environment: 'development',
        // Échantillonnage des traces : 1 = 100 %, 0.2 = 20 %
        tracesSampleRate: '1',
        // Intervalle d'export des métriques (ms)
        metricsInterval: '60000',
        // Instrumentations optionnelles
        userInteraction: 'true',
        webVitals: 'true',
        // 'true' pour activer les logs de diagnostic OTel dans la console
        debug: '',
      },
    },
  },

  // Font Awesome: configured via app/plugins/fontawesome.ts
})
