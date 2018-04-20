<template>
  <div class="permissionsAllocationTip">
    <div class="patContent">
      <div class="pat_title">
        <p>权限分配：</p>
        <a class="pat_close" href="javascript:;" @click="closePat">
          <img src="http://static.crecgec.com/mmp/sre_05.png"/>
        </a>
      </div>
      <div class="pat_content">
        <div class="userist">
          <span>选择的用户名列表：</span>
          <p>{{usernames}}</p>
        </div>
        <div class="jurisdictionList">
          <span>权限列表：</span>
          <ul>
            <li v-for="(value,index) in authority_list" @click="changeLiClick(value.ename)">
              <div>
                <img :data-img="1" :src="authorityHas.indexOf(value.ename) === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
              </div>
              <p>{{value.cname}}</p>
            </li>
          </ul>
        </div>
        <a class="save" href="javascript:;" @click="editAuthority">提交</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {deleteArray} from 'common/js/dom'
  export default {
    props: ['perAll_list'],
    data () {
      return {
        authorityHas: [], // 选择的权限/已有的权限
        usernames: '', // 用户信息
        usernameId: '', // 用户信息ID
        authority_list: [] // 用户权限
      }
    },
    mounted () {
      this.getAllAuthority()
    },
    watch: {
      perAll_list () {
        this.usernames = ''
        for (let user of this.perAll_list) {
          if (this.usernames) {
            this.usernames += ',' + user.username
            this.usernameId += ',' + user.id
          } else {
            this.usernames = user.username
            this.usernameId = user.id
          }
        }
        if (this.perAll_list.length === 1) {
          this.getAuthorityByUsername(this.perAll_list[0].username)
        } else {
          this.authorityHas.length = 0
        }
      }
    },
    methods: {
      // 关闭弹出框
      closePat () {
        this.$emit('closePat', true)
      },
      // 改变liClick_list列表
      changeLiClick (ename) {
        if (this.authorityHas.indexOf(ename) === -1) {
          this.authorityHas.push(ename)
        } else {
          this.authorityHas = deleteArray(this.authorityHas, ename)
        }
      },
      // 获取所有权限
      getAllAuthority () {
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/getAllAuthority',
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
            _this.authority_list = response.data.data
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 获取当前用户权限
      getAuthorityByUsername (username) {
        let data = {
          username: username
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/getCurrentAuth',
          data: data,
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
            let authority = JSON.parse(response.data.list[0].authority)
            for (let key in authority) {
              if (authority.hasOwnProperty(key)) {
                _this.authorityHas.push(key)
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 提交修改用户权限
      editAuthority () {
        // 拼接权限对象
        let authority = {}
        for (var i = 0; i < this.authorityHas.length; i++) {
          authority[this.authorityHas[i]] = 1
        }
        let data = {
          id: this.usernameId,
          authority: JSON.stringify(authority)
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/editAuth',
          data: data,
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
            _this.$message(response.data.detail)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .permissionsAllocationTip{
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 100;
  }
  .patContent{
    width: 450px;
    height: 350px;
    position: absolute;
    top:50%;
    margin-top: -175px;
    left: 50%;
    margin-left: -225px;
    background-color: #ffffff;
  }
  .pat_title{
    width: 450px;
    height: 34px;
    line-height: 34px;
    background-color: #4596d4;
    color: #ffffff;
  }
  .pat_title p{
    margin-left: 10px;
    font-size: 16px;
    float: left;
  }
  .pat_close{
    display: block;
    float: right;
    margin-right: 10px;
  }
  .pat_content{
    overflow: hidden;
  }
  .userist{
    margin: 20px;
  }
  .userist span,.jurisdictionList span{
    color: #222222;
    font-size: 14px;
  }
  .userist p{
    color: #777777;
    font-size: 14px;
  }
  .jurisdictionList{
    margin: 0 20px;
    height: 130px;
    overflow: hidden;
  }
  .jurisdictionList ul{
    width: 410px;
    height: 130px;
    overflow: auto;
  }
  .jurisdictionList ul li{
    width: auto;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
  .jurisdictionList ul li div,.jurisdictionList ul li p{
    display: inline-block;
    float: left;
    height: 15px;
    line-height: 15px;
    font-size: 14px;
  }
  .jurisdictionList ul li div{
    margin-right: 5px;
  }
  .jurisdictionList ul li p{
    color: #777777;
  }
  .save{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 2px;
    display: block;
    float: left;
    text-align: center;
    text-decoration: none;
    background-color: #4ea0ea;
    color: #fff;
    margin-left: 185px;
    margin-top: 35px;
  }
</style>
