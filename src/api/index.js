import { useErrorStore } from '@/stores/error'
import { clearProfile } from '../utils/storage'
import api from './base'
import { useSessionStore } from '@/stores/useSessionStore'
import { useNotificationStore } from '@/stores/notification'
export * from './account'
export * from './auth'
export * from './error'
export * from './operator'
export * from './stat'
export * from './team'
export * from '../utils/storage'

export function getdashboard() {
    return api.get("/admin/dashboard")
}

export async function safeCall(promise) {
  try {
    const response = await promise
    const data = response?.data ?? response // axios ou fetch
    return [data, null]
  } catch (err) {
    const code =  err.response?.data?.detail?.code || 0
    if(code === 1003) {
      clearProfile()
      const session = useSessionStore()
      session.triggerSessionExpired()
    }
    const message = err.response?.data?.detail?.message || err.message || "Erreur inconnue."
    const error = useErrorStore()
    error.triggerError(message)
    return [null, { code, message }]
  }
}

export async function fetchAllAppData() {
  const notification = useNotificationStore()
  notification.notify("Récupérations des équipes", "info")
  const [teamsRes, teamsErr] = await safeCall(api.get('/admin/teams'))
  notification.notify("Récupérations des opérateurs", "info")
  const [operatorsRes, operatorsErr] = await safeCall(api.get('/admin/operators'))
  notification.notify("Récupérations des comptes", "info")
  const [accountsRes, accountsErr] = await safeCall(api.get('/admin/accounts'))

  if (teamsErr || operatorsErr || accountsErr) {
    return [null, teamsErr || operatorsErr || accountsErr]
  }

  notification.notify("Récupération terminé", "success")
  return [
    {
      teams: teamsRes,
      operators: operatorsRes,
      accounts: accountsRes,
    },
    null
  ]
}

export const updateStore = async (stores) => {
  const [data, fetchErr] = await fetchAllAppData()
  if (fetchErr) {
    console.error('Erreur lors du chargement des données :', fetchErr)
    // Optionnel : afficher une alerte ou notifier l'utilisateur
    return
  }
  stores.setTeams(data.teams)
  stores.setOperators(data.operators)
  stores.setAccounts(data.accounts)
}
