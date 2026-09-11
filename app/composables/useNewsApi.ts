// Composable pour les appels API News (CRUD) vers content-services

export interface NewsAuthor {
  id: string
  fullName: string
  avatarUrl?: string
}

export interface NewsItem {
  id: string
  title: string
  slug: string
  content: string
  summary?: string
  coverImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  isFeatured: boolean
  publishedAt?: string
  author: NewsAuthor
  categoryId: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedNews {
  data: NewsItem[]
  total: number
  page: number
  limit: number
}

export interface CreateNewsPayload {
  title: string
  content: string
  authorId: string
  authorFullName: string
  categoryId: string
  summary?: string
  slug?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  coverImage?: File | null
  authorAvatarUrl?: string
}

export interface UpdateNewsPayload {
  title?: string
  slug?: string
  content?: string
  summary?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  coverImage?: File | null
  categoryId?: string
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  hexColor: string
  bgHexColor: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedCategories {
  data: CategoryItem[]
  total: number
  page: number
  limit: number
}

export interface CreateCategoryPayload {
  name: string
  slug?: string
  hexColor?: string
  bgHexColor?: string
}

export interface UpdateCategoryPayload {
  name?: string
  slug?: string
  hexColor?: string
  bgHexColor?: string
}

// Codes pour lesquels une seconde tentative a un sens : le serveur n'a pas
// traite la demande, la rejouer telle quelle ne change donc rien a son etat.
const CODES_REJOUABLES = [500, 502, 503, 504]

/**
 * Rejoue une fois une requete tombee sur une erreur serveur.
 *
 * content-services televerse l'image vers MinIO AVANT d'ecrire l'actualite en
 * base, et `MinioStorageService.upload()` ne capture pas ses erreurs : tant que
 * MinIO n'est pas joignable — la fenetre qui suit un redeploiement — la requete
 * echoue en 500 sans que rien ne soit persiste. D'ou le « Internal server
 * error » a la premiere soumission qui disparait a la seconde.
 *
 * Le slug etant unique cote serveur, une actualite qui aurait malgre tout ete
 * creee ferait echouer la reprise en 409 plutot que de produire un doublon.
 */
const withServerErrorRetry = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request()
  } catch (error: any) {
    const status = error?.response?.status ?? error?.statusCode ?? error?.status
    if (!CODES_REJOUABLES.includes(status)) throw error

    await new Promise((resolve) => setTimeout(resolve, 900))
    return await request()
  }
}

export function useNewsApi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.contentApiBase as string

  // En-tetes Authorization (JWT admin) centralises pour les routes protegees
  const { getAuthHeaders } = useAdminAuth()

  const fetchNewsList = async (params?: {
    search?: string
    categoryId?: string
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    featured?: boolean
    page?: number
    limit?: number
  }): Promise<PaginatedNews> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.categoryId) query.set('categoryId', params.categoryId)
    if (params?.status) query.set('status', params.status)
    if (params?.featured !== undefined) query.set('featured', String(params.featured))
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))

    const qs = query.toString()
    return await $fetch<PaginatedNews>(`${baseUrl}/news${qs ? `?${qs}` : ''}`)
  }

  const fetchNews = async (id: string): Promise<NewsItem> => {
    return await $fetch<NewsItem>(`${baseUrl}/news/${id}`)
  }

  const createNews = async (payload: CreateNewsPayload): Promise<NewsItem> => {
    // Reconstruit a chaque tentative : un FormData consomme son fichier.
    const buildBody = () => {
      const formData = new FormData()
      formData.append('title', payload.title)
      formData.append('content', payload.content)
      formData.append('authorId', payload.authorId)
      formData.append('authorFullName', payload.authorFullName)
      formData.append('categoryId', payload.categoryId)
      if (payload.summary) formData.append('summary', payload.summary)
      if (payload.slug) formData.append('slug', payload.slug)
      if (payload.authorAvatarUrl) formData.append('authorAvatarUrl', payload.authorAvatarUrl)
      if (payload.status) formData.append('status', payload.status)
      if (payload.coverImage) formData.append('coverImage', payload.coverImage)
      return formData
    }

    return await withServerErrorRetry(() =>
      $fetch<NewsItem>(`${baseUrl}/news`, {
        method: 'POST',
        body: buildBody(),
        headers: getAuthHeaders(),
      }),
    )
  }

  const updateNews = async (id: string, payload: UpdateNewsPayload): Promise<NewsItem> => {
    const buildBody = () => {
      const formData = new FormData()
      if (payload.title !== undefined) formData.append('title', payload.title)
      if (payload.slug !== undefined) formData.append('slug', payload.slug)
      if (payload.content !== undefined) formData.append('content', payload.content)
      if (payload.summary !== undefined) formData.append('summary', payload.summary)
      if (payload.categoryId !== undefined) formData.append('categoryId', payload.categoryId)
      if (payload.status !== undefined) formData.append('status', payload.status)
      if (payload.coverImage) formData.append('coverImage', payload.coverImage)
      return formData
    }

    return await withServerErrorRetry(() =>
      $fetch<NewsItem>(`${baseUrl}/news/${id}`, {
        method: 'PUT',
        body: buildBody(),
        headers: getAuthHeaders(),
      }),
    )
  }

  // Le serveur n'autorise la suppression qu'en statut DRAFT ou ARCHIVED (400 sinon)
  const deleteNews = async (id: string): Promise<void> => {
    await $fetch<void>(`${baseUrl}/news/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
  }

  const fetchCategories = async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<PaginatedCategories> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    query.set('limit', String(params?.limit ?? 100))

    const qs = query.toString()
    return await $fetch<PaginatedCategories>(`${baseUrl}/categories${qs ? `?${qs}` : ''}`)
  }

  const fetchCategory = async (id: string): Promise<CategoryItem> => {
    return await $fetch<CategoryItem>(`${baseUrl}/categories/${id}`)
  }

  const createCategory = async (payload: CreateCategoryPayload): Promise<CategoryItem> => {
    return await $fetch<CategoryItem>(`${baseUrl}/categories`, {
      method: 'POST',
      body: payload,
      headers: getAuthHeaders(),
    })
  }

  const updateCategory = async (id: string, payload: UpdateCategoryPayload): Promise<CategoryItem> => {
    return await $fetch<CategoryItem>(`${baseUrl}/categories/${id}`, {
      method: 'PUT',
      body: payload,
      headers: getAuthHeaders(),
    })
  }

  return {
    fetchNewsList,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
  }
}
