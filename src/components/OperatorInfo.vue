<script setup>
const props = defineProps({
  operator: {
    type: Object,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
  penalty: {
    type: Array,
    required: true,
  },
})
function getpenaltyamount(date) {
  return props.penalty.find((p) => p.date === date)?.amount || '-'
}
function getpenaltyraison(date) {
  return props.penalty.find((p) => p.date === date)?.reason
}
// function formatDate(dateStr, options = { weekday: 'short', day: '2-digit' }) {
//   const date = new Date(dateStr)
//   return new Intl.DateTimeFormat('fr-FR', options).format(date)
// }
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

function getPenaltyAmount(date) {
  const penaltyEntry = props.penalty.find((p) => p.date === date)
  return penaltyEntry ? penaltyEntry.amount : '-'
}

function getPenaltyReason(date) {
  const penaltyEntry = props.penalty.find((p) => p.date === date)
  return penaltyEntry ? penaltyEntry.reason : 'Aucune pénalité'
}
</script>
<template>
  <div class="p-2 rounded">
    <div class="">
      <div class="w-full flex items-center justify-between">
        <h1 class="text-5xl font-bold text-[#00B894]">{{ operator.lname }} {{ operator.fname }}</h1>
        <div class="flex gap-1">
          <button
            class="flex items-center justify-center p-1 rounded-lg border-2 border-[#3B91F9] hover:bg-[#3B91F9] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-[#3B91F9] fill-current mx-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <span class="md:inline hidden ms-1">Modifier</span>
          </button>
          <button
            class="flex items-center justify-center p-1 rounded-lg border-2 border-[#EB5757] hover:bg-[#EB5757] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-[#EB5757] fill-current mx-auto"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <span class="md:inline hidden">Supprimer</span>
          </button>
        </div>
      </div>
      <p class="text-sm inline mx-1">{{ operator.team }}</p>
      <p class="text-sm inline mx-1">{{ operator.workat }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      <fieldset class="flex items-center gap-2 border-2 border-[#2F80ED] rounded-lg p-1">
        <legend class="text-center text-lg font-semibold text-[#2F80ED]">Statistiques</legend>
        <p><span class="underline">Compte 1</span>: 50522</p>
        <p><span class="underline">Compte 2</span>: 50522</p>
        <p><span class="underline">Total</span>: 98009</p>
      </fieldset>
      <fieldset class="flex items-center gap-2 border-2 border-[#EB5757] rounded-lg px-2">
        <legend class="text-center text-lg font-semibold text-[#EB5757]">Pénalités</legend>
        <p><span class="underline">Compte 1</span>: 50522</p>
        <p><span class="underline">Compte 2</span>: 50522</p>
        <p><span class="underline">Total</span>: 98009</p>
      </fieldset>
    </div>
    <!--Stat table-->
    <div class="mt-2">
      <div></div>
      <table
        class="w-full table-auto border border-[#2F80ED] text-sm text-white rounded-lg overflow-hidden"
      >
        <thead class="">
          <tr>
            <th class="px-3 py-2 border-b border-[#2F80ED] text-left font-semibold w-24">Date</th>
            <th class="px-3 py-2 border-b border-[#2F80ED] text-left font-semibold text-[#2F80ED]">
              Messages
            </th>
            <th class="px-3 py-2 border-b border-[#EB5757] text-left font-semibold text-[#EB5757]">
              Pénalités
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stat in stats"
            :key="stat.id"
            class="hover:bg-[#2F80ED]/10 transition-colors border-b border-[#444]"
          >
            <td class="px-3 py-2">
              {{ formatDate(stat.date) }}
            </td>
            <td class="px-3 py-2 text-[#2F80ED]">
              <div>
                  <p class="inline me-5 ">
                    {{ stat.total }} <sup class="text-xs text-gray-400">{{ stat.stop_total }}</sup>
                  </p>
                  <p class="inline text-xs text-gray-400">
                    {{ stat.start }}
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 inline"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </span>
                    {{ stat.end }}
                  </p>
              </div>
            </td>
            <td class="px-3 py-2 text-[#EB5757]" :title="getPenaltyReason(stat.date)">
              {{ getPenaltyAmount(stat.date) }} - {{ getPenaltyReason(stat.date) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
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
  background-color: #00b894; /* plus foncé */
}
</style>
