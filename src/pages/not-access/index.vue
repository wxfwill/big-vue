<template>
    <div class="not-access-wrap" >
        <div class="naw-content">
            <img :src="failedImg" alt="" class="not-img">
            <p class="tip-text">403, 您没有权限访问！！！</p>
            <p class="tip-msg">未获取任何数据</p>
            <p class="tip-num">ERR_EMPTY_RESPONSE</p>
            <el-button size="mini" class="close-btn" type="primary" @click="skipLogin">返回首页</el-button>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				bgImg: require('@/public/img/not-access/notAcceccBg.gif'),
                failedImg : require('@/public/img/not-access/not-access.png'),
			}
		},
		name: "index",
        methods:{
			skipLogin(){
				window.location.href = 'http://141.3.119.55';
            }
        }
	}
</script>

<style lang="scss" scoped>
    $pMarginBottom : 16px;
    .not-access-wrap {
        width: 100vw;
        height: 100vh;
        font-size: 75%;
        overflow: hidden;
        .naw-content {
            box-sizing: border-box;
            font-size: 1em;
            line-height: 1.6em;
            margin: 18vh auto 0;
            max-width: 600px;
            color: #5f6368;
            .not-img{
                display: block;
                margin-bottom: 40px;
            }
            .tip-text{
                margin-bottom: $pMarginBottom;
                line-height: 30px;
                font-size: 24px;
                font-weight: 500;
            }
            .tip-msg{
                margin-bottom: $pMarginBottom;
                font-size: 15px;
                font-weight: 500;
                line-height: 24px;
            }
            .tip-num{
                margin-bottom: $pMarginBottom;
                font-size: 12px;
                line-height: 24px;
            }
            .close-btn{
                margin: 51px 0 16px;
                background-color: rgb(26, 115, 232);
                border: 0;
                border-radius: 4px;
                box-sizing: border-box;
                color: #fff;
                cursor: pointer;
                font-size: .875em;
                padding: 10px 18px !important;
                transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
                user-select: none;
            }
        }
    }
</style>