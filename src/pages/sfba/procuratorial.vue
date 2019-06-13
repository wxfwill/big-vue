<template>
    <div class="outer-procuratorial-page">
        <date-time moduleName="检委办/检察技术"></date-time>
        <div class="procuratorial-page-left">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
import mapComponent from '@/components/map/index.vue'
import Popup from '@/components/Popup.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    components:{
        mapComponent,
        Popup,
        DateTime
    },
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.outer-procuratorial-page{
    width:100%;
    height:100%;
    display: flex;
    padding-top:65px;
    .procuratorial-page-left{
        width:1113px;
        position: relative;
    }
}
</style>
