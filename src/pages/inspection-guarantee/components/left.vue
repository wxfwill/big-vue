<template>
    <div class="home-page-left">
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
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
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>123,234,23</p>
							<p>同比<i class="el-icon-top"></i>234,23<br><span>23%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>总支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>123,234,23</p>
							<p>同比<i class="el-icon-top"></i>234,23<br><span>23%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>功能分类支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>123,234,23</p>
							<p>同比<i class="el-icon-top"></i>234,23<br><span>23%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>支出性质</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>123,234,23</p>
							<p>同比<i class="el-icon-top"></i>234,23<br><span>23%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>支出经济分类</div>
				</div>
			</div>
        </div>
		<div class="caizheng-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>财政拨款收入分布</i>
            </div>
            <div class="caizheng-content" ref="caizhengChart"></div>
        </div>
		<div class="jingfei-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>经费情况</i>
            </div>
            <div class="jingfei-content" ref="jingfeiChart"></div>
        </div>
		<div class="jiancha-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>检察业务费趋势</i>
            </div>
            <div class="jiancha-content" ref="jianchaChart"></div>
        </div>
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import { mapGetters }                        from 'vuex';
	import * as services                         from '../service/index';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import { incomeChartConfig,caizhengChartConfig }                 from '../constant/index';

	export default {
		data() {
			return {}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.incomeChart     = ECharts.init(this.$refs.incomeChart);
			this.caizhengChart   = ECharts.init(this.$refs.caizhengChart)
			this.loadIncomeChart(params);
			this.loadCaizhengChart();
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadIncomeChart(chartData) {
				chartData = {
					czbk  : 122,
					sjbz  : 123,
					sysr  : 92,
					jysr  : 222,
					fsdwsj: 321,
					qtsr  : 122,
				};
				const { xAxisData, seriesData } = this.convertChartConfig(incomeChartConfig, chartData);
				this.incomeChart.setOption({
					color  : ['#4F79E2', '#1BC85D', '#009FE8', '#FF6C40', '#FF6C40', '#0BD7AA'],
					tooltip: {
						trigger  : 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						orient  : 'vertical',
						right   : 50,
						top     : 50,
						bottom  : 20,
						textStyle : {
							color : 'white'
						},
						icon:"circle",
					},
					series : {
						name     : '收入',
						type     : 'pie',
						radius   : '65%',
						center   : ['25%', '50%'],
						data     : seriesData,
						label: {
            				show:false
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
						  xAxisData.push(config.id);
						  return {
							  name : config.name,
							  value: data[config.id],
						  }
					  });
				return { xAxisData, seriesData };
			},
			convertChartConfigcz(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
					  configList.map((config) => {
						  xAxisData.push(config.id);
						  seriesData.push(config.name)
					  });
				return { xAxisData, seriesData };
			},
			loadCaizhengChart() {
	  			const { xAxisData, seriesData } = this.convertChartConfigcz(caizhengChartConfig);
				this.caizhengChart.setOption({
					color: ['#3398DB'],
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : xAxisData,
							axisTick: {
								show:false
							},
							axisLine:{
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							axisLine:{
								show:false,
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					series : [
						{
							name:'直接访问',
							type:'bar',
							barWidth: '60%',
							data:seriesData,
							itemStyle:{
								normal:{
									color:'#5C89FF'
								}
							}
						}
					]
				})
			},
		},
		components: {}
	};
</script>

<style lang="scss" scoped>
    .home-page-left {
		width:1324px;
        display: flex;
        flex-wrap: wrap;
        .income-box {
            width: 466px;
            .income-content {
                width: 80%;
                height: 261px;
                margin: 0 auto;
            }
        }
		.pay-box{
			width:806px;
			.pay-content {
                width: 90%;
                height: 261px;
                margin: 0 auto;
				display: flex;
        		flex-wrap: wrap;
				.payBox{
					width:160px;
					margin-top:29px;
					margin-right:24px;
					.boxborder{
						width: 160px; 
						height: 160px; 
						border-radius:50%; 
						box-sizing: border-box; 
    					padding: 14px;
						background-image: -webkit-linear-gradient(top,#01AFFF,#005FE8);
					}
					.payBox-top{
						width:100%;
						height:100%;
						text-align:center;
						border-radius:50%;
						padding-top:30px;
						background:#04092A;
						p{
							color:#00FFF8;
							padding-bottom:14px;
							span{
								color:#FF6C40;
								padding-left:40px;
							}
						}
						p:first-child{
							font-size:18px;
						}
					}
					.payBox-bottom{
						width:160px;
						color:#fff;
						text-align:center;
						margin-top:13px;
					}
				}
				.payBox:last-child{
					margin-right:0px;
				}
            }
		}
		.caizheng-box{
			width:1234px;
			.caizheng-content {
                width: 100%;
                height: 247px;
                margin: 0 auto;
            }
		}
		.jingfei-box{
			width:739px;
			.jingfei-content {
                width: 80%;
                height: 292px;
                margin: 0 auto;
            }
		}
		.jiancha-box{
			width:544px;
			.jiancha-content {
                width: 80%;
                height: 292px;
                margin: 0 auto;
            }
		}
    }
</style>