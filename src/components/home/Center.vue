<template>
    <div class="home-page-center">
        <div class="sumBox">
            <div class="num-block">
                受理总数：
                <ul>
                    <li v-for="(item,index) in totalSls" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="num-block">
                办结总数：
                <ul>
                    <li v-for="(item,index) in totalBjs" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="num-block">
                在办总数：
                <ul>
                    <li v-for="(item, index) in totalZbs" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="center-box">
            <div class="now-data">
                <h4 class="now-data-title">当年数据 <i class="now-data-icon el-icon-coin" @click="showMapData = true"></i>
                </h4>
                <p class="nd-accept-text">受理数：{{ ~~sls }}</p>
                <p class="nd-conclude-text">办结数：{{ ~~bjs }}</p>
                <p class="nd-office-text">在办数：{{ ~~zbs }}</p>
            </div>
            <bj-map
                    :tooltipConfig="mapTooltipConfig"
                    :mapData="mapList"
                    :getNewRegionInfo="setMapData"
            ></bj-map>
        </div>
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
        <popup v-if="showMapData" :title="dialogTitle" :popupData='mapList'></popup>
    </div>
</template>

<script>
	import ECharts                          from 'echarts';
	import { mapGetters, mapActions }       from 'vuex';
	import * as services                    from '@/fetch/http';
	import { verifyTriggerState, fillZero } from '@/utlis/helper';
	import { mapTooltipConfig }             from '@/pages/home/chartConfig';
	import BjMap                            from '../common/map';
	import Popup                            from '@/components/Popup';

	export default {
		data() {
			return {
				totalSls   : [0, 0, 0, 0],
				totalBjs   : [0, 0, 0, 0],
				totalZbs   : [0, 0, 0, 0],
				sls        : 0,
				bjs        : 0,
				zbs        : 0,
				mapList    : [],
				mapTooltipConfig,
				dialogTitle: '全国数据统计表',
				showMapData: false,
			}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startdate', 'enddate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.loadHeadTotalData(params);
			this.loadMapData(params);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
				this.loadHeadTotalData(params);
				this.loadMapData(params);
			}
		},
		methods   : {
			async loadMapData(params) {
				const res = await services.getMapTopData(params);
				if(res.code === 200) {
					const data   = res.data;
					this.sls     = data.sls;
					this.bjs     = data.bjs;
					this.zbs     = data.zbs;
					this.mapList = data.homePageMapDataList;
				} else {
					this.$message.error(res.msg);
				}
			},
			async loadHeadTotalData(params) {
				const res = await services.getTopSlBjZb(params);
				if(res.code === 200) {
					this.totalSls = `${fillZero(res.data.slzs, 4)}`.split('');
					this.totalBjs = `${fillZero(res.data.bjzs, 4)}`.split('');
					this.totalZbs = `${fillZero(res.data.zbzs, 4)}`.split('');
				} else {
					this.$message.error(res.msg);
				}
			},
			...mapActions('homePage', ['setMapData']),
		},
		components: {
			BjMap,
			Popup,
		},
	}
</script>

<style lang="scss">
    .home-page-center {
        // display:inline-block;
        // flex:0 0 1300px;
        // min-width:1300px;
        height: 1000px;
        width: 1230px;
        padding-top: 30px;
        .center-box {
            position: relative;
            width: 1211px;
            height: 850px;
            .now-data {
                position: absolute;
                top: 20px;
                left: 50px;
                font-weight: bold;
                z-index: 2;
                .now-data-title {
                    margin-bottom: 18px;
                    color: rgba(11, 193, 244, 1);
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    .now-data-icon {
                        display: inline-block;
                        width: 29px;
                        height: 29px;
                        text-align: center;
                        line-height: 29px;
                        margin-left: 42px;
                        background-color: #03a2b8;
                        color: #FFFFFF;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                }
                .nd-accept-text {
                    margin-bottom: 21px;
                    color: #FBBA18;
                }
                .nd-conclude-text {
                    margin-bottom: 21px;
                    color: #0BC1F4;
                }
                .nd-office-text {
                    color: #FF6C40;
                }
            }
        }
        .qstjBox {
            width: 1212px;
            margin-top: 10px;
            padding-top: 30px;
            padding-left: 30px;
            .qstj-label {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                i {
                    margin: 0 0 0 10px;
                    font-size: 24px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 29px;
                }
                .qstj {
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: rgba(0, 178, 226, 1);
                }
            }
        }
        .sumBox {
            display: flex;
            font-size: 18px;
            height: 43px;
            line-height: 43px;
            color: rgba(11, 193, 244, 1);
            align-items: center;
            margin: 20px 0 0 -10px;
            justify-content: center;
            .num-block {
                margin-right: 20px;
                text-align: center;
                ul {
                    position: relative;
                    vertical-align: middle;
                    display: inline-flex;
                    li {
                        position: relative;
                        top: 0;
                        width: 32px;
                        height: 43px;
                        line-height: 43px;
                        display: inline-block;
                        border-radius: 4px;
                        font-size: 36px;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        margin-right: 5px;
                        background: -webkit-gradient(bottom, #0BE5F1, #0C99F7);
                        background: linear-gradient(bottom, #0BE5F1, #0C99F7);
                        cursor: pointer;
                        /*animation: blockShake 1s linear 0s 1 normal forwards;*/
                        transition: top .3s linear;
                        &:last-of-type {
                            margin-left: 0;
                        }
                        &:hover {
                            top : -3px;
                        }

                    }
                }
                @keyframes blockShake {
                    50% {
                        transform: rotateY(-180deg);
                    }
                    100% {
                        transform: rotateY(-360deg);
                    }
                }
            }
        }
    }
</style>