import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(vuetify)
app.use(store)

app.mount('#app')
