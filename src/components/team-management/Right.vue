<template>
    <div class="team-right-container">
        <div class="staff-detail-info">
			<div class="right-left">
				<div class='right-left-top'>
					<div class="chart-box-title">
						<span class="chart-label-dot"></span>
						<i>人员学历结构</i>
					</div>
					<div ref="personnelEducation" :style='{width:"400px", height:"375px"}'></div>
				</div>
				<div class="right-left-bottom">
					<div class="chart-box-title">
						<span class="chart-label-dot"></span>
						<i>年龄分布</i>
					</div>
					 <div ref="ageDistributeChart" :style="{ width: '400px', height: '356px', margin: '0 auto' }"></div>
				</div>
			</div>
            
            <!-- <div class="structure-box" :style="{backgroundImage: `url(${staffEduStrBg})`}">
                <h1 class="img-title">人员学历结构</h1>
                <div class="chart-box">
                    <div ref="eduBgStrChart" :style='{width:"550px", height:"204px"}'></div>
                </div>
            </div>
            <div class="age-distribution-box" :style="{backgroundImage: `url(${ageDistributionBg})`}">
                <h2 class="img-title">年龄分布</h2>
                <div class="chart-box">
                    <div ref="ageDistributeChart" :style="{ width: '520px', height: '245px', margin: '0 auto' }"></div>
                </div>
            </div> -->
        </div>
		<div class="performance-detail-box white-text">
			<div class="right-right">
				<div class="chart-box-title">
					<span class="chart-label-dot"></span>
					<i>人员绩效</i>
				</div>
				<div class="right-right-select">
					<el-select v-model="value" placeholder="请选择省">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="right-right-bottom">
					<div class="performance-detail-box white-text">
						<div class="staff-portrayal">
							<div class="info-box top-block" :style="{backgroundImage: `url(${topBorderBg})`}">
								<h3 class="detail-title white-text">检察官</h3>
								<p>工作年限：{{ performanceInfo.gznx }}年</p>
								<p>职务：{{ performanceInfo.zw }}</p>
								<p>地区：{{ performanceInfo.dq }}</p>
							</div>
							<div class="info-box left-side-1" :style="{backgroundImage: `url(${sideBorderBg})`}">
								<h3 class="detail-title">司法办案</h3>
								<p>办结案件：{{ performanceInfo.bjaj }}件</p>
								<p>在办案件：{{ performanceInfo.zbaj }}件</p>
							</div>
							<div class="info-box left-side-2" :style="{backgroundImage: `url(${sideBorderBg})`}">
								<h3 class="detail-title">队伍管理</h3>
								<p>年度考核：{{ performanceInfo.ndkh }}</p>
							</div>
							<div class="info-box right-side-1" :style="{backgroundImage: `url(${sideBorderBg})`}">
								<h3 class="detail-title">检查办公</h3>
								<p>办文数量：{{ performanceInfo.bwsl }}</p>
							</div>
							<div class="info-box right-side-2" :style="{backgroundImage: `url(${sideBorderBg})`}">
								<h3 class="detail-title">检务保障</h3>
								<p>使用经费：{{ performanceInfo.syjf }}元</p>
							</div>
							<div class="staff-img">
								<img :src="staffImg" alt="...">
							</div>
							<div class="shade-img">
								<img :src="shadeBg" alt="...">
							</div>
						</div>
						<div class="bottom-stage" :style="{backgroundImage: `url(${bottomStageBg})`}"></div>
					</div>
				</div>
			</div>
		</div>
		
        
    </div>
</template>
<script>
	import EChart                      from 'echarts';
	import CitySelector                from './city-selector';
	import { getPersonnelPerformance } from '@/utlis/request';

	export default {
		mounted() {
			this.personnelEducationdata      = EChart.init(this.$refs.personnelEducation);
			this.ageDistributeChart = EChart.init(this.$refs.ageDistributeChart);
		},
		data() {
			return {
				staffPerformanceBg: require('@/public/img/team-management/staffPerformanceBg.png'),
				staffEduStrBg     : require('@/public/img/team-management/staffEduStrBg.png'),
				ageDistributionBg : require('@/public/img/team-management/ageDistributionBg.png'),
				bottomStageBg     : require('@/public/img/team-management/bottomStageBg.png'),
				shadeBg           : require('@/public/img/team-management/shadeBg.png'),
				staffImg          : require('@/public/img/team-management/staff.png'),
				topBorderBg       : require('@/public/img/team-management/topBorderBg.png'),
				sideBorderBg      : require('@/public/img/team-management/sideBorderBg.png'),
				structureIcon     : require('@/public/img/team-management/structureIcon.png'),
				performanceInfo   : {},
				options: [{
					value: '选项1',
					label: '黄金糕'
					}, {
					value: '选项2',
					label: '双皮奶'
					}, {
					value: '选项3',
					label: '蚵仔煎'
					}, {
					value: '选项4',
					label: '龙须面'
					}, {
					value: '选项5',
					label: '北京烤鸭'
					}],
				value: ''
			}
		},
		methods   : {
			loadEduBgStrChart(personnelEducation) {
				const color            = ['#FFD54E', '#FF89CD', '#25DEAE', '#FF9C9C', '#27B8FA'],
					  eduStructureList = [{
						  key : 'dxzk',
						  name: '大学专科'
					  }, {
						  key : 'bk',
						  name: '大学本科'
					  }, {
						  key : 'ssyjs',
						  name: '硕士研究生'
					  }, {
						  key : 'bsyjs',
						  name: '博士研究生'
					  }, {
						  key : 'qt',
						  name: '其他'
					  }];
				this.personnelEducationdata.setOption({
					color:color,
					graphic: {
						elements: [{
							type : 'image',
							left : 130,
							style: {
								image : this.structureIcon,
								width : 100,
								height: 100
							},
							top  : 'center'
						}]
					},
					legend : {
						data     : eduStructureList.map(i => i.name),
						icon     : 'rect',
						itemGap  : 15,
						bottom:10,
						textStyle: {
							color: '#fff'
						}
					},
					grid   : {
						bottom: 20,
						left:100,
						width : '50%',
						height: '50%',
					},
					series : [{
						name          : '学历',
						type          : 'pie',
						radius        : [80, 80],
						center        : ['45%', '50%'],
						startAngle    : 90,
						hoverAnimation: false,
						label         : {
							normal  : {
								show: false,
							},
							emphasis: {
								show     : true,
								formatter: function(params) {
									return `${params.value}人 ${params.percent}%`;
								}
							}
						},
						itemStyle     : {
							normal: {
								shadowColor: 'rgba(0, 0, 0, 0.8)',
								shadowBlur : 50,
							}
						},
						data          : eduStructureList.map((i, index) => ({
							value    : personnelEducation[i.key],
							name     : i.name,
							itemStyle: {
								normal: {
									borderWidth: 22,
									shadowBlur : 20,
									borderColor: color[index],
									shadowColor: 'rgba(0, 0, 0,0)'
								}
							}
						}))
					}]
				});
			},
			loadAgeDistributeChart(ageDistribution) {
				const dataArr             = Object.values(ageDistribution),
					  dataTotal           = dataArr.reduce((accumulator, currentValue) => accumulator + currentValue),
					  ageDistributionData = [
						  {
						  	  num : ageDistribution.nl7,
							  value: this.putOneDecimal(ageDistribution.nl7/dataTotal),
							  name : '60岁'
						  }, {
							  num : ageDistribution.nl6,
							  value: this.putOneDecimal(ageDistribution.nl6/dataTotal),
							  name : '51-55岁',
						  }, {
							  num : ageDistribution.nl5,
							  value: this.putOneDecimal(ageDistribution.nl5/dataTotal),
							  name : '46-50岁'
						  }, {
							  num : ageDistribution.nl4,
							  value: this.putOneDecimal(ageDistribution.nl4/dataTotal),
							  name : '41-45岁'
						  }, {
							  num : ageDistribution.nl3,
							  value: this.putOneDecimal(ageDistribution.nl3/dataTotal),
							  name : '36-40岁'
						  }, {
							  num : ageDistribution.nl2,
							  value: this.putOneDecimal(ageDistribution.nl2/dataTotal),
							  name : '31-35岁'
						  }, {
							  num : ageDistribution.nl1,
							  value: this.putOneDecimal(ageDistribution.nl1/dataTotal),
							  name : '30岁以下'
						  }];
				this.ageDistributeChart.setOption({
					grid  : {
						top         : '10%',
						height      : '100%',
						width       : '80%',
						left        : 0,
						containLabel: true,
					},
					xAxis : {
						show: false,
						type: 'value',
						max : 100,
					},
					yAxis : {
						type     : 'category',
						textStyle: {
							color   : '#53D2D3',
							fontSize: 14
						},
						data     : ageDistributionData.map(item => ({
							value: item.name,

						})),
						axisTick : {
							show: false
						},
						axisLine : {
							show        : false,
							symbolOffset: [40, 40],
							lineStyle   : {
								color: "rgba(256, 256, 256, .4)",
							}
						}
					},
					series: [{
						type          : 'bar',
						itemStyle     : {
							normal: {
								barBorderRadius: 20,
								color          : 'rgba(142, 142, 142, .5)'
							}
						},
						barWidth      : 7,
						barGap        : '-100%',
						barCategoryGap: '40%',
						label         : {
							show     : true,
							position : ['102%', '0%'],
							color    : '#53D2D3',
							fontSize : '14px',
							formatter: (params) => {
								const speVal = params.name;
								return `${speVal[0]}人   ${speVal[1]}%`;
							},
						},
						data          : ageDistributionData.map((i) => ({
							name : [i.num, i.value],
							value: 100,
						})),
						animation     : false,
					}, {
						type     : 'bar',
						barWidth : 7,
						itemStyle: {
							barBorderRadius: 20,
							color          : new EChart.graphic.LinearGradient(0, 0, 1, 0, [{
								offset: 0,
								color : '#22BAF1'
							}, {
								offset: 1,
								color : '#1CF6FD'
							}]),
						},
						data     : ageDistributionData
					}]
				})
			},
			async searchStaffInfo(params) {
				const data = await getPersonnelPerformance({
					...params,
					startdate: this.startDate,
					enddate  : this.endDate,
				});
				if(data.code === 200) {
					this.performanceInfo = data.data;
				} else {
					this.$message.error(`code : ${data.code}`);
				}
			},
            putOneDecimal(num){
				return (num * 100).toFixed(1);
            }
		},
		props     : ['startDate', 'endDate'],
		components: {
			CitySelector,
		}
	}
</script>
<style lang="scss" scoped>
    @mixin bgSizeFull {
        background-size: 100% 100%;
    }

    .team-right-container {
        display: flex;
        margin-top: 5px;
        .staff-detail-info {
            margin-right: 35px;
            width: 400px;
			.right-left{
				height:420px;
			}
            .img-title {
                padding-top: 6px;
                color: #fff;
                text-align: center;
            }
            .staff-search-box {
                margin: 0 -10px 20px -10px;
                height: 272px;
                @include bgSizeFull;
            }
            .structure-box {
                height: 285px;
                margin-bottom: 20px;
                text-align: center;
                @include bgSizeFull;
                .chart-box {
                    padding-top: 30px;
                }
            }
            .age-distribution-box {
                height: 315px;
                text-align: center;
                @include bgSizeFull;
            }
        }
        .performance-detail-box {
            position: relative;
            width: 803px;
            height: 838px;
            .performance-detail-title {
                padding-top: 21px;
                padding-left: 0;
            }
            .staff-portrayal {
                height: 727px;
                .info-box {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    text-align: center;
                    @include bgSizeFull;
                    .detail-title {
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #00FFFF;
                    }
                    p {
                        width: 220px;
                        margin: 0 auto;
                        font-size: 16px;
                        line-height: 30px;
                        word-break: break-all;
                    }
                    &.top-block {
                        top: 10px;
                        left: 240px;
                        width: 319px;
                        height: 311px;
                    }
                    &.left-side-1 {
                        position: absolute;
                        top: 274px;
                        left: 71px;
                        width: 217px;
                        height: 120px;
                        text-align: center;
                    }
                    &.left-side-2 {
                        bottom: 192px;
                        left: 30px;
                        width: 217px;
                        height: 120px;

                    }
                    &.right-side-1 {
                        top: 274px;
                        right: 47px;
                        width: 217px;
                        height: 120px;
                    }
                    &.right-side-2 {
                        bottom: 202px;
                        right: 20px;
                        width: 217px;
                        height: 120px;
                    }

                }
                .staff-img {
                    position: absolute;
                    top: 307px;
                    left: 308px;
                    width: 187px;
                    height: 449px;
                    z-index: 2;
                    img {
                        width: 100%;
                    }
                }
                .shade-img {
                    position: absolute;
                    bottom: 30px;
                    left: 47%;
                    width: 834px;
                    height: 370px;
                    transform: translate(-50%, 0);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .bottom-stage {
                height: 50px;
                @include bgSizeFull;
            }
        }
    }
</style>