
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch (e) { }
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));


var domain = "http://bjapi.zlla.cn";
var AppID = "wx3b29432a55b19f6b";

//获取url  get传值参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}


function getQueryValue(name) {
	var url = window.location.href;
	var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

	if (result == null || result.length < 1) {
		return "";
	}
	return decodeURI(result[1]);
}

function getCode() {
	//snsapi_userinfo snsapi_base
	var REDIRECT_URI = encodeURIComponent(window.location.href);
	location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + AppID + "&redirect_uri=" + REDIRECT_URI
		+ "&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect";

}

function getItem(key) {
	return $.cookie(key) || "";
}

function checkPhone(phone) {
	return (/^1\d{10}$/.test(phone))
}


function isLogin() {
	$.cookie("uid", 17);
	var uid = getItem("uid");
	var code = getQueryValue("code")

	if (code == "" && uid == '') {
		getCode();
	}

	if (code != "" && uid == '') {
		console.log(code);
		// debugger
		axios.get('/app/user/wxInfo', {
			params: {
				code: code
			}
		}).then((data) => {
			// console.log(data);
			// console.log(data.data.data.uid);
			$.cookie("uid", data.data.data.uid);
			$.cookie("openid", data.data.data.openid);
			$.cookie("phone", data.data.data.phone);
			// location.reload();
		}).catch(function (err) {
			console.log(err);
		})
	}
}

//将UTC 时间转换成本地时间（添加计算时差）
function utc2beijing(utc_datetime) {
	// 转为正常的时间格式 年 - 月 - 日 时: 分: 秒
	// var T_pos = utc_datetime.indexOf('T');
	// // console.log(T_pos)
	// var Z_pos = utc_datetime.indexOf('Z');
	// // console.log(Z_pos)
	// var year_month_day = utc_datetime.substr(0, T_pos);
	// var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
	// var new_datetime = year_month_day + " " + hour_minute_second;

	// // 处理成为时间戳
	// timestamp = new Date(Date.parse(new_datetime));
	// timestamp = timestamp.getTime();
	// timestamp = timestamp / 1000;

	// // 增加8个小时，北京时间比utc时间多八个时区
	// var timestamp = timestamp + 8 * 60 * 60;
	// // return timestamp
	// // 时间戳转为时间
	// // console.log(parseInt(timestamp) * 1000)
	// // var date = new Date(parseInt(timestamp) * 1000);
	// var date = parseInt(timestamp) * 1000
	// console.log(date)

	//  引用 Moment.js  我把它放到上面了
	let transTime = moment(utc_datetime).format('YYYY/MM/DD HH:mm:ss')
	console.log(transTime)
	return transTime
	//转yyyy-MM-dd HH:mm:ss格式
	// Y = date.getFullYear() + '-';
	// M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	// D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	// h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	// m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	// s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	// console.log(Y + M + D + ' ' + h + ':' + m + ':' + s)
	// return Y + M + D + ' ' + h + ':' + m + ':' + s


}

