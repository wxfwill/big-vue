<template>
    <div class="criminal-page-center">
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
    import { mapComponentState }            from '@/components/mixin/trigger';

	export default {
		data() {
			return {
				mapTooltipConfig,
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
					const { mapSlBjZb, theMapList } = res.data;
					this.loadMapContent({ ...mapSlBjZb, theMapList });
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