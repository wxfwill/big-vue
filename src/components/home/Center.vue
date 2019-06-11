<template>
  <div class="home-page-center">
      <div class="sumBox">
          <p>
              受理总数：<ol>
                       <li v-for="(item,index) in slzsList" :key="index">{{item}}</li>
                     </ol>
              </p>
              <p>
              办结总数：<ol>
                       <li v-for="(item,index) in bjzsList" :key="index">{{item}}</li>
                     </ol>
              </p>
              <p>
              待办总数：<ol>
                       <li v-for="(item,index) in zbzsList" :key="index">{{item}}</li>
                     </ol>
              </p>
      </div>
      <div class="center-box">
        <mapComponent :user="(this.$route.name)"></mapComponent>
      </div>
      <div class="qstjBox">
          <div class="qstj-label">
              <span class="qstj"></span>
              <i>受理案件趋势统计</i>
          </div>
        <div id="qstjContent" :style="{width: '1180px', height: '280px'}"></div>
      </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
export default {
  name: 'homeCenter',
  data() {
      return {
          slzsList:[3,2,4,4,9,8],
          bjzsList:[2,3,4,5,6,7],
          zbzsList:[1,2,3,4,5,6,7],
          slList:[3,2,4,4,9,8],
          bjList:[2,3,4,5,6,7],
          zbList:[1,2,3,4,5,6,7],
      }
  },
  components:{
    mapComponent
  },
  mounted(){
    this.qstj()//趋势统计
  },
  methods:{
    qstj(){
           var qstjContent = this.$echarts.init(document.getElementById("qstjContent"));
            var dataIPSxAxis = ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月'];
 var dataIPS = [20, 60, 50, 80, 120, 100,20,19,60,88,11,77];
 var option = {
     title: {
         text: '（件）',
         textStyle: {
             fontSize: 12,
             fontWeight: 'normal',
             color: 'rgba(255,255,255,1)' //标题颜色
         },
         left: '2%',
     },
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
         top: '25px',
         right: '20px',
         bottom: '10px',
         containLabel: true
     },
     xAxis: [{
         type: 'category',
         boundaryGap: false,
         data: dataIPSxAxis,
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
                        show: false,
                    },
         axisLine: {
             show:false,
             lineStyle: {
                 color: 'rgba(255,255,255,1)',
                 width: 0.5, //这里是为了突出显示加上的
             }
         }
     }],
     yAxis: [{
         type: 'value',
         axisLine: {
             show:false,
             onZero: false,
             lineStyle: {
                 color: 'rgba(255,255,255,1)',
                 width: 1, //这里是为了突出显示加上的
             }
         },
         axisTick: {
                        show: false,
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
             show: false,
             lineStyle: { //y轴网格线设置
                 color: '#0a2b52',
                 width: 1,
                 type: 'solid'
             }
         },
     }],
     series: [
         {
             name: '件数',
             type: 'line',
             smooth: false,
             //  symbol: "none", //去掉折线点
             stack: 100,
             itemStyle: {
                 normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                         offset: 0,
                         color: 'rgba(0,255,255, 1)' // 0% 处的颜色
                     }, {
                         offset: 1,
                         color: 'rgba(0,255,255, 0)' // 100% 处的颜色
                     }]), //背景渐变色
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
             data: dataIPS,
         },
     ]
 };
           // 绘制图表
           qstjContent.setOption(option);
      },
  }
}
</script>

<style lang="scss" scoped>
.home-page-center{
    // display:inline-block;
    // flex:0 0 1300px;
    // min-width:1300px;
    height:1000px;
    width:1230px;
    padding-top:30px;
    .center-box{
        position: relative;
        background:rgba(0,0,0,0.4);
        border:1px solid rgba(1,218,226,1);
        width:1211px;
        height:550px;
        
    }
    .qstjBox{
        width:1212px;
        margin-top:10px;
        // padding-top:30px;
        padding-left:30px;
        border:1px solid #00FFFF;
        border-radius: 8px;
        background: rgba(0,178,226, 0.2);
        .qstj-label {
        display: flex;
        align-items: center;
        margin-bottom:10px;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .qstj {
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
    }
    .sumBox{
        display: flex;
        font-size:18px;
        color:rgba(11,193,244,1);
        line-height:22px;
        align-items: center;
        justify-content: center;
        margin-bottom:15px;
        p{
            display: flex;
            margin-right:30px;
            align-items: center;
            ol{
                li{
                    display: inline-block;
                    border-radius: 4px;
                    font-size:38px;
                    color:rgba(255,255,255,1);
                    width:27px;
                    height:43px;
                    background-color:blue;
                    text-align: center;
                    line-height: 41px;
                    margin-left: 5px;
                     background: -webkit-linear-gradient(#0BE5F1, #0C99F7); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(#0BE5F1, #0C99F7); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(#0BE5F1, #0C99F7); /* Firefox 3.6 - 15 */
                    background: linear-gradient(#0BE5F1, #0C99F7); /* 标准的语法（必须放在最后） */
                }
            }
        }
    }
}
</style>