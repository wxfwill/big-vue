<template>
    <div class="home-page-center">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="loadMapData"
                :lev="lev"
                :topDataConfig="topDataConfig"
                :topData="personnelCategory"
                :leftDataConfig="leftSideList"
        ></bj-map>
    </div>
</template>

<script>
	import * as services                                     from '../service/index';
	import { verifyTriggerState, fillZero }                  from '@/utlis/helper';
	import BjMap                                             from '@/components/common/map/team-manage-map';
	import { mapTooltipConfig, topDataConfig, leftSideList } from '../constant/index';

	export default {
		data() {
			return {
				mapList: [],
				mapTooltipConfig,
				topDataConfig,
                leftSideList,
			}
		},
		mounted() {

		},
		methods   : {
			async loadMapData(params) {
				const res = await services.getTeamManageMap(params);
				if(res.code === 200) {
					this.mapList = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},
		},
		components: {
			BjMap,
		},
		props     : [
			'personnelCategory',
			'lev'
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