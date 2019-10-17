export const geoMapName = {
	china: '全国',
};

export const geoCoordMap = {
	'china': {
		'新疆兵团': {
			id         : '65',
			extendMap  : true,
			coordinates: [87.56, 41.68, 70],
			publicName : '新疆生产建设兵团院',
			itemStyle  : {
				color      : 'rgba(67,186,202, 1)',
				opacity    : 1,
			},
			label: {
				color: '#fff'
			}
		},
		'北京市' : {
			id         : '11',
			extendMap  : false,
			coordinates: [116.4551, 40.1539, 100],
			itemStyle  : {
				color      : 'transparent',
				opacity    : 0,
				borderWidth: 0,
				borderColor: 'transparent'
			},
		}
	},
};

export const extraCityColumnConfig = [{
	id  : 'name',
	name: '名称'
}, {
	id  : 'sls',
	name: '受理数'
}, {
	id  : 'bjs',
	name: '办结数'
}, {
	id  : 'zbs',
	name: '在办数'
}];