<template>
    <div class="criminal-page-center">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="setMapData"
                :lev="mapCode.lev"
                :code="mapCode.code"
                defaultCode="100000"
                :topDataConfig="topDataConfig"
                :topData="{ totalSls, totalBjs, totalZbs }"
                :leftDataConfig="leftSideList"
                :leftData='{ sls, bjs, zbs }'
                :extraCityColumn="mapTableConfig"
                highProcuratorCode="100000"
                :nowSelectDate="dateSection"
                :mapLineLegend="mapLineLegend"
        ></bj-map>
    </div>
</template>

<script>
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '../service';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import BjMap                            from '@/components/common/map/index';
	import { mapComponentState }            from '@/components/mixin/trigger';
	import {
		mapTooltipConfig, topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend,
	}                                       from '../constant';

	export default {
		data() {
			return {}
		},
		computed  : {
			...mapGetters('penal', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger          = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState  = {};
			this.mapTooltipConfig = mapTooltipConfig;
			this.topDataConfig    = topDataConfig;
			this.leftSideList     = leftSideList;
			this.mapTableConfig   = mapTableConfig;
			this.mapLineLegend    = mapLineLegend;
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
					const { mapSlBjZb, theMapList } = res.data;
					this.loadMapContent({
						...mapSlBjZb,
						theMapList
					});
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
			...mapActions('penal', ['setMapData']),
		},
		mixins    : [mapComponentState],
		components: {
			BjMap,
		},
	}
</script>

<style lang="scss">
    .criminal-page-center {
        width: 1250px;
        min-width: 1250px;
        position: relative;
        height: 950px;
    }
</style>