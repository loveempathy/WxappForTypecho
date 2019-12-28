/**
 * 公用代码及常用函数封装
 * @author:LoveEmapthy
 */

/**
 * 拼接当前页面参数
 */
function getParam(that) {
	var url = that.route,
		options = that.options
	for (let key in options) {
		url += (url == that.route ? '?' : '&') + key + '=' + options[key]
	}
	return url;
}

//颜色16进制转RGB方法
function setNavigationBarTextColor(color, that) {
	var page_urls = require('page_urls.js')
	if (that.route == page_urls['diy']) {
		return
	}
	wx.setNavigationBarColor({
		frontColor: isDark(color),
		backgroundColor: getApp().system.title_bg,
		animation: false
	})
};

//获取RGB值 颜色深用白色 颜色浅则用黑色
function isDark(color) {
	//十六进制颜色值的正则表达式
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (color.length === 4) {
		var colorNew = "#";
		for (var i = 1; i < 4; i += 1) {
			colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
		}
		color = colorNew;
	}
	//处理六位的颜色值
	var RGB = [];
	for (var i = 1; i < 7; i += 2) {
		RGB.push(parseInt("0x" + color.slice(i, i + 2)));
	}
	RGB = RGB[0] * 0.299 + RGB[1] * 0.587 + RGB[2] * 0.114;
	RGB = RGB >= 192 ? '#000000' : '#ffffff'
	return RGB
}

/**
 * 用户身份验证
 * @param {Object} data
 */
function verifyLogin(data) {
	data.fail = data.fail || function() {}
	data.success = data.success || function() {}
	if (!getApp().userInfo.nickName || getApp().userInfo.nickName == '游客') {
		getApp().currentPage.setData({
			isLogin: true
		})
		data.fail()
	} else {
		data.success()
	}
}
/**
 * 获取当前时间
 */
function getDate() {
	var date = new Date(),
		seperator1 = "-",
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		strDate = date.getDate(),
		currentdate
	month = month < 10 ? '0' + month : month
	strDate = strDate < 10 ? '0' + strDate : strDate
	currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

/**
 * 获取当前时分
 */
function getTime() {
	var date = new Date(),
		hours = date.getHours(),
		minutes = date.getMinutes()
	minutes = minutes < 10 ? '0' + minutes : minutes
	console.log('获取当前时分:', hours + ':' + minutes);
	return hours + ':' + minutes
}

/**
 * 多张图片上传
 * @param {Object} data
 * @param {Object} success
 */
function uploadImg(data, success) {
	if (data.length < 1) {
		success('')
		return
	}
	if (!data.path) {
		data = {
			path: data,
			urlStr: []
		}
	}
	const url = getApp().siteInfo.siteroot + '/app/index.php?i=' + getApp().siteInfo.uniacid +
		'&c=entry&a=wxapp&do=UploadImg&m=' +
		getApp().config.module
	var i = data.i ? data.i : 0, //当前上传的哪张图片
		ok = data.ok ? data.ok : 0, //上传成功的个数
		fail = data.fail ? data.fail : 0; //上传失败的个数
	console.log(data.path[i]);
	wx.uploadFile({
		url,
		filePath: data.path[i],
		name: 'upfile',
		formData: null, //这里是上传图片时一起上传的数据
		success: (res) => {
			ok++; //图片上传成功，图片上传成功的变量+1
			data.urlStr.push(res.data)
		},
		fail: (res) => {
			fail++; //图片上传失败，图片上传失败的变量+1
		},
		complete: () => {
			i++; //这个图片执行完上传后，开始上传下一张
			if (i == data.path.length) { //当图片传完时，停止调用
				console.log('上传完毕,成功:' + ok + " 失败:" + fail);
				data.urlStr = data.urlStr.join(',')
				success(data.urlStr)
			} else { //若图片还没有传完，则继续调用函数                
				data.i = i;
				data.ok = ok;
				data.fail = fail;
				uploadImg(data, success);
			}
		}
	});
}
/**
 * 获取时间戳
 * @param {Object} date
 */
function getTimestamp(date, time) {
	var arr = (date + ' ' + time + ':00').split(/[- :]/);
	let nndate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
	nndate = Date.parse(nndate) / 1000
	return nndate;
}
/**
 * 时间戳转时间
 * @param {Object} timestamp
 */
function formatTime(timestamp) {
	timestamp = parseInt(timestamp)
	var date = new Date(timestamp * 1000),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds()
	date = [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	// console.log('时间戳转时间:',date);
	return date
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
/**
 * 封装微信request
 * @param {Object} e
 */
function request(e) {
	var c = getApp().config,
		data = e.data || '',
		success = e.success || function() {},
		fail = e.fail || function() {}
	if (!e.url) {
		console.error('请填写url')
		return
	}!e.showLoading || wx.showLoading({
		mask: true,
		title: '加载中'
	});
	wx.request({
		url: c.url + '/api/' + e.url,
		method: e.method || 'GET',
		data: {
			...data,
			apisec: c.apisec
		},
		success: r => {
			r = r.data
			e.showLoading && wx.hideLoading();
			r.status == 200 ? success(r.data) : wx.showModal({
				confirmText: '确定',
				title: '错误',
				content: '错误代码:' + r.status
			})
		},
		fail: e => {
			console.error('请求错误:', e)
		}
	})
}

/**
 * 获取组件属性
 * @param {Object} e
 */
function getComponentInfo(e) {
	var query = wx.createSelectorQuery()
	query.select(e.name).boundingClientRect()
	query.exec((res) => {
		e.success(res[0])
	})
}

module.exports = {
	isDark,
	getDate,
	getTime,
	uploadImg,
	getTimestamp,
	formatTime,
	getParam,
	request,
	getComponentInfo
}
