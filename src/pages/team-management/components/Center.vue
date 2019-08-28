<template>
    <div class="home-page-center">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="loadMapData"
                :lev="lev"
                :code="code"
                defaultCode="000"
                :topDataConfig="topDataConfig"
                :topData="personnelCategory"
                :leftDataConfig="leftSideList"
                :leftData={}
                :extraCityColumn="mapTableConfig"
                highProcuratorCode="0001001"
                :mapLineLegend="mapLineLegend"
        ></bj-map>
    </div>
</template>

<script>
	import * as services                    from '../service/index';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import BjMap                            from '@/components/common/map/team-manage-map';
	import {
		mapTooltipConfig,
		topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend,
	}                                       from '../constant/index';

	export default {
		data() {
			return {
				mapList: [],
				mapTooltipConfig,
				topDataConfig,
				leftSideList,
				mapTableConfig,
				mapLineLegend,
			}
		},
		mounted() {

		},
		methods   : {
			async loadMapData(params) {
				params.pindex = params.code;
				this.changeMapState({
					pindex: params.pindex,
					lev   : params.lev
				});
				delete params.strList;
				delete params.code;
				const res = await services.getTeamManageMap(params);
				if(res.code === 200) {
					this.mapList = res.data;
				} else {
					this.mapList = [];
					this.$message.error(res.msg);
				}
			},
		},
		components: {
			BjMap,
		},
		props     : [
			'personnelCategory',
			'lev',
			'code',
			'changeMapState',
		],
	}
</script>

<style lang="scss">
    .home-page-center {
        width: 1230px;
        position: relative;
        height: 950px;
    }
</style>