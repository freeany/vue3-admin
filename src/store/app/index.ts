import { defineStore } from 'pinia'
import { TAGS_VIEW } from '@/global/constants'
import { localCache } from '@/utils/storage'
import { RightClickOptionsEnum, type TagViewType } from '@/@types/tag'

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
    /**
     * 添加 tags
     */
    addTagsViewList(tag: TagViewType) {
      const isFind = this.tagsViewList.find((item: TagViewType) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        localCache.setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(index: number, tag: TagViewType) {
      this.tagsViewList[index] = tag
      localCache.setItem(TAGS_VIEW, this.tagsViewList)
    },
    /**
     * 删除 tag
     */
    removeTagsView(type: RightClickOptionsEnum, index: number) {
      if (type === RightClickOptionsEnum.index) {
        this.tagsViewList.splice(index, 1)
        return
      } else if (type === RightClickOptionsEnum.other) {
        this.tagsViewList.splice(index + 1, this.tagsViewList.length - index + 1)
        this.tagsViewList.splice(0, index)
      } else if (type === RightClickOptionsEnum.right) {
        this.tagsViewList.splice(index + 1, this.tagsViewList.length - index + 1)
      }
      localCache.setItem(TAGS_VIEW, this.tagsViewList)
    }
  }
})
