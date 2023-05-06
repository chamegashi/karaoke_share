import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import SharePage from './pages/sharePage.vue'
import InputDataPage from './pages/inputDataPage.vue'

const pinia = createPinia()

const routes = [
    { path: '/', name: 'share', component: SharePage },
    { path: '/edit', name: 'edit', component: InputDataPage }
]
const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')