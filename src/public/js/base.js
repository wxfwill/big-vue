//验证小数位可有可无，最多两位小数
function IsDouble(value) {
    value = value;
    var re = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    if (!re.test(value))
        return false;
    else
        return true;
}

//验证手机格式
function IsMobile(strMobile) {
    strMobile = strMobile;
    var regTel = new RegExp("^(13|14|15|17|18)[0-9]{9}$", "i");
    if (regTel.test(strMobile)) {
        return true;
    }
    else
    {
        return false;
    }
}
//验证座机格式
function IsLandline(strMobile) {
    strMobile = strMobile;
    var regTel = /([0-9]{3,4}-)?[0-9]{7,8}/g;
    if (regTel.test(strMobile)) {
        return true;
    }
    else
    {
        return false;
    }
}
/**
 *  验证邮箱
 * @param strEmail
 * @returns {boolean}
 * @constructor
 */
function isEmail(strEmail) {
    var strEmail = strEmail;
    var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (emailReg.test(strEmail)) {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * 验证银行账号
 * @param bankAccount
 * @returns {boolean}
 */
function isBankAccount(bankAccount) {
    var bankAccount = bankAccount;
    var accountReg = /\d{15}|\d{19}/;
    if (accountReg.test(bankAccount)) {
        return true;
    }
    else
    {
        return false;
    }
}
/**
 * 验证身份证号
 * @param value
 * @returns {boolean}
 */
function isCardNo(value)  {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /\d{15}|\d{17}[0-9Xx]/;
    if (reg.test(value) === false) {
        return  false;
    } else {
        return true;
    }
}

//验证真实姓名格式
function IsRealName(RealName) {
    var strRealName = RealName;
    var regRealName = new RegExp("^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$", "i");
    if (regRealName.test(strRealName)) {
        return true;
    }
    else {
        return false;
    }
}
//是否为银行卡
function IsCard(strCard) {
    strCard = strCard;
    var regCard = new RegExp("^([0-9]{16}|[0-9]{19})$", "i");
    if (regCard.test(strCard)) {
        return true;
    }
    else {
        return false;
    }
}


//验证密码格式
function IsPwd(strPwd) {
    var regPwd = new RegExp("^[0-9a-zA-Z]{6,16}$", "i");
    if (regPwd.test(strPwd)) {
        return true;
    }
    else {
        return false;
    }
}

//图片验证码格式
function IsPicCode(strVCode) {
    strVCode = strVCode;
    var regVCode = new RegExp("^[0-9a-zA-Z]{4,4}$", "i");
    if (regVCode.test(strVCode)) {
        return true;
    }
    else {
        return false;
    }
}

//短信验证码格式
function IsMobileCode(strVCode) {
    strVCode = strVCode;
    var regVCode = new RegExp("^[0-9]{4,6}$", "i");
    if (regVCode.test(strVCode)) {
        return true;
    }
    else {
        return false;
    }
}


var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   
function IdCardValidate(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格   
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 通过身份证判断是男是女
 * @param idCard 15/18位身份证号码
 * @return 'female'-女、'male'-男
 */
function maleOrFemalByIdCard(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));        // 对身份证号码做处理。包括字符间有空格。   
    if (idCard.length == 15) {
        if (idCard.substring(14, 15) % 2 == 0) {
            return 'female';
        } else {
            return 'male';
        }
    } else if (idCard.length == 18) {
        if (idCard.substring(14, 17) % 2 == 0) {
            return 'female';
        } else {
            return 'male';
        }
    } else {
        return null;
    }
}

function changeTwoDecimal(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return 0;
    }
    f_x = Math.round(f_x * 100) / 100;

    return f_x;
}

//限制只能输入数字(不可以含有小数)
function limitInt(fn) {
    jQuery(fn).keydown(function (e) {
        // 注意此处不要用keypress方法，否则不能禁用　Ctrl+V 与　Ctrl+V,具体原因请自行查找keyPress与keyDown区分，十分重要，请细查
        if (((e.keyCode > 47) && (e.keyCode < 58)) || (e.keyCode == 9) || (e.keyCode == 8) || ((e.keyCode >= 96) && (e.keyCode <= 105))) {// 判断键值  
            return true;
        } else {
            return false;
        }

    }).focus(function () {
        this.style.imeMode = 'disabled';   // 禁用输入法,禁止输入中文字符
    });

}


/**

 * @param {String} divName 分页导航渲染到的dom对象ID
 * @param {String} funName 点击页码需要执行后台查询数据的JS函数
 * @param {Object} params 后台查询数据函数的参数要传json对象，参数顺序就是该对象的顺序，当前页面一定要设置在里面的 注意参数一定要写在页数之前
 * @param {String} total 后台返回的总记录数
 * @param {Boolean} pageSize 每页显示的记录数，默认是10
 */
function supage(divId, funName, params, curPage, total, pageSize){
    var output = '<div class="pagination">';
    var pageSize = parseInt(pageSize)>0 ? parseInt(pageSize) : 10;
    if(parseInt(total) == 0 || parseInt(total) == 'NaN') return;
    var totalPage = Math.ceil(total/pageSize);
    var curPage = parseInt(curPage)>0 ? parseInt(curPage) : 1;

    //从参数对象中解析出来各个参数
    var param_str = '';
    if(typeof params == 'object'){
        for(var key in params){
            if(typeof params[key] == 'string'){
                param_str += '\'' + params[key] + '\',';

            } else {
                param_str += params[key] + ',';
            }
        }
        //alert(111);
    }
    //设置起始页码
    if (totalPage > 10) {
        if ((curPage - 5) > 0 && curPage < totalPage - 5) {
            var start = curPage - 5;
            var end = curPage + 5;
        }
        else if (curPage >= (totalPage - 5)) {
            var start = totalPage - 10;
            var end = totalPage;
        }
        else {
            var start = 1;
            var end = 10;
        }
    }
    else {
        var start = 1;
        var end = totalPage;
    }
    //首页控制
    if(curPage>1){
        output += '<a href="javascript:'+funName+'(' + param_str + '1);" title="第一页" class="page-first">首页</a>';
    }
    else
    {
        output += '<span class="page-first page-disabled">首页</span> ';
    }
    //上一页菜单控制
    if(curPage>1){
        output += '<a href="javascript:'+funName+'(' + param_str + (curPage-1)+');" title="上一页" class="page-previous prev">上一页</a>';
    }
    else{
        output += '<span class="page-disabled prev">上一页</span>';
    }

    //页码展示
    for (i = start; i <= end; i++) {
        if (i == curPage) {
            output += '<a href="javascript:;" class="page-cur">' + curPage + '</a>';
        }
        else {
            output += '<a href="javascript:'+funName+'(' + param_str + i + ');">' + i + '</a>';
        }
    }
    //下一页菜单控制
    if(totalPage>1 && curPage<totalPage){
        output += '<a title="下一页" href="javascript:'+funName+'('+param_str + (curPage+1)+');" class="page-next next">下一页</a>';
    }
    else{
        output += '<span class="page-disabled next">下一页</span>';
    }
    //最后页控制
    if(curPage<totalPage){
        output += '<a title="最后页" href="javascript:'+funName+'('+param_str + totalPage+');" class="page-last page-end">尾页</a>';
    }
    else{
        output += '<span class="page-last page-disabled">尾页</span>';
    }

    output += '</div>';
    //渲染到dom中
    //$("#pageNav").html(output);
    $("#"+ divId +"").html(output);
}
/**
 *
 * @param num 数字
 * @param significand  有效数字位数
 * @returns {string}
 */
function numFormat(num, significand){ //  添加千位分隔符
    var numStr = num.toString();
    if (significand != undefined) {
        numStr = parseFloat(num).toFixed(significand).toString();
    }
    var int = numStr.split(".")[0];
    var decimals = numStr.split(".")[1] ? "."+ numStr.split(".")[1] : "";
    var intArr = int.split("").reverse();
    var str = "";
    for (var i = intArr.length; i >= 0; i--) {
        if (intArr[i] != undefined) {
            if (i%3 == 0 && i != 0){
                str += intArr[i]+",";
            } else {
                str += intArr[i];
            }
        }
    }
    return str += decimals;
}
Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()// millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/**
 * 获取日期
 * @param timestamp
 * @returns {number}
 */
function getDay(timestamp) {
    var date = new Date(timestamp);
    var day = date.getDate();
    return day;
}
/**
 * 获取url中的参数
 * @param name
 * @returns {null}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
function addMonth(curDate, number) { // 月份累加
    var curTimestamp = new Date(curDate);
    var curYear = curTimestamp.getFullYear();
    var curMonth = curTimestamp.getMonth();
    var curDay = curTimestamp.getDate() ;
    var prevTimestamp = new Date(curYear, curMonth+parseInt(number), 0);
    var newTimestamp = new Date(curYear, curMonth+parseInt(number)+1, 0);
    var newYear = newTimestamp.getFullYear();
    var newMonth = newTimestamp.getMonth() + 1;
    var newDay = curDay - 1;
    var dayCount = newTimestamp.getDate();
    if (newDay == 0) {
        newMonth -= 1;
        newMonth = newMonth == 0 ? 12 : newMonth;
        newYear = newYear == 0 ? (newYear - 1) : newYear;
        newDay = prevTimestamp.getDate();
    }else if (newDay >= dayCount) {
        newDay = dayCount;
    }
    return newYear + '-'+ (newMonth > 9 ? newMonth : "0"+ newMonth) + '-'+ (newDay > 9 ? newDay : "0"+ newDay);
}



/**
 * 科学计算法转数值不支持22位以上正数
 * @param num
 * @returns {*}
 */
// function scientificToNumber(num) {
//     var str = num.toString();
//     var reg = /^(\d+)(e)([\-]?\d+)$/;
//     var arr, len, zero = '';
//     /*6e7或6e+7 都会自动转换数值*/
//     if (!reg.test(str)) {
//         return num;
//     } else {
//         /*6e-7 需要手动转换*/
//         arr = reg.exec(str);
//         len = Math.abs(arr[3]) - 1;
//         for (var i = 0; i < len; i++) {
//             zero += '0';
//         }
//         return '0.' + zero + arr[1];
//     }
// }
