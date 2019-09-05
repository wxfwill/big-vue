<template>
    <div class="outer-home-page">
        <el-select
                size="small"
                class="date-select"
                v-model="nowDate"
                @change="handleSelectDate"
                placeholder="请选择">
            <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <left-box
            ref='leftBox'
            :income=income
            :expenditure=expenditure
            :financialAllocationList=financialAllocationList
            :jingfeiqingkuang=jingfeiqingkuang
            :trendsProcuratorialBusinessList=trendsProcuratorialBusinessList
            :spendingDetail=spendingDetail
            :nowDate="nowDate"
        >
        </left-box>
        <center-box
                ref="centerBox"
                :nationalProvinceRankList=nationalProvinceRankList
                :code="code"
                :lev="lev"
                :psGuaranteeMapList="psGuaranteeMapList"
                :requestPSGuaranteeData="getPSGuaranteeData"
        ></center-box>
        <right-box
            ref='rightBox'
            :assetsSituation=assetsSituation
            :theProcuratorialAgency=theProcuratorialAgency
            :prosecutionPersonnel=prosecutionPersonnel
            :numberOfEmployees=numberOfEmployees
            :financialInstitutions=financialInstitutions
            :inspectionServiceEquipment=inspectionServiceEquipment
            :inspectionServiceEquipmentDetails=inspectionServiceEquipmentDetails
        ></right-box>
    </div>
</template>
<script>
	import DatePicker     from '@/components/common/date-picker';
    import LeftBox        from './components/left';
    import CenterBox        from './components/Center';
    import RightBox        from './components/Right';
    import * as services from './service/index'
    import {caizhengChartConfig,jingfeiqingkuang,trendsProcuratorialBusinessList,sortChartConfig,assetsSituation,theProcuratorialAgency,prosecutionPersonnel
    ,numberOfEmployees,financialInstitutions} from './constant/index'
	export default {
        data(){
            return{
            	lev : 1,
            	code : 203,
                income:{},
                expenditure:{},
                financialAllocationList:[],
                jingfeiqingkuang:{
                    jcywfhj:[],
                    jcywf_qzczbk:[],
                    bajf:[],
                    bajf_qzczbk:[],
                    ywzbjf:[],
                    ywzbjf_qzczbk:[]

                },
                trendsProcuratorialBusinessList:[],
                nationalProvinceRankList:[],
                assetsSituation:{},
                theProcuratorialAgency:{},
                prosecutionPersonnel:{},
                numberOfEmployees:{},
                financialInstitutions:{},
                inspectionServiceEquipment:{},
                inspectionServiceEquipmentDetails:{},
                psGuaranteeMapList:[],
                spendingDetail:{},
				yearList : [{
					value : 2018,
                    label : '2018年'
                }],
				nowDate : 2018
            }
        },
        mounted(){
			window.scrollTo(1200, 0);
        },
		methods: {
			handleSelectDate(){
				this.getPSGuaranteeData({
                    ...this.mapParams,
					date: this.nowDate,
				});
            },
            async getPSGuaranteeData(params) {
				this.mapParams = params;
				const res = await services.getPSGuaranteeData(params);
				if(res.code === 200) {
                    const data   = res.data;
                    const  { leftBox, rightBox } = this.$refs;
                    //收入
                    this.income=data.income
                    leftBox.loadIncomeChart(data.income);
                    //支出
                    this.expenditure=data.expenditure
                    //支出里面的每项的明细
                    this.spendingDetail=data.spendingDetail
                    //财政拨款收入分布
                    this.financialAllocationList=data.financialAllocationList
                    leftBox.loadCaizhengChart(data.financialAllocationList);
                    //经费情况
                    this.jingfeiqingkuang.bajf=data.bajf
                    this.jingfeiqingkuang.bajf_qzczbk=data.bajf_czbk
                    this.jingfeiqingkuang.ywzbjf=data.ywzbjf
                    this.jingfeiqingkuang.ywzbjf_qzczbk=data.ywzbjf_czbk
                    this.jingfeiqingkuang.jcywfhj=data.jcywfhj
                    this.jingfeiqingkuang.jcyw_czbk=data.jcyw_czbk
                    leftBox.loadJingfeiChart();
                    //检察业务费趋势
                    this.trendsProcuratorialBusinessList=data.trendsProcuratorialBusinessList
                    leftBox.loadJianchaChart(data.trendsProcuratorialBusinessList)
                    //全国省份排名（数据还没返回）
                    if(data.nationalProvinceRankList!=null){
                        this.nationalProvinceRankList=data.nationalProvinceRankList
                    }

                    //资产情况
                    this.assetsSituation=data.assetsSituation
                    //检察机关机构机构人员情况
                    if(data.theProcuratorialAgency!=null){
                        this.theProcuratorialAgency=data.theProcuratorialAgency
                    }
                    //机构情况
                    this.prosecutionPersonnel=data.prosecutionPersonnel
                    rightBox.loadagencyChart(data.prosecutionPersonnel);
                    //单位在职人数
                    this.numberOfEmployees=data.numberOfEmployees
                    rightBox.loadjobChart(data.numberOfEmployees)
                    //检查业务装备
                    this.inspectionServiceEquipment=data.inspectionServiceEquipment
                    rightBox.loadserviceChart(data.inspectionServiceEquipment)
                    //检查业务装备详情
                    if(data.inspectionServiceEquipmentDetails!=null){
                        this.inspectionServiceEquipmentDetails=data.inspectionServiceEquipmentDetails
                    }
                    //计财机构及人员情况
                    this.financialInstitutions=data.financialInstitutions;
                    this.psGuaranteeMapList = data.psGuaranteeMapList;
				} else {
					// this.$message.error(res.msg);
				}
			},
        },
		components: {
			DatePicker,
            LeftBox,
            CenterBox,
            RightBox
		},
	}
</script>
<style lang="scss" scoped>
    .outer-home-page{
        position: relative;
        width: 100%;
        .date-select{
            position: absolute;
            top:-65px;
            right: 38px;
            width: 200px;
            /deep/ .el-input--suffix .el-input__inner{
                background-color: transparent;
                color: #fff;
            }
        }
    }
</style>
