<template>
    <div>
        <judicial-title title="行政"></judicial-title>
        <div class="outer-administrative-page">
            <div class="administrative-page-left">
                <div class="left-top">
                    <div class="condition-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>受理数</i>
                        </div>
                        <ul class="condition-list">
                            <li v-for="item in conditionList" :key="item.id">
                                <p>{{ item.title }}</p>
                                <p>{{ item.value || 0 }}{{ item.binding || '' }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="behavior-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>违法行为监督</i>
                        </div>
                        <ul class="behavior-list">
                            <li v-for="item in behaviorList" :key="item.id">
                                <span>{{item.title}}</span>
                                <span></span>
                                {{item.value || 0}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="judgment-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>生效裁判监督</i>
                    </div>
                    <ul class="judgment-list">
                        <li v-for="item in judgmentList" :style="{ borderColor: item.color }" :key="item.id">
                            <p>{{item.title}}</p>
                            <p :style="{ color: item.color }">{{item.value || 0}}</p>
                        </li>
                    </ul>
                </div>
                <div class="tendency-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>案件受理趋势</i>
                    </div>
                    <div ref="trendencyChart" class="tendency-chart"></div>
                </div>
            </div>
            <div class="administrative-page-center">
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
            <div class="administrative-page-right">
                <div>
                    <div class="execute-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>执行活动监督</i>
                        </div>
                        <ul class="execute-list">
                            <li v-for="item in executeList" :key="item.id">
                                <span>{{item.title}}</span>
                                <span></span>
                                {{ item.value || 0 }}
                            </li>
                        </ul>
                    </div>
                    <div class="classify-box">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>受理案件情况</i>
                        </div>
                        <div ref="classifyChart" class="classify-chart"></div>
                    </div>
                </div>
                <div class="nature-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>行政各类案件情况</i>
                    </div>
                    <div class="table-head">
                        <span>占比</span>
                        <span>件数</span>
                    </div>
                    <ul class="nature-list">
                        <li v-for="(item, index) in classifyNowPageList" :key="index">
                            <i :style="{ backgroundColor: (classifyNowPage === 1 && index < 3) ? '#F7931E' : '#00BEDD' }">{{index+1}}</i>
                            <div class="causes-item-ctx" :style="{backgroundImage:`url(${lineImg})`}">
                                <span class="causes-item-name text-ellipsis">{{item.name }}</span>
                                <div class="causes-item-data"
                                     :style="{ color: (classifyNowPage === 1 && index < 3) ? '#F7931E' : '#00BEDD' }">
                                    <span>{{item.zb}}%</span>
                                    <span>{{item.cs }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="picker-btn-group">
                        <i class="fchc-btn fchc-icon el-icon-arrow-left" @click="classifyPageChange('sub')"></i>
                        <p class="fchc-btn fchc-block pagination">{{ classifyNowPage }} / {{ classifyTotalPage }}</p>
                        <i class="fchc-btn fchc-icon el-icon-arrow-right" @click="classifyPageChange('add')"></i>
                    </div>
                </div>
                <div class="followup-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>跟进监督</i>
                    </div>
                    <div class="followup-chart" ref="followupChart"></div>
                </div>
            </div>
        </div>
        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
    </div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import ECharts                    from 'echarts';
	import BjMap                      from '@/components/common/map/index';
	import JudicialTitle              from '@/components/judicial-case/judicial-case-title';
	import * as services              from './service/index';
	import { triggerMixin }           from '@/components/mixin/trigger';
	import {
		verifyTriggerState, fillZero,
		convertData, textFormatter,
		convertLineData,
	}                                 from '@/utlis/helper';
	import {
		conditionConfig,
		behaviorConfig,
		judgmentConfig,
		mapTooltipConfig,
		executeConfig,
		classifyConfig, topDataConfig,
		leftSideList, mapTableConfig,
		mapLineLegend, followupConfig,
	}                                 from './constant/index';

	export default {
		data() {
			return {
				conditionList     : conditionConfig,
				behaviorList      : behaviorConfig,
				judgmentList      : judgmentConfig,
				executeList       : executeConfig,
				lineImg           : require('@/public/img/judicature/line.png'),
				reasonAnalysisList: [],
				totalSls          : [0, 0, 0, 0],
				totalBjs          : [0, 0, 0, 0],
				totalZbs          : [0, 0, 0, 0],
				sls               : 0,
				bjs               : 0,
				zbs               : 0,
				mapList           : [],
				classifyNowPage   : 1,
				classifyTotalPage : 0,
				dialogVisible     : false,
				dialogContext     : {
					name: '',
					key : '',
					data: []
				},
			}
		},
		computed  : {
			classifyNowPageList() {
				const sliceIndex = (this.classifyNowPage - 1) * 10;
				return this.reasonAnalysisList.slice(sliceIndex, sliceIndex + 10);
			},
			...mapGetters('administrative', ['mapCode']),
			...mapGetters('judicial', ['dateSection']),
		},
		beforeCreate() {
			this.mapTooltipConfig = mapTooltipConfig;
			this.topDataConfig    = topDataConfig;
			this.leftSideList     = leftSideList;
			this.mapTableConfig   = mapTableConfig;
			this.mapLineLegend    = mapLineLegend;
		},
		mounted() {
			const params         = { ...this.mapCode, ...this.dateSection };
			this.oldTriggerState = params;
			this.trendencyChart  = ECharts.init(this.$refs.trendencyChart);
			this.classifyChart   = ECharts.init(this.$refs.classifyChart);
			this.followupChart   = ECharts.init(this.$refs.followupChart);

			this.loadAdministrationData(params);
			this.loadTopSlBjZb(params);
			this.loadCivilDataTwo(params);
			this.loadFollowupData(params);
		},
		updated() {
			const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadAdministrationData(params);
				this.loadTopSlBjZb(params);
				this.loadCivilDataTwo(params);
				this.loadFollowupData(params);
			}
		},
		methods   : {
			async loadAdministrationData(params) {
				const res = await services.getAdministrationData(params);
				if(res.code === 200) {
					const {
							  acceptanceSituation, illegalBehavior,
							  effectiveSupervision, acceptingCasesTrendAnalysisList,
							  reviewCase, categoricalStatistics,
						  }            = res.data;
					this.conditionList = conditionConfig.map(i => ({
						...i,
						value: acceptanceSituation[i.id]
					}));
					this.behaviorList  = behaviorConfig.map(i => ({
						...i,
						value: illegalBehavior[i.id]
					}));
					this.judgmentList  = judgmentConfig.map(i => ({
						...i,
						value: effectiveSupervision[i.id]
					}));
					this.executeList   = executeConfig.map(i => ({
						...i,
						value: reviewCase[i.id],
					}));
					this.loadTrendencyChart(acceptingCasesTrendAnalysisList);
					this.loadClassifyChart(categoricalStatistics);
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadCivilDataTwo(params) {
				const res = await services.getCivilDataTwo(params);
				if(res.code === 200) {
					const { mapSlBjZb: { bjs, sls, zbs }, theMapList, reasonAnalysisList } = res.data;
					this.sls                                                               = sls;
					this.bjs                                                               = bjs;
					this.zbs                                                               = zbs;
					this.mapList                                                           = theMapList;
					this.classifyNowPage                                                   = 1;
					this.classifyTotalPage                                                 = Math.ceil(reasonAnalysisList.length / 10);
					this.reasonAnalysisList                                                = reasonAnalysisList;
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadTopSlBjZb(params) {
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
			async loadFollowupData(params) {
				const res = await services.getFollowUpSupervision(params);
				if(res.code === 200) {
					this.loadFollowupChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			// 加载受理案件趋势分析报表
			loadTrendencyChart(chartData) {
				const { axisData, seriesData } = convertLineData(chartData, 'year', 'sls');
				this.trendencyChart.setOption({
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'cross',
						}
					},
					grid   : {
						left        : '3%',
						top         : 50,
						right       : 10,
						bottom      : 20,
						containLabel: true
					},
					xAxis  : {
						type       : 'category',
						boundaryGap: true,
						data       : axisData,
						axisLabel  : {
							show     : true,
							textStyle: {
								show    : false,
								color   : 'rgba(255,255,255,1)',
								fontSize: 12,
							},
							margin   : 20
						},
						axisTick   : {
							show: false //隐藏X轴刻度
						},
						axisLine   : {
							show     : true,
							lineStyle: {
								color: '#2EA7E0',
								width: 1,
							}
						},
					},
					yAxis  : {
						type     : 'value',
						axisLine : {
							show     : true,
							onZero   : false,
							lineStyle: {
								color: '#2EA7E0',
								width: 1, //这里是为了突出显示加上的
							}
						},
						axisTick : {
							show: false //隐藏X轴刻度
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
					},
					series : [{
						name      : '受理案件趋势分析',
						type      : 'line',
						smooth    : true,
						label     : {
							show     : true,
							position : 'top',
							textStyle: {
								color   : '#0BE5F1',
								fontSize: 18,
							}
						},
						itemStyle : {
							normal  : {
								color    : new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color : 'rgba(0,255,218, .9)'
								}, {
									offset: 1,
									color : 'rgba(11,229,241, .1)'
								}]),
								lineStyle: {
									width: 3,
									type : 'solid',
									color: "#00FFF8"
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
						}, //线条样式
						symbolSize: 5, //折线点的大小
						areaStyle : {
							normal: {}
						},
						data      : seriesData,
					}]
				});
			},

			// 受理案件分类情况统计
			loadClassifyChart(chartData) {
				this.classifyChart.setOption({
					color  : ['#32E0FB', '#1BC85D', '#FBBA18'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						show: false,
					},
					series : [{
						name     : '受理案件数统计',
						type     : 'pie',
						radius   : ['0%', '70%'],//数组时内，外
						center   : ['51%', '55%'],//x，y
						data     : classifyConfig.map(i => ({
							...i,
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
				});
			},

			// 加载跟进监督报表
			loadFollowupChart(chartData) {
				const axisData   = [],
					  seriesData = followupConfig.map(i => {
						  axisData.push(i.name);
						  return {
							  name : i.name,
							  value: chartData[i.id]
						  }
					  });
				this.followupChart.setOption({
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
							formatter : (name) => textFormatter(name, 6),
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
				});
			},

			classifyPageChange(type) {
				switch(type) {
					case 'add' : {
						if(this.classifyNowPage < this.classifyTotalPage) {
							this.classifyNowPage++;
						}
					}
						break;
					case 'sub' : {
						if(this.classifyNowPage > 1) {
							this.classifyNowPage--;
						}
					}
						break;
				}
			},
			...mapActions('administrative', ['initMapState']),
			...mapActions('administrative', ['setMapData']),
		},
		mixins    : [triggerMixin],
		components: {
			BjMap,
			JudicialTitle,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-administrative-page {
        display: flex;
        justify-content: space-between;
        .administrative-page-left {
            position: relative;
            .left-top {
                display: flex;
                justify-content: space-between;
                width: 100%;
                .condition-box {
                    width: 594px;
                    height: 367px;
                    .condition-list {
                        width: 270px;
                        margin: 37px auto;
                        li {
                            position: relative;
                            display: flex;
                            width: 270px;
                            height: 42px;
                            line-height: 42px;
                            border-bottom: 1px solid rgba(0, 255, 255, .5);
                            font-size: 18px;
                            font-family: MicrosoftYaHei;
                            color: #dfdfdf;
                            background-color: rgba(39, 223, 255, .2);
                            text-align: center;
                            &:before {
                                position: absolute;
                                left: 50%;
                                top: 0;
                                content: ' ';
                                width: 1px;
                                height: 42px;
                                background-color: rgba(0, 255, 255, .5);
                            }
                            p {
                                flex: 1;
                                height: 100%;
                            }
                        }
                        li:last-child {
                            border-bottom: 0;
                        }
                    }
                }
                .behavior-box {
                    width: 593px;
                    height: 367px;
                    .behavior-list {
                        width: 550px;
                        margin: 40px auto 0;
                        li {
                            font-size: 18px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 30px;
                            span:nth-child(1) {
                                font-size: 18px;
                                font-family: PingFangSC-Regular;
                                font-weight: 400;
                                color: rgba(0, 255, 255, 1);
                                display: inline-block;
                                width: 145px;
                                text-align: right;
                            }
                            span:nth-child(2) {
                                display: inline-block;
                                width: 247px;
                                height: 12px;
                                border-radius: 8px;
                                background: linear-gradient(to right, #09A6E6, #3CEEFF);
                                margin: 0 19px 0 30px;
                            }
                        }
                    }
                }
            }
            .judgment-box {
                margin: 19px 0;
                width: 1304px;
                height: 238px;
                .judgment-list {
                    margin-left: 100px;
                    margin-top: 27px;
                    display: flex;
                    li {
                        margin-right: 39px;
                        width: 131px;
                        height: 131px;
                        border-radius: 50%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        border: 4px solid;
                        p:nth-child(1) {
                            font-size: 14px;
                            color: rgba(255, 255, 255, 1);
                        }
                        p:nth-child(2) {
                            margin-top: 7px;
                            color: rgba(255, 255, 255, 1);
                            font-size: 20px;
                        }
                    }
                }
            }
            .tendency-box {
                width: 1304px;
                height: 270px;
                .tendency-chart {
                    width: 1230px;
                    height: 270px;
                    margin: 0 auto;
                }
            }
        }
        .administrative-page-center {
            width: 1250px;
            min-width: 1250px;
            height: 950px;
        }
        .administrative-page-right {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 1150px;
            .execute-box {
                width: 593px;
                height: 342px;
                .execute-list {
                    margin-left: 10px;
                    margin-top: 40px;
                    li {
                        font-size: 18px;
                        color: rgba(255, 255, 255, 1);
                        margin-bottom: 25px;
                        span:nth-child(1) {
                            font-size: 18px;
                            font-family: PingFangSC-Regular;
                            font-weight: 400;
                            color: rgba(0, 255, 255, 1);
                            display: inline-block;
                            width: 145px;
                            text-align: right;
                        }
                        span:nth-child(2) {
                            display: inline-block;
                            width: 247px;
                            height: 12px;
                            border-radius: 8px;
                            background: linear-gradient(to right, #09A6E6, #3CEEFF);
                            margin: 0 19px 0 30px;
                        }
                    }
                }
            }
            .classify-box {
                width: 593px;
                .classify-chart {
                    width: 100%;
                    height: 240px;
                }
            }
            .nature-box {
                width: 547px;
                margin-bottom: 20px;
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
                .nature-list {
                    width: 500px;
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
            .followup-box {
                width: 100%;
                height: 310px;
                .followup-chart{
                    height: 270px;
                }
            }
        }

    }
</style>
