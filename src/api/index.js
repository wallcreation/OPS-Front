import { useErrorStore } from '@/stores/error'
import { clearProfile } from '../utils/storage'
import { useSessionStore } from '@/stores/session'
import { useNotificationStore } from '@/stores/notification'
import { useAuthStore } from '@/stores/useAuthStore'
import api from './base'
export * from './account'
export * from './auth'
export * from './error'
export * from './operator'
export * from './penalty'
export * from './stat'
export * from './team'
export * from '../utils/storage'


export function getdashboard() {
  return api.get("/admin/dashboard")
}

export async function safeCall(promise, retry = false) {
  const auth = useAuthStore()
  try {
    const response = await promise
    const data = response?.data ?? response // axios ou fetch
    return [data, null]
  } catch (err) {
    const code =  err.response?.data?.detail?.code || 0
    if(code === 1003 && !retry) {
      try {
        await auth.refreshTokens() // gère isRefreshing + queue
        // Retente la requête
        return await safeCall(promise, true)
      } catch (error) {
        clearProfile()
        const session = useSessionStore()
        session.triggerSessionExpired()
      }
    }
    const message = err.response?.data?.detail?.message || err.message || "Erreur inconnue."
    const error = useErrorStore()
    error.triggerError(message)
    return [null, { code, message }]
  }
}

export async function fetchAllAppData() {
  const notification = useNotificationStore()

  notification.notify("Récupérations des données", "info")
  const [res,err] = await safeCall(getdashboard())
  if(err) {
    return [null, err]
  }

  notification.notify("Récupération terminé", "success")
  return [
    {
      teams: res.teams, // teamsRes,
      operators: res.operators, // operatorsRes,
      accounts: res.accounts, // accountsRes,
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
