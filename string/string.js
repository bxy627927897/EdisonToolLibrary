/*
* @Author: msi-pc
* @Date:   2017-11-07 09:57:20
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-11-07 15:14:20
*/

/**
 * 把源对象自身的属性（Own Property）扩展到目标对象
 * @method extend
 * @param {Any} target 目标对象
 * @param {Any*} [source] 源对象。若有同名属性，则后者覆盖前者
 * @return {Any} 目标对象
 */



// 大于10000的数字格式化成“x万”
function toWan(num) {
	return num > 10000 ? (num / 10000).toFixed(1) + '万' : num.toString();
}


/**
 * 生成长度为16的随机字符串（不保证一定不重复，但基本上不会重复）
 * @method randomStr
 * @param {String} [prefix] 前缀
 * @return {String} 生成的字符串
 */
function randomStr(prefix) {
	var result = '';
	do {
		result += Math.random().toString(36).substr(2);
	} while (result.length < 10);

	result = result.substr(0, 10) + ( '00000' + Math.abs(new Date) ).slice(-6);

	if (prefix) { result = prefix + result; }

	return result;
}


/**
 * 格式化日期
 * @method formatDate
 * @param {Date} date 日期
 * @param {String} formation 日期格式
 * @return {String} 格式化后的日期字符串
 */
function formatDate(date, formation) {
	var values = {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	};

	return formation.replace(/Y+|M+|D+|h+|m+|s+/g, function(match) {
		var result = values[ match[0] ];
		if (match.length > 1 && result.toString().length !== match.length) {
			result = ( ( new Array(match.length) ).join('0') + result ).slice(-match.length);
		}
		return result;
	});
};



// 帖子页的日期格式化函数   time-> 时间戳
function formatTopicTime(time) {
	const date = new Date(time * 1000);
	const now = new Date();
	const timespan = Math.round(now - date / 60 / 1000);

	function isTheSameDate(date1, date2) {
		return [
			'getFullYear',
			'getMonth',
			'getDate'
		].every((method) => {
			return date1[method]() === date2[method]();
		});
	}

	function isBeforeDay(date1, date2, n) {
		let date = new Date(date1.getTime() + n * 24 * 60 * 60 * 1000);
		return isTheSameDate(date, date2);
	}

	if (timespan < 5) {
		return '刚刚';
	} else if (timespan < 60) {
		return Math.round(timespan) + '分钟前';
	} else if (isTheSameDate(date, now)) {
		return formatDate(date, 'hh:mm');
	} else if (isBeforeDay(date, now, 1)) {
		return '昨天 ' + formatDate(date, 'hh:mm');
	} else if (isBeforeDay(date, now, 2)) {
		return '前天 ' + formatDate(date, 'hh:mm');
	} else if (date.getFullYear() === now.getFullYear()) {
		return formatDate(date, 'MM-DD hh:mm');
	} else {
		return formatDate(date, 'YYYY-MM-DD hh:mm');
	}
};


module.exports = {
	toWan: toWan,
	randomStr: randomStr,
	formatTopicTime: formatTopicTime
};