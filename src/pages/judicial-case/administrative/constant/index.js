export const conditionConfig = [{
	id   : 'slajs',
	title: '受理件数',
}, {
	id   : 'bjjs',
	title: '办结 件数',
}, {
	id     : 'bjl',
	title  : '办结率',
	binding: '%'
}, {
	id   : 'tcjdjs',
	title: '提出监督数',
}, {
	id     : 'tcjdl',
	title  : '提出监督率',
	binding: '%'
}, {
	id   : 'zzscjs',
	title: '中止审查',
}];

export const behaviorConfig = [{
	id   : 'sls',
	title: '受理(件)',
}, {
	id   : 'bjs',
	title: '办结(件)',
}, {
	id   : 'bjl',
	title: '办结率(%)',
}, {
	id   : 'tcjcjys',
	title: '提出检察建议数	',
}, {
	id   : 'fycnjcjys',
	title: '法院采纳数',
}];

export const judgmentConfig = [{
	id   : 'sljs',
	title: '受理件数',
	color: '#FBC31F'
}, {
	id   : 'tckss',
	title: '提出抗诉数',
	color: '#39E4C6'
}, {
	id   : 'gbycps',
	title: '改变原裁判数',
	color: '#21CE68'
}, {
	id   : 'tczsjcjys',
	title: '提出再审检察建议',
	color: '#1DB5E0'
}, {
	id   : 'fycns',
	title: '法院采纳数',
	color: '#00B1ED'
}, {
	id   : 'zzscs',
	title: '中止审查数',
	color: '#F9A42A'
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

export const executeConfig = [{
	id   : 'sljs',
	title: '受理(件)',
}, {
	id   : 'bjjs',
	title: '办结(件)',
}, {
	id   : 'bjl',
	title: '办结率(%)',
}, {
	id   : 'tcjcjys',
	title: '提出检察建议数',
}, {
	id   : 'cnjcjys',
	title: '法院采纳数',
}];

export const classifyConfig = [{
	id  : 'sxcpjd',
	name: '生效裁判监督'
}, {
	id  : 'wfxwjd',
	name: '违法行为监督'
}, {
	id  : 'zxhdjd',
	name: '执行活动监督'
}];