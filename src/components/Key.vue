<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Ball from "./Ball.vue";

const props = defineProps<{
  letter: string;
  sound: string;
  active: boolean;
}>();

const isMoving = ref(false);

// function handleClick() {
//   // playNote(props.sound);
//   isClicked.value = true;
// setTimeout(() => {
//   isClicked.value = false;
// }, 200);
// }

function playAnimation() {
  isMoving.value = true;
  setTimeout(() => {
    isMoving.value = false;
  }, 1000);
}

watchEffect(() => {
  if (props.active) {
    playAnimation();
  }
});
</script>

<template>
  <div class="flex flex-col items-center">
    <Ball
      :class="{
        move: isMoving,
      }"
    />
    <li
      :class="{
        'pushed-down': props.active,
      }"
    >
      {{ props.letter }}
    </li>
  </div>
</template>

<style scoped>
.pushed-down {
  @apply bg-emerald-400;
}

li {
  @apply bg-white m-1 h-40 p-4 w-12;
}

.move {
  animation: bounce 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -200px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
