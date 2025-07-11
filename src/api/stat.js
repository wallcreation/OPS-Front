import api from "./base"

export function getOperatorStats(data) {
    return api.get('/admin/stats/op', { params: data })
}