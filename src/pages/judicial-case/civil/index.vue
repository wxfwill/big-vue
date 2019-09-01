<template>
    <div>
        <judicial-title title="民事"></judicial-title>
        <div class="outer-civil-page">
            <div class="civil-page-left">
                <div class="business-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>基本业务情况</i>
                    </div>
                    <ul class="business-list">
                        <li v-for="item in businessList" :key="item.id">
                            <div class="business-number"
                                 :style="{ borderColor: item.color, boxShadow: `0 0 10px 1px ${item.color} inset, 0 0 10px 1px ${item.color}`, color: item.color }">
                                {{item.value || 0}}
                            </div>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="judgment-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>生效裁判监督</i>
                    </div>
                    <ul class="judgment-list">
                        <li v-for="item in judgmentList" :key="item.id">
                            <span class="judgment-item-title">{{item.title}}</span>
                            <p class="judgment-item-line"></p>
                            <span class="judgment-item-number">{{ item.value || 0 }}</span>
                        </li>
                    </ul>
                </div>
                <div class="execute-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>执行活动监督</i>
                    </div>
                    <div class="execute-chart-group">
                        <div class="execute-chart">
                            <p class="ec-chart-title">受理数</p>
                            <p class="ec-chart-num">{{ reviewCase.sljs }}</p>
                            <div ref="conclude" :style="{width: '335px', height: '300px'}"></div>
                        </div>
                        <div class="execute-chart">
                            <p class="ec-chart-title">提出检察建议数</p>
                            <p class="ec-chart-num">{{ reviewCase.tcjcjys }}</p>
                            <div ref="accept" :style="{width: '335px', height: '300px'}"></div>
                        </div>
                    </div>
                </div>
                <div class="break-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>违法行为监督</i>
                    </div>
                    <div class="break-content">
                        <div class="break-number">
                            <p>办结率：{{ illegalBehavior.bjl }}%</p>
                            <p>建议采纳率：{{ (illegalBehavior.fycnjcjys/illegalBehavior.tcjcjys * 100).toFixed(2) }}%</p>
                        </div>
                        <div ref="illegalBehaviorChart" class="break-chart"></div>
                    </div>
                </div>
            </div>
            <div class="civil-page-content">
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
            <div class="civil-page-right">
                <div class="sort-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>民事各类案件情况</i>
                    </div>
                    <div class="table-head">
                        <span>占比</span>
                        <span>件数</span>
                    </div>
                    <ul class="causes-list">
                        <li v-for="(item, index) in causesNowPageList" :key="index">
                            <i :style="{ backgroundColor: (causesNowPage === 1 && index < 3) ? '#F7931E' : '#00BEDD' }">{{index+1}}</i>
                            <div class="causes-item-ctx" :style="{backgroundImage:'url('+lineImg+')'}">
                                <span class="causes-item-name text-ellipsis">{{item.ay_name }}</span>
                                <div class="causes-item-data"
                                     :style="{ color: (causesNowPage === 1 && index < 3) ? '#F7931E' : '#00BEDD' }">
                                    <span>{{item.zb}}%</span>
                                    <span>{{item.cs }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="picker-btn-group">
                        <i class="fchc-btn fchc-icon el-icon-arrow-left" @click="causesPageChange('sub')"></i>
                        <p class="fchc-btn fchc-block pagination">{{ causesNowPage }} / {{ causesTotalPage }}</p>
                        <i class="fchc-btn fchc-icon el-icon-arrow-right" @click="causesPageChange('add')"></i>
                    </div>
                </div>
                <div class="day-box">
                    <div class="file-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案均办理天数</i>
                        </div>
                        <div class="file-content">
                            <div ref="fileChart" :style="{width:'490px',height:'220px'}"></div>
                            <p class="more-text-btn" @click="setDialogVisible('案均办结天数')">更多>></p>
                        </div>
                    </div>
                    <div class="capita-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>人均办结数</i>
                        </div>
                        <div class="capita-content">
                            <div ref="capitaChart" :style="{width:'490px',height:'280px'}"></div>
                            <p class="more-text-btn" @click="setDialogVisible('人均办结数')">更多>></p>
                        </div>
                    </div>
                </div>
                <div class="civil-trend">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>案件受理趋势</i>
                    </div>
                    <div ref="civilTrendChart" class="civil-trend-chart"></div>
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
	import { mapGetters, mapActions }                                           from 'vuex';
	import ECharts                                                              from 'echarts';
	import * as services                                                        from './service';
	import { verifyTriggerState, fillZero, textFormatter }                      from '@/utlis/helper';
	import BjMap                                                                from '@/components/common/map/index';
	import { businessConfigList, effectiveSupervisionConfig, mapTooltipConfig } from './constant';
	import JudicialTitle from '@/components/judicial-case/judicial-case-title';

	export default {
		data() {
			return {
				reviewCase            : {},//执行活动监督
				illegalBehavior       : {},//违法行为监督
				causesOfCivilCasesList: [],//民事案件案由发生次数排序
				casesAreHandledList   : [],//案均办理天数
				perCapitaHandlingList : [],
				businessList          : businessConfigList,
				judgmentList          : effectiveSupervisionConfig,
				lineImg               : require('@/public/img/judicature/line.png'),
				totalSls              : [0, 0, 0, 0],
				totalBjs              : [0, 0, 0, 0],
				totalZbs              : [0, 0, 0, 0],
				sls                   : 0,
				bjs                   : 0,
				zbs                   : 0,
				mapList               : [],
				mapTooltipConfig,
				dialogTitle           : '全国数据统计表',
				showMapData           : false,
				causesNowPage         : 1,
				causesTotalPage       : 0,
				dialogVisible         : false,
				dialogContext         : {
					name: '',
					key : '',
					data: []
				},
			}
		},
		computed  : {
			causesNowPageList() {
				const sliceIndex = (this.causesNowPage - 1) * 10;
				return this.causesOfCivilCasesList.slice(sliceIndex, sliceIndex + 10);
			},
			...mapGetters('civil', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params = { ...this.mapCode, ...this.dateSection };

			this.oldTriggerState      = params;
			this.concludeChart        = ECharts.init(this.$refs.conclude);
			this.acceptChart          = ECharts.init(this.$refs.accept);
			this.illegalBehaviorChart = ECharts.init(this.$refs.illegalBehaviorChart);
			this.fileChart            = ECharts.init(this.$refs.fileChart);
			this.capitaChart          = ECharts.init(this.$refs.capitaChart);
			this.civilTrendChart      = ECharts.init(this.$refs.civilTrendChart);

			this.requestCivilData(params);
			this.requestEffectiveSupervision(params);
			this.requestMapData(params);
			this.requestMapHeadData(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestCivilData(params);
				this.requestEffectiveSupervision(params);
				this.requestMapData(params);
				this.requestMapHeadData(params);
			}
		},
		methods   : {
			async requestCivilData(params) {
				const res = await services.getCivilData(params);
				if(res.code === 200) {
					const {
							  basicBusiness, reviewCase, illegalBehavior,
							  casesAreHandledList, perCapitaHandlingList,
							  acceptingCasesTrendAnalysisList
						  }                    = res.data;
					this.businessList          = businessConfigList.map((i) => ({
						...i,
						value: basicBusiness[i.id]
					}));
					this.reviewCase            = reviewCase;
					this.illegalBehavior       = illegalBehavior;
					this.casesAreHandledList   = casesAreHandledList;
					this.perCapitaHandlingList = perCapitaHandlingList;
					this.loadConcludeChart();
					this.loadAcceptChart();
					this.loadIllegalBehaviorChart();
					this.loadFileChart(casesAreHandledList.slice(0, 6));
					this.loadPerCapitaSettlementChart(perCapitaHandlingList.slice(0, 6));
					this.loadAcceptingCasesTrendAnalysis(acceptingCasesTrendAnalysisList);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestEffectiveSupervision(params) {
				const res = await services.getEffectiveSupervision(params);
				if(res.code === 200) {
					const data        = res.data;
					this.judgmentList = effectiveSupervisionConfig.map(i => ({
						...i,
						value: data[i.id]
					}))
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestMapData(params) {
				const res = await services.getCivilDataTwo(params);
				if(res.code === 200) {
					const { mapSlBjZb: { bjs, sls, zbs }, theMapList, causesOfCivilCasesList } = res.data;
					this.sls                                                                   = sls;
					this.bjs                                                                   = bjs;
					this.zbs                                                                   = zbs;
					this.mapList                                                               = theMapList;
					this.causesNowPage                                                         = 1;
					this.causesTotalPage                                                       = Math.ceil(causesOfCivilCasesList.length / 10);
					this.causesOfCivilCasesList                                                = causesOfCivilCasesList;
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestMapHeadData(params) {
				const res = await services.getTopSlBjZb(params);
				if(res.code === 200) {
					const data    = res.data;
					this.totalSls = `${fillZero(data.slzs, 4)}`.split('');
					this.totalBjs = `${fillZero(data.bjzs, 4)}`.split('');
					this.totalZbs = `${fillZero(data.zbzs, 4)}`.split('');
				} else {
					this.$message.error(res.msg);
				}
			},
			// 违法行为监督
			loadIllegalBehaviorChart() {
				const { bjs, fycnjcjys, sls, tcjcjys } = this.illegalBehavior;
				this.illegalBehaviorChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter  : (params) => {
							let str = `${params[0].axisValue}<br/>`;
							params.forEach(i => {
								str += `${i.marker}  ${i.name}: ${i.value}<br/>`;
							});
							return str;
						}
					},
					grid   : {
						left        : '5%',
						right       : '8%',
						top         : '8%',
						bottom      : '3%',
						containLabel: true
					},
					xAxis  : {
						type     : 'category',
						data     : ['受理', '建议'],
						axisTick : {
							show: false
						},
						axisLine : {
							lineStyle: {
								color: '#00FFFF'
							},
						},
						axisLabel: {
							color: '#fff'
						},
					},
					yAxis  : {
						name         : '件数',
						type         : 'value',
						nameTextStyle: {
							color: '#fff'
						},
						axisTick     : {
							show: false
						},
						axisLine     : {
							lineStyle: {
								color: '#00FFFF'
							},
						},
						axisLabel    : {
							color: '#fff'
						},
						splitLine    : {
							lineStyle: {
								type : 'dashed',
								color: '#C1C1C1'
							}
						}
					},
					series : [{
						name    : '受理',
						type    : 'bar',
						barWidth: 20,
						data    : [{
							name     : '受理数',
							value    : sls,
							itemStyle: {
								color: '#FF6C40'
							}
						}, {
							name     : '办结数',
							value    : bjs,
							itemStyle: {
								color: '#1DB0F3'
							}
						}]
					}, {
						name    : '建议',
						type    : 'bar',
						barWidth: 20,
						data    : [{
							name     : '提出检察建议数',
							value    : tcjcjys,
							itemStyle: {
								color: '#FBBA18'
							}
						}, {
							name     : '采纳检察建议数',
							value    : fycnjcjys,
							itemStyle: {
								color: '#1BC85D'
							}
						}]
					}]
				});
			},
			// 案均办结数
			loadFileChart(chartData) {
				const { axisData, seriesData } = this.convertBarData(chartData, 'ajblts');
				this.fileChart.setOption({
					color  : ['#009FE8'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						left  : '15%',
						right : '10%',
						bottom: '10%',
						top   : "2%",
					},
					legend : {
						show: false
					},
					xAxis  : {
						type         : 'value',
						name         : '天数',
						nameTextStyle: {
							padding: [30, 0, 0, 5],
							color  : '#fff'
						},
						splitLine    : {
							show: false
						},
						axisLine     : {
							lineStyle: {
								color: '#00FFFF'
							}
						},
						axisLabel    : {
							show     : true,
							textStyle: {
								fontSize: 14,
								color   : '#fff'
							},
						},
						axisTick     : {
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
								color: '#00FFFF'
							}
						},
						axisTick : {
							show: false
						}
					},
					series : [
						{
							name     : '案均办结数',
							type     : 'bar',
							barWidth : 22,
							data     : seriesData,
							itemStyle: {
								color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
									offset: 0,
									color : '#1783E5'
								}, {
									offset: 1,
									color : '#18CBFF'
								}]),
							}
						}
					]
				})
			},

			// 人均办结天数
			loadPerCapitaSettlementChart(chartData) {
				const { axisData, seriesData } = this.convertBarData(chartData, 'rjbjs');
				this.capitaChart.setOption({
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
							name    : '人均办结数',
							type    : 'bar',
							barWidth: 22,
							data    : seriesData,

						}
					]
				})
			},

			// 执行活动监督 左饼图
			loadConcludeChart() {
				const { sljs, bjjs } = this.reviewCase;
				this.concludeChart.setOption({
					color  : ['#2BD4EA', '#FBBA18'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						show: false,
					},
					series : [{
						name  : '受理案件数统计',
						type  : 'pie',
						radius: '65%',
						center: ['50%', '51%'],
						label : {
							show     : true,
							formatter: '{c}',
							rich     : {
								a: {
									align: 'center'
								}
							}
						},
						data  : [{
							value: sljs - bjjs,
							name : '在办数'
						}, {
							value: bjjs,
							name : '办结数'
						}]
					}]
				});
			},
			// 执行活动监督 右饼图
			loadAcceptChart() {
				const { cnjcjys, tcjcjys } = this.reviewCase;
				this.acceptChart.setOption({
					color  : ['#1DB0F3', '#FF6C40'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						show: false,
					},
					series : [{
						name      : '提出检察建议数',
						type      : 'pie',
						radius    : '65%',
						center    : ['50%', '51%'],
						startAngle: 310,
						label     : {
							show     : true,
							formatter: '{c}',

						},
						data      : [{
							value: cnjcjys,
							name : '采纳建议数',
						}, {
							value: tcjcjys - cnjcjys,
							name : '未采纳建议数'
						}]
					}]
				});
			},

			loadAcceptingCasesTrendAnalysis(chartData) {
				this.civilTrendChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'cross',
						}
					},
					color  : ["#0080ff"],
					grid   : {
						left        : '5px',
						top         : '30px',
						right       : '50px',
						bottom      : '10px',
						containLabel: true
					},
					xAxis  : {
						type         : 'category',
						name         : '（年）',
						nameTextStyle: {
							padding: [10, 0, 0]
						},
						data         : chartData.map(i => i.year),
						axisLabel    : {
							show     : true,
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
							show     : true,
							lineStyle: {
								color: '#2EA7E0',
								width: 1,
							}
						}
					},
					yAxis  : {
						type         : 'value',
						name         : '(件)',
						nameTextStyle: {
							padding: [0, 0, 0, -15]
						},
						axisLine     : {
							show     : true,
							onZero   : false,
							lineStyle: {
								color: '#2EA7E0',
								width: 1,
							}
						},
						axisTick     : {
							show: false,
						},
						axisLabel    : {
							formatter: function(val) {
								return val;
							},
							show     : true,
							textStyle: {
								color: 'rgba(255,255,255,1)' //字体颜色
							}
						},
						splitLine    : { //保留网格线
							show     : false,
							lineStyle: { //y轴网格线设置
								color: '#0a2b52',
								width: 1,
								type : 'solid'
							}
						},
					},
					series : [{
						name  : '件数',
						type  : 'line',
						smooth: true,
						symbolSize : 5,
                        label : {
							show : true,
                            position : 'top',
                            color: '#31DBE8'
                        },
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
						areaStyle : {
							normal: {}
						},
						data      : chartData.map(i => i.sls),
					}]
				})
			},

			causesPageChange(type) {
				switch(type) {
					case 'add' : {
						if(this.causesNowPage < this.causesTotalPage) {
							this.causesNowPage++;
						}
					}
						break;
					case 'sub' : {
						if(this.causesNowPage > 1) {
							this.causesNowPage--;
						}
					}
						break;
				}
			},
			setDialogVisible(name) {
				let data = [],
					key  = '';
				switch(name) {
					case '人均办结数' :
						key  = 'rjbjs';
						data = this.perCapitaHandlingList;
						break;
					case '案均办结天数':
						key  = 'ajblts';
						data = this.casesAreHandledList;
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
							  value: i[key]
						  }
					  });
				return {
					axisData,
					seriesData
				};
			},
			...mapActions('civil', ['initMapState']),
			...mapActions('civil', ['setMapData']),
		},
		destroyed() {
			this.initMapState();
		},
		components: {
			BjMap,
			JudicialTitle,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-civil-page {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        .civil-page-left {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 1310px;
            position: relative;
            .business-box {
                margin-bottom: 20px;
                width: 698px;
                .business-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    li {
                        width: 33.33%;
                        align-items: center;
                        margin: 25px 0 0 0;
                        text-align: center;
                        .business-number {
                            width: 125px;
                            height: 125px;
                            margin: 0 auto;
                            line-height: 115px;
                            font-size: 20px;
                            border: 5px solid;
                            border-radius: 50%;
                        }
                        p {
                            margin-top: 16px;
                            font-size: 16px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }
            .judgment-box {
                width: 593px;
                .judgment-list {
                    padding: 0 20px;
                    li {
                        display: flex;
                        align-items: center;
                        height: 66px;
                        font-size: 18px;
                        .judgment-item-title {
                            width: 150px;
                            text-align: right;
                            font-family: Helvetica;
                            font-weight: 400;
                            color: rgba(0, 255, 255, 1);
                        }
                        .judgment-item-line {
                            width: 240px;
                            max-width: 240px;
                            height: 12px;
                            border-radius: 8px;
                            background: linear-gradient(to right, #3CEEFF, #09A6E6);
                            margin: 0 19px 0 30px;
                        }
                        .judgment-item-number {
                            font-size: 18px;
                            font-family: Helvetica;
                            color: rgba(255, 255, 255, 1);
                            line-height: 22px;
                        }
                    }
                }
            }
            .execute-box {
                width: 670px;
                .execute-chart-group {
                    display: flex;
                    justify-content: space-between;
                    font-size: 20px;
                    margin-top: 32px;
                    .execute-chart {
                        flex: 1;
                        text-align: center;
                        .ec-chart-title {
                            color: #FFFFFF;
                        }
                        .ec-chart-num {
                            margin: 15px 0;
                            color: rgba(5, 170, 255, 1);
                            line-height: 23px;
                        }
                    }
                }
            }
            .break-box {
                width: 593px;
                height: 430px;
                position: relative;
                .break-content {
                    padding-left: 10px;
                    position: relative;
                    font-size: 14px;
                    color: rgba(247, 147, 30, 1);
                    .break-number {
                        margin: 20px 0 20px;
                        display: flex;
                        justify-content: space-around;
                        color: #dfdfdf;
                    }
                    .break-chart {
                        width: 590px;
                        height: 340px;
                        margin-left: 0;
                    }
                }
                .lagend {
                    width: 310px;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 1);
                    display: flex;
                    position: absolute;
                    bottom: 15px;
                    left: 130px;
                    justify-content: space-between;
                    p {
                        display: flex;
                        align-items: center;
                    }
                    p:nth-of-type(1), p:nth-of-type(3) {
                        margin-bottom: 15px;
                    }
                    span {
                        width: 14px;
                        height: 14px;
                    }
                    .span1 {
                        background-color: #F7931E;
                    }
                    .span2 {
                        background-color: #31DBE8;
                    }
                    .span3 {
                        background-color: #A920E2;
                    }
                    .span4 {
                        background-color: #2FE0BE
                    }
                }
            }
        }
        .civil-page-content {
            width: 1211px;
            min-width: 1230px;
            height: 950px;
        }
        .civil-page-right {
            display: flex;
            flex-wrap: wrap;
            width: 1250px;
            margin-left: 20px;
            .sort-box {
                width: 655px;
                .table-head {
                    margin: 11px 40px 10px 0;
                    text-align: right;
                    font-size: 12px;
                    color: rgba(0, 255, 255, 1);
                    text-align: right;
                    span {
                        display: inline-block;
                        width: 135px;
                    }
                }
                .causes-list {
                    width: 600px;
                    height: 480px;
                    margin: 0 auto;
                    li {
                        display: flex;
                        align-items: center;
                        i {
                            display: inline-block;
                            width: 19px;
                            height: 19px;
                            text-align: center;
                            line-height: 19px;
                            border-radius: 50%;
                            margin-right: 10px;
                            margin-top: -21px;
                            font-size: 10px;
                            color: rgba(255, 255, 255, 1);
                        }
                        .causes-item-ctx {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            height: 37px;
                            padding-bottom: 13px;
                            margin-bottom: 10px;
                            background-repeat: no-repeat;
                            background-position: left bottom;
                            .causes-item-name {
                                width: 180px;
                                color: #FFFFFF;
                            }
                            .causes-item-data {
                                margin-right: 20px;
                                span {
                                    display: inline-block;
                                    min-width: 120px;
                                    text-align: right;
                                }
                            }
                        }
                    }
                }
                .picker-btn-group {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 10px;
                    margin-right: 40px;
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
            .day-box {
                margin-left: 20px;
                width: 546px;
                .file-box {
                    width: 100%;
                    .file-content {
                        display: flex;
                        margin: 20px 0;
                        p {
                            width: 60px;
                            color: #F7931E;
                        }
                    }
                }
                .capita-box {
                    width: 100%;
                    height: 298px;
                    .capita-content {
                        display: flex;
                        margin-top: 20px;
                    }
                }

            }
            .civil-trend {
                width: 1223px;
                margin-top: 20px;
                .civil-trend-chart {
                    width: 1200px;
                    height: 227px;
                    margin: 20px auto;
                }
            }
        }
    }
</style>
