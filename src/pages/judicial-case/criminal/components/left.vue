<template>
    <div class="criminal-page-left">
        <div class="left-left">
            <div class="left-group">
                <div class="accept-total-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受理案件数统计</i>
                    </div>
                    <p class="accept-sub-title">案件总数</p>
                    <ul class="case-num-block">
                        <li v-for="(item,index) in caseList" :key="index">{{item}}</li>
                    </ul>
                    <div ref="caseStatistics" class="case-chart"></div>
                </div>
                <div class="examine-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>审查逮捕各类犯罪不捕情况</i>
                    </div>
                    <ul class="examine-list">
                        <li><label>批准逮捕人数：</label><i>{{ examineData.pzdbrs }}</i></li>
                        <li><label>不批准逮捕人数：</label><i>{{ examineData.bpzdbrs }}</i></li>
                        <li><label>不逮捕人数：</label><i>{{ examineData.bbrs }}</i></li>
                    </ul>
                    <div ref="examineChart" class="examine-chart"></div>
                </div>
            </div>
            <div class="fchc-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>受理案件增长率最快的省市</i>
                </div>
                <div class="fchc-chart" ref="fchcChart"></div>
                <div class="picker-btn-group">
                    <i class="fchc-btn fchc-icon el-icon-arrow-left" @click="fchcPageChange('sub')"></i>
                    <p class="fchc-btn fchc-block pagination">{{ fchcPageNumber }} / {{ fchcPageTotal }}</p>
                    <i class="fchc-btn fchc-icon el-icon-arrow-right" @click="fchcPageChange('add')"></i>
                </div>
            </div>
        </div>
        <div class="left-right">
            <div class="public-pro-status">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>公诉各类业务受理情况</i>
                </div>
                <div class="public-pro-info">
                    <p><span>公诉各类业务办结合计（件）:</span> <span>{{ publicProInfo.gsglyebjhj }}</span></p>
                    <p><span>公诉办结比例（%）：</span> <span>{{ publicProInfo.gsbjbl }}%</span></p>
                </div>
                <div class="public-pro-chart" ref="publicProChart"></div>
            </div>
            <div class="prosecute-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>起诉案件罪名数量及占比</i>
                </div>
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
	import { mapGetters, mapActions }                                               from 'vuex';
	import ECharts                                                                  from 'echarts';
	import * as services                                                            from '../service';
	import { fillZero, verifyTriggerState, convertData, textFormatter }             from "@/utlis/helper";
	import { acceptCaseChartConfig, prosecutionBusinessConfig, reviewArrestConfig } from '../constant';

	export default {
		data() {
			return {
				caseTotal          : 0,
				examineData        : {
					pzdbrs : 0,
					bpzdbrs: 0,
					bbrs   : 0,
				},
				publicProInfo      : {
					gsglyebjhj: 0,
					gsbjbl    : 0,
				},
				prosecutionCaseList: [],
				fchcPageNumber     : 1,
				fchcPageTotal      : 0,
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
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
			this.fchcList        = [];
		},
		mounted() {
			const params         = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState = params;
			this.caseStatistics  = ECharts.init(this.$refs.caseStatistics);
			this.examineChart    = ECharts.init(this.$refs.examineChart);
			this.publicProChart  = ECharts.init(this.$refs.publicProChart);
			this.fchcChart       = ECharts.init(this.$refs.fchcChart);

			this.requestReviewArrestCount(params);
			this.requestAcceptCase(params);
			this.requestPublicProsecutionBusiness(params);
			this.requestProsecutionCaseList(params);
			this.requestReviewArrest(params);
			this.requestFastHandleCaseCity(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestReviewArrestCount(params);
				this.requestAcceptCase(params);
				this.requestPublicProsecutionBusiness(params);
				this.requestProsecutionCaseList(params);
				this.requestReviewArrest(params);
				this.requestFastHandleCaseCity(params);
			}
		},
		methods : {
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
					color : ['#FBBA18', '#1BC85D', '#009FE8', '#2CDDC0'],
					legend: {
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
					series: [{
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
					const itemNum       = 6,
						  data          = res.data;
					this.fchcPageNumber = 1;
					this.fchcList       = data;
					this.fchcPageTotal  = Math.ceil(data.length / itemNum);
					this.loadFastHandleCaseCityChart(this.fchcPageNumber);
				} else {
					this.$message.error(res.msg);
				}
			},

			fchcPageChange(type) {
				switch(type) {
					case 'add' : {
						if(this.fchcPageNumber < this.fchcPageTotal) {
							this.loadFastHandleCaseCityChart(++this.fchcPageNumber);
						}
					}
						break;
					case 'sub' : {
						if(this.fchcPageNumber > 1) {
							this.loadFastHandleCaseCityChart(--this.fchcPageNumber);
						}
					}
						break;
				}
			},

			loadFastHandleCaseCityChart(pageNumber) {
				const sliceIndex = (pageNumber - 1) * 6,
					  chartData  = this.fchcList.slice(sliceIndex, sliceIndex + 6),
					  axisData   = [],
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
						top: '15%',
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
							formatter : (name) => textFormatter(name, 3),
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
	}
</script>

<style lang="scss" scoped>
    .criminal-page-left {
        display: flex;
        height: 100%;
        .left-left {
            width: 739px;
            margin-right: 20px;
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
            .public-pro-status {
                width: 544px;
                .public-pro-info {
                    display: flex;
                    justify-content: center;
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
                    width: 540px;
                    height: 300px;
                    margin: 0 auto;
                }
            }
            .prosecute-box {
                position: relative;
                width: 544px;
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