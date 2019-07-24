<template>
    <div class="outer-judicial-page">
        <date-picker
                :dateChange="setSelectTime"
                :nowSelectDate="dateSection"
        >
        </date-picker>
        <div class="menuBox" @mouseleave="mouseLeave">
            <ul class="menu" :style="{ width: `${menuWidth}px` }">
                <div class="shrink"></div>
                <li v-for="item in menuList"
                    :class="nowSelectMenu === item.id ? 'col':null"
                    :key="item.id"
                    @click="menuHandle(item)"
                >
                    <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}"></p>
                    <p>{{item.title}}</p>
                </li>
            </ul>
            <span
                    class="bg_img shrink3j"
                    @mouseover="mouseOver"
                    v-show="shrink"
                    :style="{backgroundImage:'url('+threeImg+')'}">
            </span>
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
						id    : 'administrative',
						title: '行政',
						url   : '/judicial/administrative',
						img   : require('@/public/img/judicature/ms.png')
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
						url  : '/judicial/inspect',
						img  : require('@/public/img/judicature/wj.png')
					},
					{
						id   : 'chargeAppeal',
						title: '控申',
						url  : '/judicial/chargeAppeal',
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
		},
		created() {
			const hash         = location.hash.substr(1),
				  nowRoute     = this.menuList.find(i => i.url === hash) || {};
			this.nowSelectMenu = nowRoute.id;
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
				this.$router.push(menuInfo.url);
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
            width: 149px;
            height: 1080px;
            top: -122px;
            left: -40px;
            .menu {
                transition: width 1s;
                width: 0;
                overflow: hidden;
                height: 1080px;
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
            }
        }
        .shrink3j {
            width: 22px;
            height: 44px;
            position: absolute;
            top: 50%;
            left: 0px;
        }
        /deep/ .judicial-case-title {
            float: left;
            margin-top: -65px;
            margin-left: 20px;
            font-size: 22px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(48, 226, 226, 1);
            line-height: 30px;
            .title-dot {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(48, 226, 226, 1);
                border-radius: 50%;
                vertical-align: middle;
            }
        }
    }
</style>
