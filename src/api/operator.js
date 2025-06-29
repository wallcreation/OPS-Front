import api from "./base"

export function getoperators() {
    return api.get("/admin/operators")
}