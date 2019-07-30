<template>
    <div class="trend-chart">
        <div class="trend-icon left-icon"
             @click="retreatHandle"
             :style="{backgroundImage:`url(${topImg})`}">
        </div>
        <div class="trend-icon right-icon"
             @click="advanceHandle"
             :style="{backgroundImage:`url(${bottomImg})`}">
        </div>
        <div ref="lineChart" class="line-chart"></div>
    </div>
</template>
<script>
	import ECharts         from 'echarts';
	import { getRealType } from '@/utlis/helper';

	export default {
		data() {
			return {
				topImg      : require('@/public/img/judicature/top@2x.png'),
				bottomImg   : require('@/public/img/judicature/bottom@2x.png'),
				nowPageIndex: 1,
				totalPage   : 0,
			}
		},
		computed: {
			chartData() {
				const index = (this.nowPageIndex - 1) * 6;
				return this.dataIPS.slice(index, index + 6);
			},
		},
		mounted() {
			this.resetPagingState();
			this.lineChart = ECharts.init(this.$refs.lineChart);
			this.loadTrendChart();
		},
		methods : {
			retreatHandle() {
				if(this.nowPageIndex > 1) {
					this.nowPageIndex--;
					this.loadTrendChart();
				}
			},
			advanceHandle() {
				if(this.nowPageIndex < this.totalPage) {
					this.nowPageIndex++;
					this.loadTrendChart();
				}
			},
			loadTrendChart() {
				const { axisKey, seriesKey } = this.chartConfig,
					  axisData               = [],
					  seriesData             = this.chartData.map((i) => {
						  axisData.push(i[axisKey]);
						  return i[seriesKey];
					  });
				this.lineChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'line',
						}
					},
					color  : ["#0080ff", "#4cd5ce"],
					grid   : {
						left  : 80,
						top   : 30,
						right : 70,
						bottom: 50,
					},
					xAxis  : {
						type       : 'category',
						boundaryGap: true,
						data       : axisData,
						axisLabel  : {
							show     : true,
							textStyle: {
								show    : false,
								color   : 'rgba(255,255,255,1)',
								fontSize: 12,
							},
						},
						axisTick   : {
							show: false //隐藏X轴刻度
						},
						axisLine   : {
							show     : true,
							lineStyle: {
								color: '#2EA7E0',
								width: 1, //这里是为了突出显示加上的
							}
						}
					},
					yAxis  : {
						type     : 'value',
						axisLine : {
							show     : true,
							onZero   : false,
							lineStyle: {
								color: '#2EA7E0',
								width: 1, //这里是为了突出显示加上的
							}
						},
						axisTick : {
							show: false //隐藏X轴刻度
						},
						axisLabel: {
							textStyle: {
								color: 'rgba(255,255,255,1)' //字体颜色
							}
						},
						splitLine: { //保留网格线
							show     : this.splitLine,
							lineStyle: { //y轴网格线设置
								color: 'rgb(233,233,233,0.4)',
								width: 1,
								type : 'dashed'
							}
						},
					},
					series : [{
						name     : this.name,
						type     : this.chartType,
						smooth   : this.smooth,
						barWidth : 16,
						itemStyle: {
							normal  : { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color    : new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : 'rgba(0,255,255, 1)' // 0% 处的颜色
								}, {
									offset: 1,
									color : 'rgba(0,255,255, 0)' // 100% 处的颜色
								}]), //背景渐变色
								lineStyle: { // 系列级个性化折线样式
									width: 2,
									type : 'solid',
									color: "#2db9f6"
								}
							}
						},
						areaStyle: {
							normal: {}
						},
						data     : seriesData,
					}]
				});
			},
			resetPagingState() {
				this.nowPageIndex = 1;
				this.totalPage    = Math.ceil(this.dataIPS.length / 6);
			},
		},
		watch   : {
			dataIPS(newVal) {
				if(getRealType(newVal) === 'array') {
					this.resetPagingState();
					this.loadTrendChart();
				}
			}
		},
		props   : {
			name       : {
				type: String
			},
			dataIPS    : {
				type   : Array,
				default: [],
			},
			splitLine  : {
				type   : Boolean,
				default: false
			},
			smooth     : {
				type   : Boolean,
				default: true
			},
			chartConfig: {
				type   : Object,
				default: function() {
					return {
						axisKey  : 'id',
						seriesKey: 'id',
					};
				}
			},
			chartType  : {
				type   : String,
				default: 'line'
			}
		},
	}
</script>
<style lang="scss" scoped>
    .trend-chart {
        position: relative;
        width: 100%;
        height: 100%;
        .trend-icon {
            position: absolute;
            bottom: 25px;
            width: 14px;
            height: 14px;
            background-size: 100% 100%;
            z-index: 2;
            cursor: pointer;
            &.left-icon {
                left: 60px;
            }
            &.right-icon {
                right: 50px;
            }
        }
        .line-chart {
            width: 100%;
            height: 100%;
        }
    }
</style>
