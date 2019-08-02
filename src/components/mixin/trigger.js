import { fillZero } from '@/utlis/helper';
export const triggerMixin = {
	beforeCreate() {
		this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
		this.oldTriggerState = {};
	},
	destroyed() {
		this.initMapState && this.initMapState();
	},
};

export const mapComponentState = {
	data() {
		return {
			totalSls: [0, 0, 0, 0],
			totalBjs: [0, 0, 0, 0],
			totalZbs: [0, 0, 0, 0],
			sls     : 0,
			bjs     : 0,
			zbs     : 0,
			mapList : [],
		}
	},
	methods: {
		convertMapHeadData(data) {
			this.totalSls = `${fillZero(data.slzs||0, 4)}`.split('');
			this.totalBjs = `${fillZero(data.bjzs||0, 4)}`.split('');
			this.totalZbs = `${fillZero(data.zbzs||0, 4)}`.split('');
		},
		loadMapContent({ sls, bjs, zbs, theMapList }) {
			this.sls                                                                   = sls;
			this.bjs                                                                   = bjs;
			this.zbs                                                                   = zbs;
			this.mapList                                                               = theMapList;
		},
	},
};