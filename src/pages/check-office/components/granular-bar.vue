<template>
    <div ref="chartCvs" :style="{width: '570px', height: '200px', margin: '0 auto'}"></div>
</template>

<script>
	import EChart from 'echarts';

	export default {
		mounted() {
			this.myChart = EChart.init(this.$refs.chartCvs);
		},
		methods: {
			loadPieChart() {
				const chartDataMaxValue         = Math.max(...(Object.values(this.chartData))),
					  yMax                      = chartDataMaxValue + Number(`1E${`${chartDataMaxValue}`.length - 1}`),
					  config                    = [{
						  id  : 'xj',
						  name: '新建',
					  }, {
						  id  : 'db',
						  name: '待办'
					  }, {
						  id  : 'bj',
						  name: '办结'
					  }, {
						  id  : 'qt',
						  name: '其他'
					  }],
					  { xAxisData, seriesData } = this.getChartAttr(config, this.chartData);
				this.myChart.setOption({
						color  : ['#26CAFC', 'rgba(38,202,252,0.3)', '#F7931E'],
						tooltip: {
							show       : true,
							trigger    : 'axis',
							axisPointer: {
								type: 'shadow'
							},
							formatter  : '{b}:{c1}'
						},
						grid   : {
							top         : '10%',
							left        : '1%',
							right       : '1%',
							bottom      : '3%',
							containLabel: true,
						},
						xAxis  : {
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
							data       : xAxisData,
						},
						yAxis  : {
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
						},
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
							data        : Array.from({ length: seriesData.length }, () => yMax),
						}, {
							name        : this.name,
							type        : 'pictorialBar',
							symbol      : '',
							symbolRepeat: true,
							symbolSize  : [32, 6],
							symbolMargin: 1,
							data        : seriesData,
						}, {
							type          : 'pictorialBar',
							name          : 'pictorial element',
							symbol        : '',
							z             : 10,
							symbolPosition: 'end',
							symbolOffset  : [0, '-120%'],
							symbolSize    : [32, 6],
							data          : seriesData,
							itemStyle     : {
								color: '#F7931E'
							}
						}]
					}
				)
			},
			getChartAttr(chartConfig, charData) {
				const xAxisData  = [],
					  seriesData = chartConfig.map(i => {
						  xAxisData.push(i.name);
						  return {
							  name : i.name,
							  value: charData[i.id]
						  }
					  });
				return {
					xAxisData,
					seriesData
				};
			}
		},
		props  : ['chartData', 'name'],
		watch  : {
			chartData() {
				this.loadPieChart();
			}
		}
	}
</script>

<style scoped>

</style>