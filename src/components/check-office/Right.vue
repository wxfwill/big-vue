<template>
    <div class="co-center-container">
        <div class="msg-issue-box">
            <h1 class="title white-text text-center">信息发布</h1>
            <div class="cursor-img">
                <img :src="cursorImg" alt="...">
            </div>
            <div class="table-group">
                <div class="table-item" v-for="infoPublish in infoPublishTableGroup">
                    <info-table
                            :columns="infoPublishColumns"
                            :list="infoPublishList"
                    ></info-table>
                </div>
            </div>
        </div>
        <div class="file-analyze-box">
            <h1 class="title white-text text-center">归档分析</h1>
            <div class="cursor-img">
                <img :src="cursorImg" alt="...">
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
					id   : 'name',
					label: '部门',
					color: 'rgba(255,255,255,1)'
				}, {
					id   : 'num',
					label: '数量',
					color: 'rgba(48,234,255,1)'
				}, {
					id   : 'ratio',
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
        width: 1617px;
        .msg-issue-box {
            height: 454px;
            padding: 19px 75px;
            margin-bottom: 19px;
            background: rgba(10, 103, 209, 0.2);
            border: 1px solid rgba(1, 218, 226, 1);
            .table-group {
                display: flex;
                .table-item {
                    position: relative;
                    flex: 1;
                    margin-right: 60px;
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
                }
            }
        }
        .file-analyze-box {
            height: 436px;
            padding: 23px 64px;
            background: rgba(10, 103, 209, 0.2);
            border: 1px solid rgba(1, 218, 226, 1);
            .file-analyze-chart {
                width: 1480px;
                height: 370px;
            }
        }
    }
</style>