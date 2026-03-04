// composables/useUmami.ts
export const useUmami = () => {
  const track = (event: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(event, data)
    }
  }

  return { track }
}