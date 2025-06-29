// api/team.js
import api from './base'

export function getteams() {
  return api.get('/admin/teams')
}
