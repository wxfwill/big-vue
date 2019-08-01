<template>
    <div class="team-wrap">
        <left
                ref="leftBox"
                :incumbency="incumbency"
                :workingLife="workingLife"
        ></left>
        <center-box
                :personnelCategory="personnelCategory"
                :lev="lev"
                :code="pindex"
                :changeMapState="changeMapState"
        ></center-box>
        <right
                ref="rightBox"
                :personnelEducation="personnelEducation"
                :ageDistribution="ageDistribution"
        ></right>
    </div>
</template>

<script>
	import Left                             from './components/left.vue';
	import CenterBox                        from './components/Center.vue';
	import Right                            from './components/Right.vue';
	import { getTeamManagement }            from './service/index';
	import { fillZero, verifyTriggerState } from '@/utlis/helper';

	export default {
		data() {
			return {
				incumbency         : {
					dnly  : '-',
					dnry  : '-',
					qgzzrs: [0, 0, 0, 0, 0],
				},
				workingLife        : {},
				educationSituation : {},
				personnelCategory  : {
					jcgzl : fillZero(0, 4).split(''),
					sfxzry: fillZero(0, 4).split(''),
					yenjcg: fillZero(0, 4).split('')
				},
				personnelStatusQuos: [],
				personnelEducation : {},
				ageDistribution    : {},
				pindex             : '000',
				lev                : 1,
			}
		},
		mounted() {
			this.requestTeamData();
		},
		methods   : {
			async requestTeamData() {
				let res = await getTeamManagement({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const qgzzrs                = fillZero(data.incumbency.qgzzrs, 5).split(''),
						  { leftBox, rightBox } = this.$refs;
					this.incumbency             = {
						...data.incumbency,
						qgzzrs,
					};
					this.workingLife            = data.workingLife;
					leftBox.loadEducationChart(data.educationSituation);

					this.personnelStatusQuos = data.personnelStatusQuos;
					leftBox.loadpersonnelStatusQuosChart(data.personnelStatusQuos);

					this.personnelCategory = {
						jcgzl : fillZero(data.personnelCategory.jcgzl, 4).split(''),
						sfxzry: fillZero(data.personnelCategory.sfxzry, 4).split(''),
						yenjcg: fillZero(data.personnelCategory.yenjcg, 4).split('')
					};

					this.personnelEducation = data.personnelEducation;
					rightBox.loadEduBgStrChart(data.personnelEducation);

					this.ageDistribution = data.ageDistribution;
					rightBox.loadAgeDistributeChart(data.ageDistribution);
				} else {
					this.$message.error(res.msg);
				}
			},
            changeMapState({ pindex, lev }){
				this.pindex = pindex;
				this.lev = lev;
            },
		},
		components: {
			Left,
			CenterBox,
			Right,
		},
	}
</script>

<style lang="scss">
    .team-wrap {
        display: flex;
        position: relative;
        .white-text {
            color: #ffffff !important;
        }
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
        .text-right {
            text-align: right;
        }
    }
</style>
