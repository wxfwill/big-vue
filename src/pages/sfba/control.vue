<template>
    <div class="outer-control-page">
        <div class="control-page-left">
            <div class="left-left">
                <p class="tab"><span></span>&nbsp;&nbsp;&nbsp;控申</p>
                <div class="bor_col sue">
                    <p class="title">控告受结案数</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-control-page{
    width:100%;
    height:100%;
    display: flex;
    .control-page-left{
        display: flex;
        width:1228px;
        .left-left{
          position: relative;
          .tab{
                position: absolute;
                top:-88px;
                left:30px;
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
            .sue{
                width:610px;
                height:291px;
                padding:20px 0 0 20px;
                .title{
                        font-size:24px;
                        color:rgba(255,255,255,1);
                        font-family:MicrosoftYaHei;
                        margin-bottom:33px;
                       }
            } 
        }
    }
}
</style>
