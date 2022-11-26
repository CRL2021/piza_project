import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

//引入样式文件
import './assets/css/ico.css'
import './assets/css/style.css'
import './assets/css/animate.min.css'

createApp(App).use(store).use(router).use(VueAxios,axios).mount('#app')
