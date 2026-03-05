import type { AlumniItem } from '~/composables/useIdentityApi'
import { alumniData as mockAlumniData, mainCountry as mockMainCountry } from '@/data/alumni'

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface MapCountryData {
  id: string
  country: string
  mainCity: string
  alumniCount: number
  topSkills: string[]
  departments: string[]
  alumni: Pick<AlumniItem, 'id' | 'firstName' | 'lastName' | 'photoUrl'>[]
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getMostFrequent(items: string[]): string {
  if (items.length === 0) return ''
  const counts = new Map<string, number>()
  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1)
  }
  let best = ''
  let bestCount = 0
  for (const [item, count] of counts) {
    if (count > bestCount) {
      best = item
      bestCount = count
    }
  }
  return best
}

function getTopN(items: string[], n: number): string[] {
  const counts = new Map<string, number>()
  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name]) => name)
}

// ─── Composable ─────────────────────────────────────────────────────────────────

export function useAlumniMap() {
  const { fetchCountries, fetchAlumniList } = useIdentityApi()

  const alumniData = ref<Record<string, MapCountryData>>({})
  const loading = ref(true)
  const mainCountry = mockMainCountry // 'ci'

  const totalAlumni = computed(() => {
    return Object.values(alumniData.value).reduce((sum, c) => sum + c.alumniCount, 0)
  })

  const loadMapData = async () => {
    loading.value = true

    const [countriesResult, alumniResult] = await Promise.allSettled([
      fetchCountries({ limit: 200 }),
      fetchAlumniList({ limit: 500 }),
    ])

    // Si les deux échouent, fallback vers les données mock
    if (countriesResult.status === 'rejected' && alumniResult.status === 'rejected') {
      alumniData.value = mockAlumniData as any
      loading.value = false
      return
    }

    const countries = countriesResult.status === 'fulfilled' ? countriesResult.value.data : []
    const alumnis = alumniResult.status === 'fulfilled' ? alumniResult.value.data : []

    // Si pas d'alumni, fallback mock
    if (alumnis.length === 0) {
      alumniData.value = mockAlumniData as any
      loading.value = false
      return
    }

    // Construire le mapping nom pays → isoCode minuscule
    const nameToIso = new Map<string, string>()
    for (const c of countries) {
      nameToIso.set(c.name, c.isoCode.toLowerCase())
    }

    // Grouper les alumni par nom de pays
    const groups = new Map<string, AlumniItem[]>()
    for (const alumni of alumnis) {
      if (!alumni.country) continue
      const arr = groups.get(alumni.country) || []
      arr.push(alumni)
      groups.set(alumni.country, arr)
    }

    // Transformer en MapCountryData indexé par isoCode
    const result: Record<string, MapCountryData> = {}
    for (const [countryName, members] of groups) {
      const isoCode = nameToIso.get(countryName)
      if (!isoCode) continue

      const cities = members.map(a => a.city).filter(Boolean) as string[]
      const skills = members.flatMap(a => a.skills?.map(s => s.name) || [])
      const departments = members.map(a => a.department).filter(Boolean) as string[]

      result[isoCode] = {
        id: isoCode,
        country: countryName,
        mainCity: getMostFrequent(cities),
        alumniCount: members.length,
        topSkills: getTopN(skills, 5),
        departments: getTopN(departments, 3),
        alumni: members.map(a => ({
          id: a.id,
          firstName: a.firstName,
          lastName: a.lastName,
          photoUrl: a.photoUrl,
        })),
      }
    }

    alumniData.value = result
    loading.value = false
  }

  return {
    alumniData,
    loading,
    mainCountry,
    totalAlumni,
    loadMapData,
  }
}
