import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import en from './lang/en.json'
import zh from './lang/zh.json'
import { localCache } from '@/utils/storage'

export const i18n = createI18n({
  legacy: false,
  locale: localCache.getItem('lang') || 'zh', // 默认显示语言
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export function installI18n(app: App) {
  app.use(i18n)
}
