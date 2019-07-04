<template>
    <div class="popup-wrap">
        <div class="popup-box">
            <div class="popup-head">
                <span class="popup-title">{{ title }}</span>
                <span class="popup-close" @click="($parent.showMapData=false)">X</span>
            </div>
            <div ref="popup" style="width:2438px;height:450px;margin: 0 auto;"></div>
        </div>
    </div>
</template>
<script>
	import ECharts from 'echarts';

	export default {
		mounted() {
			this.myChart = ECharts.init(this.$refs.popup);
			this.loadMapLineChart();
		},
		methods: {
			loadMapLineChart() {
				const chartData                                = this.popupData;
				const { xAxisList, bjsData, slsData, zbsData } = this.convertMapChartData(chartData);
				this.myChart.setOption({
					color     : ['#12E9E9', '#F7BD07', '#10E77E'],
					tooltip   : {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend    : {
						data     : ['受理数', '在办数', '办结数'],
						right    : 80,
						top      : 20,
						orient   : 'vertical',
						textStyle: {
							color   : "#fff",
							fontSize: 18
						}
					},
					grid      : {
						top   : '10%',
						left  : '10%',
						right : '10%',
						bottom: '10%',
					},
					calculable: true,
					xAxis     : {
						type     : 'category',
						axisTick : { show: false },
						data     : xAxisList,
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						axisLabel: {
							color     : '#00ffff',
							fontSize  : 21,
							lineHeight: 25
						}
					},
					yAxis     : {
						type     : 'value',
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(216,216,216,0.4)'
							}
						},
						axisLabel: {
							color: '#0ff',
						},
					},
					series    : [
						{
							name       : '受理数',
							type       : 'bar',
							barGap     : 0,
							data       : slsData,
							barMaxWidth: 40,
						},
						{
							name       : '在办数',
							type       : 'bar',
							barMaxWidth: 40,
							data       : zbsData
						},
						{
							name       : '办结数',
							type       : 'bar',
							barMaxWidth: 40,
							data       : bjsData
						}
					]
				})
			},
			convertMapChartData(chartData) {
				const xAxisList = [],
					  bjsData   = [],
					  slsData   = [],
					  zbsData   = [];
				chartData.forEach(i => {
					xAxisList.push(i.name);
					bjsData.push(i.bjs);
					slsData.push(i.sls);
					zbsData.push(i.zbs);
				});
				return {
					xAxisList,
					bjsData,
					slsData,
					zbsData
				}
			},
		},
		props  : ['title', 'popupData'],
	}
</script>
<style lang="scss" scoped>
    .popup-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 15;
        .popup-box {
            position: relative;
            width: 2508px;
            height: 559px;
            margin: 262px 0 0 662px;
            background-color: #062355;
            border: 1px solid #12e9e9;
            .popup-head {
                margin-top: 34px;
                margin-bottom: 10px;
                line-height: 50px;
                text-align: center;
                .popup-title {
                    color: rgba(255, 255, 255, 1);
                    font-size: 36px;
                    font-weight: 400;
                    font-family: PingFangSC-Regular;
                }
                .popup-close {
                    text-align: center;
                    line-height: 38px;
                    position: absolute;
                    right: 32px;
                    top: 35px;
                    width: 38px;
                    height: 38px;
                    background: rgba(18, 175, 171, 1);
                    border-radius: 50%;
                    color: #FFFFFF;
                    cursor: pointer;
                }
            }
        }
    }
</style>
