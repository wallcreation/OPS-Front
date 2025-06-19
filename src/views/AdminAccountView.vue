<script setup>
import { ref } from 'vue'
// account = { id, name, team, stats: {total: int, op:[{name, amount}, {name, amount}]} }
const accounts = ref([
  {
    id: 1,
    name: 'Account1',
    team: 'Team A',
    stats: {
      total: 100,
      op: [
        { name: 'Operator1', amount: 50 },
        { name: 'Operator2', amount: 50 },
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
        { name: 'Operator3', amount: 100 },
        { name: 'Operator4', amount: 100 },
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
        { name: 'Operator5', amount: 75 },
        { name: 'Operator6', amount: 75 },
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
        { name: 'Operator7', amount: 125 },
        { name: 'Operator8', amount: 125 },
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
        { name: 'Operator9', amount: 150 },
        { name: 'Operator10', amount: 150 },
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
        { name: 'Operator11', amount: 175 },
        { name: 'Operator12', amount: 175 },
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
        { name: 'Operator13', amount: 200 },
        { name: 'Operator14', amount: 200 },
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
        { name: 'Operator15', amount: 225 },
        { name: 'Operator16', amount: 225 },
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
        { name: 'Operator17', amount: 250 },
        { name: 'Operator18', amount: 250 },
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
        { name: 'Operator19', amount: 275 },
        { name: 'Operator20', amount: 275 },
      ],
    },
  },
])
</script>
<template>
    
</template>
