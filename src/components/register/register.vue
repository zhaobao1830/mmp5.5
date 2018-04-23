<template>
  <div class="registerContent">
    <div class="registerTop">
      <img class="registerTopImg" src="http://static.crecgec.com/mmp/register_01.png"/>
      <span class="registerTopSpan"></span>
      <p class="registerTopTiter">欢迎注册</p>
      <p class="hasRegister">我已经注册，现在就<a href="javascript:;" class="login" @click="login">登录</a></p>
    </div>
    <div class="registerCon">
      <div class="regDiv">
        <p class="regName">登录用户名：</p><input class="regVal" type="text" @blur="checkUsername" v-model="username"/>
        <div class="msg usernameMsg1" v-show="usernameMsg1">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>用户名不能为空</p>
        </div>
        <div class="msg usernameMsg2" v-show="usernameMsg2">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>用户名已存在</p>
        </div>
      </div>
      <div class="regDiv">
        <p class="regName">登录密码：</p><input class="regVal" type="password" v-model="password" @blur="checkPassword"/>
        <div class="msg passwordMsg" v-show="passwordMsg">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>登录密码不能为空</p>
        </div>
        <div class="msg passwordMsg" v-show="passwordMsg1">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>登录密码不能少于6位</p>
        </div>
      </div>
      <div class="regDiv">
        <p class="regName">确认密码：</p><input class="regVal" type="password" v-model="checkPwd" @blur="checkRePassword"/>
        <div class="msg checkPasswordMsg1" v-show="checkPasswordMsg1">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>确认密码不能为空</p>
        </div>
        <div class="msg checkPasswordMsg2" v-show="checkPasswordMsg2">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>密码不一致</p>
        </div>
      </div>
      <div class="regDiv">
        <p class="regName">真实姓名：</p><input class="regVal" type="text" v-model="realname" @blur="checkPassword"/>
        <div class="msg passwordMsg" v-show="realnameMsg">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>真实姓名不能为空</p>
        </div>
      </div>
      <div class="regDiv">
        <p class="regName">所在部门：</p><input class="regVal" type="text" v-model="department" @blur="checkPassword"/>
        <div class="msg passwordMsg" v-show="departmentMsg">
          <img src="http://static.crecgec.com/mmp/error_01.png"/>
          <p>所在部门不能为空</p>
        </div>
      </div>
      <a class="registerA" href="javascript:;" @click="register">注册</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()

  export default {
    data () {
      return {
        username: '',
        password: '',
        checkPwd: '', // 确认密码
        realname: '', // 真实姓名
        department: '', // 所在部门
        usernameMsg1: false,
        usernameMsg2: false,
        passwordMsg: false,
        passwordMsg1: false,
        checkPasswordMsg1: false,
        checkPasswordMsg2: false,
        realnameMsg: false,
        departmentMsg: false,
        flag: true
      }
    },
    methods: {
      // 注册
      register () {
        if (this.username.trim()) {
          this.flag = true
          this.usernameMsg1 = false
        } else {
          this.flag = false
          this.usernameMsg1 = true
        }
        this.checkPassword()
        this.checkRePassword()
        let _this = this
        if (this.flag) {
          let data = {
            username: this.username,
            password: this.password,
            checkPwd: this.checkPwd,
            realname: this.realnameMsg,
            department: this.departmentMsg
          }
          axios({
            // url: this.$store.state.baseUrl + '/php/login.php',
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Index/register',
            method: 'POST',
            data: data,
            // params: 'type=selectR',
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (response) {
              _this.$message(response.data.detail)
              _this.username = ''
              _this.password = ''
              _this.checkPwd = ''
              _this.$store.state.nowComp = 'login'
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      // 用户名输入框失去焦点，检验输入的用户名是否已存在
      checkUsername () {
        let data = {
          username: this.username
        }
        let _this = this
        if (this.username.trim()) {
          this.flag = true
          this.usernameMsg1 = false
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Index/checkUsername',
            method: 'POST',
            data: data,
            // params: 'type=selectR',
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(function (response) {
              if (response.data.state === 'false') {
                _this.flag = false
                _this.usernameMsg2 = true
              } else {
                _this.flag = true
                _this.usernameMsg2 = false
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          this.flag = false
          this.usernameMsg1 = true
        }
      },
      // 当密码输入框失去焦点，检验输入的密码是否为空
      checkPassword () {
        if (this.password.trim()) {
          this.flag = true
          this.passwordMsg = false
          if (this.password.trim().length < 6) {
            this.flag = false
            this.passwordMsg1 = true
          } else {
            this.flag = true
            this.passwordMsg1 = false
          }
        } else {
          this.flag = false
          this.passwordMsg = true
        }
      },
      // 当确认密码输入框失去焦点，检验输入的密码是否为空
      checkRePassword () {
        if (this.checkPwd.trim()) {
          this.flag = true
          this.checkPasswordMsg1 = false
          if (this.checkPwd.trim() === this.password.trim()) {
            this.flag = true
            this.checkPasswordMsg2 = false
          } else {
            this.flag = false
            this.checkPasswordMsg2 = true
          }
        } else {
          this.flag = false
          this.checkPasswordMsg1 = true
        }
      },
      // 登录
      login () {
        this.$store.state.nowComp = 'login'
      }
    }
  }
</script>

<style scoped>
  .registerContent{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .registerTop{
    overflow: hidden;
    padding-bottom: 50px;
    border-bottom: 1px solid #dddddd;
    line-height: 73px;
    height: 73px;
    margin-top: 100px;
  }
  .registerTopImg,.registerTopSpan,.registerTopTiter{
    display: block;
    float: left;
  }
  .registerTopSpan{
    width: 1px;
    height: 34px;
    background-color: #bbbbbb;
    margin: 20px;
  }
  .registerTopTiter{
    font-size: 18px;
    color: #222222;
  }
  .hasRegister{
    float: right;
    margin-top: 60px;
    color: #222222;
    font-size: 12px;
  }
  .login{
    color: #438eb9;
  }
  .registerCon{
    width: 590px;
    overflow: hidden;
    padding-top: 40px;
    margin-left: 250px;
  }
  .regDiv{
    width: 590px;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    float: left;
  }
  .regName{
    float: left;
    font-size: 14px;
    color: #464646;
    width: 85px;
  }
  .regVal{
    width: 288px;
    height: 38px;
    line-height: 40px;
    border: 1px solid #bbbbbb;
    padding-left: 5px;
    padding-right: 5px;
    float: left;
  }
  .registerA{
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 2px;
    float: left;
    margin-left: 85px;
    margin-top: 40px;
    font-size: 18px;
    border: 1px solid #bbbbbb;
    background-color: #eeeeee;
    color: #464646;
  }
  .registerA:hover{
    border: 1px solid #4ea0ea;
    background-color: #4ea0ea;
    color: #fff;
  }
  .msg{
    width: 180px;
    float: left;
    margin-left: 20px;
    font-size: 14px;
    color: #777777;
  }
  .msg img{
    margin-top: 10px;
    margin-right: 10px;
    display: block;
    float: left;
  }
</style>
