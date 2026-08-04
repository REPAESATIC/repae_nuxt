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

      // URL publique du site, sans slash final (ex : https://alumni-esatic.com).
      // Indispensable au prérendu : `useRequestURL()` y renvoie l'origine du serveur de build
      // (localhost), ce qui produirait des liens de partage et des `og:url` inutilisables.
      // Surchargeable via NUXT_PUBLIC_SITE_URL.
      siteUrl: '',

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

  // Prérendu des pages de contenu (actualités, événements)
  //
  // Les robots de Facebook, LinkedIn et WhatsApp n'exécutent pas le JavaScript : sur une page
  // servie en SPA, ils ne voient aucune balise Open Graph et l'aperçu du lien partagé reste vide.
  // On génère donc un vrai fichier HTML par contenu publié, que Firebase Hosting sert avant de
  // retomber sur le fallback SPA.
  //
  // Conséquence à connaître : un contenu publié APRÈS le déploiement n'a pas encore de fichier
  // HTML — son aperçu restera générique jusqu'au prochain `pnpm generate && firebase deploy`.
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Le prérendu n'a de sens qu'au build statique
      if (nitroConfig.dev) return

      const apiBase = (process.env.NUXT_PUBLIC_CONTENT_API_BASE || '').replace(/\/+$/, '')
      if (!apiBase) {
        console.warn('[prerender] NUXT_PUBLIC_CONTENT_API_BASE absent : aucune page de contenu ne sera prérendue (aperçus de partage indisponibles).')
        return
      }

      // Une API injoignable ne doit pas faire échouer le build : on se contente d'avertir,
      // le site reste déployable et les pages retombent sur le rendu client.
      const collect = async (endpoint: string, prefix: string): Promise<string[]> => {
        try {
          const response = await fetch(`${apiBase}/${endpoint}?status=PUBLISHED&limit=1000`)
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const result = await response.json() as { data?: { id: string }[] }
          return (result?.data || []).map(item => `${prefix}/${item.id}`)
        } catch (e) {
          console.warn(`[prerender] Impossible de lister ${endpoint} depuis ${apiBase} :`, (e as Error).message)
          return []
        }
      }

      const [newsRoutes, eventRoutes] = await Promise.all([
        collect('news', '/actualites'),
        collect('events', '/evenements'),
      ])

      const routes = [...newsRoutes, ...eventRoutes]
      console.info(`[prerender] ${newsRoutes.length} actualité(s) et ${eventRoutes.length} événement(s) à prérendre.`)

      nitroConfig.prerender ||= {}
      nitroConfig.prerender.routes = [...(nitroConfig.prerender.routes || []), ...routes]
      // Une page de contenu supprimée entre-temps ne doit pas interrompre la génération
      nitroConfig.prerender.failOnError = false
    },
  },
})
