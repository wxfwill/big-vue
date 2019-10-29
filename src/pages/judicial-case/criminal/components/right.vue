<template>
    <div class="criminal-page-right">
        <div class="right-left">
            <div class="increase-top">
                <box-head title=" 起诉罪名TOP10变化情况(同比)"></box-head>
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
                    <box-head title="犯罪嫌疑人年龄分布"></box-head>
                    <div ref="crimeAgeChart" class="age-pie-chart"></div>
                </div>
                <div class="education-box">
                    <box-head title="犯罪嫌疑人受教育状况"></box-head>
                    <div ref="educationChart" class="education-chart"></div>
                </div>
                <div class="duty-crime-box">
                    <box-head title="职务犯罪职级情况"></box-head>
                    <div ref="dutyCrime" class="duty-crime-chart"></div>
                </div>
                <div class="verdict-box">
                    <box-head title="捕后判决情况"></box-head>
                    <div ref="judgmentChart" class="judgment-chart"></div>
                </div>
            </div>
        </div>
        <div class="right-right">
            <div class="public-pro-status">
                <box-head title="公诉业务情况"></box-head>
                <div class="public-pro-info">
                    <p><span>办结总数:</span> <span>{{ publicProInfo.gsglyebjhj }}</span></p>
                    <p><span>结案率:</span> <span>{{ publicProInfo.gsbjbl }}%</span></p>
                </div>
                <div class="public-pro-chart" ref="publicProChart"></div>
            </div>
            <div class="prosecute-box">
                <box-head title="起诉案件情况"></box-head>
                <ul class="prosecute-list">
                    <li v-for="(item,index) in prosecutionCaseList" :key="index">
                        <div class="prosecute-title">
                            <i class="numberical" :style="{ backgroundColor: index < 3 ? '#FBBA18' : '#00BEDD' }">{{index+1}}</i>
                            <span class="prosecute-text text-ellipsis" :title="item.qszm">{{item.qszm}}</span>
                        </div>
                        <p :class="{ 'top-three-color': index < 3, 'general-color' : index >= 3 }">
                            <span class="number">{{item.qssl}}</span>
                            <span class="ratio-text text-interval">{{item.qszm_zb}}%</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
    </div>
</template>

<script>
	import { mapGetters }                                               from 'vuex';
	import ECharts                                                      from 'echarts';
	import * as services                                                from '../service';
	import { fillZero, verifyTriggerState, convertData, textFormatter } from "@/utlis/helper";
	import BoxHead                                                      from '@/components/common/box-head';
	import {
		crimeAgeConfig, dutyCrimeConfig, judgmentChartConfig,
		educationLevelConfig, prosecutionBusinessConfig
	}                                                                   from '../constant/';

	export default {
		data() {
			return {
				increaseTopTenList      : [],
				capitaSettlementList    : [],
				averageHandlingCasesList: [],
				publicProInfo           : {
					gsglyebjhj: 0,
					gsbjbl    : 0,
				},
				prosecutionCaseList     : [],
			}
		},
		computed  : {
			...mapGetters('penal', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger              = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState      = {};
		},
		mounted() {
			const params          = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState  = params;
			this.crimeAgeChart    = ECharts.init(this.$refs.crimeAgeChart);
			this.dutyCrimeChart   = ECharts.init(this.$refs.dutyCrime);
			this.judgmentChart    = ECharts.init(this.$refs.judgmentChart);
			this.educationChart   = ECharts.init(this.$refs.educationChart);
			this.publicProChart   = ECharts.init(this.$refs.publicProChart);

			this.requestIncreaseRateOfChargesList(params);
			this.requestAgeDistributionOfCrime(params);
			this.requestEducationLevel(params);
			this.requestDutyCrime(params);
			this.requestEffectiveJudgement(params);
			this.requestProsecutionCaseList(params);
			this.requestPublicProsecutionBusiness(params);
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
				this.requestProsecutionCaseList(params);
				this.requestPublicProsecutionBusiness(params);
			}
		},
		methods   : {
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
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
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
							color     : '#fff',
							interval  : 0,
							width     : 20,
							fontSize  : 14,
							lineHeight: 21,
							fontFamily: 'PingFangSC-Regular',
							formatter : (name) => textFormatter(name, 3),
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

			//公诉各类业务受理情况
			async requestPublicProsecutionBusiness(params) {
				const res = await services.getPublicProsecutionBusiness(params);
				if(res.code === 200) {
					const data         = res.data;
					this.publicProInfo = {
						gsglyebjhj: data.gsglyebjhj,
						gsbjbl    : data.gsbjbl,
					};
					this.loadPublicProsecutionBusiness(data);
				} else {
					this.$message.error(res.msg);
				}
			},
			loadPublicProsecutionBusiness(chartData) {
				const { axisData, seriesData } = convertData(prosecutionBusinessConfig, chartData);
				this.publicProChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						top         : '15%',
						left        : 40,
						right       : 20,
						bottom      : 20,
						containLabel: true,
					},
					legend : {
						show: false,
					},
					xAxis  : {
						data     : axisData,
						axisTick : {
							show: false,
						},
						axisLabel: {
							interval  : 0,
							width     : 20,
							color     : '#31DBE8',
							fontSize  : 14,
							lineHeight: 21,
							fontFamily: 'PingFangSC-Regular',
							formatter : (name) => textFormatter(name, 2),
						},
						axisLine : {
							lineStyle: {
								type : 'solid',
								color: '#fff',
								width: 1,                                                //坐标线的宽度
							}
						},
					},
					yAxis  : {
						splitLine: {
							show     : true,
							lineStyle: {
								color: '#40A1EA',                                         //网格横线颜色
								width: 1,
								type : 'solid'
							}
						},
						axisLabel: {
							textStyle: {
								color   : '#ddd',
								fontSize: 14,
							}
						},
						axisLine : {
							show: false,
						},
					},
					series : [{
						name     : '公诉各类业务受理情况',
						type     : 'bar',
						barWidth : 30,
						data     : seriesData,
						itemStyle: {
							normal  : {
								color: new ECharts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{
											offset: 0,
											color : '#06B5D7'
										},                   //柱图渐变色
										{
											offset: 0.5,
											color : '#44C0C1'
										},                 //柱图渐变色
										{
											offset: 1,
											color : '#71C8B1'
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
											color : '#71C8B1'
										},                  //柱图高亮渐变色
										{
											offset: 0.7,
											color : '#44C0C1'
										},                //柱图高亮渐变色
										{
											offset: 1,
											color : '#06B5D7'
										}                   //柱图高亮渐变色
									]
								)
							}
						},
					}]
				})
			},

			// 起诉案件罪名数量及占比
			async requestProsecutionCaseList(params) {
				const res = await services.getProsecutionCaseList(params);
				if(res.code === 200) {
					this.prosecutionCaseList = res.data;
				} else {
					this.$message.error(res.msg);
				}
			}
		},
		components: {
			BoxHead
		}
	}
</script>

<style lang="scss" scoped>
    .criminal-page-right {
        display: flex;
        .right-left {
            width: 739px;
            .increase-top {
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
                            width: 450px;
                            height: 8px;
                            background: rgba(110, 110, 110, 0.4);
                            border-radius: 5px;
                            .progress {
                                width: 0;
                                max-width: 450px;
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
        }
        .right-right {
            width: 500px;
            .public-pro-status {
                width: 100%;
                .public-pro-info {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 14px;
                    p {
                        margin-right: 20px;
                        span {
                            &:nth-of-type(1) {
                                color: #31DBE8;
                            }
                            &:nth-of-type(2) {
                                color: #FBBA18;
                            }
                        }
                    }
                }
                .public-pro-chart {
                    width: 100%;
                    height: 300px;
                    margin: 0 auto;
                }
            }
            .prosecute-box {
                position: relative;
                width: 100%;
                padding: 10px 0;
                .prosecute-list {
                    overflow: auto;
                    padding-right: 40px;
                    li {
                        width: 91%;
                        height: 50px;
                        float: right;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px dashed #00A0E9;
                        .prosecute-title {
                            color: #dfdfdf;
                            .numberical {
                                display: inline-block;
                                width: 19px;
                                height: 19px;
                                margin-left: -25px;
                                margin-right: 5px;
                                text-align: center;
                                line-height: 20px;
                                border-radius: 50%;
                                font-size: 0.286vw;
                                color: #fff;
                            }
                            .prosecute-text {
                                display: inline-block;
                                width: 250px;
                            }
                        }
                        p {
                            color: #FBBA18;
                        }
                    }
                }
            }
        }
    }
</style>