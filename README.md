# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Observability with SigNoz and OpenTelemetry

This app is prepared to send traces through OpenTelemetry. The Docker image enables the auto-instrumentation bootstrap with `NODE_OPTIONS=--require @opentelemetry/auto-instrumentations-node/register`, and the runtime config is driven by environment variables.

Use a collector endpoint when you already have an OTel Collector in place. In that case, set:

- `OTEL_TRACES_EXPORTER=otlp`
- `OTEL_EXPORTER_OTLP_ENDPOINT=http://<collector-host>:4318` or `http://<collector-host>:4317` if your collector uses gRPC
- `OTEL_SERVICE_NAME=repae-frontend`
- `OTEL_RESOURCE_ATTRIBUTES=service.version=<git-sha-or-release>`
- `OTEL_EXPORTER_OTLP_HEADERS=signoz-ingestion-key=<key>` only if your collector forwards directly to SigNoz Cloud and expects the ingestion key

If your collector forwards to SigNoz internally, the app should talk only to the collector and not directly to SigNoz. For a direct-to-SigNoz setup, replace the endpoint with `https://ingest.<region>.signoz.cloud:443` and keep the ingestion key header.

Recommended validation path:

1. Start the app with the collector reachable from the container network.
2. Generate traffic on the Nuxt app.
3. Check the collector logs and then SigNoz Services/Traces.
4. If nothing appears, temporarily set `OTEL_LOG_LEVEL=debug` to inspect export errors.
