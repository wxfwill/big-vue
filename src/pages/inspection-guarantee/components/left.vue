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
    </div>
</template>

<script>
	import ECharts                               from 'echarts';
	import { mapGetters }                        from 'vuex';
	import * as services                         from '../service/index';
	import { verifyTriggerState, numberInteger } from '@/utlis/helper';
	import { incomeChartConfig }                 from '../constant/index';

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
			this.loadIncomeChart(params);
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
						right   : 10,
						top     : 20,
						bottom  : 20,
						data    : xAxisData,
					},
					series : {
						name     : '收入',
						type     : 'pie',
						radius   : '55%',
						center   : ['40%', '50%'],
						data     : seriesData,
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
		},
		components: {}
	};
</script>

<style lang="scss" scoped>
    .home-page-left {
        display: flex;
        flex-wrap: wrap;
        .income-box {
            width: 466px;
            .income-content {
                width: 80%;
                height: 330px;
                margin: 0 auto;
            }
        }
    }
</style>