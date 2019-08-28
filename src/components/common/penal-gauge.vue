<template>
    <div class="gauge-chart-box">
        <div ref="gaugeChart" class="gauge-chart"></div>
        <p class="chart-num" :style="{ color: `${chartConfig.color}` }">{{ chartConfig.value }}</p>
        <p class="chart-label">{{ chartConfig.name }}</p>
    </div>
</template>

<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			this.myChart = ECharts.init(this.$refs.gaugeChart);
			this.loadGaugeChart();
		},
		methods: {
			loadGaugeChart() {
				const { rate, value, color, name } = this.chartConfig;
				this.myChart.setOption({
					series: [{
						"name"      : "指标",
						"type"      : "gauge",
						"startAngle": 180,
						"endAngle"  : 0,
						"center"    : ["50%", "85%"],
						"radius"    : 50,
						"axisLine"  : {
							"lineStyle": {
								"width": 20, //柱子的宽度
								"color": [[rate/100, color], [1, "rgba(69, 93, 127, .5)"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
							}
						},
						"axisTick"  : {
							"show": false
						},
						"axisLabel" : {
							"show": false
						},
						"splitLine" : {
							"show": false
						},
						"pointer"   : {
							"width" : 5,
							"length": 23,
						},
						"title"     : {
							"show"         : false,
						},
						"detail"    : {
							"show": false
						},
						"data"      : [{
							"value": rate,
							name,
                            data: value
						}]
					}]
				});
			}
		},
		props  : ['chartConfig'],
		watch  : {
			chartConfig() {
				this.loadGaugeChart();
			}
		}
	}
</script>

<style lang="scss" scoped>
    .gauge-chart-box {
        width: 180px;
        height: 120px;
        margin-bottom: 19px;
        text-align: center;
        .gauge-chart {
            width: 100%;
            height: 60px;
        }
        .chart-num{
            display: inline-block;
            padding: 4px 4px 2px;
            background:rgba(20,26,62,1);
            margin: 7px 0 5px;
            font-size: 18px;
            font-weight: 600;
        }
        .chart-label {
            text-align: center;
            font-size: 16px;
        }
    }
</style>