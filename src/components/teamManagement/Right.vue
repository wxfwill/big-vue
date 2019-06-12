<template>
    <div class="team-right-container">
        <div class="staff-detail-info">
            <div class="staff-search-box" :style="{backgroundImage: `url(${staffPerformanceBg})`}">
                <h1 class="title">人员绩效</h1>
                <div class="search-form">
                    <city-selector></city-selector>
                    <div class="search-group">
                        <input type="text" class="search-input">
                        <button type="button" class="search-btn">搜索</button>
                    </div>
                </div>
            </div>
            <div class="structure-box" :style="{backgroundImage: `url(${staffEduStrBg})`}">
                <h1 class="img-title">人员学历结构</h1>
                <div class="chart-box">
                    <canvas ref="eduBgStrChart" width="670" height="204px"></canvas>
                </div>
            </div>
            <div class="age-distribution-box" :style="{backgroundImage: `url(${ageDistributionBg})`}">
                <h2 class="img-title">年龄分布</h2>
                <div class="chart-box">
                    <canvas ref="ageDistributeChart" width="670px" height="245"></canvas>
                </div>
            </div>
        </div>
        <div class="performance-detail-box white-text">
            <h1 class="title text-left">人员绩效</h1>
            <div class="staff-portrayal">
                <div class="info-box top-block" :style="{backgroundImage: `url(${topBorderBg})`}">
                    <h3 class="detail-title white-text">检察官</h3>
                    <p>工作年限：2年</p>
                    <p>职务：偷税漏税打击贪污惩恶扬善等等员额检察官</p>
                    <p>地区：北京朝阳222222222222222222222222区</p>
                </div>
                <div class="info-box left-side-1" :style="{backgroundImage: `url(${sideBorderBg})`}">
                    <h3 class="detail-title">司法办案</h3>
                    <p>办结案件：232件</p>
                    <p>在办案件：23件</p>
                </div>
                <div class="info-box left-side-2" :style="{backgroundImage: `url(${sideBorderBg})`}">
                    <h3 class="detail-title">队伍管理</h3>
                    <p>年度考核：A</p>
                </div>
                <div class="info-box right-side-1" :style="{backgroundImage: `url(${sideBorderBg})`}">
                    <h3 class="detail-title">检查办公</h3>
                    <p>办文数量：23</p>
                </div>
                <div class="info-box right-side-2" :style="{backgroundImage: `url(${sideBorderBg})`}">
                    <h3 class="detail-title">检务保障</h3>
                    <p>使用经费：125.6元</p>
                </div>
                <div class="staff-img">
                    <img :src="staffImg" alt="...">
                </div>
                <div class="shade-img">
                    <img :src="shadeBg" alt="...">
                </div>
            </div>
            <div class="bottom-stage" :style="{backgroundImage: `url(${bottomStageBg})`}"></div>
        </div>
    </div>
</template>
<script>
    import EChart from 'echarts';
    import CitySelector from './city-selector';

	export default {
		mounted(){
            this.loadEduBgStrChart();
            this.loadAgeDistributeChart();
        },
		data() {
			return {
				staffPerformanceBg: require('@/public/img/teamManagement/staffPerformanceBg.png'),
				staffEduStrBg     : require('@/public/img/teamManagement/staffEduStrBg.png'),
				ageDistributionBg : require('@/public/img/teamManagement/ageDistributionBg.png'),
				bottomStageBg     : require('@/public/img/teamManagement/bottomStageBg.png'),
				shadeBg           : require('@/public/img/teamManagement/shadeBg.png'),
				staffImg          : require('@/public/img/teamManagement/staff.png'),
				topBorderBg       : require('@/public/img/teamManagement/topBorderBg.png'),
				sideBorderBg      : require('@/public/img/teamManagement/sideBorderBg.png'),
			}
		},
        methods: {
            loadEduBgStrChart(){
                const myChart = EChart.init(this.$refs.eduBgStrChart);

            },
            loadAgeDistributeChart(){
				const myChart = EChart.init(this.$refs.ageDistributeChart);
                myChart.setOption({

                })
			}
        },
        components : {
			CitySelector,
        }
	}
</script>
<style lang="scss" scoped>
    @mixin bgSizeFull {
        background-size: 100% 100%;
    }

    .team-right-container {
        display: flex;
        margin-top: 13px;
        .staff-detail-info {
            margin-right: 35px;
            width: 671px;
            .img-title{
                padding-top: 6px;
                color: #fff;
                text-align: center;
            }
            .staff-search-box {
                margin: 0 -10px 20px -10px;
                height: 272px;
                @include bgSizeFull;
                .search-form{
                    width: 475px;
                    margin: 0 auto;
                    .search-group{
                        width: 470px;
                        margin: 46px auto 0;
                        display: flex;
                        .search-input{
                            width: 380px;
                            height: 50px;
                            color: #ffffff;
                            background-color: #0767D1;
                            border: 1px solid rgba(0,255,255,1);
                            outline: none;
                            font-size: 20px;
                        }
                        .search-btn{
                            width: 90px;
                            height: 50px;
                            background:linear-gradient(90deg,rgba(7,103,209,1) 0%,rgba(7,103,209,1) 100%);
                            border:1px solid rgba(0,255,255,1);
                            color: #ffffff;
                            outline: none;
                        }
                    }

                }
            }
            .structure-box {
                height: 285px;
                margin-bottom: 20px;
                @include bgSizeFull;
            }
            .age-distribution-box {
                height: 315px;
                @include bgSizeFull;
            }
        }
        .performance-detail-box {
            position: relative;
            width: 1216px;
            height: 907px;
            padding: 0 48px 21px;
            background: rgba(10, 103, 209, 0.2);
            border-radius: 8px;
            border: 1px solid rgba(1, 218, 226, 1);
            .title {
                padding-left: 0;
            }
            .staff-portrayal {
                height: 727px;
                .info-box {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    text-align: center;
                    @include bgSizeFull;
                    .detail-title {
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #00FFFF;
                    }
                    p {
                        width: 220px;
                        margin: 0 auto;
                        font-size: 16px;
                        line-height: 30px;
                        word-break: break-all;
                    }
                    &.top-block {
                        top: 10px;
                        left: 440px;
                        width: 320px;
                        height: 320px;
                    }
                    &.left-side-1 {
                        position: absolute;
                        top: 274px;
                        left: 71px;
                        width: 275px;
                        height: 152px;
                        text-align: center;
                    }
                    &.left-side-2{
                        bottom: 219px;
                        left: 82px;
                        width: 254px;
                        height: 131px;

                    }
                    &.right-side-1{
                        top: 274px;
                        right: 47px;
                        width: 275px;
                        height: 152px;
                    }
                    &.right-side-2{
                        bottom: 219px;
                        right: 58px;
                        width: 254px;
                        height: 131px;
                    }

                }
                .staff-img {
                    position: absolute;
                    top: 345px;
                    left: 520px;
                    width: 330px;
                    height: 466px;
                    z-index: 2;
                    img {
                        width: 100%;
                    }
                }
                .shade-img {
                    position: absolute;
                    bottom: 35px;
                    left: 47%;
                    width: 895px;
                    height: 440px;
                    transform: translate(-50%, 0);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .bottom-stage {
                height: 50px;
                @include bgSizeFull;
            }
        }
    }
</style>