<template>
    <div class="home-page-center center-box">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="setMapData"
                :totalSls="totalSls"
                :totalBjs="totalBjs"
                :totalZbs="totalZbs"
                :sls="sls"
                :bjs="bjs"
                :zbs="zbs"
                :lev="mapCode.lev"
                :nowSelectDate="dateSection"
        ></bj-map>
        <span v-show="false">{{ mapCode }}</span>
    </div>
</template>

<script>
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '../service';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import { mapTooltipConfig }             from '../constant';
	import BjMap                            from '@/components/common/map/index';

	export default {
		data() {
			return {
				totalSls   : [0, 0, 0, 0],
				totalBjs   : [0, 0, 0, 0],
				totalZbs   : [0, 0, 0, 0],
				sls        : 0,
				bjs        : 0,
				zbs        : 0,
				mapList    : [],
				mapTooltipConfig,
				dialogTitle: '全国数据统计表',
				showMapData: false,
			}
		},
		computed  : {
			...mapGetters('penal', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState = params;
			this.loadHeadTotalData(params);
			this.loadMapData(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadHeadTotalData(params);
				this.loadMapData(params);
			}
		},
		methods   : {
			async loadMapData(params) {
				const res = await services.getCriminalData(params);
				if(res.code === 200) {
					const { mapSlBjZb: { bjs, sls, zbs }, theMapList } = res.data;
					this.sls                                           = sls;
					this.bjs                                           = bjs;
					this.zbs                                           = zbs;
					this.mapList                                       = theMapList;
				} else {
					this.sls     = 0;
					this.bjs     = 0;
					this.zbs     = 0;
					this.mapList = [];
					this.$message.error(res.msg);
				}
			},
			async loadHeadTotalData(params) {
				const res = await services.getTopSlBjZb(params);
				if(res.code === 200) {
					this.totalSls = `${fillZero(res.data.slzs, 4)}`.split('');
					this.totalBjs = `${fillZero(res.data.bjzs, 4)}`.split('');
					this.totalZbs = `${fillZero(res.data.zbzs, 4)}`.split('');
				} else {
					this.$message.error(res.msg);
				}
			},
			...mapActions('penal', ['setMapData']),
		},
		components: {
			BjMap,
		},
	}
</script>

<style lang="scss">
    .home-page-center {
        min-width: 1230px;
        margin-top: -20px;
        &.center-box {
            position: relative;
            width: 1211px;
            height: 850px;
        }
    }
</style>