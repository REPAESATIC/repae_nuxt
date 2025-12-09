/**
 * Dark Mode Plugin
 * This plugin runs immediately on the client to prevent flash of wrong theme.
 * It reads the saved preference from localStorage or detects system preference.
 */
export default defineNuxtPlugin(() => {
  // Apply dark mode immediately to prevent flash
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
