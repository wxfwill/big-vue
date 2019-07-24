<template>
    <div class="outer-procuratorial-page">
        <date-time moduleName="检委办/检察技术"></date-time>
        <div class="procuratorial-page-left">
            <div class="bor_col correlation-box">
                <p class="title">相关办案人员（各省市/人）</p>
                <div :style="{marginLeft:'78px'}">
                <trend-chart :dataIPSxAxis="correlationIPSxAxis" :dataIPS="correlationIPS" ID='correlation'
                 width='930px' height='219px' type='bar' left="30px" right="90px" bottom="10px" :barWidth="43"
                ></trend-chart>
                </div>
            </div>
            <div class="bor_col accept-box">
                <p class="title">受理案件趋势分析</p>
                <div :style="{marginLeft:'78px'}">
                    <span class="bg_img" @click="retreatHandle('accept')" 
                    :style="{backgroundImage:'url('+topImg+')'}" ></span>
                    <span class="bg_img" @click="advanceHandle('accept')" 
                    :style="{backgroundImage:'url('+bottomImg+')'}"></span>
                    <div id="accept" :style="{width:'930px', height:'269px'}"></div>
                </div>
            </div>
            <div class="bor_col case-box">
                <p class="title">案件分类分析</p>
                <div class="classify-box">
                <water-polo v-for="(item,index) in poloList" :key="index" :item="item" :ID="`pol${index}`" width='102px' height='102px'></water-polo>
                </div>
            </div>
        </div>
        <div class="procuratorial-page-center">
            <mapComponent :user="(this.$route.name)" :dataIf='false'></mapComponent>
        </div>
        <div class="procuratorial-page-right">
            <div class="bor_col synthesize-box">
                <p class="title">综合分析</p>
                <div :style="{marginLeft:'78px'}">
                    <span class="bg_img" @click="retreatHandle('synthesize')" 
                    :style="{backgroundImage:'url('+topImg+')'}" ></span>
                    <span class="bg_img" @click="advanceHandle('synthesize')" 
                    :style="{backgroundImage:'url('+bottomImg+')'}"></span>
                    <div id="synthesize" :style="{width:'1105px', height:'400px'}"></div>
                </div>
            </div>
            <div class="bor_col inspect-box">
                <p class="title">检委办</p>
                <div :style="{marginLeft:'78px'}">
                <trend-chart :dataIPSxAxis="inspectIPSxAxis" :dataIPS="inspectIPS" ID='inspect'
                 width='1105px' height='370px' type='bar' left="30px" right="85px" bottom="10px" :barWidth="43"
                ></trend-chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
import trendChart from '@/components/judicial-case/trend-chart.vue'
import waterPolo from '@/components/common/water-polo.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    components:{
        mapComponent,
        Popup,
        DateTime,
        trendChart,
        waterPolo
    },
    data() {
        return {
            poloList:[
                {title:'检验鉴定',num:100,col1:'#22715F',col2:'#4FDC99'},{title:'检验鉴定',num:100,col1:'#005EFF',col2:'#63E8D7'},
                {title:'检验鉴定',num:100,col1:'#FFA11E',col2:'#F3C85D'},{title:'检验鉴定',num:100,col1:'#1EC4FF',col2:'#5DF3DC'},
                {title:'检验鉴定',num:100,col1:'#F35DC4',col2:'#FA3882'}
                ],
            topImg: require('@/public/img/judicature/top@2x.png'),
            bottomImg: require('@/public/img/judicature/bottom@2x.png'),
            correlationIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            correlationIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            acceptIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            acceptIPS:[200, 600, 50, 80, 120, 100,20,19,60,188],
            synthesizeIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            synthesizeIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            inspectIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            inspectIPS:[20, 60, 50, 80, 120, 100,20,19,60,88]
        }
    },
    mounted() {
        this.acceptChart('synthesize',this.synthesizeIPSxAxis,this.synthesizeIPS)//综合分析
        this.acceptChart('accept',this.acceptIPSxAxis,this.acceptIPS)//受理案件趋势分析
    },
    methods: {
        advanceHandle(name){//后一年
        if(name==='accept'){
            this.acceptIPSxAxis.push('2020')
            this.acceptIPSxAxis.splice(0,1);
            this.acceptIPS.push(111)
            this.acceptIPS.splice(0,1)
        }
        if(name==='synthesize'){
            this.synthesizeIPSxAxis.push('2020')
            this.synthesizeIPSxAxis.splice(0,1);
            this.synthesizeIPS.push(111)
            this.synthesizeIPS.splice(0,1)
            console.log(name)
        }
        },
        retreatHandle(name){//前一年
        if(name==='accept'){
            this.acceptIPSxAxis.unshift('2009')
            this.acceptIPSxAxis.splice(this.acceptIPSxAxis.length-1,1);
            this.acceptIPS.unshift(88)
            this.acceptIPS.splice(this.acceptIPS.length-1,1)
            console.log(name)
        }
        if(name==='synthesize'){
            this.synthesizeIPSxAxis.unshift('2009')
            this.synthesizeIPSxAxis.splice(this.synthesizeIPSxAxis.length-1,1);
            this.synthesizeIPS.unshift(88)
            this.synthesizeIPS.splice(this.synthesizeIPS.length-1,1)
            console.log(name)
        }
        },
        acceptChart(id,IPSxAxis,IPS){
            var trendChart = ECharts.init(document.getElementById(id));
            var option = {
                tooltip: {
                    backgroundColor:'#0C99F7',
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
                }
                },
                legend: {
                            right: '15%',
                            bottom:'5%',
                            itemGap:15,
                            data: ['检验鉴定','勘验检查','技术协作','同步录音录像','技术性证据审查'],
                            itemWidth:48,
                            itemHeight:3,
                            textStyle:{
                                color:'#ffffff',
                                fontSize:'14'
                            }
                        },
                color: ["#0080ff", "#4cd5ce"],
                toolbox: {
                    // feature: {
                    //     saveAsImage: {}
                    // }
                },
                grid: {
                    left: '5px',
                    top: '30px',
                    right: '10px',
                    bottom: '50px',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data:IPSxAxis,
                    axisLabel: {
                        show: true,
                        margin:20,
                        textStyle: {
                            show:false,
                            color: 'rgba(255,255,255,1)',
                            fontSize: 12,
                        },
                    },
                    axisTick: {
                            show: true //隐藏X轴刻度
                        },
                    axisLine: {
                        show:true,
                        lineStyle: {
                            color: '#2EA7E0',
                            width:1, //这里是为了突出显示加上的
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisLine: {
                        show:true,
                        onZero: false,
                        lineStyle: {
                            color: '#2EA7E0',
                            width: 1, //这里是为了突出显示加上的
                        }
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    axisLabel: {
                        formatter: function(val) {
                            return val;
                        },
                        show: true,
                        textStyle: {
                            color: 'rgba(255,255,255,1)' //字体颜色
                        }
                    },
                    splitLine: { //保留网格线
                        show: true,
                        lineStyle: { //y轴网格线设置
                            color: 'rgba(233,233,233,0.4)',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                }],
                series: [
                    {
                        name: '检验鉴定',
                        type:"line",
                        smooth:false,//折线是否平滑
                        stack: 100,
                        itemStyle:{
                            normal:{
                                color:'#2FC25B'
                            }
                        },
                        barWidth:43,
                        symbolSize: 5, //折线点的大小
                        data: IPS,
                    },
                    {
                        name: '勘验检查',
                        type:"line",
                        smooth:false,//折线是否平滑
                        stack: 100,
                        barWidth:43,
                        itemStyle:{
                            normal:{
                                color:'#2CECF8'
                            }
                        },
                        symbolSize: 5, //折线点的大小
                        data:IPS,
                    },
                    {
                        name: '技术协作',
                        type:"line",
                        smooth:false,//折线是否平滑
                        stack: 100,
                        barWidth:43,
                        itemStyle:{
                            normal:{
                                color:'#F7931E'
                            }
                        },
                        symbolSize: 5, //折线点的大小
                        data:IPS,
                    },
                    {
                        name: '同步录音录像',
                        type:"line",
                        smooth:false,//折线是否平滑
                        stack: 100,
                        barWidth:43,
                        itemStyle:{
                            normal:{
                                color:'#1890FF'
                            }
                        },
                        symbolSize: 5, //折线点的大小
                        data: IPS,
                    },
                    {
                        name: '技术性证据审查',
                        type:"line",
                        smooth:false,//折线是否平滑
                        stack: 100,
                        barWidth:43,
                        itemStyle:{
                            normal:{
                                color:'#F555B5'
                            }
                        },
                        symbolSize: 5, //折线点的大小
                        data: IPS,
                    }
                ]
            };
           // 绘制图表
           trendChart.setOption(option,true);
        }
    },
    watch  : {
            acceptIPS:{
                handler(val) {
                    this.acceptChart('accept',this.acceptIPSxAxis,this.acceptIPS)//受理案件趋势分析
                },
                deep: true			
            },
            synthesizeIPS:{
                handler(val) {
                    this.acceptChart('synthesize',this.synthesizeIPSxAxis,this.synthesizeIPS)//综合分析
                },
                deep: true			
			}
		}
}
</script>
<style lang="scss" scoped>
.outer-procuratorial-page{
    width:100%;
    height:100%;
    display: flex;
    padding-top:65px;
    .procuratorial-page-left{
        width:1113px;
        position: relative;
        .correlation-box,.accept-box{
                width:1112px;
                height:290px;
                padding:20px 0 0 20px;
                margin-bottom:19px;
                position: relative;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
        }
        .accept-box{
            height:327px;
            span{
                position: absolute;
                display: inline-block;
                width:14px;
                height:14px;
                z-index:2;
                }
            span:nth-child(1){
                left:130px;
                bottom:53px;
            }
            span:nth-child(2){
                right:90px;
                bottom:53px;
            }
        }
        .case-box{
            width:1112px;
            height:254px;
            padding:10px 0 0 20px;
            .title{
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                  }
            .classify-box{
                display: flex;
                margin-top:26px;
                justify-content: space-around;
            }
        }
    }
    .procuratorial-page-center{
        width:1331px;
        height:909px;
        border:1px solid #00FFFF;
        background:rgba(0,0,0,0.4);
        margin:0 20px;
    }
    .procuratorial-page-right{
        .synthesize-box{
            span{
                position: absolute;
                display: inline-block;
                width:14px;
                height:14px;
                z-index:2;
                }
            span:nth-child(1){
                left:130px;
                bottom:42px;
            }
            span:nth-child(2){
                right:87px;
                bottom:42px;
            }
        }
        .synthesize-box,.inspect-box{
                width:1275px;
                height:445px;
                padding:20px 0 0 20px;
                margin-bottom:19px;
                position: relative;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
        }
    }
}
</style>
