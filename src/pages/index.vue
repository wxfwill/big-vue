<template>
    <div class="bg_img home-page" :style="{ backgroundImage: `url(${bjBg})` }">
        <div class="popupBox" v-show="popupShow">
            <div class="backColor">
                <span class="popupClose" @click="closeHandle">X</span>
                <div id="dataBox" :style="{width: '2350px', height: '330px'}"></div>
            </div>
        </div>
        <div class="bg_img bjt">最高人民检察院大数据决策支持平台</div>
        <ul class="ul-title">
            <li class="bg_img" v-for="(item,index) in list" :key="index"
                :style="{backgroundImage:'url('+(index==now?buttonColorImg: buttonImg)+')'}" @click="Handle(item,index)"
            >{{item}}
            </li>
        </ul>
        <div class="time-box">
            <date-time></date-time>
        </div>
        <!-- 日期选择 -->
        <router-view ref="sfba"></router-view>
    </div>
</template>

<script>
	import * as types     from '../vuex/types.js'
	import { mapGetters } from 'vuex'
	import DateTime       from '@/components/DateTime.vue'

	export default {
		name      : 'home',
		data() {
			return {
				now           : 0,
				list          : ['首页', '司法办案', '队伍管理', '检察办公', '检务保障'],
				buttonImg     : require('@/public/img/home/home_08.png'),
				bjBg          : require('@/public/img/home/bj.png'),
				buttonColorImg: require('@/public/img/home/home_07.png'),
				clock         : null,
				week          : null,
			}
		},
		computed  : {
			...mapGetters(['popupShow'])
		},
		watch     : {
			popupShow(val) {
				this.dataBoxHandle()//全国数据
			}
		},
		created() {
			if(!JSON.parse(sessionStorage.getItem('module'))) {
				sessionStorage.setItem('module', JSON.stringify(0))
			}
			this.now = JSON.parse(sessionStorage.getItem('module'))
		},
		methods   : {
			closeHandle() {
				this.$store.commit(types.POPUPSHOW, false)
			},
			dataBoxHandle() {
				var dataBox = this.$echarts.init(document.getElementById("dataBox"));
				var option  = {
					title  : {
						text     : '全国各省份数据统计表',
						left     : 'center',
						textStyle: {
							color     : '#ffffff',
							fontSize  : '36',
							fontWeight: 400
						}
					},
					tooltip: {
						trigger    : 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend : {
						textStyle: {
							color: '#ffffff'
						},
						data     : ['包租费', '装修费', '保洁费'],
						align    : 'left',
						right    : 100,//柱状图移动
						top      : '0%'
					},
					grid   : {
						left        : '3%',
						right       : '4%',
						bottom      : '3%',
						containLabel: true
					},
					xAxis  : [{
						type      : 'category',
						data      : [
							'北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
							'上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
							'湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
							'云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
						],
						"axisTick": {       //x轴刻度线
							"show": false
						},
						axisLabel : {
							interval   : 0,
							show       : true,
							splitNumber: 150,
							textStyle  : {
								fontSize: 21,
								color   : 'rgba(0,255,255,1)'
							},

						},
					}],
					yAxis  : [{
						type      : 'value',
						name      : '',
						axisLabel : {
							formatter: '{value}',
							textStyle: {
								fontSize: 21,
								color   : 'rgba(0,255,255,1)'
							},

						},
						"axisTick": {       //x轴刻度线
							"show": false
						},
						splitLine : {
							show     : true,
							lineStyle: {
								color: ['rgba(216,216,216,0.4)'],
								width: 1,
								type : 'solid'
							}
						},
					}],
					series : [{
						name     : '包租费',
						type     : 'bar',
						barWidth : 10,//柱图宽度
						itemStyle: {
							normal: {
								color: '#12E9E9',
							}
						},
						data     : [
							20, 12, 31, 34, 31, 50, 20, 12, 31, 34, 31, 50,
							20, 12, 31, 34, 31, 50, 20, 12, 31, 34, 31, 50,
							20, 12, 31, 34, 31, 50, 20,
						]
					}, {
						name     : '装修费',
						type     : 'bar',
						barWidth : 10,//柱图宽度
						itemStyle: {
							normal: {
								color: 'rgba(249,178,32,1)',
							}
						},
						data     : [
							10, 20, 5, 9, 3, 45, 10, 20, 5, 9, 3, 45,
							10, 20, 5, 9, 3, 45, 10, 20, 5, 9, 3, 45,
							10, 20, 5, 9, 3, 45
						]
					}, {
						name     : '保洁费',
						type     : 'bar',
						barWidth : 10,//柱图宽度
						itemStyle: {
							normal: {
								color: 'rgba(16,231,126,1)',
							}
						},
						data     : [
							1, 1, 2, 3, 1, 40, 1, 1, 2, 3, 1, 40,
							1, 1, 2, 3, 1, 40, 1, 1, 2, 3, 1, 40,
							1, 1, 2, 3, 1, 40, 3
						]
					}]
				};
				// 绘制图表
				dataBox.setOption(option);
			},
			Handle(item, index) {
				switch(index) {
					case 0:
						this.$router.push('/')
						this.now = 0
						sessionStorage.setItem('module', JSON.stringify(0))
						break
					case 1:
						this.now = 1
						sessionStorage.setItem('module', JSON.stringify(1))
						sessionStorage.setItem('menu', JSON.stringify(0))
						this.$refs.sfba.now = 0
						this.$router.push('/judicial/criminal')
						break
					case 2:
						this.now = 2;
						sessionStorage.setItem('module', JSON.stringify(2));
						this.$router.push('/teamManagement');
						break;
					case 3:
						this.now = 3;
						this.$router.push('/checkOffice');
						sessionStorage.setItem('module', JSON.stringify(3));
						break;
					case 4:
						this.now = 4;
						sessionStorage.setItem('module', JSON.stringify(4));
						break
				}
			}
		},
		components: {
			DateTime
		}
	}
</script>

<style lang="scss" scoped>
    .home-page {
        display: flex;
        justify-content: flex-start;
        padding: 69px 20px 20px 39px;
        background: #143881;
        height: 100%;
        width: 100%;
        // height: 1080px;
        // width:3840px;
        position: relative;
        background-size: 100% 100%;
        .popupBox {
            z-index: 55;
            position: fixed;
            top: 0;
            left: 0;
            width: 3840px;
            height: 1080px;
            background: rgba(0, 0, 0, 0.7);
            .backColor {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2490px;
                height: 520px;
                background-color: #062355;
                border: 1px solid #12E9E9;
                position: relative;
                margin-left: 660px;
                margin-top: 275px;
                .popupClose {
                    text-align: center;
                    line-height: 38px;
                    position: absolute;
                    right: 50px;
                    top: 35px;
                    width: 38px;
                    height: 38px;
                    background: rgba(18, 175, 171, 1);
                    border-radius: 50%;
                    color: #FFFFFF;
                }
            }
        }
        .bjt {
            position: absolute;
            left: 0;
            top: 20px;
            width: 100%;
            height: 68px;
            background-image: url('../public/img/home/header.png');
            font-size: 24px;
            font-family: Helvetica;
            color: rgba(255, 255, 255, 1);
            line-height: 80px;
            text-indent: 46px;
            text-align: center;
        }
        .ul-title {
            position: absolute;
            top: 42px;
            left: 720px;
            li {
                cursor: pointer;
                height: 38px;
                width: 178px;
                display: inline-block;
                margin-right: 80px;
                text-align: center;
                line-height: 45px;
                font-size: 16px;
                font-family: Helvetica;
                color: rgba(255, 255, 255, 1);
            }
            li:nth-child(3) {
                margin-right: 1071px;
            }
        }
        .time-box {
            position: relative;
        }
    }
</style>