<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Key from "../components/Key.vue";
import { Encryption } from "../encryption";
import { unmute } from "../unmute.js";
import AnimationGroup from "./AnimationGroup.vue";
import Instructions from "./Instructions.vue";

type Note = {
  sound: string;
  letter: string;
  keycode: number;
  number: string;
};

export type History = {
  time: number;
  note: string;
};

const piano: Note[] = [
  {
    sound: "/sounds/glockenspiel/c.wav",
    letter: "c",
    keycode: 65,
    number: "1",
  },
  {
    sound: "/sounds/glockenspiel/d.wav",
    letter: "d",
    keycode: 83,
    number: "2",
  },
  {
    sound: "/sounds/glockenspiel/e.wav",
    letter: "e",
    keycode: 68,
    number: "3",
  },
  {
    sound: "/sounds/glockenspiel/f.wav",
    letter: "f",
    keycode: 70,
    number: "4",
  },
  {
    sound: "/sounds/glockenspiel/g.wav",
    letter: "g",
    keycode: 71,
    number: "5",
  },
  {
    sound: "/sounds/glockenspiel/a.wav",
    letter: "a",
    keycode: 72,
    number: "6",
  },
  {
    sound: "/sounds/glockenspiel/b.wav",
    letter: "b",
    keycode: 74,
    number: "7",
  },
];

const newHistory: History[] = [];

const activeKey = ref<string | null>(null);

const keyPressTime = ref<number>(0);

const timeBetweenKeyPresses = ref<number>(0);

const recordToggle = ref(false);

const isPlaying = ref(false);

const playbackTimeouts: number[] = [];

const tempo = 125;

const defaultMelody = "EESEESEGCDZFFMmFEEllEDDEyg";
// This is the default melody that will play if you visit the site without a melody in the URL
// The current string is Jingle Bells

function handleClick(clickedKey: Note) {
  activeKey.value = clickedKey.letter;
  playSound(clickedKey.letter);

  if (keyPressTime.value === 0) {
    keyPressTime.value = Date.now();

    if (recordToggle.value) {
      newHistory.push({
        time: 0,
        note: clickedKey.letter,
      });
    }
  } else {
    timeBetweenKeyPresses.value = Date.now() - keyPressTime.value;
    if (recordToggle.value) {
      newHistory.push({
        time: timeBetweenKeyPresses.value,
        note: clickedKey.letter,
      });
    }
    keyPressTime.value = Date.now();
  }

  setTimeout(resetKey, tempo);
}

const handleKeyPress = (event: KeyboardEvent) => {
  const found = piano.find((object) => object.number === event.key);
  if (found) handleClick(found);
};

function resetKey() {
  activeKey.value = null;
}

function playHistory() {
  if (isPlaying.value) {
    playbackTimeouts.forEach(clearTimeout);
    playbackTimeouts.length = 0;
    isPlaying.value = false;
    return;
  }

  isPlaying.value = true;

  let url = new URL(window.location.href);
  let decrypted = "";

  if (url.pathname === "/") {
    url.pathname = defaultMelody;
  }
  [...url.pathname].forEach((c) => (decrypted += Encryption.decrypt(c)));

  let delay = 0; // Start playing delay
  for (let i = 0; i < decrypted.length; i++) {
    const char = decrypted[i];
    const matchedNote = piano.find((object) => object.letter === char);

    if (!matchedNote) continue;

    playbackTimeouts.push(
      setTimeout(() => {
        playSound(matchedNote.letter);
        activeKey.value = matchedNote.letter;

        setTimeout(() => {
          resetKey();
        }, tempo);
      }, delay),
    );

    delay += tempo;

    if (i + 1 < decrypted.length && !isNaN(parseInt(decrypted[i + 1]))) {
      delay += parseInt(decrypted[i + 1]) * tempo;
      i++;
    }
  }
  playbackTimeouts.push(
    setTimeout(() => {
      isPlaying.value = false;
      playbackTimeouts.length = 0;
    }, delay),
  );
}

function clearHistory() {
  newHistory.length = 0;
  window.history.replaceState(null, "", "/");
}

const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();
const audioBuffers = ref<{ [key: string]: AudioBuffer | null }>({});

// These are a part of the unmute.js safari mute toggle-fix
let allowBackgroundPlayback = false;
let forceIOSBehavior = false;
unmute(audioContext, allowBackgroundPlayback, forceIOSBehavior);

const playSound = (soundId: string) => {
  if (!soundId) return;

  const buffer = audioBuffers.value[soundId];
  if (!buffer) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};

watch(recordToggle, (val, oldVal) => {
  if (oldVal) {
    const shorterString = Encryption.encrypt(newHistory);
    window.history.replaceState(null, "", shorterString);
  }
  if (val) {
    clearHistory();
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
    <AnimationGroup :pianoNote="activeKey" />

    <div class="piano">
      <div
        class="buttons absolute -top-28 z-50 flex w-full flex-col items-center gap-1 text-lg"
      >
        <button
          :disabled="recordToggle"
          @click="playHistory()"
          class="w-1/2 border-2 border-slate-800 bg-white p-1 font-extrabold uppercase"
          :class="recordToggle ? 'opacity-50' : ''"
        >
          {{ isPlaying ? "Stop song" : "▶︎ Play song" }}
        </button>
        <button
          :disabled="isPlaying"
          @click="recordToggle = !recordToggle"
          class="w-1/2 border-2 border-slate-800 bg-white p-1 font-extrabold uppercase"
          :class="isPlaying ? 'opacity-50' : ''"
        >
          {{ recordToggle ? "Stop recording" : " 🔴 Record" }}
        </button>
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
