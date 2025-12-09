/**
 * Dark Mode Composable
 *
 * Manages dark mode state with:
 * - localStorage persistence
 * - System preference detection
 * - SSR compatibility using useState
 *
 * Usage:
 *   const { isDark, toggle } = useDarkMode()
 */
export function useDarkMode() {
  // Shared state across all components using useState
  const isDark = useState('darkMode', () => false)

  // Initialize on client side only
  onMounted(() => {
    // Check if dark class is already applied (by inline script in head)
    const hasDarkClass = document.documentElement.classList.contains('dark')

    // Check saved preference
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else if (hasDarkClass) {
      // Sync with class applied by inline script (system preference)
      isDark.value = true
    } else {
      // Fallback: detect system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Apply theme (ensures class matches state)
    applyTheme()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no saved preference
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
      }
    }
    mediaQuery.addEventListener('change', handleChange)
  })

  // Watch for changes and apply theme
  watch(isDark, applyTheme)

  function applyTheme() {
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  return {
    isDark: readonly(isDark),
    toggle
  }
}
