<template>
    <div class="outer-home-page">
        <left></left>
        <center-box
            :personnelStatusQuos="teamManagement.personnelStatusQuos || []"
        ></center-box>
        <right></right>
    </div>
</template>

<script>
	import Left                  from '@/components/teamManagement/Left.vue';
	import CenterBox             from '@/components/teamManagement/Center.vue';
	import Right                 from '@/components/teamManagement/Right.vue';
	import { getTeamManagement } from '@/fetch/http';

	export default {
		mounted() {
			getTeamManagement({
				code     : 100000,
				lev      : 1,
				enddate  : "2019-04-26",
				startdate: "2019-01-01"
			}).then((resolve, reject) => {
                if(resolve.code === 200) {
                    this.teamManagement = resolve.data;
                } else {
					this.$message.error('队伍信息加载失败');
                }
			});
		},
		data() {
			return {
                teamManagement : {}
            }
		},
		method    : {},
		components: {
			Left,
			CenterBox,
			Right
		}
	}
</script>

<style lang="scss">
    .outer-home-page{
        display: flex;
        padding-top: 50px;
        .title {
            padding: 27px 20px 31px;
            font-size: 24px;
            color: #ffffff;
            text-align: center;
        }
        .white-text {
            color: #ffffff !important;
        }
        .text-center{
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
    }
</style>
