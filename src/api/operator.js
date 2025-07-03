import api from "./base"

export function createOperator(data) {
    return api.post('/admin/operator', data)
}

export function getoperators() {
    return api.get('/admin/operators')
}