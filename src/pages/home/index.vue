<template>
    <div class="outer-home-page">
        <date-picker
                :dateChange="setHomeSelectTime"
        ></date-picker>
        <left/>
        <center></center>
        <right/>
    </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import Left           from './components/Left.vue'
	import Center         from './components/Center.vue'
	import Right          from './components/Right.vue'
	import DatePicker     from '@/components/common/date-picker';

	export default {
		methods: {
            ...mapActions('homePage', ['setHomeSelectTime']),
        },
		components: {
			Left,
			Center,
			Right,
			DatePicker,
		},
	}
</script>
<style lang="scss" scoped>
    .outer-home-page{
        position: relative;
    }
</style>
