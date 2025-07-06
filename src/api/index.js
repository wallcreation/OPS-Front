import { useErrorStore } from '@/stores/error'
import { clearProfile } from '../utils/storage'
import api from './base'
import { useSessionStore } from '@/stores/useSessionStore'
export * from './account'
export * from './auth'
export * from './error'
export * from './operator'
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
    const message = err.response?.data?.detail?.message || "Erreur inconnue."
    const error = useErrorStore()
    error.triggerError(message)
    return [null, { code, message }]
  }
}

export async function fetchAllAppData() {
  const [teamsRes, teamsErr] = await safeCall(api.get('/admin/teams'))
  const [operatorsRes, operatorsErr] = await safeCall(api.get('/admin/operators'))
  const [accountsRes, accountsErr] = await safeCall(api.get('/admin/accounts'))

  if (teamsErr || operatorsErr || accountsErr) {
    return [null, teamsErr || operatorsErr || accountsErr]
  }

  return [
    {
      teams: teamsRes,
      operators: operatorsRes,
      accounts: accountsRes,
    },
    null
  ]
}
