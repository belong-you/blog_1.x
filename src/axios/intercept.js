import axios from 'axios';

axios.defaults.baseURL = 'http://bozai.tech/api/'
// axios.defaults.baseURL = 'http://192.168.1.80/api/'

axios.defaults.withCredentials = true;  // 跨域

// axios.interceptors.response.use(config => {
// 	// console.log(config.data)
// 	return config;
// })

// axios 拦截器
axios.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code === 401) {
			console.error(response.data);
		}
		return response.data;
	}
})

export default axios;