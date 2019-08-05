<template>
    <div class="home-page-left">
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
        <div class="left-left">
            <div class="right-box">
                <!-- 未检 -->
                <div class="notCheck-box">
                    <box-head title="未检"></box-head>
                    <div ref="wjBox" :style="{width: '700px', height: '220px', margin: '0 auto'}"></div>
                </div>
                <!-- 控申 -->
                <div class="control-box">
                    <box-head title="控申"></box-head>
                    <ul>
                        <li v-for="item in ksList" :key="item.id">
                            <p class="control-title">{{item.title}}</p>
                            <p class="control-number">{{ item.num || 0 }}</p>
                        </li>
                    </ul>
                </div>
                <!--受理案件趋势分析-->
                <div class="accept-box">
                    <box-head title="受理案件趋势分析"></box-head>
                    <year-selector
                            :selectYear="acceptCaseSelectYear"
                            :handleChange="changeAcceptCaseYear"
                    ></year-selector>
                    <div class="accept-chart" ref="qstjContent"></div>
                </div>
            </div>
        </div>
        <div class="left-right">
            <div class="criminal-box">
                <box-head title="刑事案件概览"></box-head>
                <div class="overview-box">
                    <penal-gauge v-for="(item, index) in xsList" :key="index" :chartConfig="item"></penal-gauge>
                </div>
            </div>
            <div class="top-box">
                <box-head title="起诉罪名TOP10"></box-head>
                <ul class="list-group">
                    <li v-for="(item,index) in topList" :key="index">
                        <i>{{index + 1}}</i>
                        <div class="list-content">
                            <p class="list-label text-ellipsis" :title="item.ay_name">{{item.ay_name}}</p>
                            <div class="top-line" :style="{width: `${item.width}px`}"></div>
                            <span>{{item.qsajsls}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	import ECharts                                                          from 'echarts';
	import { mapGetters }                                                   from 'vuex';
	import * as services                                                    from '../service/index';
	import { verifyTriggerState, numberInteger }                            from '@/utlis/helper';
	import PenalGauge                                                       from '@/components/common/penal-gauge';
	import { undetectedChartConfig, criminalCaseConfig, prosecutionConfig } from '../constant/index';
	import YearSelector                                                     from '@/components/common/year-selector';
	import BoxHead                                                          from '@/components/common/box-head';

	export default {
		data() {
			return {
				lineImg             : require('@/public/img/home/line.png'),
				xsImg               : require('@/public/img/home/box1.png'),
				qszmImg             : require('@/public/img/home/qszm.png'),
				xsList              : [],
				ksList              : prosecutionConfig,
				topList             : [],
				acceptCaseSelectYear: new Date().getFullYear()
			}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params              = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState      = params;
			this.undetectedChart      = ECharts.init(this.$refs.wjBox);
			this.trendStatisticsChart = ECharts.init(this.$refs.qstjContent);
			this.loadXSData(params);
			this.loadWJData(params);
			this.loadProsecution(params);
			this.loadProsecutionChargeList(params);
			this.requestTrendStatisticsList({
				code: params.code,
				lev : params.lev,
				year: this.acceptCaseSelectYear
			});
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				if(verifyTriggerState(['code', 'lev'], this.oldTriggerState, params)) {
					this.requestTrendStatisticsList({
						code: params.code,
						lev : params.lev,
						year: this.acceptCaseSelectYear
					});
				}
				this.oldTriggerState = params;
				this.loadWJData(params);
				this.loadXSData(params);
				this.loadProsecution(params);
				this.loadProsecutionChargeList(params);
			}
		},
		methods   : {
			async loadWJData(params) {
				const res = await services.getUndetected(params);
				if(res.code === 200) {
					this.wjHandle(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadXSData(params) {
				const res = await services.getCriminalCase(params);
				if(res.code === 200) {
					this.xsList = criminalCaseConfig.map(i => {
						return {
							...i,
							value: Number(res.data[i.id]),
						};
					});
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadProsecution(params) {
				const res = await services.getProsecution(params);
				if(res.code === 200) {
					this.ksList = this.ksList.map(i => ({
						...i,
						num: res.data[i.id]
					}));
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadProsecutionChargeList(params) {
				const res = await services.getProsecutionChargeList(params);
				if(res.code === 200) {
					const maxNum = res.data[0] ? res.data[0].qsajsls : 1;
					this.topList = res.data.map(i => ({
						...i,
						width: (i.qsajsls / maxNum * 250).toFixed(2)
					}));
				} else {
					this.$message.error(res.msg);
				}
			},
			changeAcceptCaseYear(value) {
				this.requestTrendStatisticsList({
					...this.getMapCode,
					year: value
				});

			},
			// 请求受理案件趋势
			async requestTrendStatisticsList(params) {
				const res = await services.getTrendStatisticsList(params);
				if(res.code === 200) {
					this.loadTrendStatisticsChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			wjHandle(chartData = {}) {
				let valMax      = 0;
				const xAxisData = [],
					seriesData  = undetectedChartConfig.map(i => {
						const value = chartData[i.id];
						if(valMax < value) {
							valMax = value;
						}
						xAxisData.push(i.name);
						return value;
					});
				valMax          = numberInteger(valMax);
				this.undetectedChart.setOption({
					grid   : {
						width : '90%',
						top   : 38,
						bottom: 20,
					},
					tooltip: {},
					legend : { show: false },
					xAxis  : {
						data     : xAxisData,
						axisLine : {
							show: false //隐藏X轴轴线
						},
						axisTick : {
							show: false //隐藏X轴刻度
						},
						axisLabel: {
							show     : true,
							textStyle: {
								color: "#ffffff" //X轴文字颜色
							}
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
							show: false
						},
						axisLabel    : {
							show     : true,
							textStyle: {
								color: "#ffffff"
							}
						}
					}, {
						type         : "value",
						name         : "",
						nameTextStyle: {
							color: "#ebf8ac"
						},
						position     : "right",
						splitLine    : {
							show: false
						},
						axisTick     : {
							show: false
						},
						axisLine     : {
							show: false
						},
						axisLabel    : {
							show     : false,
							formatter: "{value} %", //右侧Y轴文字显示
							textStyle: {
								color: "#ebf8ac"
							}
						}
					}, {
						show: true,
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
						tooltip  : {
							show: false
						},
						name     : "背景",
						type     : "bar",
						barWidth : 36,
						barGap   : '-100%',
						itemStyle: {
							normal: {
								color: 'rgba(0, 159, 232, .3)'
							}
						},
						data     : Array.from({ length: seriesData.length }).map(() => valMax)
					}, {
						name     : "",
						type     : "bar",
						barWidth : 36,
						itemStyle: {
							normal: {
								color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : "#63E8D7"
								}, {
									offset: 1,
									color : "#0664BE"
								}])
							}
						},
						data     : seriesData
					}]
				});
			},
			loadTrendStatisticsChart(data) {
				this.trendStatisticsChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type : 'cross',
							label: {
								backgroundColor: '#6a7985',
							},
						},
						formatter  : '<div class="accept-tooltip">{b}月 <br />{c}件</div>'
					},
					color  : ["#0080ff", "#4cd5ce"],
					grid   : {
						left        : '5px',
						top         : '30px',
						right       : '50px',
						bottom      : '10px',
						containLabel: true
					},
					xAxis  : [{
						type         : 'category',
						name         : '（月）',
						nameTextStyle: {
							padding: [10, 0, 0]
						},
						boundaryGap  : false,
						data         : data.map(i => i.rq),
						axisLabel    : {
							show     : true,
							margin   : 0,
							interval : 0,
							textStyle: {
								show    : false,
								color   : 'rgba(255,255,255,1)',
								fontSize: 12,
							},
						},
						axisTick     : {
							show: false,
						},
						axisLine     : {
							show     : false,
							lineStyle: {
								color: 'rgba(255,255,255,1)',
								width: 0.5, //这里是为了突出显示加上的
							}
						}
					}],
					yAxis  : [{
						type     : 'value',
						name     : '（件）',
						axisLine : {
							show     : false,
							onZero   : false,
							lineStyle: {
								color: 'rgba(255,255,255,1)',
								width: 1, //这里是为了突出显示加上的
							}
						},
						axisTick : {
							show: false,
						},
						axisLabel: {
							formatter: function(val) {
								return val;
							},
							show     : true,
							textStyle: {
								color: 'rgba(255,255,255,1)' //字体颜色
							}
						},
						splitLine: { //保留网格线
							show     : false,
							lineStyle: { //y轴网格线设置
								color: '#0a2b52',
								width: 1,
								type : 'solid'
							}
						},
					}],
					series : [
						{
							name      : '件数',
							type      : 'line',
							smooth    : true,
							itemStyle : {
								normal  : { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
									color    : new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color : 'rgba(0,255,255, 1)' // 0% 处的颜色
									}, {
										offset: 1,
										color : 'rgba(0,255,255, 0)' // 100% 处的颜色
									}]), //背景渐变色
									lineStyle: { // 系列级个性化折线样式
										width: 2,
										type : 'solid',
										color: "#2db9f6"
									}
								},
								emphasis: {
									color    : '#02675f',
									lineStyle: { // 系列级个性化折线样式
										width: 0.5,
										type : 'dotted',
										color: "#02675f" //折线的颜色
									}
								}
							},
							symbolSize: 5,
							areaStyle : {
								normal: {}
							},
							data      : data.map(i => i.sljs),
						},
					]
				});
			},
		},
		components: {
			PenalGauge,
			YearSelector,
			BoxHead,
		}
	};
</script>

<style lang="scss" scoped>
    .home-page-left {
        display: flex;
        width: 1318px;
        .accept-tooltip {
            background: linear-gradient(left, #0BE5F1, #0C99F7);
            width: 100px;
            height: 100px;
        }
        .left-left {
            display: flex;
            flex-wrap: wrap;
            width: 727px;
            .right-box {
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
                .notCheck-box {
                    width: 730px;
                    height: 270px;
                }
                .control-box {
                    margin-top: 30px;
                    width: 730px;
                    height: 230px;
                    margin-bottom: 20px;
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
                                color: #dfdfdf;
                            }
                        }
                    }
                }
                .accept-box {

                    .accept-chart {
                        width: 700px;
                        height: 260px;
                        margin: 0 auto;
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
        .left-right {
            margin-left: 20px;
            .criminal-box {
                width: 545px;
                .overview-box {
                    width: 100%;
                    height: 325px;
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
                        background: linear-gradient(360deg, rgba(5, 142, 226, 0.5) 0%, rgba(5, 142, 226, 1) 53%, rgba(5, 142, 226, 0.5) 100%);
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
                        background: linear-gradient(
                                        to right,
                                        #1ABCE2,
                                        #2EE8B3
                        );
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
                                max-width: 250px;
                                height: 10px;
                                background: linear-gradient(270deg, rgba(23, 208, 244, 1) 0%, rgba(10, 142, 231, 1) 100%);
                                border-radius: 7px;
                                margin: 0 12px;
                            }
                            span {
                                font-size: 15px;
                                color: #00BEDD;
                            }
                        }
                        i {
                            display: inline-block;
                            min-width: 21px;
                            min-height: 21px;
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
                    li:nth-child(1), li:nth-child(2), li:nth-child(3) {
                        i {
                            background-color: rgba(255, 108, 64, 1);
                        }
                        color: #FF6C40;
                        span {
                            color: #c49760;
                        }
                    }
                }
            }
        }
    }
</style>