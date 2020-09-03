/**
 * author:ran
 * time:2019-01-01
 */

/**
 * string验证字符串
 */
String.prototype.validate = function(strReg) {
  var result = this.match(eval('/' + strReg + '/'))
  return result
}
/**
 * string转正则对象
 */
String.prototype.toReg = function(strReg) {
  return eval('/' + strReg + '/')
}

/**
 * string转date
 */
String.prototype.toDate = function() {
  return new Date(Date.parse(this.replace(/-/g, '/')))
}

/**
 * string转Json对象
 */
String.prototype.toJson = function() {
  return eval('(' + this + ')')
}

/**
 * 去字符串空格
 */
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '')
}

/**
 * 字符串转Int
 */
String.prototype.toInt = function() {
  return parseInt(this)
}

/**
 * 字符串转转数值类型
 */
String.prototype.toNumber = function() {
  var str = this.replace('px', '')
  return Number(str)
}

/**
 * 替换字符串中 指定的字符
 */
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, 'gm'), s2)
}

/**
 * 字符串去 首位指定字符 默认:','
 */
String.prototype.substrBoth = function(char) {
  char = char || ','
  var value = this
  if (value.indexOf(char) === 0) {
    value = value.substring(1, value.length)
  }
  if (value.lastIndexOf(char) === value.length -1) { value = value.substring(0, value.length - 1) }

  return value
}

/**
 * 转驼峰
 */
String.prototype.toSnakeCase = function() {
  var re = /-(\w)/g
  return this.replace(re, function($0, $1) {
    return $1.toUpperCase()
  })
}

/**
 * unicode解码
 */
String.prototype.unicode = function() {
  var str = this.replace(/\\/g, '%')
  return unescape(str)
}

/**
 * 解码
 */
String.prototype.decode = function() {
  return decodeURIComponent(this)
}

/**
 * 数值类型转Integer
 */
Number.prototype.toInt = function() {
  return parseInt(this)
}

/**
 * 数字格式化输出
 * 例子：
 *  - var revenue = 12345678;
 *  - alert(revenue.formatMoney()); // $12,345,678.00
 *  - alert(revenue.formatMoney(0, "HK$ ")); // HK$ 12,345,678
 *  - var price = 4999.99;
 *  - alert(price.formatMoney(2, "€", ".", ",")); // €4.999,99
 */
Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
  places = !isNaN((places = Math.abs(places))) ? places : 2
  symbol = symbol !== undefined ? symbol : ''
  thousand = thousand || ','
  decimal = decimal || '.'
  var number = this;
  var negative = number < 0 ? '-' : '';
  var i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '';
  var j = (j = i.length) > 3 ? j % 3 : 0
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '1' + thousand) +
    (places
      ? decimal +
      Math.abs(number - i)
        .toFixed(places)
        .slice(2)
      : '')
  )
}

/**
 * 时间戳转日期对象
 */
Number.prototype.toDate = function() {
  var time = parseInt(this)
  switch((time + '').length) {
  case 10: // 秒转date
    return new Date(time * 1000)
  case 13: // 毫秒转date
    return new Date(time)
  }

  return null
}

/**
 * 日期对象转时间戳
 * @param millisecond 是否启用毫秒 默认false 不启用
 */
Date.prototype.toTimestamp = function(millisecond) {
  millisecond = millisecond || false
  var time = this.getTime()
  if (millisecond === false) { return parseInt((time / 1000) + 8 * 60 * 60) }

  return time + 8 * 60 * 60 * 1000
}
//
/**
 * 日期格式化
 * @param 格式化字符串 例：‘yyyy-MM-dd HH:mm:ss’
 */
Date.prototype.format = function(format) {
  var o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'H+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}
// 返回当前年份共计多少天
Date.prototype.getDays = function() {
  var myDate = new Date(this.getFullYear(), 2, 0)
  return myDate.getDate() === 28 ? 365 : 366
}
/**
 * 返回当前月份的最后一天的日期对象
 */
Date.prototype.getLastDay = function() {
  var month = this.getMonth()
  var newYear = this.getFullYear() // 取当前的年份
  var newMonth = month + 1 // 取下一个月的第一天，方便计算（最后一天不固定）
  if (month > 12) {
    // 如果当前大于12月，则年份转到下一年
    newMonth -= 12 // 月份减
    newYear++ // 年份增
  }
  var newDate = new Date(newYear, newMonth, 1) // 取当年当月中的第一天
  return new Date(newDate.getTime() - 1000 * 60 * 60 * 24) // 获取当月最后一天日期
}
/**
 * 获取本月的第一天日期
 */
Date.prototype.getFirstDay = function() {
  var month = this.getMonth()
  var year = this.getFullYear() // 取当前的年份
  return new Date(year, month, 1)
}

/**
 * 得到日期年月日等加数字后的日期
 * @param strInterval 指时间类型 y:年、q:季度、m:月、w:周、d:日、h:小时、n:分、s:秒
 * @param number 追加数值
 */
Date.prototype.dateAdd = function(strInterval, number) {
  var dtTmp = this
  switch (strInterval) {
  case 's':
    return new Date(Date.parse(dtTmp) + 1000 * number)
  case 'n':
    return new Date(Date.parse(dtTmp) + 60000 * number)
  case 'h':
    return new Date(Date.parse(dtTmp) + 3600000 * number)
  case 'd':
    return new Date(Date.parse(dtTmp) + 86400000 * number)
  case 'w':
    return new Date(Date.parse(dtTmp) + 86400000 * 7 * number)
  case 'q':
    return new Date(
      dtTmp.getFullYear(),
      dtTmp.getMonth() + number * 3,
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  case 'm':
    return new Date(
      dtTmp.getFullYear(),
      dtTmp.getMonth() + number,
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  case 'y':
    return new Date(
      dtTmp.getFullYear() + number,
      dtTmp.getMonth(),
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  }
  return null
}

/**
 * 得到日期年月日等减数字后的日期
 * @param strInterval 指时间类型 y:年、q:季度、m:月、w:周、d:日、h:小时、n:分、s:秒
 * @param number 减去的数值
 */
Date.prototype.dateBefore = function(strInterval, number) {
  var dtTmp = this
  switch (strInterval) {
  case 's':
    return new Date(Date.parse(dtTmp) - 1000 * number)
  case 'n':
    return new Date(Date.parse(dtTmp) - 60000 * number)
  case 'h':
    return new Date(Date.parse(dtTmp) - 3600000 * number)
  case 'd':
    return new Date(Date.parse(dtTmp) - 86400000 * number)
  case 'w':
    return new Date(Date.parse(dtTmp) - 86400000 * 7 * number)
  case 'q':
    return new Date(
      dtTmp.getFullYear(),
      dtTmp.getMonth() - number * 3,
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  case 'm':
    return new Date(
      dtTmp.getFullYear(),
      dtTmp.getMonth() - number,
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  case 'y':
    return new Date(
      dtTmp.getFullYear() - number,
      dtTmp.getMonth(),
      dtTmp.getDate(),
      dtTmp.getHours(),
      dtTmp.getMinutes(),
      dtTmp.getSeconds()
    )
  }
  return null
}

/**
 * 计算两日期相差的日期年月日等
 */
Date.prototype.dateDiff = function(interval, objDate2) {
  var d = this;
  var i = {};
  var t = d.getTime();
  var t2 = objDate2.getTime()
  i.y = objDate2.getFullYear() - d.getFullYear()
  i.q =
    i.y * 4 +
    Math.floor(objDate2.getMonth() / 4) -
    Math.floor(d.getMonth() / 4)
  i.m = i.y * 12 + objDate2.getMonth() - d.getMonth()
  i.ms = objDate2.getTime() - d.getTime()
  i.w =
    Math.floor((t2 + 345600000) / 604800000) -
    Math.floor((t + 345600000) / 604800000)
  i.d = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
  i.h = Math.floor(t2 / 3600000) - Math.floor(t / 3600000)
  i.n = Math.floor(t2 / 60000) - Math.floor(t / 60000)
  i.s = Math.floor(t2 / 1000) - Math.floor(t / 1000)
  return i[interval]
}

/**
 * 获取今天是本月的第几周
 */
Date.prototype.monthWeek = function() {
  var w = this.getDay();
  var d = this.getDate()
  return Math.ceil((d + 6 - w) / 7)
}

/**
 * 获取今天是本年的第几周
 */
Date.prototype.yearWeek = function() {
  var date2 = new Date(this.getFullYear(), 0, 1);
  var d = Math.round((this.valueOf() - date2.valueOf()) / 86400000)
  return Math.ceil((d + (date2.getDay() + 1 - 1)) / 7)
}

/**
 * 获取今天是本年的第几季度
 */
Date.prototype.quarter = function() {
  var month = this.getMonth()
  var m = {
    zs: parseInt(month / 3),
    ys: month % 3
  }
  return m.ys > 0 ? m.zs + 1 : m.zs
}

/**
 * 扩展 window.location 方法 获取当前页面url地址中的 参数
 */
window.location.getParam = function(key) {
  // 构造一个含有目标参数的正则表达式对象
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  var location = window.location.href
  // 匹配目标参数
  var r = location.substr(location.indexOf('?') + 1).match(reg)

  return r == null ? null : decodeURIComponent(r[2])
}

/**
 * 数组是否为空
 */
Array.prototype.isEmpty = function() {
  return !this.length;
}

/**
 * 数组是否存在值
 */
Array.prototype.any = function(func) {
  return this.some(func || function(x) { return x });
}

/**
 * 解决js运算精度丢失问题  加法
 */
Math.plus = function(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
 * 解决js运算精度丢失问题  减法
 */
Math.minus = function(arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 解决js运算精度丢失问题  乘法
 */
Math.mul = function(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

/**
 * 解决js运算精度丢失问题  除法
 */
Math.div = function(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
  }
  with (Math) {
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * pow(10, t2 - t1);
  }
}

