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

async function team_by_id(id) {
  try {
    const response = await api.get(`/team/${id}`)
    if (response.data.status && response.status === 200) {
      return [true, response.data.team]
    }
  } catch (error) {
    return [false]
  }
}

async function team_by_name(name) {
  try {
    const response = await api.get(`/team_name/${name}`)
    if (response.data.status && response.status === 200) {
      return [true, response.data.team]
    }
  } catch (error) {
    return [false]
  }
}

async function teams() {
  try {
    const response = await api.get('/teams')
    if (response.data.status && response.status === 200) {
      return [true, response.data.teams]
    }
  } catch (error) {
    return [false]
  }
}

async function teams_name() {
  try {
    const response = await api.get('/teams_name')
    if (response.data.status && response.status === 200) {
      return [true, response.data.teams]
    }
  } catch (error) {
    return [false]
  }
}

async function create_team(name) {
    try {
        const response = await api.post('/team', { name })
        if (response.data.status && response.status === 200) {
        return [true, response.data.team]
        }
    } catch (error) {
        return [false]
    }
}

async function delete_team(id) {
  try {
    const response = await api.delete(`/team/${id}`)
    if (response.data.status && response.status === 200) {
      return [true]
    }
  } catch (error) {
    return [false]
  } 
}

async function update_team(id, name) {
  try {
    const response = await api.put(`/team/${id}`, { name })
    if (response.data.status && response.status === 200) {
      return [true, response.data.team]
    }
  } catch (error) {
    return [false]
  }
}