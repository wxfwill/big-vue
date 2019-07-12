<template>
    <div class="trend-chart">
                <span class="bg_img" @click="retreatHandle" 
                :style="{backgroundImage:'url('+topImg+')',left:left,bottom:bottom}" ></span>
                <span class="bg_img" @click="advanceHandle" 
                :style="{backgroundImage:'url('+bottomImg+')',right:right,bottom:bottom}"></span>
                <!-- <div class="trend-label"> -->
                  <!-- <em class="trend"></em> -->
                  <!-- <i>受理案件趋势统计</i> -->
                <!-- </div> -->
                <div :id="ID" :style="{width:width, height:height}"></div>
    </div>
</template>
<script>
import { getRealType } from '@/utlis/helper';
import ECharts from 'echarts';
export default {
    props:{
        dataIPSxAxis:{type:Array},
        dataIPS:{type:Array},
        width:{type:String},
        height:{type:String},
        ID:{type:String},
        type:{
            type:String,
            default:'line'
        },
        splitLine:{type:Boolean,default:true},
        barWidth:{type:Number},
        smooth:{type:Boolean,default:false},
        left:{type:String},
        right:{type:String},
        bottom:{type:String},
    },
    data() {
        return {
            topImg: require('@/public/img/judicature/top@2x.png'),
            bottomImg: require('@/public/img/judicature/bottom@2x.png')
        }
    },
    mounted() {
             this.trendHandle()//受理案件趋势分析
    },
    methods: {
        advanceHandle(){//后一年
            this.dataIPSxAxis.push('2020')
            this.dataIPSxAxis.splice(0,1);
            this.dataIPS.push(111)
            this.dataIPS.splice(0,1)
            console.log('后一年')
        },
        retreatHandle(){//前一年
            this.dataIPSxAxis.unshift('2009')
            this.dataIPSxAxis.splice(this.dataIPSxAxis.length-1,1);
            this.dataIPS.unshift(88)
            this.dataIPS.splice(this.dataIPS.length-1,1)
            console.log('前一年')
        },
        trendHandle(){
            var trendChart = ECharts.init(document.getElementById(this.ID));
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
                    left: '5px',
                    top: '30px',
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
                        margin:15,
                        textStyle: {
                            show:false,
                            color: 'rgba(255,255,255,1)',
                            fontSize: 12,
                        },
                    },
                    axisTick: {
                            show: false //隐藏X轴刻度
                        },
                    axisLine: {
                        show:true,
                        lineStyle: {
                            color: '#2EA7E0',
                            width:1, //这里是为了突出显示加上的
                        }
                    }
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
                        show: this.splitLine,
                        lineStyle: { //y轴网格线设置
                            color: 'rgb(233,233,233,0.4)',
                            width: 1,
                            type: 'dashed'
                        }
                    },
                }],
                series: [
                    {
                        name: '',
                        type:this.type,
                        smooth:this.smooth,//折线是否平滑
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
                        barWidth:this.barWidth,
                        itemStyle: {
                            normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color:this.type==='bar'?'rgb(19,223,255,0.85)':new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,255,255, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,255,255, 0)' // 100% 处的颜色
                                }]),
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
           trendChart.setOption(option,true);
        }
    },
    watch  : {
			dataIPS(newVal, oldVal) {
				if(getRealType(newVal) === 'array') {
					this.trendHandle();
				}
			}
		}
}
</script>
<style lang="scss" scoped>
.trend-chart{
                position: relative;
                span{
                position: absolute;
                display: inline-block;
                width:14px;
                height:14px;
                z-index:2;
                }
                .trend-label {
                    display: flex;
                    align-items: center;
                    margin-bottom:10px;
                    i {
                    margin: 0 0 0 10px;
                    font-size:24px;
                    color:rgba(255,255,255,1);
                    line-height:29px;
                    }
                    .trend {
                    width:13px;
                    height:13px;
                    border-radius: 50%;
                    background:rgba(0,178,226,1);
                    }
                }
            }
</style>
