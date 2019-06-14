<template>
    <div class="outer-inspect-page">
        <date-time moduleName="未检"></date-time>
        <div class="inspect-page-left">
            <div class="left-top">
            <div class="bor_col investigate-box">
                <p class="title">审查逮捕</p>
                <div id="numBox" :style="{width:'250px',height:'235px',display:'inline-block'}"></div>
                <div id="peopleBox" :style="{width:'250px',height:'235px',display:'inline-block'}"></div>    
            </div>
            <div class="bor_col prosecute-box">
                <p class="title">起诉</p>
                <span class="data">生效判决人数：2425人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不起诉率：45%</span>
                <div id="prosecuteNumBox" :style="{width:'250px',height:'235px',display:'inline-block'}"></div>
                <div id="prosecutePeopleBox" :style="{width:'250px',height:'235px',display:'inline-block'}"></div>
            </div>
            </div>
            <div class="left-center">
            <div class="bor_col trendBox">
                <p class="title">案件受理趋势</p>
                <trend-chart :dataIPSxAxis="acceptIPSxAxis" :dataIPS="acceptIPS" ID='accept'
                     width='550px' height='235px' left="30px" right="30px" bottom="10px"
                ></trend-chart>
            </div>
            <div class="bor_col education-box">
                <p class="title">犯罪嫌疑人受教育程度</p>
                 <div id="educationContent" :style="{width: '580px', height: '220px'}"></div>
            </div>
            </div>
            <div class="bor_col percent-box">
                <p>未成年人犯罪占总犯罪百分率<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
                <div id="percent" :style="{width:'1140px',height:'235px'}"></div>
            </div>
        </div>
        <div class="inspect-page-center">
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
         <div class="inspect-map">
             <mapComponent :user="(this.$route.name)"></mapComponent>
         </div>
        </div>
        <div class="inspect-page-right">
            <div class="right-left">
                <div class="bor_col prosecute-box">
                    <p class="module">罪名占比统计</p>
                <p class="title">起诉罪名TOP10</p>
                <p class="label">占比 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次数</p>
                <ol>
                    <li v-for="(item,index) in prosecuteList" :key="index">
                    <i>{{index+1}}</i>
                    <p :style="{backgroundImage:'url('+lineImg+')'}">
                        <span>{{item.title}}</span>
                        <span>{{item.proportion}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.num}}</span>
                    </p>
                    </li>
                </ol>
               </div>
               <div class="bor_col age-box">
                   <p class="title">作案年龄分布</p>
                   <ul>
                       <li v-for="(item,index) in businessList" :key="index">
                        <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}">{{item.num}}</p>
                        <p>{{item.title}}</p>
                       </li>
                   </ul>
               </div>
            </div>
            <div class="right-right">
                <div class="bor_col no-catch">
                    <p class="title">不捕数</p>
                    <progress-bar v-for="(item,index) in noCatchList" :key="index" :ID='index' 
                    title="不构成犯罪不捕人数" :sum="[100]" :num="[20]" :people="item"
                    ></progress-bar>
                </div>
                <div class="bor_col sexual-assault">
                    <p class="title">近几年未成年人性侵犯罪趋势</p>
                    <trend-chart :dataIPSxAxis="assaultIPSxAxis" :dataIPS="assaultIPS" ID='assault' :splitLine="false"
                      width='550px' height='235px' left="30px" right="30px" bottom="12px" :smooth="true"
                    ></trend-chart>
                </div>
                <div class="bor_col against-property">
                    <p class="title">近几年未成年人侵财犯罪趋势</p>
                    <trend-chart :dataIPSxAxis="propertyIPSxAxis" :dataIPS="propertyIPS" ID='property' :barWidth="16"
                     width='550px' height='299px' type='bar' left="30px" right="30px" bottom="10px"
                    ></trend-chart>
                </div>
            </div>
        </div>
        <popup v-if="popupShow" type="%" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
import trendChart from '@/components/sfba/trend-chart.vue'
import progressBar from '@/components/sfba/progress-bar.vue'
import DateTime from '@/components/DateTime.vue'
export default {
     components:{
        mapComponent,
        Popup,
        trendChart,
        progressBar,
        DateTime
    },
    data() {
        return {
            businessList:[
                {img: require('@/public/img/judicature/1@2x.png'),title:'0-10岁',num: 3434},{img: require('@/public/img/judicature/2@2x.png'),title:'10-12岁',num: 3434},
                {img: require('@/public/img/judicature/3@2x.png'),title:'12-14岁',num: 3434},{img: require('@/public/img/judicature/4@2x.png'),title:'15岁',num: 3434},
                {img: require('@/public/img/judicature/5@2x.png'),title:'16岁',num: 3434},{img: require('@/public/img/judicature/6@2x.png'),title:'17岁',num: 35345}
            ],
            prosecuteList:[
                {title:'受理件数',num: 3434,proportion:'20%'},{title:'办结件数',num: 4545,proportion:'20%'},
                {title:'1111',num: 7877,proportion:'20%'},{title:'受理件数',num: 3434,proportion:'20%'},
                {title:'起诉案件数',num: 9090,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'犯罪又犯罪审查逮捕案件',num: 6767,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'批捕逮捕数',num: 1231,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'}
                ],
            lineImg:require('@/public/img/judicature/line.png'),
            assaultIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015',],
            assaultIPS:[20, 60, 50, 80, 120, 100],
            acceptIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015',],
            acceptIPS:[20, 60, 50, 80, 120, 100],
            propertyIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015',],
            propertyIPS:[20, 60, 50, 80, 120, 100],
            dataIPSxAxis:['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019'],
            dataIPS:[20, 60, 50, 80, 120, 100,20,19,60,88],
            slList:[3,2,4,4,9,8],
            bjList:[2,3,4,5,6,7],
            zbList:[1,2,3,4,5,6,7],
            noCatchList:[1,2,3,4,5,6,7],
            popupShow:false,
             popupTitle:'全国各省份人均办结数统计表',
             popupData:[111,222,333,555]
        }
    },
    mounted() {
        this.investigateHandle("numBox",[200],[500],['批捕件数','不捕件数'],'#20F0EF','#F7931E')//批捕件数
        this.investigateHandle("peopleBox",[100],[600],['批捕人数','不捕人数'],'#EAD61F','#2CE2A7')//批捕人数
        this.investigateHandle("prosecuteNumBox",[200],[500],['起诉件数','不起诉件数'],'#F7931E','#31DBE8')//起诉件数
        this.investigateHandle("prosecutePeopleBox",[100],[600],['起诉人数','不起诉人数'],'#49CCFD','#EAD61F')//起诉人数
        this.educationChart()//犯罪嫌疑人受教育程度
        this.percentChart()//未成年人犯罪占总犯罪百分率
    },
    methods: {
        percentChart(){
          var percent =this.$echarts.init(document.getElementById("percent"));
             var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '20%',
                    left: '1%',
                    right: '0%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [{
                    name:'',
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#00FFFF'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        margin: 15,
                        textStyle: {
                            color: 'rab(255,255,255,1)',
                            fontSize:16,
                        },
                        interval:0
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月'],
                }],
                yAxis: [{
                    name:'',
                    type: 'value',
                    // min: 0,
                    // max: 140,
                    // splitNumber: 1,//刻度条数决定距离
                    splitLine:{
                        show:true,
                        lineStyle: { //y轴网格线设置
                            color: 'rgb(0,255,255,0.2)',
                            width: 1,
                            type: 'solid'
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
                        formatter: '{value} %' 
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [ {
                    name: '行政',
                    type: 'bar',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: true,
                        formatter:'{c}%',//要后台返回百分比
                        position: 'top',
                        textStyle: {
                            color: 'rgba(5,195,255,1)',
                            fontSize:16
                        }
                    },
                    barWidth:43,
                    itemStyle: {
                        normal: {
                            color:'#11C6FF'
                        }
                    },
                    data: [400,1000,111,222,333,444,555,666,777,888,999]
                }
                ]
            };
             percent.setOption(option,true);  
        },
        educationChart(){
            var educationContent =this.$echarts.init(document.getElementById("educationContent"));
            var option = {
               color: ['#F78350', '#26A3EF', '#31DBE8', '#2CE2A7','#EAD61F','#F7931E'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        orient: 'vertical',
        right: '15%',
        bottom:'8%',
        itemGap:15,
        data: ['文盲','小学','初中','高中','中专','其他'],
        itemWidth: 12,
        itemHeight:12,
        textStyle:{
            color:'#ffffff',
            fontSize:'14'
        }
    },
    series : [
        {
            name: '犯罪嫌疑人受教育程度',
            type: 'pie',
            radius : '70%',//数组时内，外
            center: ['40%', '55%'],//x，y
            label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        // position:'inner', //标签的位置
                        textStyle : {
                            color:'rgba(255,255,255,1)',
                            fontSize : 16    //文字的字体大小
                        },
                        formatter:'{d}%'    
                            }
                        },
            data:[
                {value:335, name:'文盲'},
                {value:310, name:'小学'},
                {value:234, name:'初中'},
                {value:135, name:'高中'},
                {value:135, name:'中专'},
                {value:135, name:'其他'},
            ],
        }
    ]
};
            educationContent.setOption(option,true);
        },
        investigateHandle(ID,num1,num2,legend,col1,col2){
            var ID = this.$echarts.init(document.getElementById(ID));
             var option = {
                tooltip: {},
                legend: {
                    show:true,
                    // orient: 'vertical',
                    left: '35%',
                    bottom:'5%',
                    data:legend,
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
                        show:false,
                        textStyle: {
                            color: 'rab(255,255,255,1)',
                            fontSize:16,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['批捕件数'],
                }],
                yAxis: [{
                    name:'',
                    type: 'value',
                    min: 0,
                    show:false,
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
                    name: legend[0],
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
                            color:col1
                        }
                    },
                    data:num1
                },
                {
                    name:legend[1],
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
                          color:col2
                        }
                    },
                    data: num2
                }
                ]
            };
            ID.setOption(option,true)
        }
    }
}
</script>
<style lang="scss" scoped>
.outer-inspect-page{
    width:100%;
    height:100%;
    display: flex;
    padding-top:65px;
    .inspect-page-left{
        position: relative;
            .left-top{
                display: flex;
        .investigate-box,.prosecute-box{
            width:604px;
            height:290px;
            padding:20px 0 0 20px;
            position: relative;
            .title{
                  font-size:24px;
                  font-family:MicrosoftYaHei;
                  color:rgba(255,255,255,1);
                  }
        }
        .prosecute-box{
            margin-left:20px;
            .data{
                font-size:16px;
                font-family:MicrosoftYaHei;
                color:rgba(10,241,255,1);
                position: absolute;
                top:20px;
                left: 140px;
            }
        }
            }
            .left-center{
                display: flex;
                margin:19px 0;
        .trendBox{
                margin-right:20px;
                width: 604px;
                height:290px;
                padding:20px 0 0 20px;
                position: relative;
                .title{
                  font-size:24px;
                  font-family:MicrosoftYaHei;
                  color:rgba(255,255,255,1);
                  }
            }
            .education-box{
                width: 604px;
                height:290px;
                padding:20px 0 0 20px;
                .title{
                  font-size:24px;
                  font-family:MicrosoftYaHei;
                  color:rgba(255,255,255,1);
                  }
            }
            }
            .percent-box{
                        width:1228px;
                        height:295px;
                        padding:20px 0 0 20px;
                        p{  
                            display: flex;
                            justify-content:space-between;
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
    .inspect-page-center{
        width: 1331px;
        margin:0 20px;
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
        .inspect-map{
            width:1331px;
            height:869px;
            background:rgba(0,0,0,0.4);
            border:1px solid rgba(1,218,226,1);
        }
    }
    .inspect-page-right{
        display: flex;
        width:1160px;
        .right-left{
            .prosecute-box{
                width:541px;
                height:581px;
                padding:20px 50px 5px 20px;
                position: relative;
                .module{
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                }
                .title{
                font-size:20px;
                font-family:MicrosoftYaHei;
                color:rgba(30,239,247,1);
                margin-left:170px;
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
                    width:21px;
                    height:21px;
                    text-align: center;
                    line-height:20px;
                    border-radius:50%;
                    margin-right:10px;
                    background-color: #33d1f8;
                    margin-top:-21px;
                    font-size:11px;
                    color:rgba(255,255,255,1);
                    }
                    p{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width:100%;
                    height:40px;
                    padding-bottom:13px;
                    margin-bottom:9px;
                    background-repeat: no-repeat;
                    background-position-y: bottom;
                    span:nth-child(1){
                        font-size:18px;
                        color:rgba(255,255,255,1);
                        line-height:22px;
                    }
                    span:nth-child(2){
                        font-size: 15px;
                    color:rgba(0,190,221,1);
                    } 
                    }
                }
                li:nth-child(1),li:nth-child(2),li:nth-child(3){
                    i{
                    background-color:#c49760;
                    }
                    color: #d73b3c;
                    span:nth-child(2){
                    color: #F7931E;
                    }
                }
                li:nth-child(10){
                    p{
                    background-image: none !important;
                    }
                }
                }
            }
            .age-box{
                margin-top:20px;
             margin-bottom:20px;
            padding:10px 0 0 20px;
            width:541px;
            height:312px;
            .title{
                font-size:24px;
                color:rgba(255,255,255,1);
            }
            ul{  
                display: flex;
                flex-wrap: wrap;
                li{ 
                    text-align: center;
                    margin:15px 33px 0 33px;
                    p:nth-child(1){
                        width:90px;
                        height:90px;
                        line-height:90px;
                        font-size:16px;
                        font-family:PingFangSC-Semibold;
                        font-weight:600;
                        color:rgba(255,255,255,1);
                    }
                    p:nth-child(2){
                        margin-top:6px;
                        font-size:14px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
        }
        .right-right{
            margin-left:20px;
            .no-catch{
                width:599px;
                height:222px;
                padding:20px 0px 0 20px;
                display: flex;
                justify-content: space-around;
                flex-wrap:wrap;
                .title{
                    width:215px;
                    text-indent: -34px;
                    height:27px;
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                }
            }
            .sexual-assault{
                width:599px;
                height:290px;
                padding:20px 0px 0 20px;
                margin:20px 0;
                .title{
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                }
            }
            .against-property{
                width:599px;
                height:357px;
                padding:20px 0px 0 20px;
                .title{
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                }
            }
        }
    }
    
}
</style>
