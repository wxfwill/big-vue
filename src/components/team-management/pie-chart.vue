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
			this.myChart = ECharts.init(this.$refs.chartCvs);
			this.loadPieChart();
		},
		methods: {
			loadPieChart() {
				let labelText = '';
				if(this.type === 'number') {
					labelText = `${this.percent}`;
				} else {
					labelText = `${this.percent}%`;
				}
				this.myChart.setOption({
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
							formatter: labelText,
							color    : "#fff"
						},
						data          : [
							{
								name : '',
								value: this.percent,
							},
							{
								value  : this.circleMaxNumber - this.percent,
								tooltip: {
									formatter      : ' ',
									backgroundColor: 'transparent'
								}
							}
						],
					}]
				})
			}
		},
		props  : {
			type           : {
				default: 'ratio'
			},
			text           : {
				default: ''
			},
			circleMaxNumber: {
				default: 100
			},
			percent        : {
				default: 0,
			},
			strokeColor    : {
				default: '#18D9E3',
			},
			tintColor      : {
				default: 'rgba(24,217,227,0.2)'
			},
			width          : {
				default: 80
			},
			height         : {
				default: 80
			}
		},
		watch  : {
			percent(){
				this.loadPieChart();
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