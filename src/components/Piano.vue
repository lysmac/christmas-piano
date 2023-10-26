<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import arrayToChars from "../arrayToChars";
import Key from "../components/Key.vue";
import decoder from "../decoder";
import playNote from "../playNote";

type Note = {
  sound: string;
  letter: string;
  keycode: number;
  number: string;
};
const piano: Note[] = [
  {
    sound: "/sounds/c.wav",
    letter: "c",
    keycode: 65,
    number: "1",
  },
  {
    sound: "/sounds/d.wav",
    letter: "d",
    keycode: 83,
    number: "2",
  },
  {
    sound: "/sounds/e.wav",
    letter: "e",
    keycode: 68,
    number: "3",
  },
  {
    sound: "/sounds/f.wav",
    letter: "f",
    keycode: 70,
    number: "4",
  },
  {
    sound: "/sounds/g.wav",
    letter: "g",
    keycode: 71,
    number: "5",
  },
  {
    sound: "/sounds/a.wav",
    letter: "a",
    keycode: 72,
    number: "6",
  },
  {
    sound: "/sounds/b.wav",
    letter: "b",
    keycode: 74,
    number: "7",
  },
];

const history = ref<Array<string | number>>([]);

const activeKey = ref<string | null>(null);

const keyPressTime = ref<number>(0);
const previousKeyPressTime = ref<number | null>(null);
const timeBetweenKeyPresses = ref<number>(0);

const recordToggle = ref(false);

function handleClick(clickedKey: any) {
  activeKey.value = clickedKey.letter;
  playNote(clickedKey.letter);

  if (keyPressTime.value === 0) {
    keyPressTime.value = Date.now();

    if (recordToggle.value) {
      history.value.push(0);
      history.value.push(clickedKey.letter);
    }
  } else {
    timeBetweenKeyPresses.value = Date.now() - keyPressTime.value;
    if (recordToggle.value) {
      history.value.push(timeBetweenKeyPresses.value);
      history.value.push(clickedKey.letter);
    }
    keyPressTime.value = Date.now();
  }

  setTimeout(() => {
    activeKey.value = "";
  }, 140);
}

const handleKeyPress = (event: KeyboardEvent) => {
  const found = piano.find((object) => object.number === event.key);
  if (!found) return;
  handleClick(found);
};

function resetKey() {
  activeKey.value = null;
}

function playHistory() {
  let url = new URL(window.location.href);
  let decrypted = "";

  [...url.pathname].forEach((c) => (decrypted += decoder(c)));

  let delay = 1000; // Start playing delay
  for (let i = 0; i < decrypted.length; i++) {
    const char = decrypted[i];
    const matchedNote = piano.find((object) => object.letter === char);

    if (!matchedNote) continue;

    setTimeout(() => {
      playNote(matchedNote.letter);
      activeKey.value = matchedNote.letter;

      setTimeout(() => {
        activeKey.value = "";
      }, 140);
    }, delay);

    // Ändra till 250 för gamla
    delay += 125;

    if (i + 1 < decrypted.length && !isNaN(parseInt(decrypted[i + 1]))) {
      delay += parseInt(decrypted[i + 1]) * 125;
      // Ändra till 250 för gamla
      i++;
    }
  }
}

function clearHistory() {
  history.value = [];
  previousKeyPressTime.value = null;
  window.history.replaceState(null, "", "/");
  recordToggle.value = false;
}

watchEffect(() => {
  // remove this later, test array with manual input
  // const theNextEpisode = [
  //   "0",
  //   "d",
  //   "1100",
  //   "a",
  //   "1100",
  //   "a",
  //   "500",
  //   "g",
  //   "500",
  //   "a",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "g",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "1100",
  //   "a",
  //   "1100",
  //   "a",
  //   "500",
  //   "g",
  //   "500",
  //   "a",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "g",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "500",
  //   "f",
  //   "1100",
  //   "d",
  //   "1100",
  //   "a",
  //   "1100",
  //   "a",
  //   "500",
  //   "g",
  //   "500",
  //   "a",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "g",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "1100",
  //   "a",
  //   "1100",
  //   "a",
  //   "500",
  //   "g",
  //   "500",
  //   "a",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "g",
  //   "1100",
  //   "g",
  //   "500",
  //   "f",
  //   "500",
  //   "d",
  //   "500",
  //   "f",
  //   "1100",
  // ];
  // const spela = arrayToChars(theNextEpisode);
  // window.history.replaceState(null, "", spela);

  if (!recordToggle.value && history.value.length > 0) {
    history.value.push(0);
    const shorterString = arrayToChars(history.value);
    window.history.replaceState(null, "", shorterString);
  }
});

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
  <div class="flex flex-col gap-4 p-4">
    <button
      @click="recordToggle = !recordToggle"
      class="bg-red-800 text-white rounded p-2"
    >
      {{ recordToggle ? "Stop recording" : "Start recording" }}
    </button>
    <p>Keypress time is {{ keyPressTime }}</p>
    <p>Time between keypresses is {{ timeBetweenKeyPresses }}</p>
    <p class="text-xs">History: {{ history }}</p>
    <button @click="playHistory()" class="bg-white p-2 rounded">
      Play from URL!
    </button>
    <button @click="clearHistory()" class="bg-white p-2 rounded">
      Clear history
    </button>
  </div>

  <div class="bg-black px-2">
    <ul class="text-black-500 flex justify-center">
      <Key
        v-for="key in piano"
        :key="key.letter"
        :letter="key.letter"
        :sound="key.sound"
        :active="activeKey === key.letter"
        @click="handleClick(key)"
        @touchstart="handleClick(key)"
      />
    </ul>
  </div>
</template>
