<template>
    <div class="bg_img home-page" :style="{ backgroundImage: `url(${bjBg})` }">
        <div class="bg_img bjt">最高人民检察院大数据决策支持平台</div>
        <ul class="ul-title">
            <li class="bg_img"
                v-for="item in menuList"
                :key="item.id"
                :style="{backgroundImage:`url(${item.id === nowRoute ? buttonColorImg: buttonImg})`}"
                @click="pageRouterChange(item.id, item.url)"
            >
                {{item.name}}
            </li>
        </ul>
        <div class="time-box" :style="{ left: `${ dateTimeLeftOffset }px` }">
            <date-time></date-time>
        </div>
        <div class="container">
            <router-view ref="sfba"></router-view>
        </div>
    </div>
</template>

<script>
	import DateTime from '@/components/common/DateTime.vue';

	export default {
		name      : 'home',
		data() {
			return {
				nowRoute      : 'homePage',
				menuList      : [{
					id  : 'homePage',
					name: '首页',
					url : '/',
				}, {
					id  : 'judicialCase',
					name: '司法办案',
					url : '/judicial',
				}, {
					id  : 'teamManagement',
					name: '队伍管理',
					url : '/teamManagement',
				}, {
					id  : 'prosecutionOffice',
					name: '检察办公',
					url : '/checkOffice',
				}, {
					id  : 'inspectionGuarantee',
					name: '检务保障',
					url : '/inspectionGuarantee',
				}],
				buttonImg     : require('@/public/img/home/home_08.png'),
				bjBg          : require('@/public/img/home/bj.png'),
				buttonColorImg: require('@/public/img/home/home_07.png'),
				clock         : null,
				week          : null,
			}
		},
		computed  : {
			dateTimeLeftOffset() {
				return this.nowRoute === 'judicialCase' ? 140 : 0;
			}
		},
		created() {
			const hash      = location.hash.substr(1),
				  parentUrl = hash.substring(0, hash.substr(1).indexOf('/') + 1) || hash,
				  nowRoute  = this.menuList.find(i => parentUrl === i.url) || {};
			this.nowRoute   = nowRoute.id;
		},
		methods   : {
			pageRouterChange(id, url) {
				this.$router.push(url);
				this.nowRoute = id;
			}
		}
		,
		components: {
			DateTime
		}
	}
</script>

<style lang="scss" scoped>
    .home-page {
        display: flex;
        justify-content: flex-start;
        padding: 69px 20px 20px 32px;
        background: #143881;
        height: 100%;
        width: 100%;
        overflow: hidden;
        // height: 1080px;
        // width:3840px;
        position: relative;
        background-size: 100% 100%;
        .container {
            width: 100%;
            margin-top: 49px;
        }
        .popupBox {
            z-index: 55;
            position: fixed;
            top: 0;
            left: 0;
            width: 3840px;
            height: 1080px;
            background: rgba(0, 0, 0, 0.7);
            .backColor {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2490px;
                height: 520px;
                background-color: #062355;
                border: 1px solid #12E9E9;
                position: relative;
                margin-left: 660px;
                margin-top: 275px;
                .popupClose {
                    text-align: center;
                    line-height: 38px;
                    position: absolute;
                    right: 50px;
                    top: 35px;
                    width: 38px;
                    height: 38px;
                    background: rgba(18, 175, 171, 1);
                    border-radius: 50%;
                    color: #FFFFFF;
                }
            }
        }
        .bjt {
            position: absolute;
            left: 0;
            top: 20px;
            width: 100%;
            height: 68px;
            background-image: url('../public/img/home/header.png');
            font-size: 24px;
            font-family: Helvetica;
            color: rgba(255, 255, 255, 1);
            line-height: 80px;
            text-indent: 46px;
            text-align: center;
        }
        .ul-title {
            position: absolute;
            top: 42px;
            left: 720px;
            li {
                cursor: pointer;
                height: 38px;
                width: 178px;
                display: inline-block;
                margin-right: 80px;
                text-align: center;
                line-height: 45px;
                font-size: 16px;
                font-family: Helvetica;
                color: rgba(255, 255, 255, 1);
            }
            li:nth-child(3) {
                margin-right: 1071px;
            }
        }
        .time-box {
            position: relative;
        }
    }
</style>