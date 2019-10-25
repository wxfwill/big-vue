<template>
    <div class="JianWu-left-box">
        <div class="fraze-grid">
            <div class="income-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>收入</i>
                </div>
                <div class="income-content" ref="incomeChart"></div>
            </div>
            <div class="pay-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>支出</i>
                </div>
                <div class="pay-head">
                    <p style="color: #00FFF8; float: left; font-size: 18px">总支出：{{ formatNum(expenditure.zzcs) }}</p>
                    <p class='unit'>单位:万元</p>
                </div>
                <div class="pay-content">
                    <pay-pie
                            title="功能分类支出"
                            :chartData="disFunctionList"
                    ></pay-pie>
                    <pay-pie
                            title="支出性质"
                            :chartData="expendNatureList"
                    ></pay-pie>
                    <pay-pie
                            title="支出经济分类"
                            :chartData="economyClassifyList"
                    ></pay-pie>
                </div>
            </div>
        </div>
        <div class="caizheng-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>财政拨款收入分布</i>
            </div>
            <p class='more-btn'
               v-if="(screenType === 'pc' && financialAllocationList.length > 32) || (screenType === 'bj' && financialAllocationList.length > 15)"
               @click="setDialogVisible('财政拨款收入分布')">更多>></p>
            <div class="caizheng-content" ref="caizhengChart"></div>
        </div>
        <div class="fraze-grid">
            <div class="jingfei-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>检察业务经费情况</i>
                </div>
                <p class='unit'>单位:万元</p>
                <div class="jingfei-content" ref="jingfeiChart"></div>
                <div class="jingfei-content" ref="jingfeiChart1"></div>
                <div class="jingfei-content" ref="jingfeiChart2"></div>
            </div>
            <div class="jiancha-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>检察业务费趋势</i>
                </div>
                <el-popover
                        popper-class="pro-trend-table"
                        placement="right-start"
                        width="400"
                        trigger="click">
                    <el-table :data="yearCheckTrend">
                        <el-table-column prop="year" label="年份"></el-table-column>
                        <el-table-column prop="early" label="年初结转结余"></el-table-column>
                        <el-table-column prop="yearEnd" label="年末结转结余"></el-table-column>
                    </el-table>
                    <p class="unit cur-pointer" slot="reference">更多>></p>
                </el-popover>
                <div class="jiancha-content" ref="jianchaChart"></div>
            </div>
        </div>
        <el-dialog
                :title='dialogContext.name'
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
    </div>
</template>

<script>
	import ECharts                                                         from 'echarts';
	import PayPie                                                          from './pay-pie';
	import { verifyTriggerState, numberInteger, textFormatter, formatNum } from '@/utlis/helper';
	import {
		incomeChartConfig,
		disFunctionConfig, expendNatureConfig, economyClassifyConfig,
	}                                                                      from '../constant/index';

	export default {
		data() {
			return {
				dialogVisible      : false,
				dialogContext      : {
					name: '',
					key : '',
					data: []
				},
				boxtooltip1        : false,
				boxtooltip2        : false,
				boxtooltip3        : false,
				yearCheckTrend     : [],
				disFunctionList    : [],
				expendNatureList   : [],
				economyClassifyList: [],
			}
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			this.oldTriggerState = { ...this.getSelectDateSection, ...this.getMapCode };
			this.incomeChart     = ECharts.init(this.$refs.incomeChart);
			this.caizhengChart   = ECharts.init(this.$refs.caizhengChart);
			this.jingfeiChart    = ECharts.init(this.$refs.jingfeiChart);
			this.jingfeiChart1   = ECharts.init(this.$refs.jingfeiChart1);
			this.jingfeiChart2   = ECharts.init(this.$refs.jingfeiChart2);
			this.jianchaChart    = ECharts.init(this.$refs.jianchaChart);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadIncomeChart(chartData) {
				const { xAxisData, seriesData } = this.convertChartConfig(incomeChartConfig, chartData);
				this.incomeChart.setOption({
					title  : {
						right    : 10,
						text     : '单位：万元',
						textStyle: {
							color     : '#fbba18',
							fontWeight: 400,
							fontSize  : 16,
						}
					},
					color  : ['#4F79E2', '#1BC85D', '#009FE8', '#FF6C40', '#FBBA18', '#0BD7AA'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						orient   : 'vertical',
						right    : 0,
						top      : 50,
						bottom   : 20,
						textStyle: {
							color: 'white'
						},
						formatter: name => {
							const { value } = seriesData.find(i => i.name === name);
							return `${name}     ${this.formatNum(value)}`;
						},
						icon     : "circle",
						data     : xAxisData,
					},
					series : {
						name     : '收入',
						type     : 'pie',
						radius   : '65%',
						center   : ['35%', '53%'],
						data     : seriesData,
						label    : {
							show: true
						},
						itemStyle: {
							emphasis: {
								shadowBlur   : 10,
								shadowOffsetX: 0,
								shadowColor  : 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				})
			},
			convertChartConfig(configList = [], data) {
				const xAxisData  = [],
					  seriesData = configList.map((config) => {
						  xAxisData.push(config.name);
						  return {
							  name : config.name,
							  value: data[config.id],
						  }
					  });
				return {
					xAxisData,
					seriesData
				};
			},
			convertChartConfigcz(configList = []) {
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
			convertChartConfigczs(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
				configList.map((config) => {
					xAxisData.push(config.city_name);
					seriesData.push(config.sl)
				});
				return {
					xAxisData,
					seriesData
				};
			},
			loadCaizhengChart(data) {
				const isPC                      = this.screenType === 'pc';
				const { xAxisData, seriesData } = this.convertChartConfigczs(data.slice(0, isPC ? 32 : 15));
				this.caizhengChart.setOption({
					color  : ['#3398DB'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid   : {
						left        : '3%',
						right       : 50,
						bottom      : 20,
						containLabel: true
					},
					xAxis  : [
						{
							type     : 'category',
							data     : xAxisData,
							axisTick : {
								show: false
							},
							axisLabel: {
								show     : true,
								interval : '0',
								textStyle: {
									color: '#ffffff'
								},
								formatter: (name) => textFormatter(name, 4),
							},
							axisLine : {
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					yAxis  : [
						{
							name         : '万元',
							nameTextStyle: {
								color: '#fff'
							},
							type         : 'value',
							axisLine     : {
								show     : false,
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					series : [
						{
							type          : 'bar',
							barMaxWidth   : 30,
							data          : seriesData,
							barCategoryGap: 10,
							itemStyle     : {
								normal: {
									color: '#5C89FF'
								}
							}
						}
					]
				})
			},
			loadJingfeiChart() {
				let max  = this.jingfeiqingkuang.jcywfhj.reduce(function(a, b) {
					return b > a ? b : a;
				});
				let max1 = this.jingfeiqingkuang.bajf.reduce(function(a, b) {
					return b > a ? b : a;
				});
				let max2 = this.jingfeiqingkuang.ywzbjf.reduce(function(a, b) {
					return b > a ? b : a;
				});
				this.jingfeiChart.setOption({
					title  : {
						text     : '检察业务费合计',
						textStyle: {
							color   : '#0BB0FB',
							fontSize: 18,
						},
						left     : 'center',
						top      : 20,
					},
					color  : ["#0BB0FB", "rgba(86,199,60, 1)"],
					tooltip: {
						show    : true,
						trigger : "item",
						position: ['50%', '30%']
					},
					// legend: {
					// 	textStyle:{
					// 		color:'#fff'
					// 	},
					// 	data: ['检察业务费合计', '其中财政拨款']
					// },
					radar  : {
						center     : ["50%", "50%"],
						radius     : "50%",
						startAngle : 90,
						splitNumber: 4,
						shape      : "circle",
						splitArea  : {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel  : {
							show      : false,
							fontSize  : 20,
							color     : "#000",
							fontStyle : "normal",
							fontWeight: "normal"
						},
						axisLine   : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						splitLine  : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name       : {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth : 1,
							borderRadius: 0,
							textStyle   : {
								color: '#fff' // 文字颜色
							},
							rich        : {

								a: {
									color: '#00b7ee',

									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr : {
									borderColor: '#aaa',
									width      : '100%',
									borderWidth: 0.1,
									align      : 'left',
									height     : 1
								},
								b  : {
									color          : '#333',
									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',
									width          : '100%',
									align          : 'left',
									borderRadius   : 0
								},
								per: {
									color          : '#eee',
									backgroundColor: '#ffffff',
									borderWidth    : 0.5,
									borderRadius   : 0,
									borderColor    : '#fff',
								}
							}

						},
						indicator  : [{
							name: '年初结转结余',
							max : max,
							aaa : 'assdfasdf',

						}, {
							name: '收入\n合计',
							max : max,
							aaa : 'assdfasdf'
						}, {
							name: '支出合计',
							max : max,
							aaa : 'assdfasdf'
						}, {
							name: '年末结\n转结余',
							max : max,
							aaa : 'assdfasdf'
						}]
					},

					series: [{
						name      : "检察业务费合计",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						areaStyle : {
							normal: {
								color: "#0BB0FB"
							}
						},
						itemStyle : {
							color      : '#0BB0FB',
							borderColor: '#0BB0FB',
							borderWidth: 2,
						},
						lineStyle : {
							normal: {
								color: "#0BB0FB",
								width: 0.1
							}
						},
						data      : [
							this.jingfeiqingkuang.jcywfhj
						]
					}, {
						name      : "其中财政拨款",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						itemStyle : {
							normal: {
								color      : '#00ffff',
								borderColor: "#00ffff",
								borderWidth: 2
							}
						},
						areaStyle : {
							normal: {
								"color": "#00ffff"
							}
						},
						lineStyle : {
							normal: {
								color: "#00ffff",
								width: 0.1,
							}
						},
						data      : [
							this.jingfeiqingkuang.jcyw_czbk
						]
					}]
				});
				this.jingfeiChart1.setOption({
					title  : {
						text     : '办案业务（业务）经费',
						textStyle: {
							color: '#1BC85D',
						},
						left     : 'center',
						top      : 20,
					},
					tooltip: {
						show    : true,
						trigger : "item",
						position: ['50%', '30%']
					},
					// legend: {
					// 	textStyle:{
					// 		color:'#fff'
					// 	},
					// 	data: ['办案（业务）经费', '其中财政拨款']
					// },
					radar  : {
						center     : ["50%", "50%"],
						radius     : "50%",
						startAngle : 90,
						splitNumber: 4,
						shape      : "circle",
						splitArea  : {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel  : {
							show      : false,
							fontSize  : 20,
							color     : "#000",
							fontStyle : "normal",
							fontWeight: "normal"
						},
						axisLine   : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						splitLine  : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name       : {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth : 1,
							borderRadius: 0,
							textStyle   : {
								color: '#fff' // 文字颜色
							},
							rich        : {

								a: {
									color: '#00b7ee',

									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr : {
									borderColor: '#aaa',
									width      : '100%',
									borderWidth: 0.1,
									align      : 'left',
									height     : 1
								},
								b  : {
									color          : '#333',
									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',
									width          : '100%',
									align          : 'left',
									borderRadius   : 0
								},
								per: {
									color          : '#eee',
									backgroundColor: '#ffffff',
									borderWidth    : 0.5,
									borderRadius   : 0,
									borderColor    : '#fff',
								}
							}

						},
						indicator  : [{
							name: '年初结转结余',
							max : max1,
							aaa : 'assdfasdf',

						},
									  {
										  name: '收入\n合计',
										  max : max1,
										  aaa : 'assdfasdf'
									  },
									  {
										  name: '支出合计',
										  max : max1,
										  aaa : 'assdfasdf'
									  },
									  {
										  name: '年末结\n转结余',
										  max : max1,
										  aaa : 'assdfasdf'
									  },
						]
					},
					series : [{
						name      : "办案（业务）经费",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						areaStyle : {
							normal: {
								color: "#1BC85D"
							}
						},
						itemStyle : {
							color      : '#1BC85D',
							borderColor: '#1BC85D',
							borderWidth: 2,
						},
						lineStyle : {
							normal: {
								color: "#1BC85D",
								width: 0.1
							}
						},
						data      : [
							this.jingfeiqingkuang.bajf
						]
					}, {
						name      : "其中财政拨款",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						itemStyle : {
							normal: {
								color      : '#048B25',
								borderColor: "#048B25",
								borderWidth: 2
							}
						},
						areaStyle : {
							normal: {
								"color": "#048B25"
							}
						},
						lineStyle : {
							normal: {
								color: "#048B25",
								width: 0.1,
							}
						},
						data      : [
							this.jingfeiqingkuang.bajf_qzczbk
						]
					}]
				});
				this.jingfeiChart2.setOption({
					title  : {
						text     : '业务装备经费',
						textStyle: {
							color: '#FBBA18',
						},
						left     : 'center',
						top      : 20,
					},
					tooltip: {
						show    : true,
						trigger : "item",
						position: ['50%', '30%']
					},
					// legend: {
					// 	textStyle:{
					// 		color:'#fff'
					// 	},
					// 	data: ['业务装备经费', '其中财政拨款']
					// },
					radar  : {
						center     : ["50%", "50%"],
						radius     : "50%",
						startAngle : 90,
						splitNumber: 4,
						shape      : "circle",
						splitArea  : {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel  : {
							show      : false,
							fontSize  : 20,
							color     : "#000",
							fontStyle : "normal",
							fontWeight: "normal"
						},
						axisLine   : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						splitLine  : {
							show     : true,
							lineStyle: {
								type : "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name       : {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth : 1,
							borderRadius: 0,
							textStyle   : {
								color: '#fff' // 文字颜色
							},
							rich        : {

								a: {
									color: '#00b7ee',

									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr : {
									borderColor: '#aaa',
									width      : '100%',
									borderWidth: 0.1,
									align      : 'left',
									height     : 1
								},
								b  : {
									color          : '#333',
									lineHeight     : 25,
									padding        : [0, 0, 0, 8],
									height         : 25,
									backgroundColor: '#fff',
									width          : '100%',
									align          : 'left',
									borderRadius   : 0
								},
								per: {
									color          : '#eee',
									backgroundColor: '#ffffff',
									borderWidth    : 0.5,
									borderRadius   : 0,
									borderColor    : '#fff',
								}
							}

						},
						indicator  : [{
							name: '年初结转结余',
							max : max2,
							aaa : 'assdfasdf',

						}, {
							name: '收入\n合计',
							max : max2,
							aaa : 'assdfasdf'
						}, {
							name: '支出合计',
							max : max2,
							aaa : 'assdfasdf'
						}, {
							name: '年末结\n转结余',
							max : max2,
							aaa : 'assdfasdf'
						}]
					},
					series : [{
						name      : "业务装备经费",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						areaStyle : {
							normal: {
								color: "#FBBA18"
							}
						},
						itemStyle : {
							color      : '#FBBA18',
							borderColor: '#FBBA18',
							borderWidth: 2,
						},
						lineStyle : {
							normal: {
								color: "#FBBA18",
								width: 0.1
							}
						},
						data      : [
							this.jingfeiqingkuang.ywzbjf
						]
					}, {
						name      : "其中财政拨款",
						type      : "radar",
						symbol    : "circle",
						symbolSize: 2,
						itemStyle : {
							normal: {
								color      : '#F25F5F',
								borderColor: "#F25F5F",
								borderWidth: 2
							}
						},
						areaStyle : {
							normal: {
								"color": "#F25F5F"
							}
						},
						lineStyle : {
							normal: {
								color: "#F25F5F",
								width: 0.1,
							}
						},
						data      : [
							this.jingfeiqingkuang.ywzbjf_qzczbk
						]
					}]
				})
			},
			loadJianchaChart(data) {
				let sr               = [],
					zc               = [],
					year             = [];
				const yearCheckTrend = [];
				for(let i = 0; i < data.length; i++) {
					yearCheckTrend[i] = {
						year   : data[i].year,
						early  : this.formatNum(data[i].ncjzjy),
						yearEnd: this.formatNum(data[i].nmjzjy),
					};
					sr.push(data[i].sr);
					zc.push(data[i].zc);
					year.push(data[i].year);
				}
				this.yearCheckTrend = yearCheckTrend;
				this.jianchaChart.setOption({
					color  : ['#009FE8', '#9074FF'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow',
						}
					},
					legend : {
						data     : ['收入', '支出'],
						textStyle: {
							color: "#fff"
						},
						top      : '5%'
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '15%',
						containLabel: true
					},
					xAxis  : {
						type    : 'category',
						data    : year,
						axisLine: {
							lineStyle: {
								color: "#fff",
							}
						}
					},
					yAxis  : {
						name         : '万元',
						nameTextStyle: {
							color: '#fff'
						},
						type         : 'value',
						axisLine     : {
							show     : false,
							lineStyle: {
								color: "#fff",
							}
						}
					},
					series : [{
						name       : '收入',
						type       : 'bar',
						barMaxWidth: 20,
						data       : sr
					}, {
						name       : '支出',
						type       : 'bar',
						barMaxWidth: 20,
						data       : zc
					}]
				})
			},
			setDialogVisible(name) {
				this.dialogContext = {
					name: `${this.nowDate}年${name}`,
					key : name,
					data: this.financialAllocationList
				};
				this.dialogVisible = true;
			},
			loadDialogChart() {
				const { data: chartData }       = this.dialogContext,
					  { xAxisData, seriesData } = this.convertChartConfigczs(chartData);
				this.dialogBarChart             = ECharts.init(this.$refs.dialogChart);
				this.dialogBarChart.setOption({
					tooltip   : {
						show: false
					},
					legend    : {
						show: false
					},
					grid      : {
						top   : 30,
						left  : '3%',
						right : '3%',
						bottom: '20%',
					},
					calculable: true,
					xAxis     : {
						type     : 'category',
						axisTick : { show: false },
						data     : xAxisData,
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
							interval  : 0,
							formatter : (name) => textFormatter(name, 4),
						}
					},
					yAxis     : {
						name         : '万元',
						nameTextStyle: {
							color: '#fff'
						},
						type         : 'value',
						axisLine     : {
							lineStyle: {
								width: 2,
								color: '#31DBE8'
							}
						},
						splitLine    : {
							lineStyle: {
								color: 'rgba(216,216,216,0.4)'
							}
						},
						axisLabel    : {
							color: '#0ff',
						},
					},
					dataZoom  : this.screenType === 'pc' ? [{
						type          : 'slider',
						start         : 0,
						end           : 10 / xAxisData.length * 100 - 1,
						minValueSpan  : 10,
						maxValueSpan  : 10,
						bottom        : 0,
						dataBackground: {
							areaStyle: {
								color: '#5C89FF'
							}
						},
						borderColor   : 'transparent',
						textStyle     : {
							color: '#dfdfdf'
						}
					}, {
						type: 'inside'
					}] : undefined,
					series    : [
						{
							name       : '地区',
							type       : 'bar',
							data       : seriesData,
							barMaxWidth: 40,
							itemStyle  : {
								normal: {
									show : true,
									color: '#5C89FF'
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
			changeMask(target, status) {
				if(target == 'boxtooltip1') {
					this.boxtooltip1 = status
				} else if(target == 'boxtooltip2') {
					this.boxtooltip2 = status
				} else if(target == 'boxtooltip3') {
					this.boxtooltip3 = status
				}
			},
			formatNum,

			/**
			 * 支出数据分类
			 * */
			payDataClassify() {
				this.disFunctionList     = this.orderTopData(disFunctionConfig.map(i => ({
					...i,
					value: this.spendingDetail[i.id] || 0,
				})));
				this.expendNatureList    = this.orderTopData(expendNatureConfig.map(i => ({
					...i,
					value: this.spendingDetail[i.id] || 0,
				})));
				this.economyClassifyList = this.orderTopData(economyClassifyConfig.map(i => ({
					...i,
					value: this.spendingDetail[i.id] || 0,
				})));
			},
			orderTopData(list) {
				const data         = list.sort((a, b) => b.value - a.value),
					  topThreeList = data.splice(0, 3),
					  surplusTotal = data.reduce((a, b) => a + Number(b.value), 0);
				return [...topThreeList, {
					name : '其他',
					value: surplusTotal.toFixed(2)
				}];
			},
		},
		components: {
			PayPie,
		},
		props     : {
			income                         : {
				default: {}
			},
			expenditure                    : {
				default: {}
			},
			financialAllocationList        : {
				default: []
			},
			jingfeiqingkuang               : {
				default: {}
			},
			trendsProcuratorialBusinessList: {
				default: []
			},
			spendingDetail                 : {
				default: {}
			},
			nowDate                        : {
				default: 2018
			},
			screenType                     : {
				default: 'pc'
			}
		},
		watch     : {
			spendingDetail() {
				this.payDataClassify();
			}
		},
	};
</script>

<style lang="scss">
    .payBox-popover {
        background-image: linear-gradient(top, #091e5f, #01040b);
        color: #dfdfdf;
        border: 0;
        .popper__arrow {
            &::after {
                border-bottom-color: #091e5f !important;
            }
        }
    }

    .pro-trend-table {
        background: rgba(0, 10, 19, 0.8);
        border: 1px solid rgba(4, 225, 193, 1);
        .el-table {
            background-color: transparent;
            &:before {
                display: none;
            }
            th,
            tr {
                background-color: transparent;
                color: #fff;
            }
            .el-table__row {
                background-color: transparent;
                color: #fff;
                &:hover {
                    & > td {
                        background-color: transparent;
                    }
                }
            }
            td {
                border-bottom-color: #04E1C1;
            }
            th.is-leaf {
                border-bottom-color: #04E1C1;
            }
        }
    }

    .JianWu-left-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .fraze-grid {
            width: 100%;
            .income-box {
                min-width: 466px;
                flex: 1;
                .income-content {
                    width: 100%;
                    height: 261px;
                    margin: 0 auto;
                }
            }
            .pay-box {
                flex: 2;
                position: relative;
                .pay-head{
                    height: 30px;
                    line-height: 30px;
                    padding: 0 30px;
                    .unit {
                        float: right;
                        color: #FBBA18;
                    }
                }
                .pay-content {
                    width: 100%;
                    height: 261px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .caizheng-box {
            width: 100%;
            position: relative;
            .caizheng-content {
                width: 100%;
                height: 280px;
                margin: 0 auto;
            }
            .more-btn {
                color: #FBBA18;
                position: absolute;
                right: 20px;
                top: 30px;
                margin-top: 17px;
                text-align: right;
                font-size: 16px;
                color: rgba(251, 186, 24, 1);
                line-height: 17px;
                cursor: pointer;
                z-index: 1;
            }
        }
        .fraze-grid {
            width: 100%;
            .jingfei-box {
                flex: 739;
                position: relative;
                .unit {
                    position: absolute;
                    right: 20px;
                    top: 45px;
                    color: #FBBA18;
                }
                .jingfei-content {
                    width: 30%;
                    height: 292px;
                    float: left;
                }
            }
            .jiancha-box {
                flex: 514;
                position: relative;
                .unit {
                    position: absolute;
                    right: 20px;
                    top: 45px;
                    color: #FBBA18;
                    z-index: 10;
                }
                .jiancha-content {
                    width: 100%;
                    height: 292px;
                }
                .more-area {
                    position: absolute;
                    bottom: 20px;
                    right: 10px;
                    z-index: 10;
                }
            }
        }
        .per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>