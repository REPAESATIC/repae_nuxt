// Composable pour les appels API vers identity-service (alumni, promotions, departements, pays)

// ─── Alumni ────────────────────────────────────────────────────────────────────

export interface AlumniSkillItem {
  id: string
  name: string
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
}

export interface AlumniItem {
  id: string
  userId: string
  firstName: string
  lastName: string
  phoneNumber?: string
  city?: string
  address?: string
  bio?: string
  degree?: string
  photoUrl?: string
  coverPicUrl?: string
  portfolioUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  xUrl?: string
  isVerified: boolean
  isOpenToMentoring: boolean
  country?: string
  department?: string
  promotion?: number
  email?: string
  skills?: AlumniSkillItem[]
  createdAt: string
  updatedAt: string
}

export interface PaginatedAlumnis {
  data: AlumniItem[]
  total: number
  page: number
  limit: number
}

// ─── Promotions ────────────────────────────────────────────────────────────────

export interface PromotionItem {
  id: string
  year: number
  nickname?: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedPromotions {
  data: PromotionItem[]
  total: number
  page: number
  limit: number
}

// ─── Departements ──────────────────────────────────────────────────────────────

export interface DepartmentItem {
  id: string
  name: string
  acronym?: string | null
  description?: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedDepartments {
  data: DepartmentItem[]
  total: number
  page: number
  limit: number
}

// ─── Pays ──────────────────────────────────────────────────────────────────────

export interface CountryItem {
  id: string
  name: string
  isoCode: string
  phoneCode?: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedCountries {
  data: CountryItem[]
  total: number
  page: number
  limit: number
}

// ─── Auth / Registration ─────────────────────────────────────────────────────

export interface RegisterAlumniPayload {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  promotionId: string
  degree?: string
}

// ─── Composable ────────────────────────────────────────────────────────────────

export function useIdentityApi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.identityApiBase as string

  // ─── Auth / Registration ────────────────────────────────────────────────────

  const registerAlumni = async (payload: RegisterAlumniPayload): Promise<AlumniItem> => {
    return await $fetch<AlumniItem>(`${baseUrl}/auth/register/alumni`, {
      method: 'POST',
      body: payload,
    })
  }

  // ─── Alumni ──────────────────────────────────────────────────────────────────

  const fetchAlumniList = async (params?: {
    search?: string
    isVerified?: boolean
    isOpenToMentoring?: boolean
    promotionId?: string
    departmentId?: string
    countryId?: string
    page?: number
    limit?: number
  }): Promise<PaginatedAlumnis> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.isVerified !== undefined) query.set('isVerified', String(params.isVerified))
    if (params?.isOpenToMentoring !== undefined) query.set('isOpenToMentoring', String(params.isOpenToMentoring))
    if (params?.promotionId) query.set('promotionId', params.promotionId)
    if (params?.departmentId) query.set('departmentId', params.departmentId)
    if (params?.countryId) query.set('countryId', params.countryId)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))

    const qs = query.toString()
    return await $fetch<PaginatedAlumnis>(`${baseUrl}/alumnis${qs ? `?${qs}` : ''}`)
  }

  const fetchAlumni = async (id: string): Promise<AlumniItem> => {
    return await $fetch<AlumniItem>(`${baseUrl}/alumnis/${id}`)
  }

  const verifyAlumni = async (id: string): Promise<AlumniItem> => {
    return await $fetch<AlumniItem>(`${baseUrl}/alumnis/${id}/verify`, {
      method: 'PATCH',
    })
  }

  // ─── Promotions ──────────────────────────────────────────────────────────────

  const fetchPromotions = async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<PaginatedPromotions> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    query.set('limit', String(params?.limit ?? 100))

    const qs = query.toString()
    return await $fetch<PaginatedPromotions>(`${baseUrl}/promotions${qs ? `?${qs}` : ''}`)
  }

  // ─── Departements ────────────────────────────────────────────────────────────

  const fetchDepartments = async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<PaginatedDepartments> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    query.set('limit', String(params?.limit ?? 100))

    const qs = query.toString()
    return await $fetch<PaginatedDepartments>(`${baseUrl}/departments${qs ? `?${qs}` : ''}`)
  }

  // ─── Pays ────────────────────────────────────────────────────────────────────

  const fetchCountries = async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<PaginatedCountries> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    query.set('limit', String(params?.limit ?? 100))

    const qs = query.toString()
    return await $fetch<PaginatedCountries>(`${baseUrl}/countries${qs ? `?${qs}` : ''}`)
  }

  return {
    registerAlumni,
    fetchAlumniList,
    fetchAlumni,
    verifyAlumni,
    fetchPromotions,
    fetchDepartments,
    fetchCountries,
  }
}
