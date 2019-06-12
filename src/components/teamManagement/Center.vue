<template>
    <div class="team-center-container">
        <div class="map-box">

        </div>
        <div class="status-box">
            <h1 class="title">各级检察机关人员现状</h1>
            <canvas ref="statusChart" width="1211" height="250"></canvas>
        </div>
    </div>
</template>

<script>
	import EChart          from 'echarts';
	import { getRealType } from '@/utlis/helper';

	export default {
		mounted() {

		},
		data() {
			return {}
		},
		methods: {
			loadPersonnelStatusChart() {
				const myChart = EChart.init(this.$refs.statusChart);
				myChart.setOption({
					color  : ['#01f7f9', '#f598cc', '#2b95fc', '#eac64e'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend : {
						data     : ['在职', '增员', '离退', '其他减员'],
						align    : 'left',
						left     : 120,
						top      : 25,
						textStyle: {
							color: "#fff"
						}
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom         : 14,
						containLabel: true
					},
					xAxis  : {
						type     : 'category',
						data     : ['最高检', '北京', '天津', '上海', '深圳', '河南', '河北'],
						axisLabel: {
							color: "#fff"
						},
						axisLine : {
							lineStyle: {
								color: "#0b47a7",
								width: 2
							}
						},
					},
					yAxis  : {
						name         : '人数',
						type         : 'value',
						nameTextStyle: {
							color   : '#fff',
							fontSize: 14
						},
						axisTick     : {
							show: false
						},
						axisLabel    : {
							color: "#fff"
						},
						axisLine     : {
							lineStyle: {
								color: "#0b47a7",
								width: 2
							}
						},
						splitLine    : {
							lineStyle: {
								type : 'dashed',
								color: "#082451",
							}
						}
					},
					series : [{
						name     : '在职',
						type     : 'bar',
						data     : [320, 332, 301, 334, 390, 330, 320],
						barGap   : '30%',
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0]
						}
					}, {
						name     : '增员',
						type     : 'bar',
						stack    : '广告',
						data     : [220, 182, 191, 234, 290, 330, 310],
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0]
						}
					}, {
						name     : '离退',
						type     : 'bar',
						data     : [862, 1018, 964, 1026, 1679, 1600, 1570],
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0]
						}
					}, {
						name     : '其他减员',
						type     : 'bar',
						data     : [62, 82, 91, 84, 109, 110, 120],
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0]
						}
					}]
				})
			}
		},
		props  : ['personnelStatusQuos'],
		watch  : {
			personnelStatusQuos(newVal, oldVal) {
				if(getRealType(newVal) === 'array') {
					this.loadPersonnelStatusChart();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
    .team-center-container {
        margin: 0 23px;
        .map-box {
            margin-top: 5px;
            width: 1211px;
            height: 580px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(1, 218, 226, 1)
        }
        .status-box {
            width: 1211px;
            height: 315px;
            margin-top: 19px;
            opacity: 0.8;
            border: 1px solid rgba(0, 255, 255, 1);
            .title {
                padding: 10px 0 20px 0;
            }
        }
    }
</style>