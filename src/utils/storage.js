export const saveProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const loadProfile = () => {
  return JSON.parse(localStorage.getItem('profile') || '{}')
}
