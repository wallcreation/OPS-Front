// src/api.js
import axios from 'axios'

const api = axios.create({
  // baseURL:  'http://localhost:8000',
  baseURL: 'https://djetovi-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔐 Ajouter le token automatiquement dans les headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
