<template>
    <div class="home-page-center center-box">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="setMapData"
                :lev="getMapCode.lev"
                :code="getMapCode.code"
                defaultCode="100000"
                :topDataConfig="topDataConfig"
                :topData="{ totalSls, totalBjs, totalZbs }"
                :leftDataConfig="leftSideList"
                :leftData='{ sls, bjs, zbs }'
                :extraCityColumn="mapTableConfig"
                highProcuratorCode="100000"
        ></bj-map>
    </div>
</template>

<script>
	import { mapGetters, mapActions }          from 'vuex';
	import * as services                       from '../service';
	import { verifyTriggerState, fillZero }    from '@/utlis/helper';
	import BjMap                               from '@/components/common/map/team-manage-map';
	import { mapComponentState }               from '@/components/mixin/trigger';
	import {
		mapTooltipConfig, topDataConfig,
		leftSideList, mapTableConfig
    } from '../constant';

	export default {
		data() {
			return {}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode']),
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
			this.mapTooltipConfig = mapTooltipConfig;
			this.topDataConfig = topDataConfig;
			this.leftSideList = leftSideList;
			this.mapTableConfig = mapTableConfig;
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
					const data      = res.data;
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