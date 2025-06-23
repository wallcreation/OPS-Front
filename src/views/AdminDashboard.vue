<script setup>
import { ref } from 'vue'
import TeamCard from '@/components/TeamCard.vue'
import OperatorCard from '@/components/OperatorCard.vue'
import AccountCard from '@/components/AccountCard.vue'
const teams = ref([
  { id: 1, name: 'Team A', operators: ['Alice', 'Bob'], accounts: ['Account1', 'Account2'] },
  { id: 2, name: 'Team B', operators: ['Charlie', 'David'], accounts: ['Account3', 'Account4'] },
  { id: 3, name: 'Team C', operators: ['Eve', 'Frank'], accounts: ['Account5', 'Account6'] },
  { id: 4, name: 'Team D', operators: ['Grace', 'Heidi'], accounts: ['Account7', 'Account8'] },
  { id: 5, name: 'Team E', operators: ['Ivan', 'Judy'], accounts: ['Account9', 'Account10'] },
  { id: 6, name: 'Team F', operators: ['Karl', 'Leo'], accounts: ['Account11', 'Account12'] },
  { id: 7, name: 'Team G', operators: ['Mallory', 'Nina'], accounts: ['Account13', 'Account14'] },
  { id: 8, name: 'Team H', operators: ['Oscar', 'Peggy'], accounts: ['Account15', 'Account16'] },
  { id: 9, name: 'Team I', operators: ['Quentin', 'Rupert'], accounts: ['Account17', 'Account18'] },
  { id: 10, name: 'Team J', operators: ['Sybil', 'Trent'], accounts: ['Account19', 'Account20'] },
])
const operators = ref([
  { id: 1, fname: 'Alice', lname: 'Smith', team: 'Team A', workat: 'day' },
  { id: 2, fname: 'Bob', lname: 'Johnson', team: 'Team A', workat: 'night' },
  { id: 3, fname: 'Charlie', lname: 'Brown', team: 'Team B', workat: 'day' },
  { id: 4, fname: 'David', lname: 'Williams', team: 'Team B', workat: 'night' },
  { id: 5, fname: 'Eve', lname: 'Jones', team: 'Team C', workat: 'day' },
  { id: 6, fname: 'Frank', lname: 'Garcia', team: 'Team C', workat: 'night' },
  { id: 7, fname: 'Grace', lname: 'Martinez', team: 'Team D', workat: 'day' },
  { id: 8, fname: 'Heidi', lname: 'Hernandez', team: 'Team D', workat: 'night' },
  { id: 9, fname: 'Ivan', lname: 'Lopez', team: 'Team E', workat: 'day' },
  { id: 10, fname: 'Judy', lname: 'Gonzalez', team: 'Team E', workat: 'night' },
])
const accounts = ref([
  { id: 1, name: 'Account1', team: 'Team A' },
  { id: 2, name: 'Account2', team: 'Team A' },
  { id: 3, name: 'Account3', team: 'Team B' },
  { id: 4, name: 'Account4', team: 'Team B' },
  { id: 5, name: 'Account5', team: 'Team C' },
  { id: 6, name: 'Account6', team: 'Team C' },
  { id: 7, name: 'Account7', team: 'Team D' },
  { id: 8, name: 'Account8', team: 'Team D' },
  { id: 9, name: 'Account9', team: 'Team E' },
  { id: 10, name: 'Account10', team: 'Team E' },
])
const switcher = ref(1)
</script>
<template>
  <div class="flex items-center justify-between px-5 py-2 mt-2 mb-2 bg-surface rounded-lg">
    <button
    class="hover:border-b-2 hover:border-primary"
      :class="[switcher === 1 ? 'text-primary border-b-2 border-primary' : '']"
      @click="switcher = 1"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6-3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m19 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M9.377 13a3.98 3.98 0 0 0-.877 2.5V23c0 1.235.298 2.4.827 3.427A5 5 0 0 1 2 22v-6.5A2.5 2.5 0 0 1 4.5 13zm13.296 13.427A7.5 7.5 0 0 0 23.5 23v-7.5c0-.946-.328-1.815-.877-2.5H27.5a2.5 2.5 0 0 1 2.5 2.5V22a5 5 0 0 1-7.327 4.427M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5z"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Equipes</span>
    </button>
    <button
    class="hover:border-b-2 hover:border-primary"
      :class="[switcher === 2 ? 'text-primary border-b-2 border-primary' : '']"
      @click="switcher = 2"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6-3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m19 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M9.377 13a3.98 3.98 0 0 0-.877 2.5V23c0 1.235.298 2.4.827 3.427A5 5 0 0 1 2 22v-6.5A2.5 2.5 0 0 1 4.5 13zm13.296 13.427A7.5 7.5 0 0 0 23.5 23v-7.5c0-.946-.328-1.815-.877-2.5H27.5a2.5 2.5 0 0 1 2.5 2.5V22a5 5 0 0 1-7.327 4.427M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5z"
          />
        </svg>
      </span>
      <span class="hidden md:inline">Opérateurs</span>
    </button>
    <button
    class="hover:border-b-2 hover:border-primary"
      :class="[switcher === 3 ? 'text-primary border-b-2 border-primary' : '']"
      @click="switcher = 3"
    >
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          class="inline pb-1"
        >
          <path
            fill="currentColor"
            d="M16 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6-3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m19 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M9.377 13a3.98 3.98 0 0 0-.877 2.5V23c0 1.235.298 2.4.827 3.427A5 5 0 0 1 2 22v-6.5A2.5 2.5 0 0 1 4.5 13zm13.296 13.427A7.5 7.5 0 0 0 23.5 23v-7.5c0-.946-.328-1.815-.877-2.5H27.5a2.5 2.5 0 0 1 2.5 2.5V22a5 5 0 0 1-7.327 4.427M12.5 13a2.5 2.5 0 0 0-2.5 2.5V23a6 6 0 0 0 12 0v-7.5a2.5 2.5 0 0 0-2.5-2.5z"
          /></svg
      ></span>
      <span class="hidden md:inline">Comptes</span>
    </button>
  </div>
  <div class="">
    <div v-if="switcher === 1" class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :id="team.id"
        :name="team.name"
        :operators="team.operators"
        :accounts="team.accounts"
      />
    </div>
    <div v-if="switcher === 2" class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <OperatorCard
        v-for="operator in operators"
        :key="operator.id"
        :id="operator.id"
        :fname="operator.fname"
        :lname="operator.lname"
        :team="operator.team"
        :workat="operator.workat"
      />
    </div>
    <div v-if="switcher === 3" class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AccountCard
        v-for="account in accounts"
        :key="account.id"
        :id="account.id"
        :name="account.name"
        :team="account.team"
      />
    </div>
  </div>
</template>
