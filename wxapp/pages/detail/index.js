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
		id = options.id
		g.setData({
			theme: wx.getStorageSync('theme') || 'light'
		})
	},
	onShow() {
		getDetail(id)
	},
	onPullDownRefresh: function() {
		// 页面下拉
	},
	theme() {
		const theme = g.data.article.theme == 'light' ? 'dark' : 'light'
		g.setData({
			'article.theme': theme,
			theme
		})
		wx.setStorageSync('theme', theme)
	}
})

function getDetail(cid) {
	wx.showLoading({
		mask: true,
		title: '加载中...'
	})
	request({
		url: 'posts',
		data: {
			cid
		},
		success: r => {
			r = r[0]
			//将markdown内容转换为towxml数据
			let data = app.towxml.toJson(
				r.text, 'markdown'
			);

			//设置文档显示主题，默认'light'
			data.theme = wx.getStorageSync('theme') || 'light';
			//设置数据
			g.setData({
				article: data,
				info: r
			}, () => {
				wx.hideLoading()
			});
		}
	})
}
