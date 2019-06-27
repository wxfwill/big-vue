<template>
    <div class="home-page-center">
        <div class="sumBox">
            <div class="num-block">
                受理总数：
                <ol>
                    <li v-for="(item,index) in `${sls}`.split('')" :key="index">{{item}}</li>
                </ol>
            </div>
            <div class="num-block">
                办结总数：
                <ol>
                    <li v-for="(item,index) in `${bjs}`.split('')" :key="index">{{item}}</li>
                </ol>
            </div>
            <div class="num-block">
                待办总数：
                <ol>
                    <li v-for="(item, index) in `${zbs}`.split('')" :key="index">{{item}}</li>
                </ol>
            </div>
        </div>
        <div class="center-box">
            <div class="now-data">
                <h4 class="now-data-title">当年数据</h4>
                <p class="nd-accept-text">受理数：{{ sls }}</p>
                <p class="nd-conclude-text">办结数：{{ bjs }}</p>
                <p class="nd-office-text">在办数：{{ zbs }}</p>
            </div>
            <bj-map
                    :tooltipConfig="mapTooltipConfig"
                    :mapData="mapList"
                    :getNewRegionInfo="setMapData"
            ></bj-map>
        </div>
        <span v-show="false">{{ getSelectDateSection }}</span>
        <span v-show="false">{{ getMapCode }}</span>
    </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import * as services              from '@/fetch/http';
	import { verifyTriggerState }     from '@/utlis/helper';
	import { mapTooltipConfig }       from '@/pages/home/chartConfig';
	import BjMap                      from '../common/map';

	export default {
		name      : 'homeCenter',
		data() {
			return {
				sls    : 0,
				bjs    : 0,
				zbs    : 0,
				mapList: [],
				mapTooltipConfig,
			}
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection', 'getMapCode'])
		},
		beforeCreate() {
			this.trigger         = ['startDate', 'endDate', 'code', 'lev'];
			this.oldTriggerState = {};
		},
		mounted() {
			const params         = { ...this.getSelectDateSection, ...this.getMapCode };
			this.oldTriggerState = params;
			this.loadMapData(params);
		},
		updated() {
			const params = { ...this.getSelectDateSection, ...this.getMapCode };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
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
			...mapActions('homePage', ['setMapData']),
		},
		components: {
			BjMap
		},
	}
</script>

<style lang="scss" scoped>
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
                top: 0;
                left: 50px;
                font-weight: bold;
                .now-data-title {
                    margin-bottom: 24px;
                    color: rgba(11, 193, 244, 1);
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
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
            justify-content: center;
            margin-bottom: 15px;
            margin-left: -10px;
            .num-block {
                display: flex;
                margin-right: 10px;
                align-items: center;
                ol {
                    li {
                        width: 32px;
                        height: 43px;
                        line-height: 43px;
                        display: inline-block;
                        border-radius: 4px;
                        font-size: 36px;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        margin-right: 5px;
                        background: linear-gradient(bottom, #0BE5F1, #0C99F7);
                        &:last-of-type {
                            margin-left: 0;
                        }
                    }
                }
            }
        }
    }
</style>