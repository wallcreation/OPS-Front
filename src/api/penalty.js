import api from "./base"

// Récupérer les pénalités d'un opérateur
export function getOperatorPenalties(data) {
    return api.get('/admin/penalties', { params: data })
}

// Ajouter une pénalité à un opérateur
export function addOperatorPenalty(data) {
    return api.post('/admin/penalty', data)
}

// Supprimer une pénalité (par id)
export function deleteOperatorPenalty(id) {
    return api.delete(`/admin/penalties/op/${id}`)
}
