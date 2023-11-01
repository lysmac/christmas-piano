<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import arrayToChars from "../arrayToChars";
import Key from "../components/Key.vue";
import decoder from "../decoder";
import AnimationGroup from "./AnimationGroup.vue";
import Instructions from "./Instructions.vue";

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

// TODO: Outcommented because of deploy
// const previousKeyPressTime = ref<number | null>(null);
const timeBetweenKeyPresses = ref<number>(0);

const recordToggle = ref(false);

function handleClick(clickedKey: any) {
  activeKey.value = clickedKey.letter;
  // playNote(clickedKey.letter);
  playSound(clickedKey.letter);

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
      playSound(matchedNote.letter);
      // playNote(matchedNote.letter);
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

// function clearHistory() {
//   history.value = [];
//   previousKeyPressTime.value = null;
//   window.history.replaceState(null, "", "/");
//   recordToggle.value = false;
// }
const audioContext = new (window.AudioContext || window.AudioContext)();
const audioBuffers = ref<{ [key: string]: AudioBuffer | null }>({});

const playSound = (soundId: string) => {
  const buffer = audioBuffers.value[soundId];
  if (!buffer) return; // Exit if buffer is not loaded or had an error

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};

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

onMounted(async () => {
  for (const sound of piano) {
    try {
      const response = await fetch(sound.sound);
      const audioData = await response.arrayBuffer();
      audioBuffers.value[sound.letter] =
        await audioContext.decodeAudioData(audioData);
    } catch (e) {
      console.error(`Error fetching or decoding ${sound.letter}`, e);
      audioBuffers.value[sound.letter] = null;
    }
  }
  document.addEventListener("keydown", handleKeyPress);
  document.addEventListener("keyup", resetKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
  document.removeEventListener("keyup", resetKey);
});
</script>

<template>
  <div class="wrapper flex flex-col">
    <Instructions />
    <AnimationGroup :pianoNot="activeKey" />

    <!-- <div class="flex flex-col gap-4 p-4"> -->
    <!-- <p>Keypress time is {{ keyPressTime }}</p> -->
    <!-- <p class="text-xs">
        Time between keypresses is {{ timeBetweenKeyPresses }}
      </p> -->
    <!-- <p class="text-xs">History: {{ history }}</p> -->
    <!-- </div> -->

    <div class="piano">
      <div
        class="buttons absolute -top-28 z-20 flex w-full flex-col items-center gap-1 text-lg"
      >
        <button
          @click="playHistory()"
          class="w-1/2 border-2 border-slate-800 bg-white p-1 font-extrabold uppercase"
        >
          ▶︎ Play song
        </button>
        <button
          @click="recordToggle = !recordToggle"
          class="w-1/2 border-2 border-slate-800 bg-white p-1 font-extrabold uppercase"
        >
          {{ recordToggle ? "Stop recording" : " 🔴 Record" }}
        </button>
        <!-- <button @click="clearHistory()" class="bg-white p-2 rounded">
        Clear history
      </button> -->
      </div>
      <ul class="text-black-500 flex h-full gap-0.5">
        <Key
          v-for="key in piano"
          :key="key.letter"
          :letter="key.letter"
          :isActive="activeKey === key.letter"
          @click="handleClick(key)"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply h-full;
}

.piano {
  @apply relative h-1/4 border-2 border-t-0 border-slate-800 bg-slate-800;
  /* height: 35dvh; */
}
.piano::before {
  @apply absolute left-0 top-0 h-3 w-full bg-[#295DF6] content-[''];
}
</style>
