// src/api.js
import { useSessionStore } from '@/stores/session'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'https://djetovi-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔐 Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refresh_token')

  if (token && refreshToken) {
    config.headers.Authorization = `Bearer ${token}::${refreshToken}`
  }

  return config
})

// 🔁 Intercepteur pour capter les nouveaux tokens de réponse
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers['x-access-token']
    const newRefreshToken = response.headers['x-refresh-token']

    if (newToken && newRefreshToken) {
      localStorage.setItem('token', newToken)
      localStorage.setItem('refresh_token', newRefreshToken)
    }

    return response
  },
  (error) => {
    // tu peux gérer ici les erreurs globales type 401 ou autres
    return Promise.reject(error)
  }
)

export default api
