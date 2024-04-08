<template>
  <div class="dashboard">
    <!-- 1.顶部数据的展示 -->
    <el-row :gutter="10">
      <template v-for="item in analysisStore.amountData" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import CountCard from '@/components/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'

const analysisStore = useAnalysisStore()
analysisStore.fetchDashboardDataAction()
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
:global(.red1) {
  color: red;
}
</style>
