<template>
    <div>
        <div class="judicial-case-title">
            <i class="title-dot"></i>
            刑事
        </div>
        <div class="outer-criminal-page">
            <left-box></left-box>
            <center-box></center-box>
            <right-box></right-box>
        </div>
    </div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import ECharts                    from 'echarts';
	import LeftBox                    from './components/left';
	import CenterBox                  from './components/center';
	import RightBox                   from './components/right';

	export default {
		methods   : {
			...mapActions('judicial', ['setSelectTime']),
			...mapActions('penal', ['initPenalState']),
		},
		destroyed() {
			this.initPenalState();
		},
		components: {
			LeftBox,
			CenterBox,
			RightBox,
		},
	}
</script>
<style lang="scss" scoped>
    .judicial-case-title {
        float: left;
        margin-top: -65px;
        margin-left: 20px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(48, 226, 226, 1);
        line-height: 30px;
        .title-dot {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: rgba(48, 226, 226, 1);
            border-radius: 50%;
            vertical-align: middle;
        }
    }

    .outer-criminal-page {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        .criminal-page-right {
            display: flex;
            width: 1840px;
            height: 100%;
            margin-left: 27px;
            .right-left {
                .top-box {
                    width: 846px;
                    height: 408px;
                    display: flex;
                    position: relative;
                    padding: 68px 0 0 78px;
                    .title {
                        position: absolute;
                        top: 6px;
                        left: 350px;
                        font-size: 16px;
                        color: rgba(255, 255, 255, 1);
                    }
                    ul {
                        width: 130px;
                        height: 313px;
                        border-right: 1px solid blue;
                        li {
                            margin: 0 30px 13px 0;
                            font-size: 14px;
                            color: rgba(0, 255, 255, 1);
                        }
                        li:last-child {
                            margin: 0;
                        }
                    }
                    ol {
                        margin: 0 0 0 38px;
                        li {
                            width: 450px;
                            height: 8px;
                            background: rgba(110, 110, 110, 0.2);
                            border-radius: 4px;
                            margin-bottom: 26px;
                            position: relative;
                            p:nth-child(1) {
                                height: 8px;
                                background: linear-gradient(270deg, rgba(5, 194, 226, 1) 0%, rgba(6, 103, 209, 1) 100%);
                                border-radius: 4px;
                            }
                            p:nth-child(2) {
                                position: absolute;
                                right: -60px;
                                top: -7px;
                                font-size: 14px;
                                color: rgba(83, 210, 211, 1);
                            }
                        }
                    }
                }
                .age-bar {
                    margin: 20px 19px 0 0;
                    width: 414px;
                    height: 233px;
                    margin-right: 19px;
                    .title {
                        font-size: 24px;
                        color: rgba(255, 255, 255, 1);
                        margin: 17px 0 0 107px;
                        position: relative;
                        margin-bottom: 8px;
                        span {
                            position: absolute;
                            right: 25px;
                            bottom: -11px;
                            font-size: 14px;
                            color: rgba(49, 219, 232, 1);
                        }
                    }

                }
                .judgment {
                    margin-top: 20px;
                    width: 412px;
                    height: 233px;
                    .title {
                        margin: 17px 0 0 133px;
                        font-size: 24px;
                        color: rgba(255, 255, 255, 1);
                        position: relative;
                        margin-bottom: 20px;
                        span {
                            position: absolute;
                            right: 25px;
                            bottom: -5px;
                            font-size: 14px;
                            color: rgba(49, 219, 232, 1);
                        }
                    }
                }
            }
            .right-right {
                width: 980px;
                display: flex;
                flex-wrap: wrap;
                padding-top: 5px;
                margin-left: 20px;
                .examineBox {
                    width: 503px;
                    height: 503px;
                    .title {
                        margin: 20px 0 20px 130px;
                        font-size: 24px;
                        color: rgba(255, 255, 255, 1);
                    }
                    ol {
                        margin-top: 24px;
                        li {
                            margin-bottom: 10px;
                            text-align: center;
                            font-size: 18px;
                            color: rgba(255, 255, 255, 1);
                            span:nth-child(1) {
                                font-size: 18px;
                                color: rgba(221, 166, 44, 1);
                            }
                            span:nth-child(2) {
                                font-size: 18px;
                                color: rgba(49, 219, 232, 1);
                            }
                        }
                    }
                }
                .publicBox {
                    padding-top: 20px;
                    margin-left: 23px;
                    width: 441px;
                    height: 501px;
                    .title {
                        text-align: center;
                        font-size: 24px;
                        color: rgba(255, 255, 255, 1);
                    }
                    ul {
                        margin-top: 30px;
                        li {
                            text-align: center;
                            margin-bottom: 15px;
                            font-size: 18px;
                            color: rgba(49, 219, 232, 1);
                            span {
                                font-size: 18px;
                                color: rgba(221, 166, 44, 1);
                            }
                        }
                    }
                }
                .right-right-bottom {
                    display: flex;
                    height: 384px;
                    .capitaBox {
                        width: 478px;
                        height: 384px;
                        p {
                            display: flex;
                            justify-content: space-between;
                            margin: 19px 0 0 19px;
                            font-size: 24px;
                            color: rgba(255, 255, 255, 1);
                            span {
                                font-size: 14px;
                                color: rgba(221, 166, 44, 1);
                                margin-right: 30px;
                            }
                        }
                    }
                    .fileBox {
                        width: 488px;
                        height: 384px;
                        border-left: 1px solid #00FFFF;
                        p {
                            display: flex;
                            justify-content: space-between;
                            margin: 19px 0 0 19px;
                            font-size: 24px;
                            color: rgba(255, 255, 255, 1);
                            span {
                                font-size: 14px;
                                color: rgba(221, 166, 44, 1);
                                margin-right: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
