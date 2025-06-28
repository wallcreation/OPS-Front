<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const operatorid = route.params.id
console.log('operator id', operatorid)
const operator = ref({
  lname: 'Smith',
  fname: 'Smith',
  email: 'exemple@email.com',
  wortat: 'Jour',
  team: 'Team A',
})
const passtype = ref('password')
const showopedit = ref(false)
const showstatadd = ref(false) // ce bool déclenche le modal
const addStat = () => {
  console.log('Ajouter stat !')
  showstatadd.value = false
}
const showpenality = ref(false) // ce bool déclenche le modal
const addPenality = () => {
  console.log('Ajouter stat !')
  showpenality.value = false
}
</script>
<template>
  <div class="grid grid-cols-1 gap-2 md:grid-cols-4 mt-2">
    <div class="md:col-span-2 p-2 bg-surface border-2 border-border rounded-lg">
      <div class="flex justify-between">
        <h1 class="text-5xl">{{ operator.fname }} {{ operator.lname }}</h1>
        <button class="active:text-primary hover:text-primary" @click="showopedit = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"
            />
          </svg>
        </button>
      </div>
      <div class="flex gap-2">
        <p>{{ operator.email }}</p>
        <p>{{ operator.team }}</p>
      </div>
    </div>
    <div class="bg-surface p-2 border-2 border-border rounded-lg">
      <div class="flex justify-between">
        <h1 class="text-primary font-bold">Statistiques</h1>
        <button class="active:text-primary hover:text-primary" @click="showstatadd = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="bg-surface p-2 border-2 border-border rounded-lg">
      <div class="flex justify-between">
        <h1 class="text-error font-bold">Pénalités</h1>
        <button class="active:text-error hover:text-error" @click="showpenality = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="p-2 md:col-span-2 bg-surface border-2 border-border rounded-lg">
        <h2 class="text-xl font-bold">Détail des Statistiques</h2>
        <table>
        </table>
    </div>
    <div class="p-2 md:col-span-2 bg-surface border-2 border-border rounded-lg">
        <h2 class="text-xl font-bold">Diagramme des Statistiques</h2>
    </div>
  </div>
  <!-- Begin of modal -->
  <div
    v-if="showopedit"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-md"
  >
    <div class="p-4 items-center justify-between bg-surface border-2 border-border rounded-lg">
      <h2>Modifier l'opérateur</h2>
      <form action="" class="mx-1 grid gap-2 grid-cols-1 md:grid-cols-2">
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Nom"
          class="border-b-2 outline-none border-border focus:border-primary hover:border-border"
        />
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="Prénom"
          class="border-b-2 outline-none border-border focus:border-primary hover:border-border"
        />
        <input
          type="text"
          name="team"
          id="team"
          placeholder="Equipe"
          class="col-span-2 border-b-2 outline-none border-border focus:border-primary hover:border-border"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Adresse mail"
          class="border-b-2 border-border outline-none focus:border-primary hover:border-border"
        />
        <div
          class="flex justify-between border-b-2 border-border focus-within:border-primary hover:border-primary"
        >
          <input
            :type="passtype"
            name="password"
            id="password"
            placeholder="Mot de passe"
            class="bg-transparent outline-none"
          />
          <button v-if="passtype === 'password'" @click="passtype = 'text'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M2.69 6.705a.75.75 0 0 0-1.38.59zm12.897 6.624l-.274-.698zm-6.546.409a.75.75 0 1 0-1.257-.818zm-2.67 1.353a.75.75 0 1 0 1.258.818zM22.69 7.295a.75.75 0 0 0-1.378-.59zM19 11.13l-.513-.547zm.97 2.03a.75.75 0 1 0 1.06-1.06zm-8.72 3.34a.75.75 0 0 0 1.5 0zm5.121-.591a.75.75 0 1 0 1.258-.818zm-10.84-4.25A.75.75 0 0 0 4.47 10.6zm-2.561.44a.75.75 0 0 0 1.06 1.06zM12 13.25c-3.224 0-5.539-1.605-7.075-3.26a13.6 13.6 0 0 1-1.702-2.28a12 12 0 0 1-.507-.946l-.022-.049l-.004-.01l-.001-.001L2 7l-.69.296h.001l.001.003l.003.006l.04.088q.039.088.117.243c.103.206.256.496.462.841c.41.69 1.035 1.61 1.891 2.533C5.54 12.855 8.224 14.75 12 14.75zm3.313-.62c-.97.383-2.071.62-3.313.62v1.5c1.438 0 2.725-.276 3.862-.723zm-7.529.29l-1.413 2.17l1.258.818l1.412-2.171zM22 7l-.69-.296h.001v.002l-.007.013l-.028.062a12 12 0 0 1-.64 1.162a13.3 13.3 0 0 1-2.15 2.639l1.027 1.094a14.8 14.8 0 0 0 3.122-4.26l.039-.085l.01-.024l.004-.007v-.003h.001v-.001zm-3.513 3.582c-.86.806-1.913 1.552-3.174 2.049l.549 1.396c1.473-.58 2.685-1.444 3.651-2.351zm-.017 1.077l1.5 1.5l1.06-1.06l-1.5-1.5zM11.25 14v2.5h1.5V14zm3.709-.262l1.412 2.171l1.258-.818l-1.413-2.171zm-10.49-3.14l-1.5 1.5L4.03 13.16l1.5-1.5z"
              />
            </svg>
          </button>
          <button v-else @click="passtype = 'password'">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  d="M9 4.46A9.8 9.8 0 0 1 12 4c4.182 0 7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296A14.5 14.5 0 0 1 5 6.821"
                />
                <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
              </g>
            </svg>
          </button>
        </div>
      </form>
      <div class="mt-1 flex gap-2 justify-end">
        <button
          class="text-primary active:border-b-2 active:border-primary hover:border-b-2 hover:border-primary"
        >
          Valider
        </button>
        <button
          class="text-error active:border-b-2 active:border-error hover:border-b-2 hover:border-error"
          @click="showopedit = false"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="showstatadd"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <h2 class="text-xl font-bold text-text mb-4">Ajouter une stat</h2>
      <form class="grid gap-3">
        <input
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <button
            class="text-primary hover:border-b-2 hover:border-primary-light"
            @click.prevent="addStat"
          >
            Ajouter
          </button>
          <button
            class="text-error hover:border-b-2 hover:border-error"
            @click="showstatadd = false"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
  <div
    v-if="showpenality"
    class="fixed inset-0 z-50 flex items-center justify-center bg-bg/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-lg mx-4 bg-surface border border-border rounded-xl p-4">
      <h2 class="text-xl font-bold text-text mb-4">Ajouter une pénalité</h2>
      <form class="grid gap-3">
        <input
          type="text"
          placeholder="Raison"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <input
          type="number"
          placeholder="Montant"
          class="border-b-2 border-border focus:border-primary hover:border-primary-dark outline-none bg-transparent px-2 py-1"
        />
        <div class="flex justify-end gap-3 mt-2">
          <button
            class="text-primary hover:border-b-2 hover:border-primary-light"
            @click.prevent="addPenality"
          >
            Ajouter
          </button>
          <button
            class="text-error hover:border-b-2 hover:border-error"
            @click="showpenality = false"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
