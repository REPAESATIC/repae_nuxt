// otel/instrumentation.ts
//
// Instrumentation OpenTelemetry du front REPAE vers SigNoz (self-hosted).
// Trois signaux sont envoyés au collecteur OTLP/HTTP :
//   - traces   -> {collectorUrl}/v1/traces   (chargement de page, fetch/XHR, navigations, clics)
//   - logs     -> {collectorUrl}/v1/logs     (erreurs globales + logs applicatifs via useOtel())
//   - métriques-> {collectorUrl}/v1/metrics  (Web Vitals, pages vues, erreurs + compteurs custom)
//
// Tout est piloté par les variables d'environnement NUXT_PUBLIC_OTEL_* (voir .env.example).
// En self-hosted aucun header d'ingestion n'est nécessaire : seule l'URL du collecteur suffit.
//
// Ce module pèse ~185 Ko gzip : il est volontairement isolé du reste de l'application et
// chargé en import dynamique par app/plugins/00.otel.client.ts, afin de ne pas alourdir
// le bundle d'entrée. Il n'est jamais téléchargé quand l'instrumentation est désactivée.

import { DiagConsoleLogger, DiagLogLevel, diag, metrics, trace } from '@opentelemetry/api'
import { logs } from '@opentelemetry/api-logs'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions'
import { BatchSpanProcessor, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs'
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { SeverityNumber } from '@opentelemetry/api-logs'

/** Retire le slash final et un éventuel chemin /v1/... déjà présent. */
function normalizeCollectorUrl(url: string): string {
  return url.trim().replace(/\/+$/, '').replace(/\/v1\/(traces|logs|metrics)$/, '')
}

/** Construit l'URL d'un signal : surcharge explicite sinon {base}/v1/{signal}. */
function signalUrl(base: string, override: string, signal: 'traces' | 'logs' | 'metrics'): string {
  return override.trim() ? override.trim() : `${base}/v1/${signal}`
}

/** Origine d'une URL, sous forme d'expression régulière échappée. */
function originPattern(url: string): RegExp | null {
  if (!url) return null
  try {
    const { origin } = new URL(url, window.location.origin)
    return new RegExp(`^${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
  }
  catch {
    return null
  }
}

/**
 * Identifiant de session navigateur, conservé le temps de l'onglet.
 * Permet dans SigNoz de regrouper toutes les traces/logs d'un même parcours utilisateur.
 */
function getSessionId(): string {
  const key = 'repae.otel.session_id'
  try {
    const existing = window.sessionStorage.getItem(key)
    if (existing) return existing
    const id = (window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`)
    window.sessionStorage.setItem(key, id)
    return id
  }
  catch {
    // sessionStorage indisponible (navigation privée, cookies bloqués)
    return 'unknown'
  }
}

export function setupOtel(nuxtApp: ReturnType<typeof useNuxtApp>) {
  const config = useRuntimeConfig()
  const otel = config.public.otel as Record<string, string>

  const collectorUrl = normalizeCollectorUrl(String(otel?.collectorUrl ?? ''))

  if (!collectorUrl && !otel.tracesUrl && !otel.logsUrl && !otel.metricsUrl) {
    console.warn('[otel] NUXT_PUBLIC_OTEL_ENABLED=true mais NUXT_PUBLIC_OTEL_COLLECTOR_URL est vide — instrumentation ignorée.')
    return
  }

  if (String(otel?.debug ?? '') === 'true') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)
  }

  const tracesUrl = signalUrl(collectorUrl, String(otel?.tracesUrl ?? ''), 'traces')
  const logsUrl = signalUrl(collectorUrl, String(otel?.logsUrl ?? ''), 'logs')
  const metricsUrl = signalUrl(collectorUrl, String(otel?.metricsUrl ?? ''), 'metrics')

  // --- Ressource commune aux trois signaux -----------------------------------
  const environment = String(otel?.environment ?? 'development')
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: String(otel?.serviceName ?? 'repae-frontend'),
    [ATTR_SERVICE_VERSION]: String(otel?.serviceVersion ?? ''),
    // SigNoz utilise deployment.environment ; la clé .name est la version récente de la convention
    'deployment.environment': environment,
    'deployment.environment.name': environment,
    'session.id': getSessionId(),
    'browser.language': navigator.language,
    'browser.mobile': /Mobi|Android/i.test(navigator.userAgent),
    'user_agent.original': navigator.userAgent,
  })

  // --- Traces ----------------------------------------------------------------
  const sampleRate = Number.parseFloat(String(otel?.tracesSampleRate ?? '1'))
  const tracerProvider = new WebTracerProvider({
    resource,
    sampler: new TraceIdRatioBasedSampler(Number.isFinite(sampleRate) ? sampleRate : 1),
    spanProcessors: [
      new BatchSpanProcessor(new OTLPTraceExporter({ url: tracesUrl })),
    ],
  })

  tracerProvider.register({ contextManager: new ZoneContextManager() })

  // On ne propage l'en-tête traceparent que vers nos propres APIs : l'envoyer à
  // des domaines tiers déclencherait des échecs de preflight CORS.
  const propagateTraceHeaderCorsUrls = [
    originPattern(String(config.public.contentApiBase ?? '')),
    originPattern(String(config.public.identityApiBase ?? '')),
    originPattern(window.location.origin),
  ].filter((pattern): pattern is RegExp => pattern !== null)

  // Les requêtes vers le collecteur lui-même ne doivent pas être tracées (boucle infinie).
  const ignoreUrls = [
    originPattern(collectorUrl || tracesUrl),
    originPattern(String(config.public.umamiHost ?? '')),
  ].filter((pattern): pattern is RegExp => pattern !== null)

  registerInstrumentations({
    tracerProvider,
    instrumentations: [
      // Un chargement de page produit une span par ressource statique. `ignoreNetworkEvents`
      // supprime la vingtaine d'évènements de timing attachés à chacune : le volume envoyé
      // au collecteur chute fortement sans perdre les durées, qui restent portées par les spans.
      new DocumentLoadInstrumentation({ ignoreNetworkEvents: true }),
      new FetchInstrumentation({ propagateTraceHeaderCorsUrls, ignoreUrls }),
      new XMLHttpRequestInstrumentation({ propagateTraceHeaderCorsUrls, ignoreUrls }),
      ...(String(otel?.userInteraction ?? '') === 'true'
        ? [new UserInteractionInstrumentation({ eventNames: ['click', 'submit'] })]
        : []),
    ],
  })

  // --- Logs ------------------------------------------------------------------
  // Note : depuis @opentelemetry/sdk-logs 0.2x, BatchLogRecordProcessor attend un objet
  // d'options ({ exporter }) et non plus l'exporteur en argument direct — contrairement à
  // ce que montre encore la documentation SigNoz. Passer l'exporteur directement compile
  // sans erreur mais fait échouer silencieusement chaque export.
  const loggerProvider = new LoggerProvider({
    resource,
    processors: [
      new BatchLogRecordProcessor({ exporter: new OTLPLogExporter({ url: logsUrl }) }),
    ],
  })
  logs.setGlobalLoggerProvider(loggerProvider)

  // --- Métriques -------------------------------------------------------------
  const exportInterval = Number.parseInt(String(otel?.metricsInterval ?? '60000'), 10)
  const meterProvider = new MeterProvider({
    resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({ url: metricsUrl }),
        exportIntervalMillis: Number.isFinite(exportInterval) ? exportInterval : 60000,
      }),
    ],
  })
  metrics.setGlobalMeterProvider(meterProvider)

  // --- Instrumentation applicative -------------------------------------------
  const tracer = trace.getTracer('repae-frontend')
  const logger = logs.getLogger('repae-frontend')
  const meter = metrics.getMeter('repae-frontend')

  const pageViewCounter = meter.createCounter('repae.page.views', {
    description: 'Nombre de pages vues côté front',
  })
  const errorCounter = meter.createCounter('repae.errors', {
    description: 'Nombre d\'erreurs JavaScript non capturées',
  })
  const navigationDuration = meter.createHistogram('repae.navigation.duration', {
    description: 'Durée des navigations côté client',
    unit: 'ms',
  })

  /** Navigations SPA : une span + une métrique par changement de route. */
  const router = nuxtApp.$router as ReturnType<typeof useRouter> | undefined
  if (router) {
    let navigationStart = 0

    router.beforeEach(() => {
      navigationStart = performance.now()
      return true
    })

    router.afterEach((to, from, failure) => {
      const duration = navigationStart ? performance.now() - navigationStart : 0
      const attributes = {
        'page.route': to.matched[to.matched.length - 1]?.path ?? to.path,
        'page.path': to.path,
        'page.from': from.path,
      }

      const span = tracer.startSpan(`navigation ${attributes['page.route']}`, {
        attributes: { ...attributes, 'navigation.type': 'route-change' },
      })
      if (failure) span.recordException(failure as Error)
      span.end()

      pageViewCounter.add(1, attributes)
      if (duration) navigationDuration.record(duration, attributes)
    })
  }

  /** Erreurs Vue non capturées -> log ERROR corrélé à la trace en cours. */
  nuxtApp.hook('vue:error', (error, _instance, info) => {
    const err = error as Error
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: err?.message ?? String(error),
      attributes: {
        'error.type': err?.name ?? 'VueError',
        'error.stack': err?.stack ?? '',
        'vue.info': info,
        'page.path': window.location.pathname,
      },
    })
    errorCounter.add(1, { 'error.source': 'vue' })
  })

  /** Erreurs JS globales et promesses rejetées. */
  window.addEventListener('error', (event) => {
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: event.message || 'Erreur JavaScript non capturée',
      attributes: {
        'error.type': event.error?.name ?? 'Error',
        'error.stack': event.error?.stack ?? '',
        'code.filepath': event.filename ?? '',
        'code.lineno': event.lineno ?? 0,
        'page.path': window.location.pathname,
      },
    })
    errorCounter.add(1, { 'error.source': 'window' })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: reason?.message ?? String(reason),
      attributes: {
        'error.type': reason?.name ?? 'UnhandledRejection',
        'error.stack': reason?.stack ?? '',
        'page.path': window.location.pathname,
      },
    })
    errorCounter.add(1, { 'error.source': 'unhandledrejection' })
  })

  // --- Web Vitals (LCP, CLS, INP, FCP, TTFB) ---------------------------------
  if (String(otel?.webVitals ?? '') === 'true') {
    // Import dynamique : le module n'est chargé que si la fonctionnalité est active.
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const vitals = meter.createHistogram('repae.web_vitals', {
        description: 'Core Web Vitals mesurés chez l\'utilisateur',
        unit: 'ms',
      })

      const report = (metric: { name: string, value: number, rating: string, navigationType: string }) => {
        vitals.record(metric.value, {
          'web_vital.name': metric.name,
          'web_vital.rating': metric.rating,
          'web_vital.navigation_type': metric.navigationType,
          // CLS est sans unité, contrairement aux autres métriques exprimées en ms
          'web_vital.unit': metric.name === 'CLS' ? 'score' : 'ms',
          'page.path': window.location.pathname,
        })
      }

      onCLS(report)
      onFCP(report)
      onINP(report)
      onLCP(report)
      onTTFB(report)
    }).catch(() => {
      // web-vitals indisponible : on n'empêche pas le reste de l'instrumentation
    })
  }

  // --- Vidage des buffers avant fermeture de l'onglet -------------------------
  // Sans cela, les spans/logs/métriques encore en mémoire sont perdus.
  const flush = () => {
    void tracerProvider.forceFlush().catch(() => {})
    void loggerProvider.forceFlush().catch(() => {})
    void meterProvider.forceFlush().catch(() => {})
  }

  window.addEventListener('pagehide', flush)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
}
