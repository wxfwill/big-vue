<template>
    <div class="jwbzbox">
        <div class="mapbox">
            <bj-map
                    :tooltipConfig="mapTooltipConfig"
                    :mapData="psGuaranteeMapList"
                    :getNewRegionInfo="requestPSGuaranteeData"
                    :lev="lev"
                    :code="code"
                    defaultCode="203"
                    :extraCityColumn="mapTableConfig"
                    mapDefaultWidth="800"
                    :mapConfig='{
                        numIsshow:false,
                        leftIsshow:false,
                        tooltipIsshow:false
				    }'
            ></bj-map>
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
	import ECharts                              from 'echarts';
	import * as services                        from '../service';
	import { verifyTriggerState, fillZero }     from '@/utlis/helper';
	import BjMap                                from '@/components/common/map/team-manage-map';
	import { mapTableConfig, mapTooltipConfig } from '../constant/index';

	export default {
		data() {
			return {
				mapTooltipConfig,
				mapTableConfig,
				numIsshow    : false,
				dialogVisible: false,
				dialogContext: {
					name: '',
					key : '',
					data: []
				},
			}
		},
		mounted() {
			this.sortChart   = ECharts.init(this.$refs.sortChart);
		},
		methods   : {
			convertChartConfigsort(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
				configList.map((config) => {
					xAxisData.push(config.city_name);
					seriesData.push(config.sl)
				});
				return {
					xAxisData,
					seriesData
				};
			},
			loadSortChart(chartData) {
				const { xAxisData, seriesData } = this.convertChartConfigsort(chartData);
				this.sortChart.setOption({
					color  : ['#1AE7F8'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid   : {
						left        : '3',
						top         : '3%',
						containLabel: true
					},
					xAxis  : [
						{
							type    : 'category',
							data    : xAxisData,
							axisTick: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					yAxis  : [
						{
							type    : 'value',
							axisLine: {
								show     : false,
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					series : [
						{
							name     : '直接访问',
							type     : 'bar',
							barWidth : '14',
							data     : seriesData,
							itemStyle: {
								normal: {
									color          : new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color : '#1AE7F8'
									}, {
										offset: 1,
										color : '#18F4B0'
									}]),
									barBorderRadius: [10, 10, 0, 0],
								}
							}
						}
					]
				})
			},
			setDialogVisible() {
				let data           = [],
					key            = '',
                    name               = '全国省份排名';
				key                = '全国省份排名';
				data               = this.nationalProvinceRankList;
				this.dialogContext = {
					name,
					key,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart() {
				const { data: chartData, key }  = this.dialogContext,
					  { xAxisData, seriesData } = this.convertChartConfigsort(chartData, key);
				this.dialogBarChart             = ECharts.init(this.$refs.dialogChart);
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
									show           : true,
									color          : new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color : '#1AE7F8'
									}, {
										offset: 1,
										color : '#18F4B0'
									}]),
									barBorderRadius: [20, 20, 0, 0],
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
			closeBarDialog() {
				this.dialogBarChart && this.dialogBarChart.clear();
			},
		},
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
        width: 1144px;
        margin-top: -20px;
        .mapbox{
            width: 100%;
            height: 750px;
        }
        .sortbox {
            width: 100%;
            position: relative;
            .sort-content {
                width: 1144px;
                height: 227px;
            }
            .more-btn {
                width: 100px;
                color: #FBBA18;
                position: absolute;
                right: -560px;
                top: 70px;
                margin-top: 17px;
                text-align: right;
                font-size: 16px;
                font-family: Helvetica;
                color: rgba(251, 186, 24, 1);
                line-height: 17px;
                cursor: pointer;
                z-index: 999;
            }
        }
        .per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>