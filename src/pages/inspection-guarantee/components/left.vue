<template>
    <div class="home-page-left">
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
							<p>{{expenditure.zzcs}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zzc_tb}}<br><span>{{expenditure.zzc_bfb}}</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>总支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>{{expenditure.gnflzcs}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.gnflzc_tb}}<br><span>{{expenditure.gnflzc_bfb}}</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>功能分类支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>{{expenditure.zcxzs}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zcxz_tb}}<br><span>{{expenditure.zcxz_bfb}}</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>支出性质</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>{{expenditure.zcjjfls}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zcjjfl_tb}}<br><span>{{expenditure.zcjjfl_bfb}}</span></p>
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
			<p class='more-btn' @click="setDialogVisible('财政拨款收入分布')">更多>></p>
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
		 <el-dialog
                :title="dialogContext.name"
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import * as services                         from '../service/index';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import {incomeChartConfig,caizhengChartConfig }                 from '../constant/index';

	export default {
		data() {
			return {
				dialogVisible:false,
				dialogContext: {
					name: '',
					key : '',
					data: []
				},
				// caizhengChartConfig:caizhengChartConfig
			}
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.incomeChart     = ECharts.init(this.$refs.incomeChart);
			this.caizhengChart   = ECharts.init(this.$refs.caizhengChart);
			this.jingfeiChart    = ECharts.init(this.$refs.jingfeiChart);
			this.jianchaChart    = ECharts.init(this.$refs.jianchaChart);
			this.loadIncomeChart(params);
			this.loadCaizhengChart();
			this.loadJingfeiChart();
			this.loadJianchaChart();
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
				const { xAxisData, seriesData } = this.convertChartConfig(incomeChartConfig, this.income);
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
	  			const { xAxisData, seriesData } = this.convertChartConfigcz(this.financialAllocationList);
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
						right: '10%',
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
			loadJingfeiChart(){
				this.jingfeiChart.setOption({
					tooltip : {
						trigger: 'axis',
						axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data:['检察业务费合计','检察业务-其中财政拨款','办案（业务）经费','办案经费-其中财政拨款','业务装备经费','业务装备-其中财政拨款'],
						icon:"square",
						orient:'vertical',
						y: 'center',    //延Y轴居中
						x: 'right' ,//居右显示
						align:'left',
						textStyle:{
							color:'#fff'
						}
					},
					grid: {
						left: '3%',
						right: '22%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							data : ['年初结转结余','收入合计','支出合计','年末结转结余'],
							axisLine:{
								show:false,
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
								lineStyle: {
									color: "#fff",
								}
							}
						}
					],
					series : [
						{
							name:'检察业务费合计',
							type:'bar',
							stack:'哈哈',
							color:'#0BB0FB',
							data:this.jingfeiqingkuang.jcywfhj
						},
						{
							name:'检察业务-其中财政拨款',
							type:'bar',
							stack: '哈哈',
							color:'#3687F6',
							data:this.jingfeiqingkuang.jcywf_qzczbk
						},
						{
							name:'办案（业务）经费',
							type:'bar',
							stack: '广告',
							color:'#1BC85D',
							data:this.jingfeiqingkuang.bajf
						},
						{
							name:'办案经费-其中财政拨款',
							type:'bar',
							stack: '广告',
							color:'#0FA940',
							data:this.jingfeiqingkuang.bajf_qzczbk
						},
						
						{
							name:'业务装备经费',
							type:'bar',
							stack: '搜索引擎',
							color:'#FBBA18',
							data:this.jingfeiqingkuang.ywzbjf
						},
						{
							name:'业务装备-其中财政拨款',
							type:'bar',
							stack: '搜索引擎',
							color:'#F68C3B',
							data:this.jingfeiqingkuang.ywzbjf_qzczbk
						}
					]
				})
			},
			loadJianchaChart(){
				let ncjzjy=[],sr=[],zc=[],nmjzjy=[],year=[];
				for(var i=0;i<this.trendsProcuratorialBusinessList.length;i++){
					ncjzjy.push(this.trendsProcuratorialBusinessList[i].ncjzjy);
					sr.push(this.trendsProcuratorialBusinessList[i].sr);
					zc.push(this.trendsProcuratorialBusinessList[i].zc);
					nmjzjy.push(this.trendsProcuratorialBusinessList[i].nmjzjy);
					year.push(this.trendsProcuratorialBusinessList[i].year);
				}
				this.jianchaChart.setOption({
					tooltip : {
						trigger: 'axis'
					},
					legend: {
						data:['年初结转结余','收入','支出','年末结转结余'],
						icon: "line",
						textStyle: {
							color: "#fff"
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
							boundaryGap : false,
							data :year,
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
							name:'年初结转结余',
							type:'line',
							stack: '总量',
							smooth: true,
							areaStyle: {
									color: new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#EB5910'
								}, {
									offset: 1,
									color: '#4049FF'
								}]),
							},
							data:ncjzjy
						},
						{
							name:'收入',
							type:'line',
							stack: '总量',
							smooth: true,
							areaStyle: {
									color: new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#376AF7'
								}, {
									offset: 1,
									color: '#4049FF'
								}]),
							},
							data:sr
						},
						{
							name:'支出',
							type:'line',
							stack: '总量',
							smooth: true,
							areaStyle: {
									color: new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#009FE8'
								}, {
									offset: 1,
									color: '#33E8FF'
								}]),
							},
							data:zc
						},
						{
							name:'年末结转结余',
							type:'line',
							stack: '总量',
							smooth: true,
							areaStyle: {
									color: new ECharts.graphic.LinearGradient(0, 1, 0, 0, [{
									offset: 0,
									color: '#FDBF18'
								}, {
									offset: 1,
									color: '#FFFF33'
								}]),
							},
							data:nmjzjy
						}
					]
				})
			},
			setDialogVisible(name) {
				let data = [],
					key  = '';
				switch(name) {
					case '财政拨款收入分布' :
						key  = '财政拨款收入分布';
						data = this.financialAllocationList;
						break;
					case '全国省份排名':
						key  = '全国省份排名';
						data = this.averageHandCasesList;
						break;
				}
				this.dialogContext = {
					name,
					key,
					data
				};

				this.dialogVisible = true;
			},
			loadDialogChart(){
				const { data: chartData, key } = this.dialogContext,
					  { xAxisData, seriesData } = this.convertChartConfigcz(chartData, key);
				this.dialogBarChart            = ECharts.init(this.$refs.dialogChart);
				const color=
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
						data     : xAxisData,
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
									 show:true,
									color: '#5C89FF'
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
			closeBarDialog(){
				this.dialogBarChart && this.dialogBarChart.clear();
			}

		},
		components: {},
		props:{
			income:{
				default:{}
			},
			expenditure:{
				default:{}
			},
			financialAllocationList:{
				default:{}
			},
			jingfeiqingkuang:{
				default:{}
			},
			trendsProcuratorialBusinessList:{
				default:{}
			}
		}
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
			position:relative;
			.caizheng-content {
                width: 100%;
                height: 247px;
                margin: 0 auto;
            }
			.more-btn{
				color:#FBBA18;
				position:absolute;
				right:25px;
				bottom:5px;
				 margin-top: 17px;
                text-align: right;
                font-size: 16px;
                font-family: Helvetica;
                color: rgba(251, 186, 24, 1);
                line-height: 17px;
                cursor: pointer;
				z-index:999;
			}
		}
		.jingfei-box{
			width:739px;
			.jingfei-content {
                width: 100%;
                height: 292px;
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
		.per-dialog-chart {
            width: 100%;
            height: 400px;
        }
    }
</style>