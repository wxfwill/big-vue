// 收入
const incomeChartConfig = [{
	id  : 'czbk',
	name: '财政拨款',
}, {
	id  : 'sjbz',
	name: '上级补助',
}, {
	id  : 'sysr',
	name: '事业收入',
}, {
	id  : 'jysr',
	name: '经营收入',
}, {
	id  : 'qtsr',
	name: '其他收入',
}];

// 地图tooltip内容
const mapTooltipConfig = [{
	id  : 'sr',
	name: '收入',
}, {
	id  : 'zc',
	name: '支出',
}];

// 地图扩展列表
const mapTableConfig = [{
	id  : 'name',
	name: '名称',
}, {
	id  : 'sr',
	name: '收入',
}, {
	id  : 'zc',
	name: '支出',
}];

export const mapLineLegend = [{
	id  : 'sr',
	name: '收入',
}, {
	id  : 'zc',
	name: '支出',
}];

//资产情况
const propertyConfig                  = {
	'total': [{
		name: '总资产',
		num : '12,234,456,23'
	}],
	'list' : [{
		name: '流动资产',
		num : '123.45亿'
	}, {
		name: '流动资产',
		num : '123.45亿'
	},{
				  name: '流动资产',
				  num : '123.45亿'
			  },
			  {
				  name: '流动资产',
				  num : '123.45亿'
			  },
			  {
				  name: '流动资产',
				  num : '123.45亿'
			  },
			  {
				  name: '流动资产',
				  num : '123.45亿'
			  }]
}
//机构情况
const agencyConfig                    = {
	'total': [{
		name   : '机构情况总数',
		num    : '234,567,435',
		add    : '234,23',
		percent: '23%'
	}],
	'list' : [{
		name: '年末机构数',
		num : '12,234,456'
	}, {
		name: '省级院个数',
		num : '12,234,456'
	}, {
		name: '地市级个数',
		num : '12,234,456'
	}, {
		name: '县区级个数',
		num : '12,234,456'
	}, {
		name: '派出院个数',
		num : '12,234,456'
	}, {
		name: '铁检院个数',
		num : '12,234,456'
	}, {
		name: '林区院个数',
		num : '12,234,456'
	}, {
		name: '油田院个数',
		num : '12,234,456'
	}, {
		name: '矿区院个数',
		num : '12,234,456'
	}, {
		name: '事业单位个数',
		num : '12,234,456'
	}]
}
//经费情况
const jingfeiqingkuang                = {
	jcywfhj      : [100, 100, 100, 100],
	jcywf_qzczbk : [420, 420, 420, 420],
	bajf         : [180, 180, 180, 180],
	bajf_qzczbk  : [160, 160, 160, 160],
	ywzbjf       : [200, 200, 200, 200],
	ywzbjf_qzczbk: [150, 150, 150, 150]
	
}
//检察业务费趋势
const trendsProcuratorialBusinessList = [{
	ncjzjy: 200,
	nmjzjy: 100,
	sr    : 190,
	year  : 2015,
	zc    : 280
}, {
	ncjzjy: 100,
	nmjzjy: 200,
	sr    : 190,
	year  : 2016,
	zc    : 380
}, {
	ncjzjy: 300,
	nmjzjy: 100,
	sr    : 290,
	year  : 2017,
	zc    : 480
}]
//资产情况
const assetsSituation                 = {
	cqtzzc: 123454,
	gdzc  : 12345,
	ldzc  : 12345,
	qtzc  : 12345,
	wxzc  : 12345,
	zjgczc: 12345,
	zzc   : 12345
}
//机构情况
const theProcuratorialAgency          = {
	count: 12345,
	
	dsjgs: 1234,
	
	kqygs: 1234,
	
	lqygs: 1234,
	
	nmjgs: 1234,
	
	pcygs: 1234,
	
	sjygs: 1234,
	
	sydwgs: 1234,
	
	tbss: 1234,
	
	tbssbfb: '23%',
	
	tjygs: 1234,
	
	xqjgs: 1234,
	
	ytygs: 1234
}
//监察机构情况
const prosecutionPersonnel            = {
	qtry : 12234,
	rybzs: 12234,
	zzry : 12234
}
//单位在职人数
const numberOfEmployees               = {
	gbxzzw: 2234,
	gqry  : 2234,
	zyjsry: 2234
}
//计财机构及人员情况
const financialInstitutions           = {
	jcbmszqk: 100,
	yszjcbm : 50,
	wszjcbm : 50,
	jcrysys : 100,
	kjryqk  : 100,
	kjhsxs  : 1234,
	kjdlhs  : 1234,
	qtxs    : 1234,
	kjwpz   : 1234,
	qzkjjzhs: 1234
};

export {
	incomeChartConfig,
	mapTooltipConfig,
	mapTableConfig,
	propertyConfig,
	agencyConfig,
	jingfeiqingkuang,
	trendsProcuratorialBusinessList,
	assetsSituation,
	theProcuratorialAgency,
	prosecutionPersonnel,
	numberOfEmployees,
	financialInstitutions
}