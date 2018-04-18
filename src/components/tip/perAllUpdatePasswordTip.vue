<template>
  <div class="perAllUpdatePassword">
    <div class="paupContent">
      <div class="paup_title">
        <p>修改密码：</p>
        <a class="paup_close" href="javascript:;" @click="closePerAll">
          <img src="http://static.crecgec.com/mmp/sre_05.png"/>
        </a>
      </div>
      <div class="paup_content">
         <div>
           <span>用户名：</span>
           <p>{{paudUsername}}</p>
         </div>
         <div>
           <span>新密码：</span>
           <input class="newPassword" type="text" v-model="newPassword"/>
         </div>
         <a class="savePerAll" href="javascript:;" @click="savePerAll">保存</a>.
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  export default {
    props: ['paudUsername'],
    data () {
      return {
        newPassword: ''
      }
    },
    methods: {
      closePerAll () {
        this.$emit('closePerAll', true)
      },
      savePerAll () {
        if (this.newPassword) {
          let data = {
            username: this.paudUsername,
            newPassword: this.newPassword
          }
          let _this = this
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/editPwd',
            method: 'POST',
            data: data,
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
              _this.$message(response.data.detail)
              if (response.data.state === 'true') {
                setTimeout(() => {
                  _this.closePerAll()
                  _this.newPassword = ''
                }, 800)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          this.$message('请输入新密码！')
        }
      }
    }
  }
</script>

<style scoped>
  .perAllUpdatePassword{
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 100;
  }
  .paupContent{
    width: 400px;
    height: 300px;
    position: absolute;
    top:50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -200px;
    background-color: #ffffff;
  }
  .paup_title{
    width: 400px;
    height: 34px;
    line-height: 34px;
    background-color: #4596d4;
    color: #ffffff;
  }
  .paup_title p{
    margin-left: 10px;
    font-size: 16px;
    float: left;
  }
  .paup_close{
    display: block;
    float: right;
    margin-right: 10px;
  }
  .paup_content{
    overflow: hidden;
  }
  .paup_content > div{
    float: left;
    width: 400px;
    height: 34px;
    line-height: 34px;
    margin-top: 10px;
  }
  .paup_content > div > span{
    width: 95px;
    float: left;
    text-align: right;
    color: #464646;
    font-size: 14px;
  }
  .paup_content > div > p{
    width: 200px;
    float: left;
    color: #464646;
    font-size: 14px;
  }
  .paup_content > div > input{
    width: 188px;
    padding-left: 5px;
    padding-right: 5px;
    height: 31px;
    border: 1px solid #bbb;
  }
  .savePerAll{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
    margin-top: 70px;
    display: block;
    float: left;
    text-align: center;
    text-decoration: none;
    background-color: #4ea0ea;
    color: #fff;
    margin-left: 160px;
  }
</style>
