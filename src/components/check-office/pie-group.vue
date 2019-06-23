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
                    width="110"
                    height="110"
            ></pie-chart>
        </li>
    </ul>
</template>

<script>
	import PieChart from '../team-management/pie-chart';

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
			}
		},
	}
</script>

<style lang="scss" scoped>
    .pie-list {
        margin-top: 47px;
        display: flex;
        justify-content: start;
        li {
            line-height: 30px;
        }
    }
</style>