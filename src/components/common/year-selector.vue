<template>
    <el-select
            v-model="selectYear"
            class="chart-select"
            placeholder="请选择"
            @change="handleChange"
    >
        <el-option
                v-for="item in yearList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
	export default {
		computed: {
			yearList() {
				const nowYear      = new Date().getFullYear(),
					  timeInterval = nowYear - 2010;
				return Array.from({ length: timeInterval }).map((i, index) => ({
					name : `${nowYear - index}年`,
					value: nowYear - index,
				}));
			},
        },
		props: ['selectYear', 'handleChange'],
	}
</script>

<style scoped>

</style>