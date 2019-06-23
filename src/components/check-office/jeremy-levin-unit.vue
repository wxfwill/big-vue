<template>
    <div class="chart-box">
        <div class="unit-title">
            <h2 class="chart-title text-left white-text">来文单位</h2>
            <div class="unit-pagination">
                <i class="paging-btn el-icon-arrow-left" @click="previousPage"></i>
                <p class="page-num">{{ pageIndex }}/{{ total }}</p>
                <i class="paging-btn el-icon-arrow-right" @click="nextPage"></i>
            </div>
        </div>
        <div v-for="(unitGroup, index) in jeremyLevinUnitListGroup" v-show="pageIndex === index + 1" :key="index">
            <pie-group
                    :maxValue="unitChartDataMax"
                    :pieConfigList="unitGroup"
                    type="number"
            ></pie-group>
        </div>
    </div>
</template>

<script>
	import PieGroup                     from './pie-group';
	import { jeremyLevinUnitColorList } from '@/pages/check-office/chart-config';

	export default {
		data() {
			return {
				pageIndex       : 1,
				unitChartDataMax: 0,
			}
		},
		computed  : {
			total() {
				return Math.ceil(this.jeremyLevinUnitList.length / 4);
			},
			jeremyLevinUnitListGroup() {
				let maxNum            = 0;
				const colorLen        = jeremyLevinUnitColorList.length,
					unitChartList     = this.jeremyLevinUnitList.map((unit, index) => {
						if(index > colorLen) {
							index = index % colorLen
						}
						if(maxNum < unit.sl) {
							maxNum = unit.sl;
						}
						return {
							name       : unit.lwdw,
							percent    : unit.sl,
							strokeColor: jeremyLevinUnitColorList[index],
						}
					}),
					arr               = [],
					len               = unitChartList.length;
				this.unitChartDataMax = maxNum;
				for(let i = 0; i < len; i += 4) {
					arr.push(unitChartList.slice(i, i + 4))
				}
				return arr;
			},
		},
		methods   : {
			nextPage() {
				this.pageIndex < this.total && this.pageIndex++;
			},
			previousPage() {
				this.pageIndex > 1 && this.pageIndex--;
			}
		},
		props     : ['jeremyLevinUnitList'],
		components: {
			PieGroup
		}
	}
</script>

<style lang="scss" scoped>
    .chart-box {
        .unit-title {
            display: flex;
            justify-content: space-between;
        }
        .unit-pagination {
            display: flex;
            justify-content: space-between;
            width: 120px;
            margin-top: 5px;
            .paging-btn {
                width: 26px;
                height: 26px;
                line-height: 26px;
                font-size: 16px;
                border-radius: 4px;
                background-color: #2bd2fa;
                color: #ffffff;
            }
            .page-num {
                width: 55px;
                height: 26px;
                line-height: 26px;
                background: rgba(43, 210, 250, 1);
                border-radius: 4px;
                color: #ffffff;
            }
        }
    }
</style>