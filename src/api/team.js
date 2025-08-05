// api/team.js
import api from './base'

export function createTeam(data) {
  return api.post('/admin/team', data)
}

export function deleteTeam(id) {
  return api.delete(`/admin/team/${id}`)
}

export function getTeam(id) {
  return api.get(`/admin/team/${id}`)

}
export function getOpsTeam(id) {
  return api.get(`/ops/team/${id}`)
}

export function getTeams() {
  return api.get('/admin/teams')
}

export function updateTeam(id, data) {
  return api.put(`/admin/team/${id}`, data)
}