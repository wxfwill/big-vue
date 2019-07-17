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
                        <li><label>批准逮捕人数/率：</label><i>{{ examineData.pzdbrs }}</i><i>{{ examineData.pzdbl }}%</i></li>
                        <li><label>逮捕人数/率：</label><i>{{ examineData.dbl }}</i><i>{{ examineData.dbrs }}%</i></li>
                        <li><label>不逮捕人数/率：</label><i>{{ examineData.bbrs }}</i><i>{{ examineData.bbl }}%</i></li>
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
                            <span>{{item.qszm}}</span>
                        </div>
                        <p>
                            <span>{{item.qszm_zb}}% &nbsp;&nbsp;&nbsp;&nbsp;{{item.qssl}}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <!--<div class="left-right">
            <div class="center-box">
            </div>
            <div class="bor_col increase-box">
                <p class="title">受理案件增长率最快的省市</p>
                <div id="cityBox" :style="{width:'920px',height:'230px',marginLeft:'100px'}"></div>
                <div class="next">
                    <p class="bg_img" :style="{backgroundImage:'url('+leftImg+')'}" @click="previousHandle"></p>
                    <p>1/3</p>
                    <p class="bg_img" :style="{backgroundImage:'url('+rightImg+')'}" @click="downHandle"></p>
                </div>
            </div>
        </div>-->
        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
    </div>
</template>

<script>
	import { mapGetters, mapActions }                           from 'vuex';
	import ECharts                                              from 'echarts';
	import * as services                                        from '../service';
	import { fillZero, verifyTriggerState, convertData }        from "@/utlis/helper";
	import { acceptCaseChartConfig, prosecutionBusinessConfig } from '../constant';

	export default {
		data() {
			return {
				caseTotal          : 0,
				examineData        : {
					pzdbrs: 0,
					pzdbl : 0,
					dbrs  : 0,
					dbl   : 0,
					bbrs  : 0,
					bbl   : 0,
				},
				publicProInfo      : {
					gsglyebjhj: 0,
					gsbjbl    : 0,
				},
				prosecutionCaseList: [],
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
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.caseStatistics  = ECharts.init(this.$refs.caseStatistics);
			this.examineChart    = ECharts.init(this.$refs.examineChart);
			this.publicProChart  = ECharts.init(this.$refs.publicProChart);

			this.requestAcceptCase(params);
			this.requestPublicProsecutionBusiness(params);
			this.requestProsecutionCaseList(params);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestAcceptCase(params);
				this.requestPublicProsecutionBusiness(params);
				this.requestProsecutionCaseList(params);
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

			// 审查逮捕各类犯罪不捕情况

			//受理案件增长率最快的省市
			async requestFastHandleCaseCity(params) {

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
					tooltip: {},
					grid   : {
						top: '10%',
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
							formatter : (name) => {
								const str   = name;
								let tempStr = '';
								const len   = str.length - 1;
								for(let i = 0; i < len; i++) {
									if((i + 1) % 3 === 0) {
										tempStr += str[i] + '\n';
									}
									tempStr += str[i];
								}
								return tempStr;
							},
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
        width: 1906px;
        height: 100%;
        .left-left {
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
                    width: 250px;
                    height: 270px;
                    margin: 0 auto;
                }
            }
        }
        .fchc-box {
            width: 739px;
            .fchc-chart {
                width: 700px;
                height: 230px;
                margin: 0 auto;
            }
        }
        .left-right {
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
                    height: 250px;
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
                        height: 40px;
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