<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { onMounted } from 'vue'
import AdminHeader from '@/components/AdminHeader.vue'
import TeamListH from '@/components/TeamListH.vue'
const router = useRouter()
const me = ref({})
const dashboard = ref({
  teams: [],
  operators: [],
  accounts: [],
})
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }
  api
    .get('/me')
    .then((response) => {
      me.value = response.data.user
    })
    .catch((error) => {
      console.error('Error fetching admin data:', error)
      router.push('/login')
    })

  api
    .get('/admin/dashboard')
    .then((response) => {
      dashboard.value = response.data
      console.log('Dashboard data:', dashboard)
    })
    .catch((error) => {
      console.error('Error fetching dashboard data:', error)
    })
})
</script>

<template>
  <AdminHeader
    :fname="me.fname"
    :lname="me.lname"
    :teams="dashboard.teams.length"
    :operators="dashboard.operators.length"
    :accounts="dashboard.accounts.length"
  />
  <main class="bg-[url('/generalbg.jpg')] bg-cover h-screen w-full px-5"></main>
</template>
