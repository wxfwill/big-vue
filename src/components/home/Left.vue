<template>
  <div class="home-page-left">
    <div class="left-left">
    <div class="right-box">
      <!-- 未jian -->
      <div class="bor_col notCheck-box">
        <p class="notCheck-label">
          <span class="bg_img weijian"></span>
          <i>未检</i>
        </p>
        <div id="wjBox" :style="{width: '700px', height: '320px'}"></div>
        <div class="notCheck-content">
          <div id="ksBox"></div>
        </div>   
      </div>
      <!-- 控申 -->
      <div class="bor_col control-box">
        <p class="control-label">
          <span class="bg_img kos"></span>
          <i>控申</i>
        </p>
        <ul>
          <li v-for="(item,index) in ksList" :key="index">
            <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}">{{item.num}}</p>
            <p :style="{color:item.col}">{{item.title}}</p>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <div class="left-right">
      <!-- 刑事 -->
      <div class="criminal-box" :style="{backgroundImage:'url('+xsImg+')'}">
      <p class="criminal-label">
        刑事概览
      </p>
      <div class="overview-box">
        <div class="line"></div>
        <p v-for="(item,index) in xsList" :key="index">
          <i>{{item.title}}</i>
          <span></span>
          {{item.num}}
        </p>
      </div>
    </div>
    <!-- 起诉top -->
    <div class="bg_img top-box" :style="{backgroundImage:'url('+qszmImg+')'}">
      <p class="title">起诉罪名TOP10</p>
      <ol>
        <li v-for="(item,index) in topList" :key="index">
          <i>{{index+1}}</i>
          <p :style="{backgroundImage:'url('+lineImg+')'}">
            <span>{{item.title}}</span>
            <span>{{item.num}}</span>
          </p>
        </li>
      </ol>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: "homeLeft",
  data() {
    return {
      lineImg:require('@/public/img/home/line.png'),
      xsImg:require('@/public/img/home/box1.png'),
      qszmImg:require('@/public/img/home/qszm.png'),
     xsList:[{title:'受理件数',num: 13434},{title:'办结件数',num: 4545},{title:'在办件数',num: 7877},
             {title:'起诉案件数',num: 9090},{title:'批捕逮捕数',num: 1231}],
     ksList:[{img: require('@/public/img/home/slkg.png'),title:'受理控告件数',num: 3434,col:'rgba(47,224,190,1)'},
              {img: require('@/public/img/home/slss.png'),title:'受理申诉数',num: 4545,col:'rgba(221,166,44,1)'},
              {img: require('@/public/img/home/ccysla.png'),title:'初查移送立案件数',num: 7877,col:'rgba(49,219,232,1)'},
              {img: require('@/public/img/home/kgajzb.png'),title:'控告案件在办数',num: 3434,col:'rgba(0,255,255,1)'},
             {img: require('@/public/img/home/kgajzb.png'),title:'控告案件办结数',num: 9090,col:'rgba(0,255,255,1)'},
             {img: require('@/public/img/home/ssaj.png'),title:'申诉案件在办数',num: 1231,col:'rgba(17,151,242,1)'},
             {img: require('@/public/img/home/ssaj.png'),title:'申诉案件办结数',num: 6767,col:'rgba(17,151,242,1)'}]
     ,topList:[{title:'受理件数',num: 3434},{title:'办结件数',num: 4545},{title:'1111',num: 7877},{title:'受理件数',num: 3434},
             {title:'起诉案件数',num: 9090},{title:'批捕逮捕数',num: 1231},{title:'犯罪又犯罪审查逮捕案件',num: 6767}
             ,{title:'批捕逮捕数',num: 1231},{title:'批捕逮捕数',num: 1231},{title:'批捕逮捕数',num: 1231}]
    }
  },
  mounted() {
    this.wjHandle()//未检
    this.xsHandle()//刑事
  },
  methods: {
    xsHandle(){
      let rjget = document.querySelectorAll('.overview-box span')
      let sum=0;
      for (let i = 0; i < this.xsList.length; i++) {
        const element = this.xsList[i].num;
        sum = sum+element
      }
      for (let i = 0; i < rjget.length; i++) {
        const el = rjget[i];
        const num = this.xsList[i].num 
        el.style.width=(num/sum*600)+'px'
      }
    },
      wjHandle(){
          var wjBox = this.$echarts.init(document.getElementById("wjBox"));
 var option = {
    // backgroundColor: '#0f375f',
    grid: {
        top: "25%",
        bottom: "10%"
    },
    tooltip: {},
    legend: {
        data: ["同比", "投资额"],
        top: "15%",
        textStyle: {
            color: "#ffffff"
        },
        show:false
    },
    xAxis: {
        data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
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
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        {
            name: "",
            type: "bar",
            barWidth: 35,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    ]
};
          // 绘制图表
          wjBox.setOption(option);
      },
  }
};
</script>

<style lang="scss" scoped>
.home-page-left {
  display: flex;
  // flex: 0 0 1242px;
  // min-width: 1242px;
  // height: 1000px;
  width: 1318px;
  padding: 50px 0 0 0px;
  // position: relative;
  .left-left{
    display: flex;
    flex-wrap: wrap;
    width:727px;
  .right-box {
    .animation {
      //动画盒子
      display: flex;
      text-align: center;
      align-items: center;
      width: 113px;
      height: 113px;
      font-size: 14px;
      font-family: Helvetica;
      color: rgba(255, 255, 255, 1);
      padding: 0 28.5px;
    }
    .notCheck-box {
      width:730px;
      height:376px;
      .notCheck-label {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        margin:16px 0 0 31px;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .weijian {
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
    }
    .control-box{
      padding:40px 20px;
      margin-top:20px;
      width:730px;
      height:506px;
       .control-label {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .kos {
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        height:100%;
        justify-content: space-around;
        li{
          text-align: center;
          p:nth-child(1){
            display: inline-block;
            text-align: center;
          padding-top:40px;
            width:98px;
          height:98px;
          border-radius:50%;
          font-size:16px;
          line-height:19px;
          color:rgba(255,255,255,1);
          margin-bottom: 20px;
          }
          P:nth-child(2){
            width:145px;
            font-size: 15px;
            text-align: center;
          }
        }
      }
    }
  }
  .label {
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #33d1f8;
    border-radius: 20px;
  }
  }
  .left-right{
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
      .criminal-box {
    //刑事区
    width: 545px;
    height:320px;
    padding: 80px;
    position: relative;
    .overview-box {
      width:100%;
      position: relative;
      .line{
        position: absolute;
        width:1px;
        height:100%;
        left:116px;
        top: 0;
        background:linear-gradient(360deg,rgba(5,142,226,0.5) 0%,rgba(5,142,226,1) 53%,rgba(5,142,226,0.5) 100%);
        opacity:0.71;
      }
      p {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        text-align: center;
        font-size:12px;
        color:rgba(255,255,255,1);
        line-height:14px;
        i {
          display: inline-block;
          font-size:18px;
          color:rgba(0,255,255,1);
          line-height:22px;
          width:92px;
        }
      }
      span {
        display: inline-block;
        border-radius: 20px;
        width: 146px;
        height: 8px;
        margin: 0 11px 0 51px;
        background: -webkit-linear-gradient(
          left,
          #1ABCE2,
          #2EE8B3
        ); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(
          right,
          #1ABCE2,
          #2EE8B3
        ); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(
          right,
          #1ABCE2,
          #2EE8B3
        ); /* Firefox 3.6 - 15 */
        background: linear-gradient(
          to right,
          #1ABCE2,
          #2EE8B3
        ); /* 标准的语法（必须放在最后） */
      }
      font-size: 12px;
      font-family: Helvetica;
      color: rgba(255, 255, 255, 1);
    }
    .criminal-label {
      position: absolute;
      left:235px;
      top:9px;
      font-size:18px;
      color:rgba(255,255,255,1);
      line-height:22px;
    }
  }
  .top-box{
    width:550px;
    height:575px;
    padding:60px 40px 50px 40px;
    position: relative;
    .title{
      position: absolute;
      left:204px;
      top:5px;
      font-size:18px;
      color:rgba(255,255,255,1);
      line-height:22px;
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
    }
  }
  }
}
</style>