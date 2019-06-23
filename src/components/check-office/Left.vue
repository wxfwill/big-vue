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
            <granular-bar
                    name="发文分析"
                    :chartData="publishingStatistics"></granular-bar>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">发文缓急分布</h2>
            <pie-group
                    name="发文缓急分布"
                    :pieConfigList="postPriorities"
            ></pie-group>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">收文分析</h2>
            <granular-bar
                    name="收文分析"
                    :chartData="receivingStatistics"></granular-bar>
        </div>
        <jeremy-levin-unit
            :jeremyLevinUnitList="jeremyLevinUnitList"
        ></jeremy-levin-unit>
        <div class="chart-box">
            <h2 class="chart-title white-text">呈批文件分析</h2>
            <granular-bar
                    name="呈批文件分析"
                    :chartData="submitApprovalStatistics"></granular-bar>
        </div>
        <div class="chart-box">
            <h2 class="chart-title white-text">呈批文件缓急分布</h2>
            <pie-group
                    name="呈批文件缓急分布"
                    :pieConfigList="submitApprovalPriorities"
            ></pie-group>
        </div>
    </div>
</template>
<script>
	import GranularBar     from './granular-bar';
	import PieGroup        from './pie-group';
	import JeremyLevinUnit from './jeremy-levin-unit';

	export default {
		mounted() {
		},
		data() {
			return {
				cursorImg: require('@/public/img/check-office/cursor.png'),
			}
		},
		methods   : {},
		props     : [
			'publishingStatistics',
			'postPriorities',
			'receivingStatistics',
			'jeremyLevinUnitList',
			'submitApprovalStatistics',
			'submitApprovalPriorities'
		],
		components: {
			GranularBar,
			PieGroup,
			JeremyLevinUnit,
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
    }
</style>