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

// 案件分类分析
const administrativeConfig = [{
	id    : 'jyjd',
	rateId: '50',
	title : '检验鉴定',
	col1  : '#4FDC99',
	col2  : '#22A95F'
}, {
	id    : 'kyjc',
	rateId: '50',
	title : '勘验检察',			
	col1  : '#005EFF',
	col2  : '#4FB8FF'
}, {
	id    : 'jsxz',
	rateId: '50',
	title : '技术协作',
	col1  : '#FFA11E',
	col2  : '#F3C85D'
}
, {
	id    : 'tblylx',
	rateId: '50',
	title : '同步录音录像',
	col1  : '#5DF3DC',
	col2  : '#1EC4FF'
}
, {
	id    : 'jsxzjsc',
	rateId: '50',
	title : '技术性证据审查',
	col1  : '#F35DC4',
	col2  : '#FA3882'
}];
// 地图tooltip内容
export const mapTooltipConfig = [{
	id    : 'sls',
	name  : '受理数',
	regExp: '{sls}&nbsp;&nbsp;&nbsp; {sls_zb}%',
}, {
	id    : 'wcs',
	name  : '完成数',
	regExp: '{wcs}&nbsp;&nbsp;&nbsp; {wcs_zb}%',
}, {
	id    : 'zbs',
	name  : '未完成数',
	regExp: '{wwcs}&nbsp;&nbsp;&nbsp; {wwcs_zb}%',
}];
export const topDataConfig    = [{
	id  : 'totalSls',
	name: '受理总数',
}, {
	id  : 'totalBjs',
	name: '完成总数',
}, {
	id  : 'totalZbs',
	name: '未完成总数',
}];

export const leftSideList = [{
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'wcs',
	name: '完成数',
}, {
	id  : 'wwcs',
	name: '未完成数',
}];


export const mapTableConfig = [{
	id  : 'name',
	name: '名称',
}, {
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'wcs',
	name: '完成数',
}, {
	id  : 'wwcs',
	name: '未完成数',
}];
export{personnelChartConfig,caseNumberAnalysiscongif,administrativeConfig}