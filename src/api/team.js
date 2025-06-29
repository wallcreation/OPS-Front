import api from './base'

export function getteams() {
  const teams = api.get('/admin/teams')
  console.log('teams: ', teams)
  return teams
}
