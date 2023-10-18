<script setup lang="ts">
// const props = defineProps<{ letter: string; sound: string }>();
</script>

<template>
  <div id="ball" class="rounded-full h-10 w-10 m-1">
    <!-- <img src="../assets/images/ball_no_bg.png" class="h-20" /> -->
  </div>
</template>

<style scoped>
#ball {
  background-color: aqua;
  background-image: url(../assets/images/ball_round.jpg);
  background-position: center;
  background-size: cover;
}
</style>
