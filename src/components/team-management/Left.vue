<template>
    <div class="team-left-container">
        <div class="in-job-box" :style="{backgroundImage:`url(${inJobBg})`}">
            <h1 class="title">全国在职人数</h1>
            <div class="in-job-detail">
                <ul class="digital-block">
                    <li class="white-text" v-for="item in inJob">
                        {{ item }}
                    </li>
                </ul>
                <div class="to-leave">
                    <div class="to-block">
                        <p class="white-text"><img :src="jobToIcon" class="to-leave-icon">当年入院</p>
                        <span class="to-num">8</span>
                    </div>
                    <div class="leave-block">
                        <p class="white-text"><img :src="jobOutIcon" class="to-leave-icon">当年离院</p>
                        <span class="leave-num">6</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="work-life-box">
            <h1 class="title">工作年限统计</h1>
            <div class="work-life-charts">
                <pie-chart
                        :text="item.text"
                        :percent="item.percent"
                        :strokeColor="item.strokeColor"
                        :tintColor="item.tintColor"
                        v-for="(item, index) in workLife"
                        :key="index"
                ></pie-chart>
            </div>
        </div>
        <div class="education-situation-box">
            <h1 class="title text-left">教育情况</h1>
            <div class="education-chart-box">
                <div ref="educationChart" :style="{width: '580px', height: '200px'}"></div>
                <canvas  width="580" height="200"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
	import EChart   from 'echarts';
	import PieChart from './pie-chart';

	export default {
		mounted() {
			this.loadEducation();
		},
		data() {
			return {
				inJobBg           : require('@/public/img/team-management/inJobBg.png'),
				jobToIcon         : require('@/public/img/team-management/to.svg'),
				jobOutIcon        : require('@/public/img/team-management/out.svg'),
				inJob             : [0, 1, 2, 3, 0],
				workLife          : [
					{
						text       : '11-15年',
						percent    : 80,
						strokeColor: '#21d8ba',
						tintColor  : '#0b4468'
					}, {
						text       : '5-10年',
						percent    : 62,
						strokeColor: '#24a5dd',
						tintColor  : '#0b3e74'
					}, {
						text       : '5年以下',
						percent    : 42,
						strokeColor: '#8b22d6',
						tintColor  : '#1c2474'
					}, {
						text       : '30年以上',
						percent    : 62,
						strokeColor: '#dda62c',
						tintColor  : '#32374b'
					}, {
						text       : '16-30年',
						percent    : 12,
						strokeColor: '#a4dd28',
						tintColor  : '#0b4468'
					}
				],
				educationSituation: [{
					value: 285,
					name : '培训班'
				}, {
					value: 410,
					name : '其他'
				}, {
					value: 274,
					name : '专题研讨（研究）班'
				}, {
					value: 235,
					name : '理论班'
				}],
			}
		},
		methods   : {
			loadEducation() {
				const myChart = EChart.init(this.$refs.educationChart);
				myChart.setOption({
					tooltip  : { trigger  : 'item' },
					visualMap: {
						show   : false,
						min    : 500,
						max    : 600,
						inRange: {}
					},
					series   : [
						{
							name     : '教育情况',
							type     : 'pie',
							radius   : '80%',
							center   : ['50%', '45%'],
							color    : ['#61e0c1', '#1c98f0', '#33c6f4', '#33d1f8'], //'#FBFE27','rgb(11,228,96)','#FE5050'
							data     : this.educationSituation.sort((a, b) => a.value - b.value),
							roseType : 'radius',
							label    : {
								color : '#fff',
								normal: {
									formatter: '{b|{b}}',
									rich: {
										b: {
											color   : '#fff',
											fontSize: 15,
											height  : 40
										},
									},
								}
							},
							labelLine: {
								normal: {
									lineStyle: {
										color: '#2cb3dc',
									},
									smooth   : 0.2,
									length   : 10,
									length2  : 20,
								}
							},
							itemStyle: {
								normal: {
									shadowColor: 'rgba(0, 0, 0, 0.8)',
									shadowBlur : 50,
								}
							}
						}
					]
				})
			}
		},
		components: {
			PieChart
		}
	}
</script>
<style lang="scss" scoped>
    $boxMarginTop: 20px;

    .team-left-container {
        .in-job-box {
            width: 580px;
            height: 217px;
            background-size: 100% 100%;
            .in-job-detail {
                display: flex;
                justify-content: center;
                .digital-block {
                    max-width: 340px;
                    li {
                        width: 28px;
                        height: 44px;
                        line-height: 44px;
                        text-align: center;
                        float: left;
                        margin: 0 24px 10px 0;
                        font-size: 24px;
                        background-color: #1C6EB7;
                        box-shadow: 1px 1px 0 #cde8f9;
                    }
                }
                .to-leave {
                    display: flex;
                    text-align: center;
                    margin-top: -5px;
                    margin-left: 27px;
                    .to-leave-icon{
                        width: 15px;
                        height: 13px;
                        vertical-align: middle;
                    }
                    .leave-block {
                        margin-left: 14px;
                    }
                    p {
                        font-size: 14px;
                        margin-bottom: 12px;
                    }
                    span {
                        font-size: 24px;
                        &.to-num {
                            color: #dda62c;
                        }
                        &.leave-num {
                            color: #00ffff;
                        }
                    }
                }
            }
        }
        .work-life-box {
            margin-top: $boxMarginTop;
            background-size: 100% 100%;
            width: 580px;
            height: 351px;
            background: rgba(10, 103, 209, 0.2);
            border-radius: 8px;
            border: 1px solid rgba(1, 218, 226, 1);
            .work-life-charts {
                width: 500px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap-reverse;
                justify-content: center;
            }
        }
        .education-situation-box {
            width: 580px;
            height: 315px;
            background: rgba(10, 103, 209, 0.2);
            border-radius: 8px;
            border: 1px solid rgba(1, 218, 226, 1);
            margin-top: $boxMarginTop;
        }
    }
</style>