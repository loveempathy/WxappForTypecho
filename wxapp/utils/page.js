/**
 * 用于页面初始化时劫持页面，作为数据处理
 * @author:LoveEmapthy
 */
import {
	login,
	getTabbar,
	setTabbar,
	getSystem,
	setSystem,
	getUserInfo,
	setUserInfo,
	submitFromId
} from "tools"
var currentPage
var AOP = {
	before: function(e, n, o) {
		var t = e[n];
		return e[n] = function() {
			o(arguments[0]), t.apply(getApp().currentPage, arguments);
		}, e;
	},
	after: function(e, n, o) {
		var t = e[n];
		return e[n] = function() {
			t.apply(getApp().currentPage, arguments), o(arguments[0]);
		}, e;
	}
};

module.exports = function(e) {
	var app = getApp()
	// console.log('页面劫持');
	"function" != typeof e.onLoad && (e.onLoad = (e) => {})
	"function" != typeof e.onShow && (e.onShow = (e) => {})
	//在当前页面渲染之前劫持onLoad,进行数据获取写入
	/* e = AOP.before(e, "onLoad", (e) => {
		var n = getCurrentPages();
		//获取当前页面对象
		app.currentPage = currentPage = n[n.length - 1];
		//判断是否已经获取过tabbar数据  并且设置tabbar数据
		app.dataNav ? setTabbar(currentPage) : getTabbar(currentPage)
		//判断是否已经获取过system数据  并且设置system数据
		app.system ? setSystem(currentPage) : getSystem(currentPage)
		//判断是否已经获取过用户数据  并且设置用户数据
		app.userInfo.id ? setUserInfo() : getUserInfo()
	}) */
	e = AOP.after(e, "onShow", (e) => {})
	//添加提交fromid方法
	'function' != typeof e['submitFromId'] && (e['submitFromId'] = (e) => submitFromId(e.detail.formId))
	//执行页面渲染
	Page(e)
};
