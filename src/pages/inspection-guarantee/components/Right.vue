<template>
    <div class="home-page-right">
        <div class="content-box">
            <div class="left-view">
                <!-- 资产情况 -->
                <div class="property-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>资产情况</i>
                    </div>
					<div class="propertyBox">
						<div class="propertyContent">
							<p>总资产<br/><span>{{assetsSituation.zzc}}</span><b></b></p>
							<ol>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ol>
							<ul>
								<li>长期投资资产<br/><span>{{assetsSituation.cqtzzc}}</span></li>
								<li>固定资产<br/><span>{{assetsSituation.gdzc}}</span></li>
								<li>流动资产<br/><span>{{assetsSituation.ldzc}}</span></li>
								<li>其他资产<br/><span>{{assetsSituation.qtzc}}</span></li>
								<li>无形资产<br/><span>{{assetsSituation.wxzc}}</span></li>
								<li>在建工程资产<br/><span>{{assetsSituation.zjgczc}}</span></li>
							</ul>
						</div>
					</div>
                </div>
				<!-- 检察机关机构人员情况 -->
                <div class="personnel-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察机关机构人员情况</i>
                    </div>
                    <div class="personnel-content">
						<div class="personnel-top">
							<p class='title'>机构情况</p>
							<div class='agencytotal'>
								<span class='totalnum'>{{theProcuratorialAgency.count}}</span>
								<i class='el-icon-top'></i><span>{{theProcuratorialAgency.tbss}}</span><b>{{theProcuratorialAgency.tbssbfb}}</b>
							</div>
							<div class='agencylist'>
								<p>年末机构数</p>
								<p>{{theProcuratorialAgency.nmjgs}}</p>
							</div>
							<div class='agencylist'>
								<p>省级院个数</p>
								<p>{{theProcuratorialAgency.sjygs}}</p>
							</div>
							<div class='agencylist'>
								<p>地市级个数</p>
								<p>{{theProcuratorialAgency.dsjgs}}</p>
							</div>
							<div class='agencylist'>
								<p>县区级个数</p>
								<p>{{theProcuratorialAgency.xqjgs}}</p>
							</div>
							<div class='agencylist'>
								<p>派出院个数</p>
								<p>{{theProcuratorialAgency.pcygs}}</p>
							</div>
							<div class='agencylist'>
								<p>铁检院个数</p>
								<p>{{theProcuratorialAgency.tjygs}}</p>
							</div>
							<div class='agencylist'>
								<p>林区院个数</p>
								<p>{{theProcuratorialAgency.lqygs}}</p>
							</div>
							<div class='agencylist'>
								<p>油田院个数</p>
								<p>{{theProcuratorialAgency.ytygs}}</p>
							</div>
							<div class='agencylist'>
								<p>矿区院个数</p>
								<p>{{theProcuratorialAgency.kqygs}}</p>
							</div>
							<div class='agencylist'>
								<p>事业单位个数</p>
								<p>{{theProcuratorialAgency.sydwgs}}</p>
							</div>
						</div>
						<div class="personnel-bottom-left">
							<p class='title'>机构情况</p>
							<div class="agency-content" ref="agencyChart" style='top:-30px;'></div>
						</div>
						<div class="personnel-bottom-right">
							<p class='title'>单位在职人数</p>
							<div class="job-content" ref="jobChart" style='top:-30px!important'></div>
						</div>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <div class="procuratorial-work">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察业务装备</i>
                    </div>
                    <div class='service-content' ref="serviceChart"></div>
					<div class="putinto">
						<p>三年投入</p>
						<ul>
							<li @click="righttableIsshowfn">
								<i class='el-icon-tickets'></i>
								<p>检察业务装备</p>
								<span>数量</span>
								<span>23,345,567</span>
								<span>23%</span>
								<b>金额</b>
								<b>23,345,567</b>
								<b>23%</b>
							</li>
							<li @click="righttableIsshowfn">
								<i class='el-icon-tickets'></i>
								<p>技术装备</p>
								<span>数量</span>
								<span>23,345,567</span>
								<span>23%</span>
								<b>金额</b>
								<b>23,345,567</b>
								<b>23%</b>
							</li>
							<li @click="righttableIsshowfn">
								<i class='el-icon-tickets'></i>
								<p>综合保障装备</p>
								<span>数量</span>
								<span>23,345,567</span>
								<span>23%</span>
								<b>金额</b>
								<b>23,345,567</b>
								<b>23%</b>
							</li>
							<li @click="righttableIsshowfn">
								<i class='el-icon-tickets'></i>
								<p>司法警察装备</p>
								<span>数量</span>
								<span>23,345,567</span>
								<span>23%</span>
								<b>金额</b>
								<b>23,345,567</b>
								<b>23%</b>
							</li>
					 	</ul>
					</div>
                </div>
                <div class="totalfiscal-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>计财机构及人员情况</i>
                    </div>
                    <div class="totalfiscal-content">
						<div class="totalfiscal-top">
							<p class='title'>机构情况</p>
							<p>计财部门设置情况</p>
							<p>100</p>
							<ul>
								<li>80</li>
								<li>20</li>
							</ul>
							<ol>
								<li>已设置计财部门的单位</li>
								<li>未设置计财部门的单位</li>
							</ol>
						</div>
						<div class="totalfiscal-bottom">
							<div class="totalfiscal-bottom-left">
								<p class='title'>人员情况</p>
								<ul>
									<li>
										<i class='el-icon-s-custom'></i>
										<span>1000</span>
										<p>计财人员 实有数</p>
									</li>
									<li>
										<i class='el-icon-s-custom'></i>
										<span>1000</span>
										<p>会计人员 情况</p>
									</li>
								</ul>
							</div>
							<div class="totalfiscal-bottom-right">
								<div class='one'>
									<p>12,234,231</p>	
									<p>会计核算形式</p>	
								</div>
								<div class='two'>
									<p>12,234,231</p>	
									<p>会计独立核算</p>	
								</div>
								
								<div class='four'>
									<div>
											<p>12,234,231</p>	
											<p>会计委派制</p>	
									</div>
									<div>
											<p>12,234,231</p>	
											<p>其中会计集中核算</p>	
									</div>
								</div>
								<div class='three'>
									<p>12,234,231</p>	
									<p>会计独立核算</p>	
								</div>
							</div>
						</div>
                    </div>
                </div>
				<transition name="el-fade-in-linear">
					<div class="righttable" v-show="righttableIsshow">
						<div class="left" @click="hidefn">》</div>
							<div class="right">
								<table>
									<thead>
										<tr>
											<th rowspan="2">项目</th>
											<th rowspan="2">数量</th>
											<th rowspan="2">金额（万元）</th>
											<th colspan="2">三年投入</th>
										</tr>
										<tr>
											<th>数量增加</th>
											<th>金额增长</th>
										</tr>
										<tr>
											<td>检察业务装备</td>
											<td>17,083</td>
											<td>4947</td>
											<td>64%</td>
											<td>4%</td>
										</tr>
										<tr>
											<td>A、检察业务技术装备</td>
											<td>7275</td>
											<td>7150</td>
											<td>83%</td>
											<td>48%</td>
										</tr>
										<tr>
											<td>1、查办和预防职务犯罪装备</td>
											<td>7275</td>
											<td>7150</td>
											<td>83%</td>
											<td>48%</td>
										</tr>
										<tr>
											<td>2、查办和预防职务犯罪装备</td>
											<td>7275</td>
											<td>7150</td>
											<td>83%</td>
											<td>48%</td>
										</tr>
										<tr>
											<td>3、查办和预防职务犯罪装备</td>
											<td>7275</td>
											<td>7150</td>
											<td>83%</td>
											<td>48%</td>
										</tr>
										<tr>
											<td>4、查办和预防职务犯罪装备</td>
											<td>7275</td>
											<td>7150</td>
											<td>83%</td>
											<td>48%</td>
										</tr>
									</thead>
								</table>
							</div>
					</div>
				</transition>
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
	import * as services                         from '../service';
	import {propertyConfig,agencyConfig}                 from '../constant/index';


	export default {
		data() {
			return {
				swiperTitle     : '',
				civilBoxImg     : require('@/public/img/home/civilBox.png'),
				empiricaIcon    : require('@/public/img/home/empirica-icon.png'),
				propertyConfig:propertyConfig,
				agencyConfig:agencyConfig,
				righttableIsshow:false
			};
		},
		props:{
			assetsSituation:{
				default:{}
			},
			theProcuratorialAgency:{
				default:{}
			},
			prosecutionPersonnel:{
				default:{}
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
			const params                       = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState               = params;
			this.jobChart   = ECharts.init(this.$refs.jobChart);
			this.serviceChart= ECharts.init(this.$refs.serviceChart);
			this.agencyChart=ECharts.init(this.$refs.agencyChart);
			this.loadjobChart();
			this.loadserviceChart();
			this.loadagencyChart();
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadjobChart() {
				var datas = [{
					value: 2234,
					name: '专业技术人员'
				}, {
					value: 2234,
					name: '干部行政职务1'
				}, {
					value: 2234,
					name: '干部行政职务2'
				}];
				var scale = 1;
				var rich = {
					yellow: {
						color: "#ffc72b",
						fontSize: 22 * scale,
						padding: [5, 4],
						align: 'center'
					},
					total: {
						color: "#ffc72b",
						fontSize: 30 * scale,
						align: 'center',
					},
					white: {
						color: "#fff",
						align: 'center',
						fontSize: 18 * scale,
						padding: [10, 0]
					},
					blue: {
						color: '#49dff0',
						fontSize: 20 * scale,
						align: 'center'
					},
					hr: {
						borderColor: '#0b5263',
						width: '100%',
						borderWidth: 1,
						height: 0,
					}
				};

				this.jobChart.setOption( {
						title: {
							left: 'center',
							padding: [0, 0],
							textStyle: {
								color: '#fff',
								fontSize: 18 * scale,
								align: 'center'
							}
						},
						legend: {
							selectedMode: false,
							formatter: function(name) {
								var total = 0; //各科正确率总和
								var averagePercent; //综合正确率
								datas.forEach(function(value, index, array) {
									total += value.value;
								});
								return total;
							},
							data: [datas[0].name],
							left: 'center',
							top: 'center',
							icon: 'none',
							align: 'center',
							padding: [10, 0],
							textStyle: {
								color: "#ffc72b",
								fontSize: 30 * scale
							},
						},
						series: [{
							type: 'pie',
							radius: ['32%', '40%'],
							hoverAnimation: true,
							color: ['#FBBA18', '#0CADE8', '#1BC85D'],
							label: {
								normal: {
									textStyle: {
										fontSize: 12 * scale,
									},
									formatter: function(params, ticket, callback) {
										var total = 0; 
										var percent = 0; 
										datas.forEach(function(value, index, array) {
											total += value.value;
										});
										percent = ((params.value / total) * 100).toFixed(1);
										return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
									},
									rich: rich
								},
							},
							labelLine: {
								normal: {
									length: 30 * scale,
									length2: 20,
									lineStyle: {
										color: '#fff'
									}
								}
							},
							data: datas
						}]
					})
			},
			loadserviceChart(){
				this.serviceChart.setOption({
					color: ['#FBBA18', '#0CADE8', '#1BC85D'],
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						show:false,
						orient: 'horizontal',
						icon: 'circle',
						bottom: 20,
						x: 'center',
						textStyle: {
							color: '#fff'
						},
						data: ['司法警察装备', '综合保障装备', '技术装备']
					},
					series: [{
							name: '访问来源',
							type: 'pie',
							selectedMode: 'single',
							radius: [0, '58%'],

							label: {
								normal: {
									show: true,
									position: 'inner',
									textStyle: {
										color: '#fff',
										fontWeight: 'normal',
										fontSize: 14
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: 100,
									name: '司法警察装备'
								},
								{
									value: 100,
									name: '综合保障装备'
								},
								{
									value: 100,
									name: '技术装备'
								}
							]
						},
						{
							name: '访问来源',
							type: 'pie',
							radius: ['60%', '62%'],
							label: {
								normal: {
									formatter: '{b|{b}}\n{hr|}\n金额 占比\n{c}{d|{d}%}',
									rich: {
										b: {
											fontSize: 20,
											color: '#fff',
											align: 'left',
											padding: 4
										},
										hr: {
											borderColor: '#12EABE',
											width: '100%',
											borderWidth: 2,
											height: 0
										},
										d: {
											fontSize: 20,
											color: '#fff',
											align: 'left',
											padding: 4
										},
										c: {
											fontSize: 20,
											color: '#fff',
											align: 'center',
											padding: 4
										},
										a: {
											fontSize: 20,
											color: '#fff',
											align: 'center',
											padding: 4
										}
									}
								}
							},
							labelLine: {
								normal: {
									show: true,
									length: 20,
									length2: 20,
									lineStyle: {
										type: 'dashed',
										width: 2
									}
								}
							},
							data: [{
									value: 100,
									name: '司法警察装备'
								},
								{
									value: 100,
									name: '综合保障装备'
								},
								{
									value: 100,
									name: '技术装备'
								}

							]
						}
					]	
				})
			},
			loadagencyChart(){
				this.agencyChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					grid:{
						top:'0'
					},
					color:['#009FE8'],
					series: [
						{
							name:'访问来源',
							type:'pie',
							radius: ['30%', '40%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: true,
									formatter:'{a}\n{c}人',
									rich:{
										c:{
											align:'center',
											color:'yellow'
										}
									}
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '30',
										fontWeight: 'bold'
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							itemStyle:{
								borderWidth:5, //设置border的宽度有多大
								borderColor:'#020309',
							},
							data:[
								{value:this.prosecutionPersonnel.rybzs, name:'人员编制数'},
								{value:this.prosecutionPersonnel.zzry, name:'着装人员'},
								{value:this.prosecutionPersonnel.qtry, name:'其他人员'}
							]
						}
					]
				})
			},
			righttableIsshowfn(){
				this.righttableIsshow=true
			},
			hidefn(){
				this.righttableIsshow=false
			}
		},
		components: {
			
		},
	}
</script>

<style lang="scss" scoped>
    .home-page-right {
        height: 900px;
        width: 1256px;
        .content-box {
            display: flex;
            .left-view {
                .property-box {
                    width: 739px;
					.propertyBox{			
						height:301px;
						.propertyContent{
							color:#fff;
							text-align:center;
							p{
								width:198px;
								height:66px;
								border-radius:2px;
								border:1px solid rgba(0,216,233,1);
								padding-top:8px;
								margin-top:39px;
								margin-left:270px;
								position:relative;
								b{
									width:1px;
									height:31px;
									background:#979797;
									position:absolute;
									bottom:-31px;
									left:97px;
								}
							}
							ol{
								width:636px;
								height:29px;
								border:1px solid #979797;
								border-bottom:none;
								margin-top:31px;
								margin-left:51px;
								overflow:hidden;
								li{
									width:131px;
									height:29px;
									float:left;
									border-right:1px solid #979797;
								}
								li:last-child{
									border-right:none;
								}
							}
							span{
								color:#FBBA18;
							}
							ul{
								li{
									float:left;
									width:95px;
									height:59px;
									border-radius:2px;
									border:1px solid rgba(0,216,233,1);
									margin-right:30px;
									margin-top:13px;
									padding-top:8px;
									font-size: 12px;
								}
								li:last-child{
									margin-right:0px;
								}
							}
						}
					}
                }
				.personnel-box{
					width:739px;
					height:543px;
					.personnel-content{
						display: flex;
						flex-wrap: wrap;
						height:543px;
						.personnel-top{
							width:739px;
							height:307px;
							padding:10px 27px;
							overflow:hidden;
							.agencytotal{
								.totalnum{
									color:#00FFF8;
									width:162px;
									height:55px;
									line-height:55px;
									background:rgba(2,119,205,0.21);
									border-radius:33px;
									border:1px solid rgba(4,169,230,1);
									text-align:center;
									margin-left:289px;
									display:inline-block;
									font-size:20px;
								}
								span{
									color:#00FFF8;
								}
								.el-icon-top{
									color:#1BC85D;
									margin-right:7px;
								}
								b{
									color:#FF6C40;
									margin-left:7px;
								}
							}
							.agencylist{
								float:left;
								margin-right:37px;
								text-align:center;
								p:first-child{
									color:#fff;
									margin:24px 0px 10px 0px;
								}
								p:last-child{
									color:#04A9E6;
									width:100px;
									height:36px;
									line-height:36px;
									background:rgba(2,119,205,0.21);
									border-radius:28px;
									border:1px solid rgba(4,169,230,1);
								}
							}
						}
						p{
							color:#2FE0BE;
						}
						.personnel-bottom-left{
							width:296px;
							height:247px;
							padding:10px 27px;
							.agency-content{
								width:267px;
								height:247px;
							}
						}
						.personnel-bottom-right{
							width:443px;
							height:247px;
							padding:10px 27px;
							.job-content{
								width:443px;
								height:247px;
								div{
									width:443px;
									height:247px;
									canvas{
										top:-30px!important;
									}
								}
								
							}
						}
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
				width:464px;
				position:relative;
                .procuratorial-work {
                    position: relative;
                    margin-left: 22px;
                    width: 464px;
                    height: 522px;
					.service-content{
						width:464px;
						height:205px;
						background:none!important;
					}
					.putinto{
							width: 464px;
							height:264px;
							p{
								color:#fff;
								text-align:center;
								margin:10px 0px 10px 0px;
								font-size:16px;
							}
							ul{
								width:464px;
								height:215px;
								li{
									width:108px;
									height:215px;
									float:left;
									border:1px solid rgba(11,184,250,1);
									margin-right:10px;
									text-align:center;
									p{
									margin-bottom:8px;
									}
									i{
										margin-top:9px;
										font-size:22px;
									}
									span{
										color:#0BB8FA;
										display:block;
									}
									b{
										color:#FF6C40;
									}
								}
								
								li:first-child{
									background:linear-gradient(180deg,rgba(23,213,191,0.6) 0%,rgba(12,143,226,0.6) 100%);
									i{
										color:#0BAEFF;
									}
								}
								li:nth-child(2){
									i{
										color:#1BC85D;
									}
								}
								li:nth-child(3){
									i{
										color:#FF6C40;
									}
								}
								li:last-child{
									margin-right:0px;
									i{
										color:#FBBA18;
									}
								}
							}
						}
                }
                .totalfiscal-box{
					width: 464px;
					height:420px;
					.totalfiscal-content{
						height:376px;
						p{
							color:#fff;
							text-align:center;
						}
						.title{
							color:#2FE0BE;
							text-align:left;
							margin:13px 0px 0px 30px;
						}
						.totalfiscal-top{
							ul{
								width:397px;
								height:21px;
								background:rgba(12,173,232,1);
								border-radius:11px;
								margin-left:26px;
								margin-top:6px;
								li{
									text-align:center;
									float:left;
									color:#fff;
								}
								li:first-child{
									width:80%;
								}
								li:last-child{
									width:20%;
									background:#FF6C40;
									border-radius:11px;
								}
							}
							ol{
								width:397px;
								height:21px;
								margin-top:13px;
								color:#fff;
								li{
									float:left;
									text-align:center;
									width:50%;
								}
							}
						}
						
						.totalfiscal-bottom{
							margin-top:21px;
							.totalfiscal-bottom-left{
								float:left;
								ul{
									width:158px;
									height:95px;
									margin-top:40px;
									li{
										text-align:center;
										width:64px;
										margin-right:29px;
										float:left;
										i{
											color:#1BC85D;
											font-size:26px;
										}
										span{
											color:#1BC85D;
											display:block;
										}
									}
									li:last-child{
										margin-right:0px;
										i{
											color:#0CADE8;
										}
										span{
											color:#0CADE8;
										}
									}
								}
							}
							.totalfiscal-bottom-right{
								float:left;
								width:257px;
								color:#fff;
								margin-left:36px;
								div.one{
									height:57px;
									text-align:center;
									p:first-child{
										margin-left:66px;
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
									}
								}
								.two{
									float:left;
									margin-top:6px;
									p:first-child{
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
										margin-bottom:10px;
									}
								}
								.three{
									float:left;
									margin-top:11px;
									p:first-child{
										width:116px;
										height:36px;
										line-height:36px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
										margin-bottom:10px;
									}
								}
								.four{
									float:right;
									width:134px;
									height:133px;
									border-radius:4px;
									border:1px solid rgba(4,169,230,1);
									margin-top:3px;
									div:first-child{
										width:134px;
										height:64px;
										background:rgba(2,119,205,0.21);
										border-radius:4px;
										border:1px solid rgba(4,169,230,1);
									}
									div{
										p:first-child{
											margin-top:11px;
										}
									}
								}
							}
						}
					}
				}
				.righttable{
					width:1045px;
					height: 1080px;
					position:absolute;
					right:0;
					top:-110px;
					background:rgba(0,0,0,0.31);
					border:1px solid rgb(138, 250, 233);
					.left{
						width:97px;
						height:1080px;
						float:left;
						border-right:1px solid rgb(138, 250, 233);
						line-height:1080px;
						text-align:center;
						color:#09F4FF;
						font-size:65px;
					}
					.right{
						float:left;
						width:942px;
						height:1080px;
						background:rgba(0,10,19,0.8);
						table{
							width:942px;
							height:1080px;
							color:#fff;
							text-align:center;
							tr{
								border-bottom:1px solid rgb(138, 250, 233);
								th{
									border-bottom:1px solid rgb(138, 250, 233);
									border-right:1px solid rgb(138, 250, 233);
									height: 38px;
									text-align:center;
									font-size:18px;
								}
								th:last-child{
									border-right:none;
								}
								td{
									height:44px;
									border-right:1px solid rgb(138, 250, 233);
									text-align:center;
								}
								td:first-child{
									text-align:left;
									padding-left:20px;
								}
								td:last-child{
									border-right:none;
								}
							}
							tr:first-child{
								th:first-child{
									width:340px;
								}
							}
						}
					}
					.fade-enter-active, .fade-leave-active {
						transition: opacity .5s
					}
					.fade-enter, .fade-leave-active {
						opacity: 0
					}
				}
            }
        }
    }
</style>