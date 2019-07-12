<template>
    <div class="outer-judicial-page">
        <date-picker
                :dateChange="setSelectTime"
        ></date-picker>
        <div class="menuBox" @mouseover="mouseOver" @mouseleave="mouseLeave">
            <ul class="menu">
                <div class="shrink"></div>
                <li :class="now === index ? 'col':null" v-for="(item,index) in menuList" :key="index"
                    @click="menuHandle(index)">
                    <p class="bg_img" :style="{backgroundImage:'url('+item.img+')'}"></p>
                    <p>{{item.title}}</p>
                </li>
            </ul>
            <span class="bg_img shrink3j" v-show="shrink" :style="{backgroundImage:'url('+threeImg+')'}"></span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import DatePicker from '@/components/common/date-picker';

	export default {
		data() {
			return {
				shrink   : true,
				now      : 0,
				threeImg : require('@/public/img/judicature/3j.png'),
				shrinkImg: require('@/public/img/judicature/shrink.png'),
				menuList : [
					{
						title: '刑事',
						img  : require('@/public/img/judicature/jw.png')
					},
					{
						title: '民事',
						img  : require('@/public/img/judicature/ks.png')
					},
					{
						title: '行政',
						img  : require('@/public/img/judicature/ms.png')
					},
					{
						title: '公益诉讼',
						img  : require('@/public/img/judicature/ss.png')
					},
					{
						title: '未检',
						img  : require('@/public/img/judicature/wj.png')
					},
					{
						title: '控申',
						img  : require('@/public/img/judicature/xs.png')
					},
					{
						title: '检委办/检察技术',
						img  : require('@/public/img/judicature/xz.png')
					}
				],
			}
		},
		created() {
			if(!JSON.parse(sessionStorage.getItem('menu'))) {
				sessionStorage.setItem('menu', JSON.stringify(0))
			}
			this.now = JSON.parse(sessionStorage.getItem('menu'))
		},
		methods   : {
			// 移入
			mouseOver() {
				document.querySelector('.menu').style.width = "149px";
				this.shrink                                 = false
			},
			// 移出
			mouseLeave() {
				document.querySelector('.menu').style.width    = "0px"
				document.querySelector('.menu').style.overflow = "hidden"
				this.shrink                                    = true
			},
			menuHandle(i) {
				switch(i) {
					case 0:
						this.now = 0
						sessionStorage.setItem('menu', JSON.stringify(0))
						this.$router.push('/judicial/criminal')
						break;
					case 1:
						this.now = 1
						sessionStorage.setItem('menu', JSON.stringify(1))
						this.$router.push('/judicial/civil')
						break;
					case 2:
						this.now = 2;
						sessionStorage.setItem('menu', JSON.stringify(2))
						this.$router.push('/judicial/administrative')
						break;
					case 3:
						this.now = 3;
						sessionStorage.setItem('menu', JSON.stringify(3))
						this.$router.push('/judicial/lawsuit')
						break;
					case 4:
						this.now = 4;
						sessionStorage.setItem('menu', JSON.stringify(4))
						this.$router.push('/judicial/inspect')
						break;
					case 5:
						this.now = 5;
						sessionStorage.setItem('menu', JSON.stringify(5))
						this.$router.push('/judicial/control')
						break;
					case 6:
						this.now = 6;
						sessionStorage.setItem('menu', JSON.stringify(6))
						this.$router.push('/judicial/procuratorial')
						break;
					default:
						break;
				}
			},
			...mapActions('judicial', ['setSelectTime']),
		},
		beforeDestroy() {
			sessionStorage.setItem('menu', JSON.stringify(0))
		},
		components: ['DatePicker']
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
            top: -69px;
            left: -40px;
            .menu {
                transition: width 1s;
                width: 0px;
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
    }
</style>
