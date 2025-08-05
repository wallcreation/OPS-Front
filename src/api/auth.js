import api from './base'
import { getErrorMessage } from './error'

export function login(data) {
    return api.post("/auth/login/", data)
}

export function me() {
    return api.get("/me")
}

export function refresh() {
    return api.get('/refresh')
}

export function logout() {
    return api.get('/auth/logout')
}