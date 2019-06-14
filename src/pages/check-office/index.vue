<template>
    <div class="check-office-wrap outer-home-page">
        <left-side></left-side>
        <center-box></center-box>
        <right-side></right-side>
    </div>
</template>

<script>
	import LeftSide               from '@/components/check-office/Left';
	import CenterBox              from '@/components/check-office/Center';
	import RightSide              from '@/components/check-office/Right';
	import { getCheckOfficeData } from '@/fetch/http';

	export default {
		mounted() {

		},
		data() {
            return {

            }
		},
		methods: {},
        components: {
			LeftSide,
            CenterBox,
            RightSide
        }
	}
</script>

<style lang="scss">
    .check-office-wrap{
        margin-top: 65px;
        .cursor-img{
            width: 240px;
            height: 26px;
            margin: -10px auto 0 auto;
            img{
                width: 100%;
            }
        }
    }
</style>