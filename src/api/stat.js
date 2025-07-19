import api from "./base"

export function getOpsStats(data) {
    return api.get('/ops/stats', { params: data })
}
export function getOperatorStats(data) {
    return api.get('/admin/stats/op', { params: data })
}

export function getTeamStats(data) {
    return api.get('/admin/stats/team', { params: data })
}

export function getAccountStats(data) {
    return api.get('/admin/stats/acc', { params: data })
}

// Ajouter une stat à un opérateur
export function addOperatorStat(data) {
    return api.post('/admin/stat', data)
} 

// Supprimer une stat (par id)
export function deleteStat(id) {
    return api.delete(`/admin/stat/${id}`)
}

export function generateFacture(data) {
  return api.get('/admin/stats/summary/generate', { params: data })
}

export async function downloadFacture(data) {
  try {
    const response = await api.get(
      `/admin/stats/summary/download`,
      {
        params: data,
        responseType: 'blob', // important pour gérer un fichier binaire
      }
    )

    let filename = data?.name

    // Créer un lien temporaire pour déclencher le téléchargement
    const blob = new Blob([response.data], { type: 'application/zip' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur lors du téléchargement :', error)
  }
}

export function getChartData(data) {
    return api.get('/admin/chartdata', { params: data })
}