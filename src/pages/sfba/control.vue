<template>
    <div class="outer-control-page">
        <date-time moduleName="控申"></date-time>
        <div class="control-page-left">
            <div class="left-left">
                <div class="bor_col sue">
                    <p class="title">控告受结案数</p>
                    <ul>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                    </ul>
                </div>
                <div class="bor_col appeal">
                    <p class="title">申诉受结案数</p>
                    <ul>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                        <li>
                            <p>23244222</p>
                            <p>控告检察案件受理数</p>
                        </li>
                    </ul>
                </div>
                <div class="bor_col performance">
                    <p class="title">案件绩效分析</p>
                    <ol>
                        <li class="li1"></li><li class="li2">办结数</li><li class="li3">案均办结天数</li>
                        <li class="li4">控告</li><li class="li5">218344</li><li class="li6">5</li>
                        <li class="li7">申控</li><li class="li8">218344</li><li class="li9">4</li>
                    </ol>
                </div>
            </div>
            <div class="left-right">
                <div class="bor_col court">
                    <p class="title">不服法院生效刑事裁判案件办理情况</p>
                    <div id="courtBox" :style="{width:'540px',height:'300px'}"></div>
                    <div class="lagend">
                        <div>
                        <p><span class="span1"></span>&nbsp;&nbsp;&nbsp;受理件数</p>
                        <p><span class="span2"></span>&nbsp;&nbsp;&nbsp;提请、提起抗诉数</p>
                        </div>
                        <div>
                        <p><span class="span3"></span>&nbsp;&nbsp;&nbsp;立案复查数</p>
                        <p><span class="span4"></span>&nbsp;&nbsp;&nbsp;提出再审检察建议数</p>
                        </div>
                    </div>
                </div>
                <div class="bor_col office">
                    <p class="title">不服检察机关处理决定案件办理情况</p>
                    <div id="officeBox" :style="{width:'540px',height:'350px'}"></div>
                </div>
            </div>
        </div>
        <div class="control-page-center">
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
         <div class="control-map">
             <mapComponent :user="(this.$route.name)"></mapComponent>
         </div>
        </div>
        <div class="control-page-right">
            <div class="bor_col letter">
                 <p>信访<em @click="popupShow=true;popupTitle='全国各省份受理信访分流办理件数'">更多>></em></p>
                 <p class="title">受理信访分流办理件数</p>
                 <ul>
                     <li v-for="(item,index) in xfList" :key="index">
                            <i>{{item.title}}</i>
                            <span></span>
                            {{item.num}}
                     </li>
                 </ul>
            </div>
            <div class="right-right">
                <div class="bor_col clue-page">
                    <p>举报线索<em @click="popupShow=true;popupTitle='全国各省份举报线索案件办理情况'">更多>></em></p>
                    <p class="title">举报线索案件办理情况</p>
                    <div id="clueBox" :style="{width:'540px',height:'200px'}"></div>
                </div>
                <div class="bor_col compensate-page">
                    <p class="title">国家赔偿案件办理情况</p>
                    <ul>
                        <li>
                            <p id="acceptBox" :style="{width:'86px',height:'86px'}"></p>
                            <p>846,344,22</p>
                            <p>国家赔偿受理件数</p>
                        </li>
                        <li>
                            <p id="giveBox" :style="{width:'86px',height:'86px'}"></p>
                            <p>846,344,22</p>
                            <p>决定给予赔偿件数</p>
                        </li>
                        <li>
                            <p id="putBox" :style="{width:'86px',height:'86px'}"></p>
                            <p>846,344,22</p>
                            <p>立案件数</p>
                        </li>
                        <li>
                            <p class="bg_img pay" :style="{backgroundImage:'url('+payImg+')'}"></p>
                            <p>846,344元</p>
                            <p>决定支付赔偿金额</p>
                        </li>
                    </ul>
                </div>
                <div class="bor_col salvation-page">
                    <p class="title">司法救助案件办理情况</p>
                    <table>
                    <tr>
                    <th>受理件数</th>
                    <th>同意救助件数</th>
                    <th>同意救助人数</th>
                    <th>发放救助件数</th>
                    <th>发放救助人数</th>
                    </tr>
                    <tr>
                    <td>123,234,32</td>
                    <td>123,234,32</td>
                    <td>123,234,32</td>
                    <td>123,234,32</td>
                    <td>123,234,32</td>
                    </tr>
                    </table>
                    <ol>
                        <li>生效任判决人数</li>
                        <li>234,342,34</li>
                        <li>发放救助金额</li>
                        <li>234,342,34</li>
                    </ol>
                </div>
            </div>
        </div>
        <popup v-if="popupShow" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import DayBox from '@/components/DayBox.vue'
import Popup from '@/components/Popup.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    components:{
        mapComponent,
        Popup,
        DayBox,
        DateTime
    },
    data() {
        return {
            payImg:require('@/public/img/judicature/pay.png'),
            slList:[3,2,4,4,9,8],
            bjList:[2,3,4,5,6,7],
            zbList:[1,2,3,4,5,6,7],
            xfList:[
             {title:'北京',num: 13434},{title:'北京',num: 4545},{title:'北京',num: 7877},
             {title:'北京',num: 9090},{title:'北京',num: 1231},{title:'北京',num: 7877},
             {title:'北京',num: 13434},{title:'北京',num: 4545},{title:'北京',num: 7877},
             {title:'北京',num: 9090},{title:'北京',num: 1231},{title:'北京',num: 7877}
             ],
             popupShow:false,
             popupTitle:'全国各省份人均办结数统计表',
             popupData:[111,222,333,555]
        }
    },
    mounted() {
        this.courtHandle()//不服法院生效刑事裁判案件办理情况
        this.officeHandle()//不服检察机关处理决定案件办理情况
        this.xfHandle()//信访
        this.clueBoxHandle()//举报线索
        this.scheduleHandle("acceptBox",100,100,['#2FE0BE','rgba(47,224,190,0.2)'])//国家赔偿 受理件数
        this.scheduleHandle("giveBox",1000,350,['#EDC121','rgba(237,193,33,0.2)'])//决定给予 赔偿件数
        this.scheduleHandle("putBox",1000,95,['#31DCFF','rgba(49,220,255,0.2)'])//立案件数
    },
    methods: {
        clueBoxHandle(){
            var clueBox =this.$echarts.init(document.getElementById("clueBox"));
         var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '10%',
                    left: '1%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: false,
                        lineStyle: {
                            color: 'rgba(107,227,249,0.6)'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: 'rgba(255,255,255,1)',
                            fontSize:14,
                            fontFamily:'MicrosoftYaHei',
                            margin: 15,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['北京', '河北', '山东', '广东'],
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
                            color: 'rgba(233,233,233,0.4)',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle:{
                            color:'#00FFFF'
                        },
                        show: false,
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
                    name: 'dotted',
                    type: 'pictorialBar',
                    symbol: '',
                    itemStyle: {
                        normal: {
                            color: 'rgba(38,202,252,0.3)'
                        }
                    },
                    symbolRepeat: true,//则一组重复的图形来代表一个数据项。
                    symbolSize: [32, 6],
                    symbolMargin: 1,
                    z: -10,
                    data: [500,500,500,500]
                },
                {
                    name: 'dotted',
                    type: 'pictorialBar',
                    symbol: '',
                    itemStyle: {
                        normal: {
                            color: '#26CAFC'
                        }
                    },
                    symbolRepeat: true,//则一组重复的图形来代表一个数据项。
                    symbolSize: [32, 6],
                    symbolMargin: 1,
                    z: 10,
                    data: [200,300,400,700]
                }]
            };
            clueBox.setOption(option,true)
        },
        scheduleHandle(ID,sum,num,color){
            var box = this.$echarts.init(document.getElementById(ID));
	    var option = {
            color:color,
        	title:{
			        show:true,
			        text:(Math.floor(num/sum*100*100)/100)+'%',
			        x:'center',
		        	y:'center',
			        textStyle: {
	                    fontSize: '18',
	                    color:'#1EEFF7',
                        fontWeight: '600',
                        fontFamily:'PingFangSC-Semibold'
	                }
		       },
		    tooltip: {
		        trigger: 'item',
		        formatter: "{d}%",
		        show:false
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        show:false
		    },
		    series: 
		        {
		            name:'',
		            type:'pie',
		            radius: ['65%', '90%'],
		            avoidLabelOverlap: true,
		            hoverAnimation:false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: false
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		                {value:num, name:''},
		                {value:sum-num, name:''}
		            ]
		        }
		    
		};
// 绘制图表
      box.setOption(option,true);
        },
        xfHandle(){
            let rjget = document.querySelectorAll('.letter span')
            let sum=0;
            for (let i = 0; i < this.xfList.length; i++) {
                const element = this.xfList[i].num;
                sum = sum+element
            }
            for (let i = 0; i < rjget.length; i++) {
                const el = rjget[i];
                const num = this.xfList[i].num 
                el.style.width=(num/sum*2000)+'px'
            }
        },
        officeHandle(){
            var officeBox =this.$echarts.init(document.getElementById("officeBox"));
           var option = {
                grid: {
                    left: '4%',
                    right: '8%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name:'件数',
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
                    data: ['受理件数', '立案复查数', '法院改变原判定数'],
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
                    barWidth:28,
                    itemStyle: {
                            normal: {
                                color:function (params){
                                    var colorList = ['#2FE0BE','#F7931E','#31DCFF'];
                                    return colorList[params.dataIndex];
                                }
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
                    data: [22, 33, 44]
                }]
            };
            officeBox.setOption(option,true)
        },
        courtHandle(){
            var courtBox =this.$echarts.init(document.getElementById("courtBox"));
             var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '25%',
                    left: '5%',
                    right: '10%',
                    bottom: '0%',
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
                        textStyle: {
                            color: 'rab(255,255,255,1)',
                            fontSize:16,
                            margin: 20,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['','','',''],
                }],
                yAxis: [{
                    name:'件数',
                    type: 'value',
                    min: 0,
                    // max: 140,
                    // splitNumber: 1,//刻度条数决定距离
                    splitLine:{
                        show:false,
                        lineStyle: { //y轴网格线设置
                            color: '#383939',
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
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [ {
                    name: '民事公益诉讼',
                    type: 'bar',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: true,
                        position: 'top',
                        textStyle: {
                            // color: '#31DBE8',
                            fontSize:14
                        }
                    },
                    barWidth:43,
                    itemStyle: {
                        normal: {
                            color:function (params){
                                    var colorList = ['#11C6FF','#F7931E','#2FE0BE','#8766FE'];
                                    return colorList[params.dataIndex];
                                }
                            }
                    },
                    data: [400,1000,111,222]
                },
                ]
            };
             courtBox.setOption(option,true);
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-control-page{
    width:100%;
    height:100%;
    display: flex;
    padding-top:65px;
    .control-page-left{
        display: flex;
        width:1228px;
        .left-left{
          position: relative;
            .appeal,.sue{
                width:610px;
                height:291px;
                padding:20px 0 0 20px;
                margin-bottom:20px;
                .title{
                        font-size:24px;
                        color:rgba(255,255,255,1);
                        font-family:MicrosoftYaHei;
                        margin-bottom:33px;
                       }
                ul{
                    margin:33px 0 0 0px;
                    display: flex;
                    color:rgba(255,255,255,1);
                    justify-content: space-around;
                    li{
                        p:nth-of-type(1){
                            width:134px;
                            height:134px;
                            border-radius:50%;
                            text-align: center;
                            line-height:134px;
                            margin-bottom:20px;
                        }
                    }
                    li:nth-child(1){
                        p:nth-child(1){
                            font-size: 22px;
                            background:linear-gradient(146deg,rgba(237,193,33,1) 0%,rgba(232,154,15,1) 100%);
                        }
                        p:nth-child(2){
                            font-size: 16px;
                        }
                    }
                    li:nth-child(2){
                        p:nth-child(1){
                            font-size: 22px;
                            background:linear-gradient(146deg,rgba(49,226,214,1) 0%,rgba(34,177,228,1) 100%);
                        }
                        p:nth-child(2){
                            font-size: 16px;
                        }
                    }
                    li:nth-child(3){
                        p:nth-child(1){
                            font-size: 22px;
                            background:linear-gradient(146deg,rgba(113,72,241,1) 0%,rgba(61,47,236,1) 100%);
                        }
                        p:nth-child(2){
                            font-size: 16px;
                        }
                    }
                }
            }
            .appeal{
                ul{
                    li:nth-child(1){
                    p:nth-child(1){
                        background:linear-gradient(146deg,rgba(33,188,237,1) 0%,rgba(15,113,232,1) 100%);
                    }
                    }
                    li:nth-child(2){
                        p:nth-child(1){
                            background:linear-gradient(146deg,rgba(49,226,214,1) 0%,rgba(34,177,228,1) 100%);
                        }
                    }
                    li:nth-child(3){
                        p:nth-child(1){
                            background:linear-gradient(146deg,rgba(44,229,198,1) 0%,rgba(23,217,191,1) 100%);
                        }
                    }
                }
            }
            .performance{
                width:610px;
                height:290px;
                padding:20px 0 0 20px;
                .title{
                        font-size:24px;
                        color:rgba(255,255,255,1);
                        font-family:MicrosoftYaHei;
                       }
                ol{ 
                    display: flex;
                    flex-wrap: wrap;
                    width:502px;
                    margin:29px 0 0 34px;
                    li{
                        width:165px;
                        height:64px;
                        border-top:1px solid rgba(0,248,250,1);
                        border-right:1px solid rgba(0,248,250,1);
                        text-align: center;
                        line-height:64px;
                        font-family:MicrosoftYaHei;
                        font-size:18px;
                    }
                    .li1,.li4,.li7{
                        color:rgba(255,255,255,1);
                        border-left:1px solid rgba(0,248,250,1);
                    }
                    .li2,.li5,.li8{
                        color:#F7931E;
                    }
                    .li3,.li6,.li9{
                        color:#00FFFF;
                    }
                    .li7,.li8,.li9{
                        border-bottom:1px solid rgba(0,248,250,1);
                    }
                }
            }
        }
        .left-right{
        margin-left:20px;
       .court{
           width:598px;
           height:448px;
           padding:20px 0 0 20px;
           position: relative;
           margin-bottom:20px;
           .title{
            font-size:24px;
            color:rgba(255,255,255,1);
            font-family:MicrosoftYaHei;
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
                .span1{background-color:#11C6FF;}
                .span2{background-color:#2FE0BE;}
                .span3{background-color:#F7931E;}
                .span4{background-color:#8766FE}
            }
       }
       .office{
           width:598px;
           height:445px;
           padding:20px 0 0 20px;
           position: relative;
           margin-bottom:20px;
           .title{
            font-size:24px;
            color:rgba(255,255,255,1);
            font-family:MicrosoftYaHei;
                 }
       }
    }
    }
    .control-page-center{
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
        .control-map{
            width:1331px;
            height:869px;
            background:rgba(0,0,0,0.4);
            border:1px solid rgba(1,218,226,1);
        }
    }
    .control-page-right{
        width:1161px;
        display: flex;
        .letter{
            width:541px;
            height:909px;
            padding:20px 0 0 20px;
            p:nth-of-type(1){  
                display: flex;
                justify-content:space-between;
                font-size:24px;
                font-family:MicrosoftYaHei;
                color:rgba(255,255,255,1);
                  em{
                        font-size:14px;
                        color:rgba(221,166,44,1);
                        margin-right:30px;
                      }
             }
             .title{
                 font-size:20px;
                font-family:MicrosoftYaHei;
                color:rgba(30,239,247,1);
                text-align: center;
                margin:28px 0 50px 0;
             }
             ul{ 
                 margin-left:33px;
                 li{
                     margin-bottom:39px;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    font-size:12px;
                    color:rgba(255,255,255,1);
                    line-height:14px;
                    i {
                    display: inline-block;
                    font-size:16px;
                    font-family:MicrosoftYaHei;
                    color:rgba(255,255,255,1);
                    line-height:22px;
                    }
                    font-size:18px;
                    font-family:MicrosoftYaHei;
                    color:rgba(49,220,255,1);
                    span {
                        display: inline-block;
                        border-radius: 14px;
                        width: 146px;
                        height: 8px;
                        margin: 0 11px 0 28px;
                        background: -webkit-linear-gradient(
                        left,
                        #43F4FE,
                        #1CDFFD
                        ); /* Safari 5.1 - 6.0 */
                        background: -o-linear-gradient(
                        right,
                        #43F4FE,
                        #1CDFFD
                        ); /* Opera 11.1 - 12.0 */
                        background: -moz-linear-gradient(
                        right,
                        #43F4FE,
                        #1CDFFD
                        ); /* Firefox 3.6 - 15 */
                        background: linear-gradient(
                        to right,
                        #43F4FE,
                        #1CDFFD
                        ); /* 标准的语法（必须放在最后） */
                    }
                 }
             }
        }
        .right-right{
            margin-left:20px;
            .clue-page{
                width:599px;
                height:290px;
                padding:20px 0 0 20px;
                p:nth-of-type(1){  
                display: flex;
                justify-content:space-between;
                font-size:24px;
                font-family:MicrosoftYaHei;
                color:rgba(255,255,255,1);
                  em{
                        font-size:14px;
                        color:rgba(221,166,44,1);
                        margin-right:30px;
                      }
             }
             .title{
                 font-size:20px;
                font-family:MicrosoftYaHei;
                color:rgba(30,239,247,1);
                text-align: center;
                margin:8px 0 0px 0;
             }
            }
            .compensate-page{
                width:599px;
                height:290px;
                padding:20px 0 0 20px;
                margin:19px 0;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    ul{
                        display: flex;
                        justify-content: space-around;
                        margin-top:35px;
                        li{ 
                            width:86px;
                            p:nth-of-type(2){
                                width:100%;
                                text-align: center;
                                margin:20px 0 9px 0;
                                font-size:16px;
                                font-family:PingFang-SC-Medium;
                                font-weight:500;
                                color:rgba(255,255,255,1);
                            }
                            p:nth-of-type(3){
                                width:60px;
                                font-size:14px;
                                font-family:MicrosoftYaHei;
                                color:rgba(255,255,255,1);
                                line-height:19px;
                                margin-left:13px;
                            }
                            .pay{
                                width:86px;
                                height:86px;
                            }
                        }
                    }
            }
            .salvation-page{
                width:599px;
                height:290px;
                padding:20px 0 0 20px;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    table{
                    border-collapse:collapse;
                    width:545px;
                    height:87px;
                    margin-top:8px;
                    }

                    table, td,th{
                    border:1px solid #12F2FF;
                    vertical-align:center;
                    text-align: center;
                    }
                    th{
                        font-size:14px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    td{
                        font-size:16px;
                        font-family:MicrosoftYaHei;
                        color:#12F2FF;
                    }
                    ol{  
                        width:545px;
                        display: flex;
                        margin-top:10px;
                        li:first-child{
                            border-left:1px solid #12F2FF;
                        }
                        li:nth-child(1),li:nth-child(3){
                            font-size:14px;
                            font-family:MicrosoftYaHei;
                            color:rgba(255,255,255,1);
                            width:110px;
                        }
                        li:nth-child(2){
                            font-size:18px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            color:rgba(255,224,19,1);
                            width:162px;
                        }
                        li:nth-child(4){
                            font-size:18px;
                            font-family:PingFangSC-Semibold;
                            font-weight:600;
                            color:rgba(255,105,14,1);
                            width:162px;
                        }
                        li{
                            border-top:1px solid #12F2FF; 
                            border-right:1px solid #12F2FF; 
                            border-bottom:1px solid #12F2FF;
                            height:119px;
                            text-align: center;
                            line-height:119px;
                        }
                    }
            }
        }
    }
}
</style>
