<script setup>
import AccountInfo from '@/components/AccountInfo.vue'
import { ref } from 'vue'
// account = { id, name, team, stats: {total: int, op:[{id, name, amount}, {name, amount}]} }
const accounts = ref([
  {
    id: 1,
    name: 'Account1',
    team: 'Team A',
    stats: {
      total: 100,
      op: [
        { id: 1, name: 'Operator1', amount: 50 },
        { id: 2, name: 'Operator2', amount: 100 },
      ],
    },
  },
  {
    id: 2,
    name: 'Account2',
    team: 'Team A',
    stats: {
      total: 200,
      op: [
        { id: 1, name: 'Operator3', amount: 100 },
        { id: 2, name: 'Operator4', amount: 100 },
      ],
    },
  },
  {
    id: 3,
    name: 'Account3',
    team: 'Team B',
    stats: {
      total: 150,
      op: [
        { id: 1, name: 'Operator5', amount: 75 },
        { id: 2, name: 'Operator6', amount: 75 },
      ],
    },
  },
  {
    id: 4,
    name: 'Account4',
    team: 'Team B',
    stats: {
      total: 250,
      op: [
        { id: 1, name: 'Operator7', amount: 125 },
        { id: 2, name: 'Operator8', amount: 125 },
      ],
    },
  },
  {
    id: 5,
    name: 'Account5',
    team: 'Team C',
    stats: {
      total: 300,
      op: [
        { id: 1, name: 'Operator9', amount: 150 },
        { id: 2, name: 'Operator10', amount: 150 },
      ],
    },
  },
  {
    id: 6,
    name: 'Account6',
    team: 'Team C',
    stats: {
      total: 350,
      op: [
        { id: 1, name: 'Operator11', amount: 175 },
        { id: 2, name: 'Operator12', amount: 175 },
      ],
    },
  },
  {
    id: 7,
    name: 'Account7',
    team: 'Team D',
    stats: {
      total: 400,
      op: [
        { id: 1, name: 'Operator13', amount: 200 },
        { id: 2, name: 'Operator14', amount: 200 },
      ],
    },
  },
  {
    id: 8,
    name: 'Account8',
    team: 'Team D',
    stats: {
      total: 450,
      op: [
        { id: 1, name: 'Operator15', amount: 225 },
        { id: 2, name: 'Operator16', amount: 225 },
      ],
    },
  },
  {
    id: 9,
    name: 'Account9',
    team: 'Team E',
    stats: {
      total: 500,
      op: [
        { id: 1, name: 'Operator17', amount: 250 },
        { id: 2, name: 'Operator18', amount: 250 },
      ],
    },
  },
  {
    id: 10,
    name: 'Account10',
    team: 'Team E',
    stats: {
      total: 550,
      op: [
        { id: 1, name: 'Operator19', amount: 275 },
        { id: 2, name: 'Operator20', amount: 275 },
      ],
    },
  },
])
const currentAccount = ref(accounts.value[0])
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="min-h-[3.5rem] flex items-center gap-3 p-1 mb-1 overflow-x-auto">
      <div v-for="account in accounts" :key="account.id" class="py-1 px-3 text-nowrap outline-2 outline-offset-2 outline-[#E84393] rounded-lg" :class="[ currentAccount.id === account.id ? 'bg-[#E84393] text-[#222222] text-bold' : 'bg-[#222222]']" @click="currentAccount = account">
        <h1>{{ account.name }}</h1>
      </div>
    </div>
    <div class="flex-1 bg-[#222222] border-2 border-[#E84393] rounded-lg gap-2 p-2 overflow-y-auto h-full p-1">
      <AccountInfo :account="currentAccount" />
    </div>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 7px;
  height: 7px; /* important si scroll horizontal */
}

/* Fond du track (la ligne du scroll) */
::-webkit-scrollbar-track {
  background: transparent !important;
}

/* Barre de scroll */
::-webkit-scrollbar-thumb {
  background-color: #888888; /* violet */
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* Hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #E84393; /* plus foncé */
}
</style>
