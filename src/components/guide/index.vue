<template>
  <div>
    <el-tooltip :content="$t('navBar.guide')">
      <svg-icon id="guide-start" name="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driverObj = null

onMounted(() => {
  driverObj = driver({
    animate: false,
    showProgress: true,
    showButtons: ['next', 'previous', 'close'],
    closeBtnText: i18n.t('guide.close'),
    nextBtnText: i18n.t('guide.next'),
    prevBtnText: i18n.t('guide.prev'),
    steps: steps(i18n)
  })
  // driverObj.drive()
})

const onClick = () => {
  driverObj.drive()
}
</script>

<style scoped></style>
