<template>
    <div class="outer-lawsuit-page">
        <div class="lawsuit-page-left">
            <p class="tab"><span></span>&nbsp;&nbsp;公益诉讼</p>
            <div class="left-top">
                <div class="bor_col civil">
                    <p class="title">民事公益诉讼基本情况</p>
                    <ul>
                        <li v-for="(item,index) in civilList" :key="index">{{item}}</li><span>宗</span> 
                    </ul>
                    <div class="data">
                        <p>受理件数：186911111 <br/> <span>办结率：23.48%</span></p>
                        <p>办结件数：5800 <br/> <span>提出检察建议数：3456</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            civilList:[1,8,2,7,2,3]
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-lawsuit-page{
    display: flex;
    .lawsuit-page-left{
        width:1283px;
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
            .left-top{
                display: flex;
                .civil{
                    width:578px;
                    height:205px;
                    padding:20px 0 0 20px;
                    .title{
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        color:rgba(255,255,255,1);
                    }
                    ul{ 
                        border:1px solid #26A3EF;
                        border-right:none;
                        display: flex;
                        margin:23px 0 0 64px;
                        font-size:18px;
                        color:rgba(255,255,255,1);
                        li{
                            width:48px;
                            height:48px;
                            border-right: 1px solid #26A3EF;
                            font-size:36px;
                            color:rgba(0,255,255,1);
                            text-align: center;
                            line-height:48px;
                        }
                        span{
                            margin:21px 0 0 30px;
                        }
                    }
                    .data{
                            display: flex;
                            justify-content:space-around;
                            margin-left:60px;
                            margin-top:20px;
                            p{
                                    font-size:16px;
                                    font-family:MicrosoftYaHei;
                                    color:rgba(255,255,255,1);
                                    span{line-height:34px;}
                            }
                        }
                }
            }
    }
}
</style>
