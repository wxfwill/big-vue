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
							<p>￥{{formatNum(expenditure.zzcs)}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zzc_tb}}<br><span>{{expenditure.zzc_bfb}}%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>总支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>￥{{formatNum(expenditure.gnflzcs)}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.gnflzc_tb}}<br><span>{{expenditure.gnflzc_bfb}}%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>功能分类支出</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>￥{{formatNum(expenditure.zcxzs)}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zcxz_tb}}<br><span>{{expenditure.zcxz_bfb}}%</span></p>
						</div>
					</div>
					<div class='payBox-bottom'>支出性质</div>
				</div>
				<div class="payBox">
					<div class="boxborder">
						<div class='payBox-top'>
							<p>￥{{formatNum(expenditure.zcjjfls)}}</p>
							<p>同比<i class="el-icon-top"></i>{{expenditure.zcjjfl_tb}}<br><span>{{expenditure.zcjjfl_bfb}}%</span></p>
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
			<div class="jingfei-content" ref="jingfeiChart1"></div>
			<div class="jingfei-content" ref="jingfeiChart2"></div>
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
	import { verifyTriggerState, numberInteger ,textFormatter} from '@/utlis/helper';
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
			this.jingfeiChart1    = ECharts.init(this.$refs.jingfeiChart1);
			this.jingfeiChart2    = ECharts.init(this.$refs.jingfeiChart2);
			this.jianchaChart    = ECharts.init(this.$refs.jianchaChart);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
			}
		},
		methods   : {
			loadIncomeChart(chartData) {
				const { xAxisData, seriesData } = this.convertChartConfig(incomeChartConfig, chartData);
				this.incomeChart.setOption({
					color  : ['#4F79E2', '#1BC85D', '#009FE8', '#FF6C40', '#FBBA18', '#0BD7AA'],
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
						data:xAxisData
					},
					series : {
						name     : '收入',
						type     : 'pie',
						radius   : '65%',
						center   : ['35%', '60%'],
						data     : seriesData,
						label: {
            				show:true
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
						  xAxisData.push(config.name);
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
			convertChartConfigczs(configList = []) {
				const xAxisData  = [],
					  seriesData = [];
					  configList.map((config) => {
						  xAxisData.push(config.city_name);
						  seriesData.push(config.sl)
					  });
				return { xAxisData, seriesData };
			},
			loadCaizhengChart(data) {
	  			const { xAxisData, seriesData } = this.convertChartConfigczs(data.slice(0,10));
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
							axisLabel: {
								show: true,
								interval:'0',
								textStyle: {
									color: '#ffffff'
								},
								formatter : (name) => textFormatter(name, 4),
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
				console.log(this.jingfeiqingkuang)
	 			let max = this.jingfeiqingkuang.jcywfhj.reduce(function(a , b){ 
				return b > a ? b : a; 
				});
				let max1 = this.jingfeiqingkuang.bajf.reduce(function(a , b){ 
				return b > a ? b : a; 
				});
				let max2 =this.jingfeiqingkuang.ywzbjf.reduce(function(a , b){ 
				return b > a ? b : a; 
				});

				console.log(max); 
				this.jingfeiChart.setOption({
					color: ["#0BB0FB", "rgba(86,199,60, 1)"],
					tooltip: {
						show: true,
						trigger: "item"
					},
					legend: {
						textStyle:{
							color:'#fff'
						},
						data: ['检察业务费合计', '其中财政拨款']
					},
					radar: {
						center: ["50%", "50%"],
						radius: "40%",
						startAngle: 90,
						splitNumber: 4,
						shape: "circle",
						splitArea: {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel: {
							show: false,
							fontSize: 20,
							color: "#000",
							fontStyle: "normal",
							fontWeight: "normal"
						},
						axisLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name: {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth: 1,
							borderRadius: 0,

							rich: {

								a: {
									color: '#00b7ee',

									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr: {
									borderColor: '#aaa',
									width: '100%',
									borderWidth: 0.1,
									align: 'left',
									height: 1
								},
								b: {
									color: '#333',
									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',
									width: '100%',
									align: 'left',
									borderRadius: 0
								},
								per: {
									color: '#eee',
									backgroundColor: '#ffffff',
									borderWidth: 0.5,
									borderRadius: 0,
									borderColor: '#fff',
								}
							}

						},
						indicator: [{
								name: '年初结转结余',
								max:max ,
								aaa: 'assdfasdf',
								
							},
							{
								name: '收入合计',
								max: max,
								aaa: 'assdfasdf'
							},
							{
								name: '支出合计',
								max: max,
								aaa: 'assdfasdf'
							},
							{
								name: '年末结转\n结余',
								max: max,
								aaa: 'assdfasdf'
							},
						]
					},

					series: [{
						name: "检察业务费合计",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						areaStyle: {
							normal: {
								color: "#0BB0FB"
							}
						},
						itemStyle: {
							color: '#0BB0FB',
							borderColor: '#0BB0FB',
							borderWidth: 2,
						},
						lineStyle: {
							normal: {
								color: "#0BB0FB",
								width: 0.1
							}
						},
						data: [
							this.jingfeiqingkuang.jcywfhj
						]
					}, {
						name: "其中财政拨款",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						itemStyle: {
							normal: {
								color: '#00ffff',
								borderColor: "#00ffff",
								borderWidth: 2
							}
						},
						areaStyle: {
							normal: {
								"color": "#00ffff"
							}
						},
						lineStyle: {
							normal: {
								color: "#00ffff",
								width: 0.1,
							}
						},
						data: [
							this.jingfeiqingkuang.jcyw_czbk
						]
					}]
				})
				this.jingfeiChart1.setOption({
					color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
					tooltip: {
						show: true,
						trigger: "item"
					},
					legend: {
						textStyle:{
							color:'#fff'
						},
						data: ['办案（业务）经费', '其中财政拨款']
					},
					radar: {
						center: ["50%", "50%"],
						radius: "40%",
						startAngle: 90,
						splitNumber: 4,
						shape: "circle",
						splitArea: {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel: {
							show: false,
							fontSize: 20,
							color: "#000",
							fontStyle: "normal",
							fontWeight: "normal"
						},
						axisLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name: {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth: 1,
							borderRadius: 0,

							rich: {

								a: {
									color: '#00b7ee',

									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr: {
									borderColor: '#aaa',
									width: '100%',
									borderWidth: 0.1,
									align: 'left',
									height: 1
								},
								b: {
									color: '#333',
									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',
									width: '100%',
									align: 'left',
									borderRadius: 0
								},
								per: {
									color: '#eee',
									backgroundColor: '#ffffff',
									borderWidth: 0.5,
									borderRadius: 0,
									borderColor: '#fff',
								}
							}

						},
						indicator: [{
								name: '年初结转结余',
								max: max1,
								aaa: 'assdfasdf',
								
							},
							{
								name: '收入合计',
								max: max1,
								aaa: 'assdfasdf'
							},
							{
								name: '支出合计',
								max: max1,
								aaa: 'assdfasdf'
							},
							{
								name: '年末结转\n结余',
								max: max1,
								aaa: 'assdfasdf'
							},
						]
					},

					series: [{
						name: "办案（业务）经费",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						areaStyle: {
							normal: {
								color: "#1BC85D"
							}
						},
						itemStyle: {
							color: '#1BC85D',
							borderColor: '#1BC85D',
							borderWidth: 2,
						},
						lineStyle: {
							normal: {
								color: "#1BC85D",
								width: 0.1
							}
						},
						data: [
							this.jingfeiqingkuang.bajf
						]
					}, {
						name: "其中财政拨款",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						itemStyle: {
							normal: {
								color: '#048B25',
								borderColor: "#048B25",
								borderWidth: 2
							}
						},
						areaStyle: {
							normal: {
								"color": "#048B25"
							}
						},
						lineStyle: {
							normal: {
								color: "#048B25",
								width: 0.1,
							}
						},
						data: [
							this.jingfeiqingkuang.bajf_qzczbk
						]
					}]
				})
				this.jingfeiChart2.setOption({
					color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
					tooltip: {
						show: true,
						trigger: "item"
					},
					legend: {
						textStyle:{
							color:'#fff'
						},
						data: ['业务装备经费', '其中财政拨款']
					},
					radar: {
						center: ["50%", "50%"],
						radius: "40%",
						startAngle: 90,
						splitNumber: 4,
						shape: "circle",
						splitArea: {
							areaStyle: {
								color: ["transparent"]
							}
						},
						axisLabel: {
							show: false,
							fontSize: 20,
							color: "#000",
							fontStyle: "normal",
							fontWeight: "normal"
						},
						axisLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
								color: "#999"
							}
						},
						// shape: 'circle',
						name: {
							// formatter: '{a|{value}}{abg|}\n{hr|}\n{b|1234}',
							// backgroundColor: '#eee',
							// borderColor: '#aaa',
							borderWidth: 1,
							borderRadius: 0,

							rich: {

								a: {
									color: '#00b7ee',

									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',

									borderRadius: 0
								},

								hr: {
									borderColor: '#aaa',
									width: '100%',
									borderWidth: 0.1,
									align: 'left',
									height: 1
								},
								b: {
									color: '#333',
									lineHeight: 25,
									padding: [0, 0, 0, 8],
									height: 25,
									backgroundColor: '#fff',
									width: '100%',
									align: 'left',
									borderRadius: 0
								},
								per: {
									color: '#eee',
									backgroundColor: '#ffffff',
									borderWidth: 0.5,
									borderRadius: 0,
									borderColor: '#fff',
								}
							}

						},
						indicator: [{
								name: '年初结转结余',
								max: max2,
								aaa: 'assdfasdf',
								
							},
							{
								name: '收入合计',
								max: max2,
								aaa: 'assdfasdf'
							},
							{
								name: '支出合计',
								max: max2,
								aaa: 'assdfasdf'
							},
							{
								name: '年末结转\n结余',
								max: max2,
								aaa: 'assdfasdf'
							},
						]
					},

					series: [{
						name: "业务装备经费",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						areaStyle: {
							normal: {
								color: "#FBBA18"
							}
						},
						itemStyle: {
							color: '#FBBA18',
							borderColor: '#FBBA18)',
							borderWidth: 2,
						},
						lineStyle: {
							normal: {
								color: "#FBBA18",
								width: 0.1
							}
						},
						data: [
							this.jingfeiqingkuang.ywzbjf
						]
					}, {
						name: "其中财政拨款",
						type: "radar",
						symbol: "circle",
						symbolSize: 2,
						itemStyle: {
							normal: {
								color: '#F25F5F',
								borderColor: "#F25F5F",
								borderWidth: 2
							}
						},
						areaStyle: {
							normal: {
								"color": "#F25F5F"
							}
						},
						lineStyle: {
							normal: {
								color: "#F25F5F",
								width: 0.1,
							}
						},
						data: [
							this.jingfeiqingkuang.ywzbjf_qzczbk
						]
					}]
				})
				// this.jingfeiChart.setOption({
				// 	tooltip : {
				// 		trigger: 'axis',
				// 		axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				// 			type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				// 		}
				// 	},
				// 	legend: {
				// 		data:['检察业务费合计','检察业务-其中财政拨款','办案（业务）经费','办案经费-其中财政拨款','业务装备经费','业务装备-其中财政拨款'],
				// 		icon:"square",
				// 		orient:'vertical',
				// 		y: 'center',    //延Y轴居中
				// 		x: 'right' ,//居右显示
				// 		align:'left',
				// 		textStyle:{
				// 			color:'#fff'
				// 		}
				// 	},
				// 	grid: {
				// 		left: '3%',
				// 		right: '22%',
				// 		bottom: '15%',
				// 		containLabel: true
				// 	},
				// 	xAxis : [
				// 		{
				// 			type : 'category',
				// 			data : ['年初结转结余','收入合计','支出合计','年末结转结余'],
				// 			axisLine:{
				// 				show:false,
				// 				lineStyle: {
				// 					color: "#fff",
				// 				}
				// 			}
				// 		}
				// 	],
				// 	yAxis : [
				// 		{
				// 			type : 'value',
				// 			axisLine:{
				// 				lineStyle: {
				// 					color: "#fff",
				// 				}
				// 			}
				// 		}
				// 	],
				// 	series : [
				// 		{
				// 			name:'检察业务费合计',
				// 			type:'bar',
				// 			stack:'哈哈',
				// 			color:'#0BB0FB',
				// 			data:this.jingfeiqingkuang.jcywfhj
				// 		},
				// 		{
				// 			name:'检察业务-其中财政拨款',
				// 			type:'bar',
				// 			stack: '哈哈',
				// 			color:'#3687F6',
				// 			data:this.jingfeiqingkuang.jcyw_czbk

				// 		},
				// 		{
				// 			name:'办案（业务）经费',
				// 			type:'bar',
				// 			stack: '广告',
				// 			color:'#1BC85D',
				// 			data:this.jingfeiqingkuang.bajf
				// 		},
				// 		{
				// 			name:'办案经费-其中财政拨款',
				// 			type:'bar',
				// 			stack: '广告',
				// 			color:'#0FA940',
				// 			data:this.jingfeiqingkuang.bajf_qzczbk
				// 		},
						
				// 		{
				// 			name:'业务装备经费',
				// 			type:'bar',
				// 			stack: '搜索引擎',
				// 			color:'#FBBA18',
				// 			data:this.jingfeiqingkuang.ywzbjf
				// 		},
				// 		{
				// 			name:'业务装备-其中财政拨款',
				// 			type:'bar',
				// 			stack: '搜索引擎',
				// 			color:'#F68C3B',
				// 			data:this.jingfeiqingkuang.ywzbjf_qzczbk
				// 		}
				// 	]
				// })
			},
			loadJianchaChart(data){
				let ncjzjy=[],sr=[],zc=[],nmjzjy=[],year=[];
				for(var i=0;i<data.length;i++){
					ncjzjy.push(data[i].ncjzjy);
					sr.push(data[i].sr);
					zc.push(data[i].zc);
					nmjzjy.push(data[i].nmjzjy);
					year.push(data[i].year);
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
						bottom: '15%',
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
						data = this.financialAllocationList.slice(1);
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
					  { xAxisData, seriesData } = this.convertChartConfigczs(chartData, key);
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
							interval  : 0,
							formatter : (name) => textFormatter(name, 4),
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
			},
			formatNum(money){
				if(money && money!=null){
					money = String(money);
					var left=money.split('.')[0],right=money.split('.')[1];
					right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '';
					var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
					return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
				}else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
					return '0.00';
				}else{
					return "";
				}
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
				default:[]
			},
			jingfeiqingkuang:{
				default:{}
			},
			trendsProcuratorialBusinessList:{
				default:[]
			}
		},
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
                width: 100%;
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
				bottom:25px;
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
                width: 30%;
                height: 292px;
				float:left;
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