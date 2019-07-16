<template>
    <div class="co-center-container">
        <div class="msg-issue-box">
			<div class="chart-box-title">
              <span class="chart-label-dot"></span>
              <i>信息发布</i>
            </div>
            <div class="table-group">
                <div class="table-item" v-for="infoPublish in infoPublishTableGroup">
                    <info-table
                            :columns="infoPublishColumns"
                            :list="infoPublish"
                    ></info-table>
                </div>
            </div>
        </div>
        <div class="file-analyze-box">
			<div class="chart-box-title">
              <span class="chart-label-dot"></span>
              <i>归档分析</i>
            </div>
            <div class="file-analyze-chart" ref="fileAnalyzeChart"></div>
        </div>
    </div>
</template>
<script>
	import EChart    from 'echarts';
	import InfoTable from './info-table';

	export default {
		mounted() {
			this.myEchart = EChart.init(this.$refs.fileAnalyzeChart);
		},
		data() {
			return {
				cursorImg         : require('@/public/img/check-office/cursor.png'),
				infoPublishColumns: [{
					id   : 'lwdw',
					label: '部门',
					color: 'rgba(255,255,255,1)'
				}, {
					id   : 'sl',
					label: '数量',
					color: 'rgba(48,234,255,1)'
				}, {
					id   : 'zb',
					label: '占比',
					color: 'rgba(247,147,30,1)'
				}],
			}
		},
		computed  : {
			infoPublishTableGroup() {
				const arr = [],
					  len = this.infoPublishList.length;
				for(let i = 0; i < len; i += 5) {
					const groupList = this.infoPublishList.slice(i, i + 5);
					arr.push(groupList);
				}
				if(arr.length > 3) {
					arr.length = 3;
				}
				console.log(arr)
				return arr;
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
			}
		},
		props     : ['theArchiveAnalysisList', 'infoPublishList'],
		components: {
			InfoTable
		},
		watch     : {
			theArchiveAnalysisList() {
				this.loadFileAnalyzeChart();
			}
		}
	}
</script>
<style lang="scss">
    .co-center-container {
        width: 1606px;
        .msg-issue-box {
            height: 454px;
            padding: 19px 75px;
            margin-bottom: 19px;
            .table-group {
                display: flex;
				padding-left:30px;
                .table-item {
                    position: relative;
                    flex: 1;
                    margin-right: 60px;
					text-align:center;
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
					.bj-table{
						thead{
							th{
								text-align:left;
							}
						}
					}
					tbody{
						tr{
							td{
								text-align:left;
							}
							td:first-child{
								padding-right:30px;
							}
						}
					}
                }
            }
        }
        .file-analyze-box {
            height: 436px;
            padding: 23px 64px;
            .file-analyze-chart {
                width: 1480px;
                height: 370px;
            }
        }
    }
</style>