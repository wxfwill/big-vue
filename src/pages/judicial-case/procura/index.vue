<template>
    <div class='box'>
        <!-- <date-time moduleName="检委办/检察技术"></date-time> -->
         <div class="judicial-case-title">
            <i class="title-dot"></i>
            检委办
        </div>
        <div class="outer-procuratorial-page">
             <div class="procuratorial-page-left">
                <div class="correlation-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>相关办案人员（各省市/人）</i>
                    </div>
                    <div>
                        <p class='more-btn' @click="setDialogVisible('相关办案人员（各省市/人）')">更多>></p>
                         <div class="personnel-content" ref="personnelchart"></div>
                    </div>
                </div>
                <div class="accept-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>受理案件趋势分析</i>
                    </div>
                    <div>
                        <p class='more-btn' @click="setDialogVisible('受理案件趋势分析')">更多>></p>
                        <div class="casenumber-analysis" ref='trendOfAcceptingCasesList'></div>
                    </div>
                </div>
                <div class="case-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>案件分类分析</i>
                    </div>
                    <div class="classify-box">
                        <water-polo
                                v-for="item in poloList"
                                :key="item.id"
                                :chartConfig="item"
                                :percent=true
                        ></water-polo>
                    </div>
                </div>
            </div>
            <center-box></center-box>
            <div class="procuratorial-page-right">
                <div class="accept-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>综合分析</i>
                    </div>
                    <div>
                        <p class='more-btn' @click="setDialogVisible('综合分析')">更多>></p>
                        <div class="casenumber-analysis" ref='analysisBySynthesisList'></div>
                    </div>
                </div>
                <div class="correlation-box">
                    <div class="chart-box-title">
                        <span class="chart-label-dot"></span>
                        <i>检委办</i>
                    </div>
                    <div>
                        <p class='more-btn' @click="setDialogVisible('检委办')">更多>></p>
                         <div class="personnel-content" ref="toAcceptTheNumberList"></div>
                    </div>
                </div>
            </div>
            <el-dialog
                :title="dialogContext.name"
                :visible.sync="dialogVisible"
                @opened="loadDialogChart"
                @closed="closeBarDialog"
                width="90%">
            <div class="per-dialog-chart" ref="dialogChart"></div>
        </el-dialog>
        </div>
    </div>
</template>
<script>

import echarts from 'echarts';
import Popup from '@/components/Popup.vue'
import waterPolo from '@/components/common/water-polo.vue'
import DateTime from '@/components/DateTime.vue'
import CenterBox from './components/Center'
import * as services                   from './service';
//模拟数据
import {personnelChartConfig,caseNumberAnalysiscongif,administrativeConfig} from "./constant/index"


export default {
    components:{
        Popup,
        DateTime,
        waterPolo,
        CenterBox
    },
    data() {
        return {
            poloList:[],
            topImg: require('@/public/img/judicature/top@2x.png'),
            bottomImg: require('@/public/img/judicature/bottom@2x.png'),
            correlationIPSxAxis:[],
            correlationIPS:[],
            acceptIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            acceptIPS:[200, 600, 50, 80, 120, 100,20,19,60,188],
            synthesizeIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            synthesizeIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            inspectIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            inspectIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            theInvestigatorsList:{},//相关办案人员（各省市/人）
            trendOfAcceptingCasesList:{},//受理案件趋势分析
            dialogVisible:false,
             dialogContext: {
                name: '',
                key : '',
                data: []
            },
             dialogVisible1:false,
             dialogContext1: {
                name: '',
                key : '',
                data: []
            },
            analysisBySynthesisList:{},//综合分析
            toAcceptTheNumberList:{},//检委办
        }
    },
    mounted() {
        const params         = { ...this.mapCode, ...this.dateSection };
        this.requestGetCheckCharterData(params)//请求检委办数据
        // this.acceptChart('synthesize',this.synthesizeIPSxAxis,this.synthesizeIPS)//综合分析
        // this.acceptChart('accept',this.acceptIPSxAxis,this.acceptIPS)//受理案件趋势分析
        this.theInvestigatorsListchart   = echarts.init(this.$refs.personnelchart);
        
        this.trendOfAcceptingCasesListchart = echarts.init(this.$refs.trendOfAcceptingCasesList);
        this.analysisBySynthesisListchart = echarts.init(this.$refs.analysisBySynthesisList);
        this.toAcceptTheNumberListchart = echarts.init(this.$refs.toAcceptTheNumberList);
    },
    methods: {
        async requestGetCheckCharterData(params) {
            const res = await services.getCheckCharterData(params);
            if(res.code === 200) {
                const data         = res.data;
                console.log(data)
                //theInvestigatorsList--相关办案人员（各省市/人）
                this.theInvestigatorsList = data.theInvestigatorsList;
                this.loadtheInvestigatorsListchart();
                //trendOfAcceptingCasesList	--受理案件趋势分析
                this.trendOfAcceptingCasesList=data.trendOfAcceptingCasesList	
                this.loadtrendOfAcceptingCasesListchart()
                //caseNumberAnalysis--案件分类分析
                this.caseNumberAnalysis=data.caseNumberAnalysis
                this.poloList = administrativeConfig.map(i => ({
						...i,
						value: res.data[i.id],
						rate : res.data[i.rateId],
					}));
                //analysisBySynthesisList--综合分析
                this.analysisBySynthesisList=data.analysisBySynthesisList
                this.loadanalysisBySynthesisList()
                //toAcceptTheNumberList--检委办
                this.toAcceptTheNumberList=data.toAcceptTheNumberList
                this.loadtoAcceptTheNumberList()
            } else {
                this.$message.error(res.msg);
            }
        },
         convertChartConfigcz(configList = []) {
            const xAxisData  = [],
                    seriesData = [];
                    configList.map((config) => {
                        xAxisData.push(config.city_name);
                        seriesData.push(config.rs)
                    });
            return { xAxisData, seriesData };
        },
        loadtheInvestigatorsListchart() {//theInvestigatorsList--相关办案人员（各省市/人)
           const { xAxisData, seriesData } = this.convertChartConfigcz(this.theInvestigatorsList.slice(0,10));
            this.theInvestigatorsListchart.setOption({
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xAxisData,
                        axisTick: {
                            show:false
                        },
                        axisLine:{
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{
                            show:false,
                            lineStyle: {
                                color: "#fff",
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:seriesData,
                        itemStyle:{
                            normal:{
                                color:'#5C89FF'
                            }
                        }
                    }
                ]
            })
        },
        loadtoAcceptTheNumberList(){
            const { xAxisData, seriesData } = this.convertChartConfigcz(this.toAcceptTheNumberList.slice(0,10));
                this.toAcceptTheNumberListchart.setOption({
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : xAxisData,
                            axisTick: {
                                show:false
                            },
                            axisLine:{
                                lineStyle: {
                                    color: "#fff",
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                show:false,
                                lineStyle: {
                                    color: "#fff",
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:seriesData,
                            itemStyle:{
                                normal:{
                                    color:'#5C89FF'
                                }
                            }
                        }
                    ]
                })
        },
        loadtrendOfAcceptingCasesListchart(){//受理案件趋势分析
            let year=[],jsxz=[],jsxzjsc=[],jyjd=[],kyjc=[],tblylx=[];
            for(var i=0;i<this.trendOfAcceptingCasesList.length;i++){
                year.push(this.trendOfAcceptingCasesList[i].year);
                jsxz.push(this.trendOfAcceptingCasesList[i].jsxz);
                jsxzjsc.push(this.trendOfAcceptingCasesList[i].jsxzjsc);
                jyjd.push(this.trendOfAcceptingCasesList[i].jyjd);
                kyjc.push(this.trendOfAcceptingCasesList[i].kyjc);
                tblylx.push(this.trendOfAcceptingCasesList[i].tblylx);
            }
            this.trendOfAcceptingCasesListchart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right: '15%',
                    bottom:'-3%',
                    itemGap:15,
                    data: ['检验鉴定','勘验检查','技术协作','同步录音录像','技术性证据审查'],
                    itemWidth:48,
                    itemHeight:3,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'14'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: year,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#00FFFF',
                            width:1
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                series: [
                    {
                        name:'检验鉴定',
                        type:'line',
                        stack: '总量',
                        data:jyjd
                    },
                    {
                        name:'勘验检查',
                        type:'line',
                        stack: '总量',
                        data:kyjc
                    },
                    {
                        name:'技术协作',
                        type:'line',
                        stack: '总量',
                        data:jsxz
                    },
                    {
                        name:'同步录音录像',
                        type:'line',
                        stack: '总量',
                        data:tblylx
                    },
                    {
                        name:'技术性证据审查',
                        type:'line',
                        stack: '总量',
                        data:jsxzjsc
                    }
                ]
            })
        },
        loadanalysisBySynthesisList(){
            let cityname=[],jsxz=[],jsxzjsc=[],jyjd=[],kyjc=[],tblylx=[];
            for(var i=0;i<this.trendOfAcceptingCasesList.length;i++){
                cityname.push(this.trendOfAcceptingCasesList[i].year);
                jsxz.push(this.trendOfAcceptingCasesList[i].jsxz);
                jsxzjsc.push(this.trendOfAcceptingCasesList[i].jsxzjsc);
                jyjd.push(this.trendOfAcceptingCasesList[i].jyjd);
                kyjc.push(this.trendOfAcceptingCasesList[i].kyjc);
                tblylx.push(this.trendOfAcceptingCasesList[i].tblylx);
            }
            this.analysisBySynthesisListchart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right: '15%',
                    bottom:'-3%',
                    itemGap:15,
                    data: ['检验鉴定','勘验检查','技术协作','同步录音录像','技术性证据审查'],
                    itemWidth:48,
                    itemHeight:3,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'14'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: cityname,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#00FFFF',
                            width:1
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                series: [
                    {
                        name:'检验鉴定',
                        type:'line',
                        stack: '总量',
                        data:jyjd
                    },
                    {
                        name:'勘验检查',
                        type:'line',
                        stack: '总量',
                        data:kyjc
                    },
                    {
                        name:'技术协作',
                        type:'line',
                        stack: '总量',
                        data:jsxz
                    },
                    {
                        name:'同步录音录像',
                        type:'line',
                        stack: '总量',
                        data:tblylx
                    },
                    {
                        name:'技术性证据审查',
                        type:'line',
                        stack: '总量',
                        data:jsxzjsc
                    }
                ]
            })
        },
        setDialogVisible(name) {
				let data = [],
                    key  = '';
                    switch(name){
                        case '相关办案人员（各省市/人）':
                            key  = '相关办案人员（各省市/人）';
                            data = this.theInvestigatorsList;
                            break;
                        case '受理案件趋势分析':
                            key  = '受理案件趋势分析';
                            data = this.trendOfAcceptingCasesList;
                            break;
                        case '综合分析':
                            key  = '综合分析';
                            data = this.analysisBySynthesisList;
                        case '检委办':
                            key  = '检委办';
                            data = this.toAcceptTheNumberList;
                    }
					
				this.dialogContext = {
					name,
					key,
					data
                }
                this.dialogVisible = true;
			},
        loadDialogChart(){
            this.dialogBarChart            = echarts.init(this.$refs.dialogChart);
            const { xAxisData, seriesData } = this.convertChartConfigcz(this.theInvestigatorsList);
            alert(this.dialogContext.name)
            if(this.dialogContext.name=='相关办案人员（各省市/人）' || this.dialogContext.name=='检委办'){
                    this.dialogBarChart.setOption({
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '10%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : xAxisData,
                                axisTick: {
                                    show:false
                                },
                                axisLine:{
                                    lineStyle: {
                                        color: "#fff",
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLine:{
                                    show:false,
                                    lineStyle: {
                                        color: "#fff",
                                    }
                                }
                            }
                        ],
                        series : [
                            {
                                name:'直接访问',
                                type:'bar',
                                barWidth: '60%',
                                data:seriesData,
                                itemStyle:{
                                    normal:{
                                        color:'#5C89FF'
                                    }
                                }
                            }
                        ]
                    })
            }else if(this.dialogContext.name=='受理案件趋势分析'){
                let year=[],jsxz=[],jsxzjsc=[],jyjd=[],kyjc=[],tblylx=[];
                for(var i=0;i<this.trendOfAcceptingCasesList.length;i++){
                    year.push(this.trendOfAcceptingCasesList[i].year);
                    jsxz.push(this.trendOfAcceptingCasesList[i].jsxz);
                    jsxzjsc.push(this.trendOfAcceptingCasesList[i].jsxzjsc);
                    jyjd.push(this.trendOfAcceptingCasesList[i].jyjd);
                    kyjc.push(this.trendOfAcceptingCasesList[i].kyjc);
                    tblylx.push(this.trendOfAcceptingCasesList[i].tblylx);
                }
                this.dialogBarChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: year,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#00FFFF',
                                width:1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'检验鉴定',
                            type:'line',
                            stack: '总量',
                            data:jyjd
                        },
                        {
                            name:'勘验检查',
                            type:'line',
                            stack: '总量',
                            data:kyjc
                        },
                        {
                            name:'技术协作',
                            type:'line',
                            stack: '总量',
                            data:jsxz
                        },
                        {
                            name:'同步录音录像',
                            type:'line',
                            stack: '总量',
                            data:tblylx
                        },
                        {
                            name:'技术性证据审查',
                            type:'line',
                            stack: '总量',
                            data:jsxzjsc
                        }
                    ]
                })
            }else if(this.dialogContext.name=='综合分析'){
                let cityname=[],jsxz=[],jsxzjsc=[],jyjd=[],kyjc=[],tblylx=[];
                for(var i=0;i<this.trendOfAcceptingCasesList.length;i++){
                    cityname.push(this.trendOfAcceptingCasesList[i].year);
                    jsxz.push(this.trendOfAcceptingCasesList[i].jsxz);
                    jsxzjsc.push(this.trendOfAcceptingCasesList[i].jsxzjsc);
                    jyjd.push(this.trendOfAcceptingCasesList[i].jyjd);
                    kyjc.push(this.trendOfAcceptingCasesList[i].kyjc);
                    tblylx.push(this.trendOfAcceptingCasesList[i].tblylx);
                }
                this.dialogBarChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: cityname,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#00FFFF',
                                width:1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    series: [
                        {
                            name:'检验鉴定',
                            type:'line',
                            stack: '总量',
                            data:jyjd
                        },
                        {
                            name:'勘验检查',
                            type:'line',
                            stack: '总量',
                            data:kyjc
                        },
                        {
                            name:'技术协作',
                            type:'line',
                            stack: '总量',
                            data:jsxz
                        },
                        {
                            name:'同步录音录像',
                            type:'line',
                            stack: '总量',
                            data:tblylx
                        },
                        {
                            name:'技术性证据审查',
                            type:'line',
                            stack: '总量',
                            data:jsxzjsc
                        }
                    ]
                })
            }
           
            
        },
        closeBarDialog(){
            this.dialogBarChart && this.dialogBarChart.clear();
        },
    }
}
</script>
<style lang="scss" scoped>
.box{
    .judicial-case-title {
        width:100px;
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
}

.outer-procuratorial-page{
    width:100%;
    height:100%;
    display: flex;
    // padding-top:65px;
    .procuratorial-page-left{
        width:1076px;
        position: relative;
        .correlation-box,.accept-box{
                width:1112px;
                height:290px;
                margin-bottom:19px;
                position: relative;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    .more-btn{
                        color:#FBBA18;
                        position:absolute;
                        right:85px;
                        top:55px;
                        margin-top: 17px;
                        text-align: right;
                        font-size: 16px;
                        font-family: Helvetica;
                        color: rgba(251, 186, 24, 1);
                        line-height: 17px;
                        cursor: pointer;
                                z-index:999;
                    }
                    .personnel-content{
                        width:1076px;
                        height:257px;
                    }
        }
        .accept-box{
            height:327px;
            .casenumber-analysis{
                    width:1076px;
                    height:281px;
                }
            span{
                position: absolute;
                display: inline-block;
                width:14px;
                height:14px;
                z-index:2;
                }
            span.chart-label-dot{
                position: static;
                margin-right:10px;
            }
            span.left{
                left:130px;
                bottom:53px;
            }
            span.right{
                right:90px;
                bottom:53px;
            }
        }
        .case-box{
            width:1112px;
            height:254px;
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
        width:1319px;
        height:909px;
        margin:0px 20px 0px 80px;
    }
     .procuratorial-page-right{
        width:1194px;
        position: relative;
        .correlation-box{
                width:1194px;
                height:290px;
                margin-bottom:19px;
                position: relative;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                     .more-btn{
                        color:#FBBA18;
                        position:absolute;
                        right:85px;
                        top:55px;
                        margin-top: 17px;
                        text-align: right;
                        font-size: 16px;
                        font-family: Helvetica;
                        color: rgba(251, 186, 24, 1);
                        line-height: 17px;
                        cursor: pointer;
                                z-index:999;
                    }
                    .personnel-content{
                        width:1194px;
                        height:422px;
                    }
        }
        .accept-box{
            width:1194px;
            position: relative;
            height:466px;
            margin-bottom:20px;
            .casenumber-analysis{
                    width:1194px;
                    height:422px;
                }
            span{
                position: absolute;
                display: inline-block;
                width:14px;
                height:14px;
                z-index:2;
                }
            span.chart-label-dot{
                position: static;
                margin-right:10px;
            }
            span.left{
                left:130px;
                bottom:53px;
            }
            span.right{
                right:90px;
                bottom:53px;
            }
            .more-btn{
                        color:#FBBA18;
                        position:absolute;
                        right:85px;
                        top:55px;
                        margin-top: 17px;
                        text-align: right;
                        font-size: 16px;
                        font-family: Helvetica;
                        color: rgba(251, 186, 24, 1);
                        line-height: 17px;
                        cursor: pointer;
                                z-index:999;
                    }
        }
        .case-box{
            width:1194px;
            height:254px;
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
}
.per-dialog-chart {
      width: 100%;
      height: 400px;
  }
</style>
bia