<template>
    <div class="outer-judicial-page">
        <date-picker
                :dateChange="setSelectTime"
                :nowSelectDate="dateSection"
        >
        </date-picker>
        <div class="menuBox" :style="{ width: `${menuWidth}px` }" @mouseleave="mouseLeave">
            <ul class="menu">
                <div class="shrink"></div>
                <li v-for="item in menuList"
                    :class="selectMenu === item.url ? 'col':null"
                    :key="item.id"
                    @click="menuHandle(item)"
                >
                    <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}"></p>
                    <p>{{item.title}}</p>
                </li>
            </ul>
        </div>
        <div class="shrink3j"
             @mouseover="mouseOver"
             v-show="shrink"
        >
            <div class="shrink3j-img" :style="{backgroundImage:'url('+threeImg+')'}"></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import DatePicker                 from '@/components/common/date-picker';

	export default {
		data() {
			return {
				shrink       : true,
				nowSelectMenu: 'criminal',
				threeImg     : require('@/public/img/judicature/3j.png'),
				shrinkImg    : require('@/public/img/judicature/shrink.png'),
				menuList     : [
					{
						id   : 'criminal',
						title: '刑事',
						url  : '/judicial/criminal',
						img  : require('@/public/img/judicature/jw.png')
					},
					{
						id   : 'civil',
						title: '民事',
						url  : '/judicial/civil',
						img  : require('@/public/img/judicature/ks.png')
					},
					{
						id   : 'administrative',
						title: '行政',
						url  : '/judicial/administrative',
						img  : require('@/public/img/judicature/ms.png')
					},
					{
						id   : 'lawsuit',
						title: '公益诉讼',
						url  : '/judicial/lawsuit',
						img  : require('@/public/img/judicature/ss.png')
					},
					{
						id   : 'inspect',
						title: '未检',
						url  : '/judicial/undetected',
						img  : require('@/public/img/judicature/wj.png')
					},
					{
						id   : 'prosecution',
						title: '控申',
						url  : '/judicial/prosecution',
						img  : require('@/public/img/judicature/xs.png')
					},
					{
						id   : 'checkCharter',
						title: '检委办/检察技术',
						url  : '/judicial/checkCharter',
						img  : require('@/public/img/judicature/xz.png')
					}
				],
				menuWidth    : 0,
			}
		},
		computed  : {
			...mapGetters('judicial', ['dateSection']),
			...mapGetters('menuModules', ['userId', 'selectMenu']),
		},
		methods   : {
			// 移入
			mouseOver() {
				this.menuWidth = 149;
				this.shrink    = false;
			},
			// 移出
			mouseLeave() {
				this.menuWidth = 0;
				this.shrink    = true
			},
			menuHandle(menuInfo) {
				this.nowSelectMenu = menuInfo.id;
				this.$router.push(`${menuInfo.url}?${this.userId}`);
			},
			...mapActions('judicial', ['setSelectTime']),
		},
		beforeDestroy() {
		},
		components: {
			DatePicker
		}
	}
</script>
<style lang="scss" scoped>
    .outer-judicial-page {
        position: relative;
        width: 100%;
        height: 100%;
        .menuBox {
            position: absolute;
            z-index: 11;
            height: 1080px;
            top: -122px;
            left: -40px;
            overflow: hidden;
            transition: width 1s;
            .menu {
                width: 100%;
                height: 100%;
                background: rgba(60, 61, 109, 0.8);
                .col {
                    background: rgba(25, 158, 216, 1);
                }
                .shrink {
                    width: 150px;
                    height: 143px;
                    padding: 47px 0 0 47px;
                    // .rota{
                    //     transform:rotate(180deg);
                    //     transition: all 0.5s;
                    // }
                    // .back{
                    //     transform:rotate(0deg);
                    //     transition: all 0.5s;
                    // }
                }
                li {
                    width: 149px;
                    height: 114px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p:nth-child(2) {
                        margin-top: 20px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                li:nth-of-type(1) {
                    p:nth-child(1) {
                        width: 39px;
                        height: 31px;
                    }
                }
                li:nth-of-type(2) {
                    p:nth-child(1) {
                        width: 37px;
                        height: 38px;
                    }
                }
                li:nth-of-type(3) {
                    p:nth-child(1) {
                        width: 34px;
                        height: 39px;
                    }
                }
                li:nth-of-type(4) {
                    p:nth-child(1) {
                        width: 39px;
                        height: 38px;
                    }
                }
                li:nth-of-type(5) {
                    p:nth-child(1) {
                        width: 33px;
                        height: 42px;
                    }
                }
                li:nth-of-type(6) {
                    p:nth-child(1) {
                        width: 33px;
                        height: 39px;
                    }
                }
                li:nth-of-type(7) {
                    p:nth-child(1) {
                        width: 34px;
                        height: 39px;
                    }
                }
            }
        }
        .shrink3j {
            position: absolute;
            top: 0;
            left: -52px;
            width: 22px;
            height: 100%;
            .shrink3j-img{
                position: absolute;
                top:50%;
                transform: translate(0, -50%);
                width: 35px;
                height: 50px;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: 100%;
                cursor: pointer;
            }
        }

    }
</style>
