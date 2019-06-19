<template>
    <div class="co-left-container">
        <div class="title-panel white-text">
            <h1 class="text">收文发文</h1>
            <div class="cursor-img">
                <img :src="cursorImg" alt="...">
            </div>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">发文分析</h2>
            <granular-pie :chartData="sendArticleList"></granular-pie>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">发文缓急分布</h2>
            <pie-group
                    :pieConfigList="postDistribute"
            ></pie-group>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">收文分析</h2>
            <granular-pie :chartData="sendArticleList"></granular-pie>
        </div>
        <div class="chart-box">
            <div class="unit-title">
                <h2 class="chart-title white-text">来文单位</h2>
                <div class="unit-pagination">
                    <i class="paging-btn el-icon-arrow-left"></i>
                    <p class="page-num">1/3</p>
                    <i class="paging-btn el-icon-arrow-right"></i>
                </div>
            </div>
            <pie-group
                    :pieConfigList="postDistribute"
            ></pie-group>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">呈批文件分析</h2>
            <granular-pie :chartData="sendArticleList"></granular-pie>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">呈批文件缓急分布</h2>
            <pie-group
                    :pieConfigList="postDistribute"
            ></pie-group>
        </div>
    </div>
</template>
<script>
	import GranularPie from './granular-pie';
	import PieGroup    from './pie-group';

	export default {
		mounted() {},
		data() {
			return {
				cursorImg      : require('@/public/img/check-office/cursor.png'),
				sendArticleList: [100, 302, 138, 100],
				postDistribute : [{
					name       : '特急',
					value      : '37',
					strokeColor: '#18D9E3',
				}, {
					name       : '加急',
					value      : '56',
					strokeColor: '#CDE318',
				}, {
					name       : '其他',
					value      : '43',
					strokeColor: '#18E332',
				}, {
					name       : '无',
					value      : '22',
					strokeColor: '#A818E3',
				}]
			}
		},
		methods   : {},
		props     : ['publishingStatistics', 'postPriorities', 'receivingStatistics', 'jeremyLevinUnitList', 'submitApprovalStatistics', 'submitApprovalPriorities'],
		components: {
			GranularPie,
			PieGroup
		}
	}
</script>
<style lang="scss" scoped>
    .co-left-container {
        width: 1348px;
        display: flex;
        flex-wrap: wrap;
        .title-panel {
            width: 1346px;
            height: 70px;
            padding-top: 20px;
            text-align: center;
            background: rgba(10, 103, 209, 0.2);
            border: 1px solid rgba(1, 218, 226, 1);
            .text {
                font-size: 24px;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
            }
        }
        .chart-box {
            width: 663px;
            height: 263px;
            background: rgba(10, 103, 209, 0.2);
            border: 1px solid rgba(1, 218, 226, 1);
            text-align: center;
            padding: 10px;
            &:nth-of-type(2n) {
                margin-right: 20px;
            }
            .chart-title {
                text-align: left;
                font-size: 18px;
                margin-bottom: 20px;
            }
        }
        .unit-title {
            display: flex;
            justify-content: space-between;
        }
        .unit-pagination {
            display: flex;
            justify-content: space-between;
            width: 120px;
            .paging-btn {
                width: 26px;
                height: 26px;
                line-height: 26px;
                font-size: 16px;
                border-radius: 4px;
                background-color: #2bd2fa;
                color: #ffffff;
            }
            .page-num {
                width: 55px;
                height: 26px;
                line-height: 26px;
                background: rgba(43, 210, 250, 1);
                border-radius: 4px;
                color: #ffffff;
            }
        }
    }
</style>