<template>
    <div class="outer-administrative-page">
        <date-time moduleName="行政"></date-time>
        <div class="administrative-page-left">
            <div class="left-top">
                <div class="condition-box">
                    <p class="title">受理情况</p>
                    <ul>
                        <p class="line"></p>
                        <li v-for="(item,index) in conditionList" :key="index">
                            {{item.title}}
                            <span>{{item.num}}</span> 
                        </li>
                        
                    </ul>
                </div>
                <div class="behavior-box">
                    <p class="title">违法行为监督</p>
                    <ol>
                        <li v-for="(item,index) in behaviorList" :key="index">
                            <span>{{item.title}}</span>
                            <span></span>
                            {{item.num}}
                        </li>
                    </ol>
                </div>
              </div>
            <div class="judgment-box">
                <p class="title">生效裁判监督</p>
                <ul>
                    <li v-for="(item,index) in judgmentList" :key="index">
                        <p>{{item.title}}</p>
                        <p>{{item.num}}</p>
                    </li>
                </ul>
            </div>
            <div class="tendency-box">
                <span class="bg_img" @click="retreatHandle" :style="{backgroundImage:'url('+topImg+')'}"></span>
                <span class="bg_img" @click="advanceHandle" :style="{backgroundImage:'url('+bottomImg+')'}"></span>
                <p class="title">受理案件趋势分析</p>
                <div id="trendContent" :style="{width: '1230px', height: '220px'}"></div>
            </div>
        </div>
        <div class="administrative-page-center">
            <div class="sum">
         <div class="accept">
             受理总数
             <ul>
                 <li v-for="(item,index) in slList" :key="index">{{item}}</li>
             </ul>
         </div>
         <div class="conclude">
             办结总数
             <ol>
                 <li v-for="(item,index) in bjList" :key="index">{{item}}</li>
             </ol>
         </div>
         <div class="office">
             在办总数
             <ul>
                 <li v-for="(item,index) in zbList" :key="index">{{item}}</li>
             </ul>
         </div>
         </div>
         <div class="administrative-map">
             <mapComponent :user="(this.$route.name)"></mapComponent>
         </div>
        </div>
        <div class="administrative-page-rihgt">
            <div class="right-left">
            <div class="execute">
                <p class="title">执行活动监督</p>
                <ol>
                        <li v-for="(item,index) in executeList" :key="index">
                            <span>{{item.title}}</span>
                            <span></span>
                            {{item.num}}
                        </li>
                </ol>
            </div>
            <div class="classify">
                <p class="title">受理数分类情况统计</p>
                <div id="classifyContent" :style="{width: '500px', height: '225px'}"></div>
            </div>
            </div>
            <div class="nature">
                <p class="title">案件性质</p>
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
            <div class="capitaBox">
                <p>人均办结数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
                <div id="capita" :style="{width:'470px',height:'255px'}"></div>
            </div>
            <div class="fileBox">
                    <p>案均办理天数<span @click="popupShow=true;popupTitle='全国各省份案均办理天数统计表'">更多>></span></p>
                    <div id="file" :style="{width:'470px',height:'225px'}"></div>
            </div>
        </div>
        <popup v-if="popupShow" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    components:{
        mapComponent,
        Popup,
        DateTime
    },
    data() {
        return {
            col:true,
            num:1,
            sum:3,
            topImg: require('@/public/img/judicature/top@2x.png'),
            bottomImg: require('@/public/img/judicature/bottom@2x.png'),
            conditionList:[
                {title:'受理件数',num:23456},{title:'受理件数',num:23456},
                {title:'受理件数',num:23456},{title:'受理件数',num:23456},
                {title:'受理件数',num:23456},{title:'受理件数',num:23456},
            ],
            behaviorList:[
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434}
            ],
            judgmentList:[
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},
                {title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434}
            ],
            slList:[3,2,4,4,9,8],
            bjList:[2,3,4,5,6,7],
            zbList:[1,2,3,4,5,6,7],
            executeList:[
                {title:'提晚饭出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},{title:'提出抗诉数',num: 3434},
                {title:'诉数',num: 3434},{title:'抗诉数',num: 3434}
            ],
            lineImg:require('@/public/img/judicature/line.png'),
            leftImg:require('@/public/img/judicature/left.png'),
            rightImg:require('@/public/img/judicature/right.png'),
            dataIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            dataIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            sortList:[
                {title:'受理件数',num: 3434,proportion:'20%'},{title:'办结件数',num: 4545,proportion:'20%'},
                {title:'1111',num: 7877,proportion:'20%'},{title:'受理件数',num: 3434,proportion:'20%'},
                {title:'起诉案件数',num: 9090,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'犯罪又犯罪审查逮捕案件',num: 6767,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'批捕逮捕数',num: 1231,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'}],
             popupShow:false,
             popupTitle:'全国各省份人均办结数统计表',
             popupData:[111,222,333,555]
        }
    },
    watch: {
        // popupShow(val){
        //     this.$emit('update:show',val)
        // },
        // show(val){
        //     this.popupShow=val
        // }
    },
    mounted(){
        this.trendHandle()//受理案件趋势分析
        this.classifyHandle()//受理数分类情况统计
        this.capitaHandle()//人均办结数
        this.fileHandle()//案均办理天数
    },
    methods: {
        advanceHandle(){//后一年
            this.dataIPSxAxis.push('2020')
            this.dataIPSxAxis.splice(0,1);
            this.dataIPS.push(111)
            this.dataIPS.splice(0,1)
            this.trendHandle()
            console.log('后一年')
        },
        retreatHandle(){//前一年
            this.dataIPSxAxis.unshift('2009')
            this.dataIPSxAxis.splice(10,1);
            this.dataIPS.unshift(88)
            this.dataIPS.splice(10,1)
            this.trendHandle()
            console.log('前一年')
        },
        popupHandle(){

        },
        previousHandle(){
            if(this.num!=1){
                this.num--
                if(this.num==1){this.col=true}
            }
        },//上一页
        downHandle(){
            if(this.num!=3){
                this.num++
                this.col=false
            }
        },//下一页
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
                    data: ['1月', '2月', '3月', '4月', '5月' ],
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
        classifyHandle(){
            var classifyContent =this.$echarts.init(document.getElementById("classifyContent"));
            var option = {
               color: ['#6EB21F', '#31DBE8', '#EAD61F'],
               bottom:'10%',
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比,
        textStyle:{
            fontSize:14,
            color:'rgba(255,255,255,1)'
        }
    },
    legend: {
        show:false,
        orient: 'vertical',
        right: '0%',
        bottom:'10%',
        data: ['0-18岁','18-25岁','25-35岁'],
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
            radius : ['0%','70%'],//数组时内，外
            center: ['51%', '45%'],//x，y
            data:[
                {value:335, name:'执行活动监督'},
                {value:310, name:'违法行为监督'},
                {value:234, name:'生效裁判监督'}
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
            classifyContent.setOption(option,true)
        },
        trendHandle(){
            var trendContent = this.$echarts.init(document.getElementById("trendContent"));
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
                color: ["#0080ff", "#4cd5ce"],
                toolbox: {
                    // feature: {
                    //     saveAsImage: {}
                    // }
                },
                grid: {
                    left: '75px',
                    top: '35px',
                    right: '10px',
                    bottom: '10px',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: this.dataIPSxAxis,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            show:false,
                            color: 'rgba(255,255,255,1)',
                            fontSize: 12,
                        },
                        margin:20
                    },
                    axisTick: {
                            show: false //隐藏X轴刻度
                        },
                    axisLine: {
                        show:true,
                        lineStyle: {
                            color: '#2EA7E0',
                            width: 0.5, //这里是为了突出显示加上的
                        }
                    },
                    
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
                        show: false,
                        lineStyle: { //y轴网格线设置
                            color: '#0a2b52',
                            width: 1,
                            type: 'solid'
                        }
                    },
                }],
                series: [
                    {
                        name: '',
                        type: 'line',
                        smooth: false,
                        //  symbol: "none", //去掉折线点
                        stack: 100,
                        label: {
                            show:true,
                            position: 'top',
                            textStyle: {
                                color: '#0BE5F1',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }
                        },
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,255,255, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,255,255, 0)' // 100% 处的颜色
                                }]), //背景渐变色
                                lineStyle: { // 系列级个性化折线样式
                                    width: 0.5,
                                    type: 'solid',
                                    color: "#02675f"
                                }
                            },
                            emphasis: {
                                color: '#02675f',
                                lineStyle: { // 系列级个性化折线样式
                                    width: 0.5,
                                    type: 'dotted',
                                    color: "#02675f" //折线的颜色
                                }
                            }
                        }, //线条样式
                        symbolSize: 5, //折线点的大小
                        areaStyle: {
                            normal: {}
                        },
                        data: this.dataIPS,
                    },
                ]
            };
           // 绘制图表
           trendContent.setOption(option,true);
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-administrative-page{
    display: flex;
    padding-top:65px;
    .administrative-page-left{
        width:1283px;
        position: relative;
        // .tab{
        //         position: absolute;
        //         top:-88px;
        //         left:30px;
        //         font-size:22px;
        //         font-family:PingFangSC-Regular;
        //         font-weight:400;
        //         color:rgba(48,226,226,1);
        //         span{
        //             display: inline-block;
        //             border-radius: 50%;
        //             width:12px;
        //             height:12px;
        //             background:rgba(48,226,226,1);
        //         }
        //     }
        .left-top{
            display: flex;
            width:100%;
        }
        .condition-box{
            padding: 20px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            width:631px;
            height:345px;
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
            ul{  
                margin-left:165px;
                position: relative;
                .line{
                    position: absolute;
                    left:133px;
                    top:0px;
                    width:1px;
                    height:287px;
                    background-color:#00FFFF;
                }
                li{ 
                    display: flex;
                    justify-content: space-between;
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                    padding: 11px 20px;
                    width:260px;
                    border-bottom:1px solid #00FFFF;
                }
                li:last-child{
                    border-bottom:none;
                }
            }
        }
        .behavior-box{
            margin-left:20px;
            padding: 20px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            width:631px;
            height:340px;
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
            ol{ 
                margin-left:30px;
                margin-top:30px;
                li{ 
                    font-size:18px;
                    color:rgba(255,255,255,1);
                    margin-bottom:30px;
                    span:nth-child(1){
                        font-size:18px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(0,255,255,1);
                        display: inline-block;
                        width:145px;
                        text-align: right;
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
        .judgment-box{
            margin:19px 0;
            padding: 20px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            width:1281px;
            height:238px;
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
            ul{ 
                margin-left:100px;
                margin-top:27px;
                display: flex;
                li{
                    margin-right:39px;
                    width:131px;
                    height:131px;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p:nth-child(1){
                        font-size:14px;
                        color:rgba(255,255,255,1);
                    }
                    p:nth-child(2){
                        margin-top:7px;
                        font-size:24px;
                        color:rgba(255,255,255,1);
                    }
                }
                li:nth-child(1){background-color:#24D3B1 }
                li:nth-child(2){background-color:#26A3EF }
                li:nth-child(3){background-color:#6EB21F }
                li:nth-child(4){background-color:#EAD61F }
                li:nth-child(5){background-color:#25BDE5 }
                li:nth-child(6){background-color:#31DBE8 }
            }
        }
        .tendency-box{
            // margin-top:10px;
            padding: 20px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            width:1281px;
            height:295px;
            position: relative;
            span{
                position: absolute;
                color:#FFFFFF;
                font-size:20px;
                z-index:2;
                display: inline-block;
                width:14px;
                height:14px;
            }
            span:nth-child(1){  
                bottom:30px;
                left:124px;
            }span:nth-child(2){
                bottom:30px;
                right:44px;
            }
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
        }
    }
    .administrative-page-center{
        width: 1331px;
        margin:0 19px 0 17px;
        position: relative;
        padding-top:45px;
        .sum{
            position: absolute;
            top:-39px;
            left:0;
            width:100%;
            display: flex;
        }
        .accept{
            margin-left: 300px;
        }
        .conclude{
            margin:0 44px;
        }
        .accept,.office,.conclude{
            font-size:18px;
            color:rgba(11,193,244,1);
            line-height:22px;
            text-align: center;
            ul,ol{
                    display: flex;
                    margin-top:10px;
                    li{
                        width:25px;
                        height:41px;
                        text-align: center;
                        line-height:44px;
                        border-radius:4px;
                        background: -webkit-linear-gradient(#0BE5F1, #0C99F7); /* Safari 5.1 - 6.0 */
                        background: -o-linear-gradient(#0BE5F1, #0C99F7); /* Opera 11.1 - 12.0 */
                        background: -moz-linear-gradient(#0BE5F1, #0C99F7); /* Firefox 3.6 - 15 */
                        background: linear-gradient(#0BE5F1, #0C99F7); /* 标准的语法（必须放在最后） */
                        font-size:36px;
                        color:rgba(255,255,255,1);
                        margin-left:4px;
                        margin-bottom:5px;
                    }
            }
        }
        .administrative-map{
            width:1331px;
            height:869px;
            background:rgba(0,0,0,0.4);
            border:1px solid rgba(1,218,226,1);
        }
    }
    .administrative-page-rihgt{
        display: flex;
        flex-wrap:wrap;
        width:1106px;
        .right-left{
        .execute{
            padding:8px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            width:544px;
            height:299px;
            margin:0 20px 20px 0;
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
            ol{ 
                margin-left:10px;
                margin-top:20px;
                li{ 
                    font-size:18px;
                    color:rgba(255,255,255,1);
                    margin-bottom:25px;
                    span:nth-child(1){
                        font-size:18px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(0,255,255,1);
                        display: inline-block;
                        width:145px;
                        text-align: right;
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
        .classify{
            width:544px;
            height:278px;
            padding:18px 0 0 20px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            margin-bottom:20px;
            .title{
            font-size:24px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            }
        }
        }
        .nature{
            width:541px;
            height:597px;
            padding:60px 49px 0 40px;
            border:1px solid #00FFFF;
            border-radius: 8px;
            background: rgba(0,178,226, 0.2);
            margin-bottom:20px;
            position: relative;
            .title{
                position: absolute;
                left:33px;
                top:15px;
                font-size:24px;
                font-family:MicrosoftYaHei;
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
        .capitaBox{
                        width:544px;
                        height:292px;
                        padding-top:19px;
                        border:1px solid #00FFFF;
                        border-radius: 8px;
                        background: rgba(0,178,226, 0.2); 
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
                       margin-left:20px;
                        width:541px;
                        height:292px;
                        border:1px solid #00FFFF;
                        border-radius: 8px;
                        background: rgba(0,178,226, 0.2); 
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
}
</style>
