/**
 * 获取变量真实类型
 * */
export const getRealType           = (constant) => {
	if(/(Number|Boolean|String|Undefined|Null|Function|Object|Array|Set|Symbol|WeakSet|Map)/.test(Object.prototype.toString.call(constant))) {
		return RegExp.$1.toLocaleLowerCase();
	} else {
		return constant;
	}
};
/**
 *  位数不够补零
 * */
export const fillZero = (num, len) => {
	if(`${num}`.length < len){
		return (Array(len).join('0') + num).slice(-len)
	} else  {
		return num;
	}
};