<template>
    <div class="outer-lawsuit-page">
        <div class="lawsuit-page-left">
            <p class="tab"><span></span>&nbsp;&nbsp;公益诉讼</p>
            <div class="left-top">
                <div class="bor_col civil">
                    <p class="title">民事公益诉讼基本情况</p>
                    <ul>
                        <li v-for="(item,index) in civilList" :key="index">{{item}}</li><span>宗</span> 
                    </ul>
                    <div class="data">
                        <p>受理件数：186911111 <br/> <span>办结率：23.48%</span></p>
                        <p>办结件数：5800 <br/> <span>提出检察建议数：3456</span></p>
                    </div>
                </div>
                <div class="bor_col administrative">
                    <p class="title">行政公益诉讼基本情况</p>
                    <ul>
                        <li v-for="(item,index) in civilList" :key="index">{{item}}</li><span>宗</span> 
                    </ul>
                    <div class="data">
                        <p>受理件数：186911111 <br/> <span>办结率：23.48%</span></p>
                        <p>办结件数：5800 <br/> <span>提出检察建议数：3456</span></p>
                    </div>
                </div>
            </div>
            <div class="bor_col territory">
                    <p class="title">涉案领域统计分析</p>
                    <div class="canBox">
                    <div id="civilBox" :style="{width:'490px',height:'330px'}"></div>
                    <div id="administrativeBox" :style="{width:'490px',height:'330px'}"></div>
                    </div>
            </div>
            <div class="bor_col tendency">
                    <p class="title">受理案件趋势分析</p>
                    <div id="tendencyBox" :style="{width:'1140px',height:'230px'}"></div>
            </div>
        </div>
        <div class="lawsuit-page-center">
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
         <div class="lawsuit-map">
             <mapComponent :user="(this.$route.name)"></mapComponent>
         </div>
        </div>
        <div class="lawsuit-page-right">
            <div class="right-top">
            <div class="bor_col nature">
                <p class="title">案件性质分类</p>
                <div id="natureBox" :style="{width:'520px',height:'230px'}"></div>
            </div>
            <div class="bor_col investigate">
                <p class="title">审查情况</p>
                <div id="investigateBox" :style="{width:'520px',height:'230px'}"></div>
            </div>
            </div>
            <div class="bor_col statistics">
                <p class="title">受理数分类情况统计</p>
                <div id="statisticsBox" :style="{width:'1080px',height:'215px'}"></div>
            </div>
            <DayBox></DayBox>
        </div>
    </div>
</template>
<script>
import mapComponent from '@/components/map/index.vue'
import DayBox from '@/components/DayBox.vue'
export default {
    components:{
        mapComponent,
        DayBox
    },
    data() {
        return {
            civilList:[1,8,2,7,2,3],
            slList:[3,2,4,4,9,8],
            bjList:[2,3,4,5,6,7],
            zbList:[1,2,3,4,5,6,7],
        }
    },
    mounted() {
        this.civilHandle()//民事公益诉讼
        this.administrativeHandle()//行政公益诉讼
        this.tendencyHandle()//受理案件趋势分析
        this.natureHandle()//案件性质分类
        this.investigateHandle()//审查情况
        this.statisticsHandle()//受理数分类情况统计
    },
    methods: {
        statisticsHandle(){
            var statisticsBox =this.$echarts.init(document.getElementById("statisticsBox"));
             var option = {
                tooltip: {},
                legend: {
                    show:true,
                    right: '5%',
                    top:'3%',
                    data: ['民事公益诉讼','行政公益诉讼'],
                    itemWidth: 50,
                    itemHeight:12,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'14',
                        fontFamily:'MicrosoftYaHei'
                    }
                },
                grid: {//柱状图偏移
                    top: '25%',
                    left: '1%',
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
                    data: ['一审','二审','上诉','再审','线索'],
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
                    type: 'line',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#31DBE8',
                            fontSize:10
                        }
                    },
                    barWidth:12,
                    itemStyle: {
                        normal: {
                            color:'#F7931E'
                        }
                    },
                    data: [400,1000,111,222,333]
                },
                {
                    name: '行政公益诉讼',
                    type: 'line',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#F7931E',
                            fontSize:10
                        }
                    },
                    barWidth:12,
                    itemStyle: {
                        normal: {
                            // 定制显示（按顺序）
                         color:'#25BDE5'
                        }
                    },
                    data: [500,1100,211,322,433]
                }
                ]
            };
             statisticsBox.setOption(option,true);
        },
        investigateHandle(){
            var investigateBox =this.$echarts.init(document.getElementById("investigateBox"));
          var option = {
               color: ['#18E3EF', '#F0F61D','#ABE71F','#19B1E3'],
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
            radius : ['60%','80%'],//数组时内，外
            center: ['51%', '51%'],//x，y
            data:[
                {value:335, name:'其他处理'},
                {value:310, name:'移送其他检察院'},
                {value:310, name:'交办下级院'},
                {value:310, name:'本院办理'}
            ],
            labelLine: {
                normal: {
                    length: 20,
                    length2: 70,
                    lineStyle: {
                        // color: 'red'
                    }
                }
 
            },
            label: {
                normal: {
                    formatter: '{a|{c}}\n\n{b|{b}}',//{a|这段文本采用样式a}
                    //饼图、仪表盘、漏斗图: {a}（系列名称）
                    // {b}（数据项名称），{c}（数值）, {d}（百分比）
                    borderWidth: 20,
                    borderRadius: 4,
                    padding: [0,-60,0,-60],
                    rich: {
                        a: {
                            color: 'rgba(255,255,255,1)',
                            fontSize: 12,
                            lineHeight: 20
                        },
                        b: {
                            fontSize: 12,
                            lineHeight: 20,
                            color: 'rgba(255,255,255,1)'
                        }
                    }
                }
            },
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
          investigateBox.setOption(option,true)
        },
        natureHandle(){
          var natureBox =this.$echarts.init(document.getElementById("natureBox"));
          var option = {
               color: ['#31DBE8', '#EAD61F','#6EB21F'],
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
                {value:335, name:'违法行使职权'},
                {value:310, name:'其他'},
                {value:310, name:'行政不作为'}
            ],
            label:{//改变指示文字颜色     
            normal:{
                textStyle : {
                fontFamily:'MicrosoftYaHei',
                fontSize : 14,   //文字的字体大小
                color:'rgba(255,255,255,1)'
                         },  
                    }
                },
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
          natureBox.setOption(option,true)
        },
        tendencyHandle(){
            var tendencyBox =this.$echarts.init(document.getElementById("tendencyBox"));
             var option = {
                tooltip: {},
                legend: {
                    show:true,
                    right: '5%',
                    top:'3%',
                    data: ['行政','民事'],
                    itemWidth: 12,
                    itemHeight:12,
                    textStyle:{
                        color:'#ffffff',
                        fontSize:'14'
                    }
                },
                grid: {//柱状图偏移
                    top: '25%',
                    left: '1%',
                    right: '0%',
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
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
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
                    name: '行政',
                    type: 'bar',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#31DBE8',
                            fontSize:10
                        }
                    },
                    barWidth:12,
                    itemStyle: {
                        normal: {
                            color:'#F7931E'
                        }
                    },
                    data: [400,1000,111,222,333,444,555,666,777,888,999,1000]
                },
                {
                    name: '民事',
                    type: 'bar',
                    tooltip: {
                        show: true
                    },
                    label: {//柱状头部出现数值
                        show: false,
                        position: 'top',
                        textStyle: {
                            color: '#F7931E',
                            fontSize:10
                        }
                    },
                    barWidth:12,
                    itemStyle: {
                        normal: {
                            // 定制显示（按顺序）
                         color:'#25BDE5'
                        }
                    },
                    data: [400,1000,111,222,333,444,555,666,777,888,999,1000]
                }
                ]
            };
             tendencyBox.setOption(option,true);
        },
        civilHandle(){
            var civilBox =this.$echarts.init(document.getElementById("civilBox"));
            var option = {
               color: ['#31DBE8', '#EAD61F', '#2CE2A7', '#26A3EF','#6EB21F'],
               title:{
                   left:'20%',
                   top:'3%',
                   text:'民事公益诉讼',
                   textStyle:{
                       fontSize:18,
                        color:'rgba(255,255,255,1)'
                   }
               },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        bottom:'20%',
        itemGap:15,
        data: ['生态环境和资源保护领域','食品药品安全领域','国有财产保护领域','国有土地使用权出让领域','英烈权益保护领域'],
        itemWidth: 12,
        itemHeight:12,
        textStyle:{
            color:'#ffffff',
            fontSize:'14'
        }
    },
    series : [
        {
            name: '受理案件数统计',
            type: 'pie',
            radius : '70%',//数组时内，外
            center: ['30%', '55%'],//x，y
            label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        position:'inner', //标签的位置
                        textStyle : {
                        fontWeight : 300 ,
                        fontSize : 18    //文字的字体大小
                        },
                        formatter:'{d}%'    
                            }
                        },
            data:[
                {value:335, name:'生态环境和资源保护领域'},
                {value:310, name:'食品药品安全领域'},
                {value:234, name:'国有财产保护领域'},
                {value:135, name:'国有土地使用权出让领域'},
                {value:135, name:'英烈权益保护领域'}
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
            civilBox.setOption(option,true);
        },
        administrativeHandle(){
            var administrativeBox =this.$echarts.init(document.getElementById("administrativeBox"));
            var option = {
               color:['#31DBE8', '#EAD61F', '#2CE2A7', '#26A3EF','#6EB21F'],
               title:{
                   left:'20%',
                   top:'3%',
                   text:'行政公益诉讼',
                   textStyle:{
                       fontSize:18,
                        color:'rgba(255,255,255,1)'
                   }
               },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        bottom:'20%',
        itemGap:15,
        data: ['生态环境和资源保护领域','食品药品安全领域','国有财产保护领域','国有土地使用权出让领域','英烈权益保护领域'],
        itemWidth: 12,
        itemHeight:12,
        textStyle:{
            color:'#ffffff',
            fontSize:'14'
        }
    },
    series : [
        {
            name: '受理案件数统计',
            type: 'pie',
            radius : '70%',//数组时内，外
            center: ['30%', '55%'],//x，y
            data:[
                {value:335, name:'生态环境和资源保护领域'},
                {value:310, name:'食品药品安全领域'},
                {value:234, name:'国有财产保护领域'},
                {value:135, name:'国有土地使用权出让领域'},
                {value:135, name:'英烈权益保护领域'}
            ],
            label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        position:'inner', //标签的位置
                        textStyle : {
                        fontWeight : 300 ,
                        fontSize : 18    //文字的字体大小
                        },
                        formatter:'{d}%'    
                            }
                        },
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
            administrativeBox.setOption(option,true);
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-lawsuit-page{
    display: flex;
    .lawsuit-page-left{
        width:1175px;
        position: relative;
        display: flex;
        flex-wrap:wrap;
        .tab{
                position: absolute;
                top:-88px;
                left:20px;
                font-size:22px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(48,226,226,1);
                span{
                    display: inline-block;
                    border-radius: 50%;
                    width:12px;
                    height:12px;
                    background:rgba(48,226,226,1);
                }
            }
            .left-top{
                display: flex;
                .civil,.administrative{
                    width:578px;
                    height:205px;
                    padding:20px 0 0 20px;
                    margin-right:20px;
                    .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    ul{ 
                        display: flex;
                        margin:23px 0 0 64px;
                        font-size:18px;
                        color:rgba(255,255,255,1);
                        li:first-of-type{
                            border-left:1px solid #26A3EF;
                        }
                        li{
                            width:48px;
                            height:48px;
                            border-right: 1px solid #26A3EF;
                            border-top: 1px solid #26A3EF;
                            border-bottom: 1px solid #26A3EF;
                            font-size:36px;
                            color:rgba(0,255,255,1);
                            text-align: center;
                            line-height:48px;
                        }
                        span{
                            margin:21px 0 0 30px;
                        }
                    }
                    .data{
                            display: flex;
                            justify-content:space-around;
                            margin-left:40px;
                            margin-top:20px;
                            p{
                                    font-size:16px;
                                    font-family:MicrosoftYaHei;
                                    color:rgba(255,255,255,1);
                                    span{line-height:34px;}
                            }
                        }
                }
            }
            .territory{
                width:1175px;
                height:375px;
                padding:20px 0 0 20px;
                margin:19px 0;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                .canBox{
                    display: flex;
                    justify-content: space-around;
                }
            }
            .tendency{
                width:1175px;
                height:292px;
                padding:20px 0 0 20px;
                .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
            }
    }
    .lawsuit-page-center{
        width: 1433px;
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
        .lawsuit-map{
            width:1433px;
            height:869px;
            background:rgba(0,0,0,0.4);
            border:1px solid rgba(1,218,226,1);
        }
    }
    .lawsuit-page-right{
        width:1107px;
        .right-top{
            display: flex;
        .nature{
            width:544px;
            height:305px;
            padding:20px 0 0 20px;
            margin-right:21px;
            .title{
                font-size:24px;
                font-family:MicrosoftYaHei;
                color:rgba(255,255,255,1);
               }
        }
        .investigate{
            width:544px;
            height:305px;
            padding:20px 0 0 20px;
            .title{
                font-size:24px;
                font-family:MicrosoftYaHei;
                color:rgba(255,255,255,1);
               } 
        }
        }
        .statistics{
            width:1107px;
            height:276px;
            padding:20px 0 0 20px;
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
