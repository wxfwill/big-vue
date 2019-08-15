<template>
    <div class="judicial-case-title">
        <i class="title-dot"></i>
        <span class="judicial-text">{{ title }}</span>
        <date-time></date-time>
    </div>
</template>

<script>
	import DateTime from '@/components/common/DateTime.vue';

	export default {
		props     : ['title'],
		components: {
			DateTime,
		}
	}
</script>

<style lang="scss" scoped>
    .judicial-case-title {
        float: left;
        margin-top: -65px;
        margin-left: 20px;
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(48, 226, 226, 1);
        line-height: 30px;
        display: flex;
        align-items: center;
        .title-dot {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 10px;
            background: rgba(48, 226, 226, 1);
            border-radius: 50%;
            vertical-align: middle;
        }
        .judicial-text {
            margin-right: 10px;
        }
    }
</style>