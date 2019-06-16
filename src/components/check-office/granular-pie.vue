<template>
    <div ref="chartCvs" :style="{width: '570px', height: '200px'}">
        <canvas width="570" height="200"></canvas>
    </div>
</template>

<script>
	import EChart from 'echarts';

	export default {
		mounted() {
			this.loadPieChart();
		},
		methods: {
			loadPieChart() {
				const myChart = EChart.init(this.$refs.chartCvs),
					  yMax    = Math.max(...this.chartData) + 100;
				myChart.setOption({
						color  : ['#26CAFC', 'rgba(38,202,252,0.3)', '#F7931E'],
						tooltip: {
							show       : true,
							trigger    : 'axis',
							axisPointer: {
								type: 'shadow'
							},
							formatter  : '{b}:{c}'
						},
						grid   : {
							top         : '10%',
							left        : '1%',
							right       : '1%',
							bottom      : '3%',
							containLabel: true,
						},
						xAxis  : [{
							type       : 'category',
							boundaryGap: true,
							axisLine   : {
								show     : false,
								lineStyle: {
									color: 'rgba(107,227,249,0.6)'
								},
							},
							axisLabel  : {
								textStyle: {
									color     : 'rgba(255,255,255,1)',
									fontSize  : 14,
									fontFamily: 'MicrosoftYaHei',
									margin    : 15,
								},
							},
							axisTick   : {
								show: false,
							},
							data       : ['新建', '代办', '办结', '其他'],
						}],
						yAxis  : [{
							name     : '',
							type     : 'value',
							max      : yMax,
							splitLine: {
								show     : true,
								lineStyle: {
									color: 'rgba(107,227,249,0.6)',
									width: 1,
									type : 'solid'
								}
							},
							axisLine : {
								lineStyle: {
									color: '#00FFFF'
								},
								show     : false,
							},
							axisLabel: {
								margin   : 20,//离右边距离
								textStyle: {
									color   : '#FFFFFF',
									fontSize: 14

								},
							},
							axisTick : {
								show: false,
							},
						}],
						series : [{
							name        : '',
							type        : 'pictorialBar',
							symbol      : '',
							itemStyle   : {
								normal: {
									color: 'rgba(38,202,252,0.3)'
								}
							},
							symbolRepeat: true,
							symbolSize  : [32, 6],
							symbolMargin: 1,
							z           : -10,
							data        : Array.from({ length: this.chartData.length }, () => yMax),
						}, {
							name        : '发文分析',
							type        : 'pictorialBar',
							symbol      : '',
							symbolRepeat: true,
							symbolSize  : [32, 6],
							symbolMargin: 1,
							data        : this.chartData
						}, {
							type          : 'pictorialBar',
							name          : 'pictorial element',
							symbol        : '',
							z             : 10,
							symbolPosition: 'end',
							symbolOffset  : [0, '-120%'],
							symbolSize    : [32, 6],
							data          : this.chartData,
							itemStyle     : {
								color: '#F7931E'
							}
						}]
					}
				)
			}
		},
		props  : ['chartData'],
		watch  :
			{
				chartData() {
					this.loadPieChart();
				}
			}
	}
</script>

<style scoped>

</style>