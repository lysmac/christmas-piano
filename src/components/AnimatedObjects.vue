<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Car from "./Car.vue";
import Hand from "./Hand.vue";

const props = defineProps<{
  pianoNot: string | null;
}>();

const waveTriggerRight = ref(false);
const waveTriggerLeft = ref(false);

watchEffect(() => {
  if (props.pianoNot === "e") {
    waveTriggerRight.value = true;
    setTimeout(() => {
      waveTriggerRight.value = false;
    }, 250);
  }
  if (props.pianoNot === "c") {
    waveTriggerLeft.value = true;
    setTimeout(() => {
      waveTriggerLeft.value = false;
    }, 500);
  }
});

const hands = [
  {
    position: "left-12 bottom-20 -rotate-45",
    pianoKey: "c",
    direction: "left",
  },
  {
    position: "left-16 top-20 -rotate-45",
    pianoKey: "d",
    direction: "left",
  },
  {
    position: "left-24 top-10 -rotate-45",
    pianoKey: "e",
    direction: "left",
  },
  {
    position: "left-34 top-8",
    pianoKey: "f",
    direction: "top",
  },
  {
    position: "right-24 top-10 rotate-45",
    pianoKey: "g",
    direction: "right",
  },
  {
    position: "right-16 top-20 rotate-45",
    pianoKey: "a",
    direction: "right",
  },
  {
    position: "right-12 bottom-20 rotate-45",
    pianoKey: "b",
    direction: "right",
  },
];
</script>

<template>
  <div class="bg-slate-300 w-80 flex justify-center align-middle p-4 relative">
    <Hand
      v-for="hand in hands"
      :key="hand.pianoKey"
      :hand="hand"
      :active="pianoNot === hand.pianoKey"
    />

    <Car class="bil" />
  </div>
</template>

<style scoped>
.bil {
  @apply z-20;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 0.25s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes wave-animation {
  0%,
  100% {
    @apply right-12 bottom-20;
  }
  50% {
    @apply right-4 bottom-20;
  }
}

.wave-original {
  animation-name: wave-animation-original;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes wave-animation-original {
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
