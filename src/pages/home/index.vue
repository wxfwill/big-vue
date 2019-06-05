<template>
    <div class="outer-home-page">
        <left/>
        <center></center>
        <right/>
    </div>
</template>
<script>
import Left from '@/components/home/Left.vue'
import Center from '@/components/home/Center.vue'
import Right from '@/components/home/Right.vue'
export default {
    name: 'outHome',
  components:{
      Left,
      Center,
      Right
  }
}
</script>
<style lang="scss" scoped>
.outer-home-page{
    display: flex;
}
</style>
