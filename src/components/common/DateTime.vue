<template>
    <div class="header-time-page">
        <p class="tab" v-show="moduleName">{{moduleName}}</p>
        {{clock}} &nbsp;&nbsp;
        {{week}}
    </div>
</template>
<script>
	export default {
		data() {
			return {
				clock: '',
				week : null
			}
		},
		created() {
			setInterval((() => {
				this.dataHandle();
				return this.dataHandle;
			})(), 10000);
		},
		methods: {
			dataHandle() {//每个页面的当前时间
				const now   = new Date(),
					  year  = now.getFullYear(),
					  month = now.getMonth() + 1,
					  day   = now.getDate(),
					  hh    = now.getHours(),
					  mm    = now.getMinutes();          //分
				let clock   = year + "-";
				if(month < 10) {
					clock += "0";
				}
				clock += month + "-";
				if(day < 10) {
					clock += "0";
				}
				clock += day + " ";
				if(hh < 10) {
					clock += "0";
				}
				clock += hh + ":";
				if(mm < 10) {
					clock += '0';
				}
				clock += mm;
				this.clock = clock;
				this.week  = "周" + "日一二三四五六".charAt(new Date().getDay())
			}
		},
		props  : {
			moduleName: {
				type   : String,
				default: ''
			}
		},
	}
</script>
<style lang="scss" scoped>
    .header-time-page {
        position: absolute;
        left: 0;
        top: -10px;
        width: 200px;
        font-size: 15px;
        color: #ffffff;
        display: inline-block;
        .tab {
            display: inline-block;
            margin-right: 63px;
            font-size: 22px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(48, 226, 226, 1);
            span {
                display: inline-block;
                border-radius: 50%;
                width: 12px;
                height: 12px;
                background: rgba(48, 226, 226, 1);
            }
        }
    }
</style>
