<template>
    <div class="co-center-container">
        <div class="msg-issue-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>信息发布</i>
            </div>
            <div class="table-group">
				<p class='more-btn' @click="setDialogVisible('信息发布')">更多>></p>
				<div class="file-analyze-chart" ref="infoPublishListchart"></div>
            </div>
        </div>
        <div class="file-analyze-box">
            <div class="chart-box-title">
                <span class="chart-label-dot"></span>
                <i>归档分析</i>
            </div>
            <div class="file-analyze-chart" ref="fileAnalyzeChart"></div>
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
	import EChart    from 'echarts';
	import InfoTable from './info-table';

	export default {
		mounted() {
			this.myEchart = EChart.init(this.$refs.fileAnalyzeChart);
			this.infoPublishListEchart = EChart.init(this.$refs.infoPublishListchart)
		},
		data() {
			return {
				cursorImg         : require('@/public/img/check-office/cursor.png'),
				dialogVisible:false,
				dialogContext: {
					name: '',
					key : '',
					data: []
				},
			}
		},
		methods   : {
			loadFileAnalyzeChart() {
				const { xAxisData, seriesData } = this.getChartConfigData(this.theArchiveAnalysisList);
				this.myEchart.setOption({
					color  : ['#3398DB'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '3%',
						containLabel: true
					},
					xAxis  : {
						type     : 'category',
						data     : xAxisData,
						axisLabel: {
							color   : '#fff',
							fontSize: 16,
						},
						axisLine : {
							lineStyle: {
								color: '#6BE3F9'
							}
						},
						axisTick : {
							show: false
						},
					},
					yAxis  : {
						type         : 'value',
						name         : '归档件数',
						nameTextStyle: {
							padding : [0, 40, 0, 0],
							color   : "#fff",
							fontSize: 16
						},
						axisLabel    : {
							color: '#fff'
						},
						axisLine     : {
							lineStyle: {
								color: '#6BE3F9'
							}
						},
						axisTick     : {
							show: false
						},
						splitLine    : {
							lineStyle: {
								color: 'rgba(107,227,249,0.3)'
							}
						}
					},
					series : [
						{
							name     : '归档文件',
							type     : 'bar',
							barWidth : 48,
							data     : seriesData,
							itemStyle: {
								color: '#1BECFD'
							},
							label    : {
								show    : true,
								position: 'top',
								fontSize: 16
							}
						}
					]
				})
			},
			loadinfoPublishListChart() {
				const { xAxisData, seriesData } = this.getinfoChartConfigData(this.infoPublishList.slice(0,10));
				this.infoPublishListEchart.setOption({
					color  : ['#3398DB'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '40',
						containLabel: true
					},
					xAxis  : {
						type     : 'category',
						data     : xAxisData,
						axisLabel: {
							color   : '#fff',
							fontSize: 16,
							interval: 0,
							formatter : (name) => textFormatter(name, 4),
						},
						axisLine : {
							lineStyle: {
								color: '#6BE3F9'
							}
						},
						axisTick : {
							show: false
						},
					},
					yAxis  : {
						type         : 'value',
						nameTextStyle: {
							padding : [0, 40, 0, 0],
							color   : "#fff",
							fontSize: 16
						},
						axisLabel    : {
							color: '#fff'
						},
						axisLine     : {
							lineStyle: {
								color: '#6BE3F9'
							}
						},
						axisTick     : {
							show: false
						},
						splitLine    : {
							lineStyle: {
								color: 'rgba(107,227,249,0.3)'
							}
						}
					},
					series : [
						{
							name     : '归档文件',
							type     : 'bar',
							barWidth : 48,
							data     : seriesData,
							itemStyle:{
							normal:{
									color:'#5C89FF'
								}
							},
							label    : {
								show    : true,
								position: 'top',
								fontSize: 16
							}
						}
					]
				})
			},
			getChartConfigData(chartData) {
				const xAxisData  = [],
					  seriesData = [];
				chartData.forEach(i => {
					xAxisData.push(i.sj);
					seriesData.push(i.gdjs);
				});
				return {
					xAxisData,
					seriesData
				};
			},
			getinfoChartConfigData(chartData) {
				const xAxisData  = [],
					  seriesData = [];
				chartData.forEach(i => {
					xAxisData.push(i.lwdw);
					seriesData.push(i.sl);
				});
				return {
					xAxisData,
					seriesData
				};
			},
			 setDialogVisible(name) {
				let data = [],
                    key  = '';
                    switch(name){
                        case '信息发布':
                            key  = '信息发布';
                            data = this.infoPublishList;
                            break;
                    }
					
				this.dialogContext = {
					name,
					key,
					data
                }
                this.dialogVisible = true;
			},
        loadDialogChart(){
            this.dialogBarChart            = EChart.init(this.$refs.dialogChart);
            const { xAxisData, seriesData } = this.getinfoChartConfigData(this.infoPublishList);
			this.dialogBarChart.setOption({
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
						},
						axisLabel:{
							interval: 0,
							formatter : (name) => textFormatter(name, 4),
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
        closeBarDialog(){
            this.dialogBarChart && this.dialogBarChart.clear();
        },
		},
		props     : ['theArchiveAnalysisList', 'infoPublishList'],
		components: {
			InfoTable
		},
		watch     : {
			theArchiveAnalysisList() {
				this.loadFileAnalyzeChart();
			},
			infoPublishList(){
				this.loadinfoPublishListChart();
			}
		}
	}
</script>
<style lang="scss">
    .co-center-container {
        width: 1606px;
        .msg-issue-box {
            height: 454px;
            padding: 23px 64px;
			padding-right:0px;
            margin-bottom: 19px;
            .table-group {
                display: flex;
				height:400px;
                .table-item {
                    position: relative;
                    flex: 1;
                    margin-right: 60px;
                    text-align: center;
                    &:after {
                        position: absolute;
                        top: 30px;
                        right: 0;
                        content: '';
                        width: 1px;
                        height: 330px;
                        background: rgba(1, 218, 226, 1);
                    }
                    &:last-child {
                        &:after {
                            display: none;
                        }
                    }
                    .bj-table {
                        thead {
                            th {
                                text-align: left;
                            }
                        }
                    }
                    tbody {
                        tr {
                            td {
                                text-align: left;
                            }
                            td:first-child {
                                padding-right: 30px;
                            }
                        }
                    }
                }
				.more-btn{
					color:#FBBA18;
					position:absolute;
					right:85px;
					top:55px;
					margin-top: 17px;
					text-align: right;
					font-size: 16px;
					font-family: Helvetica;
					color: rgba(251, 186, 24, 1);
					line-height: 17px;
					cursor: pointer;
							z-index:999;
				}
				.file-analyze-chart{
					width: 1606px;
					height:400px;
				}
            }
        }
        .file-analyze-box {
            height: 436px;
            padding: 23px 64px;
			padding-right:0px;
            .file-analyze-chart {
                // width: 1531px;
                height: 370px;
            }
        }
    }
</style>