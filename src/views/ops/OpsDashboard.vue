<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useOperatorStore } from '@/stores/operator'
import MonthSelector from '@/components/utils/MonthSelector.vue'
import StatDisplay from '@/components/admin/StatDisplay.vue'

const sessionStore = useSessionStore()
const stores = useOperatorStore()
const selectedMonth = ref(dayjs().format('YYYY-MM'))
const profile = sessionStore.user

// const team = await safeCall(getOpsTeam({ id: profile.team_id }))
const monthChanged = async (month) => {
  selectedMonth.value = month.value
  console.log('Selected month:', selectedMonth.value)
  monthData.value = await stores.getMonthData(selectedMonth.value)
}
const monthData = ref({ stats: [], penalties: [] })

onMounted(async () => {
  await monthChanged(selectedMonth)
})
</script>
<template>
  <div>
      <section class="p-2 bg-surface rounded-lg border-2 border-border">
        <h1 class="text-5xl text-primary">{{ profile.lname }} {{ profile.fname }}</h1>
        <div class="flex gap-1">
          <p>{{ profile.email }}</p>
          <p class="text-primary">-</p>
          <p>{{ profile.team_name }}</p>
          <p class="text-primary">-</p>
          <p>
            <svg
              v-if="profile.work_at === 1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient
                  id="meteoconsHazeDayFill0"
                  x1="17.3"
                  x2="89.3"
                  y1="43.1"
                  y2="167.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#d4d7dd" />
                  <stop offset=".5" stop-color="#d4d7dd" />
                  <stop offset="1" stop-color="#bec1c6" />
                </linearGradient>
                <linearGradient
                  id="meteoconsHazeDayFill1"
                  x1="107.3"
                  x2="179.3"
                  y1="-8.8"
                  y2="115.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill2"
                  x1="174.8"
                  x2="246.8"
                  y1="-47.8"
                  y2="76.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill3"
                  x2="89.3"
                  y1="-4.9"
                  y2="119.8"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill4"
                  x1="107.3"
                  x2="179.3"
                  y1="-56.9"
                  y2="67.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill5"
                  x1="174.8"
                  x2="246.8"
                  y1="-95.8"
                  y2="28.9"
                  href="#meteoconsHazeDayFill0"
                />
                <linearGradient
                  id="meteoconsHazeDayFill6"
                  x1="150"
                  x2="234"
                  y1="119.2"
                  y2="264.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fbbf24" />
                  <stop offset=".5" stop-color="#fbbf24" />
                  <stop offset="1" stop-color="#f59e0b" />
                </linearGradient>
                <symbol id="meteoconsHazeDayFill7" viewBox="0 0 384 384">
                  <circle
                    cx="192"
                    cy="192"
                    r="84"
                    fill="url(#meteoconsHazeDayFill6)"
                    stroke="#f8af18"
                    stroke-miterlimit="10"
                    stroke-width="6"
                  />
                  <path
                    fill="none"
                    stroke="#fbbf24"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="24"
                    d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"
                  >
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 192 192; 45 192 192"
                    />
                  </path>
                </symbol>
                <symbol id="meteoconsHazeDayFill8" viewBox="0 0 264 72">
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill0)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 60h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill1)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 60h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill2)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 60h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="-24 0; 24 0; -24 0"
                    />
                  </g>
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill3)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 12h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill4)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 12h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeDayFill5)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 12h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="24 0; -24 0; 24 0"
                    />
                  </g>
                </symbol>
                <clipPath id="meteoconsHazeDayFill9"><path fill="none" d="M0 0h512v306H0z" /></clipPath>
              </defs>
              <g clip-path="url(#meteoconsHazeDayFill9)">
                <use
                  width="384"
                  height="384"
                  href="#meteoconsHazeDayFill7"
                  transform="translate(64 100)"
                />
              </g>
              <use
                width="264"
                height="72"
                href="#meteoconsHazeDayFill8"
                transform="translate(124 336)"
              />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
              <defs>
                <linearGradient
                  id="meteoconsHazeNightFill0"
                  x1="17.3"
                  x2="89.3"
                  y1="43.1"
                  y2="167.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#d4d7dd" />
                  <stop offset=".5" stop-color="#d4d7dd" />
                  <stop offset="1" stop-color="#bec1c6" />
                </linearGradient>
                <linearGradient
                  id="meteoconsHazeNightFill1"
                  x1="107.3"
                  x2="179.3"
                  y1="-8.8"
                  y2="115.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill2"
                  x1="174.8"
                  x2="246.8"
                  y1="-47.8"
                  y2="76.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill3"
                  x2="89.3"
                  y1="-4.9"
                  y2="119.8"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill4"
                  x1="107.3"
                  x2="179.3"
                  y1="-56.9"
                  y2="67.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill5"
                  x1="174.8"
                  x2="246.8"
                  y1="-95.8"
                  y2="28.9"
                  href="#meteoconsHazeNightFill0"
                />
                <linearGradient
                  id="meteoconsHazeNightFill6"
                  x1="54.3"
                  x2="187.2"
                  y1="29"
                  y2="259.1"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#86c3db" />
                  <stop offset=".5" stop-color="#86c3db" />
                  <stop offset="1" stop-color="#5eafcf" />
                </linearGradient>
                <symbol id="meteoconsHazeNightFill7" viewBox="0 0 270 270">
                  <path
                    fill="url(#meteoconsHazeNightFill6)"
                    stroke="#72b9d5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="6"
                    d="M252.3 168.6A133.4 133.4 0 0 1 118 36.2A130.5 130.5 0 0 1 122.5 3A133 133 0 0 0 3 134.6C3 207.7 63 267 137.2 267c62.5 0 114.8-42.2 129.8-99.2a135.6 135.6 0 0 1-14.8.8Z"
                  >
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="-15 135 135; 9 135 135; -15 135 135"
                    />
                  </path>
                </symbol>
                <symbol id="meteoconsHazeNightFill8" viewBox="0 0 264 72">
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill0)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 60h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill1)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 60h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill2)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 60h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="-24 0; 24 0; -24 0"
                    />
                  </g>
                  <g>
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill3)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M12 12h30"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill4)"
                      stroke-dasharray="60 60"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M102 12h90"
                    />
                    <path
                      fill="none"
                      stroke="url(#meteoconsHazeNightFill5)"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="24"
                      d="M222 12h30"
                    />
                    <animateTransform
                      additive="sum"
                      attributeName="transform"
                      dur="6s"
                      repeatCount="indefinite"
                      type="translate"
                      values="24 0; -24 0; 24 0"
                    />
                  </g>
                </symbol>
                <clipPath id="meteoconsHazeNightFill9">
                  <path fill="none" d="M0 0h512v306H0z" />
                </clipPath>
              </defs>
              <g clip-path="url(#meteoconsHazeNightFill9)">
                <use
                  width="270"
                  height="270"
                  href="#meteoconsHazeNightFill7"
                  transform="translate(121 121)"
                />
              </g>
              <use
                width="264"
                height="72"
                href="#meteoconsHazeNightFill8"
                transform="translate(124 336)"
              />
            </svg>
          </p>
        </div>
      </section>
      <MonthSelector @update:month="monthChanged" class="" />
  </div>
  <div>
  </div>
</template>
