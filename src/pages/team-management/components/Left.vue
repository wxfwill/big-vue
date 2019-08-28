<template>
    <div class="team-left-container">
        <div class="left-top">
            <div class="left-box">
                <div class="left-left">
                    <!-- 全国在职人数 -->
                    <div class="activeStaff-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>全国在职人数</i>
                        </div>
                        <div class="in-job-box" :style="{backgroundImage:`url(${inJobBg})`}">
                            <h1 class="title">全国在职人数</h1>
                            <div class="in-job-detail">
                                <ul class="digital-block">
                                    <li
                                            class="white-text"
                                            v-for="(item,index) in incumbency.qgzzrs"
                                            :key='index'>
                                        {{ item }}
                                    </li>
                                </ul>
                                <div class="to-leave">
                                    <div class="to-block">
                                        <p class="white-text">
                                            当年入院
                                        </p>
                                        <span class="to-num">{{ incumbency.dnry }}</span>
                                    </div>
                                    <div class="leave-block">
                                        <p class="white-text">
                                            当年离院
                                        </p>
                                        <span class="leave-num">{{ incumbency.dnly }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--工作年限统计-->
                    <div class="accept-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>工作年限统计</i>
                        </div>
                        <div class="work-life-box">
                            <div class="work-life-charts">
                                <pie-chart
                                        v-for="item in workLife"
                                        :key="item.key"
                                        :text="item.text"
                                        :percent="workingLife[item.key]"
                                        :strokeColor="item.strokeColor"
                                        :tintColor="item.tintColor"
                                        :circleMaxNumber="workingLife.maxValue"
                                        type="number"
                                ></pie-chart>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="left-right">
                    <!-- 教育情况 -->
                    <div class="education-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>教育培训情况</i>
                        </div>
                        <div class="education-situation-box">
                            <h1 class="sub-title">检察人员参与培训情况</h1>
                            <div class="education-chart-box">
                                <div ref="educationChart" :style="{width: '580px', height: '368px'}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="left-bottom">
            <!-- 各级检察机关人员现状 -->
            <div class="personnelStatus-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>各级检察机关人员现状</i>
                </div>
                <p class='more-btn' @click="dialogVisible = true">更多>></p>
                <div ref="personnelStatusQuos"
                     :style="{width: '1285px', height: '273px', margin: '23px auto 46px' }"></div>
            </div>
        </div>
        <el-dialog
                title="各级检察机关人员现状"
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
    </div>
</template>
<script>
	import EChart   from "echarts";
	import PieChart from "../../../components/common/pie-chart";
	import {
		workLifeConfig,
		educationSituationAxisConfig,
	}               from '../constant/index';

	export default {
		data() {
			return {
				inJobBg               : require("@/public/img/team-management/inJobBg.png"),
				jobToIcon             : require("@/public/img/team-management/to.svg"),
				jobOutIcon            : require("@/public/img/team-management/out.svg"),
				workLife              : workLifeConfig,
				educationSituationAxis: educationSituationAxisConfig,
				dialogVisible         : false,
				personnelStatusQuos   : []//全国各省份各级检察机关人员现状的数据
			};
		},
		mounted() {
			this.myChart      = EChart.init(this.$refs.educationChart);
			this.personStatus = EChart.init(this.$refs.personnelStatusQuos);
		},
		methods   : {
			loadEducationChart(educationSituation) {
				let maxNum       = 0;
				const seriesData = this.educationSituationAxis.map(i => {
					const value = educationSituation[i.key];
					if(maxNum < value) {
						maxNum = value;
					}
					return {
						name: i.name,
						value
					};
				});
				this.myChart.setOption({
					visualMap: {
						show   : false,
						min    : 0,
						max    : maxNum,
						inRange: {}
					},
					legend   : {
						data     : seriesData,
						bottom   : 0,
						textStyle: {
							fontSize: 18,//字体大小
							color   : '#ffffff'//字体颜色
						}
					},
					tooltip  : {  //hover提示
						trigger  : 'item',
						formatter: '培训情况:<br/>{b}:{c}%'
						// formatter:function(params){
						//     return params.name+'<br/>总条数 : '+params.data.totalNumber+'条 <br/>占比：'+ (params.percent - 0).toFixed(2)+'%';
						// }
					},
					series   : [{
						name     : "教育情况",
						type     : "pie",
						radius   : "75%",
						center   : ["50%", "45%"],
						color    : ['#FBBA18', '#F18126', '#1BC85D', '#2AB3EB'],
						data     : seriesData.sort((a, b) => a.value - b.value),
						label    : {
							color : "#fff",
							normal: {
								formatter: "{b|{b}}",
								rich     : {
									b: {
										color   : "#fff",
										fontSize: 15,
										height  : 40
									}
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: "#2cb3dc"
								},
								smooth   : 0.2,
								length   : 10,
								length2  : 20
							}
						},
						itemStyle: {
							normal: {
								label      : {
									show: false
								},
								shadowColor: "rgba(0, 0, 0, 0.8)",
								shadowBlur : 50
							}
						}
					}]
				});
			},
			personnelStatusQuosConfig(configList = []) {
				const xAxisData = [],
					  zz        = [],
					  zy        = [],
					  lt        = [],
					  qtjy      = [];
				configList.map((config) => {
					xAxisData.push(config.city_name);
					zz.push(config.zz);
					zy.push(config.zy);
					lt.push(config.lt);
					qtjy.push(config.qtjy);
				});
				return {
					xAxisData,
					zz,
					zy,
					lt,
					qtjy
				};
			},
			loadpersonnelStatusQuosChart(personnelStatusQuos) {
				this.personnelStatusQuos              = personnelStatusQuos;
				const { xAxisData, zz, zy, lt, qtjy } = this.personnelStatusQuosConfig(this.personnelStatusQuos.slice(0, 10));
				this.personStatus.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend : {
						data      : ['在职', '增员', '离退', '其他减员'],
						align     : 'left',
						right     : 10,
						textStyle : {
							color: "#fff"
						},
						itemWidth : 10,
						itemHeight: 10,
						itemGap   : 35.,
						x         : 'center',
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '3%',
						containLabel: true
					},
					xAxis  : [{
						type     : 'category',
						data     : xAxisData,
						axisLine : {
							show     : true,
							lineStyle: {
								color: "#0ED8D1",
								width: 1,
								type : "solid"
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							show     : true,
							textStyle: {
								color: "#fff",
							}
						},
					}],
					yAxis  : [{
						type     : 'value',
						axisTick : {
							show: false,
						},
						axisLabel: {
							show     : true,
							textStyle: {
								color: "#fff",
							},
							formatter: '{value} '

						},
						axisLine : {
							show     : true,
							lineStyle: {
								color: "#0ED8D1",
								width: 1,
								type : "solid"
							},
						},
						splitLine: {
							lineStyle: {
								color: "#063374",
							}
						}
					}],
					series : [{
						name     : '在职',
						type     : 'bar',
						data     : zz,
						barWidth : 10, //柱子宽度
						barGap   : 1, //柱子之间间距
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 1,
									color : "#11E7AA"
								}, {
									offset: 0,
									color : "#01C26E"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '增员',
						type     : 'bar',
						data     : zy,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#32EEEB"
								}, {
									offset: 1,
									color : "#0379DB"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '离退',
						type     : 'bar',
						data     : lt,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#1D96FA"
								}, {
									offset: 1,
									color : "#178EF9"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '其他减员',
						type     : 'bar',
						data     : qtjy,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#6D7EFF"
								}, {
									offset: 1,
									color : "#3B56FB"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}]
				})
			},
			convertChartConfigsort(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
				configList.map((config) => {
					xAxisData.push(config.id);
					seriesData.push(config.name)
				});
				return {
					xAxisData,
					seriesData
				};
			},
			loadDialogChart() {
				this.dialogBarChart                   = EChart.init(this.$refs.dialogChart);
				const { xAxisData, zz, zy, lt, qtjy } = this.personnelStatusQuosConfig(this.personnelStatusQuos);
				this.dialogBarChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend : {
						data      : ['在职', '增员', '离退', '其他减员'],
						align     : 'left',
						right     : 10,
						textStyle : {
							color: "#fff"
						},
						itemWidth : 10,
						itemHeight: 10,
						itemGap   : 35.,
						x         : 'center',
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '3%',
						containLabel: true
					},
					xAxis  : [{
						type     : 'category',
						data     : xAxisData,
						axisLine : {
							show     : true,
							lineStyle: {
								color: "#0ED8D1",
								width: 1,
								type : "solid"
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							show     : true,
							textStyle: {
								color: "#fff",
							}
						},
					}],
					yAxis  : [{
						type     : 'value',
						axisTick : {
							show: false,
						},
						axisLabel: {
							show     : true,
							textStyle: {
								color: "#fff",
							},
							formatter: '{value} '
						},
						axisLine : {
							show     : true,
							lineStyle: {
								color: "#0ED8D1",
								width: 1,
								type : "solid"
							},
						},
						splitLine: {
							lineStyle: {
								color: "#063374",
							}
						}
					}],
					series : [{
						name     : '在职',
						type     : 'bar',
						data     : zz,
						barWidth : 10, //柱子宽度
						barGap   : 1, //柱子之间间距
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 1,
									color : "#11E7AA"
								}, {
									offset: 0,
									color : "#01C26E"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '增员',
						type     : 'bar',
						data     : zy,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#32EEEB"
								}, {
									offset: 1,
									color : "#0379DB"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '离退',
						type     : 'bar',
						data     : lt,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#1D96FA"
								}, {
									offset: 1,
									color : "#178EF9"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}, {
						name     : '其他减员',
						type     : 'bar',
						data     : qtjy,
						barWidth : 10,
						barGap   : 1,
						itemStyle: {
							normal: {
								color          : new EChart.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#6D7EFF"
								}, {
									offset: 1,
									color : "#3B56FB"
								}]),
								barBorderRadius: [30, 30, 0, 0],
							}
						}
					}]
				})
			},
			closeBarDialog() {
				this.dialogBarChart && this.dialogBarChart.clear();
			},
		},
		components: {
			PieChart
		},
		props     : ["incumbency", "workingLife"]
	};
</script>
<style lang="scss" scoped>
    $boxMarginTop: 20px;
    .team-left-container {
        display: flex;
        flex-wrap: wrap;
        width: 1285px;
        box-sizing: border-box;
        .accept-tooltip {
            background: linear-gradient(left, #0be5f1, #0c99f7);
            width: 100px;
            height: 100px;
        }
        .left-top {
            display: flex;
            flex-wrap: wrap;
            width: 1285px;
            height: 521px;
            .left-box {
                display: flex;
                flex-wrap: wrap;
                width: 1285px;
                height: 521px;
                .animation {
                    //动画盒子
                    display: flex;
                    text-align: center;
                    align-items: center;
                    width: 113px;
                    height: 113px;
                    font-size: 14px;
                    font-family: Helvetica;
                    color: rgba(255, 255, 255, 1);
                    padding: 0 28.5px;
                }
                .activeStaff-box {
                    width: 739px;
                    height: 260px;
                    .in-job-box {
                        width: 580px;
                        height: 164px;
                        background-size: 100% 100%;
                        margin: 25px 95px 25px 63px;
                        box-sizing: border-box;
                        .title {
                            padding: 20px 0 30px;
                            text-align: center;
                            font-size: 24px;
                            color: #ffff;
                        }
                        .in-job-detail {
                            display: flex;
                            justify-content: space-around;
                            .digital-block {
                                max-width: 340px;
                                margin-left: 16px;
                                li {
                                    width: 28px;
                                    height: 44px;
                                    line-height: 44px;
                                    text-align: center;
                                    float: left;
                                    margin: 0 16px 10px 0;
                                    font-size: 24px;
                                    background-color: #1c6eb7;
                                    box-shadow: 1px 1px 0 #cde8f9;
                                    &:last-of-type {
                                        margin-right: 0;
                                    }
                                }
                            }
                            .to-leave {
                                display: flex;
                                text-align: center;
                                margin-top: -5px;
                                margin-left: 27px;

                                .leave-block {
                                    margin-left: 14px;
                                }
                                p {
                                    font-size: 14px;
                                    margin-bottom: 12px;
                                }
                                span {
                                    font-size: 24px;
                                    &.to-num {
                                        color: #dda62c;
                                    }
                                    &.leave-num {
                                        color: #00ffff;
                                    }
                                }
                            }
                        }
                    }
                }
                .education-box {
                    margin-left: 20px;
                    width: 525px;
                    margin-bottom: 20px;
                    .sub-title {
                        text-align: center;
                        margin: 20px;
                        color: #FFFFFF;
                    }
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        width: 650px;
                        height: 170px;
                        margin: 33px auto 0;
                        li {
                            width: 130px;
                            text-align: center;
                            margin-right: 20px;
                            .control-title {
                                font-size: 16px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 21px;
                                margin-bottom: 10px;
                            }
                            .control-number {
                                display: inline;
                                padding: 0 15px;
                                color: rgba(0, 159, 232, 1);
                                border: 1px solid rgba(0, 159, 232, 1);
                                border-radius: 12px;
                            }
                        }
                    }
                }
                .accept-box {
                    .accept-case-select {
                        margin: 20px 0;
                        float: right;
                        z-index: 2;
                        /deep/ .el-input__inner {
                            height: 30px;
                            background-color: transparent;
                            color: #fff;
                        }
                        /deep/ .el-select__caret {
                            line-height: 30px;
                        }
                    }
                    .accept-chart {
                        width: 700px;
                        height: 207px;
                        margin: 0 auto;
                    }
                    .work-life-box {
                        margin-top: $boxMarginTop;
                        background-size: 100% 100%;
                        width: 739px;
                        height: 207px;
                        .work-life-charts {
                            width: 739px;
                            flex-wrap: nowrap;
                            .chart-box {
                                width: 69px;
                                height: 75px;
                                float: left;
                                margin: 35px;
                            }
                        }
                    }
                }
            }
            .label {
                display: inline-block;
                width: 4px;
                height: 20px;
                background-color: #33d1f8;
                border-radius: 20px;
            }
        }
        .left-bottom {
            display: flex;
            flex-wrap: wrap;
            width: 1285px;
            height: 358px;
            .personnelStatus-box {
                width: 100%;
                position: relative;
                .overview-box {
                    width: 100%;
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 40px 0 20px;
                    .line {
                        position: absolute;
                        width: 1px;
                        height: 100%;
                        left: 145px;
                        top: 0;
                        background: linear-gradient(
                                        360deg,
                                        rgba(5, 142, 226, 0.5) 0%,
                                        rgba(5, 142, 226, 1) 53%,
                                        rgba(5, 142, 226, 0.5) 100%
                        );
                        opacity: 0.71;
                    }
                    p {
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        text-align: center;
                        font-size: 12px;
                        color: rgba(255, 255, 255, 1);
                        line-height: 14px;
                        i {
                            display: inline-block;
                            font-size: 18px;
                            color: rgba(0, 255, 255, 1);
                            line-height: 22px;
                            width: 122px;
                            text-align: right;
                        }
                    }
                    span {
                        display: inline-block;
                        border-radius: 20px;
                        width: 180px;
                        height: 8px;
                        margin: 0 11px 0 51px;
                        background: linear-gradient(to right, #1abce2, #2ee8b3);
                    }
                    font-size: 12px;
                    font-family: Helvetica;
                    color: rgba(255, 255, 255, 1);
                }
                .criminal-label {
                    position: absolute;
                    left: 235px;
                    top: 9px;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 22px;
                }
                .more-btn {
                    color: #FBBA18;
                    position: absolute;
                    right: 85px;
                    top: 55px;
                    margin-top: 17px;
                    text-align: right;
                    font-size: 16px;
                    font-family: Helvetica;
                    color: rgba(251, 186, 24, 1);
                    line-height: 17px;
                    cursor: pointer;
                    z-index: 999;
                }
            }
            .top-box {
                width: 550px;
                position: relative;
                .title {
                    position: absolute;
                    left: 204px;
                    top: 5px;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 22px;
                }
                .list-group {
                    padding: 13px 28px;
                    li {
                        display: flex;
                        align-items: center;
                        .list-content {
                            display: flex;
                            align-items: center;
                            height: 40px;
                            padding-bottom: 13px;
                            margin-bottom: 10px;
                            background-repeat: no-repeat;
                            background-position-y: bottom;
                            flex: 1;
                            .list-label {
                                width: 130px;
                                font-size: 18px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            .top-line {
                                max-width: 280px;
                                height: 10px;
                                background: linear-gradient(
                                                270deg,
                                                rgba(23, 208, 244, 1) 0%,
                                                rgba(10, 142, 231, 1) 100%
                                );
                                border-radius: 7px;
                                margin: 0 12px;
                            }
                            span {
                                font-size: 15px;
                                color: #00bedd;
                            }
                        }
                        i {
                            display: inline-block;
                            width: 21px;
                            height: 21px;
                            text-align: center;
                            line-height: 20px;
                            border-radius: 50%;
                            margin-right: 10px;
                            background-color: #33d1f8;
                            margin-top: -21px;
                            font-size: 11px;
                            color: rgba(255, 255, 255, 1);
                        }
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                    li:nth-child(1),
                    li:nth-child(2),
                    li:nth-child(3) {
                        i {
                            background-color: rgba(255, 108, 64, 1);
                        }
                        color: #ff6c40;
                        span {
                            color: #c49760;
                        }
                    }
                }
            }
        }
        .per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>