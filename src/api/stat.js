import api from "./base"

export function getOperatorStats(data) {
    return api.get('/admin/stats/op', { params: data })
}
export function getTeamStats(data) {
    return api.get('/admin/stats/team', { params: data })
}

// Ajouter une stat à un opérateur
export function addOperatorStat(data) {
    return api.post('/admin/stat', data)
}

// Supprimer une stat (par id)
export function deleteOperatorStat(id) {
    return api.delete(`/admin/stat/${id}`)
}

// Récupérer une stat spécifique (par id)
// export function getOperatorStat(id) {
//     return api.get(`/admin/stat/${id}`)
// }