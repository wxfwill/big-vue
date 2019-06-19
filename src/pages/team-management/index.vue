<template>
    <div class="team-wrap outer-home-page">
        <date-time></date-time>
        <left
                ref="leftBox"
                :incumbency="incumbency"
                :workingLife="workingLife"
        ></left>
        <center-box
                ref="centerBox"
                :teamManageMaps="teamManageMaps"
                :personnelStatusQuos="personnelStatusQuos"
        ></center-box>
        <right
                ref="rightBox"
                :personnelEducation="personnelEducation"
                :ageDistribution="ageDistribution"
        ></right>
    </div>
</template>

<script>
	import Left                  from '@/components/team-management/Left.vue';
	import CenterBox             from '@/components/team-management/Center.vue';
	import Right                 from '@/components/team-management/Right.vue';
	import { getTeamManagement } from '@/fetch/http';
	import { fillZero }          from '@/utlis/helper';
	import DateTime              from '@/components/DateTime.vue'

	export default {
		data() {
			return {
				loading            : false,
				incumbency         : {
					dnly  : '-',
					dnry  : '-',
					qgzzrs: [0, 0, 0, 0, 0],
				},
				workingLife        : {},
				educationSituation : {},
				personnelStatusQuos: [],
				personnelEducation : {},
				ageDistribution    : {},
				teamManageMaps     : [],
			}
		},
		mounted() {
			this.requestTeamData();
		},
		methods   : {
			requestTeamData() {
				this.loading = true;
				getTeamManagement({
					code     : 100000,
					lev      : 1,
					enddate  : "2019-06-18",
					startdate: "2019-01-01"
				}).then((resolve) => {
					if(resolve.code === 200) {
						const data                             = resolve.data;
						const qgzzrs                           = fillZero(data.incumbency.qgzzrs, 5).split(''),
							  { leftBox, centerBox, rightBox } = this.$refs;

						this.incumbency  = {
							...data.incumbency,
							qgzzrs,
						};
						this.workingLife = data.workingLife;
						leftBox.loadEducationChart(data.educationSituation);

						this.teamManageMaps = data.teamManageMaps;
						centerBox.loadPersonnelStatusChart(data.personnelStatusQuos);

						rightBox.loadEduBgStrChart(data.personnelEducation);
						rightBox.loadAgeDistributeChart(data.ageDistribution);
					} else {
						this.$message.error(`code:${resolve.code}`);
					}
				});
			}
		},
		components: {
			Left,
			CenterBox,
			Right,
			DateTime
		}
	}
</script>

<style lang="scss">
    .team-wrap {
        &.outer-home-page {
            display: flex;
            padding-top: 65px;
            position: relative;
            .title {
                padding: 27px 20px 31px;
                font-size: 24px;
                color: #ffffff;
                text-align: center;
            }
        }
        .outer-home-page {
            display: flex;
            padding-top: 50px;
            position: relative;
            .title {
                padding: 27px 20px 31px;
                font-size: 24px;
                color: #ffffff;
                text-align: center;
            }
            .white-text {
                color: #ffffff !important;
            }
            .text-center {
                text-align: center;
            }
            .text-left {
                text-align: left;
            }
        }
    }
</style>
