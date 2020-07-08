<template>
    <div>
        <judicial-title title="控申"></judicial-title>
        <div class="outer-control-page fraze-grid">
            <div class="control-page-left">
                <div class="left-left">
                    <div class="sue-box">
                        <box-head title="控告案件情况"></box-head>
                        <ul class="box-content">
                            <li v-for="item in chargeJunctionList" :key="item.id">
                                <penal-gauge :chartConfig="item"></penal-gauge>
                            </li>
                        </ul>
                    </div>
                    <div class="appeal-box">
                        <box-head title="申诉案件情况"></box-head>
                        <ul class="box-content">
                            <li v-for="item in appealJunctionList" :key="item.id" :style="{ background: item.color }">
                                <p>{{ item.value || 0 }}</p>
                                <p class="text-center">{{ item.name }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="performance-box">
                        <box-head title="案件绩效分析"></box-head>
                        <table class="performance-table">
                            <tr>
                                <td></td>
                                <td>办结数</td>
                                <td>案均办结天数</td>
                            </tr>
                            <tr>
                                <td>控告</td>
                                <td>{{ performanceAnalysis.kg_bjs }}</td>
                                <td>{{ performanceAnalysis.kg_ajbjts }}</td>
                            </tr>
                            <tr>
                                <td>申诉</td>
                                <td>{{ performanceAnalysis.ss_bjs }}</td>
                                <td>{{ performanceAnalysis.ss_ajbjts }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="left-right">
                    <div class="court-box">
                        <box-head title="不服法院生效刑事裁判案件办理情况"></box-head>
                        <div ref="courtChart" class="court-chart"></div>
                    </div>
                    <div class="office-box">
                        <box-head title="不服检察机关处理决定案件办理情况"></box-head>
                        <ul class="office-list">
                            <li v-for="item in procuratorialOrganList" :key="item.id">
                                <p>{{ item.name }}</p>
                                <div class="office-data">
                                    <div class="shadow-line" style="width: 492px;">
                                        <div class="full-line" :style="{ width: `${item.len}px` }"></div>
                                    </div>
                                    <span>{{ item.value || 0 }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="control-page-center">
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
            <div class="control-page-right">
                <div class="petition-letter-box">
                    <box-head title="信访案件分流办理情况"></box-head>
                    <p class="more-text-btn" @click="setDialogVisible('受理信访分流办理件数')">更多>></p>
                    <p class="pl-list-title">受理信访分流办理件数</p>
                    <ul class="pl-list">
                        <li v-for="(item,index) in partLettersVisitsList" :key="index">
                            <i class="pl-name">{{item.city_name}}</i>
                            <div class="shadow-line pl-line">
                                <div class="full-line" :style="{ width : `${item.width}px` }"></div>
                            </div>
                            <span>{{item.xfs}}</span>
                        </li>
                    </ul>
                </div>
                <div class="right-right">
                    <div class="report-clues-box">
                        <box-head title="举报线索"></box-head>
                        <p class="more-text-btn" @click="setDialogVisible('举报线索案件办理情况')">更多>></p>
                        <p class="rc-list-title">举报线索案件办理情况</p>
                        <div ref="reportCluesChart" class="rc-chart"></div>
                    </div>
                    <div class="compensate-box">
                        <box-head title="国家赔偿案件"></box-head>
                        <ul class="compensate-list">
                            <li v-for="item in compensationCaseList" :key="item.id">
                                <water-polo
                                        v-if="item.icon === 'water-polo'"
                                        :chartConfig="item"
                                        width="88"
                                        height="88"
                                ></water-polo>
                                <div class="custom-block" v-else>
                                    <div class="bg_img pay-icon" :style="{backgroundImage:`url(${payImg})`}"></div>
                                    <p class="number">{{ item.value || 0 }}万元</p>
                                    <p class="title">{{ item.title }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="salvation-box">
                        <box-head title="司法救助案件办理情况"></box-head>
                        <ul class="salvation-list">
                            <li>
                                <p>受理件数</p>
                                <p class="number-text">{{ judicialReparation.sljs || 0 }}</p>
                            </li>
                            <li>
                                <p>同意救助件数</p>
                                <p class="number-text">{{ judicialReparation.tyjzjs || 0 }}</p>
                                <p>同意救助人数</p>
                                <p class="number-text">{{ judicialReparation.tyjzrs || 0 }}</p>
                            </li>
                            <li>
                                <p>发放救助件数</p>
                                <p class="number-text">{{ judicialReparation.ffjzjs || 0 }}</p>
                                <p>发放救助人数</p>
                                <p class="number-text">{{ judicialReparation.ffjzrs || 0 }}</p>
                            </li>
                            <li>
                                <p>发放救助金额</p>
                                <p class="number-text">{{ judicialReparation.ffjzje || 0 }}万元</p>
                            </li>
                        </ul>
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
    </div>
</template>
<script>
	import { mapGetters, mapActions }          from 'vuex';
	import ECharts                             from 'echarts';
	import BoxHead                             from '@/components/common/box-head';
	import BjMap                            from '@/components/common/map/index';
	import JudicialTitle from '@/components/judicial-case/judicial-case-title';
	import PenalGauge                          from '@/components/common/penal-gauge';
	import * as services                       from './service/index';
	import { triggerMixin, mapComponentState } from '@/components/mixin/trigger';
	import WaterPolo                           from '@/components/common/water-polo.vue';
	import {
		verifyTriggerState, fillZero,
		convertData, textFormatter,
		convertLineData, numberInteger,
	}                                          from '@/utlis/helper';
	import {
		chargeJunctionConfig, appealJunctionConfig,
		disobeyCourtConfig, procuratorialOrganConfig,
		mapTooltipConfig, compensationCaseConfig,
		topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend,
	}                                          from './constant/index';

	export default {
		data() {
			return {
				payImg                : require('@/public/img/judicature/pay.png'),
				chargeJunctionList    : chargeJunctionConfig,
				appealJunctionList    : appealJunctionConfig,
				performanceAnalysis   : {},
				procuratorialOrganList: procuratorialOrganConfig,
				dialogVisible         : false,
				zbList                : [1, 2, 3, 4, 5, 6, 7],
				lettersVisitsList     : [],
				dialogContext         : {
					name     : '',
					seriesKey: '',
					axisKey  : '',
					data     : []
				},
				reportCluesList       : [],
				compensationCaseList  : compensationCaseConfig,
				judicialReparation    : {}
			}
		},
		computed  : {
			partLettersVisitsList() {
				const data     = this.lettersVisitsList.slice(0, 12),
					  maxValue = Math.max(...data.map(i => i.xfs));
				return data.map(i => ({
					...i,
					width: i.xfs / maxValue * 280
				}));
			},
			...mapGetters('prosecution', ['mapCode']),
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
			const params         = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState = params;

			this.courtChart       = ECharts.init(this.$refs.courtChart);
			this.reportCluesChart = ECharts.init(this.$refs.reportCluesChart);

			this.requestChargeAppealData(params);
			this.requestCompensationCase(params);
			this.requestJudicialReparation(params);
			this.requestReportingCluesList(params);
			this.requestLettersAndVisitsList(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;

				this.requestChargeAppealData(params);
				this.requestCompensationCase(params);
				this.requestJudicialReparation(params);
				this.requestReportingCluesList(params);
				this.requestLettersAndVisitsList(params);
			}
		},
		methods   : {
			async requestChargeAppealData(params) {
				const res = await services.getChargeAppealData(params);
				if(res.code === 200) {
					const {
							  chargeJunction, appealJunction,
							  performanceAnalysis, disobeyCourt,
							  procuratorialOrgan, topSlBjZb,
							  theMapList, mapSlBjZb,
						  }                  = res.data;
					this.chargeJunctionList  = chargeJunctionConfig.map(i => ({
						...i,
						value: chargeJunction[i.id],
                        rate : (chargeJunction[i.id] / (mapSlBjZb[i.totalId] || 1) * 100).toFixed(2)
					}));
					this.appealJunctionList  = this.configMatchIdValue(appealJunctionConfig, appealJunction);
					this.performanceAnalysis = performanceAnalysis;
					this.loadCourtChart(disobeyCourt);

					const procuratorialOrganTotal = Object.values(procuratorialOrgan).reduce((a, b) => a + b);
					this.procuratorialOrganList   = procuratorialOrganConfig.map(i => ({
						...i,
						value: procuratorialOrgan[i.id],
						len  : ~~(procuratorialOrgan[i.id] / procuratorialOrganTotal * 492)
					}));
					this.convertMapHeadData(topSlBjZb);
					this.loadMapContent({ theMapList, ...mapSlBjZb });
				} else {
					this.$message.error(res.msg);
				}

			},
			async requestCompensationCase(params) {
				const res = await services.getCompensationCase(params);
				if(res.code === 200) {
					const data = res.data;

					this.compensationCaseList = compensationCaseConfig.map(i => ({
						...i,
						value: data[i.id],
						rate : data[i.ratio]
					}))
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestJudicialReparation(params) {
				const res = await services.getJudicialReparation(params);
				if(res.code === 200) {
					this.judicialReparation = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestReportingCluesList(params) {
				const res = await services.getReportingCluesList(params);
				if(res.code === 200) {
					this.reportCluesList = res.data;
					this.loadReportClues(this.reportCluesList.slice(0, 6));
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestLettersAndVisitsList(params) {
				const res = await services.getLettersAndVisitsList(params);
				if(res.code === 200) {
					this.lettersVisitsList = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},

			// 不服法院生效刑事裁判案件办理情况
			loadCourtChart(chartData) {
				this.courtChart.setOption({
					color  : ['#11C6FF', '#F7931E', '#2FE0BE', '#8766FE'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {//柱状图偏移
						top         : '15%',
						left        : '5%',
						right       : '5%',
						bottom      : 100,
						containLabel: true,
					},
					legend : {
						show     : true,
						data     : disobeyCourtConfig.map(i => i.name),
						bottom   : 20,
						width    : 350,
						formatter: '{a|{name}}',
						itemWidth: 15,
						textStyle: {
							color: '#fff',
							rich : {
								a: {
									color   : '#ddd',
									fontSize: 15,
									width   : 125,
									height  : 21,
									padding : [0, 0, 0, 1]
								},
							}
						},
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
						axisLabel  : {
							show: true,
						},
						axisTick   : {
							show: false,
						},
					},
					yAxis  : {
						name         : '件数',
						type         : 'value',
						min          : 0,
						splitLine    : {
							show     : true,
							lineStyle: { //y轴网格线设置
								color: '#383939',
								width: 1,
								type : 'dashed'
							}
						},
						axisLine     : {
							show: false,
						},
						axisLabel    : {
							margin   : 20,//离右边距离
							textStyle: {
								color   : '#FFFFFF',
								fontSize: 14

							},
						},
						axisTick     : {
							show: false,
						},
						nameTextStyle: {
							color  : '#FFF',
							padding: [-10, 0, 0, -40],
						}
					},
					series : disobeyCourtConfig.map(i => ({
						name    : i.name,
						type    : 'bar',
						label   : {
							show     : true,
							position : 'top',
							textStyle: {
								fontSize: 14
							}
						},
						barWidth: 43,
						barGap  : 2,
						data    : [chartData[i.id]]
					}))
				});
			},

			// 举报线索报表
			loadReportClues(chartData) {
				let maxValue   = 0;
				const axisData = [],
					seriesData = chartData.map(i => {
						if(i.jbxss > maxValue) {
							maxValue = i.jbxss;
						}
						axisData.push(i.city_name);
						return i.jbxss;
					});
				maxValue       = numberInteger(maxValue);
				this.reportCluesChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						top         : '10%',
						left        : '3%',
						right       : '1%',
						bottom      : '3%',
						containLabel: true,
					},
					xAxis  : {
						type       : 'category',
						boundaryGap: true,
						axisLine   : { //坐标轴轴线相关设置。数学上的x轴
							show     : false,
							lineStyle: {
								color: 'rgba(107,227,249,0.6)'
							},
						},
						axisLabel  : { //坐标轴刻度标签的相关设置
							textStyle: {
								color     : 'rgba(255,255,255,1)',
								fontSize  : 14,
								fontFamily: 'MicrosoftYaHei',
								margin    : 15,
							},
						},
						axisTick   : {
							show: false,
						},
						interval   : 0,
						data       : axisData,
					},
					yAxis  : {
						name     : '',
						type     : 'value',
						max      : maxValue,
						splitLine: {
							show     : true,
							lineStyle: {
								color: 'rgba(233,233,233,0.4)',
								width: 1,
								type : 'solid'
							}
						},
						axisLine : {
							lineStyle: {
								color: '#00FFFF'
							},
							show     : false,
						},
						axisLabel: {
							margin   : 20,
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
						name        : '举报线索',
						type        : 'pictorialBar',
						symbol      : '',
						itemStyle   : {
							normal: {
								color: 'rgba(38,202,252,0.3)'
							}
						},
						symbolRepeat: true,//则一组重复的图形来代表一个数据项。
						symbolSize  : [32, 6],
						symbolMargin: 1,
						z           : -10,
						data        : Array.from({ length: chartData.length }, () => maxValue),
						tooltip     : {
							show: false
						}
					}, {
						name        : '举报线索',
						type        : 'pictorialBar',
						symbol      : '',
						itemStyle   : {
							normal: {
								color: '#26CAFC'
							}
						},
						symbolRepeat: true,
						symbolSize  : [32, 6],
						symbolMargin: 1,
						z           : 10,
						data        : seriesData
					}]
				})
			},

			configMatchIdValue(configList = [], data = {}) {
				return configList.map(i => ({
					...i,
					value: data[i.id]
				}));
			},

			setDialogVisible(name) {
				let data      = [],
					axisKey   = '',
					seriesKey = '';
				switch(name) {
					case '受理信访分流办理件数' : {
						axisKey   = 'city_name';
						seriesKey = 'xfs';
						data      = this.lettersVisitsList;
					}
						break;
					case '举报线索案件办理情况' : {
						axisKey   = 'city_name';
						seriesKey = 'jbxss';
						data      = this.reportCluesList;
					}
				}
				this.dialogContext = {
					name,
					axisKey,
					seriesKey,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart() {
				const { data: chartData, axisKey, seriesKey } = this.dialogContext,
					  { axisData, seriesData }                = this.convertBarData(chartData, axisKey, seriesKey);
				this.dialogBarChart                           = ECharts.init(this.$refs.dialogChart);

				this.dialogBarChart.setOption({
					tooltip   : {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter  : '{b}:{c}'
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
			convertBarData(chartData, axisKey, seriesKey) {
				const axisData   = [],
					  seriesData = chartData.map((i) => {
						  axisData.push(i[axisKey]);
						  return {
							  name : i[axisKey],
							  value: i[seriesKey],
							  ...i,
						  }
					  });
				return {
					axisData,
					seriesData,
				};
			},
			...mapActions('prosecution', ['initMapState']),
			...mapActions('prosecution', ['setMapData']),
		},
		mixins    : [triggerMixin, mapComponentState],
		components: {
			BoxHead,
			BjMap,
			PenalGauge,
			WaterPolo,
			JudicialTitle,
		},
	}
</script>
<style lang="scss" scoped>
    .shadow-line {
        position: relative;
        height: 28px;
        background-color: rgba(17, 198, 255, 0.2);
        overflow: hidden;
        .full-line {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: rgba(17, 198, 255, 1);
        }
    }

    .outer-control-page {
        width: 100%;
        height: 100%;
        display: flex;
        .control-page-left {
            display: flex;
            width: 1228px;
            .left-left {
                position: relative;
                .appeal-box, .sue-box {
                    width: 594px;
                    .box-content {
                        margin-top: 40px;
                        display: flex;
                        justify-content: space-around;
                        color: rgba(255, 255, 255, 1);
                        height: 170px;
                        li {
                            width: 134px;
                            height: 134px;
                            border-radius: 50%;
                            p:nth-of-type(1) {
                                border-radius: 50%;
                                text-align: center;
                                line-height: 134px;
                                margin-bottom: 20px;
                                font-size: 22px;
                                color: #0BFFDD;
                            }
                            p:nth-child(2) {
                                white-space: nowrap;
                                font-size: 16px;
                            }
                        }
                    }
                }
                .appeal-box {
                    .box-content {
                        height: 230px;
                    }
                }
                .performance-box {
                    width: 594px;
                    .performance-table {
                        width: 502px;
                        height: 192px;
                        margin: 34px auto;
                        tr {
                            td {
                                width: 167px;
                                height: 64px;
                                line-height: 64px;
                                text-align: center;
                                border: 1px solid rgba(7, 141, 153, 1);
                                font-size: 18px;
                                &:nth-of-type(1) {
                                    color: #FFFFFF;
                                }
                                &:nth-of-type(2) {
                                    color: #F7931E;
                                }
                                &:nth-of-type(3) {
                                    color: #00FFFF;
                                }
                            }
                        }
                    }
                }
            }
            .left-right {
                margin-left: 20px;
                .court-box {
                    width: 593px;
                    margin-bottom: 20px;
                    .court-chart {
                        width: 100%;
                        height: 406px;
                    }
                }
                .office-box {
                    width: 594px;
                    .office-list {
                        margin: 64px 0 0 36px;
                        li {
                            margin-bottom: 41px;
                            & > p {
                                color: #FFFFFF;
                            }
                            .office-data {
                                display: flex;
                                align-items: center;
                                margin-top: 10px;
                                span {
                                    margin-left: 15px;
                                    color: #11C6FF;
                                }
                            }
                        }
                    }
                }
            }
        }
        .control-page-center {
            width: 1230px;
            min-width: 1230px;
            height: 950px;
        }
        .control-page-right {
            width: 1150px;
            display: flex;
            .petition-letter-box {
                width: 593px;
                height: 900px;
                .more-text-btn {
                    margin: 20px 40px 0 0;
                }
                .pl-list-title {
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    color: rgba(30, 239, 247, 1);
                    text-align: center;
                    margin: 28px 0;
                }
                .pl-list {
                    width: 570px;
                    margin: 0 auto;
                    li {
                        margin-bottom: 40px;
                        display: flex;
                        align-items: center;
                        .pl-name {
                            display: inline-block;
                            width: 105px;
                            font-size: 16px;
                            color: #fff;
                            line-height: 22px;
                            text-align: right;
                        }
                        .pl-line {
                            width: 280px;
                            height: 10px;
                            margin: 0 20px;
                            border-radius: 10px;
                            .full-line {
                                border-radius: 10px;
                                background: linear-gradient(to left, rgba(65, 243, 253, 1), rgba(0, 159, 232, 1));
                            }
                        }
                        span {
                            color: #31DCFF;
                        }
                    }
                }
            }
            .right-right {
                width: 547px;
                .report-clues-box {
                    .rc-list-title {
                        text-align: center;
                        font-size: 18px;
                        color: rgba(30, 239, 247, 1);
                        line-height: 24px;
                    }
                    .rc-chart {
                        width: 547px;
                        height: 250px;
                    }
                }
                .compensate-box {
                    height: 259px;
                    .compensate-list {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 21px;
                        li {
                            width: 137px;
                            text-align: center;
                            .custom-block {
                                color: #FFFFFF;
                                font-size: 16px;
                                .pay-icon {
                                    width: 84px;
                                    height: 84px;
                                    margin: 0 auto;
                                }
                                .number {
                                    margin: 13px 0 9px;
                                    font-size: 22px;
                                }
                                .title {
                                    width: 70px;
                                    margin: 0 auto;
                                }
                            }
                            /deep/ .water-title {
                                width: 70px;
                            }
                        }
                    }
                }
                .salvation-box {
                    .salvation-list{
                        width: 500px;
                        margin: 20px auto 0;
                        li{
                            display: flex;
                            p{
                                flex: 1;
                                height: 60px;
                                line-height: 60px;
                                text-align: center;
                                color: #ffffff;
                                border:1px solid rgba(65,243,253,1);
                            }
                        }
                    }
                    .number-text{
                        color: #FF690E !important;
                    }
                }
            }
        }
    }
</style>
