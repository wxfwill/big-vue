<template>
    <div class="chart-box">
        <canvas ref="chartCvs" width="75" height="75"></canvas>
        <p>{{ text }}</p>
    </div>
</template>

<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			const myChart = ECharts.init(this.$refs.chartCvs);
			myChart.setOption({
				color : [`#${this.strokeColor}`, `#${this.tintColor}`],
				series: [
					{
						type             : 'pie',
						radius           : ['80%', '95%'],
						label            : {
							normal  : {
								show     : true,
								position : 'center',
								formatter: `${this.percent}%`,
								color    : "#fff"
							},
							emphasis: {
								show     : true,
								textStyle: {
									fontSize  : '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine        : {
							normal: {
								show: false
							}
						},
						data             : [
							{
								value: this.percent,
							},
							{
								value: 100 - this.percent,
							}
						],
					}
				]
			})
		},
		props: ['text', 'percent', 'strokeColor', 'tintColor'],

	}
</script>

<style lang="scss" scoped>
    .chart-box {
        width: 150px;
        height: 120px;

        text-align: center;
        color: #ffffff;
        font-size: 14px;
        margin-bottom: 10px;
        .chartCvs {
            margin-bottom: 10px;
        }
    }
</style>