import api from "./base";

export function getteams() {
    teams =  api.get('/admin/teams')
    console.log("teams: ", teams)
    return teams
}