<template>
    <div>
        <judicial-title title="公益诉讼"></judicial-title>
        <div class="outer-lawsuit-page fraze-grid">
            <div class="lawsuit-page-left">
                <div class="left-top">
                    <div class="index-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>民事公益诉讼情况</i>
                        </div>
                        <div class="index-content">
                            <div class="index-text">
                                <p>受理件数：{{ civilPublicLitigation.sljs }}</p>
                                <p>办结件数：{{ civilPublicLitigation.bjjs }}</p>
                                <p>提出检察建议数：{{ civilPublicLitigation.tcjcjys }}</p>
                            </div>
                            <water-polo
                                    :chartConfig="{
                                        rate: civilPublicLitigation.bjl,
                                        title:'办结率',
                                        noValue:true,
                                    }"
                                    :width=100
                                    :height=100
                            ></water-polo>
                        </div>
                    </div>
                    <div class="index-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>行政公益诉讼情况</i>
                        </div>
                        <div class="index-content">
                            <div class="index-text">
                                <p>受理件数：{{ administrationPublicLitigation.sljs }}</p>
                                <p>办结件数：{{ administrationPublicLitigation.bjjs }}</p>
                                <p>提出检察建议数：{{ administrationPublicLitigation.tcjcjys }}</p>
                            </div>
                            <water-polo
                                    :chartConfig="{
                                        rate: administrationPublicLitigation.bjl,
                                        title:'办结率',
                                        noValue:true,
                              }"
                                    :width=100
                                    :height=100></water-polo>
                        </div>
                    </div>
                    <div ref="territoryChart" class="territory-chart"></div>
                </div>
                <div class="tendency-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受理案件趋势分析</i>
                    </div>
                    <year-selector
                            :selectYear="trendsAcceptingCaseYear"
                            :handleChange="changetrendsAcceptingCaseYear"
                    ></year-selector>
                    <div ref="tendencyChart" class="tendency-chart"></div>
                </div>
            </div>
            <div class="lawsuit-page-center">
                <bj-map
                        :tooltipConfig="mapTooltipConfig"
                        :mapData="mapList"
                        :getNewRegionInfo="setMapData"
                        :lev="mapCode.lev"
                        :code="mapCode.code"
                        defaultCode="100000"
                        :topDataConfig="topDataConfig"
                        :topData="{ totalSls, totalBjs, totalZbs }"
                        :leftDataConfig="leftSideList"
                        :leftData='{ sls, bjs, zbs }'
                        :extraCityColumn="mapTableConfig"
                        highProcuratorCode="100000"
                        :nowSelectDate="dateSection"
                        :mapLineLegend="mapLineLegend"
                ></bj-map>
            </div>
            <div class="lawsuit-page-right">
                <div class="right-top">
                    <div class="nature-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案件性质情况</i>
                        </div>
                        <div ref="natureChart" class="nature-chart"></div>
                    </div>
                    <div class="investigate-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>审查情况</i>
                        </div>
                        <div ref="investigateChart" class="investigate-chart"></div>
                    </div>
                </div>
                <div class="statistics-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受理案件情况</i>
                    </div>
                    <div ref="statisticsChart" class="statistics-chart"></div>
                </div>
                <div class="right-bottom">
                    <div class="superviseReply-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>督促回复</i>
                        </div>
                        <div ref="superviseReplyChart" :style="{width:'100%',height:'240px'}"></div>
                    </div>
                    <div class="sourceCase-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案件来源</i>
                        </div>
                        <div ref="sourceOfCaseChart" :style="{width:'100%',height:'240px'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import { mapGetters, mapActions }                      from 'vuex';
	import WaterPolo                                       from '@/components/common/water-polo';
	import ECharts                                         from 'echarts';
	import * as services                                   from './service';
	import { verifyTriggerState, fillZero, textFormatter } from '@/utlis/helper';
	import BjMap                                           from '@/components/common/map/index';
	import { triggerMixin, mapComponentState }             from '@/components/mixin/trigger';
	import YearSelector                                    from '@/components/common/year-selector';
	import JudicialTitle                                   from '@/components/judicial-case/judicial-case-title';
	import {
		mapTooltipConfig, territoryConfig,
		CHART_COLOR_LIST, statisticsConfig, topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend, superviseTheReplyConfig,
		sourceOfCaseConfig,
	}                                                      from './constant';

	export default {
		data() {
			return {
				civilPublicLitigation         : {
					bjjs   : 0,
					bjl    : 0,
					sljs   : 0,
					tcjcjys: 0,
					zs     : 0,
				},
				administrationPublicLitigation: {
					bjjs   : 0,
					bjl    : 0,
					sljs   : 0,
					tcjcjys: 0,
					zs     : 0,
				},
				mapTooltipConfig,
				dialogVisible                 : false,
				dialogContext                 : {
					name: '',
					key : '',
					data: []
				},
				trendsAcceptingCaseYear       : new Date().getFullYear(),
			}
		},
		computed  : {
			...mapGetters('publicLitigation', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.mapTooltipConfig = mapTooltipConfig;
			this.topDataConfig    = topDataConfig;
			this.leftSideList     = leftSideList;
			this.mapTableConfig   = mapTableConfig;
			this.mapLineLegend    = mapLineLegend;
		},
		mounted() {
			const params             = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState     = params;
			this.territoryChart      = ECharts.init(this.$refs.territoryChart);
			this.tendencyChart       = ECharts.init(this.$refs.tendencyChart);
			this.natureChart         = ECharts.init(this.$refs.natureChart);
			this.investigateChart    = ECharts.init(this.$refs.investigateChart);
			this.statisticsChart     = ECharts.init(this.$refs.statisticsChart);
			this.superviseReplyChart = ECharts.init(this.$refs.superviseReplyChart);
			this.sourceOfCaseChart   = ECharts.init(this.$refs.sourceOfCaseChart);

			this.requestPublicLitigationData(params);
			this.requestTopSlBjZb(params);
			this.requestCivilPublicLitigation(params);
			this.requestCivilInvolvedField(params);
			this.requestAdministrationPublicLitigation(params);
			this.requestTrendsInAcceptingCasesList({
				year: this.trendsAcceptingCaseYear,
				code: params.code,
				lev : params.lev
			});
			this.requestSuperviseTheReply(params);
			this.requestSourceOfCase(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				if(verifyTriggerState(['code', 'lev'], this.oldTriggerState, params)) {
					this.requestTrendsInAcceptingCasesList({
						code: params.code,
						lev : params.lev,
						year: this.trendsAcceptingCaseYear,
					});
				}
				this.oldTriggerState = params;
				this.requestPublicLitigationData(params);
				this.requestTopSlBjZb(params);
				this.requestCivilPublicLitigation(params);
				this.requestCivilInvolvedField(params);
				this.requestAdministrationPublicLitigation(params);
				this.requestSuperviseTheReply(params);
				this.requestSourceOfCase(params);
			}
		},
		methods   : {
			async requestPublicLitigationData(params) {
				const res = await services.getPublicLitigationData(params);
				if(res.code === 200) {
					const {
							  theMapList,
							  mapSlBjZb,
							  natureOfTheCaseList, reviewTheSituationList,
							  civilTheCaseCategory, administrationTheCaseCategory,
						  } = res.data;
					this.loadMapContent({
						...mapSlBjZb,
						theMapList
					});
					this.loadNatureChart(natureOfTheCaseList);
					this.loadInvestigateChart(reviewTheSituationList);
					this.loadStatisticsChart(civilTheCaseCategory, administrationTheCaseCategory);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestTrendsInAcceptingCasesList(params) {
				const res = await services.getTrendsInAcceptingCasesList(params);
				if(res.code === 200) {
					this.loadTendencyChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestTopSlBjZb(params) {
				const res = await services.getTopSlBjZb(params);
				if(res.code === 200) {
					this.convertMapHeadData(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestCivilPublicLitigation(params) {
				const res = await services.getCivilPublicLitigation(params);
				if(res.code === 200) {
					this.civilPublicLitigation = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestCivilInvolvedField(params) {
				const res = await services.getCivilInvolvedField(params);
				if(res.code === 200) {
					this.requestAdministrationInvolvedField(params, res.data)
				} else {
					this.$message.error(res.msg);
				}
			},
			// 督促回复
			async requestSuperviseTheReply(params) {
				const res = await services.getSuperviseTheReply(params);
				if(res.code === 200) {
					this.loadSuperviseTheReply(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			// 督促回复
			async requestSourceOfCase(params) {
				const res = await services.getSourceOfCase(params);
				if(res.code === 200) {
					this.loadSourceOfCase(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestAdministrationPublicLitigation(params) {
				const res = await services.getAdministrationPublicLitigation(params);
				if(res.code === 200) {
					this.administrationPublicLitigation = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestAdministrationInvolvedField(params, civilInvolvedFieldData) {
				const res = await services.getAdministrationInvolvedField(params);
				if(res.code === 200) {
					this.loadTerritoryChart(civilInvolvedFieldData, res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			changetrendsAcceptingCaseYear(year) {
				this.requestTrendsInAcceptingCasesList({
					...this.mapCode,
					year,
				})
			},
			// 涉案领域统计分析
			loadTerritoryChart(civilInvolvedData, administrationData) {
				const civilChartData          = [],
					  legendList              = [],
					  administrationChartData = territoryConfig.map((i) => {
						  civilChartData.push({
							  name : i.name,
							  value: civilInvolvedData[i.id]
						  });
						  legendList.push(i.name);
						  return {
							  name : i.name,
							  value: administrationData[i.id]
						  };
					  });
				this.territoryChart.setOption({
					color  : ['#11F3E4', '#FBBA18', '#2CE2A7', '#15B3FB', '#FC9128'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						x        : 'center',
						y        : 'bottom',
						itemGap  : 15,
						data     : legendList,
						textStyle: {
							color   : '#dfdfdf',
							fontSize: '14'
						}
					},
					series : [{
						name     : '民事公益诉讼',
						type     : 'pie',
						radius   : '70%',
						center   : ['22%', '48%'],
						label    : {
							show     : true,
							formatter: '{d}%'
						},
						data     : civilChartData,
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}, {
						name     : '行政公益诉讼',
						type     : 'pie',
						radius   : '70%',
						center   : ['78%', '48%'],
						label    : {
							show     : true,
							formatter: '{d}%'
						},
						data     : administrationChartData,
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				})
			},
			// 受理案件趋势分析
			loadTendencyChart(chartData = []) {
				const civilData          = [],
					  axisData           = [],
					  administrationData = chartData.map((i) => {
						  civilData.push(i.ms_slajs);
						  axisData.push(i.month);
						  return i.xz_slajs;
					  });
				this.tendencyChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend : {
						show      : true,
						right     : '13%',
						top       : '3%',
						data      : ['行政', '民事'],
						itemWidth : 12,
						itemHeight: 12,
						textStyle : {
							color   : '#ffffff',
							fontSize: '14'
						}
					},
					grid   : {
						top         : '25%',
						left        : 80,
						right       : 150,
						bottom      : 15,
						containLabel: true,
					},
					xAxis  : {
						type       : 'category',
						boundaryGap: true,
						axisLine   : { //坐标轴轴线相关设置。数学上的x轴
							show     : true,
							lineStyle: {
								color: '#00FFFF'
							},
						},
						axisLabel  : { //坐标轴刻度标签的相关设置
							textStyle: {
								color   : 'rab(255,255,255,1)',
								fontSize: 16,
								margin  : 20,
							},
						},
						axisTick   : {
							show: false,
						},
						data       : axisData,
					},
					yAxis  : {
						name     : '件数',
						type     : 'value',
						min      : 0,
						// max: 140,
						// splitNumber: 1,//刻度条数决定距离
						splitLine: {
							show     : false,
							lineStyle: { //y轴网格线设置
								color: 'rgb(193,193,193,0.2)',
								width: 1,
								type : 'dashed'
							}
						},
						axisLine : {
							lineStyle: {
								color: '#00FFFF'
							},
							show     : true,
						},
						axisLabel: {
							margin   : 20,//离右边距离
							textStyle: {
								color   : '#FFFFFF',
								fontSize: 14

							},
						},
						axisTick : {
							show: false,
						},
					},
					series : [{
						name     : '行政',
						type     : 'bar',
						barWidth : 12,
						itemStyle: {
							normal: {
								color: '#F7931E'
							}
						},
						data     : administrationData
					}, {
						name     : '民事',
						type     : 'bar',
						barWidth : 12,
						itemStyle: {
							normal: {
								color: '#25BDE5'
							}
						},
						data     : civilData
					}]
				});
			},
			// 案件性质分类
			loadNatureChart(chartData) {
				this.natureChart.setOption({
					color  : CHART_COLOR_LIST,
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series : [{
						name     : '案件性质分类',
						type     : 'pie',
						radius   : '75%',
						center   : ['51%', '50%'],
						data     : chartData,
						label    : {//改变指示文字颜色
							normal: {
								textStyle: {
									fontFamily: 'MicrosoftYaHei',
									fontSize  : 14,   //文字的字体大小
									color     : 'rgba(255,255,255,1)'
								},
							}
						},
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
					]
				});
			},
			// 审查情况
			loadInvestigateChart(chartData) {
				this.investigateChart.setOption({
					color  : CHART_COLOR_LIST,
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series : [{
						name     : '审查情况',
						type     : 'pie',
						radius   : ['55%', '70%'],//数组时内，外
						center   : ['51%', '55%'],//x，y
						data     : chartData,
						labelLine: {
							normal: {
								length   : 20,
								length2  : 70,
								lineStyle: {
									// color: 'red'
								}
							}

						},
						label    : {
							normal: {
								formatter  : '{b} {d}%',
								borderWidth: 20,
							}
						},
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
					]
				});
			},
			// 受理数分类情况统计
			loadStatisticsChart(civilData, administrationData) {
				const civilChartData          = [],
					  axisData                = [],
					  administrationChartData = statisticsConfig.map((i) => {
						  civilChartData.push(civilData[i.id]);
						  axisData.push(i.name);
						  return administrationData[i.id];
					  });
				this.statisticsChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'line'
						}
					},
					legend : {
						show      : true,
						orient    : 'vertical',
						right     : '5%',
						top       : '3%',
						data      : ['民事公益诉讼', '行政公益诉讼'],
						itemWidth : 50,
						itemHeight: 12,
						textStyle : {
							color     : '#ffffff',
							fontSize  : '14',
							fontFamily: 'MicrosoftYaHei'
						}
					},
					grid   : {//柱状图偏移
						top         : '20%',
						left        : '3%',
						right       : '10%',
						bottom      : '10%',
						containLabel: true,
					},
					xAxis  : {
						type       : 'category',
						boundaryGap: true,
						axisLine   : { //坐标轴轴线相关设置。数学上的x轴
							show     : true,
							lineStyle: {
								color: '#00FFFF'
							},
						},
						axisLabel  : { //坐标轴刻度标签的相关设置
							textStyle: {
								color   : 'rab(255,255,255,1)',
								fontSize: 16,
								margin  : 20,
							},
						},
						axisTick   : {
							show: false,
						},
						data       : axisData,
					},
					yAxis  : {
						name     : '件数',
						type     : 'value',
						min      : 0,
						splitLine: {
							show     : false,
							lineStyle: {
								color: '#383939',
								width: 1,
								type : 'solid'
							}
						},
						axisLine : {
							lineStyle: {
								color: '#00FFFF'
							},
							show     : true,
						},
						axisLabel: {
							margin   : 20,//离右边距离
							textStyle: {
								color   : '#FFFFFF',
								fontSize: 14

							},
						},
						axisTick : {
							show: false,
						},
					},
					series : [{
						name     : '民事公益诉讼',
						type     : 'line',
						label    : {
							show     : false,
							position : 'top',
							textStyle: {
								color   : '#31DBE8',
								fontSize: 10
							}
						},
						barWidth : 12,
						itemStyle: {
							normal: {
								color: '#F7931E'
							}
						},
						data     : civilChartData
					}, {
						name     : '行政公益诉讼',
						type     : 'line',
						tooltip  : {
							show: true
						},
						label    : {
							show     : false,
							position : 'top',
							textStyle: {
								color   : '#F7931E',
								fontSize: 10
							}
						},
						barWidth : 12,
						itemStyle: {
							normal: {
								color: '#25BDE5'
							}
						},
						data     : administrationChartData
					}]
				});
			},
			// 督促回复
			loadSuperviseTheReply(chartData) {
				const seriesData = superviseTheReplyConfig.map(i => ({
					name : i.name,
					value: chartData[i.id]
				}));
				this.superviseReplyChart.setOption({
                    color : ['#FBBA18', '#32E0FB', '#1BC85D'],
					tooltip: {},
					series : [{
						name  : '督促回复',
						type  : 'pie',
						data  : seriesData,
						radius: '70%',
						center: ['50%', '60%'],
					}]
				})
			},
			// 案件来源
			loadSourceOfCase(chartData) {
				const seriesData = sourceOfCaseConfig.map(i => ({
					name : i.name,
					value: chartData[i.id] || 0
				}));
				this.sourceOfCaseChart.setOption({
                    color : ['#F18126', '#1DDA31', '#F6B420', '#23A4E5', '#FF6C40', '#18D660', '#FBBA18', '#00FFF8', '#24DEE8'],
					tooltip: {},
					series : [{
						name  : '案件来源',
						type  : 'pie',
						data  : seriesData,
						radius: '70%',
						center: ['50%', '60%'],
					}]
				})
			},
			...mapActions('publicLitigation', ['initMapState']),
			...mapActions('publicLitigation', ['setMapData']),
		},
		mixins    : [triggerMixin, mapComponentState],
		components: {
			BjMap,
			YearSelector,
			JudicialTitle,
			WaterPolo,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-lawsuit-page {
        .lawsuit-page-left {
            width: 1310px;
            display: flex;
            flex-wrap: wrap;
            .left-top {
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .index-box {
                    width: 578px;
                    height: 210px;
                    .index-content {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        margin-top: 30px;
                        .index-text {
                            font-size: 16px;
                            color: #dfdfdf;
                            width: 200px;
                            p {
                                line-height: 38px;
                            }
                        }
                    }
                }
                .territory-chart {
                    width: 1304px;
                    height: 350px;
                    margin-bottom: 20px;
                }
            }
            .tendency-box {
                width: 1304px;
                .tendency-chart {
                    width: 100%;
                    height: 260px;
                }
            }
        }
        .lawsuit-page-center {
            min-width: 1211px;
            height: 950px;
        }
        .lawsuit-page-right {
            width: 1275px;
            .right-top {
                display: flex;
                justify-content: space-between;
                .nature-box {
                    width: 593px;
                    .nature-chart {
                        width: 100%;
                        height: 270px;
                    }
                }
                .investigate-box {
                    width: 547px;
                    .investigate-chart {
                        width: 100%;
                        height: 270px;
                    }
                }
            }
            .statistics-box {
                width: 100%;
                .statistics-chart {
                    width: 100%;
                    height: 269px;
                }
            }
            .right-bottom {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .sourceCase-box {
                    width: 593px;
                }
                .superviseReply-box {
                    width: 546px;
                }
            }
        }
    }
</style>
