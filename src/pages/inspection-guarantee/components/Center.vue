<template>
    <div class="home-page-center center-box">
		<div class="mapbox">
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
				:mapConfig='{
					numIsshow:false,
					leftIsshow:false,
					tooltipIsshow:false
				}'
        	></bj-map>
        	<span v-show="false">{{ getMapCode }}</span>
		</div>
		<div class="sortbox">
			 <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>全国省份排名</i>
            </div>
			<p class='more-btn' @click="setDialogVisible">更多>></p>
            <div class="sort-content" ref="sortChart"></div>
		</div>
		 <el-dialog
                :title="dialogContext.name"
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
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
				numIsshow:false,
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
				dialogVisible:false,
				dialogContext: {
					name: '',
					key : '',
					data: []
				},
				sortChartConfig:sortChartConfig
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
			setDialogVisible() {
				let data = [],
					key  = '';
					name='全国省份排名';
					key  = '全国省份排名';
					data = this.sortChartConfig;
				this.dialogContext = {
					name,
					key,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart(){
				const { data: chartData, key } = this.dialogContext,
					  { xAxisData, seriesData } = this.convertChartConfigsort(chartData, key);
				this.dialogBarChart            = ECharts.init(this.$refs.dialogChart);
				this.dialogBarChart.setOption({
					tooltip   : {
						show: false
					},
					legend    : {
						show: false
					},
					grid      : {
						top   : '4%',
						left  : '3%',
						right : '3%',
						bottom: '20%',
					},
					calculable: true,
					xAxis     : {
						type     : 'category',
						axisTick : { show: false },
						data     : xAxisData,
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						axisLabel: {
							color     : '#00ffff',
							fontSize  : 21,
							lineHeight: 25,
							interval  : 0
						}
					},
					yAxis     : {
						type     : 'value',
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(216,216,216,0.4)'
							}
						},
						axisLabel: {
							color: '#0ff',
						},
					},
					series    : [
						{
							name       : '地区',
							type       : 'bar',
							data       : seriesData,
							barMaxWidth: 40,
							itemStyle  : {
								normal: {
									 show:true,
									color:new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color: '#1AE7F8'
										}, {
										offset: 1,
										color: '#18F4B0'
										}]),
									barBorderRadius:[20, 20, 0, 0],
								}
							},
							label      : {
								normal: {
									"show"    : true,
									"position": "top",
									color     : '#00FFFF',
								}
							},
						}
					]
				});
			},
			closeBarDialog(){
				this.dialogBarChart && this.dialogBarChart.clear();
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
			position:relative;
			.sort-content{
				width: 1144px;
				height:227px;
			}
			.more-btn{
				width:100px;
				color:#FBBA18;
				position:absolute;
				right:-560px;
				bottom:25px;
				 margin-top: 17px;
                text-align: right;
                font-size: 16px;
                font-family: Helvetica;
                color: rgba(251, 186, 24, 1);
                line-height: 17px;
                cursor: pointer;
				z-index:999;
			}
		}
		.per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>