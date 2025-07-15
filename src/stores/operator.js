// stores/operator.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { getOpsStats, getOpsPenalties, safeCall } from '@/api'

export const useOperatorStore = defineStore('operator', () => {
  const operatorData = ref({})

  // Fonction utilitaire pour obtenir une clé de mois au format 'YYYY-MM'
  const getKey = (month) => month || dayjs().format('YYYY-MM')

  // Récupérer les données d’un mois, en la téléchargeant si besoin
  const getMonthData = async (month = null) => {
    const key = getKey(month)

    if (!operatorData.value[key]) {
      // Initialise l'entrée
      operatorData.value[key] = { stats: [], penalties: [] }

      const payload = { date: key }

      const [stats, statErr] = await safeCall(getOpsStats(payload))
      if (!statErr) operatorData.value[key].stats = stats

      const [penalties, penErr] = await safeCall(getOpsPenalties(payload))
      if (!penErr) operatorData.value[key].penalties = penalties
    }

    return operatorData.value[key]
  }

  // Mise à jour manuelle des stats
  const setStats = (month, stats) => {
    const key = getKey(month)
    if (!operatorData.value[key]) operatorData.value[key] = { stats: [], penalties: [] }
    operatorData.value[key].stats = stats
  }

  // Mise à jour manuelle des pénalités
  const setPenalties = (month, penalties) => {
    const key = getKey(month)
    if (!operatorData.value[key]) operatorData.value[key] = { stats: [], penalties: [] }
    operatorData.value[key].penalties = penalties
  }

  // Mise à jour automatique du mois courant
  const fetchCurrentMonthData = async () => {
    await getMonthData() // par défaut => mois courant
  }

  // Réinitialiser le store (ex : lors d’un logout)
  const clearOperatorData = () => {
    operatorData.value = {}
  }

  return {
    operatorData,
    getMonthData,
    setStats,
    setPenalties,
    fetchCurrentMonthData,
    clearOperatorData,
  }
})
