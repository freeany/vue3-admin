import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import enUS from './lang/en'
import zhCN from './lang/zh'
import { localCache } from '@/utils/storage'

export const i18n = createI18n({
  legacy: false,
  locale: localCache.getItem('lang') || 'zhCN', // 默认显示语言
  fallbackLocale: 'enUS',
  messages: {
    zhCN,
    enUS
  }
})

export function installI18n(app: App) {
  app.use(i18n)
}
