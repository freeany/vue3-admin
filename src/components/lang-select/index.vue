<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <el-tooltip :content="$t('navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" name="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="lang === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="lang === 'en'" command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store/app'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const appStore = useAppStore()
const { lang } = storeToRefs(appStore)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  appStore.setAppLang(lang)
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
</script>
