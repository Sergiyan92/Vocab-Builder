import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import { router } from './router'
import store from './store'
const app = createApp(App)

app.use(createPinia()).use(router).use(store).use(Notifications).mount('#app')

