<template>
    <div class="dayBox-page">
        <div class="fileBox">
             <p>案均办理天数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
             <div id="file" :style="{width:'490px',height:'205px'}"></div>
        </div>
        <div class="capitaBox">
          <p>人均办结数<span @click="popupShow=true;popupTitle='全国各省份人均办结数统计表'">更多>></span></p>
          <div id="capita" :style="{width:'490px',height:'235px'}"></div>
        </div>
        <popup v-if="popupShow" :title="popupTitle" :popupData='popupData'></popup>
    </div>
</template>
<script>
import echarts from 'echarts';
import Popup from '@/components/Popup.vue'
export default {
    components:{
        Popup
    },
    data() {
        return {
            capitPopup:false,
            filePopup:false,
            popupShow:false,
            popupTitle:'全国各省份人均办结数统计表',
            popupData:[]
        }
    },
    mounted() {
        this.capitaHandle()//人均办结数
        this.fileHandle()//案均办理天数
    },
    methods: {
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
        }
    },
}
</script>
<style lang="scss" scoped>
.dayBox-page{
                display: flex;
                justify-content: space-between;
              .capitaBox{
                        width:544px;
                        height:290px;
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
                        width:544px;
                        height:290px;
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
</style>
