<template>
    <div class="co-center-container">
		<div class="chart-box-title">
			<span class="chart-label-dot"></span>
			<i>发文收文密集分布</i>
		</div>
        <div ref="closeSetChart" :style="{ width: '620px', height: '800px' }"></div>
    </div>
</template>

<script>
	import EChart                           from 'echarts';
	import { securityClassificationConfig } from '@/pages/check-office/chart-config';

	export default {
		mounted() {
			this.myChart = EChart.init(this.$refs.closeSetChart);
		},
		data() {
			return {
				cursorImg: require('@/public/img/check-office/cursor.png'),
			}
		},
		methods: {
			loadCloseSetChart() {
				const securityClassificationFw  = [],
					  securityClassificationSw  = [],
					  securityClassificationCpj = [];
				securityClassificationConfig.forEach(i => {
					securityClassificationFw.push(this.securityClassificationFw[i.id]);
					securityClassificationSw.push(this.securityClassificationSw[i.id]);
					securityClassificationCpj.push(this.securityClassificationCpj[i.id]);

				});
				this.myChart.setOption({
					color  : ['#25E484', '#FF9D2A', '#17C0FF'],
					tooltip: {
						trigger    : 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend : {
						data     : ['收文', '发文', '呈批件'],
						bottom   : '20',
						itemGap  : 38,
						textStyle: {
							color   : '#fff',
							fontSize: 14
						}
					},
					grid   : {
						width : '80%',
						height: '80%',
						left  : '25%'
					},
					xAxis  : {
						show: false
					},
					yAxis  : {
						type     : 'category',
						data     : securityClassificationConfig.map(i => i.name),
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
					series : [
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
							data    : securityClassificationFw
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
							data    : securityClassificationSw
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
							data    : securityClassificationCpj
						}
					]
				})
			}
		},
		props  : ['securityClassificationFw', 'securityClassificationSw', 'securityClassificationCpj'],
		watch  : {
			securityClassificationFw() {
				this.loadCloseSetChart();
			}
		}
	}
</script>

<style lang="scss" scoped>
    .co-center-container {
        width: 753px;
        height: 909px;
        margin: 0 20px;
        .title {
            font-size: 24px;
            color: rgba(255, 255, 255, 1);
            margin-top: 19px;
        }
    }
</style>