// Composable pour les appels API Events (CRUD) vers content-services

export interface EventLocation {
  type: 'PHYSICAL' | 'ONLINE'
  locationName?: string
  accessUrl?: string
}

export interface EventItem {
  id: string
  title: string
  description: string
  eventDate: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  isFeatured: boolean
  location: EventLocation
  imageUrl?: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedEvents {
  data: EventItem[]
  total: number
  page: number
  limit: number
}

export interface CreateEventPayload {
  title: string
  description: string
  eventDate: string
  categoryId: string
  locationType: 'PHYSICAL' | 'ONLINE'
  locationName?: string
  accessUrl?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  image?: File | null
}

export interface UpdateEventPayload {
  title?: string
  description?: string
  eventDate?: string
  categoryId?: string
  locationType?: 'PHYSICAL' | 'ONLINE'
  locationName?: string
  accessUrl?: string
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  image?: File | null
}

export function useEventsApi() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.contentApiBase as string

  const fetchEventsList = async (params?: {
    search?: string
    categoryId?: string
    page?: number
    limit?: number
  }): Promise<PaginatedEvents> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.categoryId) query.set('categoryId', params.categoryId)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))

    const qs = query.toString()
    return await $fetch<PaginatedEvents>(`${baseUrl}/events${qs ? `?${qs}` : ''}`)
  }

  const fetchEvent = async (id: string): Promise<EventItem> => {
    return await $fetch<EventItem>(`${baseUrl}/events/${id}`)
  }

  const createEvent = async (payload: CreateEventPayload): Promise<EventItem> => {
    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('description', payload.description)
    formData.append('eventDate', payload.eventDate)
    formData.append('categoryId', payload.categoryId)
    formData.append('locationType', payload.locationType)
    if (payload.locationName) formData.append('locationName', payload.locationName)
    if (payload.accessUrl) formData.append('accessUrl', payload.accessUrl)
    if (payload.status) formData.append('status', payload.status)
    if (payload.image) formData.append('image', payload.image)

    return await $fetch<EventItem>(`${baseUrl}/events`, {
      method: 'POST',
      body: formData,
    })
  }

  const updateEvent = async (id: string, payload: UpdateEventPayload): Promise<EventItem> => {
    const formData = new FormData()
    if (payload.title !== undefined) formData.append('title', payload.title)
    if (payload.description !== undefined) formData.append('description', payload.description)
    if (payload.eventDate !== undefined) formData.append('eventDate', payload.eventDate)
    if (payload.categoryId !== undefined) formData.append('categoryId', payload.categoryId)
    if (payload.locationType !== undefined) formData.append('locationType', payload.locationType)
    if (payload.locationName !== undefined) formData.append('locationName', payload.locationName)
    if (payload.accessUrl !== undefined) formData.append('accessUrl', payload.accessUrl)
    if (payload.status !== undefined) formData.append('status', payload.status)
    if (payload.image) formData.append('image', payload.image)

    return await $fetch<EventItem>(`${baseUrl}/events/${id}`, {
      method: 'PUT',
      body: formData,
    })
  }

  return {
    fetchEventsList,
    fetchEvent,
    createEvent,
    updateEvent,
  }
}
