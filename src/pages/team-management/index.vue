<template>
    <div class="team-wrap outer-home-page">
        <date-picker
                :dateChange="requestTeamData"
        ></date-picker>
        <left
                ref="leftBox"
                :incumbency="incumbency"
                :workingLife="workingLife"
				:personnelStatusQuos='personnelStatusQuos'
        ></left>
        <center-box
                ref="centerBox"
                :teamManageMaps="teamManageMaps"
                :personnelStatusQuos="personnelStatusQuos"
                :changeRegion="changeRegion"
        ></center-box>
        <right
                ref="rightBox"
                :startDate="startDate"
                :endDate="endDate"
                :personnelEducation="personnelEducation"
                :ageDistribution="ageDistribution"
        ></right>
    </div>
</template>

<script>
	import Left                  from '@/components/team-management/left.vue';
	import CenterBox             from '@/components/team-management/Center.vue';
	import Right                 from '@/components/team-management/Right.vue';
	import { getTeamManagement } from '@/utlis/request';
	import { fillZero }          from '@/utlis/helper';
	import DatePicker            from '@/components/common/date-picker';

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
				startDate          : '',
				endDate            : '',
				code               : 100000,
				lev                : 1,
			}
		},
		methods   : {
			requestTeamData({ startDate, endDate }) {
				this.startDate = startDate;
				this.endDate   = endDate;
				this.loading   = true;

				getTeamManagement({
					code     : this.code,
					lev      : this.lev,
					enddate  : startDate,
					startdate: endDate
				}).then((resolve) => {
					if(resolve.code === 200) {
						const data                             = resolve.data;
						console.log(data)
						const qgzzrs                           = fillZero(data.incumbency.qgzzrs, 5).split(''),
							  { leftBox, centerBox, rightBox } = this.$refs;


						this.incumbency  = {
							...data.incumbency,
							qgzzrs,
						};
						this.workingLife = data.workingLife;
						leftBox.loadEducationChart(data.educationSituation);

						this.personnelStatusQuos = data.personnelStatusQuos;
						leftBox.loadpersonnelStatusQuosChart(data.personnelStatusQuos);

						// this.teamManageMaps = data.teamManageMaps;
						// centerBox.loadteamManageMapsChart(data.teamManageMaps);

						this.personnelEducation=data.personnelEducation
						rightBox.loadEduBgStrChart(data.personnelEducation);

						this.ageDistribution=data.ageDistribution
						rightBox.loadAgeDistributeChart(data.ageDistribution);
					} else {
						this.$message.error(`code:${resolve.code}`);
					}
				});
			},
			changeRegion(code, lev) {
				this.requestTeamData(this.startDate, this.endDate);
				this.code = code;
				this.lev  = lev;
			}
		},
		components: {
			Left,
			CenterBox,
			Right,
			DatePicker,
		}
	}
</script>

<style lang="scss">
    .team-wrap {
        &.outer-home-page {
            display: flex;
            padding-top: 40px;
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
	// .dateBox{
	// 	position: fixed!important;
	// 	right: 33px!important;
	// 	top: 103px!important;
	// 	z-index: 1;
	// }
</style>
