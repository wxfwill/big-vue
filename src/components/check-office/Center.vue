<template>
    <div class="co-center-container">
        <h1 class="title white-text text-center">发文收文密集分布</h1>
        <div class="cursor-img">
            <img :src="cursorImg" alt="...">
        </div>
        <div ref="closeSetChart" :style="{ width: '620px', height: '800px' }"></div>
    </div>
</template>

<script>
	import EChart from 'echarts';

	export default {
		mounted() {
			this.loadCloseSetChart();
		},
		data() {
			return {
				cursorImg: require('@/public/img/check-office/cursor.png'),
			}
		},
		methods: {
			loadCloseSetChart() {
				const myChart = EChart.init(this.$refs.closeSetChart);
				myChart.setOption({
					color : ['#25E484', '#FF9D2A', '#17C0FF'],
                    tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
                    },
					legend: {
						data     : ['收文', '发文', '呈批件'],
						bottom   : '20',
						itemGap  : 38,
						textStyle: {
							color   : '#fff',
							fontSize: 14
						}
					},
					grid  : {
						width : '80%',
						height: '80%',
						left  : '25%'
					},
					xAxis : {
						show: false
					},
					yAxis : {
						type     : 'category',
						data     : ['其他', '内部', '无', '机密', '秘密'],
						axisLine : {
							show: false
						},
						axisTick : {
							show: false
						},
						axisLabel: {
							color   : '#fff',
							align   : 'right',
							padding : [0, 30, 0, 0],
							fontSize: 18
						},
					},
					series: [
						{
							name    : '收文',
							type    : 'bar',
							barGap  : 0,
							barWidth: 24,
							label   : {
								show    : true,
								color   : '#fff',
								position: 'right'
							},
							data    : [35, 18, 21, 22, 33]
						}, {
							name    : '发文',
							type    : 'bar',
							barGap  : 0,
							barWidth: 24,
							label   : {
								show    : true,
								color   : '#fff',
								position: 'right'

							},
							data    : [56, 72, 31, 31, 33]
						}, {
							name    : '呈批件',
							type    : 'bar',
							barGap  : 0,
							barWidth: 24,
							label   : {
								show    : true,
								color   : '#fff',
								position: 'right'

							},
							data    : [35, 41, 22, 22, 33]
						}
					]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    .co-center-container {
        width: 753px;
        height: 909px;
        margin: 0 20px;
        background: rgba(10, 103, 209, 0.2);
        border: 1px solid rgba(1, 218, 226, 1);
        .title {
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            margin-top: 19px;
        }
    }
</style>