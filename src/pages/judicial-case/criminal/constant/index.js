// 受理案件统计
export const acceptCaseChartConfig = [{
	id  : 'jjjrfz',
	name: '经济金融犯罪'
}, {
	id  : 'ptfz',
	name: '普通犯罪'
}, {
	id  : 'zdfz',
	name: '重大犯罪'
}, {
	id  : 'zffz',
	name: '职务犯罪'
}];
// 审查逮捕各类犯罪
export const examineChartConfig = [{
	id  : 'jjjrfz',
	name: '经济金融犯罪'
}, {
	id  : 'ptfz',
	name: '普通犯罪'
}, {
	id  : 'zdfz',
	name: '重大犯罪'
}, {
	id  : 'zffz',
	name: '职务犯罪'
}];

// 公诉各类业务受理情况
export const prosecutionBusinessConfig = [{
	id: 'scqsaj',
	name : '审查起诉案件'
}, {
	id: 'bsfyaj',
	name : '不诉复议案件'
}, {
	id: 'esssaj',
	name : '二审上诉案件'
}, {
	id: 'bsfhaj',
	name : '不诉复核案件'
}, {
	id: 'esksaj',
	name : '二审抗诉案件'
}, {
	id: 'sjksaj',
	name : '审监抗诉案件'
}, {
	id: 'fhcsaj',
	name : '发回重审案件'
}, {
	id: 'bascaj',
	name : '备案审查案件'
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

// 犯罪嫌疑人年龄分布
export const crimeAgeConfig = [{
	id    : 'nl1',
	name  : '0-18岁',
}, {
	id    : 'nl2',
	name  : '18-25岁',
}, {
	id    : 'nl3',
	name  : '25-35岁',
}, {
	id  : 'nl4',
	name: '35-45岁',
}, {
	id  : 'nl5',
	name: '45-55岁',
}, {
	id  : 'nl6',
	name: '55岁以上',
}];

// 职务犯罪人数
export const dutyCrimeConfig = [{
	id    : 'xkj',
	name  : '乡科级',
}, {
	id    : 'xcj',
	name  : '县处级',
}, {
	id    : 'tjj',
	name  : '厅局级',
}, {
	id  : 'sbjzz',
	name: '省部级正职',
}, {
	id  : 'sbjfz',
	name: '省部级副职',
}];

// 判决生效人数
export const judgmentChartConfig = [{
	id    : 'pj1',
	name  : '无罪',
}, {
	id    : 'pj2',
	name  : '3年以下',
}, {
	id    : 'pj3',
	name  : '3-10年',
}, {
	id  : 'pj4',
	name: '10年以上',
}, {
	id  : 'pj5',
	name: '无期',
}];