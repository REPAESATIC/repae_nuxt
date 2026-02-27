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

// ─── Users (Admin) ───────────────────────────────────────────────────────────

export interface UserItem {
  id: string
  email: string
  role: 'ADMIN' | 'ALUMNI' | 'STUDENT'
  status: 'PENDING' | 'ACTIVE' | 'BANNED'
  lastLogin?: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedUsers {
  data: UserItem[]
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

// ─── Work Experiences ────────────────────────────────────────────────────────

export interface WorkExperienceItem {
  id: string
  companyName: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  contractType: 'CDI' | 'CDD' | 'INTERNSHIP' | 'FREELANCE' | 'PART_TIME' | 'ALTERNATION' | 'VOLUNTEER'
  alumniId: string
  createdAt: string
  updatedAt: string
}

// ─── Education ───────────────────────────────────────────────────────────────

export interface EducationItem {
  id: string
  schoolName: string
  schoolAddress?: string
  degree: string
  fieldOfStudy: string
  grade?: string
  startDate: string
  endDate?: string
  description?: string
  alumniId: string
  createdAt: string
  updatedAt: string
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface ProjectSkillItem {
  id: string
  name: string
  groups?: string[]
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  client?: string
  endDate?: string
  projectUrl?: string
  imageUrl?: string
  alumniId: string
  skillGroups?: { id: string; name: string }[]
  skills?: ProjectSkillItem[]
  createdAt?: string
  updatedAt?: string
}

// ─── Update Alumni Payload ───────────────────────────────────────────────────

export interface UpdateAlumniPayload {
  firstName?: string
  lastName?: string
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
  isOpenToMentoring?: boolean
  countryId?: string
  departmentId?: string
  promotionId?: string
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

  // ─── IT Auth ─────────────────────────────────────────────────────────────────

  const getItAuthHeaders = () => {
    const token = import.meta.client ? localStorage.getItem('it-token') : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // ─── My Alumni Profile (authenticated IT user) ─────────────────────────────

  const fetchMyAlumni = async (): Promise<AlumniItem> => {
    return await $fetch<AlumniItem>(`${baseUrl}/alumnis/my`, {
      headers: getItAuthHeaders(),
    })
  }

  const updateMyAlumni = async (payload: UpdateAlumniPayload): Promise<AlumniItem> => {
    return await $fetch<AlumniItem>(`${baseUrl}/alumnis/my`, {
      method: 'PUT',
      body: payload,
      headers: getItAuthHeaders(),
    })
  }

  // ─── Work Experiences ─────────────────────────────────────────────────────────

  const fetchWorkExperiences = async (alumniId: string): Promise<WorkExperienceItem[]> => {
    return await $fetch<WorkExperienceItem[]>(`${baseUrl}/work-experiences/alumni/${alumniId}`)
  }

  // ─── Educations ───────────────────────────────────────────────────────────────

  const fetchEducations = async (alumniId: string): Promise<EducationItem[]> => {
    return await $fetch<EducationItem[]>(`${baseUrl}/educations/alumni/${alumniId}`)
  }

  // ─── Projects ─────────────────────────────────────────────────────────────────

  const fetchProjects = async (alumniId: string): Promise<ProjectItem[]> => {
    return await $fetch<ProjectItem[]>(`${baseUrl}/projects/alumni/${alumniId}`)
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
    const token = import.meta.client ? localStorage.getItem('admin-token') : null
    return await $fetch<AlumniItem>(`${baseUrl}/alumnis/${id}/verify`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
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

  const createPromotion = async (payload: { year: number; nickname?: string }): Promise<PromotionItem> => {
    return await $fetch<PromotionItem>(`${baseUrl}/promotions`, {
      method: 'POST',
      body: payload,
    })
  }

  const updatePromotion = async (id: string, payload: { year?: number; nickname?: string | null }): Promise<PromotionItem> => {
    return await $fetch<PromotionItem>(`${baseUrl}/promotions/${id}`, {
      method: 'PUT',
      body: payload,
    })
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

  // ─── Users (Admin) ──────────────────────────────────────────────────────────

  const getAuthHeaders = () => {
    const token = import.meta.client ? localStorage.getItem('admin-token') : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const fetchUsers = async (params?: {
    search?: string
    role?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedUsers> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.role) query.set('role', params.role)
    if (params?.status) query.set('status', params.status)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))

    const qs = query.toString()
    return await $fetch<PaginatedUsers>(`${baseUrl}/users${qs ? `?${qs}` : ''}`, {
      headers: getAuthHeaders(),
    })
  }

  const fetchUser = async (id: string): Promise<UserItem> => {
    return await $fetch<UserItem>(`${baseUrl}/users/${id}`, {
      headers: getAuthHeaders(),
    })
  }

  const registerUser = async (payload: {
    email: string
    password: string
    role?: 'ADMIN' | 'ALUMNI' | 'STUDENT'
  }): Promise<UserItem> => {
    return await $fetch<UserItem>(`${baseUrl}/users/register`, {
      method: 'POST',
      body: payload,
    })
  }

  const updateUser = async (id: string, payload: {
    email?: string
    role?: 'ADMIN' | 'ALUMNI' | 'STUDENT'
    status?: 'PENDING' | 'ACTIVE' | 'BANNED'
  }): Promise<UserItem> => {
    return await $fetch<UserItem>(`${baseUrl}/users/${id}`, {
      method: 'PUT',
      body: payload,
      headers: getAuthHeaders(),
    })
  }

  const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
    return await $fetch<{ message: string }>(`${baseUrl}/users/password/request-reset`, {
      method: 'POST',
      body: { email },
    })
  }

  return {
    registerAlumni,
    fetchMyAlumni,
    updateMyAlumni,
    fetchAlumniList,
    fetchAlumni,
    verifyAlumni,
    fetchWorkExperiences,
    fetchEducations,
    fetchProjects,
    fetchUsers,
    fetchUser,
    registerUser,
    updateUser,
    requestPasswordReset,
    fetchPromotions,
    createPromotion,
    updatePromotion,
    fetchDepartments,
    fetchCountries,
  }
}
