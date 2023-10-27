<script setup lang="ts">
// import { ref, watchEffect } from "vue";

// const props = defineProps<{
//   pianoNot: string | null;
// }>();

// const fillColor = ref("red");

// watchEffect(() => {
//   if (props.pianoNot === null) {
//     fillColor.value = "blue";
//   }
//   if (props.pianoNot === "c") {
//     fillColor.value = "#00FF00";
//   }
// });
</script>

<template>
  <svg
    version="1.0"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="230px"
    height="230px"
    viewBox="0 0 64 64"
    enable-background="new 0 0 64 64"
    xml:space="preserve"
    class="z-100"
  >
    <g>
      <path
        fill="#F9EBB2"
        d="M28,12h8c15.41,0,15.984,14.379,16,16H12C12,27.348,12.184,12,28,12z"
      />
      <polygon
        fill="#45AAB8"
        points="56,44 48,44 16,44 8,44 8,36 16,36 48,36 56,36 	"
      />
      <g>
        <path
          fill="#394240"
          d="M60,28c0-8.301-5.016-24-24-24h-8C9.016,4,4,19.699,4,28c-2.211,0-4,1.789-4,4v16c0,2.211,1.789,4,4,4h4v4
			c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h24v4c0,2.211,1.789,4,4,4h4c2.211,0,4-1.789,4-4v-4h4c2.211,0,4-1.789,4-4V32
			C64,29.789,62.211,28,60,28z M28,12h8c15.41,0,15.984,14.379,16,16H12C12,27.348,12.184,12,28,12z M56,44h-8H16H8v-8h8h32h8V44z"
        />
        <circle fill="#394240" cx="48" cy="40" r="4" />
        <circle fill="#394240" cx="16" cy="40" r="4" />
      </g>
    </g>
  </svg>
</template>

<style scoped></style>
