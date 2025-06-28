import api from './base'
import { getErrorMessage } from './error'

export async function login(data) {
    return api.post("/login", data)
}