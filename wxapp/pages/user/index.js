const app = getApp(),
	page = app.page,
	request = app.request,
	route = app.route
var g, id

page({
	data: {

	},
	onLoad: function(options) {
		g = this
		getDetail()
	},
})

function getDetail(cid = 19) {
	wx.showLoading({
		mask: true,
		title: '加载中...'
	})
	request({
		url: 'getabout',
		data: {
			cid
		},
		success: info => {
			//将markdown内容转换为towxml数据
			let data = app.towxml.toJson(
				info, 'markdown'
			);

			//设置文档显示主题，默认'light'
			data.theme = 'light';
			//设置数据
			g.setData({
				article: data
			}, () => {
				wx.hideLoading()
			});
		}
	})
}
