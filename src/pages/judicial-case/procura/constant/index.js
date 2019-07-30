//相关办案人员（各省市/人）
const personnelChartConfig=[{
	city_name: '北京',
	rs: "2600"
  },
  {
	city_name: '天津',
	rs: "2300"
  },
  {
	city_name: '河北',
	rs: "7600"
  },
  {
	city_name: '山西',
	rs: "3600"
  },
  {
	city_name: '内蒙古',
	rs: "6600"
  },
  {
	city_name: '山东',
	rs: "7400"
  },
  {
	city_name: '河南',
	rs: "2600"
  },{
	city_name: '北京',
	rs: "2600"
  },
  {
	city_name: '天津',
	rs: "2300"
  },
  {
	city_name: '河北',
	rs: "7600"
  },
  {
	city_name: '山西',
	rs: "3600"
  },
  {
	city_name: '内蒙古',
	rs: "6600"
  },
  {
	city_name: '山东',
	rs: "7400"
  },
  {
	city_name: '河南',
	rs: "2600"
  },{
	city_name: '山西',
	rs: "3600"
  },
  {
	city_name: '内蒙古',
	rs: "6600"
  },
  {
	city_name: '山东',
	rs: "7400"
  }]

//受理案件趋势分析
const caseNumberAnalysiscongif=[{
	sls:'180',
	year:'2008'
},{
	sls:'250',
	year:'2008'
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
	name: '原额检察官',
}, {
	id  : 'syjf',
	name: '使用经费',
}];
export{personnelChartConfig,caseNumberAnalysiscongif,mapTooltipConfig}