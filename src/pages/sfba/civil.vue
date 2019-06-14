<template>
    <div class="outer-civil-page">
        <date-time moduleName="民事"></date-time>
        <div class="civil-page-left">
            <div class="bor_col businessBox">
                <p class="title">基本业务情况</p>
                <ul>
                    <li v-for="(item,index) in businessList" :key="index">
                        <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}">{{item.num}}</p>
                        <p>{{item.title}}</p>
                    </li>
                </ul>
            </div>
            <div class="bor_col judgmentBox">
                <p class="title">生效裁判监督</p>
                <ol>
                    <li v-for="(item,index) in judgmentList" :key="index">
                        <span>{{item.title}}</span>
                        <span></span>
                        {{item.num}}
                    </li>
                </ol>
            </div>
            <div class="bor_col executeBox">
                <p class="title">执行活动监督</p>
                <div class="canva">
                    <div class="concludeBox">
                        <div id="conclude" :style="{width: '315px', height: '195px'}"></div>
                        <p>受理数：234,443,24</p>
                        <p>办结率：99.78%</p>
                    </div>
                    <div class="acceptBox">
                        <div id="accept" :style="{width: '315px', height: '195px'}"></div>
                        <p>提出检察建议数：223,24</p>
                        <p>办结率：99.78%</p>
                    </div>
                </div>
            </div>
            <div class="bor_col breakBox">
                <p class="title">违法行为监督</p>
                <div class="breakContent">
                    <p>办结率：78.5%</p>
                <div id="break1" :style="{width: '465px', height: '377px'}"></div>
                    <p>建议采纳率：98.5%</p>
                <!-- <div id="break2" :style="{width: '265px', height: '377px'}"></div> -->
                </div>
                <div class="lagend">
                    <div>
                    <p><span class="span1"></span>&nbsp;&nbsp;&nbsp;受理数</p>
                    <p><span class="span2"></span>&nbsp;&nbsp;&nbsp;办结数</p>
                    </div>
                    <div>
                    <p><span class="span3"></span>&nbsp;&nbsp;&nbsp;提出检察建议数</p>
                    <p><span class="span4"></span>&nbsp;&nbsp;&nbsp;采纳检察建议数</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="civil-page-content">
            <mapComponent :user="(this.$route.name)"></mapComponent>
        </div>
        <div class="civil-page-right">
            <div class="bor_col sortBox">
                <p class="title">民事案件案由发生次数排序</p>
                <p class="label">占比 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次数</p>
                <ol>
                    <li v-for="(item,index) in sortList" :key="index">
                    <i :class="col===true&&index<3?'baCol':null">{{index+1}}</i>
                    <p :style="{backgroundImage:'url('+lineImg+')'}">
                        <span>{{item.title}}</span>
                        <span :class="col===true&&index<3?'col':null">{{item.proportion}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.num}}</span>
                    </p>
                    </li>
                </ol>
                <div class="next">
                      <p class="bg_img" :style="{backgroundImage:'url('+leftImg+')'}" @click="previousHandle"></p>
                      <p>{{num}}/{{sum}}</p>
                      <p class="bg_img" :style="{backgroundImage:'url('+rightImg+')'}" @click="downHandle"></p>
                  </div>
            </div>
            <div class="dayBox">
                <div class="bor_col fileBox">
                    <p>案均办理天数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
                    <div id="file" :style="{width:'490px',height:'205px'}"></div>
                </div>
                <div class="bor_col capitaBox">
                <p>人均办结数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
                <div id="capita" :style="{width:'490px',height:'235px'}"></div>
                </div>
            </div>
            <div class="bor_col civil-trend">
                    <p class="title">受理案件趋势分析</p>
                    <trend-chart :dataIPSxAxis="civilIPSxAxis" :dataIPS="civilIPS" ID='civilTrend'
                      width='1050px' height='235px' left="30px" right="30px" bottom="12px" :splitLine="false" 
                    ></trend-chart>
                </div>
        </div>
        <popup v-if="popupShow" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
import trendChart from '@/components/sfba/trend-chart.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    components:{
        mapComponent,
        Popup,
        trendChart,
        DateTime
    },
    data() {
        return {
            col:true,
            num:1,
            sum:3,
            capitPopup:false,
            filePopup:false,
            businessList:[
                {img: require('@/public/img/civil/demurrer.png'),title:'提出抗诉数',num: 3434},{img: require('@/public/img/civil/put.png'),title:'提出抗诉数',num: 3434},
                {img: require('@/public/img/civil/accept.png'),title:'提出抗诉数',num: 3434},{img: require('@/public/img/civil/accept.png'),title:'提出抗诉数',num: 3434},
                {img: require('@/public/img/civil/put.png'),title:'提出抗诉数',num: 3434},{img: require('@/public/img/civil/demurrer.png'),title:'提出抗诉数',num: 35345}
            ],
            judgmentList:[
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434}
            ],
            lineImg:require('@/public/img/judicature/line.png'),
            leftImg:require('@/public/img/judicature/left.png'),
            rightImg:require('@/public/img/judicature/right.png'),
            civilIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            civilIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            sortList:[
                {title:'受理件数',num: 3434,proportion:'20%'},{title:'办结件数',num: 4545,proportion:'20%'},
                {title:'1111',num: 7877,proportion:'20%'},{title:'受理件数',num: 3434,proportion:'20%'},
                {title:'起诉案件数',num: 9090,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'犯罪又犯罪审查逮捕案件',num: 6767,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'批捕逮捕数',num: 1231,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'}],
            popupShow:false,
            popupTitle:'全国各省份人均办结数统计表',
            popupData:[]
        }
    },
    created() {
       
    },
    mounted(){
        this.concludeHandle()//执行活动监督1
        this.acceptHandle()//执行活动监督2
        this.breakHandle()//违法行为监督
        this.capitaHandle()//人均办结数
        this.fileHandle()//案均办理天数
    },
    methods: {
        previousHandle(){//上一页
            if(this.num!=1){
                this.num--
                if(this.num==1){this.col=true}
            }
        },
        downHandle(){//下一页
            if(this.num!=3){
                this.num++
                this.col=false
            }
        },
        fileHandle(){
            var file =this.$echarts.init(document.getElementById("file"));
           var option = {
                tooltip: {
                    // trigger: 'axis',
                    // axisPointer: {
                    //     type: 'shadow'
                    // },
                    show:false,
                    formatter: "{b} <br> 合格率: {c}%"//提示框内容修改
                },
                /*legend: {
                    data: [date]
                },*/
                grid: {
                    left: '10%',
                    right: '14%',
                    top:'0',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name:'天数',
                    // boundaryGap: [0, 0.01],
                    // min: 0,
                    // max: 100,
                    interval: 20,
                    axisLine:{
                        lineStyle:{
                            color:'#00FFFF'
                        }
                    },
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    axisLabel: {
                        // formatter: '{value}%',//刻度标签的内容格式器
                        textStyle: {
                            color: 'rgba(255,255,255,1)',  
                            fontSize:14
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['湖北', '湖南', '河南', '安徽', '浙江'],
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#00FFFF'
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 0,
                        margin: 10,
                        inside: false,
                        textStyle: {
                            color: 'rgba(255,255,255,1)',
                            fontSize:14
                        }
                    }
                },
                series: [{
                    type: 'bar',
                    barWidth:20,
                    itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#1783E5' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#36EABF' // 100% 处的颜色
                                }]), //背景渐变色
                            },
                        },
                    label: {
                        normal: {
                            show: true,
                            // formatter: '{c}',
                            formatter: function(v) {
                                var val = v.data;
                                if (val == 0) {
                                    return '';
                                }
                                return val;
                            },
                            color: '#fff'
                        }
                    },
                    data: [22, 33, 44, 55, 66]
                }]
            };
            file.setOption(option,true)
        },
        capitaHandle(){
            var capita =this.$echarts.init(document.getElementById("capita"));
            var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '15%',
                    left: '10%',
                    right: '14%',
                    bottom: '8%',
                    containLabel: true,
                },
                xAxis: [{
                    type: 'category',
                    name:'天数',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#00FFFF'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: '#d1e6eb',
                            fontSize:10,
                            margin: 15,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', ],
                }],
                yAxis: [{
                    name:'件数',
                    type: 'value',
                    min: 0,
                    // max: 140,
                    // splitNumber: 1,//刻度条数决定距离
                    splitLine:{
                        show:false
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#00FFFF'
                        },
                        show: true,
                    },
                    axisLabel: {
                        margin: 20,//离右边距离
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize:14

                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [ {
                    name: '最新注册量',
                    type: 'bar',
                    tooltip: {
                        show: false
                    },
                    label: {//柱状头部出现数值
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#00FFFF',
                            fontSize:10
                        }
                    },
                    barWidth:22,
                    itemStyle: {
                        normal: {
                            color:'#00FFFF'
                        }
                    },
                    data: [200, 382, 102, 267, 186]
                }]
            };
            capita.setOption(option,true)
        },
        breakHandle(){
            var breakb1 = this.$echarts.init(document.getElementById("break1"));
            var option = {
                tooltip: {},
                legend: {
                    show:false,
                    orient: 'vertical',
                    left: '45%',
                    bottom:'3%',
                    data: ['受理数','办结数'],
                    itemWidth: 12,
                    itemHeight:12,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'12'
                    }
                },
                grid: {//柱状图偏移
                    top: '15%',
                    left: '1%',
                    right: '0%',
                    bottom: '25%',
                    containLabel: true,
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#00FFFF'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        margin: 20,
                        textStyle: {
                            color: 'rab(255,255,255,1)',
                            fontSize:16,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['受理数','办结数'],
                }],
                yAxis: [{
                    name:'',
                    type: 'value',
                    min: 0,
                    // max: 140,
                    // splitNumber: 1,//刻度条数决定距离
                    splitLine:{
                        show:false,
                        lineStyle: { //y轴网格线设置
                            color: 'rgb(193,193,193,0.2)',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#00FFFF'
                        },
                        show: true,
                    },
                    axisLabel: {
                        margin: 20,//离右边距离
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize:14

                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [ {
                    name: '受理数',
                    type: 'bar',
                    tooltip: {
                        show: false
                    },
                    label: {//柱状头部出现数值
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#31DBE8',
                            fontSize:10
                        }
                    },
                    barWidth:43,
                    itemStyle: {
                        normal: {
                            color:function(params) { 
                                var colorList = ['#31DBE8','#2FE0BE']; 
                                return colorList[params.dataIndex] 
                            }
                        }
                    },
                    data: [2000,300]//办结数/采纳检察建议数
                },
                {
                    name: '办结数',
                    type: 'bar',
                    tooltip: {
                        show: false
                    },
                    label: {//柱状头部出现数值
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#F7931E',
                            fontSize:10
                        }
                    },
                    barWidth:43,
                    itemStyle: {
                        normal: {
                            // 定制显示（按顺序）
                color: function(params) { 
                    var colorList = ['#F7931E','#A920E2']; 
                    return colorList[params.dataIndex] 
                }
                        }
                    },
                    data: [400,1000]//受理数/提出检察建议数
                }
                ]
            };
            breakb1.setOption(option,true)
            // 
            // var breakb2 = this.$echarts.init(document.getElementById("break2"));
            // var option = {
            //     tooltip: {},
            //     legend: {
            //         orient: 'vertical',
            //         left: '25%',
            //         bottom:'3%',
            //         data: ['提出检察建议数','提出采纳建议数'],
            //         itemWidth: 12,
            //         itemHeight:12,
            //         textStyle:{
            //             color:'#ffffff',
            //             fontSize:'12'
            //         }
            //     },
            //     grid: {//柱状图偏移
            //         top: '15%',
            //         left: '0%',
            //         right: '1%',
            //         bottom: '20%',
            //         containLabel: true,
            //     },
            //     xAxis: [{
            //         type: 'category',
            //         boundaryGap: true,
            //         axisLine: { //坐标轴轴线相关设置。数学上的x轴
            //             show: true,
            //             lineStyle: {
            //                 color: '#00FFFF'
            //             },
            //         },
            //         axisLabel: { //坐标轴刻度标签的相关设置
            //             textStyle: {
            //                 color: '#d1e6eb',
            //                 fontSize:10,
            //                 margin: 15,
            //             },
            //         },
            //         axisTick: {
            //             show: false,
            //         },
            //         data: ['办结数'],
            //     }],
            //     yAxis: [{
            //         name:'',
            //         type: 'value',
            //         show:false,
            //         position:'right',
            //         min: 0,
            //         // max: 140,
            //         // splitNumber: 1,//刻度条数决定距离
            //         splitLine:{
            //             show:false,
            //             lineStyle: { //y轴网格线设置
            //                 color: 'rgb(193,193,193,0.2)',
            //                 width: 1,
            //                 type: 'dashed'
            //             }
            //         },
            //         axisLine: {
            //             lineStyle:{
            //                 color:'#00FFFF'
            //             },
            //             show: true,
            //         },
            //         axisLabel: {
            //             margin: 20,//离右边距离
            //             textStyle: {
            //                 color: '#FFFFFF',
            //                 fontSize:14

            //             },
            //         },
            //         axisTick: {
            //             show: false,
            //         },
            //     }],
            //     series: [ {
            //         name: '提出检察建议数',
            //         type: 'bar',
            //         tooltip: {
            //             show: false
            //         },
            //         label: {//柱状头部出现数值
            //             show: true,
            //             position: 'top',
            //             textStyle: {
            //                 color: '#2FE0BE',
            //                 fontSize:10
            //             }
            //         },
            //         barWidth:43,
            //         itemStyle: {
            //             normal: {
            //                 color:'#2FE0BE'
            //             }
            //         },
            //         data: [20000],
            //     },
            //     {
            //         name: '提出采纳建议数',
            //         type: 'bar',
            //         tooltip: {
            //             show: false
            //         },
            //         label: {//柱状头部出现数值
            //             show: true,
            //             position: 'top',
            //             textStyle: {
            //                 color: '#A920E2',
            //                 fontSize:10
            //             }
            //         },
            //         barWidth:43,
            //         itemStyle: {
            //             normal: {
            //                 color:'#A920E2'
            //             }
            //         },
            //         data: [50]
            //     }
            //     ]
            // };
            // breakb2.setOption(option,true)
        },
        concludeHandle(){
            var conclude =this.$echarts.init(document.getElementById("conclude"));
            var option = {
               color: ['#FCE830', '#1ED3CA'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        show:false,
        orient: 'vertical',
        right: '0%',
        bottom:'10%',
        data: [],
        itemWidth: 12,
        itemHeight:12,
        textStyle:{
            color:'#ffffff',
            fontSize:'12'
        }
    },
    series : [
        {
            name: '受理案件数统计',
            type: 'pie',
            radius : ['0%','80%'],//数组时内，外
            center: ['51%', '51%'],//x，y
            data:[
                {value:335, name:'在办数'},
                {value:310, name:'办结数'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
            conclude.setOption(option,true)
        },
        acceptHandle(){
             var accept =this.$echarts.init(document.getElementById("accept"));
            var option = {
               color: ['#A321E8', '#15D5FD'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        show:false,
        orient: 'vertical',
        right: '0%',
        bottom:'10%',
        data: [],
        itemWidth: 12,
        itemHeight:12,
        textStyle:{
            color:'#ffffff',
            fontSize:'12'
        }
    },
    series : [
        {
            name: '受理案件数统计',
            type: 'pie',
            radius : ['0%','80%'],//数组时内，外
            center: ['51%', '51%'],//x，y
            data:[
                {value:335, name:'未采纳建议数'},
                {value:310, name:'采纳建设数'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
            accept.setOption(option,true)
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-civil-page{
    width:100%;
    height:100%;
    display: flex;
    position: relative;
    padding-top:65px;
    .civil-page-left{
        display: flex;
        flex-wrap: wrap;
        width:1283px;
        position: relative;
        .businessBox{
            margin-bottom:20px;
            padding:19px 0 0 30px;
            width:698px;
            height:458px;
            .title{
                font-size:24px;
                color:rgba(255,255,255,1);
            }
            ul{  
                display: flex;
                flex-wrap: wrap;
                li{ 
                    text-align: center;
                    margin:25px 50px 0 50px;
                    p:nth-child(1){
                        width:118px;
                        height:118px;
                        line-height:118px;
                        font-size:24px;
                        color:rgba(47,224,190,1);
                    }
                    p:nth-child(2){
                        margin-top:16px;
                        font-size:16px;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
        .judgmentBox{
            margin:0 0 20px 19px;
            padding:19px 0 0 30px;
            width:560px;
            height:458px;
            .title{
                font-size:24px;
                color:rgba(255,255,255,1);
            }
            ol{
                li{ 
                    font-size:18px;
                    color:rgba(255,255,255,1);
                    margin-top:33px;
                    span:nth-child(1){
                        font-size:18px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(0,255,255,1);
                    }
                    span:nth-child(2){
                        display: inline-block;
                        width:247px;
                        height:12px;
                        border-radius:8px;
                        background-color: #00FFFF;
                        margin:0 19px 0 30px;
                    }
                }
            }
        }
        .executeBox{
            margin:0 20 0px 0px;
            padding:19px 0 0 30px;
            width:698px;
            height:430px;
            .title{
                font-size:24px;
                color:rgba(255,255,255,1);
            }
            .canva{
                display: flex;
                font-size:19px;
                color:rgba(255,255,255,1);
                margin:48px 0 0 12px;
                .concludeBox{
                    text-align: center;
                    p:nth-of-type(1){
                        margin:18px 0 10px 0;
                    }
                }
                .acceptBox{
                    text-align: center;
                    p:nth-of-type(1){
                        margin:18px 0 10px 0;
                    }
                }
            }
        }
        .breakBox{
            padding:19px 0 0 0px;
            width:560px;
            height:430px;
            margin-left:19px;
            position: relative;
            .title{
                margin-left:30px;
                font-size:24px;
                color:rgba(255,255,255,1);
            }
            .breakContent{
                display: flex;
                padding-left:10px;
                position: relative;
                font-size:14px;
                color:rgba(247,147,30,1);
                p:nth-of-type(1){
                    position: absolute;
                    left:123px;
                    top:7px;
                }
                p:nth-of-type(2){
                    position: absolute;
                    right:123px;
                    top:7px;
                }
            }
            .lagend{
                width:310px;
                font-size:14px;
                color:rgba(255,255,255,1);
                display: flex;
                position: absolute;
                bottom: 15px;
                left:130px;
                justify-content: space-between;
                p{
                    display: flex;
                    align-items: center;
                }
                p:nth-of-type(1),p:nth-of-type(3){
                    margin-bottom:15px;
                }
                span{
                    width:14px;
                    height:14px;
                }
                .span1{background-color:#F7931E;}
                .span2{background-color:#31DBE8;}
                .span3{background-color:#A920E2;}
                .span4{background-color:#2FE0BE}
            }
        }
    }
    .civil-page-content{
        width:1331px;
        height:916px;
        margin-left: 19px;
        background:rgba(0,0,0,0.4);
        border:1px solid rgba(1,218,226,1);
    }
    .civil-page-right{
        margin-left: 21px;
        display: flex;
        flex-wrap: wrap;
        width:1106px;
        .sortBox{
                padding:60px 33px 0 33px;
                width:517px;
                height:600px;
                position: relative;
                .title{
                position: absolute;
                left:33px;
                top:15px;
                font-size:24px;
                color:rgba(255,255,255,1);
                }
                .label{
                    display:flex;
                    justify-content: flex-end;
                    margin-right:5px;
                    font-size:12px;
                    color:rgba(0,255,255,1);
                }
                ol{
                li{
                    display: flex;
                    align-items: center;
                    i{
                    display: inline-block;
                    width:19px;
                    height:19px;
                    text-align: center;
                    line-height:19px;
                    border-radius:50%;
                    margin-right:10px;
                    background-color: #33d1f8;
                    margin-top:-21px;
                    font-size:10px;
                    color:rgba(255,255,255,1);
                    }
                    p{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width:100%;
                    height:37px;
                    padding-bottom:13px;
                    margin-bottom:10px;
                    background-repeat: no-repeat;
                    background-position-y: bottom;
                    span:nth-child(1){
                        font-size:14px;
                        color:rgba(255,255,255,1);
                        line-height:17px;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                    color:rgba(0,190,221,1);
                    } 
                    }
                }
                .col{
                    color: #c49760!important;
                }
                .baCol{
                    background-color:#c49760;
                }
                }
                .next{
                    position: absolute;
                    bottom: 20px;
                    right: 40px;
                    display: flex;
                    p:nth-child(1){
                        width: 21px;
                        height:21px;
                    }
                    p:nth-child(2){
                        width: 37px;
                        height:21px;
                        margin:0 10px;
                        border-radius: 4px;
                        text-align: center;
                        line-height:21px;
                        font-size:11px;
                        color:rgba(255,255,255,1);
                        background-color: #00BEDD;
                    }
                    p:nth-child(3){
                        width: 21px;
                        height:21px;
                    }
                }
            }
            .dayBox{
                margin-left: 21px;
              .capitaBox{
                        margin-top: 21px;
                        width:565px;
                        height:298px;
                        padding-top:19px;
                        p{  
                            display: flex;
                            justify-content:space-between;
                            margin:0px 0 0 19px;
                            font-size:24px;
                            color:rgba(255,255,255,1);
                            span{
                                font-size:14px;
                                color:rgba(221,166,44,1);
                                margin-right:30px;
                            }
                        }
                    }
                    .fileBox{
                        width:565px;
                        height:276px;
                        p{  
                            display: flex;
                            justify-content:space-between;
                            margin:19px 0 15px 19px;
                            font-size:24px;
                            color:rgba(255,255,255,1);
                            span{
                                font-size:14px;
                                color:rgba(221,166,44,1);
                                margin-right:30px;
                            }
                        }
                    }
            }
            .civil-trend{
                width:1105px;
                height:291px;
                padding:20px 0px 0 20px;
                margin:20px 0;
                .title{
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                }
            }
    }
}
</style>
