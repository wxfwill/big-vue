<template>
    <div class="outer-home-page">
        <date-picker
                :dateChange="setSelectTime"
        ></date-picker>
        <left-box></left-box>
    </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import DatePicker     from '@/components/common/date-picker';
    import LeftBox        from './components/left';

	export default {
		methods: {
            ...mapActions('inspectionGuarantee', ['setSelectTime']),
        },
		components: {
			DatePicker,
			LeftBox
		},
	}
</script>
<style lang="scss" scoped>
    .outer-home-page{
        position: relative;
        width: 100%;
    }
</style>
