// stores/app.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createTeam, deleteTeam, updateTeam,
  createOperator, deleteOperator, updateOperator,
  createAccount, deleteAccount, updateAccount,
  getOperator,
  safeCall
} from '@/api'
import { useNotificationStore } from './notification'

export const useAppStore = defineStore('app', () => {
  // Notification
  const notification = useNotificationStore()
  // 🔹 Équipes
  const teams = ref([])

  function setTeams(newTeams) {
    teams.value = newTeams
  }
  function addTeam(team) {
    teams.value.push(team)
    notification.notify("Équipe crée", "success")
  }
  function removeTeam(teamId) {
    teams.value = teams.value.filter(t => t.id !== teamId)
    notification.notify("Équipe supprimée", "success")
  }
  function updateTeamLocal(updatedTeam) {
    const index = teams.value.findIndex(t => t.id === updatedTeam.id)
    if (index !== -1) {
      teams.value[index] = { ...teams.value[index], ...updatedTeam }
      notification.notify("Team mise à jour", "success")
    }
  }
  async function createTeamAPI(payload) {
    notification.notify("Création de l'équipe", "info")
    const [res] = await safeCall(createTeam(payload))
    if (res) addTeam(res)
  }
  async function deleteTeamAPI(teamId) {
    notification.notify("Suppression de l'équipe", "info")
    const [res] = await safeCall(deleteTeam(teamId))
    if (res) removeTeam(teamId)
  }
  async function editTeamAPI(teamId, updatedTeam) {
    notification.notify("Modification de l'équipe", "info")
    const [res] = await safeCall(updateTeam(teamId, updatedTeam))
    if (res) updateTeamLocal(res)
  }

  // 🔹 Opérateurs
  const operators = ref([])

  function setOperators(newOperators) {
    operators.value = newOperators
  }
  function addOperator(operator) {
    operators.value.push(operator)
    notification.notify("Opérateur crée", "success")
  }
  function removeOperator(operatorId) {
    operators.value = operators.value.filter(op => op.id !== operatorId)
    notification.notify("Opérateur supprimé", "success")
  }
  function updateOperatorLocal(updatedOperator) {
    const index = operators.value.findIndex(op => op.id === updatedOperator.id)
    if (index !== -1) {
      operators.value[index] = { ...operators.value[index], ...updatedOperator }
      notification.notify("Opérateur modifié", "success")
    }
  }
  async function createOperatorAPI(payload) {
    notification.notify("Création de l'opérateur", "info")
    const [res] = await safeCall(createOperator(payload))
    if (res) addOperator(res)
  }
  async function deleteOperatorAPI(operatorId) {
    notification.notify("Suppression de l'opérateur", "info")
    const [res] = await safeCall(deleteOperator(operatorId))
    if (res) removeOperator(operatorId)
  }
  async function editOperatorAPI(operatorId, updatedOperator) {
    notification.notify("Modification de l'opérateur", "info")
    const [res,err] = await safeCall(updateOperator(operatorId, updatedOperator))
    if (res) updateOperatorLocal(res)
  }

  async function fetchOperatorById(operatorId) {
    console.log("Fetching operator by id", operatorId)
    const [res,err] = await safeCall(getOperator(operatorId))
    if (res) {
      // Remplace localement l'opérateur
      const index = operators.value.findIndex(op => op.id === operatorId)
      if (index !== -1) {
        // operators.value[index] = res
        operators.value.splice(index, 1, res) // Remplace l'opérateur
      } else {
        operators.value.push(res)
      }
      notification.notify("Opérateur chargé", "success")
    }
  }
  
  // 🔹 Comptes
  const accounts = ref([])

  function setAccounts(newAccounts) {
    accounts.value = newAccounts
  }
  function addAccount(account) {
    accounts.value.push(account)
    notification.notify("Compte crée", "success")
  }
  function removeAccount(accountId) {
    accounts.value = accounts.value.filter(acc => acc.id !== accountId)
    notification.notify("Compte supprimé", "success")
  }
  function updateAccountLocal(updatedAccount) {
    const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updatedAccount }
      notification.notify("Compte modifié", "success")
    }
  }
  async function createAccountAPI(payload) {
    notification.notify("Création du compte", "info")
    const [res] = await safeCall(createAccount(payload))
    if (res) addAccount(res)
  }
  async function deleteAccountAPI(accountId) {
    notification.notify("Suppression du compte", "info")
    const [res] = await safeCall(deleteAccount(accountId))
    if (res) removeAccount(accountId)
  }
  async function editAccountAPI(accountId, updatedAccount) {
    notification.notify("Modification du compte", "info")
    const [res] = await safeCall(updateAccount(accountId, updatedAccount))
    if (res) updateAccountLocal(res)
  }

  // 🧠 Getters
  const getTeamById = id => teams.value.find(t => t.id === id)
  const getTeamByName = name => teams.value.find(t => t.name === name)
  const getOperatorById = id => operators.value.find(op => op.id === id)
  const getOperatorsByTeamId = teamId => operators.value.filter(op => op.team_id === teamId)
  const getAccountById = id => accounts.value.find(acc => acc.id === id)
  const getAccountsByTeamId = teamId => accounts.value.filter(acc => acc.team_id === teamId)

  const reset = () => {
    teams.value = []
    operators.value = []
    accounts.value = []
  }

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
    fetchOperatorById,

    // getters
    getTeamById, getTeamByName,
    getOperatorById, getOperatorsByTeamId,
    getAccountById, getAccountsByTeamId,

    reset,
  }
}, {
  persist: {
    paths: ['teams', 'operators', 'accounts'],
    storage: localStorage
  }
})
