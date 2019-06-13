<template>
    <div class="outer-inspect-page">
        <div class="inspect-page-left">
            <p class="tab"><span></span>&nbsp;&nbsp;未检</p>
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
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
export default {
     components:{
        mapComponent,
        Popup
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.investigateHandle("numBox",[200],[500],['批捕件数','不捕件数'],'#20F0EF','#F7931E')//批捕件数
        this.investigateHandle("peopleBox",[100],[600],['批捕人数','不捕人数'],'#EAD61F','#2CE2A7')//批捕人数
        this.investigateHandle("prosecuteNumBox",[200],[500],['起诉件数','不起诉件数'],'#F7931E','#31DBE8')//起诉件数
        this.investigateHandle("prosecutePeopleBox",[100],[600],['起诉人数','不起诉人数'],'#49CCFD','#EAD61F')//起诉人数
    },
    methods: {
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
    },
}
</script>
<style lang="scss" scoped>
.outer-inspect-page{
    width:100%;
    height:100%;
    .inspect-page-left{
        display: flex;
        position: relative;
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
}
</style>
