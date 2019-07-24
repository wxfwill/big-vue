export const timeInterval = { // 定时器
    data() {
        return {
            unbind: false,
            time: 60,
            interval: null
        }
    },
    methods: {
        sendCodeInit() { // 验证码倒计时
            this.unbind = true;
            if (this.interval) {
                window.clearInterval(this.interval);
            }
            this.interval = window.setInterval(() => {
                if ((this.time--) <= 1) {
                    window.clearInterval(this.interval);
                    this.unbind = false;
                    this.time = 60;
                }
            }, 1000);
        },
        clearIntalval() {
            window.clearInterval(this.interval);
            this.unbind = false;
            this.time = 60;
        }
    }
}

export const backSecurity = {  // 返回账户安全
    methods: {
        back() {
            this.$router.push('/AccountSecurity')
        }
    }
}

export const alertSuccess = { // 成功提示
    methods: {
        messageSuccess(txt) {
            this.$message.closeAll();
            this.$message({
                type: 'success',
                message: txt,
                duration: 1500
            })
        }
    }
}

export const alertError = {  // 错误或者失败提示
    methods: {
        messageError(txt) {
            this.$message.closeAll();
            this.$message({
                type: 'error',
                message: txt,
                duration: 1500
            })
        }
    }
}

export const fromTip = {  // 表单提示
    methods: {
        msg(txt) {
            this.$notify.closeAll();
            this.$notify({
                message: txt,
                customClass: 'mymsg',
                duration: 1500
            });
        },
        checkDxCode(val, txt) { // 校验短信验证码
            if (val == null || val == '') {
                this.msg(txt);
                return false
            }
            return true
        },
        repeatCheckPass(nowval, prvval, txt) { // 校验是否相同
            if (nowval == null || nowval == '') {
                this.msg(txt);
                return false
            }
            if (nowval != prvval) {
                this.msg(txt);
                return false
            }
            return true
        },
        messageError(txt) {
            this.$message.closeAll();
            this.$message({
                type: 'error',
                message: txt,
                duration: 1000
            })
        },
        messageSuccess(txt) {
            this.$message.closeAll();
            this.$message({
                type: 'success',
                message: txt,
                duration: 1500
            })
        }
    }
}
export const FormateNumber = {
    methods: {
        /**
         * 截取小数位数
         * @param value 数字
         * @param n 小数位数
         * @returns {*}
         */
        decimal(value, n) {
            if (Number.isInteger(value)) { // 整数
                return Number(value.toFixed(n));
            }else {
                var re = new RegExp("^([0-9]+\\.[0-9]{" + n + "})[0-9]*", "g") // 原正则 /^([0-9]+\.[0-9]{6})[0-9]*/;
                return Number(String(value).replace(re, "$1"));
            }
        },
        /**
         * 浮点型有效数字校验(即限制输入指定位数的小数)
         * @param value
         * @param n 小数点位数
         * @returns {*}
         */
        floatVerify(value, n) {
            if (value) {
                var reg = new RegExp("\\d+(\\.\\d{0," + n + "})?", "g"); // 原正则  /\d+(\.\d{1,2})?/g;
                var ret = reg.exec(value);
                return ret[0];
            }
        },
        /**
         * 科学计算法转数值不支持22位以上正数
         * @param num
         * @returns {*}
         */
        scientificToNumber(num) {
            if (!num) {
                return 0;
            }
            var str = num.toString();
            var reg = /^(\d+)(e)([\-]?\d+)$/;
            var arr, len, zero = '';
            /*6e7或6e+7 都会自动转换数值*/
            if (!reg.test(str)) {
                return num;
            } else {
                /*6e-7 需要手动转换*/
                arr = reg.exec(str);
                len = Math.abs(arr[3]) - 1;
                for (var i = 0; i < len; i++) {
                    zero += '0';
                }
                return '0.' + zero + arr[1];
            }
        }
    }
}

export const conditional = {
    methods: {
        isPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
    }
}