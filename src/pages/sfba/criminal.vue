<template>
    <div class="outer-criminal-page">
        <date-time moduleName="刑事"></date-time>
        <div class="criminal-page-left">
            <div class="left-left">
                <!-- <p class="tab"><span></span>&nbsp;&nbsp;&nbsp;刑事</p> -->
            <div class="bg_img slajBox" :style="{backgroundImage:'url('+slajBorImg+')'}">
                <p>受理案件数统计</p>
                <ol>
                    <li v-for="(item,index) in slajList" :key="index">{{item}}</li>
                </ol>
                <div id="slajBox" :style="{width:'534px',height:'230px'}"></div>
            </div>
            <!-- 起诉top -->
            <div class="bg_img prosecute-box" :style="{backgroundImage:'url('+prosecuteImg+')'}">
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
            </div>
            <div class="left-right">
              <div class="center-box">
                <mapComponent></mapComponent>
              </div>
              <div class="bor_col increase-box">
                  <p class="title">受理案件增长率最快的省市</p>
                  <div id="cityBox" :style="{width:'920px',height:'230px',marginLeft:'100px'}"></div>
                  <div class="next">
                      <p class="bg_img" :style="{backgroundImage:'url('+leftImg+')'}" @click="previousHandle"></p>
                      <p>1/3</p>
                      <p class="bg_img" :style="{backgroundImage:'url('+rightImg+')'}" @click="downHandle"></p>
                  </div>
              </div>
            </div>
        </div>
        <div class="criminal-page-right">
            <div class="right-left">
            <div class="bg_img top-box" :style="{backgroundImage:'url('+topImg+')'}">
                <p class="title">罪名增长率 TOP10</p>
                <ul>
                    <li v-for="(item,index) in topList" :key="index">{{item.title}}</li>
                </ul>
                <ol>
                    <li v-for="(item,index) in topList" :key="index">
                        <p></p>
                        <p>{{item.num}}</p>
                    </li>
                </ol>
            </div>
            <div class="right-left-bottom">
                <div class="bor_col age-pie">
                    <p class="title">犯罪嫌疑人年龄分布</p>
                    <div id="agePie" :style="{width:'400px',height:'180px'}"></div>
                </div>
                <div class="bor_col education">
                    <p class="title">受教育状况</p>
                    <div id="education" :style="{width:'410px',height:'150px'}"></div>
                </div>
                <div class="bor_col age-bar">
                    <p class="title">犯罪嫌疑人年龄分布<span>232345</span></p>
                    <div id="ageBar" :style="{width:'400px',height:'180px',marginLeft:'10px'}"></div>
                </div>
                <div class="bor_col judgment">
                    <p class="title">判决生效人数<span>232345</span></p>
                    <div id="judgment" :style="{width:'410px',height:'150px'}"></div>
                </div>
            </div>
        </div>
        <div class="right-right">
            <div class="bor_col examineBox">
                <p class="title">审查逮捕各类犯罪不捕情况</p>
                <div id="examine" :style="{width:'490px',height:'300px'}"></div>
                <ol>
                    <li v-for="(item,index) in scList" :key="index">
                             {{item.title}}&nbsp;
                        <span>&nbsp;{{item.num}}</span>
                        <span>&nbsp;&nbsp;{{item.proportion}}</span>
                    </li>
                </ol>
            </div>
            <div class="bor_col publicBox">
                <p class="title">公诉各类业务受理情况</p>
                <ul>
                    <li v-for="(item,index) in gsList" :key="index">
                             {{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{item.proportion}}</span>
                    </li>
                </ul>
            </div>
            <div class="bor_col right-right-bottom">
            <div class="capitaBox">
                <p>人均办结数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
                <div id="capita" :style="{width:'450px',height:'330px'}"></div>
            </div>
            <div class="fileBox">
                <p>案均办理天数<span @click="popupShow=true;popupTitle='全国各省份案均办理天数统计表'">更多>></span></p>
                <div id="file" :style="{width:'470px',height:'330px'}"></div>
            </div>
            </div>
        </div>
        </div>
        <popup v-if="popupShow" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import ECharts from 'echarts';
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
            capitPopup:false,
            filePopup:false,
            lineImg:require('@/public/img/judicature/line.png'),
            slajBorImg:require('@/public/img/judicature/slajBor.png'),
            prosecuteImg:require('@/public/img/judicature/prosecuteBor.png'),
            leftImg:require('@/public/img/judicature/left.png'),
            rightImg:require('@/public/img/judicature/right.png'),
            topImg:require('@/public/img/judicature/topBox.png'),
            slajList:[1,2,3,4,5,6,7,8],
            prosecuteList:[
                {title:'受理件数',num: 3434,proportion:'20%'},{title:'办结件数',num: 4545,proportion:'20%'},
                {title:'1111',num: 7877,proportion:'20%'},{title:'受理件数',num: 3434,proportion:'20%'},
                {title:'起诉案件数',num: 9090,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'犯罪又犯罪审查逮捕案件',num: 6767,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'},
                {title:'批捕逮捕数',num: 1231,proportion:'20%'},{title:'批捕逮捕数',num: 1231,proportion:'20%'}],
            topList:[
                {title:'渎职罪',num:'12.5%'},{title:'贪污受贿罪',num:'12.5%'},{title:'走私',num:'12.5%'},
                {title:'金融诈骗',num:'12.5%'},{title:'侵犯知识产权罪',num:'12.5%'},{title:'妨碍司法罪',num:'12.5%'},
                {title:'妨碍文物馆罪',num:'12.5%'},{title:'危害公共卫生罪',num:'12.5%'},{title:'传播淫秽物品罪',num:'12.5%'},{title:'侵犯财产罪',num:'12.5%'}
            ],
            scList:[
                {title:'批准逮捕人数/率：',num:23456,proportion:'20%'},{title:'逮捕人数/率：',num:23456,proportion:'20%'},
                {title:'不逮捕人数/率：',num:23456,proportion:'20%'},
                ],
                gsList:[
                    {title:'批准逮捕人数/率：',proportion:'20%'},{title:'逮捕人数/率：',proportion:'20%'},
                    {title:'不逮捕人数/率：',proportion:'20%'},{title:'批准逮捕人数/率：',proportion:'20%'},
                    {title:'逮捕人数/率：',proportion:'20%'},{title:'批准逮捕人数/率：',proportion:'20%'},
                    {title:'不逮捕人数/率：',proportion:'20%'},{title:'批准逮捕人数/率：',proportion:'20%'},
                    {title:'逮捕人数/率：',proportion:'20%'},{title:'不逮捕人数/率：',proportion:'20%'},
                ],
            cityData:['北京', '山东', '河南', '黑龙江', '贵州', '陕西', '广东', '西藏', '新疆', '青海', '湖南', '湖北'],
            proportionData:[50, -3, -5, -5, 14, -13, -7, -14, 24,-1,-2,-4],
            cityData:[],
            valData:[],
            popupShow:false,
            popupTitle:'全国各省份人均办结数统计表',
            popupData:[111,222,333,555]
        }
    },
    mounted() {
        this.slajHandle()//受理案件图
        this.cityHandle()//受理案件增长率图
        this.agePie()//年龄饼图
        this.educationHandle()//受教育状况
        this.ageBar()//年龄柱状图
        this.judgmentHandle()//判决生效人数
        this.examineHandle()//审查逮捕各类犯罪不捕情况
        this.capitaHandle()//人均办结数
        this.fileHandle()//案均办理天数
    },
    methods: {
        fileHandle(){
            var file =ECharts.init(document.getElementById("file"));
           var option = {
                tooltip: {
                    // trigger: 'axis',
                    // axisPointer: {
                    //     type: 'shadow'
                    // },
                    formatter: "{b} <br> 合格率: {c}%"//提示框内容修改
                },
                /*legend: {
                    data: [date]
                },*/
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    name:'',
                    // boundaryGap: [0, 0.01],
                    // min: 0,
                    // max: 100,
                    interval: 25,
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
                    data: ['湖北', '湖南', '河南', '安徽', '浙江', '山东', '广东'],
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
                                color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
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
                    data: [22, 33, 44, 55, 66, 77, 88]
                }]
            };
            file.setOption(option,true)
        },
        capitaHandle(){
            var capita =ECharts.init(document.getElementById("capita"));
            var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '15%',
                    left: '1%',
                    right: '1%',
                    bottom: '8%',
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
                            color: '#d1e6eb',
                            fontSize:10,
                            margin: 15,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
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
                    data: [200, 382, 102, 267, 186, 315, 316]
                }]
            };
            capita.setOption(option,true)
        },
        examineHandle(){
            var examine =ECharts.init(document.getElementById("examine"));
            var option = {
               color: ['#1989DD', '#37DDA1', '#5025D8', '#31DBE8'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        orient: 'vertical',
        left: '3%',
        top:'10%',
        data: ['普通犯罪','重大犯罪','职务犯罪','经济金融犯罪'],
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
            radius : ['50%','90%'],//数组时内，外
            center: ['53%', '50%'],//x，y
            data:[
                {value:335, name:'普通犯罪'},
                {value:310, name:'重大犯罪'},
                {value:234, name:'职务犯罪'},
                {value:135, name:'经济金融犯罪'}
            ],
            label:{//指示线设置
                        show:false
                    },
            itemStyle: {
                normal:{
                    
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
            examine.setOption(option,true)
        },
        ageBar(){
            var ageBar =ECharts.init(document.getElementById("ageBar"));
            var option = {
                tooltip: {},
                grid: {//柱状图偏移
                    top: '15%',
                    left: '1%',
                    right: '1%',
                    bottom: '8%',
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
                            color: '#d1e6eb',
                            fontSize:10,
                            margin: 15,
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
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
                    data: [200, 382, 102, 267, 186, 315, 316]
                }]
            };
            ageBar.setOption(option,true)
        },
        judgmentHandle(){
            var judgment =ECharts.init(document.getElementById("judgment"));
            var option = {
    grid: {
        top: "5%",
        bottom: "10%"
    },
    tooltip: {
        // trigger: "axis",
        // axisPointer: {
        //     type: "shadow",
        //     label: {
        //         show: false
        //     }
        // }
    },
    xAxis: {
        data: [
            "无罪",
            "3年以下",
            "3-10年",
            "10年以上",
            "无期",
        ],
        axisLine: {
            show: false //隐藏X轴轴线
        },
        axisTick: {
            show: false //隐藏X轴刻度
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: "#ffffff" //X轴文字颜色
            }
        }
    },
    yAxis: [{
            type: "value",
            name: "",
            nameTextStyle: {
                color: "#ebf8ac"
            },
            splitLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                margin:0,
                show: true,
                textStyle: {
                    color: "#ffffff"
                }
            }
        },
        {
            type: "value",
            name: "",
            nameTextStyle: {
                color: "#ebf8ac"
            },
            position: "right",
            splitLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,
                formatter: "{value} %", //右侧Y轴文字显示
                textStyle: {
                    color: "#ebf8ac"
                }
            }
        }
    ],
    series: [{
            name: "同比",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, //平滑曲线显示
            showAllSymbol: false, //显示所有图形。
            symbol: "none", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
            },
            lineStyle: {
                color: "yellow"
            },
            areaStyle:{//分隔区域设置
                color: "none"
            },
            data: [1, 2, 3, 4, 5]
        },
        {
            name: "",
            type: "bar",
            barWidth:22,
            itemStyle: {
                normal: {
                    color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#63E8D7"
                        },
                        {
                            offset: 1,
                            color: "#0664BE"
                        }
                    ])
                }
            },
            data: [1, 2, 3, 4, 5]
        }
    ]
};
            judgment.setOption(option,true)
        },
        educationHandle(){
            var education =ECharts.init(document.getElementById("education"));
            var option = {
               color: ['#81D32A', '#31B1DD', '#DBA62E', '#942BD8','#2F9DE0','#2FE0BE'],
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
        data: ['0-18岁','18-25岁','25-35岁','35-45岁','45-55岁','55岁以上'],
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
            radius : ['20%','60%'],//数组时内，外
            center: ['51%', '55%'],//x，y
            data:[
                {value:335, name:'文盲'},
                {value:310, name:'小学'},
                {value:234, name:'初中'},
                {value:135, name:'高中'},
                {value:234, name:'中专'},
                {value:135, name:'大学'},
                {value:234, name:'硕士'},
                {value:234, name:'博士'},
                {value:234, name:'其他'},
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
            education.setOption(option,true)
        },
        agePie(){
            var agePie =ECharts.init(document.getElementById("agePie"));
            var option = {
               color: ['#81D32A', '#31B1DD', '#DBA62E', '#942BD8','#2F9DE0','#2FE0BE'],
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        //饼图、仪表盘、漏斗图: {a}（系列名称）
        // {b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    legend: {
        orient: 'vertical',
        right: '0%',
        bottom:'10%',
        data: ['0-18岁','18-25岁','25-35岁','35-45岁','45-55岁','55岁以上'],
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
            radius : ['0%','60%'],//数组时内，外
            center: ['50%', '55%'],//x，y
            data:[
                {value:335, name:'0-18岁'},
                {value:310, name:'18-25岁'},
                {value:234, name:'25-35岁'},
                {value:135, name:'35-45岁'},
                {value:234, name:'45-55岁'},
                {value:135, name:'55岁以上'}
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
            agePie.setOption(option,true)
        },
        topHandle(){
            for (let i = 0; i < this.topList.length; i++) {
                const element = array[i];
                
            }
        },
        previousHandle(){
            this.cityData=['江西',"太原市", "朔州市", "大同市", "阳泉市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市", "吕梁市", "运城市"]
            this.cityHandle()
            console.log(111111)
        },
        downHandle(){

        },
        slajHandle(){
            var slajBox =ECharts.init(document.getElementById("slajBox"));
           var option = {
               color: ['#2EA7DB', '#2082ED', '#2CDDC0', '#E5B52C'],
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
        data: ['直接访问','邮件营销','联盟广告','视频广告'],
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
            radius : '80%',//数组时内，外
            center: ['50%', '55%'],//x，y
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'}
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
            // 绘制图表
            slajBox.setOption(option);
        },
        cityHandle(){
            var cityBox =ECharts.init(document.getElementById("cityBox"));
            var ItemStyle = {
    normal: {
        color: function(params) {
            var colorList;
            if (params.data >= 0) {
                colorList = 'rgba(48,226,226,1)';
            } else {
                colorList = 'rgba(48,226,226,1)';
            }
            return colorList;
        },
    }
};
var data= [50, -3, -5, -5, 14, -13, -7, -14, 24,-1,-2,-4];
// 求一个数组的最大值
function max(data){
    var max=data[0];
    for(var i=0;i<data.length;i++){
        // if (max<data[i]) {
        //     max=data[i];
        // }
        if(data[i]<0){
            
        }
        max=-20
    }
    return max;
}
// 背景xdata  渐变色柱状图   间隔色 两种  你可以设置多种
var bgData=[];
for(var i=0;i<data.length;i++){
    bgData.push(max(data));
}
 var option = {
    tooltip: {
        trigger:'axis',
        formatter: "增长率&城市",
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#ffffff'
            }
        }
    },
    grid:{
        show:false
    },
    xAxis: [{
        type: 'category',
        axisTick:{
            show:false
        },
        axisLine:{
            lineStyle:{
                color:'#0767D1'//轴线颜色
            }
        },
        axisLabel:{//文字颜色
            textStyle:{
                color:'rgba(0,255,255,1)',fontSize:14
            }
        },
        data: this.cityData
    }],
    yAxis: [
        {
        type: 'value',
        splitLine:{//隐藏水平网格
        show:false,
        },
        axisLine:{
            show:false
        },
        axisTick:{
            show:false
        },
        axisLabel: {
            show: true,
            interval: 'auto',
            textStyle:{
                color:'rgba(0,255,255,1)',
                fontSize:14
            },
            formatter: '{value}%'
        },
    }],
    series: [
        {//如果不需要背景色  可以把此 bar删掉  上方求bgData的过程删掉
        type: 'bar',
         barWidth: 20,
        data:bgData,
        tooltip:{
            show:false
        },
        silent:true,
        itemStyle:{
            normal:{
                color:'rgba(7,103,209,0.3)'
            }
        }
    },
    {
        type: 'bar',
        itemStyle: {
            normal:{
                color:'rgba(7,103,209,0.3) '
            }
        },
        barWidth: 20,

        data:[60,50,50,50,50,50, 50,50,50,50,50,50],
    },{
        type: 'bar',
        itemStyle: ItemStyle,
        barWidth: 20,
        barGap:'-100%',//写在最后一个才生效，其他没写的为背景，作用是重叠
        barCategoryGap:'50%',
        data:this.proportionData,
    }, ]
};
            // 绘制图表
            cityBox.setOption(option,true);
        },
    },
}
</script>
<style lang="scss" scoped>
.outer-criminal-page{
    width:100%;
    height:100%;
    display: flex;
    position: relative;
    padding-top:65px;
    .criminal-page-left{
        display: flex;
        width:1906px;
        height:100%;
        .left-left{
            margin-right:10px;
            position: relative;
            .slajBox{
                padding:36px 0 0 85px;
                width:733px;
                height:367px;
                p:nth-child(1){
                    font-size:24px;
                    color:rgba(255,255,255,1);
                    text-indent:190px;
                }
                ol{
                    display: flex;
                    margin-left:183px;
                    margin-top:14px;
                    li{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width:20px;
                        height:27px;
                        margin-right:3px;
                        margin-bottom:4px;
                        font-size:14px;
                        border-radius:4px;
                        color:rgba(255,255,255,1);
                        background: #1BC3EA;
                    }
                }
            }
            .prosecute-box{
                width:731px;
                height:560px;
                padding:40px 40px 20px 40px;
                position: relative;
                .title{
                position: absolute;
                left:295px;
                top:30px;
                font-size:24px;
                color:rgba(255,255,255,1);
                line-height:22px;
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
                    margin-bottom:10px;
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
                    color: #c49760;
                    }
                }
                li:nth-child(10){
                    p{
                    background-image: none !important;
                    }
                }
                }
            }
                    }
            .left-right{
                padding-top:7px;
                .center-box{
        position: relative;
        background:rgba(0,0,0,0.4);
        border:1px solid rgba(1,218,226,1);
        width:1169px;
        height:575px;
        
        
    } 
    .increase-box{
        width:1169px;
        height:315px;
        margin-top:18px;
        padding-top:17px;
        position: relative;
        .title{
            font-size:24px;
            color:rgba(255,255,255,1);
            text-align: center;
        }
        .next{
            position: absolute;
            bottom: 40px;
            right: 50px;
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
            }
                }
                .criminal-page-right{
                    display:flex;
                    width:1840px;
                    height:100%;
                    margin-left:27px;
                    .right-left{
                    .top-box{
                        width:846px;
                        height:408px;
                        display: flex;
                        position: relative;
                        padding:68px 0 0 78px;
                        .title{
                            position: absolute;
                            top:6px;
                            left:350px;
                            font-size:16px;
                            color:rgba(255,255,255,1);
                        }
                        ul{ 
                            width:130px;
                            height:313px;
                            border-right: 1px solid blue;
                            li{
                                margin:0 30px 13px 0;
                                font-size:14px;
                                color:rgba(0,255,255,1);
                            }
                            li:last-child{
                                margin:0;
                            }
                        }
                        ol{
                            margin:0 0 0 38px;
                            li{
                                width:450px;
                                height:8px;
                                background:rgba(110,110,110,0.2);
                                border-radius:4px;
                                margin-bottom:26px;
                                position:relative;
                                p:nth-child(1){  
                                    height:8px;
                                    background:linear-gradient(270deg,rgba(5,194,226,1) 0%,rgba(6,103,209,1) 100%);
                                    border-radius:4px;
                                }
                                p:nth-child(2){
                                    position: absolute;
                                    right:-60px;
                                    top:-7px;
                                    font-size:14px;
                                    color:rgba(83,210,211,1);
                                }
                            }
                        }
                    }
                    .right-left-bottom{
                        display: flex;
                        width:845px;
                        flex-wrap: wrap;
                        margin-top:20px;
                        .age-pie{
                            width:414px;
                            height:233px;
                            margin-right:19px;
                            .title{
                                font-size:24px;
                                color:rgba(255,255,255,1);
                                margin:17px 0 0 107px;
                            }
                        }
                        .education{
                            width:412px;
                            height:233px;
                            .title{
                                margin:17px 0 0 133px;
                                font-size:24px;
                                color:rgba(255,255,255,1);
                            }
                        }
                    }
                    .age-bar{
                            margin:20px 19px 0 0; 
                            width:414px;
                            height:233px;
                            margin-right:19px;
                            .title{
                                font-size:24px;
                                color:rgba(255,255,255,1);
                                margin:17px 0 0 107px;
                                position: relative;
                                margin-bottom:8px;
                                span{
                                    position: absolute;
                                    right:25px;
                                    bottom:-11px;
                                    font-size:14px;
                                    color:rgba(49,219,232,1);
                                }
                            }

                        }
                    .judgment{
                            margin-top:20px;
                            width:412px;
                            height:233px;
                            .title{
                                margin:17px 0 0 133px;
                                font-size:24px;
                                color:rgba(255,255,255,1);
                                position: relative;
                                margin-bottom:20px;
                                span{
                                    position: absolute;
                                    right:25px;
                                    bottom:-5px;
                                    font-size:14px;
                                    color:rgba(49,219,232,1);
                                }
                            }
                    }
                }
                .right-right{
                    width:980px;
                    display: flex;
                    flex-wrap: wrap;
                    padding-top:5px;
                    margin-left:20px;
                    .examineBox{
                    width:503px;
                    height:503px;
                      .title{
                        margin:20px 0 20px 130px;
                        font-size:24px;
                        color:rgba(255,255,255,1);
                       }
                       ol{  
                           margin-top:24px;
                           li{ 
                               margin-bottom:10px;
                               text-align: center;
                               font-size:18px;
                               color:rgba(255,255,255,1);
                               span:nth-child(1){
                                   font-size:18px;
                                   color:rgba(221,166,44,1);
                               }
                               span:nth-child(2){
                                   font-size:18px;
                                   color:rgba(49,219,232,1);
                               }
                           }
                       }
                    }
                    .publicBox{
                        padding-top:20px;
                        margin-left:23px;
                        width:441px;
                        height:501px;
                        .title{
                            text-align: center;
                            font-size:24px;
                            color:rgba(255,255,255,1);
                        }
                        ul{ 
                            margin-top:30px;
                            li{ 
                                text-align: center;
                                margin-bottom:15px;
                                font-size:18px;
                                color:rgba(49,219,232,1);
                                span{
                                    font-size:18px;
                                    color:rgba(221,166,44,1);
                                }
                            }
                        }
                    }
                    .right-right-bottom{
                        display: flex;
                        height:384px;
                    .capitaBox{
                        width:478px;
                        height:384px;
                        p{  
                            display: flex;
                            justify-content:space-between;
                            margin:19px 0 0 19px;
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
                        width:488px;
                        height:384px;
                        border-left:1px solid #00FFFF;
                        p{  
                            display: flex;
                            justify-content:space-between;
                            margin:19px 0 0 19px;
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
            }
}
</style>
