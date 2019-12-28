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
		opacity: 0.0,
		TabCur: 0,
		scrollLeft: 0,
		scroll_width: wx.getMenuButtonBoundingClientRect().left,
		resource_url: 'https://cdn.loveempathy.com/'
	},
	onLoad: function(options) {
		g = this
		banner_height = class_height = 0
	},
	tabSelect(e) {
		let TabCur = e.currentTarget.dataset.index
		gitList(g.data.class[TabCur].mid)
		this.setData({
			TabCur,
			scrollLeft: (TabCur - 1) * 60
		})
	},
	onReady() {
		intData()
	},
	onPullDownRefresh: function() {
		// 页面下拉
	},
	onPageScroll(e) {
		var opacity, topNav
		opacity = 100 / banner_height / 100 * e.scrollTop
		opacity = opacity > 1 ? 1 : opacity
		if (opacity != g.data.opacity) {
			g.setData({
				opacity
			})
		}
		topNav = e.scrollTop >= class_height ? true : false;
		if (topNav != g.data.topNav) {
			g.setData({
				topNav
			})
		}
	},
	refresh() {
		g.setData({
			animation: 'animation'
		})
		gitList(g.data.class[g.data.TabCur].mid,true)
	},
	//跳转页面
	toPage(e){
		e = e.currentTarget.dataset.id
		route({
			type:'navigate',
			url:'detail',
			params:{
				id:e
			}
		})
	}
})

function intData() {
	//获取分类
	request({
		url: 'getcat',
		success: r => {
			g.setData({
				class: r
			})
		}
	})
	gitList()
}

function gitList(mid = 99999999,refresh) {
	//获取列表
	request({
		url: 'getpostbymid',
		data: {
			mid
		},
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
			if (refresh) {
				//延时主要是防止动画还没有执行就刷新完毕
				setTimeout(()=>{
					g.setData({
						animation: ''
					})
					wx.showToast({
						icon:'none',
						title:'刷新成功'
					})
				},1300)
			}
			g.setData({
				list: r
			}, () => {
				const s = app.system
				getComponentInfo({
					name: '#img',
					success: r => {
						banner_height = r.height - s.CustomBar
					}
				})
				getComponentInfo({
					name: '#top',
					success: r => {
						class_height = r.height - s.StatusBar
					}
				})
			})

		}
	})
}
