<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import Key from "../components/Key.vue";
import metronome from "../metronome";
import playFromUrl from "../playFromUrl";
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

const history = ref<string>("");
const historyDelays = ref<number[]>([]);
const previousKeyPressTime = ref<number | null>(null);

const activeKey = ref<string | null>(null);

function handleClick(clickedKey: any) {
  timer();
  playNote(clickedKey.sound);

  activeKey.value = clickedKey.letter;

  recordHistory(clickedKey);

  setTimeout(() => {
    activeKey.value = "";
  }, 200);
}

const handleKeyPress = (event: KeyboardEvent) => {
  const found = piano.find((object) => object.number === event.key);
  if (!found) return;

  timer();
  playNote(found.sound);
  recordHistory(found);
};

function recordHistory(key: any) {
  activeKey.value = key.letter;

  if (history.value === null || activeKey.value === null) return;
  history.value = history.value + activeKey.value;
  const notesAndDelay = history.value + "&" + historyDelays.value;
  window.history.replaceState(null, "", notesAndDelay);
}

function timer() {
  const currentTime = Date.now();

  if (previousKeyPressTime.value !== null) {
    let delay = currentTime - previousKeyPressTime.value;
    if (delay > 4000) {
      delay = 4000;
    }
    historyDelays.value.push(delay);
  }

  previousKeyPressTime.value = currentTime;
}

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

function playHistory() {
  const urlHistory = playFromUrl();

  let delay = 0;
  for (let i = 0; i < urlHistory.notes.length; i++) {
    const note = urlHistory.notes[i];
    const matchedNote = piano.find((object) => object.letter === note);

    if (!matchedNote) continue;

    setTimeout(() => {
      playNote(matchedNote.sound);
      activeKey.value = matchedNote.letter;

      setTimeout(() => {
        activeKey.value = "";
      }, 140);
    }, delay);

    if (i < urlHistory.delays.length) {
      delay += urlHistory.delays[i];
    }
  }
}

function clearHistory() {
  history.value = "";
  historyDelays.value = [];
  previousKeyPressTime.value = null;

  window.history.replaceState(null, "", "/");
}

const metronomeToggle = ref(false);

watchEffect(() => {
  if (metronomeToggle.value) {
    metronome(true);
  } else {
    metronome(false);
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <button
      @click="metronomeToggle = !metronomeToggle"
      class="bg-red-800 text-white rounded p-2"
    >
      Toggle Metronome
    </button>
    <p>Metronome is {{ metronomeToggle }}</p>
    <button @click="playHistory()" class="bg-white p-2 rounded">
      Play from URL!
    </button>
    <button @click="clearHistory()" class="bg-white p-2 rounded">
      Clear history
    </button>
  </div>

  <!-- <div class="px-2 font-bold text-xl">Delay: {{ historyDelays }}</div>
  <div class="px-2 font-bold text-xl">Note history: {{ history }}</div> -->
  <div class="bg-black px-2">
    <ul class="text-black-500 flex justify-center">
      <Key
        v-for="key in piano"
        :key="key.letter"
        :letter="key.letter"
        :sound="key.sound"
        :active="activeKey === key.letter"
        @click="handleClick(key)"
      />
    </ul>
  </div>
</template>
