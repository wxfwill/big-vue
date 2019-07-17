<template>
    <div class="home-page-center center-box">

    </div>
</template>

<script>
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '../service';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import BjMap                            from '@/components/common/map/index';

	export default {
		data() {
			return {

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
					const data   = res.data;
					this.sls     = data.sls;
					this.bjs     = data.bjs;
					this.zbs     = data.zbs;
					this.mapList = data.homePageMapDataList;
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