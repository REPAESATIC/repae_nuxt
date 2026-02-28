# ─── Stage 1 : build ────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Installer pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

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
COPY --from=builder /app/.output ./

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "server/index.mjs"]
