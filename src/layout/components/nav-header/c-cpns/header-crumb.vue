<template>
  <div class="header-crumbs">
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <template v-for="item in breadcrumbs" :key="item.path">
          <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="header-crumbs">
import { ref, watch } from 'vue'
import { useRoute, type RouteLocationMatched } from 'vue-router'

const route = useRoute()

// 生成数组数据
const breadcrumbs = ref<RouteLocationMatched[]>([])
const getBreadcrumbData = () => {
  console.log(route.matched, '/route.matchedroute.matched')

  breadcrumbs.value = route.matched
}

// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss"></style>
