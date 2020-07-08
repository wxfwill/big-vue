<template>
    <div class="bg_img home-page" :style="{ backgroundImage: `url(${bjBg})` }">
        <div class="bg_img bjt">最高人民检察院大数据决策支持平台</div>
        <ul class="ul-title" v-if="menuList.length > 1">
            <li class="bg_img"
                v-for="item in menuList"
                :key="item.id"
                :style="{backgroundImage:`url(${selectMenu.indexOf(item.id) === -1 ? buttonImg : buttonColorImg})`}"
                @click="pageRouterChange(item.id, item.url)"
            >
                {{item.name}}
            </li>
        </ul>
        <div class="time-box" v-if="selectMenu.indexOf('judicial') === -1 ">
            <date-time></date-time>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import DateTime                   from '@/components/common/DateTime.vue';

	export default {
		data() {
			return {
				buttonImg     : require('@/public/img/home/home_08.png'),
				bjBg          : require('@/public/img/home/bj.png'),
				buttonColorImg: require('@/public/img/home/home_07.png'),
				clock         : null,
				week          : null,
				hashRoute     : '',
			}
		},
		computed  : {
			...mapGetters('menuModules', ['menuList', 'userId', 'selectMenu']),
		},
		methods   : {
			pageRouterChange(id, url) {
				this.$router.push(`${url}?${this.userId}`);
			}
		},
		components: {
			DateTime
		},
	}
</script>

<style lang="scss" scoped>
    .home-page {
        width: 3840px;
        height: 1080px;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        padding: 69px 20px 20px 32px;
        background: #143881;
        position: relative;
        background-size: 100% 100%;
        .container {
            width: 100%;
            margin-top: 49px;
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
            position: absolute;
            left: 40px;
            top: 50px;
        }
    }
</style>