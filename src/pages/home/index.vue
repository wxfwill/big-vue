<template>
    <div class="outer-home-page">
        <date-time></date-time>
        <left/>
        <center></center>
        <right/>
    </div>
</template>
<script>
import Left from '@/components/home/Left.vue'
import Center from '@/components/home/Center.vue'
import Right from '@/components/home/Right.vue'
import DateTime from '@/components/DateTime.vue'
export default {
    name: 'outHome',
  components:{
      Left,
      Center,
      Right,
      DateTime
  }
}
</script>
<style lang="scss" scoped>
.outer-home-page{
    display: flex;
    position: relative;
}
</style>
