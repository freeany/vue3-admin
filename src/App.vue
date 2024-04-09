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
import { computed, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tag-views'
import type { TagViewType } from './@types/tag'

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)

const locale = computed(() => (lang.value === 'zh' ? zhCn : en))

const route = useRoute()
watch(
  route,
  (to) => {
    if (!isTags(to.path)) return

    const { fullPath, meta, name, params, path, query } = to
    // 这个是约定， 如果meta没有title那么就不会显示在tagView中

    if (!meta.title) return
    appStore.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: meta.title
    } as TagViewType)
  },
  {
    immediate: true
  }
)
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
