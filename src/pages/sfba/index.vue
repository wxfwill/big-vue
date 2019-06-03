<template>
    <div class="outer-judicial-page">
        <div class="shrink" @click="rotateHandle">
            <p class="bg_img" :class="rotate?'rota':'back'"  :style="{backgroundImage:'url('+shrinkImg+')'}"></p>
        </div>
        <ul class="menu">
            <li :class="now==index ? 'col':null" v-for="(item,index) in menuList" :key="index" @click="menuHandle(index)">
                <p class="bg_img"  :style="{backgroundImage:'url('+item.img+')'}"></p>
                <p>{{item.title}}</p>
            </li>
        </ul>
         <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            rotate:false,
            now:0,
            menuList:[
                {title:'刑事',img:require('@/public/img/judicature/jw.png')},
                {title:'民事',img:require('@/public/img/judicature/ks.png')},
                {title:'行政',img:require('@/public/img/judicature/ms.png')},
                {title:'公益诉讼',img:require('@/public/img/judicature/ss.png')},
                {title:'未检',img:require('@/public/img/judicature/wj.png')},
                {title:'控申',img:require('@/public/img/judicature/xs.png')},
                {title:'检委办/检察技术',img:require('@/public/img/judicature/xz.png')}
                ],
            shrinkImg:require('@/public/img/judicature/shrink.png')
        }
    },
    methods:{
        rotateHandle(){
            this.rotate=!this.rotate
        },
        menuHandle(i){
            switch (i) {
                    case 0:
                    this.now=0;
                    break;
                    case 1:
                    this.now=1;
                    break;
                    case 2:
                    this.now=2;
                    break;
                    case 3:
                    this.now=3;
                    break;
                    case 4:
                    this.now=4;
                    break;
                    case 5:
                    this.now=5;
                    break;
                    case 6:
                    this.now=6;
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.outer-judicial-page{
    position: relative;
    width:100%;
    height:100%;
    padding:65px 0 0 149px;
    .shrink{
        width:150px;
        height:143px;
        position: absolute;
        top:-69px;
        left:-20px;
        padding:47px 0 0 47px;
        background:rgba(60,61,109,1);
        .rota{
            transform:rotate(180deg);
            transition: all 0.5s;
        }
        .back{
            transform:rotate(0deg);
            transition: all 0.5s;
        }
        p{  
            width:55px;
            height:55px;
        }
    }
    .menu{
        position: absolute;
        top:69px;
        left:-20px;
        width:149px;
        height:941px;
        background:rgba(60,61,109,1);
        .col{
            background:rgba(25,158,216,1);
        }
        li{
            width:149px;
            height:114px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p:nth-child(2){
                margin-top:20px;
                font-size:14px;
                color:rgba(255,255,255,1);
            }
        }
        li:nth-child(1){
            p:nth-child(1){
                width:39px;
                height:31px;
            }
        }
        li:nth-child(2){
            p:nth-child(1){
                width:37px;
                height:38px;
            }
        }
        li:nth-child(3){
            p:nth-child(1){
                width:34px;
                height:39px;
            }
        }
        li:nth-child(4){
            p:nth-child(1){
                width:39px;
                height:38px;
            }
        }
        li:nth-child(5){
            p:nth-child(1){
                width:33px;
                height:42px;
            }
        }
        li:nth-child(6){
            p:nth-child(1){
                width:33px;
                height:39px;
            }
        }
        li:nth-child(7){
            p:nth-child(1){
                width:34px;
                height:39px;
            }
        }
    }
}
</style>
