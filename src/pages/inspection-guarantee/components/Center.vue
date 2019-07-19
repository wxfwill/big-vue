<template>
    <div class="home-page-center center-box">
		<div class="mapbox">
			 <bj-map
                :tooltipConfig="mapTooltipConfig"
                :mapData="mapList"
                :getNewRegionInfo="setMapData"
                :lev="getMapCode.lev"
                :nowSelectDate="getSelectDateSection"
        	></bj-map>
        	<span v-show="false">{{ getMapCode }}</span>
		</div>
		<div class="sortbox">
			 <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>全国省份排名</i>
            </div>
            <div class="sort-content" ref="sortChart"></div>
		</div>
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '../service';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import { mapTooltipConfig }             from '../constant';
	import BjMap                            from '@/components/common/map/index';
	import { sortChartConfig }                 from '../constant/index';


	export default {
		data() {
			return {
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
			this.sortChart   = ECharts.init(this.$refs.sortChart);
			this.loadMapData(params);
			this.loadSortChart();
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadMapData(params);
			}
		},
		methods   : {
			async loadMapData(params) {
				const res = await services.getMapTopData(params);
				if(res.code === 200) {
					const data   = res.data;
					this.mapList = data.homePageMapDataList;
				} else {
					this.mapList = [];
					this.$message.error(res.msg);
				}
			},
			convertChartConfigsort(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
					  configList.map((config) => {
						  xAxisData.push(config.id);
						  seriesData.push(config.name)
					  });
				return { xAxisData, seriesData };
			},
			loadSortChart() {
	  			const { xAxisData, seriesData } = this.convertChartConfigsort(sortChartConfig);
				this.sortChart.setOption({
					color: ['#1AE7F8'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3',
						top:'3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : xAxisData,
							axisTick: {
								show:false
							},
							axisLine:{
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							axisLine:{
								show:false,
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					series : [
						{
							name:'直接访问',
							type:'bar',
							barWidth: '14',
							data:seriesData,
							itemStyle:{
								normal:{
									color:new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color: '#1AE7F8'
										}, {
										offset: 1,
										color: '#18F4B0'
										}]),
									barBorderRadius:[10, 10, 0, 0],
								}
							}
						}
					]
				})
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
        width: 1144px;
        margin-top: -20px;
        &.center-box {
            position: relative;
            width: 1211px;
            height: 850px;
        }
		.bj-map{
			width:973px;
			height:705px;
		}
		.map-chart{
			div{
				width:973px;	
			}
		}
		.sortbox{
			width:532px;
			.sort-content{
				width: 1144px;
				height:227px;
			}
		}
    }
</style>