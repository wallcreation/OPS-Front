import api from './base'
import { getErrorMessage } from './error'

export function login(data) {
    return api.post("/login/", data)
}

export function me() {
    return api.get("/me")
}