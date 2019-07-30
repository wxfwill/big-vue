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
                :lev="getMapCode.lev"
                :nowSelectDate="getSelectDateSection"
        ></bj-map>
        <span v-show="false">{{ getMapCode }}</span>
    </div>
</template>

<script>
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '../service/index';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import { mapTooltipConfig }             from '../constant/index';
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
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode']),
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.loadHeadTotalData(params);
			this.loadMapData(params);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadHeadTotalData(params);
				this.loadMapData(params);
			}
		},
		methods   : {
			async loadMapData(params) {

			},
			async loadHeadTotalData(params) {

			},
			...mapActions('homePage', ['setMapData']),
		},
		components: {
			BjMap,
		},
	}
</script>

<style lang="scss">
    .home-page-center {
        width: 1230px;
        margin-top: -20px;
        &.center-box {
            position: relative;
            width: 1211px;
            height: 850px;
        }
    }
</style>