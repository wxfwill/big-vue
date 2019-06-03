<template>
  <div class="bg_img home-page">
    <div class="popupBox" v-show="popupShow">
      <div class="backColor">
        <span class="popupClose" @click="closeHandle">X</span>
      <div id="dataBox" :style="{width: '2350px', height: '330px'}"></div>
      </div>
      </div>
    <div class="bg_img bjt">  &nbsp;最高人民检察院大数据决策支持平台</div>
    <div class="header-time">{{clock}} &nbsp;{{week}}</div>
      <ul class="title">
          <li class="bg_img"  v-for="(item,index) in list" :key="index"
          :style="{backgroundImage:'url('+(index==now?buttonColorImg: buttonImg)+')'}" @click="Handle(item,index)"
          >{{item}}</li>
      </ul>
      <!-- 日期选择 -->
      <div class="dateBox">
      <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="请选择开始日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptionsStart"
      @change="startHandle"
      >
    </el-date-picker>
  </div>
    <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="请选择结束日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptionsEnd"
      @change="endHandle"
      >
    </el-date-picker>
  </div>
   <p>查询</p>
    </div>
    <left/>
    <center></center>
    <right/>
  </div>
</template>

<script>
import Left from '@/components/home/Left.vue'
import Center from '@/components/home/Center.vue'
import Right from '@/components/home/Right.vue'
import * as types from '../../vuex/types.js'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components:{
      Left,
      Center,
      Right
  },
  data() {
      return {
          now:0,
          list:['首页','司法办案','队伍管理','检察办公','检务保障'],
          buttonImg: require('@/public/img/home/home_08.png'),
          buttonColorImg: require('@/public/img/home/home_07.png'),
          clock:null,
          week:null,
          value1:'',
          value2: '',
          pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.value2;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.value1;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              );
            }
          }
        },
      }
  },
  computed:{
        ...mapGetters(['popupShow'])
    },
    watch: {
      popupShow(val){
        this.dataBoxHandle()//全国数据
      }
    },
  created(){
          this.dateHandle()
    var rr = [22,13,6,5000,30];

var max = Math.max.apply(null, rr);
let one =(max+'').split('')[0]//字符串的第一位
console.log(max,one-0,(max+'').split('').length,
           (one-0+1)*Math.pow(10,(max+'').split('').length-1))
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";   
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        this.clock=clock
        this.week = "周" + "日一二三四五六".charAt(new Date().getDay())
  },
  methods:{
    dateHandle(){//获取和修改日期格式
        let now =new Date() 
      var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        this.date = year+'-'
        if(month<10){
          this.date+='0'
        }
        this.date+=month+'-'
        if(day<10){
          this.date+='0'
        }
        this.date+=day
        this.startDate=year+'-01'+'-01'
      },
      startHandle(n){//控件选中的日期
        console.log(this.value1,'start')
      },
      endHandle(n){
        console.log(this.value2,'end')
      },
    closeHandle(){
      this.$store.commit(types.POPUPSHOW,false)
    },
    dataBoxHandle(){
      var dataBox = this.$echarts.init(document.getElementById("dataBox"));
     var option = {
    title: {
        text: '全国各省份数据统计表',
        left:'center',
         textStyle:{
	            color: '#ffffff',
	            fontSize:'36',
              fontWeight:400
         }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
      textStyle:{
            color:'#ffffff'
        },
        data: ['包租费', '装修费', '保洁费'],
        align: 'left',
        right: 100,//柱状图移动
        top:'0%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: [
          '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
        '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
        '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
        '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
          ],
        "axisTick":{       //x轴刻度线
          "show":false
        },
        axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 150,
            textStyle: {
                fontSize: 21,
                color: 'rgba(0,255,255,1)'
            },

        },
    }],
    yAxis: [{
        type: 'value',
        name: '',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                fontSize:21,
                color: 'rgba(0,255,255,1)'
            },

        },
        "axisTick":{       //x轴刻度线
          "show":false
        },
        splitLine: {
        show:true,
        lineStyle:{
           color: ['rgba(216,216,216,0.4)'],
           width: 1,
           type: 'solid'
      }},
    }],
    series: [{
        name: '包租费',
        type: 'bar',
        barWidth : 10,//柱图宽度
        itemStyle: {
            normal: {
                color: '#12E9E9',
            }
          },
        data: [
          20, 12, 31, 34, 31,50,20, 12, 31, 34, 31,50,
          20, 12, 31, 34, 31,50,20, 12, 31, 34, 31,50,
          20, 12, 31, 34, 31,50,20, 
          ]
    }, {
        name: '装修费',
        type: 'bar',
        barWidth : 10,//柱图宽度
        itemStyle: {
            normal: {
             color:'rgba(249,178,32,1)',
            }
          },
        data: [
          10, 20, 5, 9, 3,45,10, 20, 5, 9, 3,45,
          10, 20, 5, 9, 3,45,10, 20, 5, 9, 3,45,
          10, 20, 5, 9, 3,45
          ]
    }, {
        name: '保洁费',
        type: 'bar',
        barWidth : 10,//柱图宽度
        itemStyle: {
            normal: {
        color:'rgba(16,231,126,1)',
            }
          },
        data: [
          1, 1, 2, 3, 1,40,1, 1, 2, 3, 1,40,
          1, 1, 2, 3, 1,40,1, 1, 2, 3, 1,40,
          1, 1, 2, 3, 1,40,3
          ]
    }]
};
      // 绘制图表
      dataBox.setOption(option);
    },
      Handle(item,index){
          switch (index) {
        case 0:
        this.now=0
        console.log(0)
          break
        case 1:
        this.now=1
          console.log(1)
          break
          case 2:
        this.now=2
          console.log(2)
          break
          case 3:
        this.now=3
          console.log(3)
          break
          case 4:
        this.now=4
          console.log(4)
          break
      }
      }
  }
}
</script>

<style lang="scss" scoped>
.home-page{
    display: flex;
    justify-content: flex-start;
    padding: 69px 20px 20px 20px;
    background: #143881;
    height:100%;
    width:100%;
    // height: 1080px;
    // width:3840px;
    background-image: url('../../public/img/home/bj.png');
    position: relative;
   .popupBox{
      z-index:5;
      position: fixed;
      top: 0;
      left: 0;
      width:3840px;
      height:1080px;
      background: rgba(0,0,0,0.7);
      .backColor{
        display: flex;
        justify-content: center;
        align-items: center;
        width:2490px;
        height:520px;
        background-color: #062355;
        border: 1px solid #12E9E9;
        position: relative;
        margin-left:660px;
        margin-top:275px;
        .popupClose{
          text-align: center;
          line-height:38px;
          position: absolute;
          right:50px;
          top:35px;
          width:38px;
          height:38px;
          background:rgba(18,175,171,1);
          border-radius:50%;
          color:#FFFFFF;
        }
      }
    }
    .dateBox{
      position: absolute;
      right: 50px;
      top: 80px;
      .block {
      display: inline-block;
      margin-right:6px;
      position: relative;
     /deep/ .el-input__inner{
        padding-left: 15px;
        text-align: center;
        color:rgba(255,255,255,1);
        border-color:rgba(15,175,211,1);
        background: transparent;
      }
      /deep/ .el-date-editor{
        /deep/ .el-input__prefix {
          top:2px;
          left:215px;
          color:rgba(15,175,211,1);
        }
          width:246px;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
            color:    rgba(15,175,211,1);
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:    rgba(15,175,211,1);
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:    rgba(15,175,211,1);
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            color:    rgba(15,175,211,1);
        }
    }
      p{
        display: inline-block;
        width:81px;
        height:34px;
        font-size:14px;
        color:rgba(255,255,255,1);
        text-align:center;
        line-height:34px;
        background:rgba(51,209,248,1);
      }
    }
    .bjt{
      position:absolute;
      left:0;
      top:20px;
      width:100%;
      height:68px;
      background-image: url('../../public/img/home/header.png');
      font-size:24px;
      font-family:Helvetica;
      color:rgba(255,255,255,1);
      line-height:80px;
      text-indent: 46px;
      text-align: center;
    }
    .header-time{
          position:absolute;
          left:50px;
          top:35px;
          font-size:15px;
          color:#ffffff;
          display: inline-block;
        }
    .title{
        position: absolute;
        top:42px;
        left:910px;
        li{
          cursor: pointer;
            height:38px;
            width:178px;
            display: inline-block;
            margin-right:30px;
            text-align: center;
            line-height:45px;
            font-size:16px;
            font-family:Helvetica;
            color:rgba(255,255,255,1);
        }
        li:nth-child(3){
            margin-right:867px;
        }
    }
}
</style>