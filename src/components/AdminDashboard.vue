<script setup>
import TeamCard from './TeamCard.vue'
import OperatorCard from './OperatorCard.vue'
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
</script>
<template>
  <main class="p-1 w-5/6 h-screen text-[#E0E0E0]">
    <div class="w-full h-1/5 flex rounded-lg border-1 border-[#6C5CE7] overflow-x-auto">
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :name="team.name"
        :operators="team.operators"
        :accounts="team.accounts"
        class="m-1 rounded-lg"
      />
    </div>
    <div class="w-1/2 h-4/5 mt-1">
      <div class="h-full rounded border-1 border-[#00B894] overflow-y-auto">
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
    </div>
  </main>
</template>
