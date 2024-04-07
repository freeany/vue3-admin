import { createApp } from 'vue'

import 'normalize.css'

// svg图标
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svg-icon/index.vue'

import './styles/index.scss'
import App from './App.vue'
import icons from './global/register-icons'
import { installRouter } from '@/router'
import store from './store'

async function setupApp() {
  const app = createApp(App)
  // 全局注册element-ui icon
  app.use(icons)
  app.use(store)
  installRouter(app)
  app.component('svg-icon', svgIcon)
  app.mount('#app')
}

setupApp()
