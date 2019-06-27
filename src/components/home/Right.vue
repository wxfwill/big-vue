<template>
    <div class="home-page-right">
        <div class="content-box">
            <div class="left-view">
                <!-- 民事 -->
                <div class="civil-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>民事</i>
                    </div>
                    <ul class="civil-content">
                        <li v-for="(item,index) in civilList" :key="index">
                            <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}">{{item.value}}</p>
                            <p class="civil-text">{{item.title}}</p>
                        </li>
                    </ul>
                </div>
                <div class="middlePortion">
                    <!-- 行政 -->
                    <!-- 公益诉讼 -->
                    <div class="administrationBox">
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
                        <div class="lawsuitBox">
                            <div class="chart-box-title">
                                <span class="chart-label-dot"></span>
                                <i>公益诉讼</i>
                            </div>
                            <div ref="lawsuitContent"
                                 :style="{width: '340px', height: '240px', padding: '20px 18px'}"></div>
                        </div>
                    </div>
                </div>
                <div class="bottomPortion">
                    <!-- 人均办结数 -->
                    <div class="perCapita">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>人均办结数</i>
                        </div>
                        <p v-for="item in rjList" :key="item.id">
                            <i>{{item.title}}</i>
                            <span :style="{ width:`${item.lineLen || 0}px` }"></span>
                            {{item.value}}
                        </p>
                    </div>
                    <!-- 案均办办理天数 -->
                    <div class="fileCapita">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>案均办理天数</i>
                        </div>
                        <p v-for="item in ajList" :key="item.id">
                            <i>{{item.title}}</i>
                            <span :style="{width:`${item.lineLen || 0}px`}"></span>
                            {{item.value}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <div class="team-construction">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>队伍建设</i>
                    </div>
                    <P>总数：{{ teamPeopleTotal }}</P>
                    <div ref="dougBox" :style="{width: '436px', height: '300px'}"></div>
                </div>
                <div class="analyze-box">
                    <div class="block">
                        <div class="chart-box-title">
                            <span class="chart-label-dot"></span>
                            <i>实证分析</i>
                        </div>
                        <el-carousel indicator-position="outside" :interval='0' arrow='never' @change="cutHandle">
                            <el-carousel-item>
                                <div ref="agePie" :style="{width: '360px', height: '400px'}"></div>
                            </el-carousel-item>
                            <el-carousel-item>
                                <div ref="education" :style="{width: '400px', height: '360px'}"></div>
                            </el-carousel-item>
                            <el-carousel-item>
                                <div ref="tendency" :style="{width: '400px', height: '400px'}"></div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import { mapGetters }                        from 'vuex';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import 'echarts-liquidfill/src/liquidFill.js';
	import waterPolo                             from '@/components/sfba/water-polo.vue'
	import * as services                         from '@/fetch/http';
	import {
		administrativeConfig,
		publicInterestLitigationConfig,
		troopAdministrationConfig,
		ageStructureConfig,
		eduDegreeConfig,
	}                                            from '@/pages/home/chartConfig';

	export default {
		data() {
			return {
				swiperTitle     : '',
				civilBoxImg     : require('@/public/img/home/civilBox.png'),
				civilList       : [
					{
						id   : 'ms_sljs',
						img  : require('@/public/img/home/mssljs.png'),
						title: '受理件数',
						value: 0
					}, {
						id   : 'ms_bjjs',
						img  : require('@/public/img/home/msbj.png'),
						title: '办结件数',
						num  : 0
					}, {
						id   : 'ms_tckss',
						img  : require('@/public/img/home/mstc.png'),
						title: '提出抗诉数',
						num  : 0
					}, {
						id   : 'ms_ksajgbyps',
						img  : require('@/public/img/home/msks.png'),
						title: '抗诉案件改变原判数',
						num  : 0
					}, {
						id   : 'ms_tczsjcjys',
						img  : require('@/public/img/home/mssp.png'),
						title: '提出再审检察建议数',
						num  : 0
					}, {
						id   : 'ms_cnzsjcjys',
						img  : require('@/public/img/home/mscn.png'),
						title: '采纳再审检察建议数',
						num  : 0
					}, {
						id   : 'ms_spjdcnjcjys',
						img  : require('@/public/img/home/msls.png'),
						title: '审判监督采纳检察建议数',
						num  : 0
					}, {
						id   : 'ms_zxjdcnjcjys',
						img  : require('@/public/img/home/mszxjd.png'),
						title: '执行监督采纳检察建议数',
						num  : 0
					}],
				xzList          : [],
				date            : '2019-05-29',//现在的日期
				startDate       : '2019-01-01',
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
			};
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startDate', 'endDate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params                       = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState               = params;
			this.publicInterestLitigationChart = ECharts.init(this.$refs.lawsuitContent);
			this.dougBoxChart                  = ECharts.init(this.$refs.dougBox);
			this.agePieChart                   = ECharts.init(this.$refs.agePie);
			this.educationChart                = ECharts.init(this.$refs.education);
			this.tendencyChart                 = ECharts.init(this.$refs.tendency);

			this.requestCivilData(params);
			this.requestAdministration(params);
			this.requestPublicInterestLitigation(params);
			this.requestTroopAdministration(params);
			this.requestAgeStructure(params);
			this.requestEducationLevel(params);
			this.requestDangerousDrivingList(params);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.requestCivilData(params);
				this.requestAdministration(params);
				this.requestPublicInterestLitigation(params);
				this.requestTroopAdministration(params);
				this.requestAgeStructure(params);
				this.requestEducationLevel(params);
				this.requestDangerousDrivingList(params);
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
					const total = Object.values(res.data).reduce(function(a, b) {
						return a + b;
					});
					console.log(total);
					this.xzList = administrativeConfig.map(i => ({
						...i,
						value: res.data[i.id],
						rate : (res.data[i.id] / total).toFixed(2),
					}))
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
					this.teamPeopleTotal = res.data.dwgl_zs;
					res.data             = {
						dwgl_zs    : 88,
						dwgl_jcg   : 18,
						dwgl_jcgzl : 99,
						dwgl_sfxzry: 85
					};
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
							type: 'shadow'
						}
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
						},
						data     : publicInterestLitigationConfig[0].data.map(i => i.name),
					},
					series : [
						{
							name    : '民事公益诉讼',
							type    : 'bar',
							color   : 'rgba(11,229,241,1)',
							stack   : 'pubLit',
							barWidth: '23px',
							label   : {
								normal: {
									show     : true,
									position : ["20%", '50%'],
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
							barWidth: '23px',
							label   : {
								normal: {
									show     : true,
									position : ["20%", '50%'],
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
					color     : ['#E85558', '#4BB0E4', '#e7be40'],
					legend    : {
						x        : 'center',
						y        : "88%",//图例移动
						left     : '15%',
						icon     : 'circle',
						textStyle: {
							color: 'rgba(255,255,255,1)'
						},
					},
					emphasis  : {
						barBorderRadius: 2,
					},
					textColor : 'red',
					tooltip   : {
						show     : true,
						trigger  : 'item',
						formatter: "{a} : <br />{c}%",
					},
					polar     : {//圆环位置移动
						center: ['50%', '44%'],
						radius: '270%' //图形大小
					},
					angleAxis : {
						show      : false,
						startAngle: 90,
						min       : 0,
						max       : 100
					},
					radiusAxis: {
						type: 'category',
						show: false,
						data: rAxisData
					},
					series    : seriesData.map(i => ({
						type            : "bar",
						name            : i.name,
						coordinateSystem: "polar",
						barWidth        : 25,
						barCategoryGap  : "100%",
						data            : [i.value],
					}))
				})
			},
			convertTeamChartData(chartData) {
				const rAxisData  = [],
					  seriesData = troopAdministrationConfig.map(i => ({
						  name : i.name,
						  value: chartData[i.id]
					  })).sort((a, b) => b - a);
				seriesData.forEach(i => rAxisData.push(i.name));
				return {
					rAxisData,
					seriesData
				}
			},
			//  实证分析
			cutHandle(n) {//切换轮播事件
				switch(n) {
					case 0:
						this.swiperTitle = '年龄结构';
						break;
					case 1:
						this.swiperTitle = '危险驾驶罪受教育程度分析';
						break;
					case 2:
						this.swiperTitle = '危险驾驶罪年度趋势分析';
						break;
					default:
						break;
				}
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
				maxValue = numberInteger(maxValue);
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
		},
		components: {
			waterPolo
		},
	}
</script>

<style lang="scss" scoped>
    .home-page-right {
        // flex:0 0 1242px;
        // min-width:1242px;
        height: 900px;
        width: 1228px;
        margin-top: 65px;
        .content-box {
            display: flex;
            .left-view {
                .civil-box {
                    width: 730px;
                    .civil-content {
                        padding: 29px 50px;
                        li {
                            margin-right: 40px;

                            .civil-text {
                                width: 109px;
                                font-size: 18px;
                            }
                        }
                    }
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        height: 100%;
                        justify-content: space-around;
                        li {
                            text-align: center;
                            p:nth-child(1) {
                                display: inline-block;
                                text-align: center;
                                width: 95px;
                                height: 95px;
                                border-radius: 50%;
                                font-size: 14px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 95px;
                            }
                            P:nth-child(2) {
                                width: 145px;
                                font-size: 18px;
                                text-align: center;
                                color: rgba(255, 255, 255, 1);
                                margin-top: 8px;
                            }
                        }
                    }
                }
                .administrationBox {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;
                    .administration {
                        width: 354px;
                        height: 256px;
                        margin-left: 9px;
                        .admin-box {
                            display: flex;
                            justify-content: space-around;
                            margin-top: 40px;
                        }
                    }
                    .lawsuitBox {
                        width: 354px;
                        height: 256px;
                        margin: 0 0 0 20px;
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
                    }
                }
                .bottomPortion {
                    margin-top: 25px;
                    display: flex;
                    .perCapita {
                        margin-left: 12px;
                        display: inline-block;
                        width: 354px;
                        height: 205px;
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
                        height: 205px;
                        p {
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
                }
            }
            .right-view {
                // width:465px;
                // height:452px;
                .team-construction {
                    position: relative;
                    margin-left: 22px;
                    width: 454px;
                    height: 399px;
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
                        margin: 20px 0 0 120px;
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
                    margin: 20px 0 0 20px;
                    width: 454px;
                    height: 482px;
                    padding: 15px 0 0 25px;
                    .block {
                        .age-label {
                            display: flex;
                            align-items: center;
                            i {
                                margin: 0 0 0 10px;
                                font-size: 24px;
                                color: rgba(255, 255, 255, 1);
                                line-height: 29px;
                            }
                            h6 {
                                display: inline-block;
                                width: 52px;
                                height: 1px;
                                background-color: rgba(255, 255, 255, 1);
                                margin: 0 5px 0 5px;
                            }
                            h5 {
                                font-size: 18px;
                                color: rgba(47, 224, 190, 1);
                                line-height: 22px;
                            }
                            .age {
                                width: 13px;
                                height: 13px;
                                border-radius: 50%;
                                background: rgba(0, 178, 226, 1);
                            }
                        }
                        /deep/ .el-carousel--horizontal {
                            width: 400px;
                            height: 440px;
                            /deep/ .el-carousel__container {
                                height: 378px;
                            }
                        }
                        /deep/ .el-carousel__button {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }
</style>