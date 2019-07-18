<template>
    <div class="criminal-page-right">
        <div class="right-left">
            <div class="increase-top">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>罪名增长率 TOP10</i>
                </div>
                <ul class="increase-content">
                    <li v-for="(item,index) in increaseTopTenList" :key="index">
                        <p class="increase-title text-ellipsis" :title="item.zm">{{ item.zm }}</p>
                        <div class="progress-bg">
                            <p class="progress"
                               :style="{ width: `${Math.abs(item.zmzcl) / 100 * 450}px`, float: item.zmzcl < 0 ? 'right' : 'left', }"></p>
                        </div>
                        <p class="ratio-text">{{ item.zmzcl }}%</p>
                    </li>
                </ul>
            </div>
            <div class="right-left-bottom">
                <div class="age-pie">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>犯罪嫌疑人年龄分布</i>
                    </div>
                    <div ref="crimeAgeChart" class="age-pie-chart"></div>
                </div>
                <div class="education-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受教育状况</i>
                    </div>
                    <div ref="educationChart" class="education-chart"></div>
                </div>
                <div class="duty-crime-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>职务犯罪人数</i>
                    </div>
                    <div ref="dutyCrime" class="duty-crime-chart"></div>
                </div>
                <div class="verdict-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>判决生效人数</i>
                    </div>
                    <div ref="judgmentChart" class="judgment-chart"></div>
                </div>
            </div>
        </div>
        <div class="right-right">
            <div class="per-capita-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>人均办结数</i>
                </div>
                <p class="more-text-btn" @click="setDialogVisible('人均办结数')">更多>></p>
                <div ref="perCapitaChart" class="per-capita-chart"></div>
            </div>
            <div class="case-average-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>案均办结天数</i>
                </div>
                <p class="more-text-btn" @click="setDialogVisible('案均办结天数')">更多>></p>
                <div ref="caseAverageChart" style="width: 100%; height: 500px"></div>
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
	import { mapGetters }                                                                 from 'vuex';
	import ECharts                                                                        from 'echarts';
	import * as services                                                                  from '../service';
	import { fillZero, verifyTriggerState, convertData }                                  from "@/utlis/helper";
	import { crimeAgeConfig, dutyCrimeConfig, judgmentChartConfig, educationLevelConfig } from '../constant';

	export default {
		data() {
			return {
				increaseTopTenList      : [],
				capitaSettlementList    : [],
				averageHandlingCasesList: [],
				dialogVisible           : false,
				dialogContext           : {
					name: '',
					key : '',
					data: []
				}
			}
		},
		computed: {
			caseList() {
				return `${fillZero(this.caseTotal, 4)}`.split('');
			},
			...mapGetters('penal', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger              = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState      = {};
			this.capitaSettlementList = [];      // 人均办结数列表
			this.averageHandCasesList = [];      // 案均办结数
			this.dialogBarChart       = null;
		},
		mounted() {
			const params          = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState  = params;
			this.crimeAgeChart    = ECharts.init(this.$refs.crimeAgeChart);
			this.dutyCrimeChart   = ECharts.init(this.$refs.dutyCrime);
			this.judgmentChart    = ECharts.init(this.$refs.judgmentChart);
			this.perCapitaChart   = ECharts.init(this.$refs.perCapitaChart);
			this.caseAverageChart = ECharts.init(this.$refs.caseAverageChart);
			this.educationChart   = ECharts.init(this.$refs.educationChart);

			this.requestIncreaseRateOfChargesList(params);
			this.requestAgeDistributionOfCrime(params);
			this.requestEducationLevel(params);
			this.requestDutyCrime(params);
			this.requestEffectiveJudgement(params);
			this.requesterCapitaSettlementList(params);
			this.requestAverageHandlingOfCasesList(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestIncreaseRateOfChargesList(params);
				this.requestEducationLevel(params);
				this.requestAgeDistributionOfCrime(params);
				this.requestDutyCrime(params);
				this.requestEffectiveJudgement(params);
				this.requesterCapitaSettlementList(params);
				this.requestAverageHandlingOfCasesList(params);
			}
		},
		methods : {
			async requestIncreaseRateOfChargesList(params) {
				const res = await services.getIncreaseRateOfChargesList(params);
				if(res.code === 200) {
					this.increaseTopTenList = res.data;
				} else {
					this.increaseTopTenList = [];
					this.$message.error(res.msg);
				}
			},

			// 犯罪嫌疑人年龄分布
			async requestAgeDistributionOfCrime(params) {
				const res = await services.getAgeDistributionOfCrime(params);
				if(res.code === 200) {
					this.loadAgeDistributionChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadAgeDistributionChart(chartData) {
				this.crimeAgeChart.setOption({
					color  : ['#81D32A', '#31B1DD', '#DBA62E', '#942BD8', '#2F9DE0', '#2FE0BE'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						show: false
					},
					series : [
						{
							name     : '犯罪嫌疑人年龄分布',
							type     : 'pie',
							radius   : '70%',
							center   : ['50%', '50%'],
							data     : crimeAgeConfig.map((i) => ({
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
						}
					]
				})
			},

			//受教育状况
			async requestEducationLevel(params) {
				const res = await services.getEducationLevel(params);
				if(res.code === 200) {
					this.loadEducationLevel(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadEducationLevel(chartData) {
				this.educationChart.setOption({
					tooltip: {
						formatter({ marker, name, value, percent }) {
							return `${marker}  ${name} <br />  数量：${value}人   ${percent}%`;
						}
					},
					legend : {
						show: false
					},
					series : [{
						type           : 'pie',
						radius         : [30, 80],
						center         : ['50%', '52%'],
						roseType       : 'radius',
						color          : ['#00FFF8', '#FBBA18', '#15D4EA', '#18D660', '#FF6C40', '#23A4E5', '#F6B420',
										  '#1DDA31', '#F18126', '#00FFF8'],
						data           : educationLevelConfig.map(i => ({
							name : i.name,
							value: chartData[i.id]
						})),
						label          : {
							normal: {
								textStyle: {
									fontSize: 14
								}
							}
						},
						labelLine      : {
							normal: {
								smooth   : true,
								lineStyle: {
									width: 2
								}
							}
						},
						itemStyle      : {
							normal: {
								shadowBlur : 30,
								shadowColor: 'rgba(0, 0, 0, 0.4)'
							}
						},
						animationType  : 'scale',
						animationEasing: 'elasticOut',
						animationDelay : function(idx) {
							return Math.random() * 200;
						}
					}]
				})
			},

			// 职务犯罪
			async requestDutyCrime(params) {
				const res = await services.getDutyCrime(params);
				if(res.code === 200) {
					this.loadDutyCrimeChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadDutyCrimeChart(chartData) {
				const { axisData, seriesData } = convertData(dutyCrimeConfig, chartData);
				this.dutyCrimeChart.setOption({
					color  : ['#17DDDD'],
					tooltip: {
						show: false
					},
					grid   : {
						top   : '15%',
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
								color: '#fff'
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							color   : '#fff',
							interval: 0,
							width     : 20,
							fontSize  : 14,
							lineHeight: 21,
							fontFamily: 'PingFangSC-Regular',
							formatter : (name) => {
								const str   = name;
								let tempStr = '';
								const len   = str.length;
								for(let i = 0; i < len; i++) {
									if((i + 1) % 3 === 0) {
										tempStr += str[i] + '\n';
									} else {
										tempStr += str[i];
                                    }
								}
								return tempStr;
							},
						},
						splitLine: {
							show: false,
						},
					},
					yAxis  : {
						type     : 'value',
						axisLine : {
							show     : true,
							lineStyle: {
								color: '#fff'
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							color: '#fff'
						},
						splitLine: {
							show    : false,
							interval: 0,
						}
					},
					series : [
						{
							name    : '职务犯罪人数',
							type    : 'bar',
							barWidth: 22,
							data    : seriesData,
							label   : {
								"normal": {
									"show"    : true,
									"position": "top",
								}
							},
						}
					]
				})
			},

			// 判决生效人数
			async requestEffectiveJudgement(params) {
				const res = await services.getEffectiveJudgement(params);
				if(res.code === 200) {
					this.loadEffectiveJudgementChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadEffectiveJudgementChart(chartData) {
				const { axisData, seriesData } = convertData(judgmentChartConfig, chartData);
				this.judgmentChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						top   : '15%',
						left  : '15%',
						right : '4%',
						bottom: '15%',
					},
					xAxis  : {
						type     : 'category',
						data     : axisData,
						axisLine : {
							show     : true,
							lineStyle: {
								color: '#fff'
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							color   : '#fff',
							interval: 0,
						},
						splitLine: {
							show    : false,
							interval: 0,
						}
					},
					yAxis  : [{
						type         : "value",
						name         : "",
						nameTextStyle: {
							color: "#ebf8ac"
						},
						splitLine    : {
							show: false
						},
						axisTick     : {
							show: false
						},
						axisLine     : {
							show     : true,
							lineStyle: {
								color: '#fff'
							}
						},
						axisLabel    : {
							show     : true,
							textStyle: {
								color: "#ffffff"
							}
						}
					}, {
						show     : true,
						splitLine: {
							show: false,
						},
						axisLine : {
							show: false
						},
						axisTick : {
							show: false
						},
						axisLabel: {
							show     : false,
							textStyle: {
								color: "#ffffff"
							}
						}
					}],
					series : [{
						name         : "",
						type         : "line",
						yAxisIndex   : 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
						smooth       : false, //平滑曲线显示
						showAllSymbol: false, //显示所有图形。
						symbol       : "none", //标记的图形为实心圆
						itemStyle    : {
							//折线拐点标志的样式
							color: "#058cff"
						},
						lineStyle    : {
							color: "#00fff8"
						},
						areaStyle    : {//分隔区域设置
							color: "none"
						},
						data         : seriesData
					}, {
						name     : "判决生效人数",
						type     : "bar",
						barWidth : 22,
						itemStyle: {
							normal: {
								color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#05C3E2"
								}, {
									offset: 1,
									color : "#0767D1"
								}])
							}
						},
						data     : seriesData,
						tooltip  : {
							trigger: 'item',
							show   : true,
						}
					}]
				})
			},

			//人均办结数
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
				const { axisData, seriesData } = this.convertBarData(chartData, 'sl');
				this.perCapitaChart.setOption({
					color  : ['#1DB2E8'],
					tooltip: {
						show: true
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
							color   : '#fff',
							interval: 0,
							width     : 20,
							fontSize  : 14,
							lineHeight: 21,
							fontFamily: 'PingFangSC-Regular',
							formatter : (name) => {
								const str   = name;
								let tempStr = '';
								const len   = str.length;
								for(let i = 0; i < len; i++) {
									if((i + 1) % 4 === 0) {
										tempStr += str[i] + '\n';
									} else {
										tempStr += str[i];
									}
								}
								return tempStr;
							},
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

			//案均办结天数
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
				const { axisData, seriesData } = this.convertBarData(chartData, 'sl');
				this.caseAverageChart.setOption({
					color  : ['#009FE8'],
					tooltip: {
						show: false
					},
					grid   : {
						left  : '10%',
						right : '2%',
						bottom: '3%',
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
						axisLabel: {
							textStyle: {
								fontSize: 12,
								color   : '#D5CBE8'
							}
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
							name    : '案均办结数',
							type    : 'bar',
							barWidth: 22,
							data    : seriesData,
							label   : {
								"normal": {
									"show"    : true,
									"position": "insideRight",
								}
							},
						}
					]
				})
			},

			setDialogVisible(name) {
				let data = [],
					key  = '';
				switch(name) {
					case '人均办结数' :
						key  = 'sl';
						data = this.capitaSettlementList;
						break;
					case '案均办结天数':
						key  = 'sl';
						data = this.averageHandCasesList;
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
				this.dialogBarChart            = ECharts.init(this.$refs.dialogChart);

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
								"normal": {
									"show"    : true,
									"position": "top",
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
		},
	}
</script>

<style lang="scss" scoped>
    .criminal-page-right {
        width: 1200px;
        .increase-top {
            width: 739px;
            min-height: 330px;
            .increase-content {
                position: relative;
                margin: 15px 30px 23px 15px;
                &:before {
                    position: absolute;
                    top: 5px;
                    left: 140px;
                    width: 1px;
                    height: 97%;
                    background: linear-gradient(top, #0767D1, #05C3E2);
                    content: '';
                }
                li {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    .increase-title {
                        width: 120px;
                        text-align: right;
                        color: #dfdfdf;
                        margin-right: 41px;
                    }
                    .progress-bg {
                        min-width: 450px;
                        height: 8px;
                        background: rgba(110, 110, 110, 0.4);
                        border-radius: 5px;
                        .progress {
                            width: 0;
                            height: 100%;
                            background: linear-gradient(270deg, rgba(5, 194, 226, 1) 0%, rgba(6, 103, 209, 1) 100%);
                            border-radius: 5px;
                        }
                    }
                    .ratio-text {
                        width: 70px;
                        margin-left: 18px;
                        font-size: 14px;
                        font-family: Helvetica;
                        color: rgba(5, 193, 226, 1);
                        line-height: 17px;
                    }
                }
            }
        }
        .right-left-bottom {
            width: 739px;
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            .age-pie {
                width: 360px;
                margin-bottom: 20px;
                .age-pie-chart {
                    width: 350px;
                    height: 240px;
                    margin: 0 auto;
                }
            }
            .education-box {
                width: 360px;
                .education-chart {
                    width: 100%;
                    height: 240px;
                    margin: 0 auto;
                }
            }
            .duty-crime-box {
                width: 360px;
                .duty-crime-chart {
                    width: 100%;
                    height: 220px;
                }
            }
            .verdict-box {
                width: 360px;
                .judgment-chart {
                    width: 100%;
                    height: 190px;
                }
            }
        }
        .right-right {
            .more-text-btn {
                margin-top: 17px;
                text-align: right;
                font-size: 14px;
                font-family: Helvetica;
                color: rgba(251, 186, 24, 1);
                line-height: 17px;
                cursor: pointer;
            }
            .per-capita-box {
                width: 464px;
                .per-capita-chart {
                    width: 100%;
                    height: 290px;
                }
            }
            .case-average-box {
                width: 464px;
            }
        }
        .per-dialog-chart {
            width: 100%;
            height: 400px;
        }

    }
</style>