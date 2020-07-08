<template>
    <el-table
            class="general-table"
            :data="list"
            style="width: 100%;"
            :height="tableHeight || 600">
        <el-table-column
                fixed
                prop="dw"
                label="单位"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="ncjzhjy"
                label="年初结转和结余"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column align="center" label="其中">
            <el-table-column
                    align="center"
                    prop="ncQzxmzcjzhjy"
                    label="项目支出结转和结余"
                    width="150">
            </el-table-column>
        </el-table-column>
        <el-table-column
                prop="bnsr"
                align="center"
                label="本年收入"
                width="150">
        </el-table-column>
        <el-table-column align="center" label="其中">
            <el-table-column
                    prop="qzczbk"
                    label="财政拨款"
                    align="center"
                    width="150">
            </el-table-column>
        </el-table-column>
        <el-table-column
                align="center"
                prop="bnsrBsnzc"
                label="比上年增长（%）"
                width="150">
        </el-table-column>
        <el-table-column
                prop="bnjfzc"
                label="本年经费支出"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="bnjfzcBsnzc"
                label="比上年增长（%）"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column align="center" label="其中">
            <el-table-column
                    prop="qzczbk"
                    label="财政拨款支出"
                    align="center"
                    width="150">
            </el-table-column>
        </el-table-column>
        <el-table-column
                prop="jyfp"
                label="结余分配"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="nmjzhjy"
                label="年末结转和结余"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column align="center" label="其中">
            <el-table-column
                    prop="ncQzxmzcjzhjy"
                    label="项目支出结转和结余"
                    align="center"
                    width="150">
            </el-table-column>
        </el-table-column>
        <el-table-column
                prop="jgs"
                label="机构数（个）"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="nmzzrs"
                label="年末在职人数（人）"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="rjczbk"
                label="人均财政拨款"
                align="center"
                width="150">
        </el-table-column>
        <el-table-column
                prop="rjjfzc"
                label="人均经费支出"
                align="center"
                width="150">
        </el-table-column>
    </el-table>
</template>

<script>
    import * as services from '../service/index';

	export default {
		data(){
			return {
				list : []
            }
        },
        created(){

        },
		mounted(){
            this.loadTableData();
        },
        methods : {
			async loadTableData(){
				const res = await services.getIncomeAndPayCountList();
				if(res.code === 200){
					this.list = res.data;
                } else {
					this.$message.error(res.msg);
                }
            }
        },
        props:['screenType', "tableHeight"]
	}
</script>

<style lang="scss">
    .general-table{
        background: transparent;
        color: #FFFFFF;
        border-color: #cccccc;
        .el-table__header{
            background-color: transparent;
            thead.is-group {
                color: #FFFFFF;
                th{
                    background-color: transparent;
                    border-color: #cccccc;
                }
            }
        }
        tr{
            background-color: #0b1535;
            &.hover-row>td{
                background-color: rgba(11,21,57, 1);
            }
            td{
                border-color: #cccccc;
            }
        }
        .el-table__empty-text{
            color: #FFFFFF;
            font-size: 20px;
        }
    }
</style>