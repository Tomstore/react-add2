import axios from 'axios';
import { message as antdMessage } from 'antd'
const request = axios.create({
	timeoutErrorMessage: '超时...',
	timeout: 10000
})


request.interceptors.request.use((config) => {
	// 请求前 可以做一些配置
	if (config.headers)
		config.headers.token = localStorage.getItem('token')

	return config
}, (error) => {
	// 请求失败
	return Promise.reject(error)
})

request.interceptors.response.use((resp) => {
	const { code, message } = resp.data;

	switch (code) {
		case 403: {
			antdMessage.error(message);
			break;
		}
	}

	return resp
}, () => {

})

export default request