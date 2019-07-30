<template>
    <div>
        <div class="judicial-case-title">
            <i class="title-dot"></i>
            刑事
        </div>
        <div class="outer-criminal-page">
            <left-box></left-box>
            <center-box></center-box>
            <right-box></right-box>
        </div>
    </div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import LeftBox                    from './components/left';
	import CenterBox                  from './components/center';
	import RightBox                   from './components/right';

	export default {
		methods   : {
			...mapActions('judicial', ['setSelectTime']),
			...mapActions('penal', ['initMapState']),
		},
		destroyed() {
			this.initMapState();
		},
		components: {
			LeftBox,
			CenterBox,
			RightBox,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-criminal-page {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>
