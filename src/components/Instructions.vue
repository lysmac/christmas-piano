<script setup lang="ts"></script>

<template>
  <div class="instructions px-4">
    <h1 class="text-xl font-bold">Instructions:</h1>
    <ul>
      <li>
        Play the piano by either using 1-7 on your keyboard or click on them.
      </li>
      <li>Press "Start recording" to record what you're playing.</li>
      <li>
        After you're done recording, press stop, then you can either listen to
        your recording or send the URL to a friend.
      </li>
      <li>Listen to a recording by pressing the "Play from URL!"-button.</li>
    </ul>
  </div>
</template>

<style scoped>
li {
  @apply py-1 text-xs;
}
</style>
