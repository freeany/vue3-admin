import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import './assets/css/index.less'
import icons from './global/register-icons'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')
