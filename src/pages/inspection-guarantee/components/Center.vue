<template>
    <div class="jwbzbox">
        <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="psGuaranteeMapList"
                :getNewRegionInfo="requestPSGuaranteeData"
                :lev="lev"
                :code="code"
                defaultCode="203"
                :extraCityColumn="mapTableConfig"
                :mapConfig='{
                        numIsshow:false,
                        leftIsshow:true,
                        tooltipIsshow:false
				    }'
                :mapLineLegend="mapLineLegend"
        ></bj-map>
    </div>
</template>

<script>
	import ECharts                              from 'echarts';
	import * as services                        from '../service';
	import { verifyTriggerState, fillZero }     from '@/utlis/helper';
	import BjMap                                from '@/components/common/map/index';
	import { mapTableConfig, mapTooltipConfig, mapLineLegend } from '../constant/index';

	export default {
		data() {
			return {
				mapTooltipConfig,
				mapTableConfig,
				mapLineLegend,
				numIsshow    : false,
				dialogVisible: false,
				dialogContext: {
					name: '',
					key : '',
					data: []
				},
			}
		},
		methods   : {},
		components: {
			BjMap,
		},
		props     : {
			nationalProvinceRankList: {
				default: {}
			},
			lev                     : {},
			code                    : {},
			psGuaranteeMapList      : {
				type   : Array,
				default: []
			},
			requestPSGuaranteeData  : {
				type: Function
			}
		}
	}
</script>

<style lang="scss" scoped>
    .jwbzbox {
        width: 100%;
        height: 970px;
    }
</style>