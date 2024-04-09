<template>
  <div class="overview">
    <h2>{{ $t('login.title') }}</h2>
    <div class="red1">bbb</div>
    <button @click="changeColor">changeColor</button>

    <div>
      <el-date-picker v-model="value2" type="date" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let color = ref('pink')
function changeColor() {
  color.value = 'red'
}

const value2 = ref('')
</script>

<style lang="scss" scoped>
.overview {
  color: v-bind(color);
}
</style>
