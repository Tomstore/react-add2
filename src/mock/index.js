const Mock = require('mockjs')

module.exports = Mock.mock({
	"userList": [{
		"id": '@id',
		"username": "admin",
		"password": "admin",
		"nickname": '管理员',
		"avator": "@image(50x50, @color, 管理员)",
		"permission_list": [1000, 1100, 1200, 1110, 1120, 1121]
	}, {
		"id": '@id',
		"username": "test",
		"password": "test",
		"nickname": '测试用户',
		"avator": "@image(50x50, @color, 测试用户)",
		"permission_list": [1000, 1100, 1200, 1110]
	}],
	"list|50": [{
		"id": "@id",
		"name": "@cname",
		"state|1": ["已支付", "待发货", "已发货", "代收货", '已收货', '已关闭'],
		"address": "@county(true)",
		"tel": /1[3-9]\d{9}/,
		"price|10-1000": 1
	}]
})