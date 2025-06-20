import api from './base'

async function login(email, password) {
  try {
    const response = await api.post('/login', { email, password })
    if (response.data.status && response.status === 200) {
      localStorage.setItem('token', response.data.token)
      return [true, response.data.profile]
    }
  } catch (error) {
    return [false]
  }
}

