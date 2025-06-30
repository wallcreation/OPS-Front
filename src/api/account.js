import api from "./base"

export function getaccounts() {
    return api.get("/admin/accounts")
}