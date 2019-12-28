const app = getApp(),
	page = app.page,
	request = app.request,
	route = app.route
var g, banner_height, class_height

import {
	getTime,
	getDate,
	getComponentInfo
} from "../../utils/tools.js"

page({
	data: {
		top_width: wx.getMenuButtonBoundingClientRect().left,
		top_height: wx.getMenuButtonBoundingClientRect().height,
		opacity: 0.0,
		TabCur: 0,
		class: ['浏览量', '评论数', '点赞数']
	},
	onLoad: function(options) {
		g = this
	},
	onPullDownRefresh: function() {
		// 页面下拉
	},
	tabSelect: function(e) {
		e = e.currentTarget.dataset.id
		this.setData({
			TabCur: e
		})
		getList(e)
	},
	onReady: function() {
		getList()
	},
	onPageScroll(e) {
		var opacity, s = app.system
		opacity = 100 / banner_height / 100 * e.scrollTop
		opacity = opacity > 1 ? 1 : opacity
		if (opacity != g.data.opacity) {
			g.setData({
				opacity,
				style: opacity == 1 ? "position: fixed;top: " + s.CustomBar + "px;" : ""
			})
		}
	},
	toInfo(e) {
		e = e.currentTarget.dataset.id
		route({
			type: 'navigate',
			url: 'detail',
			params: {
				id: e
			}
		})
	}
})

function getList(idx = 0) {
	request({
		url: 'posts',
		data: {
			pageSize: 30,
			idx
		},
		showLoading: true,
		success: r => {
			var date = getDate() + ' ' + getTime() + ':00',
				timestamp
			date = date.replace(/-/g, '/')
			timestamp = Date.parse(new Date(date)) / 1000
			if (r) {
				for (var i = 0; i < r.length; i++) {
					r[i].created = Math.round((timestamp - r[i].created) / 86400)
				}
			}
			g.setData({
				list: r
			})
			const s = app.system
			getComponentInfo({
				name: '#banner',
				success: r => {
					banner_height = r.height - s.CustomBar
				}
			})
			getComponentInfo({
				name: '#class',
				success: r => {
					class_height = r.height
				}
			})
		}
	})
}
