<script setup>
import TeamCard from '@/components/TeamCard.vue'
import OperatorCard from '@/components/OperatorCard.vue'
import AccountCard from '@/components/AccountCard.vue'
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
  <div class="h-screen flex flex-col items-center justify-center text-center bg-[#0F172A] text-[#E4E2F0]">
    <div class="bg-[#1E293B] p-8 rounded-2xl shadow-xl outline outline-2 outline-offset-2 outline-[#334155] w-full max-w-md">
      <div class="space-y-6">
        <div class="bg-[#334155] p-4 rounded-xl shadow text-lg">
          <p class="text-2xl font-bold text-[#7B61FF]">{{ teams.length }}</p>
          <p>Équipes</p>
        </div>
        <div class="flex justify-between gap-4">
          <div class="bg-[#334155] p-4 rounded-xl shadow flex-1 text-lg">
            <p class="text-2xl font-bold text-[#27AE60]">{{ operators.length }}</p>
            <p>Opérateurs</p>
          </div>
          <div class="bg-[#334155] p-4 rounded-xl shadow flex-1 text-lg">
            <p class="text-2xl font-bold text-[#F2994A]">{{ accounts.length }}</p>
            <p>Comptes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
