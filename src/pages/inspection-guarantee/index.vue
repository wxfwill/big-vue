<template>
    <div class="outer-home-page">
        <left-box 
            :income=income
            :expenditure=expenditure
            :financialAllocationList=financialAllocationList
            :jingfeiqingkuang=jingfeiqingkuang
            :trendsProcuratorialBusinessList=trendsProcuratorialBusinessList
        >
        </left-box>
        <center-box :nationalProvinceRankList=nationalProvinceRankList></center-box>
        <right-box
            :assetsSituation=assetsSituation
            :theProcuratorialAgency=theProcuratorialAgency
            :prosecutionPersonnel=prosecutionPersonnel
            :numberOfEmployees=numberOfEmployees
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
    ,numberOfEmployees} from './constant/index'
	export default {
        data(){
            return{
                income:{
					czbk  : 122,
					sjbz  : 123,
					sysr  : 92,
					jysr  : 222,
					fsdwsj: 321,
					qtsr  : 122,
                },
                expenditure:{
                    zzcs:12345,
                    zzc_tb:1234,
                    zzc_bfb:'23%',
                    gnflzcs:12345,
                    gnflzc_tb:1234,
                    gnflzc_bfb:'24%',
                    zcxzs:12345,
                    zcxz_tb:1234,
                    zcxz_bfb:'25%',
                    zcjjfls:12345,
                    zcjjfl_tb:1234,
                    zcjjfl_bfb:'26%'
                },
                financialAllocationList:caizhengChartConfig,
                jingfeiqingkuang:jingfeiqingkuang,
                trendsProcuratorialBusinessList:trendsProcuratorialBusinessList,
                nationalProvinceRankList:sortChartConfig,
                assetsSituation:assetsSituation,
                theProcuratorialAgency:theProcuratorialAgency,
                prosecutionPersonnel:prosecutionPersonnel,
                numberOfEmployees:numberOfEmployees
            }
        },
        mounted(){
            let params={
                startdate:'',
                enddate:'',
                code:'',
                lev:''
            }
            this.getPSGuaranteeData(params); 
        },
		methods: {
            async getPSGuaranteeData(params) {
				const res = await services.getPSGuaranteeData(params);
				if(res.code === 200) {
                    const data   = res.data;
                    //收入
                    this.income=data.income
                    //支出
                    this.expenditure=data.expenditure
                    //财政拨款收入分布
                    this.financialAllocationList=data.financialAllocationList
                    //经费情况
                    //检察业务费趋势
                    this.trendsProcuratorialBusinessList=data.trendsProcuratorialBusinessList
                    //全国省份排名
                    this.nationalProvinceRankList=data.nationalProvinceRankList
                    //资产情况
                    this.assetsSituation=data.assetsSituation
                    //检察机关机构机构人员情况
                    this.theProcuratorialAgency=data.theProcuratorialAgency
                    //机构情况
                    this.prosecutionPersonnel=data.prosecutionPersonnels
                    //单位在职人数
                    this.numberOfEmployees=data.numberOfEmployees
                    console.log(data)
				} else {
					this.$message.error(res.msg);
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
    }
</style>
