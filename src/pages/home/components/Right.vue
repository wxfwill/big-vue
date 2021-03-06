<template>
    <div class="home-page-right">
        <div class="content-box">
            <div class="left-view">
                <!-- 民事 -->
                <!-- 行政 -->
                <div class="civil-box">
                    <box-head title="民事"></box-head>
                    <div class="civil-chart" ref="civilChart"></div>
                </div>
                <div class="administration">
                    <box-head title="行政"></box-head>
                    <div class="admin-chart" ref="adminChart"></div>
                </div>
                <!-- 公益诉讼 -->
                <div class="lawsuitBox">
                    <box-head title="公益诉讼"></box-head>
                    <div ref="lawsuitContent" class="law-chart"></div>
                </div>
            </div>
            <div class="right-view">
                <div class="team-construction">
                    <box-head title="队伍建设"></box-head>
                    <p>总数：{{ teamPeopleTotal }}</p>
                    <div ref="dougBox" :style="{width: '436px', height: '340px'}"></div>
                </div>
                <div class="analyze-box">
                    <box-head title="实证分析"></box-head>
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
	import ECharts                                              from 'echarts';
	import { mapGetters }                                       from 'vuex';
	import { verifyTriggerState, numberInteger, textFormatter } from '@/utlis/helper';
	import * as services                                        from '../service';
	import BoxHead                                              from '@/components/common/box-head';
	import {
		administrativeConfig,
		publicInterestLitigationConfig,
		troopAdministrationConfig,
		ageStructureConfig,
		eduDegreeConfig,
		civilConfig,
	}                                                           from '../constant';

	export default {
		data() {
			return {
				analyzeItemBg   : require('@/public/img/home/analyze-item-bg.png'),
				bookrackImg     : require('@/public/img/home/bookrack.png'),
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
				}]],
			};
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode', 'mapName'])
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
			this.civilChart                    = ECharts.init(this.$refs.civilChart);
			this.adminChart                    = ECharts.init(this.$refs.adminChart);

			this.requestCivilData(params);
			this.requestAdministration(params);
			this.requestPublicInterestLitigation(params);
			this.requestTroopAdministration({
				name: this.mapName
			});

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
				this.requestTroopAdministration({
					name: this.mapName
				});
			}
		},
		methods   : {
			async requestCivilData(params) {
				const res = await services.getCivilCase(params);
				if(res.code === 200) {
					this.loadCivilChart(res.data);
				} else {
					this.$message.error(res.msg);
				}
			},
			async requestAdministration(params) {
				const res = await services.getAdministration(params);
				if(res.code === 200) {
					this.loadAdministrationChart(res.data);
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

			// 民事
			loadCivilChart(chartData) {
				this.civilChart.setOption({
					tooltip   : {
						trigger  : 'item',
						formatter: "{b} : {c}"
					},
					calculable: true,
					xAxis     : {
						max      : 10,
						show     : false,
						splitLine: {
							show: false
						}
					},
					yAxis     : {
						max      : 10,
						show     : false,
						splitLine: {
							show: false
						}
					},
					series    : civilConfig.map((i, index) => {
						let positionX  = 0;
						const isEven   = !(index % 2),
							firCirName = isEven ? i.title : civilConfig[index - 1].title,
							secCirName = isEven ? civilConfig[index + 1].title : i.title,
							firCirVal  = isEven ? chartData[i.id] : chartData[civilConfig[index - 1].id],
							secCirVal  = isEven ? chartData[civilConfig[index + 1].id] : chartData[i.id];
						switch(~~(index / 2)) {
							case 0:
								positionX = 20;
								break;
							case 1:
								positionX = 53;
								break;
							case 2:
								positionX = 84;
								break;
						}
						return {
							type  : 'pie',
							radius: isEven ? [50, 80] : [60, 70],
							center: [`${positionX}%`, '50%'],
							data  : [
								{
									name     : firCirName,
									value    : firCirVal,
									itemStyle: {
										color: isEven ? i.color : "transparent",
									},
									label    : {
										show     : isEven,
										position : 'center',
										formatter: (params) => `${textFormatter(params.name, 5)} \n\n ${params.value}`,
										color    : '#dfdfdf',
										fontSize : 14,
									},
									labelLine: {
										show    : false,
										emphasis: {
											show: false
										}
									},
								},
								{
									value    : secCirVal,
									name     : secCirName,
									itemStyle: {
										color: isEven ? 'transparent' : i.color
									},
									label    : {
										show: !isEven,
										formatter: (params) => `{b|${textFormatter(params.name, 5)}\n${params.value}}`,
										rich     : {
											b: {
												color   : "#dfdfdf",
												fontSize: 14,
                                                align: 'center',
											}
										}
									},
									labelLine: {
										show    : !isEven,
										length  : 1,
										emphasis: {
											show: false
										}
									}
								}
							]
						}
					})
				})
			},

			// 行政
			loadAdministrationChart(chartData) {
				this.adminChart.setOption({
					tooltip: {
						trigger  : 'axis',
						formatter: '{b}：{c}'
					},
					grid   : {
						top   : 30,
						bottom: 40,
					},
					xAxis  : {
						data     : administrativeConfig.map(i => i.title),
						axisTick : { show: false },
						axisLine : { show: false },
						axisLabel: {
							interval : 0,
							textStyle: {
								color: '#fff'
							}
						}
					},
					yAxis  : {
						splitLine: { show: false },
						axisTick : { show: false },
						axisLine : { show: false },
						axisLabel: { show: false }
					},
					series : [{
						name          : '',
						type          : 'pictorialBar',
						barCategoryGap: '-80%',
						// symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
						symbol        : 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
						label         : {
							show    : true,
							color   : '#fff',
							position: 'top',
						},
						data          : administrativeConfig.map(i => ({
							value    : chartData[i.id],
							name     : i.title,
							itemStyle: {
								color: new ECharts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{
											offset: 0,
											color : i.col1
										},
										{
											offset: 1,
											color : i.col2
										}
									]
								)
							}
						})),
						z             : 10
					}]
				})
			},

			// 公益诉讼
			gyssHandle(administrationLitigation, civilLitigation) {
				this.publicInterestLitigationChart.setOption({
					color  : ['rgba(12,153,247,1)', 'rgba(11,229,241,1)'],
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
							data    : publicInterestLitigationConfig[0].data.map(i => administrationLitigation[i.id]),
						},
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
							data    : publicInterestLitigationConfig[1].data.map(i => civilLitigation[i.id]),
						}
					]
				});
			},
			// 队伍建设
			dougHandle(chartData) {
				const { rAxisData, seriesData } = this.convertTeamChartData(chartData);
				this.dougBoxChart.setOption({
					tooltip: {
						trigger    : 'item',
						axisPointer: {
							type: 'shadow'
						},
						formatter(params) {
							return `${params.marker} ${params.name} <br />      ${params.data.number}人  ${params.value}%`
						}
					},
					legend : {
						left     : 'center',
						bottom   : '20',
						itemGap  : 20,
						data     : rAxisData,
						textStyle: {
							color: '#fff'
						}
					},
					series : seriesData.map((item, index) => {
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
								show: false,
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
			BoxHead
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
                    .civil-chart {
                        width: 100%;
                        height: 250px;
                        margin: 20px 0;
                    }
                }
                .administration {
                    width: 739px;
                    .admin-chart {
                        width: 100%;
                        height: 280px;
                    }
                }
                .lawsuitBox {
                    width: 739px;
                    .law-chart {
                        width: 650px;
                        height: 180px;
                        margin: 20px auto;
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
                            color: #d0d0d0;
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