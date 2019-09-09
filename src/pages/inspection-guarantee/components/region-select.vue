<template>
    <div class="JW-city-selector">
        <el-select
                size="small"
                v-model="provinceCode"
                @change="getCityList"
                placeholder="请选择"
                @clear="clearSelector(1)"
                filterable
                clearable>
            <el-option
                    @change="getCountyList"
                    v-for="item in provinceList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
            </el-option>
        </el-select>
        <el-select
                size="small"
                v-model="cityCode"
                @change="getCountyList"
                placeholder="请选择"
                @clear="clearSelector(2)"
                filterable
                clearable>
            <el-option
                    v-for="item in cityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
            </el-option>
        </el-select>
        <el-select
                size="small"
                v-model="countyCode"
                @change="selectCountyChange"
                placeholder="请选择"
                @clear="clearSelector(3)"
                filterable
                clearable>
            <el-option
                    v-for="item in countyList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>

<script>
	import { getAreasList } from "../service/index";

	export default {
		data() {
			return {
				provinceList: [],
				cityList    : [],
				countyList  : [],
				provinceCode: '',
				cityCode    : '',
				countyCode  : '',
				lev         : 1,
			}
		},
		mounted() {
			this.getProvinceList();
		},
		methods: {
			getProvinceList() {
				const params = {
					lev : 1,
					code: '203',
					name: 'china'
				};
				this.selectRegion(params);
				this.resAreasList({
					lev : params.lev,
					code: params.code
				}, 'provinceList');
			},
			getCityList(code) {
				if(!code){
					return false;
                }
				this.cityCode   = '';
				this.countyCode = '';
				this.cityList   = [];
				this.countyList = [];
				this.lev        = 2;
				this.selectRegion({
					lev : this.lev,
					code,
					name: this.provinceList.find(i => i.code === code).name
				});
				this.resAreasList({
					lev: this.lev,
					code
				}, 'cityList');
			},
			getCountyList(code) {
				if(!code){
					return false;
				}
				this.countyCode = '';
				this.countyList = [];
				this.lev        = 3;
				this.selectRegion({
					lev : this.lev,
					code,
					name: this.cityList.find(i => i.code === code).name
				});
				this.resAreasList({
					lev: this.lev,
					code
				}, 'countyList');
			},
			selectCountyChange(code) {
				if(!code){
					return false;
				}
				this.lev = 4;
				this.selectRegion({
					lev : this.lev,
					code,
					name: this.countyList.find(i => i.code === code).name
				});
			},
			async resAreasList(params, observeKey) {
				const res = await getAreasList(params);
				if(res.code === 200) {
					this[observeKey] = res.data;
				} else {
					this.$message.error(res.msg);
				}
			},
			clearSelector(lev) {
				let code = '',
					name = '';
				this.lev = lev;
				switch(lev) {
					case 1 : {
						code              = '203';
						name              = 'china';
						this.cityList     = [];
						this.countyList   = [];
						this.provinceCode = '';
						this.cityCode     = '';
						this.countyCode   = '';
					}
						break;
					case 2 : {
						this.countyList = [];
						this.countyCode = '';
						code            = this.provinceCode;
						name            = this.provinceList.find(i => i.code === code).name;
					}
						break;
					case 3 : {
						code = this.cityCode;
						name = this.cityList.find(i => i.code === code).name;
					}
						break;
				}
				this.selectRegion({
					name,
					code,
					lev
				})
			},
		},
		props  : ['selectRegion']
	}
</script>

<style lang="scss">
    .JW-city-selector {
        position: absolute;
        top: 0;
        .el-select {
            width: 150px;
            .el-input__inner {
                background-color: transparent;
                color: #ffffff;
            }
        }
    }
</style>