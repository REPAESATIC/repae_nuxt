// composables/useOtel.ts
//
// API applicative pour émettre des logs, des métriques et des spans vers SigNoz.
// L'initialisation se fait dans app/plugins/00.otel.client.ts ; si l'instrumentation
// est désactivée (NUXT_PUBLIC_OTEL_ENABLED absent), les providers globaux sont des
// implémentations no-op fournies par l'API OpenTelemetry : les appels ci-dessous
// restent donc sûrs et silencieux, sans avoir à tester quoi que ce soit côté appelant.
//
// Exemples :
//   const { logInfo, logError, increment, recordDuration, withSpan } = useOtel()
//
//   logInfo('Connexion réussie', { 'user.role': 'ALUMNI' })
//   logError(error, { 'page.path': '/espace-it/profil' })
//   increment('repae.candidature.envoyee', { 'offre.id': offreId })
//   recordDuration('repae.recherche.duree', 128, { 'recherche.type': 'annuaire' })
//
//   const alumni = await withSpan('chargement annuaire', () => $fetch('/alumnis'))

import { SpanStatusCode, metrics, trace } from '@opentelemetry/api'
import type { Attributes, Span } from '@opentelemetry/api'
import { SeverityNumber, logs } from '@opentelemetry/api-logs'

const SCOPE = 'repae-frontend'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const SEVERITY: Record<LogLevel, { number: SeverityNumber, text: string }> = {
  debug: { number: SeverityNumber.DEBUG, text: 'DEBUG' },
  info: { number: SeverityNumber.INFO, text: 'INFO' },
  warn: { number: SeverityNumber.WARN, text: 'WARN' },
  error: { number: SeverityNumber.ERROR, text: 'ERROR' },
}

export const useOtel = () => {
  const tracer = trace.getTracer(SCOPE)
  const logger = logs.getLogger(SCOPE)
  const meter = metrics.getMeter(SCOPE)

  // Les instruments de métrique doivent être réutilisés : on les mémorise par nom.
  const counters = new Map<string, ReturnType<typeof meter.createCounter>>()
  const histograms = new Map<string, ReturnType<typeof meter.createHistogram>>()

  /** Contexte ajouté à chaque log : page courante. */
  const baseAttributes = (): Attributes => ({
    'page.path': typeof window !== 'undefined' ? window.location.pathname : '',
  })

  /** Émet un log corrélé automatiquement à la trace active, s'il y en a une. */
  const log = (level: LogLevel, message: string, attributes: Attributes = {}) => {
    const severity = SEVERITY[level]
    logger.emit({
      severityNumber: severity.number,
      severityText: severity.text,
      body: message,
      attributes: { ...baseAttributes(), ...attributes },
    })
  }

  const logDebug = (message: string, attributes?: Attributes) => log('debug', message, attributes)
  const logInfo = (message: string, attributes?: Attributes) => log('info', message, attributes)
  const logWarn = (message: string, attributes?: Attributes) => log('warn', message, attributes)

  /** Accepte une Error (stack et type extraits) ou un simple message. */
  const logError = (error: unknown, attributes: Attributes = {}) => {
    const err = error instanceof Error ? error : null
    log('error', err?.message ?? String(error), {
      'error.type': err?.name ?? 'Error',
      'error.stack': err?.stack ?? '',
      ...attributes,
    })
  }

  /** Incrémente un compteur (créé à la volée au premier appel). */
  const increment = (name: string, attributes: Attributes = {}, value = 1) => {
    let counter = counters.get(name)
    if (!counter) {
      counter = meter.createCounter(name)
      counters.set(name, counter)
    }
    counter.add(value, attributes)
  }

  /** Enregistre une valeur dans un histogramme (durées, tailles, scores...). */
  const recordDuration = (name: string, value: number, attributes: Attributes = {}, unit = 'ms') => {
    let histogram = histograms.get(name)
    if (!histogram) {
      histogram = meter.createHistogram(name, { unit })
      histograms.set(name, histogram)
    }
    histogram.record(value, attributes)
  }

  /**
   * Exécute une fonction dans une span dédiée.
   * La span est clôturée automatiquement, y compris en cas d'erreur (statut ERROR
   * + exception enregistrée), puis l'erreur est relancée à l'appelant.
   */
  const withSpan = async <T>(
    name: string,
    fn: (span: Span) => T | Promise<T>,
    attributes: Attributes = {},
  ): Promise<T> => {
    return tracer.startActiveSpan(name, { attributes }, async (span) => {
      try {
        const result = await fn(span)
        span.setStatus({ code: SpanStatusCode.OK })
        return result
      }
      catch (error) {
        span.recordException(error as Error)
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : String(error),
        })
        throw error
      }
      finally {
        span.end()
      }
    })
  }

  /** Ajoute des attributs à la span active (ex. l'id de l'utilisateur connecté). */
  const setSpanAttributes = (attributes: Attributes) => {
    trace.getActiveSpan()?.setAttributes(attributes)
  }

  /** Ajoute un évènement horodaté sur la span active. */
  const addSpanEvent = (name: string, attributes?: Attributes) => {
    trace.getActiveSpan()?.addEvent(name, attributes)
  }

  return {
    log,
    logDebug,
    logInfo,
    logWarn,
    logError,
    increment,
    recordDuration,
    withSpan,
    setSpanAttributes,
    addSpanEvent,
  }
}
