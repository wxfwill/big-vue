<template>
    <div class="water-box">
        <div ref='chartBox' :style="{width:'70px', height:'70px'}"></div>
        <p>{{chartConfig.num}}</p>
        <p>{{chartConfig.title}}</p>
    </div>
</template>
<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			this.myChart = ECharts.init(this.$refs.chartBox);
			this.poloHandle();
		},
		updated() {
			this.poloHandle();
		},
		methods: {
			poloHandle() {
				// console.log(this.chartConfig)
				this.myChart.setOption({
					series: [{
						type           : 'liquidFill',
						data           : [{
							number   : this.chartConfig.value,
							value    : this.chartConfig.num,
							direction: 'right',
							itemStyle: {
								normal: {
									color: this.chartConfig.col1
								}
							}
						}, {
							number   : this.chartConfig.value,
							value    : this.chartConfig.num,
							direction: 'right',
							itemStyle: {
								normal: {
									color: this.chartConfig.col2
								}
							}
						}],
						radius         : '98%',
						backgroundStyle: {
							borderWidth: 1,//内边框粗细
							borderColor: this.chartConfig.col2,//内边框颜色
							color      : 'rgb(255,255,255,0)'//底色
						},
						label          : {
							show  : false,
							normal: {
								formatter: (params) => {
									// console.log(params)
									const val = ((params.value * 10000).toFixed(0))/100;
									let text;
									if(params.data.number > 0 && val === 0) {
										text = '>0.01%';
                                    } else {
										text = `${val}%`;
                                    }
									return text;
								},
								textStyle: {
									fontSize  : 16,
									color     : '#fff',
									fontFamily: 'PingFang-SC-Bold',
									fontWeight: 'bold'
								}
							}
						},
						outline        : {
							show: false
						}
					}]
				});
			}
		},
		props  : {
			chartConfig:{type:Array}
		},
	}
</script>
<style lang="scss" scoped>
    .water-box {
        // width: 115px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p:nth-of-type(1) {
            line-height:22px;
            font-size:22px;
            font-family:ArialMT;
            color: rgba(255, 255, 255, 1);
            margin: 11px 0;
        }
        p:nth-of-type(2) {
            line-height:21px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 255, 255, 1);
        }
    }
</style>
