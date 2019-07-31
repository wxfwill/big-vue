// 收入
const incomeChartConfig = [{
	id: 'czbk',
	name: '财政拨款',
}, {
	id: 'sjbz',
	name: '上级补助',
}, {
	id: 'sysr',
	name: '事业收入',
},{
	id: 'jysr',
	name: '经营收入',
},{
	id: 'fsdwsj',
	name: '附属单位上缴',
},{
	id: 'qtsr',
	name: '其他收入',
}];
//财政拨款收入分布
const caizhengChartConfig=[{
	id: '北京',
	name: "2600"
  },
  {
	id: '天津',
	name: "2300"
  },
  {
	id: '河北',
	name: "7600"
  },
  {
	id: '山西',
	name: "3600"
  },
  {
	id: '内蒙古',
	name: "6600"
  },
  {
	id: '山东',
	name: "7400"
  },
  {
	id: '河南',
	name: "2600"
  },{
	id: '北京',
	name: "2600"
  },
  {
	id: '天津',
	name: "2300"
  },
  {
	id: '河北',
	name: "7600"
  },
  {
	id: '山西',
	name: "3600"
  },
  {
	id: '内蒙古',
	name: "6600"
  },
  {
	id: '山东',
	name: "7400"
  },
  {
	id: '河南',
	name: "2600"
  },{
	id: '山西',
	name: "3600"
  },
  {
	id: '内蒙古',
	name: "6600"
  },
  {
	id: '山东',
	name: "7400"
  }]

//全国省份排名
const sortChartConfig=[{
	id: '北京',
	name: "2600"
  },
  {
	city_name: '天津',
	sl: "2300"
  },
  {
	city_name: '河北',
	sl: "7600"
  },
  {
	city_name: '山西',
	sl: "3600"
  },
  {
	city_name: '内蒙古',
	sl: "6600"
  },
  {
	city_name: '山东',
	sl: "7400"
  },
  {
	city_name: '河南',
	sl: "2600"
  },{
	city_name: '北京',
	sl: "2600"
  },
  {
	city_name: '天津',
	sl: "2300"
  },
  {
	city_name: '河北',
	sl: "7600"
  },
  {
	city_name: '山西',
	sl: "3600"
  },
  {
	city_name: '内蒙古',
	sl: "6600"
  },
  {
	city_name: '山东',
	sl: "7400"
  },
  {
	city_name: '河南',
	sl: "2600"
  },{
	city_name: '山西',
	sl: "3600"
  },
  {
	city_name: '内蒙古',
	sl: "6600"
  },
  {
	city_name: '山东',
	sl: "7400"
  }]

  // 地图tooltip内容
const mapTooltipConfig = [{
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
	name: '员额检察官',
}, {
	id  : 'syjf',
	name: '使用经费',
}];
//资产情况
const propertyConfig={
	'total':[{
		name:'总资产',
		num:'12,234,456,23'
	}],
	'list':[{
		name:'流动资产',
		num:'123.45亿'
	},
	{
		name:'流动资产',
		num:'123.45亿'
	},
	{
		name:'流动资产',
		num:'123.45亿'
	},
	{
		name:'流动资产',
		num:'123.45亿'
	},
	{
		name:'流动资产',
		num:'123.45亿'
	},
	{
		name:'流动资产',
		num:'123.45亿'
	}]
}
//机构情况
const agencyConfig={
	'total':[{
		name:'机构情况总数',
		num:'234,567,435',
		add:'234,23',
		percent:'23%'
	}],
	'list':[{
		name:'年末机构数',
		num:'12,234,456'
	},
	{
		name:'省级院个数',
		num:'12,234,456'
	},
	{
		name:'地市级个数',
		num:'12,234,456'
	},
	{
		name:'县区级个数',
		num:'12,234,456'
	},
	{
		name:'派出院个数',
		num:'12,234,456'
	},
	{
		name:'铁检院个数',
		num:'12,234,456'
	},
	{
		name:'林区院个数',
		num:'12,234,456'
	},
	{
		name:'油田院个数',
		num:'12,234,456'
	},
	{
		name:'矿区院个数',
		num:'12,234,456'
	},
	{
		name:'事业单位个数',
		num:'12,234,456'
	}]
}
//经费情况
const jingfeiqingkuang={
	jcywfhj:[100, 100, 100, 100],
	jcywf_qzczbk:[420, 420, 420, 420],
	bajf:[180, 180, 180, 180],
	bajf_qzczbk:[160, 160, 160, 160],
	ywzbjf:[200, 200, 200, 200],
	ywzbjf_qzczbk:[150, 150, 150, 150]

}
//检察业务费趋势
const trendsProcuratorialBusinessList=[{
	ncjzjy:200,
	nmjzjy:100,
	sr:190,
	year:2015,
	zc:280
},
{
	ncjzjy:100,
	nmjzjy:200,
	sr:190,
	year:2016,
	zc:380
},
{
	ncjzjy:300,
	nmjzjy:100,
	sr:290,
	year:2017,
	zc:480
}]
//资产情况
const assetsSituation={
	cqtzzc:123454,
	gdzc:12345,
	ldzc:12345,
	qtzc:12345,
	wxzc:12345,
	zjgczc:12345,
	zzc:12345
}
export {incomeChartConfig,caizhengChartConfig,sortChartConfig,mapTooltipConfig,propertyConfig,agencyConfig,jingfeiqingkuang,trendsProcuratorialBusinessList,assetsSituation}