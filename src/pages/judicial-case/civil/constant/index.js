export const businessConfigList = [{
	id   : 'cnzsjcjys',
	name : '采纳再审检察建议数',
	color: '#fbbb19',
}, {
	id   : 'ksajgbycps',
	name : '抗诉案件改变原裁判数',
	color: '#37e3c4',
}, {
	id   : 'spjdcnjcjys',
	name : '审判监督采纳检察建议数',
	color: '#00bff1',
}, {
	id   : 'tckss',
	name : '提出抗诉数',
	color: '#2fdb81',
}, {
	id   : 'zxjdcnjcjys',
	name : '执行监督采纳检察建议数',
	color: '#25c1e6'
}, {
	id   : 'tczsjcjys',
	name : '提出再审检察建议数',
	color: '#f79821',
}];

export const effectiveSupervisionConfig = [{
	id   : 'sljs',
	title: '受理(件)',
}, {
	id   : 'tckss',
	title: '提出抗诉数',
}, {
	id   : 'gbycps',
	title: '改变原裁判数',
}, {
	id   : 'tczsjcjys',
	title: '提出再审检察建议',
}, {
	id   : 'fycns',
	title: '法院采纳数',
}, {
	id   : 'zzscs',
	title: '中止审查数',
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
