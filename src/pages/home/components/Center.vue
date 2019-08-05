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
	import * as services                    from '../service';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import { mapTooltipConfig }             from '../constant';
	import BjMap                            from '@/components/common/map/index';
	import { mapComponentState }            from '@/components/mixin/trigger';

	export default {
		data() {
			return {
				mapTooltipConfig,
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
				const res = await services.getMapTopData(params);
				if(res.code === 200) {
					const data = res.data;
					data.theMapList = data.homePageMapDataList;
					this.loadMapContent({ ...data });
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
					this.convertMapHeadData(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			...mapActions('homePage', ['setMapData']),
		},
		components: {
			BjMap,
		},
		mixins    : [mapComponentState]
	}
</script>

<style lang="scss" scoped>
    .home-page-center {
        position: relative;
        width: 1230px;
        height: 970px;
    }
</style>