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
							<p v-for='(to,index) in propertyConfig.total' :key='index'>{{to.name}}<br/><span>{{to.num}}</span><b></b></p>
							<ol>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
								<li></li>
							</ol>
							<ul>
								<li v-for='(lis,index) in propertyConfig.list' :key='index'>{{lis.name}}<br/><span>{{lis.num}}</span></li>
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
							<div class='agencytotal' v-for='(to,index) in agencyConfig.total' :key='index'>
								<span class='totalnum'>{{to.num}}</span>
								<i class='el-icon-top'></i><span>{{to.add}}</span><b>{{to.percent}}</b>
							</div>
							<div class='agencylist' v-for='(lis,index) in agencyConfig.list' :key='index'>
								<p>{{lis.name}}</p>
								<p>{{lis.num}}</p>
							</div>
						</div>
						<div class="personnel-bottom-left">
							<p class='title'>机构情况</p>
						</div>
						<div class="personnel-bottom-right">
							<p class='title'>单位在职人数</p>
							<div class="job-content" ref="jobChart"></div>
						</div>
                    </div>
                </div>
            </div>
            <div class="right-view">
                <div class="team-construction">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检察业务装备</i>
                    </div>
                    <div ref="dougBox" :style="{width: '436px', height: '340px'}"></div>
                </div>
                <div class="analyze-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>计财机构及人员情况</i>
                    </div>
                    <div class="analyze-content">
                     
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
	import * as services                         from '../service';
	import {propertyConfig,agencyConfig}                 from '../constant/index';


	export default {
		data() {
			return {
				swiperTitle     : '',
				civilBoxImg     : require('@/public/img/home/civilBox.png'),
				empiricaIcon    : require('@/public/img/home/empirica-icon.png'),
				propertyConfig:propertyConfig,
				agencyConfig:agencyConfig
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
			this.jobChart   = ECharts.init(this.$refs.jobChart);
			this.loadjobChart()
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadjobChart() {
				var datas= [{
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
						fontSize: 28 * scale,
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
				this.jobChart.setOption({
						backgroundColor: 'rgba(33,66,131,1)',
						title: {
							left: 'center',
							top: '40%',
							padding: [24, 0],
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
							radius: ['52%', '60%'],
							hoverAnimation: true,
							color: ['#FBBA18', '#0CADE8', '#1BC85D'],
							label: {
								normal: {
									textStyle: {
										fontSize: 12 * scale,
									},
									formatter: function(params, ticket, callback) {
										var total = 0; //考生总数量
										var percent = 0; //考生占比
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
							width:396px;
							height:247px;
							padding:10px 27px;
						}
						.personnel-bottom-right{
							width:343px;
							height:247px;
							padding:10px 27px;
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
                    width: 454px;
                    height: 390px;
                    margin-top: 40px;
                    .analyze-content {
                        position: relative;
                        /deep/ .el-carousel__container {
                            height: 390px;
                            margin: 0 auto;
                            .analyze-media {
                                width: 300px;
                                height: 330px;
                                margin: 30px auto;
                                background-color: #fff;
                                border-radius: 5px;
                                cursor: pointer;
                                &:hover{
                                    box-shadow: 0 0 15px rgba(31, 162, 244, .6);
                                }
                                .analyze-item-name{
                                    padding-top: 120px;
                                    font-size: 18px;
                                    text-align: center;
                                    color: #0b91e8;
                                }
                            }
                            .el-carousel__arrow{
                                background-color: rgba(29,206,235,.4);
                                color: #fff;
                            }
                        }
                        /deep/ .el-carousel__indicator{
                            &.is-active{
                                .el-carousel__button{
                                    background-color: #fff;
                                }
                            }
                            .el-carousel__button{
                                background-color: #17E4F1;
                                opacity: 1;
                            }
                        }
                        .soon-text{
                            position: absolute;
                            top : 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 40px;
                            font-weight: bolder;
                            color: #ccc;
                            text-shadow: 0 0 10px rgba(0, 255, 248, 1);
                            animation: textRotate 10s linear infinite;
                        }
                        @keyframes textRotate {
                            0%{
                                transform: translate(-50%, -50%) rotateY(0deg);
                            }
                            100%{
                                transform: translate(-50%, -50%) rotateY(360deg);
                            }
                        }
                    }
                }
            }
        }
    }
</style>