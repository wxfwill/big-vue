<template>
    <div class="Popup">
            <div class="box">
                <span class="popupClose" @click="($parent.popupShow=false)">X</span>
            <div id="popup" :style="{width:'2438px',height:'519px'}"></div>
            </div>
        </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:function () {
                return ''
            }
        },
        type:{type:String,default:''},
        popupData:{type:Array,default:[]}
    },
    mounted(){
        this.moreHandle()
    },
    methods: {
        moreHandle(){
            var popup =this.$echarts.init(document.getElementById("popup"));
            var option = {
                tooltip: {},
                title:{
                    text:this.title,
                    textStyle:{
                        fontSize:36,
                        color:'rgba(255,255,255,1)'
                    },
                    left:'center',
                    top:'10%'
                },
                grid: {//柱状图偏移
                    top: '35%',
                    left: '3%',
                    right: '3%',
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
                            color: 'rgba(0,255,255,1)',
                            fontSize:21,
                            margin: 15,
                        },
                        interval:0 //x轴太长会默认隔一个显示
                    },
                    axisTick: {
                        show: false,
                    },
                    data: [
          '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
        '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
        '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
          ],
                }],
                yAxis: [{
                    type: 'value',
                    // min: 0,
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
                            color: 'rgba(0,255,255,1)',
                            fontSize:21
                        },
                        formatter: this.type==='%'?'{value}%':'{value}'
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
                        formatter: this.type==='%'?'{c}%':'{c}',
                        position: 'top',
                        textStyle: {
                            color: 'rgba(0,255,255,1)',
                            fontSize:20
                        }
                    },
                    barWidth:22,
                    itemStyle: {
                        normal: {
                            color:'#00FFFF'
                        }
                    },
                    data: this.popupData
                }]
            };
            popup.setOption(option,true)
        }
    },
}
</script>
<style lang="scss" scoped>
     .Popup{
                z-index:15;
                position: fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.7);
                .box{
                    display: flex;
                    width:2508px;
                    height:559px;
                    margin:262px 0 0 662px;
                    background-color: #062355;
                    border: 1px solid #12e9e9;
                    position: relative;
                    .popupClose{
                        text-align: center;
                        line-height:38px;
                        position: absolute;
                        right:32px;
                        top:35px;
                        width:38px;
                        height:38px;
                        background:rgba(18,175,171,1);
                        border-radius:50%;
                        color:#FFFFFF;
                    }
                }
            }
</style>
