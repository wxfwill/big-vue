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
		return `${num}`;
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
	return trigger.some(i => oldState[i] != newState[i]);
}

/**
 * 向上取整数
 * */
export function numberInteger(num = 0) {
	const len      = String(num).length,
		  carryBit = Number(`10E${len - 2}`);
	return (~~(num / carryBit + 1)) * carryBit;
}

// 转换定量报表数据
export function convertData(configList = [], chartData = {}) {
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

// 转换不定量折线图
export function convertLineData(data, axisKey, seriesKey) {
	const axisData   = [],
		  seriesData = data.map(i => {
			  axisData.push(i[axisKey]);
			  return i[seriesKey];
		  });
	return {
		axisData,
		seriesData
	};
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


export const formatNum = (money) => {
	if(money && money != null) {
		money     = String(money);
		let left  = money.split('.')[0],
			right = money.split('.')[1];
		right     = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '';
		let temp  = left.split('').reverse().join('').match(/(\d{1,3})/g);
		return (Number(money) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
	} else if(money === 0) {   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
		return '0.00';
	} else {
		return "";
	}
};