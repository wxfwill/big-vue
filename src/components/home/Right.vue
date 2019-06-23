<template>
  <div class="home-page-right">
    <div class="content-box">
    <div class="left-view">
    <!-- 民事 -->
    <div class="bg_img civil-box" :style="{backgroundImage:'url('+civilBoxImg+')'}">
      <p>民事</p>
      <ul>
          <li v-for="(item,index) in msList" :key="index">
            <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}">{{item.num}}</p>
            <p>{{item.title}}</p>
          </li>
        </ul>
    </div>
    <div>

    </div>
    <div class="middlePortion">
    <!-- 行政 -->
    <!-- 公益诉讼 -->
      <div class="administrationBox">
        <div class="bor_col administration">
          <div class="admin-label">
              <span class="admin"></span>
              <i>行政</i>
          </div>
          <div class="admin-box">
          <water-polo v-for="(item,index) in xzList" :key="index" :item="item" :ID="`pol${index}`" width='86px' height='86px'></water-polo>
          </div>
        </div>
        <div class="bor_col lawsuitBox">
          <div class="lawsuit-label">
              <span class="lawsuit"></span>
              <i>公益诉讼</i>
          </div>
        <div id="lawsuitContent" :style="{width: '340px', height: '210px'}"></div>
        </div>
      </div>
    </div>
    <div class="bottomPortion">
      <!-- 人均办结数 -->
      <div class="bor_col perCapita">
        <div class="perCapita-label">
              <div class="perCap"></div>
              <i>人均办结数</i>
          </div>
        <p v-for="(item,index ) in rjList" :key="index"><i>{{item.title}}</i><span></span>{{item.num}}</p>
      </div>
      <!-- 案均办办理天数 -->
      <div class="bor_col fileCapita">
        <div class="fileCapita-label">
              <div class="fileCap"></div>
              <i>案均办理天数</i>
          </div>
        <p v-for="(item,index ) in ajList" :key="index"><i>{{item.title}}</i><span :style="{backgroundColor:item.col}"></span>{{item.num}}</p>
      </div>
    </div>
    </div>
    <div class="right-view">
      <div class="bor_col team-construction">
        <div class="team-label">
              <span class="team"></span>
              <i>队伍建设</i>
          </div>
          <P>总数：365842</P>
          <div id="dougBox" :style="{width: '436px', height: '300px'}">
          </div>
          <!-- <div class="bg_img bar" :style="{backgroundImage:'url('+barImg+')'}"></div> -->
      </div>
      <div class="bor_col analyze-box">
        <div class="block">
          <div class="age-label">
                <span class="age"></span>
                <i>实证分析</i><h6></h6><h5>{{swiperTitle}}</h5>
              </div>
           <el-carousel indicator-position="outside" :interval='0' arrow='never' @change="cutHandle">
            <el-carousel-item>
              <div id="agePie" :style="{width: '360px', height: '400px'}"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div id="education" :style="{width: '400px', height: '360px'}"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div id="tendency" :style="{width: '400px', height: '400px'}"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts';
import 'echarts-liquidfill/src/liquidFill.js'; //在这里引入
import waterPolo from '@/components/sfba/water-polo.vue'
export default {
  name: 'homeRight',
  components:{
    waterPolo
  },
  data() {
      return {
        swiperTitle:'',
        barImg:require('@/public/img/home/bar.png'),
        civilBoxImg:require('@/public/img/home/civilBox.png'),
        msList:[{img: require('@/public/img/home/mssljs.png'),title:'受理控告件数',num: 3434},
              {img: require('@/public/img/home/msbj.png'),title:'受理申诉数',num: 4545},
              {img: require('@/public/img/home/mstc.png'),title:'初查移送立案件数',num: 7877},
              {img: require('@/public/img/home/msks.png'),title:'控告案件在办数',num: 3434},
             {img: require('@/public/img/home/mssp.png'),title:'控告案件办结数',num: 9090},
             {img: require('@/public/img/home/mscn.png'),title:'申诉案件在办数',num: 1231},
             {img: require('@/public/img/home/msls.png'),title:'申诉案件办结数',num: 6767},
             {img: require('@/public/img/home/mszxjd.png'),title:'申诉案件办结数',num: 6767}],
        xzList:[
          {title:'检验鉴定',num:10000,col1:'#22A95F',col2:'#4FDC99'},
          {title:'检验鉴定',num:10000,col1:'#005EFF',col2:'#4FB8FF'},
          {title:'检验鉴定',num:10000,col1:'#FFA11E',col2:'#F3C85D'}
          ],
        date:'2019-05-29',//现在的日期
        startDate:'2019-01-01',
        rjList:[
          {title:'民事',num:1234},
          {title:'公益诉讼',num:16734},
          {title:'行政',num:434},
        ],
        ajList:[
          {title:'民事',num:1234,col:'#2BBFE2'},
          {title:'公益诉讼',num:16734,col:'#33DB83'},
          {title:'行政',num:434,col:'#D68C2B'},
        ],
        placeHolderStyle : {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
}
      };
    },
    mounted(){
      this.ageHandle()//年龄饼图
      this.gyssHandle()//柱状图
      this.dougHandle()//圆环图
      this.rjHandle()//人均相对
      this.ajHandle()//案均相对
      this.education()//教育程度
      this.tendencyHandle()//趋势
    },
    methods: {
      cutHandle(n){//切换轮播事件
      switch (n) {
        case 0:
          this.swiperTitle='年龄结构'
          break;
         case 1:
          this.swiperTitle='危险驾驶罪受教育程度分析'
          break;
          case 2:
          this.swiperTitle='危险驾驶罪年度趋势分析'
          break;
        default:
          break;
      }
      },
      
      
      tendencyHandle(){
        var tendency = this.$echarts.init(document.getElementById("tendency"));
        var colors = ['#61E6D6', '#9961E6', '#0000FF','#FFFF00'];

 var option = {
    color: colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {type: 'cross'}
    },
    grid: {
        right: '8%',
        bottom:'12%'
    },
    legend: {
      right:'8%',
      top:'5%',
        data:['line1','line3'],
        textStyle: {
            color: "rgba(255,255,255,1)"
        }
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show:false,
                alignWithLabel: false
            },
            axisLabel:{
                fontSize:18,
                interval:0,
                rotate:0,
                textStyle:{
                  color:'rgba(255,255,255,1)'
                },
                showMinLabel:true,
                showMaxLabel:true
            },
            axisLine: {
                show:false
            },
            tooltip:{
                backgroundColor:'rgba(0,0,255,0.5)'
            },
            data: ['one','two','three','four','five']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'UPH',
            show:false,
            position: 'right',
            axisLine: {
                lineStyle:{
                    color:colors[1]
                }
            },
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: false
            }
        },
        {
            type: 'value',
            name: ' ',
            interval:100,
            position: 'left',
            axisLabel: {//文本及线的修改
               fontSize:18,
                textStyle:{
                color:'rgba(255,255,255,1)',
                }
            },
            axisLine: {
                lineStyle:{
                    color:colors[0]
                }
            },
            axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		splitLine:{
		    show:false,
		}
        }
    ],
    series: [
        {
            name:'line1',
            type:'line',
            yAxisIndex: 0,
            data:[180, 185, 187, 181, 185]
        },
        {
            name:'line2',
            barWidth:55,
            type:'bar',
            color:'rgba(25,134,222,0.3)',
            yAxisIndex: 1,
            data:(function(){
            var data = [];
            for(var i=0;i<5;i++){
                data.push(700)
            }
            return data
        })()
        },
        {
            name:'line3',
            type:'line',
            yAxisIndex: 1,
            data:[20, 20, 20, 20, 20]
        },
        // {
        //     name:'line4',
        //     type:'line',
        //     yAxisIndex: 1,
        //     data:[24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
        // }
        
    ]
};

      tendency.setOption(option);
      },
      ageHandle(){
         var agePie = this.$echarts.init(document.getElementById("agePie"));
        var rich = { /*定义颜色*/
    yellow: {
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        padding: [5, 0],
        align: 'bottom',
    }
};
 var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    grid:{
      top:20
    },
    left:'center',
    legend: {
        orient: 'horizontal',
        width:400,
        
        left:'10%', //控制lengend距离玫瑰图距离
        bottom:'10%',
        // y: 'center',
        // icon: 'circle',//圆形，默认长方
        textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 14,
            rich: rich, //!-- 填充颜色,
            width: 130,
            height: 20,
        },
        padding: [0, 0, 0, 0],
        itemWidth: 40,
        itemHeight: 20,
        itemGap: 20,
        data: ['0-18岁', '18-25岁', '25-35岁','35-45岁','45-55岁','55岁以上'],
        formatter: function(name) {
            let oa = option.series[0].data;
            let total = 0;
            oa.forEach((item, index) => {
                total += item.value;
            });
            for (let i = 0; i < oa.length; i++) {
                if (name == oa[i].name) {
                    // return name + '  ' + '{style'+i+'|' + (oa[i].value / total * 100).toFixed(2) + '%}';
                    // return name+ ' {yellow|' + (oa[i].value / total * 100).toFixed(2) + '%}';
                    return name+ ' {yellow|' +'}';
                }
            }
        },
    },
    graphic: {
        elements: [{
            type: 'image',
            style: {
                // image: giftImageUrl, //圆心设置图片
                width: 40,
                height: 40
            },
            // left: 'center',
            // top: 'center'
        }]
    },
    color:['#34A4F7', '#33D1F8', '#39B9CA','#73EEF4','#7985CB','#00BFA7'],
    // color:viewColor,
    calculable: false,
    series: [{
        name: '年龄',
        type: 'pie',
        radius: [20, 110], //第一个参数控制玫瑰图圆心大小,第二个参数控制玫瑰图大小
        center: ['50%', '35%'],
        roseType: 'radius',
        width: '100%', // for funnel
        max: 80, // for funnel
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        // data:data,
        data: [{
                value: 1000,
                name: '0-18岁'
            },
            {
                value: 850,
                name: '18-25岁'
            },
            {
                value: 750,
                name: '25-35岁'
            },
            {
                value: 1000,
                name: '35-45岁'
            },
            {
                value: 850,
                name: '45-55岁'
            },
            {
                value: 750,
                name: '55岁以上'
            }
        ]
    }]
};
        agePie.setOption(option);
      },
      education(){
        var education = this.$echarts.init(document.getElementById("education"));

        var option = {
    color: ['#74F0DD'],//柱状颜色
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: "{b} <br>人数: {c}"//y value值
    },
    /*legend: {
        data: [date]
    },*/
    grid: {
        show:false,
        left: '4%',
        right: '4%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        min: 0,
        max: 600,
        interval:100,
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: 'rgba(255,255,255,1)',
                fontSize:18,
                fontWeight: '80'
            }
        },
        splitLine:{//隐藏垂直网格
				show:false
        },
        axisLine: {
            show: false //隐藏X轴轴线
        },
        axisTick: {
            show: false //隐藏X轴刻度
        },
    },
    yAxis: {
        type: 'category',
        data: ['文盲或者半文盲', '小学', '初中', '中专', '中技', '高中', '专科','大学及以上','不详'],
        axisLine: {
            show: false //隐藏X轴轴线
        },
        axisTick: {
            show: false //隐藏X轴刻度
        },
        axisLabel: {
            show: true,
            interval: 0,
            rotate: 0,
            // margin: 10,
            inside: false,
            textStyle: {
                color: 'rgba(255,255,255,1)',
                fontSize:18,
                fontWeight: '50',
            }
        }
    },
    series: [{
        type: 'bar',
        barWidth:6,
                itemStyle: {//柱状圆角
                    normal: {
                        barBorderRadius:3
                    }
                },
        // label: {
        //     normal: {
        //         show: true,
        //         // formatter: '{c}',
        //         formatter: function(v) {
        //             var val = v.data;
        //             if (val == 0) {
        //                 return '';
        //             }
        //             return val;
        //         },
        //         color: '#ffffff',
        //         fontSize:'8'
        //     }
        // },
        data: [220, 130, 440, 550, 470, 280, 188,600,567]
    }]
};
        education.setOption(option);
      },
      rjHandle(){//
      let rjget = document.querySelectorAll('.perCapita span')
      let sum=0;
      for (let i = 0; i < this.rjList.length; i++) {
        const element = this.rjList[i].num;
        sum = sum+element
      }
      for (let i = 0; i < rjget.length; i++) {
        const el = rjget[i];
        const num = this.rjList[i].num 
        el.style.width=(num/sum*200)+'px'
      }
      },
      ajHandle(){
        let ajget = document.querySelectorAll('.fileCapita span')
      let sum=0;
      for (let i = 0; i < this.ajList.length; i++) {
        const element = this.ajList[i].num;
        sum = sum+element
      }
      for (let i = 0; i < ajget.length; i++) {
        const el = ajget[i];
        const num = this.ajList[i].num 
        el.style.width=(num/sum*200)+'px'
      }
      },
      gyssHandle(){
        var lawsuitContent = this.$echarts.init(document.getElementById("lawsuitContent"));
        var data1 = [197, 197, 197,197,197];
var data2 = [198,198,198,198, 198];
var datacity = ['济南市', '青岛市', '淄博市', '枣庄', '东营'];
var option = {
    cursor:'pointer',
    color: ['rgba(11,229,241,1)','rgba(12,153,247,1)'],
    tooltip: {
        trigger: 'axis',
    },
    legend: {
      textStyle:{
            color:'#ffffff'
        },
        width:1000,
        itemWidth:10,
        itemHeight:10,
        left:'30%',
        top: '0',
        data: ['民事公益诉讼','行政公益诉讼'],
    },
    grid: { //图表的位置
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
    },
    yAxis: [{
        type: 'value',
        axisLine:{
           show:false,         
       },  
       "axisTick":{       //y轴刻度线
          "show":false
        },
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} ',
            textStyle: {
                fontSize: 10,
                color: '#ffffff'
            },
        },
        splitLine: {
            show: false,
            lineStyle: {
                
                type: 'dashed'
            },
            
        },
        show: true

    }],
    xAxis: [
        {
            max:5,
            axisLine:{
           show:false,         
       },  
       "axisTick":{       //x轴刻度线
          "show":false
        },
        type: 'category',
        axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 15,
            textStyle: {
                fontSize: 10,
                color: '#ffffff'
            },

        },
        data: datacity,
    }],
    series: [
        
        {
            name: '民事公益诉讼',
            type: 'bar',
            color: 'rgba(11,229,241,1)',
            stack: 'sum1',
            barWidth: '23px',
            data: data1,
            // barCategoryGap:'130',
            label: {
                normal: {
                    show:true,
                    position: ["10%",'50%'],
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 10
                    }
                }
            }
        },
        {
            name: '行政公益诉讼',
            type: 'bar',
            color: 'rgba(12,153,247,1)',
            stack: 'sum1',
            barWidth: '23px',
            data: data2,
            // barCategoryGap:'100',
            label: {
                normal: {
                    show: true,
                    position: ["10%",'50%'],
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 10
                    }
                }
            }
        },
    ]
};
        // 绘制图表
      lawsuitContent.setOption(option);
      },
      dougHandle(){
        var dougBox = this.$echarts.init(document.getElementById("dougBox"));

var option = {
    color: ['#546ef3', '#a6cb09', '#f8bd00'],
    legend: {
        x: 'center',
        y: "88%",//图例移动
        left:'15%',
         icon: 'circle',
         textStyle:{
                color:'rgba(255,255,255,1)'
            },
    },
    emphasis:{
       barBorderRadius: 2,   
    },
    textColor:'red',
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{a} : <br />{c}%",
    },
    polar: {//圆环位置移动
        center: ['50%', '44%'],
        radius: '270%' //图形大小
    },
    angleAxis: {
        show: false,
        startAngle: 90,
        min: 0,
        max: 100
    },
    radiusAxis: {
        type: 'category',
        show: false,
        data: ["4权重媒体", "3级权重媒体", "5级权重媒体"]
    },
    series: [
        {   
            type: "bar",
            name: "级权重媒体",
            coordinateSystem: "polar",
            barWidth:25, //宽度
            color:'#E4B12D',
            barCategoryGap: "100%",
            // data: ["76.25","47.09","22.09"],
            data: ["16.25"],
        },
        {
            type: "bar",
            name: "3级权重媒体",
            coordinateSystem: "polar",
            barWidth:25,
            color:'#4BB0E4',
            barCategoryGap: "40%",
            // data: ["14.09","55.09","27.09"]
            data: ["44.09"]
        },
        {
            type: "bar",
            color:'red',
            name: "5级权重媒体",
            coordinateSystem: "polar",
            barWidth:25,
            color:'#E85558',
            barCategoryGap: "40%",
            // data: ["9.66","23.09","53.09"]
            data: ["59.66"]
        }
    ]
};

// 绘制图表
      dougBox.setOption(option);
      }
    },
}
</script>

<style lang="scss" scoped>
.home-page-right{
    // flex:0 0 1242px;
    // min-width:1242px;
    height:900px;
    width:1228px;
    margin-top: 65px;
    .content-box{
      display: flex;
    .left-view{
      .civil-box{
        width:730px;
        height:400px;
        padding:15px 38px 25px 60px;
        p:nth-of-type(1){
          margin-top:8px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
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
            width:95px;
          height:95px;
          border-radius:50%;
          font-size:14px;
          color:rgba(255,255,255,1);
          line-height:95px;
          }
          P:nth-child(2){
            width:145px;
            font-size:18px;
            text-align: center;
            color:rgba(255,255,255,1);
            margin-top:8px;
          }
        }
      }
      }
      .administrationBox{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      .administration{
        width:354px;
        height:256px;
        padding:11px 26px 57px 25px; 
        margin-left:9px;
        .admin-label {
        display: flex;
        align-items: center;
        margin-bottom:10px;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .admin {
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      .admin-box{
        display: flex;
        justify-content: space-around;
        margin-top: 40px;
      }
      }
      .lawsuitBox{
        padding: 11px 25px 12px 23px;
        width:354px;
        height:256px;
        margin: 0 0 0 20px;
        .lawsuit-label {
        display: flex;
        align-items: center;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .lawsuit {
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      }
      }
      .bottomPortion{
        margin-top: 25px;
        display: flex;
    .perCapita{
      margin-left: 12px;
      display: inline-block;
      padding:15px 0 0 15px;
      width:354px;
      height:205px;
        .perCapita-label {
        display: flex;
        align-items: center;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .perCap{
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      p{
        display: flex;
        align-items: center;
        margin:12px 0 0 10px;
        color:rgba(255,255,255,1);
        i{
          display: inline-block;
          text-align: center;
          flex:0 37;
          min-width:37px;
          width:37px;
          font-size:18px;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        span{
          margin:0 15px;
          height:8px;
          border-radius: 20px;
          display: inline-block;
          background: -webkit-linear-gradient(
          left,
          #0C7FD8,
           #25CBE9
        ); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(
          right,
          #0C7FD8,
           #25CBE9
        ); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(
          right,
          #0C7FD8,
           #25CBE9
        ); /* Firefox 3.6 - 15 */
        background: linear-gradient(
          to right,
          #0C7FD8,
           #25CBE9
        ); /* 标准的语法（必须放在最后） */
        }
      }
    }

    .fileCapita{
      display: inline-block;
      padding:15px 0 0 15px;
      margin-left:20px;
      width:354px;
      height:205px;
        .fileCapita-label {
        display: flex;
        align-items: center;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .fileCap{
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      p{
        display: flex;
        align-items: center;
        margin:12px 0 0 10px;
        color:rgba(255,255,255,1);
        i{
          display: inline-block;
          text-align: center;
          flex:0 37;
          min-width:37px;
          width:37px;
          font-size:18px;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        span{
          margin:0 15px;
          height:15px;
          display: inline-block;
        }
      }
    }
      }
    }
    .right-view{
      // width:465px;
      // height:452px;
      .team-construction{
        position: relative;
        margin-left:22px;
        width:454px;
        height:399px;
        padding:15px 0 0 15px;
        .team-label {
        display: flex;
        align-items: center;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        .team{
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
      p{
        margin:20px 0 0px 120px;
        font-size:22px;
        font-family:Helvetica;
        color:rgba(0,255,255,1);
      }
      .bar{
                position: absolute;
                width:222px;
                height:222px;
                left:131px;
                top:133px;
              }
      }
      .analyze-box{
        margin:20px 0 0 20px;
        width:454px;
        height:482px;
        padding:15px 0 0 25px;
        .block{
          .age-label {
        display: flex;
        align-items: center;
        i {
          margin: 0 0 0 10px;
          font-size:24px;
          color:rgba(255,255,255,1);
          line-height:29px;
        }
        h6{
          display: inline-block;
          width:52px;
          height:1px;
          background-color: rgba(255,255,255,1);
          margin:0 5px 0 5px;
        }
        h5{
          font-size:18px;
          color:rgba(47,224,190,1);
          line-height:22px;
        }
        .age{
          width:13px;
          height:13px;
          border-radius: 50%;
          background:rgba(0,178,226,1);
        }
      }
          /deep/ .el-carousel--horizontal{
             width:400px;
             height:440px;
             /deep/ .el-carousel__container{
               height:378px;
             }
           }
          /deep/  .el-carousel__button{
              width:30px;
              height:30px;
              border-radius:50%;
            }
                  }
                }
    }
    }
}
</style>