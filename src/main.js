import Vue from 'vue'
import router from './router'
import axios from './axios/intercept.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import animated from 'animate.css'

Vue.prototype.$axios = axios;  // 挂载到原型上
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(animated)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

