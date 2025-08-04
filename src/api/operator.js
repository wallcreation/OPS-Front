import api from "./base"

export function createOperator(data) {
    return api.post('/admin/operator', data)
}

export function deleteOperator(id) {
    return api.delete(`/admin/operator/${id}`)
}

export function getOperator(id) {
    return api.get(`/admin/operator/${id}`)
}

export function getOperators() {
    return api.get('/admin/operators')
}

export function lockOperator(id, data) {
    return api.post(`/admin/operator/lock/${id}`, data)
}

export function updateOperator(id, is_locked) {
    return api.put(`/admin/operator/${id}/${is_locked}`)
}

export function updateOperatorCode(id) {
    return api.put(`/admin/operator/${id}/code`)
}

export function regenerateCodes() {
    return api.get('/admin/regenerate/codes')
}

export function operatorMe() {
    return api.get('/ops/me')
}