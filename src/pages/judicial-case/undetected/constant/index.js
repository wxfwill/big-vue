export const investigateNumConfig = [{
	id   : 'dbjs',
	name : '逮捕件数',
	color: '#F7931E',
}, {
	id   : 'bbjs',
	name : '不捕件数',
	color: '#1BC85D',
}];

export const investigatePerConfig = [{
	id   : 'bbrs',
	name : '不捕人数',
	color: '#F7931E',
}, {
	id   : 'pbrs',
	name : '逮捕人数',
	color: '#1BC85D',
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
}];

export const topDataConfig    = [{
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

// 作案年龄分布
export const ageCrimeConfig = [{
	id  : 'nl1',
	name: '0-10岁',
	strokeColor : '#2CECF8',
	tintColor: 'rgba(44,236,248,0.2)',
}, {
	id  : 'nl2',
	name: '10-12岁',
	strokeColor : '#F7931E',
	tintColor: 'rgba(247,147,30,0.2)',
},{
	id  : 'nl3',
	name: '12-14岁',
	strokeColor : '#11C6FF',
	tintColor: 'rgba(17,198,255,0.2)',
},{
	id  : 'nl4',
	name: '15岁',
	strokeColor : '#2CF893',
	tintColor: 'rgba(44,248,147,0.2)',
},{
	id  : 'nl5',
	name: '16岁',
	strokeColor : '#2CB7F8',
	tintColor: 'rgba(44,183,248,0.2)',
},{
	id  : 'nl6',
	name: '17岁',
	strokeColor : '#9F2CF8',
	tintColor: 'rgba(159,44,248,0.2)',
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