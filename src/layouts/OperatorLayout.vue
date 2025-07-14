<script setup>
import { useSessionStore } from '@/stores/session'
import Header from '@/components/ops/Header.vue'
const sessionStore = useSessionStore()
</script>

<template>
  <Header :profile="sessionStore.user" class="text-text"/>
  <div class="flex text-text  ">
    <h1 class="text-xl">User</h1>
  </div>
</template>
