<template>
    <div class="search-form">
        <div class="select-list">
            <div class="staff-select">
                <el-select
                        v-model="selectProvince"
                        placeholder="请选择省"
                        @change="getCityList"
                >
                    <el-option
                            v-for="item in provinceList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="staff-select">
                <el-select
                        v-model="selectCity"
                        placeholder="请选择市"
                        @change="getCountyList"
                >
                    <el-option
                            v-for="item in cityList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="staff-select">
                <el-select
                        v-model="selectCounty"
                        placeholder="请选择区县"
                        @change="selectCountyChange"
                >
                    <el-option
                            v-for="item in countyList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="search-group">
            <input type="text" class="search-input" v-model.trim="officeName" @keyup.enter="remoteMethod">
            <button type="button" class="search-btn" @click="remoteMethod">搜索</button>
        </div>
        <div class="staff-model">
            <el-dialog
                    title="人员"
                    :visible.sync="staffTableDialog"
                    width="1000"
            >
                <el-table
                        :data="staffList"
                        style="width: 100%"
                >
                    <el-table-column
                            v-for="column in staffColumns"
                            :prop="column.id"
                            :key="column.id"
                            :label="column.label">
                    </el-table-column>
                    <el-table-column
                            prop="option"
                            key="option"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="searchStaffPer(scope.$index, scope.row)">
                                查看绩效
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                <el-button @click="staffTableDialog = false">关闭</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
	import { getAreas, getPersonInfo } from '@/utlis/request';
	import { uuid }                    from '@/utlis/helper';

	export default {
		created() {
			this.getProvinceList();
		},
		data() {
			return {
				selectProvince  : '',
				selectCity      : '',
				selectCounty    : '',
				provinceList    : [],
				cityList        : [],
				countyList      : [],
				officeName      : '',
				staffList       : [],
				staffTableDialog: false,
				lev             : 1,
				staffColumns    : [{
					id   : 'name',
					label: '姓名'
				}, {
					id   : 'sex',
					label: '性别'
				}, {
					id   : 'company',
					label: '单位',
				}, {
					id   : 'job',
					label: '职务'
				}]
			}
		},
		methods: {
			getProvinceList() {
				this.requestList(1, '全国', 'provinceList');
			},
			getCityList(name) {
				this.selectCity   = '';
				this.selectCounty = '';
				this.cityList     = [];
				this.countyList   = [];
				this.lev          = 2;
				this.requestList(2, name, 'cityList');
			},
			getCountyList(name) {
				this.selectCounty = '';
				this.countyList   = [];
				this.lev          = 3;
				this.requestList(3, name, 'countyList');
			},
			selectCountyChange() {
				this.lev = 4;
			},
			requestList(lev, name, observeKey) {
				getAreas({
					lev,
					name
				}).then((resolve) => {
					if(resolve.code === 200) {
						this[observeKey] = resolve.data;
					} else {
						this.$message.error(`code:${resolve.code}`);
					}
				});
			},
			remoteMethod() {
				if(this.officeName !== '') {
					let region;
					switch(this.lev) {
						case 1:
							region = '全国';
							break;
						case 2:
							region = this.selectProvince;
							break;
						case 3:
							region = this.selectCity;
							break;
						case 4:
							region = this.selectCounty;
							break;
                    }
					getPersonInfo({
						lev      : this.lev,
						name     : this.officeName,
						city_name: region,
					}).then((resolve) => {
						this.staffTableDialog = true;
						if(resolve.code === 200) {
							this.staffList = [{
								"company": "北京检",
								"job"    : "监督",
								"name"   : "王晨",
								"region" : "北京",
								"sex"    : "男"
							}, {
								"company": "最高检",
								"job"    : "监督",
								"name"   : "王晨",
								"region" : "北京",
								"sex"    : "男"
							}, {
								"company": "最高检",
								"job"    : "监督",
								"name"   : "王晨",
								"region" : "北京",
								"sex"    : "男"
							}];
						} else {
							this.$message.error(`code:${resolve.code}`);
						}
					});
				} else {
					this.staffList = [];
				}
			},
			searchStaffPer(index, row) {
				this.search({
					name   : row.name,
					company: row.company,
				});
				this.staffTableDialog = false;
			},
		},
		props  : ['search']
	}
</script>

<style lang="scss">
    .search-form {
        width:774px;
        // margin: 0 auto;
        margin-left:29px;
        margin-top:10px;
        display: flex;
        .select-list {
            display: flex;
            .staff-select {
               width:153px;
                height:40px;
                background:rgba(14,132,218,1);
                opacity:0.3607;
                color:#00FFFF;
                margin-right:11px;
                .el-input__inner {
                    width:153px;
                    height:40px;
                    background:rgba(14,132,218,1);
                    color:#00FFFF;
                }
            }
        }
        .search-group {
            width:238px;
            margin-left:10px;
            display: flex;
            .search-input {
                width:182px;
                height:40px;
                background:rgba(14,132,218,1);
                opacity:0.3607;
                color:#00FFFF;
            }
            .search-btn {
               width:91px;
                height:40px;
                background:rgba(14,132,218,1);
                opacity:0.7;
                outline:none;
                margin-left:10px;
                color:#fff;
            }
        }
        .staff-model {
            .el-dialog {
                background-color: #062355;
                box-shadow: 0 0 7px #00FFFF;
                .el-dialog__header {
                    text-align: center;
                    .el-dialog__title {
                        color: #FFFFFF;
                        font-size: 36px;
                    }
                }
                .el-table {
                    background-color: transparent;
                    &:before {
                        height: 0;
                    }
                    tr, th {
                        background-color: transparent;
                        color: #00FFFF;
                        font-size: 18px;
                        border-bottom-color: rgba(0, 255, 255, .3);
                        td {
                            border-bottom-color: rgba(0, 255, 255, .3);
                        }
                    }
                    tr {
                        &:hover, &:active {
                            td {
                                background-color: rgba(27, 64, 145, .3);
                            }
                        }
                    }
                }
            }
        }
    }
</style>