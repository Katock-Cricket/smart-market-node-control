import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import echarts from './utils/echarts';

const app = createApp(App)

app.config.globalProperties.$echarts = echarts

app.use(store).use(VueAxios,axios,Request).use(router).use(ElementPlus).mount('#app')
