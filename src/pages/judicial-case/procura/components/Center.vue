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
				:mapConfig='{
					numIsshow:false,
					leftIsshow:true,
					tooltipIsshow:true,
					numIsshow1:true
				}'
        ></bj-map>
        <span v-show="false">{{ mapCode }}</span>
    </div>
</template>

<script>
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                   from '../service';
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
			...mapGetters('procura', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState = params;
			this.loadMapData(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadMapData(params);
			}
		},
		methods   : {
			loadMapData(params) {
				this.sls                                           = this.checkCharterMapData.sls;
				this.bjs                                           = this.checkCharterMapData.wcs;
				this.zbs                                           = this.checkCharterMapData.wwcs;
				this.mapList                                       = this.checkCharterTheMapList.map(i => {
					return {
						code : i.code,
						name : i.name,
						sls: i.sls,
						sls_zb:i.sls_zb,
						bjs : i.wcs,
						bjs_zb: i.wcs_zb,
						zbs:  i.wwcs,
						zbs_zb:i.wwcs_zb
					}
				});
				this.totalSls = `${fillZero(this.checkCharterTopData.slzs, 4)}`.split('');
				this.totalBjs = `${fillZero(this.checkCharterTopData.wczs, 4)}`.split('');
				this.totalZbs = `${fillZero(this.checkCharterTopData.wwczs, 4)}`.split('');
			},
			...mapActions('procura', ['setMapData']),
		},
		components: {
			BjMap,
		},
		props:{
			checkCharterData:{
				default:{}
			},
			checkCharterTopData:{
				default:{}
			},
			checkCharterMapData:{
				default:{}
			},
			checkCharterTheMapList:{
				default:{}
			}
		}
	}
</script>

<style lang="scss">
    .home-page-center {
        min-width: 1319px;
        &.center-box {
            position: relative;
            width: 1319px;
            height: 950px;
        }
    }
</style>