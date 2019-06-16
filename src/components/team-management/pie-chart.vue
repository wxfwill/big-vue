<template>
    <div class="chart-box">
        <div class="chartCvs" ref="chartCvs" :style="{width:`${width}px`, height:`${height}px`}"></div>
        <p>{{ text }}</p>
    </div>
</template>

<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			const myChart = ECharts.init(this.$refs.chartCvs);
			myChart.setOption({
				color  : [`${this.strokeColor}`, `${this.tintColor}`],
				tooltip: {
					show: false
				},
				grid   : {
					top : '10%',
					left: '10%'
				},
				series : [{
					name          : this.name,
					type          : 'pie',
					radius        : ['80%', '95%'],
					animationType : 'scale',
					hoverAnimation: false,
					label         : {
						show     : true,
						position : 'center',
						formatter: `${this.percent}%`,
						color    : "#fff"
					},
					data          : [
						{
							name : '',
							value: this.percent,
						},
						{
							value   : 100 - this.percent,
							tooltip : {
								formatter      : ' ',
								backgroundColor: 'transparent'
							}
						}
					],
				}]
			})
		},
		props: {
			text       : {
				default: ''
			},
			percent    : {
				default  : 0,
				validator: (value) => {
					return value <= 100
				}
			},
			strokeColor: {
				default: '#18D9E3',
			},
			tintColor  : {
				default: 'rgba(0, 0, 0, .1)'
			},
			width      : {
				default: 80
			},
			height     : {
				default: 80
			}
		},
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
            margin: 0 auto 10px;
        }
    }
</style>