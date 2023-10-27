<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Hand from "./Hand.vue";
import SantaFace from "./SantaFace.vue";

const props = defineProps<{
  pianoNot: string | null;
}>();

const waveTriggerRight = ref(false);
const waveTriggerLeft = ref(false);

watchEffect(() => {
  if (props.pianoNot === "d") {
    waveTriggerRight.value = true;
    setTimeout(() => {
      waveTriggerRight.value = false;
    }, 1000);
  }
  if (props.pianoNot === "c") {
    waveTriggerLeft.value = true;
    setTimeout(() => {
      waveTriggerLeft.value = false;
    }, 1000);
  }
});
</script>

<template>
  <div class="bg-slate-300 w-40 flex justify-center">
    <SantaFace :pianoNot="props.pianoNot" />
    <Hand
      :pianoNot="pianoNot"
      class="right"
      :class="{ wave: waveTriggerRight }"
    />
    <Hand
      :pianoNot="pianoNot"
      class="left"
      :class="{ wave: waveTriggerLeft }"
    />
  </div>
</template>

<style scoped>
.right {
  @apply absolute bottom-12 left-28;
  --initial-rotation: 80deg; /* default value */
  transform: rotate(var(--initial-rotation));
}
.left {
  @apply absolute bottom-12 left-2;
  --initial-rotation: -80deg; /* default value */

  transform: rotate(var(--initial-rotation));
}

.wave {
  animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
  animation-duration: 2.5s; /* Change to speed up or slow down */
}

@keyframes wave-animation {
  0% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  }
  10% {
    transform: rotate(calc(var(--initial-rotation) + 14deg));
  } /* The following five values can be played with to make the waving more or less extreme */
  20% {
    transform: rotate(calc(var(--initial-rotation) + -8deg));
  }
  30% {
    transform: rotate(calc(var(--initial-rotation) + 14deg));
  }
  40% {
    transform: rotate(calc(var(--initial-rotation) + -4deg));
  }
  50% {
    transform: rotate(calc(var(--initial-rotation) + 10deg));
  }
  60% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  } /* Reset for the last half to pause */
  100% {
    transform: rotate(calc(var(--initial-rotation) + 0deg));
  }
}
</style>
