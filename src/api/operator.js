import api from "./base"

export function createOperator(data) {
    return api.post('/admin/operator', data)
}

export function deleteOperator(id) {
    return api.delete(`/admin/operator/${id}`)
}

export function getOperators() {
    return api.get('/admin/operators')
}
export function updateOperator(id, data) {
    return api.put(`/admin/operator/${id}`, data)
}
export function regenerateCodes() {
    return api.get('/admin/regenerate/codes')
}