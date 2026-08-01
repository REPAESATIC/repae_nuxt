// Partage d'un contenu (actualité, événement) sur les réseaux sociaux.
//
// Deux pièges que ce composable centralise :
//
// 1. Les réseaux sociaux exigent une URL ABSOLUE. Passer `route.fullPath` ne transmet que le
//    chemin (`/actualites/xxx`) : Facebook et LinkedIn le rejettent silencieusement et se
//    contentent d'ouvrir leur page d'accueil, d'où l'impression d'une simple redirection.
//
// 2. Au prérendu, `useRequestURL()` renvoie l'origine du serveur de build (`http://localhost`).
//    On privilégie donc `NUXT_PUBLIC_SITE_URL`, en retombant sur l'origine courante côté client.

import type { MaybeRefOrGetter } from 'vue'

export interface ContentShareOptions {
  /** Chemin de la page, avec slash initial (ex : `/actualites/abc123`) */
  path: MaybeRefOrGetter<string>
  /** Titre affiché dans le message pré-rempli */
  title: MaybeRefOrGetter<string>
}

export function useContentShare(options: ContentShareOptions) {
  const config = useRuntimeConfig()
  const requestUrl = useRequestURL()

  const origin = computed(() => {
    const configured = (config.public.siteUrl as string || '').replace(/\/+$/, '')
    return configured || requestUrl.origin
  })

  const shareUrl = computed(() => `${origin.value}${toValue(options.path)}`)
  const shareTitle = computed(() => toValue(options.title))

  const shareLinks = computed(() => {
    const url = encodeURIComponent(shareUrl.value)
    const title = encodeURIComponent(shareTitle.value)
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      // `shareArticle` est déprécié et ignore désormais les paramètres : `share-offsite` est l'endpoint actuel
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle.value} ${shareUrl.value}`)}`,
    }
  })

  const linkCopied = ref(false)
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl.value)
      linkCopied.value = true
      setTimeout(() => { linkCopied.value = false }, 2000)
    } catch (e) {
      console.error('Copie du lien impossible:', e)
    }
  }

  /** Rend une image absolue : les crawlers ignorent un `og:image` relatif. */
  const toAbsoluteUrl = (url?: string | null): string => {
    if (!url) return ''
    if (/^https?:\/\//i.test(url)) return url
    return `${origin.value}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return { origin, shareUrl, shareTitle, shareLinks, linkCopied, copyShareLink, toAbsoluteUrl }
}
