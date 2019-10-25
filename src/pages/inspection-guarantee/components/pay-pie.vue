<template>
    <div class="pay-item-content">
        <div class="pie-chart" ref="pieChart"></div>
        <div class="pay-item-bottom">{{ title }}</div>
    </div>
</template>

<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			this.pieChart = ECharts.init(this.$refs.pieChart);
		},
		methods: {
			loadPieChart() {
				this.pieChart.setOption({
					color  : ['#4F79E2', '#01AFFF', '#EB5910', '#FDBF18'],
					tooltip: {
						formatter: ({seriesName, name, marker, value, percent}) => {
							return `${seriesName} <br/>${marker} ${name}: ${value} (${percent}%)`;
                        }
					},
					series : [{
						name             : this.title,
						type             : 'pie',
						radius           : '60%',
						center           : ['50%', '50%'],
						avoidLabelOverlap: false,
						label            : {},
						labelLine        : {
							show: false,
							length : 5,
                            length2: 0,
						},
						hoverOffset      : 0,
						data             : this.chartData
					}]
				});
			}
		},
		props  : {
			chartData: {},
			title    : {},
			total    : {}
		},
		watch  : {
			chartData() {
				this.loadPieChart();
			}
		}
	}
</script>

<style lang="scss" scoped>
    .pay-item-content {
        width: 100%;
        .pie-chart {
            height: 220px;
        }
        .pay-item-bottom{
            text-align: center;
            color: #fff;
        }
    }
</style>