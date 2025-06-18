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
function formatDate(dateStr, options = { weekday: "short", day: '2-digit'}) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('fr-FR', options).format(date)
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
    <div>
      <table class="w-full text-center">
        <thead>
          <tr>
            <th class="w-16 ">Date</th>
            <th>Messages</th>
            <th>Pénalités</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stat in stats" :key="stat">
            <td class="w-16">{{ formatDate(stat.date) }}</td>
            <td>
              {{ stat.total }} <sup>{{ stat.stop_total }}</sup>
            </td>
            <td>
                {{ penalty.find(p => p.date === stat.date)?.amount || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
