<template>
    <div class="outer-home-page">
        <date-picker
                :dateChange="setSelectTime"
        ></date-picker>
        <left-box></left-box>
        <center-box></center-box>
        <right-box></right-box>
    </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import DatePicker     from '@/components/common/date-picker';
    import LeftBox        from './components/left';
    import CenterBox        from './components/Center';
    import RightBox        from './components/Right';

	export default {
		methods: {
            ...mapActions('inspectionGuarantee', ['setSelectTime']),
        },
		components: {
			DatePicker,
            LeftBox,
            CenterBox,
            RightBox
		},
	}
</script>
<style lang="scss" scoped>
    .outer-home-page{
        position: relative;
        width: 100%;
    }
</style>
