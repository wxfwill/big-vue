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
            <center-box :checkCharterData='checkCharterData'></center-box>
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
        <span v-show="false">{{ mapCode }}</span>
        <span v-show="false">{{ dateSection }}</span>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions }                                           from 'vuex';
import echarts from 'echarts';
import waterPolo from '@/components/common/water-polo.vue'
import CenterBox from './components/Center'
import * as services                   from './service';
import { triggerMixin } from '@/components/mixin/trigger';
//模拟数据
import {personnelChartConfig,caseNumberAnalysiscongif,administrativeConfig} from "./constant/index"
import {verifyTriggerState,textFormatter} from '@/utlis/helper'


export default {
    components:{
        waterPolo,
        CenterBox
    },
    data() {
        return {
            poloList:[],
            theInvestigatorsList:{},//相关办案人员（各省市/人）
            trendOfAcceptingCasesList:{},//受理案件趋势分析
            dialogVisible:false,
             dialogContext: {
                name: '',
                key : '',
                data: []
            },
            analysisBySynthesisList:{},//综合分析
            toAcceptTheNumberList:{},//检委办
            checkCharterData:{},//检委办所有的数据
        }
    },
    mounted() {
        const params                = { ...this.mapCode, ...this.dateSection };
		this.oldTriggerState        = params;
        this.requestGetCheckCharterData(params)//请求检委办数据
        this.theInvestigatorsListchart   = echarts.init(this.$refs.personnelchart);
        this.trendOfAcceptingCasesListchart = echarts.init(this.$refs.trendOfAcceptingCasesList);
        this.analysisBySynthesisListchart = echarts.init(this.$refs.analysisBySynthesisList);
        this.toAcceptTheNumberListchart = echarts.init(this.$refs.toAcceptTheNumberList);
    },
    updated(){
        const params = { ...this.mapCode, ...this.dateSection };
			if(verifyTriggerState(this.trigger, this.oldTriggerState, params)) {
				this.oldTriggerState = params;
                this.requestGetCheckCharterData(params)
			}
    },
    methods: {
        async requestGetCheckCharterData(params) {
            const res = await services.getCheckCharterData(params);
            if(res.code === 200) {
                const data         = res.data;
                this.checkCharterData=data
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
						value: res.data.caseNumberAnalysis[i.id],
						rate : 50,
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
                        if(config.rs){
                            seriesData.push(config.rs)
                        }  
                        if(config.sls){
                            seriesData.push(config.sls)
                        }                     
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
                    bottom: 30,
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
                        },
                        interval:1,
                        formatter: (name) => textFormatter(name, 4),
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
                    right: '20%',
                    bottom:'0',
                    itemGap:15,
                    data: ['检验鉴定','勘验检察','技术协作','同步录音录像','技术性证据审查'],
                    itemWidth:48,
                    itemHeight:3,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'14'
                    }
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '10%',
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
                        name:'勘验检察',
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
                    bottom:'0',
                    itemGap:15,
                    data: ['检验鉴定','勘验检察','技术协作','同步录音录像','技术性证据审查'],
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
                    bottom: '10%',
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
                        name:'勘验检察',
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
                            key  = '相关办案人员';
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
                            name:'勘验检察',
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
                            name:'勘验检察',
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
        ...mapActions('procura', ['initMapState','setMapData']),
    },
    computed:{
        ...mapGetters('procura', ['mapCode']),
		...mapGetters('judicial', ['dateSection']),
    },
    mixins    : [triggerMixin],
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
    justify-content:space-between;
    // padding-top:65px;
    .procuratorial-page-left{
        width:1268px;
        position: relative;
        .correlation-box,.accept-box{
                width:1268px;
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
                        width:1268px;
                        height:257px;
                    }
        }
        .accept-box{
            height:327px;
            .casenumber-analysis{
                    width:1268px;
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
            width:1268px;
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
                        height:370px;
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