<template>
    <div class="co-center-container">
        <div class="msg-issue-box">
            <h1 class="title white-text text-center">信息发布</h1>
            <div class="cursor-img">
                <img :src="cursorImg" alt="...">
            </div>
            <div class="table-group">
                <div class="table-item">
                    <info-table
                            :columns="infoPublishColumns"
                            :list="infoPublishList"
                    ></info-table>
                </div>
                <div class="table-item">
                    <info-table
                            :columns="infoPublishColumns"
                            :list="infoPublishList"
                    ></info-table>
                </div>
                <div class="table-item">
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
			this.loadFileAnalyzeChart();
		},
		data() {
			return {
				cursorImg         : require('@/public/img/check-office/cursor.png'),
				infoPublishColumns: [{
					id   : 'name',
					label: '部门',
                    color : 'rgba(255,255,255,1)'
				}, {
					id   : 'num',
					label: '数量',
					color : 'rgba(48,234,255,1)'
				}, {
					id   : 'ratio',
					label: '占比',
					color : 'rgba(247,147,30,1)'
				}],
				infoPublishList   : [{
					name : '办公厅',
					num  : '243',
					ratio: '112.3%'
				}, {
					name : '第一检察厅',
					num  : '1234',
					ratio: '11.2%'
				}, {
					name : '第二检察厅',
					num  : '22',
					ratio: '1.3%'
				}, {
					name : '第三检察厅',
					num  : '243',
					ratio: '2.3%'
				}, {
					name : '第四检察厅',
					num  : '2222',
					ratio: '42.3%'
				}, {
					name : '第五检察厅',
					num  : '243',
					ratio: '15.3%'
				}]
			}
		},
		methods   : {
			loadFileAnalyzeChart() {
				const echart = EChart.init(this.$refs.fileAnalyzeChart);
				echart.setOption({
					color  : ['#3398DB'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
						data     : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
							data     : [10, 52, 200, 334, 390, 330, 220, 22, 1, 21, 203, 4,],
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
			}
		},
		components: {
			InfoTable
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
                    &:after{
                        position: absolute;
                        top: 30px;
                        right: 0;
                        content: '';
                        width: 1px;
                        height:330px;
                        background:rgba(1,218,226,1);
                    }
                    &:last-child{
                        &:after{
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