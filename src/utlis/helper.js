/**
 * 获取变量真实类型
 * */
export const getRealType = (constant) => {
	if(/(Number|Boolean|String|Undefined|Null|Function|Object|Array|Set|Symbol|WeakSet|Map)/.test(Object.prototype.toString.call(constant))) {
		return RegExp.$1.toLocaleLowerCase();
	} else {
		return constant;
	}
};
/**
 *  向前补零
 * */
export const fillZero    = (num, len) => {
	if(`${num}`.length < len) {
		return (Array(len).join('0') + num).slice(-len);
	} else {
		return num;
	}
};

/**
 * 生成uuid
 * */
export function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0,
			v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/**
 *  验证是否需要更新
 * */
export function verifyTriggerState(trigger = [], oldState, newState) {
	return trigger.some(i => oldState[i] !== newState[i]);
}

/**
 * 取整
 * */
export function numberInteger(num = 0) {
	const len      = String(num).length,
		  carryBit = Number(`10E${len - 2}`);
	return (~~(num / carryBit + 1)) * carryBit;
}

export function convertData(configList = [], chartData) {
	const axisData   = [],
		  seriesData = configList.map((config) => {
			  axisData.push(config.name);
			  return chartData[config.id];
		  });
	return {
		axisData,
		seriesData,
	}
}

export function getNowYear() {
	return new Date().getFullYear();
}

export function getNowDate() {
	const date = new Date();
	return `${date.getFullYear()}-${fillZero(date.getMonth() + 1, 2)}-${fillZero(date.getDate(), 2)}`;
}

export function textFormatter(text, interval = 3) {
	const str   = text.trim();
	let tempStr = '';
	const len   = str.length;
	for(let i = 0; i < len; i++) {
		if((i + 1) % interval === 0 && (i+1) < len) {
			tempStr += str[i] + '\n';
		} else {
			tempStr += str[i];
		}
	}
	return tempStr;
}