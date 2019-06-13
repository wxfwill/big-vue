<template>
    <div class="progress-page">
       <div :id="`vs${ID}`" :style="{width: '176px', height: '38px',marginRight:'15px'}"></div>
       <span>{{people}}人</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:{
        title:{type:String},
        sum:{type:Array},
        num:{type:Array},
        ID:{type:Number},
        people:{type:Number},
    },
    mounted() {
        this.progressHandle()
    },
    methods: {
        progressHandle(){
            const myProgress = this.$echarts.init(document.getElementById(`vs${this.ID}`));
            
            var option = {
                grid: [
                    {
                    left: '0%',
                    // top: '12%',
                    right: '0%',
                    bottom: '43%',
                    containLabel: true
                }
                    ],
                    title:{
                        left:'1%',
                        top:'0%',
                        text:this.title,
                        textStyle:{
                            color:'rgba(255,255,255,1)',
                            fontSize:14,
                            fontFamily:'MicrosoftYaHei'
                        }
                    },
                    tooltip:{
                           show:false,
                            formatter:function(param) {
                                return param.value/100 + '%'
                            },
                            textStyle: {
                                color: '#ffffff',
                                fontSize: '16'
                        }
                    },
                xAxis: [{
                    show: false
                }],
                yAxis: [{
                    axisTick: 'none',
                    axisLine: 'none',
                    //  offset: '27',
                    axisLabel: {
                        textStyle: {
                            color: '#81E7ED',
                            fontSize: '16'
                        }
                    },
                    data: ['']
                }],
                series: [
                    {
                    name: '内容',
                    type: 'bar',
                    stack: 'b',
                    //  yAxisIndex: 0,
                    data: this.num,
                    label: {
                        normal: {
                            show: false,
                            position: 'right',
                            distance: 10,
                            //  formatter: function(param) {
                            //      return param.value + '%'
                            //  },
                            textStyle: {
                                color: 'red',
                                fontSize: '16'
                            }
                        }
                    },
                    barWidth:8,
                    itemStyle: {
                        normal: {
                            color:'#00E1FF',
                            barBorderRadius:6
                        }
                    },
                    z: 2
                }, {
                    name: '背景',
                    type: 'bar',
                    //  yAxisIndex: 1,
                    barGap: '-100%',
                    data: this.sum,
                    barWidth:8,
                    itemStyle: {
                        normal: {
                            color: 'rgba(7,196,255,0.3)',
                            barBorderRadius:6
                        }
                    },
                    z: 1
                },
                
                ]
            }
            myProgress.setOption(option,true)
        }
    },
}
</script>
<style lang="scss" scoped>
.progress-page{
    display: flex;
    height:38px;
    align-items:flex-end;
    span{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(1,224,255,1);
    }
}
</style>
