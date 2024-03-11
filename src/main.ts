import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import './assets/css/index.less'
import icons from './global/register-icons'

const app = createApp(App)

app.use(icons)
app.use(createPinia())
app.use(router)

app.mount('#app')
