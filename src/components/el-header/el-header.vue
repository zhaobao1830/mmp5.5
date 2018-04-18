<template>
    <div class="head">
        <div class="head-logo">
            <img src="http://static.crecgec.com/mmp/head_01.png">
        </div>
        <div class="head-user">
           <span>欢迎您</span>
           <img src="http://static.crecgec.com/mmp/head_02.png">
           <p>{{username}}</p>
           <!--<form method="POST" action="/api/index.php?s=User/Index/logout">-->
             <!--<input type="submit" value="退出">-->
           <!--</form>-->
            <a class="sign-out" href="javascript:;" @click='logout'>退出</a>
        </div>
    </div>
</template>

<script>
 import axios from 'axios'
 require('es6-promise').polyfill()
 export default {
   computed: {
     username () {
       return this.$store.state.username
     }
   },
   methods: {
     logout () {
       let _this = this
       axios({
         url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Index/logout',
         method: 'POST',
         transformRequest: [function (data) {
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
           if (response.data.is_logout === 'true') {
             _this.$store.state.nowComp = 'login'
             window.location.href = './'
           }
         })
         .catch(function (err) {
           console.log(err)
         })
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
    width: 100%;
    height: 80px;
    background-color: #16375a;
    position:relative;
    z-index:99;
}
.head-logo{
    width: 170px;
    height: 40px;
    float: left;
    margin: 20px 40px;
}
.head-user{
    width: auto;
    height: 20px;
    float: right;
    margin: 45px 10px 0 0;
    font-size: 16px;
}
.head-user span,.head-user img,.head-user p,.head-user a,.head-user input{
    display: block;
    float: left;
}
.head-user span{
    color: #ffffff;
}
.head-user img{
    margin-left: 10px;
}
.head-user p{
    color: #4ea0ea;
    margin-left: 5px;
}
.head-user a{
    color: #ffffff;
    margin-left: 10px;
    text-decoration: none;
}
</style>
