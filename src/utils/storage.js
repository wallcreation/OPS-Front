import { useAppStore } from "@/stores/app"
import { useSessionStore } from "@/stores/session"
import { useErrorStore } from "@/stores/error"
import { useNotificationStore } from "@/stores/notification"

export const saveProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const loadProfile = () => {
  return JSON.parse(localStorage.getItem('profile') || '{}')
}

export const clearProfile = () => {
  return localStorage.clear()
}

export const resetAll = () => {
  const appStore = useAppStore()
  const sessionStore = useSessionStore()
  const errorStore = useErrorStore()
  const notificationStore = useNotificationStore()

  appStore.reset()
  sessionStore.clearSession()
  errorStore.reset()
  notificationStore.reset()

  clearProfile() // Clear local storage profile
}