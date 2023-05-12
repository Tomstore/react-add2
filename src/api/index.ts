import { ListItemType } from "../types";
import request from "../utils/request";


// 登录接口api
export function login(values: { username: string, password: string }) {
	return request.post("/api/signin", values);
}

// 列表接口api
export function fetchList(params: { wd: string, state: string }) {
	return request.get('/api/list', { params })
}

// 列表删除接口api
export function deleteList(id: string) {
	return request.delete('/api/list/' + id)
}

// 列表编辑接口api
export function editList(_: ListItemType) {
	return request({
		url: '/api/list/' + _.id,
		method: 'post',
		data: _
	})
}


export function getEchartsState() {
	return request.get('/api/list/echarts/state')
}