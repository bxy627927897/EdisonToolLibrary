/*
* @Author: msi-pc
* @Date:   2017-11-07 14:49:56
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-11-08 12:22:52
*/


/**
 * 把源对象自身的属性（Own Property）扩展到目标对象
 * @method extend
 * @param {Any} target 目标对象
 * @param {Any*} [source] 源对象。若有同名属性，则后者覆盖前者
 * @return {Any} 目标对象
 */
function extend(target) {
	if (target == null) { throw new Error('target cannot be null'); }

	var i = 0, len = arguments.length, key, src;
	while (++i < len) {
		src = arguments[i];
		if (src != null) {
			for (key in src) {
				if ( src.hasOwnProperty(key) ) { target[key] = src[key]; }
			}
		}
	}

	return target;
}


var undefined;
/**
 * 检查变量的值是否为undefined
 * @method isUndefined
 * @param {Any} value 待测变量
 * @return {Boolean} 待测变量是否为undefined
 */
function isUndefined(value) { return value === undefined; }

// 用于基本类型判断
var toString = Object.prototype.toString;

/**
 * 检查变量是否Function类型
 * @method isFunction
 * @param {Any} value 待测变量
 * @return {Boolean} 待测变量是否Function类型
 */
function isFunction(value) { return toString.call(value) === '[object Function]'; }

/**
 * 检查变量是否Date类型
 * @method isDate
 * @param {Any} value 待测变量
 * @return {Boolean} 待测变量是否Date类型
 */
function isDate(value) { return toString.call(value) === '[object Date]'; }

/**
 * 检查变量是否Object类型
 * @method isObject
 * @param {Any} value 待测变量
 * @return {Boolean} 待测变量是否Object类型
 */
function isObject(value) { return toString.call(value) === '[object Object]'; }

/**
 * 检查变量是否Array类型
 * @method isArray
 * @param {Any} value 待测变量
 * @return {Boolean} 待测变量是否Array类型
 */
var isArray = Array.isArray ||
	function(value) { return toString.call(value) === '[object Array]'; };

/**
 * 检查对象是否空Object
 * @method isEmptyObject
 * @param {Object} obj 待测对象
 * @return {Boolean} 待测对象是否空Object
 */
function isEmptyObject(obj) {
	if (obj != null) {
		for (var key in obj) {
			if ( obj.hasOwnProperty(key) ) { return false; }
		}
	}
	return true;
}


/**
 * 把对象转换为数组
 * @method toArray
 * @param {Array|ArrayLike} obj 对象
 * @return {Array} 数组
 */
function toArray(obj) {
	var result;
	try {
		result = Array.prototype.slice.call(obj);
	} catch (e) {
		result = [ ];
		var i = obj.length;
		while (i) {
			result[--i] = obj[i];
		}
	}

	return result;
}


/**
 * 把数组二的元素合并到数组一
 * @method merge
 * @param {Array} first 数组一
 * @param {Array} second 数组二
 * @return {Array} 合并后的数组一
 */
function merge(first, second) {
	var len = second.length, j = 0, i = first.length;
	while (j < len) {
		first[i++] = second[j++];
	}
	first.length = i;

	return first;
}


module.exports = {
	extend: extend,
	isUndefined: isUndefined,
	isFunction: isFunction,
	isDate: isDate,
	isObject: isObject,
	isArray: isArray,
	isEmptyObject: isEmptyObject,
	toArray: toArray,
	merge: merge
};