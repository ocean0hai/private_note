import { createApp } from 'vue'
import App from './App.vue'
import 'tailwindcss/tailwind.css'
import router from './router'
import Van from 'vant'
import 'vant/lib/index.css'
import {createPinia}from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)

const app=createApp(App)
app.use(Van)
app.use(router)
app.use(pinia)
app.mount('#app')
