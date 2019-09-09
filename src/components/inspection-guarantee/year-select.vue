<template>
    <el-select
            v-model="yearValue"
            size="small"
            class="date-select"
            @change="handleChange"
            placeholder="请选择">
        <el-option
                v-for="item in yearList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
	export default {
		name   : "year-select",
		data() {
			return {
				yearList: [{
					value: 2018,
					label: '2018年'
				}],
				yearValue : this.defaultValue
			}
		},
		methods: {
			handleChange(year){
				this.handleSelectDate(year);
            },
		},
        props: ['defaultValue', 'handleSelectDate']
	}
</script>

<style lang="scss" scoped>
    .date-select {
        width: 200px;
        /deep/ .el-input--suffix .el-input__inner {
            background-color: transparent;
            color: #fff;
        }
    }
</style>