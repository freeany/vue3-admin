<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
.test {
  // 根元素
  color: blue;
  :deep(.title) {
    font-size: 100px;
  }
}
</style>
