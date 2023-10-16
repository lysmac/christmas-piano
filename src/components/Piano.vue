<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Key from "../components/Key.vue";
import playNote from "../playNote";

const piano = [
  {
    sound: "../src/assets/sounds/c.wav",
    letter: "c",
    keycode: 65,
    number: "1",
  },
  {
    sound: "../src/assets/sounds/d.wav",
    letter: "d",
    keycode: 83,
    number: "2",
  },
  {
    sound: "../src/assets/sounds/e.wav",
    letter: "e",
    keycode: 68,
    number: "3",
  },
  {
    sound: "../src/assets/sounds/f.wav",
    letter: "f",
    keycode: 70,
    number: "4",
  },
  {
    sound: "../src/assets/sounds/g.wav",
    letter: "g",
    keycode: 71,
    number: "5",
  },
  {
    sound: "../src/assets/sounds/a.wav",
    letter: "a",
    keycode: 72,
    number: "6",
  },
  {
    sound: "../src/assets/sounds/b.wav",
    letter: "b",
    keycode: 74,
    number: "7",
  },
];

const history = ref<string | null>("");

const activeKey = ref<string | null>(null);

const handleKeyPress = (event: KeyboardEvent) => {
  const found = piano.find((object) => object.number === event.key);

  if (!found) return;

  playNote(found.sound);
  activeKey.value = found.letter;
  history.value = history.value + activeKey.value;
  window.history.replaceState(null, "", history.value);
};

function resetKey() {
  activeKey.value = null;
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", resetKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("keyup", resetKey);
});
</script>

<template>
  <div class="px-2 font-bold text-xl">Note history: {{ history }}</div>
  <div class="bg-black px-2">
    <ul class="text-black-500 flex justify-center">
      <Key
        v-for="key in piano"
        :key="key.letter"
        :letter="key.letter"
        :sound="key.sound"
        :active="activeKey === key.letter"
      />
    </ul>
  </div>
</template>
