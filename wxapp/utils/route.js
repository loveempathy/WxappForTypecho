/**
 * 重写wx路由
 * @param {Object} e :{
	a (Object):跳转时需要附带的参数
	url (String):跳转路径
	type (String): 必填 跳转方式,可选值:navigate,reLaunch,redirect,switchTab,navigateBack 默认为navigate
	delta (Int):type为navigateBack时有效  返回层级
 }
 * @author:LoveEmapthy
 */
import page_urls from "page_urls"
import {
	verifyLogin
} from "tools"
var url, type, delta
module.exports = (e) => {
	var parameters = e.params || '';
	url = page_urls[e.url] ? '/' + page_urls[e.url] : e.url;
	type = e.type || 'navigate'
	delta = e.delta || ''
	url += e.url && (e.params ? '?' : '')
	for (var key in parameters) {
		url += (url.indexOf('=') == -1 ? '' : '&') + key + '=' + parameters[key]
	}
	
	if (url) {
		url = url.indexOf('/') != 0 ? '/' + url : url;
	}
	
	if (e.term) {
		verifyLogin({
			success() {
				toPage()
			}
		})
		return
	}
	toPage()
}

function toPage(){
	// console.log(url,type);
	switch (type) {
		case 'navigate':
			wx.navigateTo({
				url,
				fail:e=>{
					console.log(e);
				}
			})
			break;
		case 'reLaunch':
			wx.reLaunch({
				url,
				fail:e=>{
					console.log(e);
				}
			})
			break;
		case 'redirect':
			wx.redirectTo({
				url,
				fail:e=>{
					console.log(e);
				}
			})
			break;
		case 'switchTab':
			wx.switchTab({
				url,
				fail:e=>{
					console.log(e);
				}
			})
			break;
		case 'navigateBack':
			wx.navigateBack({
				delta,
				fail:e=>{
					console.log(e);
				}
			})
			break;
	}
}