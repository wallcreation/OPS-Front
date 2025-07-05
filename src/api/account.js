import api from "./base"

export function createaccount(data) {
    return api.post('/admin/account', data)
}

export function getaccounts() {
    return api.get('/admin/accounts')
}
