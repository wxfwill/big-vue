export const chargeJunctionConfig = [{
	id   : 'kg_sls',
	name : '受理数',
	color: '#1BC85D',
}, {
	id   : 'kg_bjs',
	name : '办结数',
	color: '#FBBA18',
}, {
	id   : 'kg_zbs',
	name : '在办数',
	color: '#009FE8',
}];

export const appealJunctionConfig = [{
	id   : 'ss_sls',
	name : '受理数',
	color: 'linear-gradient(146deg,rgba(33,188,237, .5) 0%, rgba(15,113,232,.5) 100%)',
}, {
	id   : 'ss_bjs',
	name : '办结数',
	color: 'linear-gradient(146deg,rgba(49,226,214, .5) 0%,rgba(34,177,228,.5) 100%)',
}, {
	id   : 'ss_zbs',
	name : '在办数',
	color: 'linear-gradient(146deg,rgba(44,229,198,.5) 0%,rgba(23,217,191,.5) 100%)',
}];

export const disobeyCourtConfig = [{
	id  : 'sljs',
	name: '受理件数',
}, {
	id  : 'lafcs',
	name: '立案复查数',
}, {
	id  : 'tqkss',
	name: '提请、提起抗诉数',
}, {
	id  : 'tczsjcjys',
	name: '提出再审检察建议数',
}];

export const procuratorialOrganConfig = [{
	id  : 'sljs',
	name: '受理件数',
}, {
	id  : 'lafcs',
	name: '立案复查数',
}, {
	id  : 'fygbyjds',
	name: '法院改变原判定数',
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

export const compensationCaseConfig = [{
	id   : 'gjpcsljs',
	title: '受理数',
	ratio: 'gjpcsljs_zb',
	icon : 'water-polo',
	col1 : '#009FE8',
	col2 : '#2FE0BE',
}, {
	id   : 'lajs',
	title: '立案数',
	ratio: 'lajs_zb',
	icon : 'water-polo',
	col1 : '#1BC85D',
	col2 : '#31DCFF',
}, {
	id   : 'jdgypcjs',
	title: '决定给予赔偿数',
	ratio: 'jdgypcjs_zb',
	icon : 'water-polo',
	col1 : '#FBBA18',
	col2 : '#EDC121',
}, {
	id   : 'jdzfpcje',
	title: '支付金额',
	ratio: 'jdzfpcje_zb',
	icon : 'pay-icon'
}];