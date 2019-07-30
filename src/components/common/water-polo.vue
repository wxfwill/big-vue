<template>
    <div class="water-box">
        <div ref='chartBox' :style="{width:`${width}px`, height: `${width}px`}"></div>
        <p class="water-num">{{ chartConfig.value || 0 }}</p>
        <p class="water-title">{{chartConfig.title}}</p>
    </div>
</template>
<script>
	import ECharts from 'echarts';
	import 'echarts-liquidfill/src/liquidFill.js';

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
				const chartConfig = this.chartConfig;
				const rate = ((chartConfig.rate || 0) / 100);
				this.myChart.setOption({
					series: [{
						type           : 'liquidFill',
						data           : [{
							number   : chartConfig.value || 0,
							value    : rate,
							direction: 'right',
							itemStyle: {
								normal: {
									color: chartConfig.col1
								}
							}
						}, {
							number   : chartConfig.value || 0,
							value    : rate,
							direction: 'right',
							itemStyle: {
								normal: {
									color: chartConfig.col2
								}
							}
						}],
						radius         : '98%',
						backgroundStyle: {
							borderWidth: 1,//内边框粗细
							borderColor: chartConfig.col2,//内边框颜色
							color      : 'rgb(255,255,255,0)'//底色
						},
						label          : {
							show  : false,
							normal: {
								formatter: (params) => {
									if(this.percent){
										return ''
									}
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
									fontSize  : 14,
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
			chartConfig: {
				type : Object
            },
            width :{
				default : 70
            },
            height : {
				default: 70
			},
			percent:{
				default:false
			}
        },
	}
</script>
<style lang="scss" scoped>
    .water-box {
        // width: 115px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .water-num {
            line-height:22px;
            font-size:22px;
            font-family:ArialMT;
            color: rgba(255, 255, 255, 1);
            margin: 11px 0;
        }
        .water-title {
            line-height:21px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 255, 255, 1);
        }
    }
</style>
