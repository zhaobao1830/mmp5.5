<template>
  <div class="containerLogin">
     <div class="login_con">
        <div class="login-logo">
            <img src="http://static.crecgec.com/mmp/login_01.png">
        </div>
        <div class="login-form">
	        <form @submit.prevent="login">
	           <div class="formDiv">
	               <input type="text" id="username" class="username" :class='{"err": loginState}' name="username" v-model='username'>
	               <label>
	                   <img src="http://static.crecgec.com/mmp/login_02.png">
	                   <span></span>
	               </label>
	               <p class="error displayNone error-name">请输入用户名</p>
	           </div>
	            <div class="formDiv">
	                <input type="password" id="password" class="password" :class='{"err": loginState}' name="password" v-model='password'>
	                <label>
	                    <img src="http://static.crecgec.com/mmp/login_03.png">
	                    <span></span>
	                </label>
	                <p class="error displayNone error-password">请输入密码</p>
	            </div>
	            <div class="formDiv remPass">
	                <input type="checkbox" class="remPassword" checked>
	                <label class="isChecked">
	                    <i></i>
	                    <p>记住密码</p>
	                </label>
	                <input type='submit' class='submit' value='登  录'/>
	            </div>
	            <div class="login-submit">
	                <!--<a href="javascript:;" class="forgetPasword">忘记密码</a>-->
	                <a href="javascript:;" class="regiest" @click="register">免费注册</a>
	            </div>
	        </form>
        </div>
         <div class="formBottom">
             中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.
         </div>
     </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
require('es6-promise').polyfill()
import {authority as getrole} from '@/common/js/js/login'

export default {
  name: 'login',
  data () {
    return {
      username: 'kaifa',
      password: 'aaaaaa',
      rememPass: false,
      loginState: false
    }
  },
  mounted () {
    this.$store.commit('changeAuthority')
    getrole(this)
  },
  methods: {
    login () {
      // url = url || '/api/chatbotdesigner.php'
      // data = data || {}
      this.loginState = false
      let data = {
        'username': this.username,
        'password': this.password
      }
      let This = this
      axios({
        // url: this.$store.state.baseUrl + '/php/login.php',
        url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Index/login ',
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
        if (!response.data.state) {
          This.loginState = true
        } else {
          sessionStorage.setItem('username', This.username)
          getrole(This)
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    register () {
      this.$store.state.nowComp = 'register'
    }
  }
}
</script>
<style type="text/css">
*{
    padding: 0;
    margin: 0;
    font-family: 'Microsoft Yahei',Tahoma,'Simsun','宋体';
}
.containerLogin{
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 800px;
    background-image: url("http://static.crecgec.com/mmp/login_bg.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.login_con{
    position: absolute;
    width: 420px;
    height: 542px;
    top:50%;
    left: 50%;
    margin-top: -271px;
    margin-left: -210px;
}
.login-logo{
    width: 172px;
    height: 70px;
    margin-left: 50px;
}
.login-form{
    width: 420px;
    height: auto;
    overflow: hidden;
    margin-top: 60px;
    float: left;
}
.login-form .err{
	border-color:red;
}
.formDiv{
    width: 400px;
    height: 60px;
    line-height: 60px;
    position: relative;
    margin-top: 30px;
    margin-left: 10px;
}
.login-form div input{
    width: 358px;
    height: 58px;
    border: 1px solid #bbbbbb;
    border-radius: 4px;
    padding-left: 40px;
    color: #555555;
    outline:none;
}
.login-form div label{
    position: absolute;
    top: 20px;
    left: 10px;
}
.login-form div label img{
    display: block;
    float: left;
}
.login-form div label span{
    display: block;
    width: 1px;
    height: 20px;
    background-color: #bbbbbb;
    float: left;
    margin-left: 10px;
}
.remPass label{
    position: static !important;
    display: block;
    width: 80px !important;
    height: 20px !important;
    float: left;
    cursor: pointer;
}
.remPass label i{
    display: block;
    width: 16px;
    height: 18px;
    background-image: url("http://static.crecgec.com/mmp/login_04.png");
    background-repeat: no-repeat;
    background-position: 0 -23px;
    float: left;
}
.remPassword{
    display: none;
}
.remPass label p{
    width: auto;
    height: 18px;
    line-height: 18px;
    float: left;
    color: #464646;
    font-size: 14px;
    margin-left: 5px;
}
.remPass .submit{
    cursor: pointer;
    display: block;
    width: 138px;
    height: 58px;
    line-height: 58px;
    border: 1px solid #bbbbbb;
    border-radius: 4px;
    background-color: #ffffff;
    float: right;
    text-align: center;
    text-decoration: none;
    color: #464646;
    font-size: 18px;
    padding:0px;
    outline:none;
}
.login-submit{
    width: 140px;
    margin-top: 20px;
    height: 15px;
    line-height: 15px;
    margin-right: 10px;
    display: block;
    overflow: hidden;
    float: right;
}
.login-submit a{
    display: block;
    width: auto;
    float: right;
    font-size: 14px;
    color: #777777;
    text-decoration: none;
}
.login-submit a:hover{
    color: #f44848;
}
.forgetPasword{
    margin-left: 10px;
}
.regiest{
    margin-left: 18px;
}
.formBottom{
    width: 422px;
    margin-top: 90px;
    float: left;
    color: #ffffff;
    font-size: 14px;
}
.error{
    position: absolute;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    top:60px;
    left: 40px;
    color: #f44848;
}

.displayBlock{
    display: block;
}
.displayNone{
    display: none;
}
</style>
