import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import { createVuetify } from 'vuetify'
// import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import { router } from './router'
import store from './store'
const app = createApp(App)

app.use(createPinia()).use(router).use(store).use(Notifications).use(vuetify).mount('#app')
