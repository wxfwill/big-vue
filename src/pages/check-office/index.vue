<template>
    <div class="check-office-wrap fraze-grid">
        <date-picker
                :dateChange="requestCheckOfficeData"
        ></date-picker>
        <left-side
                :publishingStatistics="publishingStatistics"
                :postPriorities="postPriorities"
                :receivingStatistics="receivingStatistics"
                :jeremyLevinUnitList="jeremyLevinUnitList"
                :submitApprovalStatistics="submitApprovalStatistics"
                :submitApprovalPriorities="submitApprovalPriorities"
        ></left-side>
        <center-box
                :securityClassificationSw="securityClassificationSw"
                :securityClassificationFw="securityClassificationFw"
                :securityClassificationCpj="securityClassificationCpj"
        ></center-box>
        <right-side
                :theArchiveAnalysisList="theArchiveAnalysisList"
                :infoPublishList="infoPublishList"
        ></right-side>
    </div>
</template>

<script>
	import LeftSide                                                 from './components/Left';
	import CenterBox                                                from './components/Center';
	import RightSide                                                from './components/Right';
	import { getProcuratorialOfficeData }                           from './services/index';
	import { postDistributeConfig, submitApprovalPrioritiesConfig } from './constant/index';
	import DatePicker                                               from '@/components/common/date-picker';

	export default {
		data() {
			return {
				publishingStatistics    : {},
				postPriorities          : [],
				receivingStatistics     : {},
				jeremyLevinUnitList     : [],
				submitApprovalStatistics: {},
				submitApprovalPriorities: [],

				securityClassificationSw : {},
				securityClassificationFw : {},
				securityClassificationCpj: {},

				theArchiveAnalysisList: [],
				infoPublishList       : []
			}
		},
		methods   : {
			requestCheckOfficeData({startDate, endDate}) {
				getProcuratorialOfficeData({
					startdate: startDate,
					enddate  : endDate
				}).then((resolve) => {
					if(resolve.code === 200) {
						const data = resolve.data;
						// left
						this.publishingStatistics = data.publishingStatistics;
						this.postPriorities       = postDistributeConfig.map(i => ({
							...i,
							value: data.postPriorities[i.id],
						}));

						this.receivingStatistics = data.receivingStatistics;
						this.jeremyLevinUnitList = data.jeremyLevinUnitList;

						this.submitApprovalStatistics = data.submitApprovalStatistics;
						this.submitApprovalPriorities = submitApprovalPrioritiesConfig.map(i => ({
							...i,
							value: data.submitApprovalPriorities[i.id]
						}));

						// center
						this.securityClassificationSw  = data.securityClassificationSw;
						this.securityClassificationFw  = data.securityClassificationFw;
						this.securityClassificationCpj = data.securityClassificationCpj;

						// right
						this.theArchiveAnalysisList = data.theArchiveAnalysisList;
						this.infoPublishList=data.jeremyLevinUnitList
					} else {
						this.$message.error(`code:${resolve.code}`);
					}
				});
			}
		},
		components: {
			LeftSide,
			CenterBox,
			RightSide,
			DatePicker,
		}
	}
</script>

<style lang="scss">
    .check-office-wrap {
        position: relative;
        .cursor-img {
            width: 240px;
            height: 26px;
            margin: -10px auto 0 auto;
            img {
                width: 100%;
            }
        }
    }
</style>