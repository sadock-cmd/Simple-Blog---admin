import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authStore } from './stores/authStore'

import App from './App.vue'
import router from './router'
import './axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = authStore();
// Check authentication on app initialization
auth.checkAuthentication();

app.mount('#app')
