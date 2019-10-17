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
                        :lev="mapCode.lev"
                        :code="mapCode.code"
                        defaultCode="100000"
                        :topDataConfig="topDataConfig"
                        :topData="{ totalSls, totalBjs, totalZbs }"
                        :leftDataConfig="leftSideList"
                        :leftData='{ sls, bjs, zbs }'
                        :extraCityColumn="mapTableConfig"
                        highProcuratorCode="100000"
                        :nowSelectDate="dateSection"
                        :mapLineLegend="mapLineLegend"
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
                            <i>复查纠正</i>
                        </div>
                        <div ref="reviewCorrectiveChart" :style="{width:'100%',height:'280px'}"></div>
                    </div>
                    <div class="capita-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>跟进监督</i>
                        </div>
                        <div ref="followupSupChart" :style="{width:'100%',height:'280px'}"></div>
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
    </div>
</template>
<script>
	import { mapGetters, mapActions }                      from 'vuex';
	import ECharts                                         from 'echarts';
	import * as services                                   from './service';
	import { verifyTriggerState, fillZero, textFormatter } from '@/utlis/helper';
	import BjMap                                           from '@/components/common/map/index';
	import JudicialTitle                                   from '@/components/judicial-case/judicial-case-title';
	import {
		businessConfigList, effectiveSupervisionConfig,
		mapTooltipConfig, topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend, reviewCorrectiveConfig,
		followupSupConfig,
	}                                                      from './constant';

	export default {
		data() {
			return {
				reviewCase            : {},//执行活动监督
				illegalBehavior       : {},//违法行为监督
				causesOfCivilCasesList: [],//民事案件案由发生次数排序
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
				showMapData           : false,
				causesNowPage         : 1,
				causesTotalPage       : 0,
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
			this.trigger          = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState  = {};
			this.mapTooltipConfig = mapTooltipConfig;
			this.topDataConfig    = topDataConfig;
			this.leftSideList     = leftSideList;
			this.mapTableConfig   = mapTableConfig;
			this.mapLineLegend    = mapLineLegend;
		},
		mounted() {
			const params = { ...this.mapCode, ...this.dateSection };

			this.oldTriggerState       = params;
			this.concludeChart         = ECharts.init(this.$refs.conclude);
			this.acceptChart           = ECharts.init(this.$refs.accept);
			this.illegalBehaviorChart  = ECharts.init(this.$refs.illegalBehaviorChart);
			this.reviewCorrectiveChart = ECharts.init(this.$refs.reviewCorrectiveChart);
			this.followupSupChart      = ECharts.init(this.$refs.followupSupChart);
			this.civilTrendChart       = ECharts.init(this.$refs.civilTrendChart);

			this.requestCivilData(params);
			this.requestEffectiveSupervision(params);
			this.requestMapData(params);
			this.requestMapHeadData(params);
			this.requestReviewCorrective(params);
			this.requestFollowupSup(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestCivilData(params);
				this.requestEffectiveSupervision(params);
				this.requestMapData(params);
				this.requestMapHeadData(params);
				this.requestReviewCorrective(params);
				this.requestFollowupSup(params);
			}
		},
		methods   : {
			async requestCivilData(params) {
				const res = await services.getCivilData(params);
				if(res.code === 200) {
					const {
							  basicBusiness, reviewCase, illegalBehavior,
							  acceptingCasesTrendAnalysisList
						  }              = res.data;
					this.businessList    = businessConfigList.map((i) => ({
						...i,
						value: basicBusiness[i.id]
					}));
					this.reviewCase      = reviewCase;
					this.illegalBehavior = illegalBehavior;
					this.loadConcludeChart();
					this.loadAcceptChart();
					this.loadIllegalBehaviorChart();
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

			// 请求复查纠正
			async requestReviewCorrective(params) {
				const res = await services.getReviewOfTheCorrective(params);
				if(res.code === 200) {
					this.loadReviewCorrectiveChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			// 获取跟进监督
			async requestFollowupSup(params) {
				const res = await services.getFollowUpSupervision(params);
				if(res.code === 200) {
					this.loadFollowupSupChart(res.data);
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
			// 复查纠正
			loadReviewCorrectiveChart(chartData) {
				const axisData   = [],
					  seriesData = reviewCorrectiveConfig.map(i => {
						  axisData.push(i.name);
						  return {
							  name : i.name,
							  value: chartData[i.id]
						  }
					  });
				this.reviewCorrectiveChart.setOption({
					color  : ['#009FE8'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						left        : 20,
						right       : 20,
						bottom      : 10,
						top         : 20,
						containLabel: true
					},
					legend : {
						show: false
					},
					xAxis  : {
						type         : 'value',
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
							name       : '数量',
							type       : 'bar',
							barWidth   : 22,
							data       : seriesData,
							barMaxWidth: 40,
							itemStyle  : {
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

			// 跟进监督
			loadFollowupSupChart(chartData) {
				const axisData   = [],
					  seriesData = followupSupConfig.map(i => {
						  axisData.push(i.name);
						  return {
							  name : i.name,
							  value: chartData[i.id]
						  }
					  });
				this.followupSupChart.setOption({
					color  : ['#05C2E2'],
					tooltip: {
						show       : true,
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						top         : 30,
						left        : 20,
						right       : 20,
						bottom      : 10,
						containLabel: true
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
							name       : '数量',
							type       : 'bar',
							barMaxWidth: 40,
							data       : seriesData,
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
						name      : '件数',
						type      : 'line',
						smooth    : true,
						symbolSize: 5,
						label     : {
							show    : true,
							position: 'top',
							color   : '#31DBE8'
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

                    }
                }
                .capita-box {
                    width: 100%;
                    .capita-content {
                        margin-top: 20px;
                        height: 298px;
                    }
                }

            }
            .civil-trend {
                width: 1223px;
                .civil-trend-chart {
                    width: 1200px;
                    height: 240px;
                    margin: 20px auto;
                }
            }
        }
    }
</style>
