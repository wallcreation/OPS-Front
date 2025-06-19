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
            class="flex items-center justify-center p-1 hover:border-b-2 hover:border-[#3B91F9]"
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
            class="flex items-center justify-center p-1 hover:border-b-2 hover:border-[#EB5757]"
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
            <!-- DATE -->
            <td class="px-3 py-2">
              {{ formatDate(stat.date) }}
            </td>

            <!-- MESSAGES + icône suppression -->
            <td class="px-3 py-2 text-[#2F80ED]">
              <div class="flex justify-between items-center w-full">
                <div>
                  <p class="inline me-5">
                    {{ stat.total }}
                    <sup class="text-xs text-gray-400">{{ stat.stop_total }}</sup>
                  </p>
                  <p class="hidden md:inline text-xs text-gray-400">
                    {{ stat.start }}
                    <sup>{{ stat.stop_start }}</sup>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4 inline text-[#2F80ED] mx-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                    {{ stat.end }}
                    <sup>{{ stat.stop_end }}</sup>
                  </p>
                </div>
                <button class="ml-3">
                  <!-- suppression messages -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </button>
              </div>
            </td>

            <!-- PÉNALITÉS + icône suppression -->
            <td class="px-3 py-2 text-[#EB5757]">
              <div
                class="flex justify-between items-center w-full"
                :title="getPenaltyReason(stat.date)"
              >
                <p class="inline">
                  {{ getPenaltyAmount(stat.date) }} - {{ getPenaltyReason(stat.date) }}
                </p>
                <button class="ml-3">
                  <!-- suppression pénalité -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 text-[#EB5757]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
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
