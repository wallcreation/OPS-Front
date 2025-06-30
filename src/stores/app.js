import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 🔹 Équipes
  const teams = ref([])
  function setTeams(newTeams) {
    teams.value = newTeams
  }
  function addTeam(team) {
    teams.value.push(team)
  }
  function removeTeam(teamId) {
    teams.value = teams.value.filter((t) => t.id !== teamId)
  }
  function updateTeam(updatedTeam) {
    const index = teams.value.findIndex((t) => t.id === updatedTeam.id)
    if (index !== -1) {
      teams.value[index] = { ...teams.value[index], ...updatedTeam }
    }
  }

  // 🔹 Opérateurs
  const operators = ref([])
  function setOperators(newOperators) {
    operators.value = newOperators
  }
  function addOperator(operator) {
    operators.value.push(operator)
  }
  function removeOperator(operatorId) {
    operators.value = operators.value.filter((op) => op.id !== operatorId)
  }
  function updateOperator(updatedOperator) {
    const index = operators.value.findIndex((op) => op.id === updatedOperator.id)
    if (index !== -1) {
      operators.value[index] = { ...operators.value[index], ...updatedOperator }
    }
  }

  // 🔹 Comptes
  const accounts = ref([])
  function setAccounts(newAccounts) {
    accounts.value = newAccounts
  }
  function addAccount(account) {
    accounts.value.push(account)
  }
  function removeAccount(accountId) {
    accounts.value = accounts.value.filter((acc) => acc.id !== accountId)
  }
  function updateAccount(updatedAccount) {
    const index = accounts.value.findIndex((acc) => acc.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount }
    }
  }

  return {
    // state
    teams, operators, accounts,

    // teams
    setTeams, addTeam, removeTeam, updateTeam,

    // operators
    setOperators, addOperator, removeOperator, updateOperator,

    // accounts
    setAccounts, addAccount, removeAccount, updateAccount,
  }
})
