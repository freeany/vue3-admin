<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
const name = 'aaa'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

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
