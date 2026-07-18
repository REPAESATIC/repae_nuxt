import type { AlumniItem } from '~/composables/useIdentityApi'

/**
 * Demandes d'adhésion soumises via le formulaire public.
 *
 * L'API ne stocke pas d'état « demande en attente » : elle expose seulement
 * `isAdherent` et les trois champs de paiement. Ces derniers ne sont écrits que
 * par `POST /auth/register/alumni`, le formulaire public, qui exige moyen +
 * référence + preuve et crée toujours l'alumni avec `isAdherent: false`.
 * Ni la création manuelle par un admin ni l'import Excel ne les renseignent.
 *
 * Un alumni non adhérent portant une trace de paiement est donc forcément une
 * demande issue du formulaire, par opposition aux adhérents historiques que
 * l'admin valide à la main sans dossier de paiement.
 */
export function useAdhesionRequests() {
  const { fetchAlumniList } = useIdentityApi()

  /** Vrai si l'alumni a soumis une demande d'adhésion encore non validée. */
  const isAdhesionRequest = (alumni: AlumniItem): boolean => {
    if (alumni.isAdherent) return false
    return Boolean(alumni.paymentMethod || alumni.paymentReference || alumni.paymentProofUrl)
  }

  /**
   * Charge les demandes en attente, de la plus ancienne à la plus récente
   * (les demandes les plus anciennes sont les plus urgentes à traiter).
   *
   * L'API n'ayant pas de filtre sur le paiement, on récupère les non-adhérents
   * puis on trie côté client. `limit` plafonne le nombre de non-adhérents
   * inspectés : au-delà, le décompte serait sous-estimé (voir `truncated`).
   */
  const fetchAdhesionRequests = async (limit = 500) => {
    const result = await fetchAlumniList({ isAdherent: false, limit })
    const requests = result.data
      .filter(isAdhesionRequest)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    return {
      requests,
      /** Vrai si des non-adhérents n'ont pas pu être inspectés faute de place. */
      truncated: result.total > result.data.length,
    }
  }

  /**
   * Nombre de demandes en attente, partagé entre la page alumni et le badge de
   * la sidebar pour qu'une validation mette les deux à jour d'un coup.
   */
  const pendingCount = useState<number>('adhesion-requests-count', () => 0)

  const refreshPendingCount = async () => {
    try {
      const { requests } = await fetchAdhesionRequests()
      pendingCount.value = requests.length
    } catch {
      // Compteur non critique : on garde la dernière valeur connue plutôt que
      // d'afficher un badge à zéro qui masquerait des demandes en attente.
    }
  }

  return {
    isAdhesionRequest,
    fetchAdhesionRequests,
    pendingCount,
    refreshPendingCount,
  }
}
