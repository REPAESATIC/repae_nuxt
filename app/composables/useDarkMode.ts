/**
 * Dark Mode Composable
 *
 * Manages dark mode state with:
 * - localStorage persistence
 * - System preference detection
 * - SSR compatibility using useState
 *
 * Usage:
 *   const { isDark, theme, toggle, setTheme } = useDarkMode()
 */
export type ThemeMode = 'light' | 'dark' | 'system'

export function useDarkMode() {
  // Shared state across all components using useState
  const isDark = useState('darkMode', () => false)
  const theme = useState<ThemeMode>('themeMode', () => 'system')

  // Initialize on client side only
  onMounted(() => {
    // Check saved preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null

    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      theme.value = savedTheme
    } else {
      theme.value = 'system'
    }

    // Apply theme based on mode
    applyTheme()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if in system mode
      if (theme.value === 'system') {
        isDark.value = e.matches
        updateDOMClass()
      }
    }
    mediaQuery.addEventListener('change', handleChange)
  })

  // Watch for theme changes
  watch(theme, applyTheme)

  function updateDOMClass() {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  function applyTheme() {
    if (import.meta.client) {
      localStorage.setItem('theme', theme.value)

      if (theme.value === 'system') {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        isDark.value = theme.value === 'dark'
      }

      updateDOMClass()
    }
  }

  function toggle() {
    if (theme.value === 'system') {
      // If in system mode, switch to opposite of current state
      theme.value = isDark.value ? 'light' : 'dark'
    } else {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
  }

  function setTheme(newTheme: ThemeMode) {
    theme.value = newTheme
  }

  return {
    isDark: readonly(isDark),
    theme: readonly(theme),
    toggle,
    setTheme
  }
}
