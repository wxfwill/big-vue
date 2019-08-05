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
	import { getTeamManagement,getIncumbency,getWorkingLife,getEducationSituation,getPersonnelStatusQuoList,getPersonnelEducation,getAgeDistribution,getPersonnelCategory}            from './service/index';
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
		},
		methods   : {
			// async requestTeamData() {
			// 	let res = await getTeamManagement({
			// 		pindex: this.pindex,
			// 		lev   : this.lev
			// 	});
			// 	if(res.code === 200) {
			// 		const data                  = res.data;
			// 		const qgzzrs                = fillZero(data.incumbency.qgzzrs, 5).split(''),
			// 			  { leftBox, rightBox } = this.$refs;
			// 		this.incumbency             = {
			// 			...data.incumbency,
			// 			qgzzrs,
			// 		};
			// 		//工作年限统计
			// 		data.workingLife.maxValue = Math.max(...Object.values(data.workingLife));
			// 		this.workingLife          = data.workingLife;
			// 		leftBox.loadEducationChart(data.educationSituation);
			// 		//个检查机关人员现状
			// 		this.personnelStatusQuos = data.personnelStatusQuos;
			// 		leftBox.loadpersonnelStatusQuosChart(data.personnelStatusQuos);
			// 		//最上方的
			// 		this.personnelCategory = {
			// 			jcgzl : fillZero(data.personnelCategory.jcgzl, 4).split(''),
			// 			sfxzry: fillZero(data.personnelCategory.sfxzry, 4).split(''),
			// 			yenjcg: fillZero(data.personnelCategory.yenjcg, 4).split('')
			// 		};
			// 		//人员学历结构
			// 		this.personnelEducation = data.personnelEducation;
			// 		rightBox.loadEduBgStrChart(data.personnelEducation);
			// 		//年龄分布
			// 		this.ageDistribution = data.ageDistribution;
			// 		rightBox.loadAgeDistributeChart(data.ageDistribution);
			// 	} else {
			// 		this.$message.error(res.msg);
			// 	}
			// },
			async getIncumbency(){//全国在职人数
				let res = await getIncumbency({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const qgzzrs                = fillZero(data.qgzzrs, 5).split('');
					this.incumbency             = {
						...data,
						qgzzrs,
					};
				}else {
					this.$message.error(res.msg);
				}
			},
			async getEducationSituation(){//教育情况
				let res = await getEducationSituation({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					leftBox.loadEducationChart(data);
				}else {
					this.$message.error(res.msg);
				}
			},
			async getWorkingLife(){//工作年限统计
				let res = await getWorkingLife({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					data.maxValue = Math.max(...Object.values(data));
					this.workingLife          = data;
				}else {
					this.$message.error(res.msg);
				}
			},
			async getPersonnelStatusQuoList(){//检察机关人员现状
				let res = await getPersonnelStatusQuoList({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					this.personnelStatusQuos = data;
					leftBox.loadpersonnelStatusQuosChart(data);
				}else {
					this.$message.error(res.msg);
				}
			},
			async getPersonnelEducation(){//人员学历结构
				let res = await getPersonnelEducation({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					this.personnelEducation = data;
					rightBox.loadEduBgStrChart(data);
				}else {
					this.$message.error(res.msg);
				}
			},
			async getAgeDistribution(){//年龄分布
				let res = await getAgeDistribution({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					const { leftBox, rightBox } = this.$refs;
					this.ageDistribution = data;
					rightBox.loadAgeDistributeChart(data);
				}else {
					this.$message.error(res.msg);
				}
			},
			async getPersonnelCategory(){//年龄分布
				let res = await getPersonnelCategory({
					pindex: this.pindex,
					lev   : this.lev
				});
				if(res.code === 200) {
					const data                  = res.data;
					//最上方的
					this.personnelCategory = {
						jcgzl : fillZero(data.jcgzl, 4).split(''),
						sfxzry: fillZero(data.sfxzry, 4).split(''),
						yenjcg: fillZero(data.yenjcg, 4).split('')
					};
				}else {
					this.$message.error(res.msg);
				}
			},
            changeMapState({ pindex, lev }){
				this.pindex = pindex;
				this.lev = lev;
				// this.requestTeamData();
				this.getIncumbency();
				this.getEducationSituation();
				this.getWorkingLife();
				this.getPersonnelStatusQuoList();
				this.getPersonnelEducation();
				this.getAgeDistribution();  
				this.getPersonnelCategory();          
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
