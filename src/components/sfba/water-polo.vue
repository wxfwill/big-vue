<template>
    <div class="water-box">
    <div :id="ID" :style="{width:'102px', height:'102px'}"></div>
    <p>{{item.num}}</p>
    <p>{{item.title}}</p>
    </div>
</template>
<script>
export default {
    props:{
        item:{type:Object},
        ID:{type:String}
    },
    mounted() {
        this.poloHandle()
    },
    methods: {
        poloHandle(){
           var polo = this.$echarts.init(document.getElementById(this.ID)); 
           var value = 0.5555;
            // var data = [];
            // data.push(value)
            // data.push(value - value*1/5);
            // data.push(value - value*1/3);
            // data.push(value - value*1/2);
           var option = {
                // title: {
                //     text: '水球DEMO',
                //     textStyle: {
                //         fontWeight: 'normal',
                //         fontSize:16,
                //         color: '#3EABE9'
                //     },
                //     subtext:'100'
                // },
                series: [{
                    type: 'liquidFill',
                    data: [//顺序从里到外
                        {
                        value: 0.5,
                        direction: 'right',
                        itemStyle: {
                            normal: {
                                color:this.item.col1
                            }
                        }
                    }
                        ,{
                        value: 0.5,
                        direction: 'right',
                        itemStyle: {
                            normal: {
                                color:this.item.col2
                            }
                        }
                    }],
                    radius: '95%',
                    backgroundStyle: {
                        borderWidth: 1,//内边框粗细
                        borderColor: this.item.col2,//内边框颜色
                        color: 'rgb(255,255,255,0)'//底色
                    },
                    label: {
                        normal: {
                            formatter: value * 100 + '%',//显示所有小数位
                            textStyle: {
                                fontSize:20//字体大小
                            }
                        }
                    },
                    outline: {
                        show: false//去除边框
                    }
                }]
            };
            // 绘制图表
           polo.setOption(option);
        }
    },
}
</script>
<style lang="scss" scoped>
.water-box{
    width: 115px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p:nth-of-type(1){
        font-size:24px;
        font-family:DINAlternate-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin: 11px 0;
    }
    p:nth-of-type(2){
        font-size:16px;
        font-family:MicrosoftYaHei;
        color:rgba(255,255,255,1);
        line-height:16px;
    }
}
</style>
