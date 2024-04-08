import { createApp } from 'vue'
import 'normalize.css'

// svg图标
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svg-icon/index.vue'
import icons from './global/register-icons'

import { installI18n } from '@/i18n'
import { installRouter } from '@/router'
import App from './App.vue'
import store from './store'
import './styles/index.scss'

async function setupApp() {
  const app = createApp(App)
  // 全局注册element-ui icon
  app.use(icons)
  app.use(store)
  installRouter(app)
  installI18n(app)
  app.component('svg-icon', svgIcon)
  app.mount('#app')
}

setupApp()
