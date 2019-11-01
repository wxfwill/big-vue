<template>
    <div class="pc-page" :style="{ backgroundImage: `url(${pageBg})` }">
        <div class="pc-header" :style="{ backgroundImage: `url(${headBg})` }">
            <span>最高人民检察院大数据决策支持平台</span>
        </div>
        <div class="option-item">
            <div class="time-name">
                <date-time></date-time>
                检务保障
            </div>
            <year-select
                    :defaultValue="nowDate"
                    :handleSelectDate="handleSelectDate"
            ></year-select>
            <a :href="`#/inspectionGuarantee?${userId}`" class="lot-link">大屏</a>
        </div>
        <div class="container">
            <region-select
                    v-if="areaIndex !== 3"
                :selectRegion="handleSelectMap"
            ></region-select>
            <el-button-group class="container-head">
                <el-button
                        type="primary"
                        icon="el-icon-d-arrow-left"
                        size="small"
                        :disabled="areaIndex <= 1" @click="handleChangeShowArea('sub')">
                </el-button>
                <span class="container-pagnation">{{ areaIndex }} / 3</span>
                <el-button
                        type="primary"
                        icon="el-icon-d-arrow-right"
                        size="small"
                           :disabled="areaIndex >= 3" @click="handleChangeShowArea('add')">
                </el-button>
            </el-button-group>
            <div :class="{ visibility : areaIndex === 1, hidden : areaIndex !== 1 }">
                <left-box
                        ref='leftBox'
                        :income=income
                        :expenditure=expenditure
                        :financialAllocationList=financialAllocationList
                        :jingfeiqingkuang=jingfeiqingkuang
                        :trendsProcuratorialBusinessList=trendsProcuratorialBusinessList
                        :spendingDetail=spendingDetail
                        :nowDate="nowDate"
                        screenType="pc"
                ></left-box>
            </div>
            <div :class="{ visibility : areaIndex === 2, hidden : areaIndex !== 2 }">
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
            <div :class="{ visibility : areaIndex === 3, hidden : areaIndex !== 3 }">
                <general-table
                    screenType="pc"
                    tableHeight="750"
                ></general-table>
            </div>
        </div>
    </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import DateTime      from '@/components/common/DateTime.vue';
	import YearSelect    from '@/components/inspection-guarantee/year-select';
	import LeftBox       from '../components/left';
	import RightBox      from '../components/Right';
	import * as services from '../service/index';
	import RegionSelect  from '../components/region-select';
	import GeneralTable  from '../components/general-table';

	export default {
		data() {
			return {
				pageBg                           : require('@/public/img/pc/pc-bg.png'),
				headBg                           : require('@/public/img/home/header.png'),
				income                           : {},
				expenditure                      : {},
				financialAllocationList          : [],
				jingfeiqingkuang                 : {
					jcywfhj      : [],
					jcywf_qzczbk : [],
					bajf         : [],
					bajf_qzczbk  : [],
					ywzbjf       : [],
					ywzbjf_qzczbk: []

				},
				trendsProcuratorialBusinessList  : [],
				nationalProvinceRankList         : [],
				assetsSituation                  : {},
				theProcuratorialAgency           : {},
				prosecutionPersonnel             : {},
				numberOfEmployees                : {},
				financialInstitutions            : {},
				inspectionServiceEquipment       : {},
				inspectionServiceEquipmentDetails: {},
				psGuaranteeMapList               : [],
				spendingDetail                   : {},
				areaIndex                         : 1
			}
		},
		computed  : {
			...mapGetters('menuModules', ['userId']),
		},
		beforeMount() {
			this.nowDate = 2018;
			this.nowMap = {};
		},
		mounted() {
		},
		methods   : {
			handleSelectDate(year) {
				this.nowDate = year;
				this.getPSGuaranteeData();
			},
			handleSelectMap(params) {
				this.nowMap = params;
				this.getPSGuaranteeData();
			},
			async getPSGuaranteeData() {
				const res = await services.getPSGuaranteeData({
					date: this.nowDate,
					...this.nowMap,
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					//收入
					this.income                 = data.income
					leftBox.loadIncomeChart(data.income);
					//支出
					this.expenditure             = data.expenditure
					//支出里面的每项的明细
					this.spendingDetail          = data.spendingDetail
					//财政拨款收入分布
					this.financialAllocationList = data.financialAllocationList
					leftBox.loadCaizhengChart(data.financialAllocationList);
					//经费情况
					this.jingfeiqingkuang.bajf          = data.bajf
					this.jingfeiqingkuang.bajf_qzczbk   = data.bajf_czbk
					this.jingfeiqingkuang.ywzbjf        = data.ywzbjf
					this.jingfeiqingkuang.ywzbjf_qzczbk = data.ywzbjf_czbk
					this.jingfeiqingkuang.jcywfhj       = data.jcywfhj
					this.jingfeiqingkuang.jcyw_czbk     = data.jcyw_czbk
					leftBox.loadJingfeiChart();
					//检察业务费趋势
					this.trendsProcuratorialBusinessList = data.trendsProcuratorialBusinessList
					leftBox.loadJianchaChart(data.trendsProcuratorialBusinessList)
					//全国省份排名（数据还没返回）
					if(data.nationalProvinceRankList != null) {
						this.nationalProvinceRankList = data.nationalProvinceRankList
					}

					//资产情况
					this.assetsSituation = data.assetsSituation
					//检察机关机构机构人员情况
					if(data.theProcuratorialAgency != null) {
						this.theProcuratorialAgency = data.theProcuratorialAgency
					}
					//机构情况
					this.prosecutionPersonnel = data.prosecutionPersonnel
					rightBox.loadagencyChart(data.prosecutionPersonnel);
					//单位在职人数
					this.numberOfEmployees = data.numberOfEmployees
					rightBox.loadjobChart(data.numberOfEmployees)
					//检查业务装备
					this.inspectionServiceEquipment = data.inspectionServiceEquipment
					rightBox.loadserviceChart(data.inspectionServiceEquipment);
					//检查业务装备详情
					if(data.inspectionServiceEquipmentDetails != null) {
						this.inspectionServiceEquipmentDetails = data.inspectionServiceEquipmentDetails
					}
					//计财机构及人员情况
					rightBox.loadBusAccChart(data.financialInstitutions);
					this.financialInstitutions = data.financialInstitutions;
					this.psGuaranteeMapList    = data.psGuaranteeMapList;
				} else {
					this.$message.error(res.msg);
				}
			},
			handleChangeShowArea(type) {
				 if(type === 'sub' && this.areaIndex > 1){
					 this.areaIndex--;
                 } else if(type === 'add' && this.areaIndex < 3) {
				 	this.areaIndex++;
                 }
			},
		},
		components: {
			DateTime,
			YearSelect,
			LeftBox,
			RightBox,
			RegionSelect,
			GeneralTable,
		}
	}
</script>

<style lang="scss">
    .pc-page {
        position: relative;
        width: 100%;
        min-height: 100vh;
        background-size: 100% 100%;
        color: #fdfdfd;
        .pc-header {
            height: 68px;
            background-position: 50%;
            text-align: center;
            padding-top: 24px;
            font-size: 22px;
            background-repeat: no-repeat;
            span {
                margin-left: 50px;
            }
        }
        .option-item {
            position: relative;
            display: flex;
            justify-content: space-between;
            padding: 0 60px;
            margin-top: -40px;
            .lot-link{
                position: absolute;
                top: 6px;
                color: #fbba18;
                right: 283px;
            }
        }
        .container {
            position: relative;
            width: 90%;
            max-width: 1920px;
            min-width: 1280px;
            margin: 0 auto;
            .filter-option {

            }
            .container-head {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 30px auto;
                .left-text {
                    margin-right: 20px;
                }
                .right-text {
                    margin-left: 20px;
                }
                .active {
                    color: #409eff;
                }
                .container-pagnation{
                    margin: 0 10px;
                }
            }
            .JianWu-left-box {
                width: 100%;
                .pay-box {
                    margin-left: 20px;
                    .pay-content {
                        width: 90%;
                    }
                }
            }
            .jw-right-box {
                .property-box {
                    .unit {
                        right: 40px !important;
                    }
                }
                .procuratorial-work {
                    .unit {
                        right: 40px !important;
                    }
                }
                .propertyContent {
                    ul {
                        width: 87% !important;
                        li {
                            font-size: 14px;
                        }
                    }
                }
                .personnel-top {
                    .agencylist {
                        width: 116px;
                        text-align: center;
                        p:last-of-type {
                            display: inline-block;
                        }
                    }
                }

            }
        }
        .visibility {
            position: relative;
            height: auto;
            visibility: visible;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .hidden {
            position: absolute;
            width: 100%;
            height: 0;
            visibility: hidden;
            overflow: hidden;
        }
    }
</style>