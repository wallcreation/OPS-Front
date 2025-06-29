// utils/apiSafeCall.js
export async function safeCall(promise) {
  try {
    const response = await promise
    const data = response?.data ?? response // axios ou fetch
    return [data, null]
  } catch (err) {
    const code =  err.response?.data?.detail?.code || 0
    const message = err.response?.data?.detail?.message || "Erreur inconnue."
    return [null, { code, message }]
  }
}