// api/team.js
import api from './base'

export function createteam(data) {
  return api.post('/admin/team', data )
}
export function getteams() {
  return api.get('/admin/teams')
}
