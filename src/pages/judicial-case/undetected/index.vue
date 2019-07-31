<template>
    <div>
        <div class="judicial-case-title">
            <i class="title-dot"></i>
            未检
        </div>
        <div class="outer-inspect-page fraze-grid">
            <div class="inspect-page-left">
                <div class="left-top">
                    <div class="investigate-box">
                        <box-head title="审查逮捕"></box-head>
                        <div class="chart-group">
                            <div ref="investigateNumChart" class="chart-box"></div>
                            <div ref="investigatePeopleChart" class="chart-box"></div>
                        </div>
                    </div>
                    <div class="prosecute-box">
                        <box-head title="起诉"></box-head>
                        <ul class="prosecute-info">
                            <li class="text">生效判决人数</li>
                            <li class="number">{{ prosecuteData.sxpjrs }}</li>
                            <li class="text">不起诉率</li>
                            <li class="number">{{ prosecuteData.bqsl }}%</li>
                        </ul>
                        <div class="chart-group">
                            <div ref="prosecuteNumBox" class="chart-box"></div>
                            <div ref="prosecutePeopleBox" class="chart-box"></div>
                        </div>
                    </div>
                </div>
                <div class="left-center">
                    <div class="trend-box">
                        <box-head title="案件受理趋势"></box-head>
                        <div class="trend-chart">
                            <trend-chart
                                    name="案件受理趋势"
                                    :dataIPS="caseAcceptances"
                                    :chartConfig="{ axisKey: 'year', seriesKey: 'sls' }"
                            ></trend-chart>
                        </div>
                    </div>
                    <div class="education-box">
                        <box-head title="犯罪嫌疑人受教育程度"></box-head>
                        <div ref="educationChart" class="education-chart"></div>
                    </div>
                </div>
                <div class="percent-box">
                    <box-head title="未成年人犯罪占总犯罪百分率"></box-head>
                    <p class="more-text-btn" @click="setDialogVisible('未成年人犯罪占总犯罪百分比')">更多>></p>
                    <div ref="percentChart" class="percent-chart"></div>
                </div>
            </div>
            <div class="inspect-page-center">
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
            <div class="inspect-page-right">
                <div class="right-left">
                    <div class="charge-box">
                        <box-head title="罪名占比统计"></box-head>
                        <p class="title">起诉罪名TOP10</p>
                        <p class="label">占比 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次数</p>
                        <ul class="charge-content">
                            <li v-for="(item,index) in prosecuteList" :key="index">
                                <i :style="{ backgroundColor: index < 3 ? '#F7931E': '#00BEDD'  }">{{index+1}}</i>
                                <div class="item-media" :style="{backgroundImage:`url(${lineImg})`}">
                                    <p class="item-title text-ellipsis" :title="item.qszm">{{item.qszm}}</p>
                                    <div class="item-number" :style="{ color: index < 3 ? '#F7931E': '#00BEDD' }">
                                        <span>{{item.zb}}</span>
                                        <span>{{item.qscs}}%</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="crime-age-box">
                        <box-head title="作案年龄分布"></box-head>
                        <ul class="crime-age-content">
                            <li v-for="item in ageCrimeList" :key="item.id">
                                <div class="circle-style hollow-circle"
                                     :style="{ borderColor: `rgba(${item.color}, .4)` }"></div>
                                <div class="circle-style">
                                    <div class="sector-line"
                                         :style="{ borderBottomColor: `rgba(${item.color}, 1)` }"></div>
                                </div>
                                <p class="crime-age-number">{{item.value}}</p>
                                <p class="crime-age-text">{{item.name}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right-right">
                    <div class="no-catch-box">
                        <box-head title="不捕数"></box-head>
                        <ul class="no-catch-list">
                            <li v-for="item in noCatchList" :key="item.id">
                                <p class="nci-name">{{ item.name }}</p>
                                <div class="nci-number">
                                    <p class="line"></p>
                                    <span>{{ item.value }}人</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="sexual-assault-box">
                        <box-head title="近几年未成年人性侵犯罪趋势"></box-head>
                        <div class="sexual-assault-chart">
                            <trend-chart
                                    name="近几年未成年人性侵犯罪趋势"
                                    :dataIPS="crimeInvadingPropertyList"
                                    :chartConfig="{ axisKey: 'year', seriesKey: 'qcs' }"
                            ></trend-chart>
                        </div>
                    </div>
                    <div class="against-property-box">
                        <box-head title="近几年未成年人侵财犯罪趋势"></box-head>
                        <div class="against-property-chart">
                            <trend-chart
                                    name="近几年未成年人侵财犯罪趋势"
                                    :dataIPS="sexualAssaultList"
                                    :chartConfig="{ axisKey: 'year', seriesKey: 'xqs' }"
                                    chartType="bar"
                            ></trend-chart>
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
	import { mapGetters, mapActions }          from 'vuex';
	import ECharts                             from 'echarts';
	import BoxHead                             from '@/components/common/box-head';
	import BjMap                               from '@/components/common/map/index';
	import TrendChart                          from '@/components/common/trend-chart.vue'
	import * as services                       from './service/index';
	import { triggerMixin, mapComponentState } from '@/components/mixin/trigger';
	import {
		verifyTriggerState, fillZero,
		convertData, textFormatter,
		convertLineData,
	}                                          from '@/utlis/helper';
	import {
		investigateNumConfig, investigatePerConfig,
		prosecuteNumConfig, prosecutePeoConfig,
		educationalProcedureConfig, mapTooltipConfig,
		ageCrimeConfig, noCatchNumberConfig
	}                                          from './constant/index';

	export default {
		data() {
			return {
				prosecuteData            : {
					sxpjrs: 0,
					bqsrs : 0,
				},
				caseAcceptances          : [],
				percentCrimeList         : [],
				dialogVisible            : false,
				dialogContext            : {
					name: '',
					key : '',
					data: []
				},
				noCatchList              : noCatchNumberConfig,
				mapTooltipConfig,
				ageCrimeList             : ageCrimeConfig,
				prosecuteList            : [],
				lineImg                  : require('@/public/img/judicature/line.png'),
				crimeInvadingPropertyList: [],
				sexualAssaultList        : []
			}
		},
		computed  : {
			...mapGetters('undetected', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		mounted() {
			const params                = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState        = params;
			this.investigateNumChart    = ECharts.init(this.$refs.investigateNumChart);
			this.investigatePeopleChart = ECharts.init(this.$refs.investigatePeopleChart);
			this.prosecuteNumBox        = ECharts.init(this.$refs.prosecuteNumBox);
			this.prosecutePeopleBox     = ECharts.init(this.$refs.prosecutePeopleBox);
			this.educationChart         = ECharts.init(this.$refs.educationChart);
			this.percentChart           = ECharts.init(this.$refs.percentChart);


			this.requestUndetectedData(params);
			this.requestPercentageOfCrime(params);
			this.requestNoCatchNumber(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;

				this.requestUndetectedData(params);
				this.requestPercentageOfCrime(params);
				this.requestNoCatchNumber(params);
			}
		},
		methods   : {
			async requestUndetectedData(params) {
				const res = await services.getUndetectedData(params);
				if(res.code === 200) {
					const {
							  reviewArrest, prosecution,
							  caseAcceptances, educationalProcedure,
							  topSlBjZb, theMapList, mapSlBjZb,
							  accusationRatioList, ageOfCommittingACrime,
							  crimeOfInvadingPropertyList, sexualAssaultList
						  } = res.data;

					this.prosecuteData             = {
						sxpjrs: prosecution.sxpjrs,
						bqsl  : prosecution.bqsl
					};
					this.caseAcceptances           = caseAcceptances;
					this.prosecuteList             = accusationRatioList;
					this.ageCrimeList              = ageCrimeConfig.map(i => ({
						...i,
						value: ageOfCommittingACrime[i.id]
					}));
					this.crimeInvadingPropertyList = crimeOfInvadingPropertyList;
					this.sexualAssaultList         = sexualAssaultList;

					this.loadPairBarChart(this.investigateNumChart, investigateNumConfig, reviewArrest);
					this.loadPairBarChart(this.investigatePeopleChart, investigatePerConfig, reviewArrest);
					this.loadPairBarChart(this.prosecuteNumBox, prosecuteNumConfig, prosecution);
					this.loadPairBarChart(this.prosecutePeopleBox, prosecutePeoConfig, prosecution);
					this.convertMapHeadData(topSlBjZb);
					this.loadMapContent({ theMapList, ...mapSlBjZb });
					this.loadEducationChart(educationalProcedure || {});
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestPercentageOfCrime(params) {
				const res = await services.getPercentageOfCrime(params);
				if(res.code === 200) {
					this.percentCrimeList = res.data;
					this.loadPercentChart(res.data.slice(0, 16));
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestNoCatchNumber(params) {
				const res = await services.getNoCatchNumber(params);
				if(res.code === 200) {
					const data       = res.data;
					this.noCatchList = noCatchNumberConfig.map(i => ({
						...i,
						value: data[i.id]
					}))
				} else {
					this.$message.error(res.msg);
				}
			},

			/**
			 * 加载审查逮捕和起诉
			 * */
			loadPairBarChart(chartInstance, chartConfig, chartData) {
				chartInstance.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend : {
						show      : true,
						left      : '35%',
						bottom    : '5%',
						data      : chartConfig.map(i => i.name),
						itemWidth : 12,
						itemHeight: 12,
						textStyle : {
							color   : '#ffffff',
							fontSize: '12'
						}
					},
					grid   : {
						top         : '15%',
						left        : '1%',
						right       : '0%',
						bottom      : '25%',
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
							margin   : 20,
							show     : false,
							textStyle: {
								color   : 'rab(255,255,255,1)',
								fontSize: 16,
							},
						},
						axisTick   : {
							show: false,
						},
						data       : ['批捕件数'],
					},
					yAxis  : {
						name     : '',
						type     : 'value',
						min      : 0,
						show     : false,
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
					series : chartConfig.map(i => ({
						name     : i.name,
						type     : 'bar',
						label    : {//柱状头部出现数值
							show     : true,
							position : 'top',
							textStyle: {
								color   : '#dfdfdf',
								fontSize: 10
							}
						},
						barWidth : 20,
						barGap   : '120%',
						itemStyle: {
							normal: {
								color: i.color
							}
						},
						data     : [chartData[i.id]]
					}))
				});
			},

			// 犯罪嫌疑人受教育程度
			loadEducationChart(chartData) {
				const legendData = [],
					  seriesData = educationalProcedureConfig.map((i) => {
						  legendData.push(i.name);
						  return {
							  name : i.name,
							  value: chartData[i.id] || 0,
						  }
					  });
				this.educationChart.setOption({
					color  : ['#F78350', '#26A3EF', '#31DBE8', '#2CE2A7', '#EAD61F', '#F7931E'],
					tooltip: {
						trigger: 'item',
					},
					legend : {
						orient    : 'vertical',
						right     : '15%',
						bottom    : '8%',
						itemGap   : 15,
						data      : legendData,
						itemWidth : 12,
						itemHeight: 12,
						textStyle : {
							color   : '#ffffff',
							fontSize: '14'
						}
					},
					series : [{
						name  : '犯罪嫌疑人受教育程度',
						type  : 'pie',
						radius: '70%',//数组时内，外
						center: ['40%', '55%'],//x，y
						label : {            //饼图图形上的文本标签
							normal: {
								show     : true,
								// position:'inner', //标签的位置
								textStyle: {
									color   : 'rgba(255,255,255,1)',
									fontSize: 16    //文字的字体大小
								},
								formatter: '{d}%'
							}
						},
						data  : seriesData
					}]
				});
			},

			// 未成年人犯罪占总犯罪百分率
			loadPercentChart(chartData) {
				this.percentChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter  : (params) => {
							const { marker, name, value, data } = params[0];
							return `${marker}  ${name}<br/> 受理案件数：${data.wcn_sls}<br/> 百分率：${value}%`;
						}
					},
					grid   : {
						top         : 20,
						left        : '3%',
						right       : 20,
						bottom      : 40,
						containLabel: true,
					},
					xAxis  : {
						name       : '',
						type       : 'category',
						boundaryGap: true,
						axisLine   : { //坐标轴轴线相关设置。数学上的x轴
							show     : true,
							lineStyle: {
								color: '#00FFFF'
							},
						},
						axisLabel  : { //坐标轴刻度标签的相关设置
							margin   : 15,
							textStyle: {
								color   : 'rab(255,255,255,1)',
								fontSize: 16,
							},
							interval : 0
						},
						axisTick   : {
							show: false,
						},
						data       : chartData.map(i => i.city_name),
					},
					yAxis  : {
						name     : '',
						type     : 'value',
						splitLine: {
							show: false
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
							formatter: '{value} %'
						},
						axisTick : {
							show: false,
						},
					},
					series : [{
						name     : '未成年人犯罪占比',
						type     : 'bar',
						label    : {
							show     : true,
							position : 'top',
							formatter: '{c}%',
							textStyle: {
								color   : 'rgba(5,195,255,1)',
								fontSize: 16
							}
						},
						barWidth : 20,
						itemStyle: {
							normal: {
								color: '#11C6FF'
							}
						},
						data     : chartData.map(i => ({
							name   : i.city_name,
							value  : i.bfl,
							wcn_sls: i.wcn_sls,
						}))
					}
					]
				});
			},

			setDialogVisible(name) {
				let data = [],
					key  = '';
				switch(name) {
					case '未成年人犯罪占总犯罪百分比' :
						key  = 'bfl';
						data = this.percentCrimeList;
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
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter  : (params) => {
							const { name, value, data } = params[0];
							return `${name}<br/> 受理案件数：${data && data.wcn_sls}<br/> 百分率：${value}%`;
						}
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
							  value: i[key],
							  ...i,
						  }
					  });
				return {
					axisData,
					seriesData,
				};
			},
			...mapActions('undetected', ['initMapState']),
			...mapActions('undetected', ['setMapData']),
		},
		mixins    : [triggerMixin, mapComponentState],
		components: {
			BjMap,
			TrendChart,
			BoxHead,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-inspect-page {
        .inspect-page-left {
            position: relative;
            width: 1234px;
            .left-top {
                width: 100%;
                display: flex;
                .investigate-box, .prosecute-box {
                    width: 593px;
                    height: 300px;
                }
                .prosecute-box {
                    position: relative;
                    .prosecute-info {
                        position: absolute;
                        right: -100px;
                        top: 60px;
                        min-width: 80px;
                        li {
                            margin: 10px 0;
                            text-align: center;
                        }
                        .number {
                            margin: 0 auto;
                            line-height: 18px;
                            text-align: center;
                            padding: 4px;
                            background-color: rgba(0, 255, 248, .2);
                            border-radius: 20px;
                            color: #FF6C40;
                        }
                        .text {
                            color: #0AF1FF;
                            margin-top: 20px;
                        }
                    }
                }
                .chart-group {
                    display: flex;
                    .chart-box {
                        width: 280px;
                        height: 257px;
                    }
                }
            }
            .left-center {
                display: flex;
                .trend-box {
                    width: 594px;
                    .trend-chart {
                        width: 100%;
                        height: 252px;
                    }
                }
                .education-box {
                    width: 594px;
                    .education-chart {
                        width: 100%;
                        height: 252px;
                    }
                }
            }
            .percent-box {
                width: 1234px;
                height: 295px;
                margin-top: 10px;
                .percent-chart {
                    width: 100%;
                    height: 270px;
                }
            }
        }
        .inspect-page-center {
            width: 1211px;
            min-width: 1230px;
            height: 950px;
        }
        .inspect-page-right {
            display: flex;
            width: 1192px;
            .right-left {
                width: 593px;
                .charge-box {
                    position: relative;
                    height: 581px;
                    .title {
                        margin-top: 13px;
                        text-align: center;
                        font-size: 20px;
                        font-family: MicrosoftYaHei;
                        color: rgba(30, 239, 247, 1);
                    }
                    .label {
                        display: flex;
                        justify-content: flex-end;
                        font-size: 12px;
                        color: rgba(0, 255, 255, 1);
                        margin-right: 50px;
                    }
                    .charge-content {
                        width: 500px;
                        height: 480px;
                        margin: 0 auto;
                        overflow: hidden;
                        li {
                            display: flex;
                            align-items: center;
                            i {
                                display: inline-block;
                                min-width: 21px;
                                height: 21px;
                                text-align: center;
                                line-height: 20px;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: -21px;
                                font-size: 11px;
                                color: rgba(255, 255, 255, 1);
                            }
                            .item-media {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                flex: 1;
                                height: 40px;
                                padding-bottom: 13px;
                                margin-bottom: 9px;
                                background-repeat: no-repeat;
                                background-position: bottom;
                                .item-title {
                                    width: 200px;
                                    line-height: 22px;
                                    font-size: 18px;
                                    color: rgba(255, 255, 255, 1);
                                }
                                .item-number {
                                    display: flex;
                                    font-size: 15px;
                                    text-align: right;
                                    span {
                                        display: inline-block;
                                        width: 70px;
                                    }
                                }
                            }
                        }
                    }
                }
                .crime-age-box {
                    height: 312px;
                    margin-top: 20px;
                    .crime-age-content {
                        width: 500px;
                        margin: 30px auto 0;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        li {
                            width: 33.33%;
                            height: 140px;
                            position: relative;
                            text-align: center;
                            .circle-style {
                                position: absolute;
                                left: 50%;
                                transform: translate(-50%, 0);
                                width: 90px;
                                height: 90px;
                                border-radius: 50%;
                                .sector-line {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    border: 8px solid;
                                    border-color: transparent;
                                    transform: rotate(-45deg);
                                    border-radius: 50%;
                                }
                            }
                            .hollow-circle {
                                border: 8px solid;
                            }
                            .crime-age-number {
                                line-height: 90px;
                                font-size: 14px;
                                font-family: PingFangSC-Semibold;
                                font-weight: 600;
                                color: #fff;
                            }
                            .crime-age-text {
                                margin-top: 15px;
                                font-size: 14px;
                                font-family: MicrosoftYaHei;
                                color: rgba(255, 255, 255, 1);
                            }
                        }
                    }
                }
            }
            .right-right {
                .no-catch-box {
                    width: 547px;
                    height: 330px;
                    .no-catch-list {
                        width: 500px;
                        margin: 30px auto 0;
                        overflow: auto;
                        overflow-x: hidden;
                        li {
                            float: left;
                            width: 50%;
                            max-width: 50%;
                            margin-bottom: 15px;
                            .nci-name {
                                line-height: 19px;
                                font-size: 14px;
                                font-family: MicrosoftYaHei;
                                color: rgba(255, 255, 255, 1);
                            }
                            .nci-number {
                                display: flex;
                                align-items: center;
                                margin: 5px 0;
                                .line {
                                    position: relative;
                                    width: 140px;
                                    height: 8px;
                                    border-radius: 8px;
                                    background-color: rgba(7, 196, 255, .4);
                                    &:after {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        width: 50px;
                                        height: 8px;
                                        content: ' ';
                                        background-color: rgba(0, 255, 255, 1);
                                        border-radius: 8px;
                                    }
                                }
                                span {
                                    font-size: 14px;
                                    font-family: MicrosoftYaHei;
                                    color: rgba(1, 224, 255, 1);
                                    line-height: 19px;
                                    margin-left: 10px;
                                }
                            }
                        }
                    }
                }
                .sexual-assault-box {
                    width: 547px;
                    height: 270px;
                    .sexual-assault-chart {
                        width: 100%;
                        height: 220px;
                    }
                }
                .against-property-box {
                    width: 547px;
                    height: 340px;
                    .against-property-chart {
                        width: 100%;
                        height: 310px;
                    }
                }
            }
        }

    }
</style>
