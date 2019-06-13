<template>
    <div class="header-time-page">
        <p class="tab" v-show="moduleName"><span></span>&nbsp;&nbsp;&nbsp;{{moduleName}}</p>
        {{clock}} &nbsp;{{week}}</div>
</template>
<script>
export default {
    props:{
        moduleName:{type:String,default:''}
    },
    data() {
      return {
         clock:null,
          week:null 
      }
  },
  created(){
    this.dataHandle()
  },
  methods: {
      dataHandle(){//每个页面的当前时间
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
      }
  },
}
</script>
<style lang="scss" scoped>
.header-time-page{
          position:absolute;
          left:0px;
          top:-10px;
          font-size:15px;
          color:#ffffff;
          display: inline-block;
          .tab{ display: inline-block;
                margin-right:63px;
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
        }
</style>
