<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)

const locale = computed(() => (lang.value === 'zh' ? zhCn : en))
</script>

<style lang="scss" scoped>
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
