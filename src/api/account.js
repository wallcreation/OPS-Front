import api from "./base"

export function createaccount(data) {
    return api.post('/admin/account', data)
}

export function deleteaccount(id) {
    return api.delete(`/admin/account/${id}`)
}

export function getaccounts() {
    return api.get('/admin/accounts')
}
