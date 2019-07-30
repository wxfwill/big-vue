<template>
    <div>
        <div class="judicial-case-title">
            <i class="title-dot"></i>
            公益诉讼
        </div>
        <div class="outer-lawsuit-page fraze-grid">
            <div class="lawsuit-page-left">
                <div class="left-top">
                    <div class="index-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>民事公益诉讼基本情况</i>
                        </div>
                        <div class="index-content">
                            <ul class="index-block">
                                <li v-for="(item,index) in civilPublicList" :key="index">{{item}}</li>
                                <span>宗</span>
                            </ul>
                            <div class="index-text">
                                <p>
                                    <span>受理件数：{{ civilPublicLitigation.sljs }}</span>
                                    <span>办结件数：{{ civilPublicLitigation.bjjs }}</span>
                                </p>
                                <p>
                                    <span>提出检察建议数：{{ civilPublicLitigation.tcjcjys }}</span>
                                    <span>办结率：{{ civilPublicLitigation.bjl }}%</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="index-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>行政公益诉讼基本情况</i>
                        </div>
                        <div class="index-content">
                            <ul class="index-block">
                                <li v-for="(item,index) in administrationList" :key="index">{{item}}</li>
                                <span>宗</span>
                            </ul>
                            <div class="index-text">
                                <p>
                                    <span>受理件数：{{ administrationPublicLitigation.sljs }}</span>
                                    <span>办结件数：{{ administrationPublicLitigation.bjjs }}</span>
                                </p>
                                <p>
                                    <span>提出检察建议数：{{ administrationPublicLitigation.tcjcjys }}</span>
                                    <span>办结率：{{ administrationPublicLitigation.bjl }}%</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="territory-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>涉案领域统计分析</i>
                    </div>
                    <p class="civil-text">民事公益诉讼</p>
                    <p class="administration-text">行政公益诉讼</p>
                    <div ref="territoryChart" class="territory-chart"></div>
                </div>
                <div class="tendency-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受理案件趋势分析</i>
                    </div>
                    <div ref="tendencyChart" class="tendency-chart"></div>
                </div>
            </div>
            <div class="lawsuit-page-center">
                <bj-map
                        :tooltipConfig="mapTooltipConfig"
                        :mapData="mapList"
                        :getNewRegionInfo="setMapData"
                        :totalSls="totalSls"
                        :totalBjs="totalBjs"
                        :totalZbs="totalZbs"
                        :sls="sls"
                        :bjs="bjs"
                        :zbs="zbs"
                        :lev="mapCode.lev"
                        :nowSelectDate="dateSection"
                ></bj-map>
            </div>
            <div class="lawsuit-page-right">
                <div class="right-top">
                    <div class="nature-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案件性质分类</i>
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
                        <i>受理数分类情况统计</i>
                    </div>
                    <div ref="statisticsChart" class="statistics-chart"></div>
                </div>
                <div class="right-bottom">
                    <div class="capita-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>人均办结数</i>
                        </div>
                        <div class="capita-content">
                            <div ref="capitaChart" :style="{width:'490px',height:'240px'}"></div>
                            <p class="more-text-btn" @click="setDialogVisible('人均办结数')">更多>></p>
                        </div>
                    </div>
                    <div class="file-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案均办理天数</i>
                        </div>
                        <div class="file-content">
                            <div ref="fileChart" :style="{width:'490px',height:'240px'}"></div>
                            <p class="more-text-btn" @click="setDialogVisible('案均办结天数')">更多>></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
                :title="dialogContext.name"
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
    </div>
</template>
<script>
	import { mapGetters, mapActions }                      from 'vuex';
	import ECharts                                         from 'echarts';
	import * as services                                   from './service';
	import { verifyTriggerState, fillZero, textFormatter } from '@/utlis/helper';
	import BjMap                                           from '@/components/common/map/index';
	import { triggerMixin }                                from '@/components/mixin/trigger';
	import {
		mapTooltipConfig, territoryConfig,
		CHART_COLOR_LIST, statisticsConfig,
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
				totalSls                      : [0, 0, 0, 0],
				totalBjs                      : [0, 0, 0, 0],
				totalZbs                      : [0, 0, 0, 0],
				sls                           : 0,
				bjs                           : 0,
				zbs                           : 0,
				mapList                       : [],
				mapTooltipConfig,
				dialogVisible                 : false,
				dialogContext                 : {
					name: '',
					key : '',
					data: []
				},
				casesAreHandledList           : [],
				perCapitaHandlingList         : []
			}
		},
		computed  : {
			civilPublicList() {
				return fillZero(this.civilPublicLitigation.zs, 6).split('');
			},
			administrationList() {
				return fillZero(this.administrationPublicLitigation.zs, 6).split('');
			},
			...mapGetters('publicLitigation', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		mounted() {
			const params          = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState  = params;
			this.territoryChart   = ECharts.init(this.$refs.territoryChart);
			this.tendencyChart    = ECharts.init(this.$refs.tendencyChart);
			this.natureChart      = ECharts.init(this.$refs.natureChart);
			this.investigateChart = ECharts.init(this.$refs.investigateChart);
			this.statisticsChart  = ECharts.init(this.$refs.statisticsChart);
			this.fileChart        = ECharts.init(this.$refs.fileChart);
			this.capitaChart      = ECharts.init(this.$refs.capitaChart);

			this.requestPublicLitigationData(params);
			this.requestTrendsInAcceptingCasesList(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestPublicLitigationData(params);
				this.requestTrendsInAcceptingCasesList(params);
			}
		},
		methods   : {
			async requestPublicLitigationData(params) {
				const res = await services.getPublicLitigationData(params);
				if(res.code === 200) {
					const {
							  civilPublicLitigation, administrationPublicLitigation,
							  administrationInvolvedField, civilInvolvedField,
							  theMapList,
							  topSlBjZb: { bjzs, slzs, zbzs },
							  mapSlBjZb: { bjs, sls, zbs },
							  natureOfTheCaseList, reviewTheSituationList,
							  civilTheCaseCategory, administrationTheCaseCategory,
							  perCapitaHandlingList, casesAreHandledList
						  }                             = res.data;
					this.civilPublicLitigation          = civilPublicLitigation;
					this.administrationPublicLitigation = administrationPublicLitigation;
					this.sls                            = sls;
					this.bjs                            = bjs;
					this.zbs                            = zbs;
					this.mapList                        = theMapList;
					this.totalSls                       = `${fillZero(slzs, 4)}`.split('');
					this.totalBjs                       = `${fillZero(bjzs, 4)}`.split('');
					this.totalZbs                       = `${fillZero(zbzs, 4)}`.split('');
					this.casesAreHandledList            = casesAreHandledList;
					this.perCapitaHandlingList          = perCapitaHandlingList;

					this.loadTerritoryChart(civilInvolvedField, administrationInvolvedField);
					this.loadNatureChart(natureOfTheCaseList);
					this.loadInvestigateChart(reviewTheSituationList);
					this.loadStatisticsChart(civilTheCaseCategory, administrationTheCaseCategory);
					this.loadFileChart(casesAreHandledList.slice(0, 5));
					this.loadPerCapitaSettlementChart(perCapitaHandlingList.slice(0, 6));
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
						center   : ['30%', '48%'],
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
						center   : ['70%', '48%'],
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
						bottom      : 20,
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
			// 案均办结数
			loadFileChart(chartData) {
				const { axisData, seriesData } = this.convertBarData(chartData, 'ajblts');
				this.fileChart.setOption({
					color  : ['#009FE8'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						left  : '15%',
						right : '10%',
						bottom: '10%',
						top   : "2%",
					},
					legend : {
						show: false
					},
					xAxis  : {
						type         : 'value',
						name         : '天数',
						nameTextStyle: {
							padding: [30, 0, 0, 5],
							color  : '#fff'
						},
						splitLine    : {
							show: false
						},
						axisLine     : {
							lineStyle: {
								color: '#00FFFF'
							}
						},
						axisLabel    : {
							show     : true,
							textStyle: {
								fontSize: 14,
								color   : '#fff'
							},
						},
						axisTick     : {
							show: false
						},
					},
					yAxis  : {
						type     : 'category',
						data     : axisData,
						axisLabel: {
							textStyle: {
								fontSize: 12,
								color   : '#D5CBE8'
							},
							formatter: (name) => textFormatter(name, 4),
						},
						axisLine : {
							lineStyle: {
								color: '#00FFFF'
							}
						},
						axisTick : {
							show: false
						}
					},
					series : [
						{
							name     : '案均办结数',
							type     : 'bar',
							barWidth : 22,
							data     : seriesData,
							itemStyle: {
								color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color : '#1783E5'
								}, {
									offset: 1,
									color : '#18CBFF'
								}]),
							}
						}
					]
				})
			},
			// 人均办结天数
			loadPerCapitaSettlementChart(chartData) {
				const { axisData, seriesData } = this.convertBarData(chartData, 'rjbjs');
				this.capitaChart.setOption({
					color  : ['#05C2E2'],
					tooltip: {
						show       : true,
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						top   : '5%',
						left  : '15%',
						right : '4%',
						bottom: '10%',
					},
					xAxis  : {
						type     : 'category',
						data     : axisData,
						axisLine : {
							show     : true,
							lineStyle: {
								color: '#aaa'
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							color     : '#fff',
							interval  : 0,
							width     : 20,
							fontSize  : 14,
							lineHeight: 21,
							fontFamily: 'PingFangSC-Regular',
							formatter : (name) => textFormatter(name, 4),
						},
						splitLine: {
							show: false,
						},
					},
					yAxis  : {
						type     : 'value',
						axisLine : {
							show: false,
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							color: '#fff'
						},
						splitLine: {
							show     : true,
							interval : 0,
							lineStyle: {
								color: 'rgba(49, 219, 232, .2)',
							}
						}
					},
					series : [
						{
							name    : '人均办结数',
							type    : 'bar',
							barWidth: 22,
							data    : seriesData,

						}
					]
				})
			},
			setDialogVisible(name) {
				let data = [],
					key  = '';
				switch(name) {
					case '人均办结数' :
						key  = 'rjbjs';
						data = this.perCapitaHandlingList;
						break;
					case '案均办结天数':
						key  = 'ajblts';
						data = this.casesAreHandledList;
						break;
				}
				this.dialogContext = {
					name,
					key,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart() {
				const { data: chartData, key } = this.dialogContext,
					  { axisData, seriesData } = this.convertBarData(chartData, key);

				this.dialogBarChart = ECharts.init(this.$refs.dialogChart);

				this.dialogBarChart.setOption({
					tooltip   : {
						show: false
					},
					legend    : {
						show: false
					},
					grid      : {
						top   : '4%',
						left  : '3%',
						right : '3%',
						bottom: '20%',
					},
					calculable: true,
					xAxis     : {
						type     : 'category',
						axisTick : { show: false },
						data     : axisData,
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						axisLabel: {
							color     : '#00ffff',
							fontSize  : 21,
							lineHeight: 25,
							interval  : 0
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
							name       : '地区',
							type       : 'bar',
							data       : seriesData,
							barMaxWidth: 40,
							itemStyle  : {
								normal: {
									color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color : "#32EEEB"
									}, {
										offset: 1,
										color : "#0379DB"
									}])
								}
							},
							label      : {
								normal: {
									"show"    : true,
									"position": "top",
									color     : '#00FFFF',
								}
							},
						}
					]
				});
			},
			closeBarDialog() {
				this.dialogBarChart && this.dialogBarChart.clear();
			},
			convertBarData(chartData, key) {
				const axisData   = [],
					  seriesData = chartData.map((i) => {
						  axisData.push(i.city_name);
						  return {
							  name : i.city_name,
							  value: i[key]
						  }
					  });
				return {
					axisData,
					seriesData
				};
			},
			...mapActions('publicLitigation', ['initMapState']),
			...mapActions('publicLitigation', ['setMapData']),
		},
		mixins    : [triggerMixin],
		components: {
			BjMap,
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
                .index-box {
                    width: 578px;
                    height: 248px;
                    .index-content {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        margin-top: 40px;
                        .index-block {
                            display: flex;
                            justify-content: center;
                            font-size: 18px;
                            color: rgba(255, 255, 255, 1);
                            min-width: 400px;
                            li:first-of-type {
                                border-left: 1px solid #26A3EF;
                            }
                            li {
                                width: 48px;
                                height: 48px;
                                border-right: 1px solid #26A3EF;
                                border-top: 1px solid #26A3EF;
                                border-bottom: 1px solid #26A3EF;
                                font-size: 36px;
                                color: rgba(0, 255, 255, 1);
                                text-align: center;
                                line-height: 48px;
                            }
                            span {
                                margin: 21px 0 0 30px;
                            }
                        }
                        .index-text {
                            margin-top: 24px;
                            margin-left: 40px;
                            p {
                                line-height: 24px;
                                font-size: 16px;
                                font-family: MicrosoftYaHei;
                                color: rgba(255, 255, 255, 1);
                                color: #dfdfdf;
                                span {
                                    display: inline-block;
                                    width: 200px;
                                }
                            }
                        }
                    }
                }
            }
            .territory-box {
                position: relative;
                width: 1304px;
                margin-bottom: 20px;
                .territory-chart {
                    width: 100%;
                    height: 300px;
                }
                .civil-text, .administration-text {
                    position: absolute;
                    top: 180px;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 18px;
                }
                .civil-text {
                    left: 100px;
                }
                .administration-text {
                    left: 640px;
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
                .file-box {
                    width: 593px;
                    .file-content {
                        display: flex;
                        margin: 20px 0;
                        p {
                            width: 60px;
                            color: #F7931E;
                        }
                    }
                }
                .capita-box {
                    width: 546px;
                    height: 240px;
                    .capita-content {
                        display: flex;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>
