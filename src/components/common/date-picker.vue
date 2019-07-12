<template>
    <div class="dateBox">
        <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="请选择开始日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptionsStart"
            >
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="请选择结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptionsEnd"
            >
            </el-date-picker>
        </div>
        <div class="search-btn" @click="handleSearch">查询</div>
    </div>
</template>

<script>
    import { fillZero } from "@/utlis/helper";

	export default {
		created() {
			this.handleSearch();
		},
		data() {
			return {
				startDate: `${this.getNowYear()}-01-01`,
				endDate  : this.getNowDate(),
			}
		},
		computed: {
			pickerOptionsStart() {
				return {
					disabledDate: time => {
						let endDateVal = this.endDate;
						if(endDateVal) {
							return time.getTime() > new Date(endDateVal).getTime();
						}
					}
				}
			},
			pickerOptionsEnd() {
				return {
					disabledDate: time => {
						let beginDateVal = this.startDate;
						if(beginDateVal) {
							return (
								time.getTime() < new Date(beginDateVal).getTime() - 24 * 60 * 60 * 1000
							);
						}
					}
				}
			},
		},
		methods : {
			handleSearch() {
				if(!this.startDate || !this.endDate) {
					this.$message.warning('时间不能为空');
					return false;
                }
				this.dateChange({
					startDate: this.startDate,
					endDate  : this.endDate,
				});
			},
			getNowYear() {
				return new Date().getFullYear();
			},
			getNowDate() {
				const date = new Date();
				return `${date.getFullYear()}-${fillZero(date.getMonth() + 1, 2)}-${fillZero(date.getDate(), 2)}`;
			},
		},
		props   : ['dateChange'],
	}
</script>

<style lang="scss" scoped>
    .dateBox {
        position: absolute;
        right: 0;
        top: -70px;
        z-index: 1;
        .block {
            display: inline-block;
            margin-right: 6px;
            position: relative;
            /deep/ .el-input__inner {
                padding-left: 15px;
                text-align: center;
                color: rgba(255, 255, 255, 1);
                border-color: rgba(15, 175, 211, 1);
                background: transparent;
            }
            /deep/ .el-date-editor {
                /deep/ .el-input__prefix {
                    top: 2px;
                    left: 215px;
                    color: rgba(15, 175, 211, 1);
                }
                width: 246px;
            }
            ::-webkit-input-placeholder { /* WebKit browsers */
                color: rgba(15, 175, 211, 1);
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: rgba(15, 175, 211, 1);
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: rgba(15, 175, 211, 1);
            }
            :-ms-input-placeholder { /* Internet Explorer 10+ */
                color: rgba(15, 175, 211, 1);
            }
        }
        .search-btn {
            display: inline-block;
            width: 81px;
            height: 34px;
            font-size: 14px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 34px;
            background: rgba(51, 209, 248, 1);
            cursor: pointer;
        }
    }
</style>