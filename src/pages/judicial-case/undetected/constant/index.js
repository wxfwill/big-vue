export const investigateNumConfig = [{
	id   : 'bbjs',
	name : '不捕件数',
	color: '#1BC85D',
}, {
	id   : 'dbjs',
	name : '逮捕件数',
	color: '#F7931E',
}];

export const investigatePerConfig = [{
	id   : 'pbrs',
	name : '批捕人数',
	color: '#1BC85D',
}, {
	id   : 'bbrs',
	name : '不捕人数',
	color: '#F7931E',
}];

export const prosecuteNumConfig = [{
	id   : 'qsjs',
	name : '起诉件数',
	color: '#21A7FE',
}, {
	id   : 'bqsjs',
	name : '不起诉件数',
	color: '#8750FF',
}];

export const prosecutePeoConfig = [{
	id   : 'qsrs',
	name : '起诉人数',
	color: '#21A7FE',
}, {
	id   : 'bqsrs',
	name : '不起诉人数',
	color: '#8750FF',
}];

export const educationalProcedureConfig = [{
	id  : 'wmrs',
	name: '文盲',
}, {
	id  : 'xxrs',
	name: '小学',
}, {
	id  : 'czrs',
	name: '初中',
}, {
	id  : 'gzrs',
	name: '高中',
}, {
	id  : 'zzrs',
	name: '中专',
}, {
	id  : 'qtrs',
	name: '其他',
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
}, {
	id  : 'yejcg',
	name: '原额检察官',
}, {
	id  : 'syjf',
	name: '使用经费',
}];

// 作案年龄分布
export const ageCrimeConfig = [{
	id  : 'nl1',
	name: '0-10岁',
	color: '44, 236, 248'
}, {
	id  : 'nl2',
	name: '10-12岁',
	color: '247, 147, 30'
},{
	id  : 'nl3',
	name: '12-14岁',
	color: '17, 198, 255'
},{
	id  : 'nl4',
	name: '15岁',
	color: '44, 248, 147',
},{
	id  : 'nl5',
	name: '16岁',
	color: '44, 183, 248'
},{
	id  : 'nl6',
	name: '17岁',
	color: '159, 44, 248'
}];

export const noCatchNumberConfig = [{
	id: 'bgcfz',
	name: '不构成犯罪不捕人数',
}, {
	id: 'fhjsjztj',
	name: '符合监视居住条件不捕人数',
}, {
	id: 'zjbz',
	name: '证据不足不捕人数',
}, {
	id: 'yxshj',
	name: '因刑事和解不捕人数',
}, {
	id: 'pcffzj',
	name: '排除非法证据不捕人数',
}, {
	id: 'qtqx',
	name: '其他情形不捕人数',
}, {
	id: 'wshwxx',
	name: '无社会危险不捕人数',
}];