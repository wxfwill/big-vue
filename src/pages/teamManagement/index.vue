<template>
    <div class="outer-home-page">
        <left></left>
        <center-box></center-box>
        <right></right>
    </div>
</template>

<script>
	import Left from '@/components/teamManagement/Left.vue';
	import CenterBox from '@/components/teamManagement/Center.vue';
	import Right from '@/components/teamManagement/Right.vue';
	export default {
		data() {
            return {

            }
		},
		method : {

        },
        components:{
			Left,
			CenterBox,
            Right
        }
	}
</script>

<style scoped>

</style>
