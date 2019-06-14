<template>
    <div class="select-list">
        <div class="staff-select">
            <el-select v-model="selectProvince" placeholder="请选择省">
                <el-option
                        v-for="item in provinceList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="staff-select">
            <el-select v-model="selectProvince" placeholder="请选择市">
                <el-option
                        v-for="item in cityList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="staff-select">
            <el-select v-model="selectProvince" placeholder="请选择区县">
                <el-option
                        v-for="item in countyList"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				selectProvince: '',
				selectCity    : '',
				selectCounty  : '',
				provinceList  : ['北京', '天津', '上海'],
				cityList      : ['北京', '天津', '上海'],
				countyList    : ['朝阳', '海淀', '津南', '西青', '黄浦', '徐汇'],
			}
		}
	}
</script>

<style lang="scss">
    .select-list{
        display: flex;
        .staff-select{
            width: 153px;
            margin-right: 7px;
            .el-input__inner{
                background:rgba(255,255,255, .2);
                color: #00FFFF;
                height: 45px;
            }
        }
    }
</style>