const Towxml = require('/towxml/main');
App({
	onLaunch: function() {
		var g = this
		wx.getSystemInfo({
			success: e => {
				let custom = wx.getMenuButtonBoundingClientRect();
				g.system.StatusBar = e.statusBarHeight;
				g.system.Custom = custom;
				g.system.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			}
		})
	},
	system: {},
	config:{
		url:'https://loveempathy.com',
		apisec:'wnqxyt520'
	},
	page: require('utils/page.js'),
	request: require('utils/tools.js').request,
	route: require('utils/route.js'),
	towxml:new Towxml()
})