import api from "./base"

export function getOpsPenalties(data) {
    return api.get('/ops/penalties', { params: data })
}
export function getOperatorPenalties(data) {
    return api.get('/admin/penalties/op', { params: data })
}

export function getTeamPenalties(data) {
    return api.get('/admin/penalties/team', { params: data })
}

// Ajouter une pénalité à un opérateur
export function addOperatorPenalty(data) {
    return api.post('/admin/penalty', data)
}

// Supprimer une pénalité (par id)
export function deleteOperatorPenalty(id) {
    return api.delete(`/admin/penalty/${id}`)
}

// Récupérer une pénalité spécifique (par id)
// export function getOperatorPenalty(id) {
//     return api.get(`/admin/penalty/${id}`)
// }