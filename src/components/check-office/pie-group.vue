<template>
    <ul class="pie-list">
        <li v-for="pieConfig in pieConfigList">
            <pie-chart
                :text='pieConfig.name'
                :percent="pieConfig.value"
                :strokeColor="pieConfig.strokeColor"
                :tintColor="pieConfig.tintColor"
                width="110"
                height="110"
            ></pie-chart>
        </li>
    </ul>
</template>

<script>
    import  PieChart from '../teamManagement/pie-chart';

	export default {
		data(){
			return {

            }
        },
        methods: {

        },
        components :{
			PieChart
        },
        props: ['pieConfigList'],
	}
</script>

<style lang="scss" scoped>
    .pie-list{
        margin-top: 47px;
        display: flex;
        justify-content: space-around;
        li{
            line-height: 30px;
        }
    }
</style>