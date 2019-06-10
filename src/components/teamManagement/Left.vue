<template>
    <div>
        <div class="in-job-box" :style="{inJobBg}">
            <h1 class="team-title">全国在职人数</h1>
            <div class="num-container">
                <ul class="digital-block">
                    <li v-for="item in inJob">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="age-limit-box">
            <h1 class="team-title">工作年限统计</h1>
            <div class="age-limit-charts">

            </div>
        </div>
        <div class="education-case">
            <h1 class="title text-left">教育情况</h1>
            <div class="education-chart-box">

            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				inJobBg: { backgroundImage: require('@/public/img/teamManagement/inJobBg.png') },
				inJob  : [0, 0, 0, 0, 0],

			}
		}
	}
</script>

<style>
    .people-num-box {

    }
</style>