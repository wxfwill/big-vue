<template>
    <div class="home-page-right">
        <div class="content-box">
            <div class="left-view">
                <!-- 民事 -->
                <!-- 行政 -->
                <div class="civil-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>民事</i>
                    </div>
                    <ul class="civil-content">
                        <li v-for="(item,index) in civilList" :key="index">
                            <p class="civil-num">
                                {{ item.value }}
                            </p>
                            <p class="civil-text">{{item.title}}</p>
                        </li>
                    </ul>
                </div>
                <div class="administration">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>行政</i>
                    </div>
                    <div class="admin-box">
                        <water-polo
                                v-for="item in xzList"
                                :key="item.id"
                                :chartConfig="item"
                        ></water-polo>
                    </div>
                </div>
                <!-- 公益诉讼 -->
                <div class="lawsuitBox">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>公益诉讼</i>
                    </div>
                    <div ref="lawsuitContent" class="law-chart"></div>
                </div>
                <div class="bottomPortion">
                    <!-- 人均办结数 -->
                    <div class="perCapita">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>人均办结数</i>
                        </div>
                        <ul class="dom-line-chart">
                            <li v-for="item in rjList" :key="item.id">
                                <i>{{item.title}}</i>
                                <span :style="{ width:`${item.lineLen || 0}px` }"></span>
                                {{item.value}}
                            </li>
                        </ul>

                    </div>
                    <!-- 案均办办理天数 -->
                    <div class="fileCapita">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案均办理天数</i>
                        </div>
                        <ul class="dom-line-chart">
                            <li v-for="item in ajList" :key="item.id">
                                <i>{{item.title}}</i>
                                <span :style="{width:`${item.lineLen || 0}px`}"></span>
                                {{item.value}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <div class="team-construction">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>队伍建设</i>
                    </div>
                    <p>总数：{{ teamPeopleTotal }}</p>
                    <div ref="dougBox" :style="{width: '436px', height: '340px'}"></div>
                </div>
                <div class="analyze-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>实证分析</i>
                    </div>
                    <div class="analyze-content">
                        <el-carousel
                                :autoplay=true
                                indicator-position="none"
                                :interval=5000
                                arrow='hover'
                                :loop=true
                                @change="cutHandle"
                        >
                            <el-carousel-item v-for="(analyzeItem, analyzeIndex) in analyzeList" :key="analyzeIndex">
                                <ul class="library" :style="{ backgroundImage: `url(${bookrackImg})` }">
                                    <li v-for="item in analyzeItem" class="case-item"
                                        :style="{ backgroundImage: `url(${analyzeItemBg})` }"
                                        @click="skipLawWorks(item.url)">
                                        <p class="analyze-item-name">{{ item.name }}</p>
                                    </li>
                                </ul>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import { mapGetters }                        from 'vuex';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import 'echarts-liquidfill/src/liquidFill.js';
	import waterPolo                             from '@/components/common/water-polo.vue'
	import * as services                         from '../service';
	import {
		administrativeConfig,
		publicInterestLitigationConfig,
		troopAdministrationConfig,
		ageStructureConfig,
		eduDegreeConfig,
	}                                            from '../constant';

	export default {
		data() {
			return {
				analyzeItemBg   : require('@/public/img/home/analyze-item-bg.png'),
				bookrackImg     : require('@/public/img/home/bookrack.png'),
				civilList       : [
					{
						id   : 'ms_sljs',
						title: '受理件数',
						value: 0
					}, {
						id   : 'ms_bjjs',
						title: '办结件数',
						value: 0
					}, {
						id   : 'ms_tckss',
						title: '提出抗诉数',
						value: 0
					}, {
						id   : 'ms_ksajgbyps',
						title: '抗诉案件改变原判数',
						value: 0
					}, {
						id   : 'ms_tczsjcjys',
						title: '提出再审检察建议数',
						value: 0
					}, {
						id   : 'ms_cnzsjcjys',
						title: '采纳再审检察建议数',
						value: 0
					}, {
						id   : 'ms_spjdcnjcjys',
						title: '审判监督采纳检察建议数',
						value: 0
					}, {
						id   : 'ms_zxjdcnjcjys',
						title: '执行监督采纳检察建议数',
						value: 0
					}],
				xzList          : [],
				rjList          : [
					{
						id   : 'ms_rjbjs',
						title: '民事',
						value: 0,
					},
					{
						id   : 'gyss_rjbjs',
						title: '公益诉讼',
						num  : 16734
					},
					{
						id   : 'xz_rjbjs',
						title: '行政',
						num  : 434
					}],
				ajList          : [
					{
						id   : 'ms_ajblts',
						title: '民事',
						val  : 1234,
					},
					{
						id   : 'gyss_ajblts',
						title: '公益诉讼',
						num  : 16734,
					},
					{
						id   : 'xz_ajblts',
						title: '行政',
						num  : 434,
					}
				],
				placeHolderStyle: {
					normal: {
						label      : {
							show: false
						},
						labelLine  : {
							show: false
						},
						color      : 'rgba(0, 0, 0, 0)',
						borderColor: 'rgba(0, 0, 0, 0)',
						borderWidth: 0
					}
				},
				teamPeopleTotal : 0,
				swiperColumn    : 0,
				analyzeList     : [[{
					id  : 'dangerDriving',
					name: '危险驾驶罪分析报告',
					url : 'http://141.3.119.86:8888/display/form/displayHome/insert'
				}, {
					id  : 'vaccineCase',
					name: '涉疫苗案件分析报告',
					url : 'http://jczc.gj.pro:10080'
				}]]
			};
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params                       = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState               = params;
			this.publicInterestLitigationChart = ECharts.init(this.$refs.lawsuitContent);
			this.dougBoxChart                  = ECharts.init(this.$refs.dougBox);

			this.requestCivilData(params);
			this.requestAdministration(params);
			this.requestPublicInterestLitigation(params);
			this.requestTroopAdministration(params);

			// 实证分析监听窗口
			this.lawWorksWin = {
				closed: true
			};
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestCivilData(params);
				this.requestAdministration(params);
				this.requestPublicInterestLitigation(params);
				this.requestTroopAdministration(params);
			}
		},
		methods   : {
			async requestCivilData(params) {
				const res = await services.getCivilCase(params);
				if(res.code === 200) {
					this.civilList = this.civilList.map(i => ({
						...i,
						value: res.data[i.id]
					}))
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestAdministration(params) {
				const res = await services.getAdministration(params);
				if(res.code === 200) {
					this.xzList = administrativeConfig.map(i => ({
						...i,
						value: res.data[i.id],
						rate : (res.data[i.rateId] || 0) / 100,
					}));
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestPublicInterestLitigation(params) {
				const res = await services.getHomePagaeData(params);
				if(res.code === 200) {
					const data = res.data;
					this.gyssHandle(data.administrationLitigation, data.civilLitigation);
					const perCapitaMaxNum = Math.max(...Object.values(data.perCapitaHandlingNumber)),
						  manageDays      = Math.max(...Object.values(data.casesAreHandledNumber));
					this.rjList           = this.rjList.map(i => {
						const val = data.perCapitaHandlingNumber[i.id];
						return {
							...i,
							value  : val,
							lineLen: ~~(val / perCapitaMaxNum * 200)
						}
					});
					this.ajList           = this.ajList.map(i => {
						const val = data.casesAreHandledNumber[i.id];
						return {
							...i,
							value  : val,
							lineLen: ~~(val / manageDays * 200)
						}
					})

				} else {
					this.$message.error(res.msg);
				}
			},
			async requestTroopAdministration(params) {
				const res = await services.getTroopAdministration(params);
				if(res.code === 200) {
					this.teamPeopleTotal = res.data.dwgl_zs || 0;
					this.dougHandle(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestAgeStructure(params) {
				const res = await services.getAgeStructure(params);
				if(res.code === 200) {
					this.ageHandle(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestEducationLevel(params) {
				const res = await services.getEducationLevel(params);
				if(res.code === 200) {
					this.education(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestDangerousDrivingList(params) {
				const res = await services.getDangerousDrivingList(params);
				if(res.code === 200) {
					this.tendencyHandle(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			// 公益诉讼
			gyssHandle(administrationLitigation, civilLitigation) {
				this.publicInterestLitigationChart.setOption({
					color  : ['rgba(11,229,241,1)', 'rgba(12,153,247,1)'],
					grid   : {
						top         : 20,
						left        : '3%',
						right       : '4%',
						bottom      : '5%',
						containLabel: true
					},
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'line'
						},
						padding    : [0, 0, 0, 0],
					},
					legend : {
						textStyle : {
							color: '#ffffff'
						},
						width     : 1000,
						itemWidth : 10,
						itemHeight: 10,
						left      : '30%',
						top       : '0',
						data      : publicInterestLitigationConfig.map(i => i.name),
					},
					yAxis  : {
						type      : 'value',
						axisLine  : {
							show: false,
						},
						"axisTick": {       //y轴刻度线
							"show": false
						},
						axisLabel : {
							show     : true,
							interval : 'auto',
							formatter: '{value} ',
							textStyle: {
								fontSize: 10,
								color   : '#ffffff'
							},
						},
						splitLine : {
							show     : false,
							lineStyle: {

								type: 'dashed'
							},
						},
						show      : true

					},
					xAxis  : {
						axisLine : {
							show: false,
						},
						axisTick : {       //x轴刻度线
							"show": false
						},
						type     : 'category',
						axisLabel: {
							interval   : 0,
							show       : true,
							splitNumber: 15,
							margin     : 14,
							textStyle  : {
								fontSize: 10,
								color   : '#ffffff',
							},
							width      : 50,
						},
						data     : publicInterestLitigationConfig[0].data.map(i => i.name),
					},
					series : [
						{
							name    : '民事公益诉讼',
							type    : 'bar',
							color   : 'rgba(11,229,241,1)',
							stack   : 'pubLit',
							barWidth: 40,
							label   : {
								normal: {
									show     : true,
									position : 'inside',
									textStyle: {
										color   : "#ffffff",
										fontSize: 10
									}
								}
							},
							data    : publicInterestLitigationConfig[0].data.map(i => civilLitigation[i.id]),
						},
						{
							name    : '行政公益诉讼',
							type    : 'bar',
							color   : 'rgba(12,153,247,1)',
							stack   : 'pubLit',
							barWidth: 40,
							label   : {
								normal: {
									show     : true,
									position : 'inside',
									textStyle: {
										color   : "#ffffff",
										fontSize: 10
									}
								}
							},
							data    : publicInterestLitigationConfig[1].data.map(i => administrationLitigation[i.id]),
						},
					]
				});
			},
			// 队伍建设
			dougHandle(chartData) {
				const { rAxisData, seriesData } = this.convertTeamChartData(chartData);
				this.dougBoxChart.setOption({
                    tooltip : {
                    	trigger : 'item',
						axisPointer: {
                    		type: 'shadow'
                        },
                        formatter(params){
                    		return `${params.marker} ${params.name} <br />      ${params.data.number}人  ${params.value}%`
                        }
                    },
					legend: {
						left     : 'center',
						bottom   : '20',
						itemGap  : 20,
						data     : rAxisData,
						textStyle: {
							color: '#fff'
						}
					},
					series: seriesData.map((item, index) => {
						let radius = [],
							color  = [];
						switch(index) {
							case 0: {
								radius = [90, 110];
								color  = ['#E85558', 'rgba(232, 85, 88, .3)'];
							}
								break;
							case 1 : {
								radius = [68, 88];
								color  = ['#4BB0E4', 'rgba(75, 176, 228, .3)']
							}
								break;
							case 2 : {
								radius = [46, 66];
								color  = ['#e7be40', 'rgba(231, 190, 64, .3)']
							}
						}
						item.value = isNaN(item.value) ? 0 : item.value;
						return {
							name          : `Line ${index + 1}`,
							type          : 'pie',
							barWidth      : 25,
							radius,
							center        : ['50%', '40%'],
							hoverAnimation: false,
							startAngle    : 90,
							label         : {
								show: false
							},
							labelLine     : {
								show     : false,
							},
							data          : [{
								value    : item.value,
								name     : item.name,
								number   : item.number,
								itemStyle: {
									normal: {
										color: color[0]
									}
								},
							}, {
								value    : 100 - item.value,
								name     : '',
								tooltip  : {
									show: false
								},
								itemStyle: {
									normal  : {
										color    : color[1],
										label    : {
											show: false
										},
										labelLine: {
											show: false
										}
									},
									emphasis: {
										color: color[1]
									}
								}
							}]
						}
					})
				});
			},
			convertTeamChartData(chartData) {
				const rAxisData  = [],
					  seriesData = troopAdministrationConfig.map(i => ({
						  name  : i.name,
						  value : (chartData[i.id] / chartData.dwgl_zs * 100).toFixed(0),
						  number: chartData[i.id]
					  })).sort((a, b) => b.value - a.value);
				seriesData.forEach(i => rAxisData.push(i.name));
				return {
					rAxisData,
					seriesData
				}
			},
			//  实证分析
			cutHandle(n) {//切换轮播事件
				this.swiperColumn = n;
			},
			// 年龄分布
			ageHandle(chartData) {

				const option = {
					tooltip   : {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					grid      : {
						top: 20
					},
					left      : 'center',
					legend    : {
						orient    : 'horizontal',
						width     : 400,
						left      : '10%',
						bottom    : '10%',
						textStyle : {
							color   : 'rgba(255,255,255,1)',
							fontSize: 14,
							rich    : {
								yellow: {
									color   : "rgba(255,255,255,1)",
									fontSize: 16,
									padding : [5, 0],
									align   : 'bottom',
								}
							},
							width   : 130,
							height  : 20,
						},
						padding   : [0, 0, 0, 0],
						itemWidth : 40,
						itemHeight: 20,
						itemGap   : 20,
						data      : ageStructureConfig.map(i => i.name),
						formatter : function(name) {
							let oa    = option.series[0].data;
							let total = 0;
							oa.forEach((item, index) => {
								total += item.value;
							});
							for(let i = 0; i < oa.length; i++) {
								if(name === oa[i].name) {
									return name + ' {yellow|' + '}';
								}
							}
						},
					},
					graphic   : {
						elements: [{
							type : 'image',
							style: {
								width : 40,
								height: 40
							},
						}]
					},
					color     : ['#705ADC', '#0BE3DE', '#15A4E6', '#ECAF14', '#0AD67F', '#1DCEEB'],
					calculable: false,
					series    : [{
						name     : '年龄',
						type     : 'pie',
						radius   : [20, 110],
						center   : ['50%', '35%'],
						roseType : 'radius',
						width    : '100%',
						max      : 80,
						itemStyle: {
							normal  : {
								label    : {
									show: false
								},
								labelLine: {
									show: false
								}
							},
							emphasis: {
								label    : {
									show: false
								},
								labelLine: {
									show: false
								}
							}
						},
						data     : ageStructureConfig.map(i => ({
							name : i.name,
							value: chartData[i.id]
						}))
					}]
				};
				this.agePieChart.setOption(option);
			},
			// 危险驾驶罪教育程度
			education(chartData) {
				const { yAxisData, seriesData, maxNum } = this.convertEduDegreeData(chartData);
				this.educationChart.setOption({
					color  : ['#74F0DD'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter  : "{b} <br>人数: {c}"//y value值
					},
					grid   : {
						show        : false,
						left        : '4',
						right       : '10%',
						bottom      : '0%',
						containLabel: true
					},
					xAxis  : {
						type       : 'value',
						boundaryGap: [0, 0.01],
						min        : 0,
						interval   : ~~(numberInteger(maxNum) / 3),
						axisLabel  : {
							formatter: '{value}',
							textStyle: {
								color     : 'rgba(255,255,255,1)',
								fontSize  : 18,
								fontWeight: '80'
							}
						},
						splitLine  : {
							show: false
						},
						axisLine   : {
							show: false
						},
						axisTick   : {
							show: false
						},
					},
					yAxis  : {
						type     : 'category',
						data     : yAxisData,
						axisLine : {
							show: false //隐藏X轴轴线
						},
						axisTick : {
							show: false //隐藏X轴刻度
						},
						axisLabel: {
							show     : true,
							interval : 0,
							rotate   : 0,
							inside   : false,
							textStyle: {
								color     : 'rgba(255,255,255,1)',
								fontSize  : 18,
								fontWeight: '50',
							}
						}
					},
					series : [{
						type     : 'bar',
						barWidth : 6,
						itemStyle: {//柱状圆角
							normal: {
								barBorderRadius: 3
							}
						},
						data     : seriesData
					}]
				});
			},
			convertEduDegreeData(chartData) {
				let maxNum      = 0;
				const yAxisData = [],
					seriesData  = eduDegreeConfig.map(i => {
						yAxisData.push(i.name);
						if(maxNum < chartData[i.id]) {
							maxNum = chartData[i.id];
						}
						return {
							...i,
							value: chartData[i.id]
						}
					});
				return {
					yAxisData,
					seriesData,
					maxNum
				}
			},
			// 危险驾驶罪年度趋势
			tendencyHandle(chartData) {
				const allNum = chartData.map(i => [i.bqss, i.slqss]);
				let maxValue = Math.max(...(allNum.toString().split()));
				maxValue     = numberInteger(maxValue);
				this.tendencyChart.setOption({
					color  : ['#61E6D6', '#9961E6', '#0000FF', '#FFFF00'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: { type: 'cross' }
					},
					grid   : {
						right : '8%',
						bottom: '12%'
					},
					legend : {
						right    : '8%',
						top      : '5%',
						data     : ['不起诉数', '受理起诉数'],
						textStyle: {
							color: "rgba(255,255,255,1)"
						}
					},
					xAxis  : {
						type     : 'category',
						axisTick : {
							show          : false,
							alignWithLabel: false
						},
						axisLabel: {
							fontSize    : 18,
							interval    : 0,
							rotate      : 0,
							textStyle   : {
								color: 'rgba(255,255,255,1)'
							},
							showMinLabel: true,
							showMaxLabel: true
						},
						axisLine : {
							show: false
						},
						tooltip  : {
							backgroundColor: 'rgba(0,0,255,0.5)'
						},
						data     : chartData.map(i => i.nd)
					},
					yAxis  : [
						{
							type     : 'value',
							name     : 'UPH',
							show     : false,
							position : 'right',
							axisLine : {
								lineStyle: {
									color: '#61E6D6'
								}
							},
							axisLabel: {
								formatter: '{value}'
							},
							splitLine: {
								show: false
							}
						},
						{
							type     : 'value',
							name     : ' ',
							position : 'left',
							axisLabel: {
								fontSize : 18,
								textStyle: {
									color: 'rgba(255,255,255,1)',
								}
							},
							axisLine : {
								show: false
							},
							axisTick : {
								show: false
							},
							splitLine: {
								show: false,
							}
						}
					],
					series : [
						{
							name      : '不起诉数',
							type      : 'line',
							yAxisIndex: 0,
							data      : chartData.map(i => i.bqss)
						},
						{
							name      : '受理起诉数',
							type      : 'line',
							yAxisIndex: 1,
							data      : chartData.map(i => i.slqss)
						},
						{
							name      : 'line2',
							barWidth  : 55,
							type      : 'bar',
							color     : 'rgba(25,134,222,0.3)',
							yAxisIndex: 1,
							data      : Array.from(chartData.length).map(() => maxValue)
						}
					]
				});
			},
			// 打开外部链接
			skipLawWorks(url) {
				if(!this.lawWorksWin.closed) {
					this.lawWorksWin.close();
				}
				this.lawWorksWin = window.open(url, '_blank', 'fullscreen=yes, height=1080, width=1280, left=1280, location=no, menubar=no, status=no, titlebar=no, toolbar=no, top=0');
			}

		},
		components: {
			waterPolo
		},
	}
</script>

<style lang="scss" scoped>
    .home-page-right {
        height: 900px;
        width: 1228px;
        .content-box {
            display: flex;
            .left-view {
                .civil-box {
                    width: 739px;
                    .civil-content {
                        padding: 20px 0 10px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        color: #FFFFFF;
                        li {
                            text-align: center;
                            margin-bottom: 10px;
                            margin-right: 20px;
                            .civil-num {
                                height: 27px;
                                display: inline-block;
                                border: 1px solid #009FE8;
                                background-size: 100% 100%;
                                font-size: 14px;
                                border-radius: 10px;
                                padding: 4px 10px 2px;
                            }
                            .civil-text {
                                width: 130px;
                                margin-top: 11px;
                                font-size: 18px;
                                text-align: center;
                            }
                            &:nth-of-type(7), &:nth-of-type(8) {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
                .administration {
                    width: 739px;
                    .admin-box {
                        display: flex;
                        justify-content: space-around;
                        margin: 20px auto;
                    }
                }
                .lawsuitBox {
                    width: 739px;
                    .lawsuit-label {
                        display: flex;
                        align-items: center;
                        i {
                            margin: 0 0 0 10px;
                            font-size: 24px;
                            color: rgba(255, 255, 255, 1);
                            line-height: 29px;
                        }
                        .lawsuit {
                            width: 13px;
                            height: 13px;
                            border-radius: 50%;
                            background: rgba(0, 178, 226, 1);
                        }
                    }
                    .law-chart {
                        width: 650px;
                        height: 170px;
                        margin: 20px auto 10px;
                    }
                }
                .bottomPortion {
                    margin-top: 10px;
                    display: flex;
                    .dom-line-chart {
                        margin-top: 20px;
                        li {
                            display: flex;
                            align-items: center;
                            margin: 12px 0 0 10px;
                            font-size: 16px;
                            font-family: MicrosoftYaHei;
                            color: rgba(43, 191, 226, 1);
                            line-height: 21px;
                            i {
                                display: inline-block;
                                text-align: center;
                                flex: 0 37;
                                min-width: 37px;
                                width: 37px;
                                font-size: 18px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            span {
                                margin: 0 15px;
                                height: 15px;
                                display: inline-block;
                                background: rgba(43, 191, 226, 1)
                            }
                        }
                    }
                    .perCapita {
                        display: inline-block;
                        width: 354px;
                        p {
                            display: flex;
                            align-items: center;
                            margin: 12px 0 0 10px;
                            color: rgba(43, 191, 226, 1);
                            i {
                                display: inline-block;
                                text-align: center;
                                flex: 0 37;
                                min-width: 37px;
                                width: 37px;
                                font-size: 18px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 22px;
                            }
                            span {
                                margin: 0 15px;
                                height: 10px;
                                border-radius: 20px;
                                display: inline-block;

                                background: linear-gradient(
                                                to right,
                                                #0C7FD8,
                                                #25CBE9
                                );
                            }
                        }
                    }
                    .fileCapita {
                        display: inline-block;
                        margin-left: 20px;
                        width: 354px;
                    }
                }
            }
            .right-view {
                .team-construction {
                    position: relative;
                    margin-left: 22px;
                    width: 454px;
                    height: 405px;
                    .team-label {
                        display: flex;
                        align-items: center;
                        i {
                            margin: 0 0 0 10px;
                            font-size: 24px;
                            color: rgba(255, 255, 255, 1);
                            line-height: 29px;
                        }
                        .team {
                            width: 13px;
                            height: 13px;
                            border-radius: 50%;
                            background: rgba(0, 178, 226, 1);
                        }
                    }
                    p {
                        margin: 20px 0 0 160px;
                        font-size: 22px;
                        font-family: Helvetica;
                        color: rgba(0, 255, 255, 1);
                    }
                    .bar {
                        position: absolute;
                        width: 222px;
                        height: 222px;
                        left: 131px;
                        top: 133px;
                    }
                }
                .analyze-box {
                    width: 464px;
                    margin-top: 40px;
                    .analyze-content {
                        width: 414px;
                        margin: 20px auto 0;
                        position: relative;
                        /deep/ .el-carousel__container {
                            height: 430px;
                            .library {
                                position: relative;
                                width: 414px;
                                height: 430px;
                                border-radius: 5px;
                                cursor: pointer;
                                display: flex;
                                flex-wrap: wrap;
                                background-size: 100% 100%;
                                .case-item {
                                    position: absolute;
                                    width: 117px;
                                    height: 142px;
                                    margin-bottom: 20px;
                                    background-size: 100% 100%;
                                    &:nth-of-type(1) {
                                        top: 52px;
                                        left: 61px;
                                    }
                                    &:nth-of-type(2) {
                                        top: 52px;
                                        right: 57px;
                                    }
                                    &:nth-of-type(3) {
                                        left: 61px;
                                        bottom: 37px;
                                    }
                                    &:nth-of-type(4) {
                                        right: 57px;
                                        bottom: 37px;
                                    }
                                    .analyze-item-name {
                                        width: 110px;
                                        margin: 80px auto 0;
                                        color: #fff;
                                        text-align: center;
                                    }
                                }
                            }
                            .el-carousel__arrow {
                                background-color: rgba(29, 206, 235, .4);
                                color: #fff;
                                &.el-carousel__arrow--left {
                                    left: 0;
                                    top: 47%;
                                }
                                &.el-carousel__arrow--right {
                                    right: 0;
                                    top: 47%;
                                }
                            }
                        }
                        /deep/ .el-carousel__indicator {
                            &.is-active {
                                .el-carousel__button {
                                    background-color: #fff;
                                }
                            }
                            .el-carousel__button {
                                background-color: #17E4F1;
                                opacity: 1;

                            }
                        }
                        .soon-text {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 40px;
                            font-weight: bolder;
                            color: #ccc;
                            text-shadow: 0 0 10px rgba(0, 255, 248, 1);
                            animation: textRotate 10s linear infinite;
                        }
                        @keyframes textRotate {
                            0% {
                                transform: translate(-50%, -50%) rotateY(0deg);
                            }
                            100% {
                                transform: translate(-50%, -50%) rotateY(360deg);
                            }
                        }
                    }
                }
            }
        }
    }
</style>