<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ $t('tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ $t('tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { RightClickOptionsEnum } from '@/@types/tag'
const appStore = useAppStore()

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}

const onCloseRightClick = () => {
  appStore.removeTagsView(RightClickOptionsEnum.right, props.index)
}

const onCloseOtherClick = () => {
  appStore.removeTagsView(RightClickOptionsEnum.other, props.index)
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
