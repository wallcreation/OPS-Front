import api from "./base"

export function createAccount(data) {
    return api.post('/admin/account', data)
}

export function deleteAccount(id) {
    return api.delete(`/admin/account/${id}`)
}

export function getAccounts() {
    return api.get('/admin/accounts')
}

export function updateAccount(data) {
    return
}