// stores/operator.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { getOpsStats, getOpsPenalties, safeCall, getOpsAccounts } from '@/api'

export const useOperatorStore = defineStore('operator', () => {
  const operatorData = ref({})
  const accounts = ref([])

  
  // Récupère tous les comptes depuis l'API
  const fetchAllAccounts = async () => {
    const [res, err] = await safeCall(getOpsAccounts())
    if (!err) {
      accounts.value = res
    }
  }

  // Renvoie le nom d’un compte à partir de son ID
  const getAccountById = (id) => accounts.value.find((acc) => acc.id === id)

  return {
    operatorData,
    accounts,
    fetchAllAccounts,
    getAccountById,
  }
})
