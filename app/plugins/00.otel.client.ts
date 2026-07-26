// plugins/00.otel.client.ts
//
// Point d'entrée de l'instrumentation OpenTelemetry -> SigNoz (self-hosted).
//
// Le SDK OpenTelemetry pèse ~185 Ko gzip : il est chargé en import dynamique et le plugin
// est déclaré `parallel: true`, si bien que le téléchargement n'entre pas dans le bundle
// d'entrée et ne retarde pas le démarrage de l'application. Contrepartie assumée : les
// tout premiers appels réseau, émis avant la fin de ce chargement, peuvent échapper aux
// instrumentations fetch/XHR. Le chargement de page reste couvert par DocumentLoad, qui
// lit rétroactivement les timings du navigateur.
//
// Quand NUXT_PUBLIC_OTEL_ENABLED n'est pas à "true", le module n'est jamais téléchargé.
//
// Le préfixe « 00. » place ce plugin avant les autres, pour que l'instrumentation
// s'installe le plus tôt possible dans le cycle de vie de l'application.

export default defineNuxtPlugin({
  name: 'repae-otel',
  parallel: true,
  async setup(nuxtApp) {
    const config = useRuntimeConfig()
    const otel = config.public.otel as Record<string, string> | undefined

    if (String(otel?.enabled ?? '') !== 'true') return

    try {
      const { setupOtel } = await import('~/otel/instrumentation')
      setupOtel(nuxtApp)
    }
    catch (error) {
      // L'observabilité ne doit jamais casser l'application.
      console.warn('[otel] instrumentation non initialisée :', error)
    }
  },
})
