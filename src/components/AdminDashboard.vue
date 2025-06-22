<script setup>
import TeamCard from './TeamCard.vue'
import OperatorCard from './OperatorCard.vue'
import AccountCard from './AccountCard.vue'
import { ref } from 'vue'
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
</script>
<template>
  <div class="p-1 flex flex-col">
    <!-- Zone TeamCard (en haut) -->
    <div class="w-full min-h-[6rem] flex overflow-x-auto">
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :id="team.id"
        :name="team.name"
        :operators="team.operators"
        :accounts="team.accounts"
        class="m-1 rounded-lg"
      />
    </div>

    <!-- Zone OperatorCard (en bas) -->
    <div class="w-full flex-grow flex gap-1 mt-1 overflow-hidden">
      <div class="w-1/2 overflow-y-auto">
        <OperatorCard
          v-for="operator in operators"
          :key="operator.id"
          :id="operator.id"
          :fname="operator.fname"
          :lname="operator.lname"
          :team="operator.team"
          :workat="operator.workat"
          class="m-1 rounded-lg"
        />
      </div>
      <div class="h-full w-1/2 overflow-y-auto">
        <AccountCard
          v-for="account in accounts"
          :key="account.id"
          :id="account.id"
          :name="account.name"
          :team="account.team"
          class="m-1 rounded-lg"
        />
      </div>
    </div>
  </div>
</template>
