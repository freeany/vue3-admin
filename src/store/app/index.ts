import { defineStore } from 'pinia'
import { TAGS_VIEW } from '@/global/constants'
import { localCache } from '@/utils/storage'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
// 应该pick
export interface TagViewType extends RouteLocationNormalizedLoaded {
  title: string
}
export const useAppStore = defineStore('app-store', {
  state: () => {
    return {
      lang: localCache.getItem('lang') || 'zh',
      tagsViewList: localCache.getItem(TAGS_VIEW) || []
    }
  },
  actions: {
    setAppLang(lang: 'zh' | 'cn') {
      this.lang = lang
      localCache.setItem('lang', lang)
    },
    addTagsViewList(tag: TagViewType) {
      const isFind = this.tagsViewList.find((item: TagViewType) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        localCache.setItem(TAGS_VIEW, this.tagsViewList)
      }
    }
  }
})
