<template>
    <div class="criminal-page-left">
        <div class="left-left">
            <div class="left-group">
                <div class="accept-total-box">
                    <box-head title="案件受理数"></box-head>
                    <p class="accept-sub-title">案件总数</p>
                    <ul class="case-num-block">
                        <li v-for="(item,index) in caseList" :key="index">{{item}}</li>
                    </ul>
                    <div ref="caseStatistics" class="case-chart"></div>
                </div>
                <div class="examine-box">
                    <box-head title="审查逮捕情况"></box-head>
                    <ul class="examine-list">
                        <li><label>批准逮捕人数：</label><i>{{ examineData.pzdbrs }}</i></li>
                        <li><label>不批准逮捕人数：</label><i>{{ examineData.bpzdbrs }}</i></li>
                        <li><label>不逮捕人数：</label><i>{{ examineData.bbrs }}</i></li>
                    </ul>
                    <div ref="examineChart" class="examine-chart"></div>
                </div>
            </div>
            <div class="fchc-box">
                <box-head title="案件受理数(同比)"></box-head>
                <p class='more-btn' @click="setDialogVisible('案件受理数(同比)')">更多>></p>
                <div class="fchc-chart" ref="fchcChart"></div>
            </div>
        </div>
        <div class="left-right">
            <div class="per-capita-box">
                <box-head title="不起诉人数"></box-head>
                <p class="more-text-btn" @click="setDialogVisible('不起诉人数')">更多>></p>
                <div ref="perCapitaChart" class="per-capita-chart"></div>
            </div>
            <div class="case-average-box">
                <box-head title="不捕人数"></box-head>
                <p class="more-text-btn" @click="setDialogVisible('不捕人数')">更多>></p>
                <div ref="caseAverageChart" style="width: 100%; height: 500px"></div>
            </div>
        </div>
        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
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
	import { mapGetters, mapActions }                                   from 'vuex';
	import ECharts                                                      from 'echarts';
	import * as services                                                from '../service';
	import { fillZero, verifyTriggerState, convertData, textFormatter } from "@/utlis/helper";
	import { acceptCaseChartConfig, reviewArrestConfig }                from '../constant';
	import BoxHead                                                      from '@/components/common/box-head';

	export default {
		data() {
			return {
				caseTotal    : 0,
				examineData  : {
					pzdbrs : 0,
					bpzdbrs: 0,
					bbrs   : 0,
				},
				dialogVisible: false,
				dialogContext: {
					name  : '',
					idKey : '',
					valKey: '',
					data  : []
				},
			}
		},
		computed  : {
			caseList() {
				return `${fillZero(this.caseTotal, 4)}`.split('');
			},
			...mapGetters('penal', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger              = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState      = {};
			this.fchcList             = [];
			this.capitaSettlementList = [];      // 不起诉人数
			this.averageHandCasesList = [];      // 不捕人数
			this.dialogBarChart       = null;
		},
		mounted() {
			const params          = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState  = params;
			this.caseStatistics   = ECharts.init(this.$refs.caseStatistics);
			this.examineChart     = ECharts.init(this.$refs.examineChart);
			this.fchcChart        = ECharts.init(this.$refs.fchcChart);
			this.perCapitaChart   = ECharts.init(this.$refs.perCapitaChart);
			this.caseAverageChart = ECharts.init(this.$refs.caseAverageChart);

			this.requestReviewArrestCount(params);
			this.requestAcceptCase(params);
			this.requestReviewArrest(params);
			this.requestFastHandleCaseCity(params);
			this.requesterCapitaSettlementList(params);
			this.requestAverageHandlingOfCasesList(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestReviewArrestCount(params);
				this.requestAcceptCase(params);
				this.requestReviewArrest(params);
				this.requestFastHandleCaseCity(params);
				this.requesterCapitaSettlementList(params);
				this.requestAverageHandlingOfCasesList(params);
			}
		},
		methods   : {
			// 受理案件统计
			async requestAcceptCase(params) {
				const res = await services.getAcceptingCases(params);
				if(res.code === 200) {
					const data     = res.data;
					this.caseTotal = acceptCaseChartConfig.reduce((a, b) => a + data[b.id], 0);
					this.loadAcceptCaseChart(data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadAcceptCaseChart(chartData) {
				this.caseStatistics.setOption({
					color  : ['#FBBA18', '#1BC85D', '#009FE8', '#2CDDC0'],
					tooltip: {
						trigger    : 'item',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend : {
						data     : acceptCaseChartConfig.map(i => i.name),
						bottom   : 30,
						width    : 300,
						formatter: '{a|{name}}',
						itemWidth: 15,
						textStyle: {
							color: '#fff',
							rich : {
								a: {
									color   : '#ddd',
									fontSize: 15,
									width   : 95,
									height  : 21,
									padding : [0, 0, 0, 1]
								},
							}
						},
					},
					series : [{
						name     : '受理案件数',
						type     : 'pie',
						radius   : '55%',
						center   : ['50%', '40%'],
						data     : acceptCaseChartConfig.map(i => ({
							name : i.name,
							value: chartData[i.id]
						})),
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
			},

			// 审查逮捕各类犯罪不捕情况总数
			async requestReviewArrestCount(params) {
				const res = await services.getReviewArrestCount(params);
				if(res.code === 200) {
					const data       = res.data;
					this.examineData = {
						pzdbrs : data.pzdbrs,
						bpzdbrs: data.bpzdbrs,
						bbrs   : data.bbrs,
					};
				} else {
					this.$message.error(res.msg);
				}
			},

			// 审查逮捕各类犯罪不捕情况总数
			async requestReviewArrest(params) {
				const res = await services.getReviewArrest(params);
				if(res.code === 200) {
					this.loadReviewArrestChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadReviewArrestChart(chartData) {
				const { axisData, seriesData } = convertData(reviewArrestConfig, chartData);
				this.examineChart.setOption({
					color  : ['#009FE8', '#1BC85D', '#FF6C40', '#17D5E4'],
					tooltip: {
						formatter: (params) => {
							const { marker, name, data } = params;
							return `${marker} ${name}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批准逮捕人数：${data.pzdbrs}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不批准逮捕人数：${data.bpzdbrs} <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不逮捕人数：${data.bbrs}`;
						}
					},
					legend : {
						data     : axisData,
						bottom   : 55,
						width    : 300,
						formatter: '{a|{name}}',
						itemWidth: 15,
						textStyle: {
							color: '#fff',
							rich : {
								a: {
									color   : '#ddd',
									fontSize: 15,
									width   : 95,
									height  : 21,
									padding : [0, 0, 0, 1]
								},
							}
						},
					},
					series : [
						{
							name  : '审查逮捕各类犯罪不捕情况',
							type  : 'pie',
							radius: ['40%', '60%'],
							center: ['50%', '32%'],
							label : {
								normal: {
									show: false,
								},
							},
							data  : seriesData.map((i, index) => ({
								...i,
								name : axisData[index],
								value: 25,
								label: {
									normal  : {
										show    : false,
										position: 'center',
										fontSize: 18,
										color   : '#dfdfdf'
									},
									emphasis: {
										show: true
									}
								}
							}))
						}
					]
				})
			},

			//受理案件增长率最快的省市
			async requestFastHandleCaseCity(params) {
				const res = await services.getIncreaseRateOfAdmissibilityList(params);
				if(res.code === 200) {
					this.fchcList = res.data;
					this.loadFastHandleCaseCityChart(res.data.slice(0, 10));
				} else {
					this.$message.error(res.msg);
				}
			},

			//不起诉人数
			async requesterCapitaSettlementList(params) {
				const res = await services.getPerCapitaSettlementList(params);
				if(res.code === 200) {
					this.capitaSettlementList = res.data;
					this.loadPerCapitaSettlementChart(res.data.slice(0, 6));
				} else {
					this.$message.error(res.msg);
				}
			},
			loadPerCapitaSettlementChart(chartData) {
				const { axisData, seriesData } = this.convertBarData(chartData, 'city_name', 'bqsrs');
				this.perCapitaChart.setOption({
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
						bottom: '25%',
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
							name    : '不起诉人数',
							type    : 'bar',
							barWidth: 22,
							data    : seriesData,
						}
					]
				})
			},

			//不捕人数
			async requestAverageHandlingOfCasesList(params) {
				const res = await services.getAverageHandlingOfCasesList(params);
				if(res.code === 200) {
					this.averageHandCasesList = res.data;
					this.loadAverageHandlingOfCasesChart(res.data.slice(0, 10));
				} else {
					this.$message.error(res.msg);
				}
			},
			loadAverageHandlingOfCasesChart(chartData) {

				const { axisData, seriesData } = this.convertBarData(chartData, 'city_name', 'bbrs');
				this.caseAverageChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'line'
						}
					},
					grid   : {
						left  : '20%',
						right : '2%',
						bottom: '2%',
						top   : "2%",
					},
					legend : {
						show: false
					},
					xAxis  : {
						type     : 'value',
						show     : true,
						splitLine: {
							show: false
						},
						axisLine : {
							show: false
						},
						axisLabel: {
							show: false,
						},
						axisTick : {
							show: false
						},
					},
					yAxis  : {
						type     : 'category',
						data     : axisData,
						inverse  : true,
						axisLabel: {
							textStyle: {
								fontSize: 12,
								color   : '#D5CBE8'
							},
							formatter: (name) => textFormatter(name, 4),
						},
						axisLine : {
							lineStyle: {
								color: '#C4C6CF'
							}
						},
						axisTick : {
							show: false
						}
					},
					series : [
						{
							name     : '不捕人数',
							type     : 'bar',
							barWidth : 22,
							data     : seriesData,
							label    : {
								"normal": {
									"show"    : true,
									"position": "insideRight",
								}
							},
							itemStyle: {
								normal  : {
									color: new ECharts.graphic.LinearGradient(
										0, 0, 0, 1,
										[
											{
												offset: 0,
												color: '#06B5D7'
											},                   //柱图渐变色
											{
												offset: 0.5,
												color: '#44C0C1'
											},                 //柱图渐变色
											{
												offset: 1,
												color: '#71C8B1'
											},                   //柱图渐变色
										]
									)
								},
								emphasis: {
									color: new ECharts.graphic.LinearGradient(
										0, 0, 0, 1,
										[
											{
												offset: 0,
												color: '#71C8B1'
											},                  //柱图高亮渐变色
											{
												offset: 0.7,
												color: '#44C0C1'
											},                //柱图高亮渐变色
											{
												offset: 1,
												color: '#06B5D7'
											}                   //柱图高亮渐变色
										]
									)
								}
							},
						}
					]
				})
			},

			setDialogVisible(name) {
				let data   = [],
					idKey  = '',
					valKey = '';
				switch(name) {
					case '不起诉人数' :
						idKey  = 'city_name';
						valKey = 'bqsrs';
						data   = this.capitaSettlementList;
						break;
					case '不捕人数':
						idKey  = 'city_name';
						valKey = 'bbrs';
						data   = this.averageHandCasesList;
						break;
					case '案件受理数(同比)':
						idKey  = 'csmc';
						valKey = 'slajzcl';
						data   = this.fchcList;
						break;
				}
				this.dialogContext = {
					name,
					idKey,
					valKey,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart() {
				const { data: chartData, idKey, valKey } = this.dialogContext,
					  { axisData, seriesData }           = this.convertBarData(chartData, idKey, valKey);
				this.dialogBarChart                      = ECharts.init(this.$refs.dialogChart);

				this.dialogBarChart.setOption({
					tooltip   : {
						show: false
					},
					legend    : {
						show: false
					},
					grid      : {
						top   : '5%',
						left  : '5%',
						right : '5%',
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
			convertBarData(chartData = [], idKey, valKey) {
				const axisData   = [],
					  seriesData = chartData.map((i) => {
						  axisData.push(i[idKey]);
						  return {
							  name : i[idKey],
							  value: i[valKey],
						  }
					  });
				return {
					axisData,
					seriesData
				};
			},
			loadFastHandleCaseCityChart(chartData) {
				const axisData   = [],
					  seriesData = chartData.map(i => {
						  axisData.push(i.csmc);
						  return {
							  name : i.csmc,
							  value: i.slajzcl
						  }
					  });
				this.fchcChart.setOption({
					legend : {
						show: false
					},
					tooltip: {
						formatter: (params) => {
							if(params.seriesName === 'bg') {
								return '';
							} else {
								const { marker, name, seriesName, value } = params;
								return `${marker} ${name}<br/>${seriesName}：${value}%`;
							}
						}
					},
					xAxis  : {
						data     : axisData,
						axisLine : {
							lineStyle: {
								width: 2,
								color: '#0767D1'
							}
						},
						splitLine: { show: false },
						splitArea: { show: false },
						axisTick : { show: false },
						axisLabel: {
							color   : '#00FFFF',
							interval: 0
						},
					},
					yAxis  : {
						splitArea: { show: false },
						splitLine: {
							show    : false,
							interval: 1
						},
						axisLabel: {
							color    : '#fff',
							formatter: val => `${val}%`,
						},
						axisTick : { show: false },
						axisLine : { show: false }
					},
					grid   : {
						left  : 50,
						bottom: 50,
						right : 15,
						top   : 30
					},
					series : [{
						name     : 'bg',
						type     : 'bar',
						stack    : 'bg',
						barGap   : '-100%',
						barWidth : 20,
						itemStyle: {
							normal: {
								color  : '#0767D1',
								opacity: '.2',
							}
						},
						data     : (new Array(axisData.length)).fill(100)
					}, {
						name     : 'bg',
						type     : 'bar',
						stack    : 'bg',
						barGap   : '-100%',
						barWidth : 20,
						itemStyle: {
							normal: {
								color  : '#0767D1',
								opacity: '.2',
							}
						},
						data     : (new Array(axisData.length)).fill(-100)
					}, {
						name     : '受理案件增长率',
						type     : 'bar',
						data     : seriesData,
						barWidth : 20,
						itemStyle: {
							normal: {
								color: '#30E2E2',
							}
						},
					}]
				})
			},

		},
		components: {
			BoxHead
		}
	}
</script>

<style lang="scss" scoped>
    .criminal-page-left {
        display: flex;
        height: 100%;
        .left-left {
            width: 739px;
            margin-right: 10px;
            position: relative;
            .left-group {
                width: 740px;
                display: flex;
            }
            .accept-total-box {
                position: relative;
                width: 386px;
                .accept-sub-title {
                    margin-top: 17px;
                    text-align: center;
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    color: rgba(27, 195, 234, 1);
                    line-height: 24px;
                }
                .case-num-block {
                    display: flex;
                    justify-content: center;
                    color: #1BC3EA;
                    margin-top: 6px;
                    li {
                        border: 1px solid #1BC3EA;
                        padding: 0 5px;
                    }
                }
                .case-chart {
                    width: 100%;
                    height: 350px;
                }
            }
            .examine-box {
                width: 340px;
                .examine-list {
                    width: 250px;
                    margin: 16px auto;
                    li {
                        line-height: 21px;
                        label {
                            width: 150px;
                            display: inline-block;
                            font-size: 16px;
                            color: rgba(49, 219, 232, 1);
                            line-height: 21px;
                        }
                        i {
                            font-size: 16px;
                        }
                        i:nth-of-type(1) {
                            color: rgba(251, 186, 24, 1);
                            line-height: 21px;
                            margin-right: 20px;
                        }
                        i:nth-of-type(2) {
                            color: rgba(49, 219, 232, 1);
                        }
                    }
                }
                .examine-chart {
                    width: 100%;
                    height: 350px;
                }
            }
        }
        .fchc-box {
            width: 739px;
            position: relative;
            .fchc-chart {
                width: 100%;
                height: 370px;
                margin: 0 auto;
            }
            .picker-btn-group {
                display: flex;
                justify-content: flex-end;
                .fchc-btn {
                    margin-left: 7px;
                    color: #FFFFFF;
                    background-color: #00BEDD;
                    text-align: center;
                    &.fchc-icon {
                        display: inline-block;
                        width: 25px;
                        height: 25px;
                        line-height: 25px;
                        border-radius: 4px;
                        cursor: pointer;
                        &:hover {
                            box-shadow: 0 0 5px rgba(233, 233, 233, .5);
                        }
                    }
                    &.fchc-block {
                        padding: 2px 7px;
                        border-radius: 4px;
                    }
                }
            }
        }
        .left-right {
            width: 544px;
            .per-capita-box {
                .per-capita-chart {
                    width: 100%;
                    height: 275px;
                }
            }
            /*.case-average-box {
                width: 464px;
            }*/
        }
    }
</style>