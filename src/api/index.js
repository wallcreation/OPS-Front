import api from './base'

export * from './auth'
export * from './error'
export * from './operator'
export * from './team'
export * from './utils'

export function getdashboard() {
    return api.get("/admin/dashboard")
}