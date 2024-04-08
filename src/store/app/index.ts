import { defineStore } from 'pinia'
import { localCache } from '@/utils/storage'

export const useAppStore = defineStore('app-store', {
  state: () => {
    return {
      lang: localCache.getItem('lang') || 'zh'
    }
  },
  actions: {
    setAppLang(lang: 'zh' | 'cn') {
      this.lang = lang
      localCache.setItem('lang', lang)
    }
  }
})
