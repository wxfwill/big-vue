<template>
    <ul class="pie-list">
        <li v-for="(pieConfig, index) in pieConfigList" :key="index">
            <pie-chart
                    :type="type"
                    :text='pieConfig.name'
                    :percent="pieConfig.percent"
                    :strokeColor="pieConfig.strokeColor"
                    :tintColor="pieConfig.tintColor"
                    :circleMaxNumber="maxValue"
                    :width="size"
                    :height="size"
            ></pie-chart>
        </li>
    </ul>
</template>

<script>
	import PieChart from './pie-chart';

	export default {
		data() {
			return {}
		},
		methods   : {},
		components: {
			PieChart
		},
		props     : {
			pieConfigList: {},
			maxValue     : {
				default: 100,
			},
			type         : {
				default: 'ratio'
			},
			size         : {
				default : 110,
            }
		},
	}
</script>

<style lang="scss" scoped>
    .pie-list {
        width: 100%;
        margin-top: 47px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        li {
            line-height: 30px;
        }
    }
</style>