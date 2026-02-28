// Composable pour gérer l'utilisateur IT connecté (profil alumni + notifications)
// Centralise les données réelles depuis identity-service

import type { AlumniItem } from './useIdentityApi'

export interface ItNotification {
  id: string
  subject: string
  content: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedNotifications {
  data: ItNotification[]
  total: number
  page: number
  limit: number
}

// State partagé entre composants (singleton via useState)
export function useItUser() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.identityApiBase as string

  // State réactif global (persiste entre navigations grâce à useState)
  const alumni = useState<AlumniItem | null>('it-alumni', () => null)
  const loading = useState<boolean>('it-alumni-loading', () => false)
  const loaded = useState<boolean>('it-alumni-loaded', () => false)

  const notifications = useState<ItNotification[]>('it-notifications', () => [])
  const unreadCount = useState<number>('it-unread-count', () => 0)
  const notificationsLoading = useState<boolean>('it-notif-loading', () => false)

  // ─── Auth Headers ──────────────────────────────────────────────────────────────

  const getToken = (): string | null => {
    return import.meta.client ? localStorage.getItem('it-token') : null
  }

  const getHeaders = () => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // ─── Profil Alumni ─────────────────────────────────────────────────────────────

  const fetchProfile = async () => {
    if (loading.value) return
    loading.value = true
    try {
      const data = await $fetch<AlumniItem>(`${baseUrl}/alumnis/my`, {
        headers: getHeaders(),
      })
      alumni.value = data
      loaded.value = true
    } catch {
      alumni.value = null
    } finally {
      loading.value = false
    }
  }

  // Charger le profil uniquement si pas encore chargé
  const ensureLoaded = async () => {
    if (!loaded.value && !loading.value) {
      await fetchProfile()
    }
  }

  // ─── Notifications ─────────────────────────────────────────────────────────────

  const fetchNotifications = async (limit = 10) => {
    notificationsLoading.value = true
    try {
      const data = await $fetch<PaginatedNotifications>(
        `${baseUrl}/notifications?page=1&limit=${limit}`,
        { headers: getHeaders() },
      )
      notifications.value = data.data
    } catch {
      notifications.value = []
    } finally {
      notificationsLoading.value = false
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const data = await $fetch<{ count: number }>(
        `${baseUrl}/notifications/unread-count`,
        { headers: getHeaders() },
      )
      unreadCount.value = data.count
    } catch {
      unreadCount.value = 0
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await $fetch(`${baseUrl}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders(),
      })
      // Mettre à jour localement
      const notif = notifications.value.find(n => n.id === id)
      if (notif && !notif.isRead) {
        notif.isRead = true
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    } catch {
      // silently fail
    }
  }

  const markAllAsRead = async () => {
    try {
      await $fetch(`${baseUrl}/notifications/read-all`, {
        method: 'POST',
        headers: getHeaders(),
      })
      notifications.value.forEach(n => { n.isRead = true })
      unreadCount.value = 0
    } catch {
      // silently fail
    }
  }

  // ─── Déconnexion ───────────────────────────────────────────────────────────────

  const logout = () => {
    if (!import.meta.client) return

    localStorage.removeItem('it-auth')
    localStorage.removeItem('it-token')
    localStorage.removeItem('it-user')
    localStorage.removeItem('it-profile-incomplete')

    // Reset state
    alumni.value = null
    loaded.value = false
    notifications.value = []
    unreadCount.value = 0

    navigateTo('/connexion-it')
  }

  // ─── Computed helpers ──────────────────────────────────────────────────────────

  const displayName = computed(() => {
    if (alumni.value) {
      return `${alumni.value.firstName} ${alumni.value.lastName}`
    }
    // Fallback sur les données de connexion
    if (import.meta.client) {
      try {
        const raw = localStorage.getItem('it-user')
        if (raw) {
          const user = JSON.parse(raw)
          return user.email?.split('@')[0] ?? ''
        }
      } catch { /* ignore */ }
    }
    return ''
  })

  const firstName = computed(() => alumni.value?.firstName ?? '')

  const email = computed(() => {
    if (alumni.value?.email) return alumni.value.email
    if (import.meta.client) {
      try {
        const raw = localStorage.getItem('it-user')
        if (raw) return JSON.parse(raw).email ?? ''
      } catch { /* ignore */ }
    }
    return ''
  })

  const photoUrl = computed(() => alumni.value?.photoUrl ?? '')

  return {
    // State
    alumni,
    loading,
    loaded,
    notifications,
    unreadCount,
    notificationsLoading,

    // Actions
    fetchProfile,
    ensureLoaded,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    logout,

    // Computed
    displayName,
    firstName,
    email,
    photoUrl,
  }
}
