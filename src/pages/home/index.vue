<template>
    <div class="outer-home-page">
        <date-picker
                :nowSelectDate="getSelectDateSection"
                :dateChange="setHomeSelectTime"
        ></date-picker>
        <left/>
        <center-box></center-box>
        <right/>
    </div>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import Left                       from './components/Left.vue'
	import CenterBox                     from './components/Center.vue'
	import Right                      from './components/Right.vue'
	import DatePicker                 from '@/components/common/date-picker';

	export default {
		methods   : {
			...mapActions('homePage', ['setHomeSelectTime', 'initHomeState']),
		},
		computed  : {
			...mapGetters('homePage', ['getSelectDateSection']),
		},
		destroyed() {
			this.initHomeState();
		},
		components: {
			Left,
			CenterBox,
			Right,
			DatePicker,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-home-page {
        position: relative;
    }
</style>
