// stores/app.js
import { defineStore } from 'pinia'
import { getteams, getoperators, getaccounts } from '@/api'
import { safeCall } from '@/utils/apiSafeCall'

export const useAppStore = defineStore('app', {
  state: () => ({
    teams: [],
    operators: [],
    accounts: [],
    loading: true,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      const [t] = await safeCall(getteams())
      const [o] = await safeCall(getoperators())
      const [a] = await safeCall(getaccounts())

      if (t) this.teams = t.teams
      if (o) this.operators = o.operators
      if (a) this.accounts = a.accounts

      this.loading = false
    },

    removeTeam(id) {
      this.teams = this.teams.filter(t => t.id !== id)
    },

    removeOperator(id) {
      this.operators = this.operators.filter(o => o.id !== id)
    },

    removeAccount(id) {
      this.accounts = this.accounts.filter(a => a.id !== id)
    },
  },
})
