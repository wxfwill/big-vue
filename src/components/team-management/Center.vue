<template>
    <div class="team-center-container">
        <div class="map-box">
            <bj-map
                :mapData="teamManageMaps"
                :getNewRegionInfo="getNewRegionInfo"
            ></bj-map>
        </div>
        <div class="status-box">
            <h1 class="title">各级检察机关人员现状</h1>
            <div ref="statusChart" :style="{ width: '1211px', height: '250px' }"></div>
        </div>
    </div>
</template>

<script>
	import EChart          from 'echarts';
	import { getRealType } from '@/utlis/helper';
	import BjMap           from '../common/map/index';

	export default {
		data() {
			return {
				change:false
            }
		},
		mounted() {
			this.myChart = EChart.init(this.$refs.statusChart);
		},
		methods   : {
			loadPersonnelStatusChart(personnelStatusQuos) {
				const { cityAxis, seriesData } = this.datConversionChart(personnelStatusQuos);
				this.myChart.setOption({
					color  : ['#00FFFF', '#F598CC', '#2b95fc', '#eac64e'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
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
						bottom      : 14,
						containLabel: true
					},
					xAxis  : {
						type     : 'category',
						data     : cityAxis,
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
						data     : seriesData.zz,
						barGap   : '30%',
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0],
							color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color : 'rgba(1, 247,249, 1)'
							}, {
								offset: 1,
								color : 'rgba(1, 247,249, 0.1)'
							}])
						}
					}, {
						name     : '增员',
						type     : 'bar',
						stack    : '广告',
						data     : seriesData.zy,
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0],
							color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color : 'rgba(245, 152, 204, 1)'
							}, {
								offset: 1,
								color : 'rgba(245, 152, 204, .1)'
							}])
						}
					}, {
						name     : '离退',
						type     : 'bar',
						data     : seriesData.lt,
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0],
							color          : new EChart.graphic.LinearGradient(0, 0, 1, 1, [{
								offset: 0,
								color : 'rgba(43, 149,252, 1)'
							}, {
								offset: 1,
								color : 'rgba(43, 149,252, 0.1)'
							}])
						}
					}, {
						name     : '其他减员',
						type     : 'bar',
						data     : seriesData.qtjy,
						barWidth : 10,
						itemStyle: {
							barBorderRadius: [20, 20, 0, 0],
							color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color : 'rgba(234, 234,78, 1)'
							}, {
								offset: 1,
								color : 'rgba(234, 234,78, 0.1)'
							}])
						}
					}]
				})
			},
			datConversionChart(data) {
				const seriesData = {
						  zz  : [],
						  zy  : [],
						  lt  : [],
						  qtjy: [],
					  },
					  cityAxis   = [];
				data.map(i => {
					cityAxis.push(i.city_name || '未知');
					seriesData.zz.push(i.zz);
					seriesData.zy.push(i.zy);
					seriesData.lt.push(i.lt);
					seriesData.qtjy.push(i.qtjy);
				});
				return {
					cityAxis,
					seriesData
				}
			},
            getNewRegionInfo(code, lev) {
                this.changeRegion(code, lev)
            }
		},
		props     : ['teamManageMaps', 'changeRegion'],
		components: {
			BjMap
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