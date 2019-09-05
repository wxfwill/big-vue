<template>
    <div class="home-page-left">
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
                <div class="pay-content">
                    <p class='unit'>单位:万元</p>
                    <div class="payBox">
                        <div class="boxborder">
                            <div class='payBox-top'>
                                <p>{{formatNum(expenditure.zzcs)}}</p>
                                <p>
                                    同比
                                    <i class="el-icon-top"></i>{{expenditure.zzc_tb}}<br><span>{{expenditure.zzc_bfb}}%</span>
                                </p>
                            </div>
                        </div>
                        <div class='payBox-bottom'>总支出</div>
                    </div>
                    <div class="payBox">
                        <div class="boxborder">
                            <div class='payBox-top' @mouseover="changeMask('boxtooltip1',true)"
                                 @mouseout="changeMask('boxtooltip1',false)">
                                <p>{{formatNum(expenditure.gnflzcs)}}</p>
                                <p>同比<i class="el-icon-top"></i>{{expenditure.gnflzc_tb}}<br><span>{{expenditure.gnflzc_bfb}}%</span>
                                </p>
                            </div>
                            <div class='boxtooltip' v-show='boxtooltip1'>
                                <p>一般公共服务支出：{{formatNum(spendingDetail.yybggfwzc)}}</p>
                                <p>外交支出：{{formatNum(spendingDetail.ewjzc)}}</p>
                                <p>国防支出：{{formatNum(spendingDetail.sgfzc)}}</p>
                                <p>公共安全支出：{{formatNum(spendingDetail.sggaqzc)}}</p>
                                <p>教育支出：{{formatNum(spendingDetail.wjyzc)}}</p>
                                <p>科学技术支出：{{formatNum(spendingDetail.lkxjzzc)}}</p>
                                <p>文化体育与传媒支出：{{formatNum(spendingDetail.qwhtyycmzc)}}</p>
                                <p>社会保障和就业支出：{{formatNum(spendingDetail.bshbzhjyzc)}}</p>
                                <p>医疗卫生与计划生育支出：{{formatNum(spendingDetail.jylwsyjhsyzc)}}</p>
                                <p>节能环保支出：{{formatNum(spendingDetail.sjnhbzc)}}</p>
                                <p>城乡社区支出：{{formatNum(spendingDetail.sycxsqzc)}}</p>
                                <p>农林水支出：{{formatNum(spendingDetail.senlszc)}}</p>
                                <p>交通运输支出：{{formatNum(spendingDetail.ssjtyszc)}}</p>
                                <p>资源勘探信息等支出：{{formatNum(spendingDetail.sszyktxxdzc)}}</p>
                                <p>商业服务业等支出：{{formatNum(spendingDetail.swsyfwydzc)}}</p>
                                <p>金融支出：{{formatNum(spendingDetail.sljrzc)}}</p>
                                <p>援助其他地区支出：{{formatNum(spendingDetail.sqyzqtdqzc)}}</p>
                                <p>国土海洋气象等支出：{{formatNum(spendingDetail.sbgthyqxdzc)}}</p>
                                <p>住房保障支出：{{formatNum(spendingDetail.sjzfbzzc)}}</p>
                                <p>粮油物资储备支出：{{formatNum(spendingDetail.eslywzcbzc)}}</p>
                                <p>其他支出：{{formatNum(spendingDetail.esyqtzc)}}</p>
                                <p>债务还本支出：{{formatNum(spendingDetail.esezwhbzc)}}</p>
                                <p>债务付息支出：{{formatNum(spendingDetail.esszwfxzc)}}</p>
                            </div>
                        </div>
                        <div class='payBox-bottom'>功能分类支出</div>
                    </div>
                    <div class="payBox">
                        <div class="boxborder">
                            <div class='payBox-top' @mouseover="changeMask('boxtooltip2',true)"
                                 @mouseout="changeMask('boxtooltip2',false)">
                                <p>{{formatNum(expenditure.zcxzs)}}</p>
                                <p>
                                    同比<i
                                        class="el-icon-top"></i>{{expenditure.zcxz_tb}}<br><span>{{expenditure.zcxz_bfb}}%</span>
                                </p>
                            </div>
                            <div class='boxtooltip' v-show='boxtooltip2'>
                                <p>基本支出：{{formatNum(spendingDetail.yjbzc)}}</p>
                                <p>人员经费：{{formatNum(spendingDetail.ryjf)}}</p>
                                <p>日常公用经费：{{formatNum(spendingDetail.rcgyjf)}}</p>
                                <p>项目支出：{{formatNum(spendingDetail.exmzc)}}</p>
                                <p>基本建设类项目：{{formatNum(spendingDetail.jbjslxm)}}</p>
                                <p>行政事业类项目：{{formatNum(spendingDetail.xzsylxm)}}</p>
                                <p>上缴上级支出：{{formatNum(spendingDetail.ssjsjzc)}}</p>
                                <p>经营支出：{{formatNum(spendingDetail.sjyzc)}}</p>
                                <p>对附属单位补助支出：{{formatNum(spendingDetail.wdfsdwbzzc)}}</p>
                            </div>
                        </div>
                        <div class='payBox-bottom'>支出性质</div>
                    </div>
                    <div class="payBox">
                        <div class="boxborder">
                            <div class='payBox-top' @mouseover="changeMask('boxtooltip3',true)"
                                 @mouseout="changeMask('boxtooltip3',false)">
                                <p>{{formatNum(expenditure.zcjjfls)}}</p>
                                <p>同比<i class="el-icon-top"></i>{{expenditure.zcjjfl_tb}}<br><span>{{expenditure.zcjjfl_bfb}}%</span>
                                </p>
                            </div>
                            <div class="boxtooltip" v-show='boxtooltip3'>
                                <p>基本支出和项目支出合计：{{formatNum(spendingDetail.jbzchxmzchj)}}</p>
                                <p>工资福利支出：{{formatNum(spendingDetail.gzflzc)}}</p>
                                <p>商品和服务支出：{{formatNum(spendingDetail.sphfwzc)}}</p>
                                <p>对个人和家庭的补助：{{formatNum(spendingDetail.dgrhjtdbz)}}</p>
                                <p>债务利息及费用支出：{{formatNum(spendingDetail.zwlxjfyzc)}}</p>
                                <p>资本性支出（基本建设）：{{formatNum(spendingDetail.zbxzcJbjs)}}</p>
                                <p>资本性支出：{{formatNum(spendingDetail.zbxzc)}}</p>
                                <p>对企业补助（基本建设）：{{formatNum(spendingDetail.dqybzJbjs)}}</p>
                                <p>对企业补助：{{formatNum(spendingDetail.dqybz)}}</p>
                                <p>对社会保障基金补助：{{formatNum(spendingDetail.dshbzjjbz)}}</p>
                                <p>其他支出：{{formatNum(spendingDetail.qtzc)}}</p>
                            </div>
                        </div>
                        <div class='payBox-bottom'>支出经济分类</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="caizheng-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>财政拨款收入分布</i>
            </div>
            <p class='more-btn' @click="setDialogVisible('财政拨款收入分布')">更多>></p>
            <div class="caizheng-content" ref="caizhengChart"></div>
        </div>
        <div class="fraze-grid">
            <div class="jingfei-box">
                <div class="chart-box-title">
                    <span class="chart-label-dot"></span>
                    <i>经费情况</i>
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
	import * as services                                                   from '../service/index';
	import { verifyTriggerState, numberInteger, textFormatter, formatNum } from '@/utlis/helper';
	import { incomeChartConfig, caizhengChartConfig }                      from '../constant/index';

	export default {
		data() {
			return {
				dialogVisible : false,
				dialogContext : {
					name: '',
					key : '',
					data: []
				},
				// caizhengChartConfig:caizhengChartConfig
				boxtooltip1   : false,
				boxtooltip2   : false,
				boxtooltip3   : false,
				yearCheckTrend: [],
			}
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
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
						right    : 0,
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
						left     : 270,
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
						center   : ['35%', '60%'],
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
				const { xAxisData, seriesData } = this.convertChartConfigczs(data.slice(0, 10));
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
						right       : '10%',
						bottom      : '3%',
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
							type       : 'bar',
							barMaxWidth: 40,
							data       : seriesData,
							itemStyle  : {
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

		},
		components: {},
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
			}
		},
	};
</script>

<style lang="scss" scoped>
    .home-page-left {
        width: 1234px;
        display: flex;
        flex-wrap: wrap;
        .income-box {
            width: 466px;
            .income-content {
                width: 100%;
                height: 261px;
                margin: 0 auto;
            }
        }
        .pay-box {
            width: 806px;
            .pay-content {
                width: 90%;
                height: 261px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                position: relative;
                .unit {
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #FBBA18;
                }
                .payBox {
                    width: 160px;
                    margin-top: 29px;
                    margin-right: 24px;
                    .boxborder {
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        box-sizing: border-box;
                        padding: 14px;
                        background-image: -webkit-linear-gradient(top, #01AFFF, #005FE8);
                        position: relative;
                        .boxtooltip {
                            position: absolute;
                            width: 400px;
                            height: auto;
                            color: #fff;
                            background: rgba(3, 196, 195, 0.9);
                            box-shadow: 0px 2px 4px 0px rgba(13, 61, 137, 0.5);
                            border-radius: 4px;
                            left: 70%;
                            top: 70%;
                            text-align: left;
                            padding: 8px;
                            line-height: 20px;
                            z-index: 999;
                        }
                    }
                    .payBox-top {
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        border-radius: 50%;
                        padding-top: 30px;
                        background: #04092A;
                        p {
                            color: #00FFF8;
                            padding-bottom: 14px;
                            span {
                                color: #FF6C40;
                                padding-left: 40px;
                            }
                        }
                        p:first-child {
                            font-size: 18px;
                        }
                    }
                    .payBox-bottom {
                        width: 160px;
                        color: #fff;
                        text-align: center;
                        margin-top: 13px;
                    }
                }
                .payBox:last-child {
                    margin-right: 0px;
                }
            }
        }
        .caizheng-box {
            width: 1234px;
            position: relative;
            .caizheng-content {
                width: 100%;
                height: 247px;
                margin: 0 auto;
            }
            .more-btn {
                color: #FBBA18;
                position: absolute;
                right: 0;
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
        .jingfei-box {
            width: 739px;
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
            width: 514px;
            position: relative;
            .unit {
                position: absolute;
                right: 10px;
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
        .per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>