<template>
    <div class="check-office-wrap outer-home-page">
        <date-time></date-time>
        <left-side
                :publishingStatistics="publishingStatistics"
                :postPriorities="postPriorities"
                :receivingStatistics="receivingStatistics"
                :jeremyLevinUnitList="jeremyLevinUnitList"
                :submitApprovalStatistics="submitApprovalStatistics"
                :submitApprovalPriorities="submitApprovalPriorities"
        ></left-side>
        <center-box></center-box>
        <right-side></right-side>
    </div>
</template>

<script>
	import LeftSide                       from '@/components/check-office/Left';
	import CenterBox                      from '@/components/check-office/Center';
	import RightSide                      from '@/components/check-office/Right';
	import { getProcuratorialOfficeData } from '@/fetch/http';
	import DateTime                       from '@/components/DateTime.vue'

	export default {
		data() {
			return {
				publishingStatistics    : {},
				postPriorities          : {},
				receivingStatistics     : {},
				jeremyLevinUnitList     : [],
				submitApprovalStatistics: {},
				submitApprovalPriorities: {},
			}
		},
		mounted() {
			this.requestCheckOfficeData();
		},
		methods   : {
			requestCheckOfficeData() {
				getProcuratorialOfficeData({
					startdate: '2019-01-01',
					enddate  : '2019-06-18'
				}).then((resolve) => {
					if(resolve.code === 200) {
						const data                    = resolve.data;
						this.publishingStatistics     = data.publishingStatistics;
						this.postPriorities           = data.postPriorities;
						this.receivingStatistics      = data.receivingStatistics;
						this.jeremyLevinUnitList      = data.jeremyLevinUnitList;
						this.submitApprovalStatistics = data.submitApprovalStatistics;
						this.submitApprovalPriorities = data.submitApprovalPriorities;

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
			DateTime
		}
	}
</script>

<style lang="scss">
    .check-office-wrap {
        padding-top: 65px;
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