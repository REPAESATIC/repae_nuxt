# ─── Stage 1 : build ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Installer pnpm (version figée pour éviter les changements de comportement)
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

WORKDIR /app

# Copier les fichiers de dépendances en premier (layer cache)
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances (y compris devDependencies nécessaires au build)
RUN pnpm install --frozen-lockfile

# Copier le reste du projet
COPY . .

# Build Nuxt (génère .output/)
RUN pnpm build

# ─── Stage 2 : production ────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Copier uniquement le résultat du build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# OpenTelemetry: defaults can be overridden at runtime via docker compose or .env
ENV OTEL_TRACES_EXPORTER="otlp"
ENV OTEL_NODE_RESOURCE_DETECTORS="env,host,os"
ENV OTEL_SERVICE_NAME="repae-frontend"
ENV OTEL_RESOURCE_ATTRIBUTES="service.version=dev"
ENV NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"

EXPOSE 3000

CMD ["node", "server/index.mjs"]
