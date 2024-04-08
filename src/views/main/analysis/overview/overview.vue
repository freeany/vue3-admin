<template>
  <div class="overview">
    <h2>overview</h2>
    <button @click="changeColor">changeColor</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let color = ref('yellow')
function changeColor() {
  color.value = 'red'
}
</script>

<style lang="scss" scoped>
.overview {
  color: v-bind(color);
}
</style>
