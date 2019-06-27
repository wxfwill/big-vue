<template>
    <div class="water-box">
        <div ref='chartBox' :style="{width:'86px', height:'86px'}"></div>
        <p>{{chartConfig.value}}</p>
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
				this.myChart.setOption({
					series: [{
						type           : 'liquidFill',
						data           : [{
							value    : this.chartConfig.rate,
							direction: 'right',
							itemStyle: {
								normal: {
									color: this.chartConfig.col1
								}
							}
						}, {
							value    : this.chartConfig.rate,
							direction: 'right',
							itemStyle: {
								normal: {
									color: this.chartConfig.col2
								}
							}
						}],
						radius         : '95%',
						backgroundStyle: {
							borderWidth: 1,//内边框粗细
							borderColor: this.chartConfig.col2,//内边框颜色
							color      : 'rgb(255,255,255,0)'//底色
						},
						label          : {
							show  : false,
							normal: {
								formatter: (params) => {
									return `${params.value * 100}%`;
								},
								textStyle: {
									fontSize  : 18,
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
		props  : ['chartConfig'],
	}
</script>
<style lang="scss" scoped>
    .water-box {
        // width: 115px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p:nth-of-type(1) {
            line-height:26px;
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
