// Composable pour gerer les notifications dans l'Espace Entreprises

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  dismissible?: boolean
}

const notifications = ref<Notification[]>([])

export function useNotifications() {
  const add = (notification: Omit<Notification, 'id'>) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      id,
      dismissible: true,
      duration: 5000,
      ...notification
    }

    notifications.value.push(newNotification)

    // Auto-remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newNotification.duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clear = () => {
    notifications.value = []
  }

  // Convenience methods
  const success = (title: string, message?: string, options?: Partial<Notification>) => {
    return add({ type: 'success', title, message, ...options })
  }

  const error = (title: string, message?: string, options?: Partial<Notification>) => {
    return add({ type: 'error', title, message, duration: 8000, ...options })
  }

  const warning = (title: string, message?: string, options?: Partial<Notification>) => {
    return add({ type: 'warning', title, message, ...options })
  }

  const info = (title: string, message?: string, options?: Partial<Notification>) => {
    return add({ type: 'info', title, message, ...options })
  }

  return {
    notifications: readonly(notifications),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
}
