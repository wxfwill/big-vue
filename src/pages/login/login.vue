<template>
  <div class="container login_a" :style="pt">
    <div class="bg-img">
      <div class="img_logo">
        <h6>{{loginMenu.title}}</h6>
        <p>{{loginMenu.subtitle}}</p>
        <img src="./img/home_bg2.png" alt="logo">
      </div>
      <div class="login_wrap">
        <div class="login_content">
          <h6 class="login_name">{{loginMenu.loginTitle}}</h6>
          <div class="login_from">
            <ul>
              <li class="bg-li" :class="{userRed: user}">
                <i class="iconfont icon-icon"></i>
                <input type="text" v-model="user" class="input2" value="" :placeholder="loginMenu.userPlaceholder">
              </li>
              <li class="bg-li" :class="{userRed1: pass}">
                <i class="iconfont icon-mima3"></i>
                <!-- 额外增加的内容 -->
                <!--<input :type="text" class="input2" @focus="focus" autocomplete="off" name="login_pass" key="login_pass" v-model="pass" value="" placeholder="请输入密码">-->
                <!--<input type="text" class="input2" id="input2" onfocus="this.type = 'password'" autocomplete="off" key="login_pass" v-model="pass" value="" placeholder="请输入密码">-->
                <input type="password" name="hidden" style="display: none;" class="input2" autocomplete="off">
                <input type="password" name="password" class="input2" id="input2" autocomplete="new-password" key="login_pass" v-model="pass" value="" :placeholder="loginMenu.passwrodPlaceholder">
              </li>
              <li>
                <div class="login_desc" @click="clickIcon">
                  <span class="icon">
                    <i class="dian" v-show="showIcon"></i>
                  </span>
                  <i class="cursor">{{loginMenu.bindIp}}</i>
                </div>
              </li>
              <li>
                <div class="denglu bg-red" @click="submitForm">
                  {{loginMenu.submit}}
                </div>
                <!-- <button type="button" name="button" @keyup.enter="submitForm">键盘事件</button> -->
              </li>
              <li class="last">
                <div class="repeat_wrap">
                  <span>
                    <router-link class="activeRed" to="/repeatpassword">{{loginMenu.resetPassword}}</router-link>
                  </span>
                  <span>{{loginMenu.noAccount}}
                    <router-link class="activeRed" to="/register">{{loginMenu.register}}</router-link>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 二次验证的弹窗 -->
        <div class="yanzheng">
          <el-dialog :title="title" :visible.sync="centerDialogVisible" width="372px" top="0" :lock-scroll="false" :close-on-click-modal="false" :show-close="false" custom-class="myone1" center>
            <div class="content">

              <div class="send">
                <div v-if="userYz">
                  <h6 class="phone">{{phones}}</h6>
                  <div class="ordinary">
                    <input type="tel" v-model="valiCode" :maxlength="6" :placeholder="loginMenu.verifyCodePlaceholder" class="dxcode" />
                    <!-- 注：点击获取验证码后，在class中添加disable -->
                    <a class="activeRed getCode" href="javascript:void(0);" @click="getDxCode" v-if="!unbind">{{loginMenu.verifyCode}}</a>
                    <a class="activeRed getCode" href="javascript:void(0);" :class="{disable:unbind}" v-else>{{time+'S'}}</a>
                  </div>
                </div>
                <div v-else-if="emailYz">
                  <h6 class="phone">{{phones}}</h6>
                  <div class="ordinary">
                    <input type="tel" v-model="valiCode" :maxlength="6" :placeholder="loginMenu.verifyCodePlaceholder" class="dxcode" />
                    <!-- 注：点击获取验证码后，在class中添加disable -->
                    <a class="activeRed getCode" href="javascript:void(0);" @click="getDxCode" v-if="!unbind">{{loginMenu.verifyCode}}</a>
                    <a class="activeRed getCode" href="javascript:void(0);" :class="{disable:unbind}" v-else>{{time+'S'}}</a>
                  </div>
                </div>
                <div class="ordinary" v-else>
                  <label class="label">{{loginMenu.googleVerifyCode}}</label>
                  <input type="tel" v-model="valiCode" :maxlength="6" :placeholder="loginMenu.verifyCodePlaceholder" class="dxcode1" />
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer just_but">
              <el-button class="bg-gray btn" @click="cannel"> {{loginMenu.close}}</el-button>
              <el-button class="bg-red btn" @click="must" v-if="userYz">
                {{loginMenu.onsubmit}}
              </el-button>
              <el-button class="bg-red btn" @click="must" v-else-if="emailYz">
                {{loginMenu.onsubmit}}
              </el-button>
              <el-button class="bg-red btn" @click="mustgoogle" v-else>
                {{loginMenu.onsubmit}}
              </el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "@/fetch/ajax.js";
import { mapGetters, mapMutations } from "vuex";
import { fromTip } from "@/public/js/name.js";

export default {
  mixins: [fromTip],
  data() {
    return {
      pt: {},
      // text: 'text',
      pas: "password",
      valiCode: null,
      valiCode1: null,
      time: 60,
      token: "",
      allData: {},
      interval: null,
      unbind: false,
      cameIp: 1, // IP是否相同 1 相同--不需要二次验证   0不相同 二次验证
      title: "",
      centerDialogVisible: false,
      userYz: false, // 手机验证
      phones: null,
      emailYz: false, // 邮箱验证
      googleYz: false, // 谷歌验证
      QueryDetail: {
        background: "red",
        width: "160px"
      },
      user: "",
      pass: "",
      showIcon: true,
      iconNum: 1, // 1 绑定ip  2 不绑定ip
      getFocus: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.pt = {
        "padding-top": "72px"
      };
    });
  },
  computed: {
    loginMenu() {
      return {
        title: this.$t("login.title"),
        subtitle: this.$t("login.subtitle"),
        loginTitle: this.$t("login.loginTitle"),
        userPlaceholder: this.$t("login.userPlaceholder"),
        passwrodPlaceholder: this.$t("login.passwrodPlaceholder"),
        bindIp: this.$t("login.bindIp"),
        noAccount: this.$t("login.noAccount"),
        register: this.$t("login.register"),
        resetPassword: this.$t("login.resetPassword"),
        verifyCode: this.$t("login.verifyCode"),
        verifyCodePlaceholder: this.$t("login.verifyCodePlaceholder"),
        googleVerifyCode: this.$t("login.googleVerifyCode"),
        submit: this.$t("login.submit"),
        telphoneVerify: this.$t("login.telphoneVerify"),
        emailVerify: this.$t("login.emailVerify"),
        googleVerify: this.$t("login.googleVerify"),
        close: this.$t("login.close"),
        onsubmit: this.$t("login.onsubmit")
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById("input2").value = "";
      let _this = this;
      document.onkeydown = function(e) {
        //登陆绑定键盘事件
        let ev = e || window.event;
        if (ev.target.id != "input2") {
          return;
        }
        var key = window.event.keyCode;
        if (key == 13) {
          _this.submitForm();
        }
      };
    });
  },
  methods: {
    focus() {
      this.text = "password";
    },
    sendCodeInit() {
      // 验证码倒计时
      this.unbind = true;
      if (this.interval) {
        window.clearInterval(this.interval);
      }
      this.interval = window.setInterval(() => {
        if (this.time-- <= 1) {
          window.clearInterval(this.interval);
          this.unbind = false;
          this.time = 60;
        }
      }, 1000);
    },
    ...mapMutations({
      changeLogin: "LOGIN",
      get_user_init: "USER_NAME",
      getToken: "TOKEN",
      getAllLogin: "ALL_LOGIN",
      getloginpassword: "LOGIN_PASSWORD"
    }),
    checkUser(user) {
      // 手机号码校验
      if (user == "" || user == null) {
        this.msg(this.loginMenu.userPlaceholder);
        return false;
      }
      return true;
    },
    checkPass(pass) {
      // 密码校验
      if (pass == "" || pass == null) {
        this.msg(this.loginMenu.passwrodPlaceholder);
        return false;
      }
      return true;
    },
    getDxCode() {
      // 获取短信验证吗
      let user = {};
      if (this.title == this.loginMenu.telphoneVerify) {
        user = {
          phone: this.phones,
          device: 1
        };
        this.getTelphoneCodeInit(user);
      } else if (this.title == this.loginMenu.emailVerify) {
        user = {
          email: this.phones,
          device: 1
        };
        this.getTelEmailInit(user);
      }
    },
    getTelEmailInit(parm) {
      ajax
        .getEmailCode(parm)
        .then(response => {
          if (response.data.code == 1) {
            this.sendCodeInit();
          } else {
            this.$message({
              type: "error",
              message: response.data.msg,
              duration: 1000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTelphoneCodeInit(parm) {
      ajax
        .getTelphoneCode({
          jsonString: JSON.stringify(parm)
        })
        .then(response => {
          if (response.data.code == 1) {
            this.sendCodeInit();
          } else {
            this.$message({
              type: "error",
              message: response.data.msg,
              duration: 1000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickIcon() {
      this.showIcon = !this.showIcon;
      if (this.showIcon) {
        this.iconNum = 1;
      } else {
        this.iconNum = 2;
      }
    },
    cannel() {
      // 二次验证取消
      // this.getToken('');
      // this.changeLogin(false); // 登录状态
      // this.getloginpassword('') // 登录密码
      // this.get_user_init('') // 用户名
      // this.getAllLogin('{}') // 登陆的所有信息

      ajax
        .twoCannel()
        .then(res => {
          if (res.data.code == 1) {
            this.centerDialogVisible = false;
          } else {
            this.messageError(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    mustgoogle() {
      // 谷歌二次验证
      if (!this.valiCode) {
        this.messageError(this.loginMenu.verifyCodePlaceholder);
        return;
      }
      ajax
        .checkGoolgleCode({
          jsonString: JSON.stringify({
            code: this.valiCode
          })
        })
        .then(res => {
          if (res.data.code == 1) {
            if (/^\d{11}$/g.test(this.user)) {
              this.user = this.user.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            } else {
              this.user = this.user.replace(/(.{1}).+(.{2}@.+)/g, "$1****$2");
            }

            this.changeLogin(true); // 登录状态
            this.get_user_init(this.user); // 用户名
            this.getAllLogin(this.allData); // 登陆的所有信息
            this.getloginpassword(this.pass); // 登录密码
            this.user = "";
            this.pass = "";
            this.$router.push("/index");
          } else {
            this.messageError(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    must() {
      // 二次验证 手机或邮箱
      if (!this.valiCode) {
        this.messageError(this.loginMenu.verifyCodePlaceholder);
        return;
      }
      ajax
        .getLogin2({
          jsonString: JSON.stringify({
            loginNum: this.user,
            code: this.valiCode,
            device: 1
          })
        })
        .then(response => {
          if (response.data.code == 1) {
            if (/^\d{11}$/g.test(this.phones)) {
              this.user = this.phones.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              );
            } else {
              this.user = this.phones.replace(/(.{1}).+(.{2}@.+)/g, "$1****$2");
            }

            this.changeLogin(true); // 登录状态
            this.get_user_init(this.user); // 用户名
            this.getAllLogin(this.allData); // 登陆的所有信息
            this.getloginpassword(this.pass); // 登录密码
            this.user = "";
            this.pass = "";
            this.$router.push("/index");
          } else {
            this.messageError(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm() {
      // 提交表单
      // 登陆
      if (this.checkUser(this.user) && this.checkPass(this.pass)) {
        // 验证通过 下一步
        ajax
          .loginInit({
            jsonString: JSON.stringify({
              loginNum: this.user,
              password: this.pass,
              device: 1
              // bindIp: this.iconNum
            })
          })
          .then(response => {
            if (response.data.code == 1) {
              // this.token = response.data.data.token;
              this.getToken(response.data.data.token); // token
              this.allData = response.data.data; // 登陆后的所有信息
              // console.log(response.data.data.ipAdrress == '2');
              if (this.showIcon) {
                // 选中后 判断IP是否相同
                if (response.data.data.ipAdrress == "2") {
                  // 异常
                  // 谷歌验证
                  if (
                    response.data.data.isgoogle == 1 &&
                    response.data.data.google == 1
                  ) {
                    // 1 注册谷歌验证

                    this.googleYz = true;
                    this.title = this.loginMenu.googleVerify;
                    this.centerDialogVisible = true;
                    return;
                  }
                  // 手机验证
                  if (response.data.data.isphone) {
                    // 1 --手机验证
                    this.userYz = true;
                    this.title = this.loginMenu.telphoneVerify;
                    this.phones = response.data.data.phone;
                    this.centerDialogVisible = true;
                    return;
                  }
                  // 邮箱验证
                  if (response.data.data.isemail) {
                    // 1 --邮箱验证
                    this.emailYz = true;
                    this.title = this.loginMenu.emailVerify;
                    this.phones = response.data.data.email;
                    this.centerDialogVisible = true;
                    return;
                  }
                } else {
                  // 正常
                  this.text = "text";
                  if (/^\d{11}$/g.test(this.user)) {
                    this.user = this.user.replace(
                      /(\d{3})\d{4}(\d{4})/,
                      "$1****$2"
                    );
                  } else {
                    this.user = this.user.replace(
                      /(.{1}).+(.{2}@.+)/g,
                      "$1****$2"
                    );
                  }
                  this.getToken(response.data.data.token); // token
                  this.changeLogin(true); // 登录状态
                  this.getloginpassword(this.pass); // 登录密码
                  this.get_user_init(this.user); // 用户名
                  this.getAllLogin(response.data.data); // 登陆的所有信息
                  this.user = "";
                  this.pass = "";
                  this.$router.push("/index");
                }
              } else {
                // 未选  二次验证
                // 谷歌验证
                if (response.data.data.isgoogle) {
                  // 1 注册谷歌验证
                  if (response.data.data.google == 1) {
                    // 1 开启谷歌验证
                    this.googleYz = true;
                    this.title = this.loginMenu.googleVerify;
                    this.centerDialogVisible = true;
                    return;
                  }
                }
                // 手机验证
                if (response.data.data.isphone) {
                  // 1 --手机验证
                  this.userYz = true;
                  this.title = this.loginMenu.telphoneVerify;
                  this.phones = response.data.data.phone;
                  this.centerDialogVisible = true;
                  return;
                }
                // 邮箱验证
                if (response.data.data.isemail) {
                  // 1 --邮箱验证
                  this.emailYz = true;
                  this.title = this.loginMenu.emailVerify;
                  this.phones = response.data.data.email;
                  this.centerDialogVisible = true;
                  return;
                }
              }
            } else {
              this.messageError(response.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  min-height: 750px;
  /* padding-right: 300px; */
  /* background-color: #1A1B20; */
}
.input2 {
  color: #999999;
}
.login_a {
  background: #1a1b20 url("./img/home_bg1.png") no-repeat left bottom;
  background-size: 100% 24%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img_logo {
  width: 680px;
  text-align: center;
}
.img_logo > h6 {
  font-size: 30px;
  margin-bottom: 22px;
}
.img_logo > p {
  font-size: 16px;
  margin-bottom: 36px;
}
.login_wrap {
  margin-left: 36px;
  width: 454px;
  background-color: #212226;
  color: #ffffff;
  padding: 30px;
  font-size: 16px;
}

.login_name {
  margin-bottom: 30px;
}

.login_from ul li {
  margin-bottom: 24px;
  height: 42px;
  line-height: 42px;
  border-radius: 2px;
}

.login_from ul li.last {
  margin-bottom: 0;
}

.bg-li {
  background-color: #393a3d;
  color: #999999;
  border: 1px solid #393a3d;
  padding-left: 4px;
}

.bg-li > input {
  width: 200px;
  height: 100%;
  text-shadow: 0px 0px;
}

.bg-li.userRed,
.bg-li.userRed1 {
  color: #f73535;
  border: 1px solid #999999;
}

.bg-li.userRed > input,
.bg-li.userRed1 > input {
  color: #ffffff !important;
}

.login_desc {
  color: #ffffff;
  font-size: 14px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.login_desc > i {
  margin-left: 10px;
}

.login_desc .icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  position: relative;
  border-radius: 50%;
  border: 1px solid #ffffff;
  cursor: pointer;
}

.login_desc .icon .dian {
  position: absolute;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #f73535;
  border-radius: 50%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.repeat_wrap {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.denglu {
  text-align: center;
  cursor: pointer;
}

.content {
  padding: 32px 32px 0 32px;
}

.phone {
  margin-bottom: 12px;
}

.ordinary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.label {
  height: 36px;
  line-height: 36px;
}

.dxcode1 {
  width: 218px;
  border: 1px solid #e7e7e7;
  padding: 6px 12px;
}

.dxcode {
  width: 200px;
  height: 36px;
  padding-left: 12px;
  border: 1px solid #e7e7e7;
}

.getCode {
  text-align: center;
  width: 96px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #e7e7e7;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}

.myone1 .el-button {
  padding: 12px 54px;
  color: #ffffff;
}
</style>
