import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 10,
		site: 'http://bozai.tech',  // 数据请求地址
	},
	mutations: {
	},
	actions: {
		countIncrement (store, num) {
            setTimeout(() => {
                store.state.count += num;
            }, 1000)
        }
	},
	modules: {
	}
})
