// stores/app.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createTeam, deleteTeam, updateTeam,
  createOperator, deleteOperator, updateOperator,
  createAccount, deleteAccount, updateAccount,
  safeCall
} from '@/api'

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
    teams.value = teams.value.filter(t => t.id !== teamId)
  }
  function updateTeamLocal(updatedTeam) {
    const index = teams.value.findIndex(t => t.id === updatedTeam.id)
    if (index !== -1) {
      teams.value[index] = { ...teams.value[index], ...updatedTeam }
    }
  }
  async function createTeamAPI(payload) {
    const [res] = await safeCall(createTeam(payload))
    if (res) addTeam(res)
  }
  async function deleteTeamAPI(teamId) {
    const [res] = await safeCall(deleteTeam(teamId))
    if (res) removeTeam(teamId)
  }
  async function editTeamAPI(updatedTeam) {
    const [res] = await safeCall(updateTeam(updatedTeam))
    if (res) updateTeamLocal(res)
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
    operators.value = operators.value.filter(op => op.id !== operatorId)
  }
  function updateOperatorLocal(updatedOperator) {
    const index = operators.value.findIndex(op => op.id === updatedOperator.id)
    if (index !== -1) {
      operators.value[index] = { ...operators.value[index], ...updatedOperator }
    }
  }
  async function createOperatorAPI(payload) {
    const [res] = await safeCall(createOperator(payload))
    if (res) addOperator(res)
  }
  async function deleteOperatorAPI(operatorId) {
    const [res] = await safeCall(deleteOperator(operatorId))
    if (res) removeOperator(operatorId)
  }
  async function editOperatorAPI(updatedOperator) {
    const [res] = await safeCall(updateOperator(updatedOperator))
    if (res) updateOperatorLocal(res)
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
    accounts.value = accounts.value.filter(acc => acc.id !== accountId)
  }
  function updateAccountLocal(updatedAccount) {
    const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount }
    }
  }
  async function createAccountAPI(payload) {
    const [res] = await safeCall(createAccount(payload))
    if (res) addAccount(res)
  }
  async function deleteAccountAPI(accountId) {
    const [res] = await safeCall(deleteAccount(accountId))
    if (res) removeAccount(accountId)
  }
  async function editAccountAPI(updatedAccount) {
    const [res] = await safeCall(updateAccount(updatedAccount))
    if (res) updateAccountLocal(res)
  }

  // 🧠 Getters
  const getTeamById = id => teams.value.find(t => t.id === id)
  const getTeamByName = name => teams.value.find(t => t.name === name)
  const getOperatorById = id => operators.value.find(op => op.id === id)
  const getOperatorsByTeamId = teamId => operators.value.filter(op => op.team_id === teamId)
  const getAccountById = id => accounts.value.find(acc => acc.id === id)
  const getAccountsByTeamId = teamId => accounts.value.filter(acc => acc.team_id === teamId)

  return {
    // état
    teams, operators, accounts,

    // setters
    setTeams, addTeam, removeTeam, updateTeamLocal,
    setOperators, addOperator, removeOperator, updateOperatorLocal,
    setAccounts, addAccount, removeAccount, updateAccountLocal,

    // helpers avec API
    createTeamAPI, deleteTeamAPI, editTeamAPI,
    createOperatorAPI, deleteOperatorAPI, editOperatorAPI,
    createAccountAPI, deleteAccountAPI, editAccountAPI,

    // getters
    getTeamById, getTeamByName,
    getOperatorById, getOperatorsByTeamId,
    getAccountById, getAccountsByTeamId,
  }
}, {
  persist: {
    paths: ['teams', 'operators', 'accounts'],
    storage: localStorage
  }
})
