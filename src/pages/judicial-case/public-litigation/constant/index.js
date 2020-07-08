export const CHART_COLOR_LIST = ['#31DBE8', '#EAD61F', '#6EB21F', '#16D86C', '#FD6B44', '#1783E5', '#FC9128'];

export const territoryConfig = [{
	id  : 'sthjhzybhly',
	name: '生态环境和资源保护领域',
}, {
	id  : 'spypaqly',
	name: '食品药品安全领域',
}, {
	id  : 'gyccbhly',
	name: '国有财产保护领域',
}, {
	id  : 'gytdsyqcrly',
	name: '国有土地使用权出让领域',
}, {
	id  : 'ylqybhly',
	name: '英烈权益保护领域',
}];


// 地图tooltip内容
export const mapTooltipConfig = [{
	id    : 'sls',
	name  : '受理数',
	regExp: '{sls}&nbsp;&nbsp;&nbsp; {sls_zb}%',
}, {
	id    : 'bjs',
	name  : '办结数',
	regExp: '{bjs}&nbsp;&nbsp;&nbsp; {bjs_zb}%',
}, {
	id    : 'zbs',
	name  : '在办数',
	regExp: '{zbs}&nbsp;&nbsp;&nbsp; {zbs_zb}%',
}];

export const topDataConfig = [{
	id  : 'totalSls',
	name: '受理总数',
}, {
	id  : 'totalBjs',
	name: '办结总数',
}, {
	id  : 'totalZbs',
	name: '在办总数',
}];

export const leftSideList = [{
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];


export const mapTableConfig = [{
	id  : 'name',
	name: '名称',
}, {
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];

export const mapLineLegend = [{
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];

export const statisticsConfig = [{
	id  : 'ys',
	name: '一审',
}, {
	id  : 'ss',
	name: '上诉',
}, {
	id  : 'es',
	name: '二审',
}, {
	id  : 'zs',
	name: '再审',
}, {
	id  : 'xs',
	name: '线索',
}];

// 督促回复
export const superviseTheReplyConfig = [{
	id  : 'lgyn',
	name: '两个月内',
}, {
	id  : 'qt',
	name: '其他',
}, {
	id  : 'swrn',
	name: '十五日内',
}];

// 案件来源
export const sourceOfCaseConfig = [{
	id  : 'gyjdzz',
	name: '公益监督职责',
}, {
	id  : 'kgjczz',
	name: '控告检察职责',
}, {
	id  : 'pzhzjddbzz',
	name: '批准或者决定逮捕职责',
}, {
	id  : 'qt',
	name: '其他',
}, {
	id  : 'qtjdzz',
	name: '其他监督职责',
}, {
	id  : 'scqszz',
	name: '审查起诉职责',
}, {
	id  : 'ssjdzz',
	name: '诉讼监督职责',
}];
