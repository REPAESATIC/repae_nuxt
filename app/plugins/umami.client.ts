// plugins/umami.client.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const script = document.createElement('script')
  script.src = `${config.public.umamiHost}/script.js`
  script.setAttribute('data-website-id', config.public.umamiId)
  script.defer = true

  document.head.appendChild(script)
})