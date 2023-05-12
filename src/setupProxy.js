const bodyParser = require('body-parser')
let { userList, list } = require('./mock')
const JWT = require('jsonwebtoken')
const key = 'dwdnqlwdqlwq'

module.exports = app => {
	app.use(bodyParser.json())
	// 登录接口
	app.post('/api/signin', (req, res) => {
		const { username, password } = req.body;
		const result = userList.find(v => v.username === username && v.password === password);

		if (result) {
			res.send({
				code: 200,
				message: '登录成功， 欢迎用户' + result.nickname,
				data: {
					nickname: result.nickname,
					avator: result.avator,
					id: result.id,
					permission_list: result.permission_list,
					token: JWT.sign({
						nickname: result.nickname,
						avator: result.avator,
						id: result.id,
						permission_list: result.permission_list,
					}, key)
				}
			})
		} else {
			res.send({
				code: 403,
				message: '账户密码错误， 请重新输入',
				data: null
			})
		}
	})

	// 列表接口
	app.get('/api/list', (req, res) => {
		const { wd } = req.query;
		if (wd) {
			const newList = list.filter(v => {
				return Object.values(v).includes(wd)
			})

			res.send({
				code: 200,
				data: newList
			})
		} else {
			res.send({
				code: 200,
				data: list
			})
		}

	})

	// 列表删除接口
	// 实现删除算法
	// id: 110
	// id: 110, 120
	// id: 110, 120, 130
	app.delete('/api/list/:id', (req, res) => {
		//获取动态路由参数
		const { id } = req.params;

		// 过滤数据
		// id: 110
		// id: 110, 120

		// id: 110, 120, 130

		// v.id: 110  X
		// v.id: 120  X
		// v.id: 130  X
		// v.id: 140  √
		// v.id: 150  √

		list = list.filter(v => !id.includes(v.id))
		// 返回结果
		res.send({
			code: 200,
			message: '删除成功！！'
		})

		// // 获取查询参数
		// req.query
		// // 请求请求体数据
		// req.body
	})


	// 编辑接口
	app.post('/api/list/:id', (req, res) => {
		// 获取修改的id
		const { id } = req.params;
		// 通过id 查找数据所在项目
		const item = list.find(v => v.id === id)
		if (item) {
			// 修改数据
			Object.assign(item, req.body);
			res.send({
				code: 200,
				message: '修改数据成功'
			})
		} else {
			res.send({
				code: 400,
				message: '修改的数据不存在'
			})
		}
	})

	// 图表
	app.get('/api/list/echarts/state', (req, res) => {
		const arr = new Array(6).fill(0);
		const data = ["已支付", "待发货", "已发货", "代收货", '已收货', '已关闭']

		list.forEach(v => {
			const index = data.indexOf(v.state)
			arr[index]++
		})	

		res.send({
			code: 200,
			data: {
				title: {
					text: "状态分布展示",
				},
				tooltip: {},
				xAxis: {
					data: data,
				},
				yAxis: {},
				series: [
					{
						name: "销量",
						type: "bar",
						data: arr,
					},
				],
			}
		})
	})
}