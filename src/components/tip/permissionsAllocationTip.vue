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
            <li @click="changeLiClick(id)">
              <div>
                <img :data-img="1" :src="liClick_list.indexOf('1') === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
              </div>
              <p>权限1</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  export default {
    props: ['perAll_list'],
    data () {
      return {
        liClick_list: [], // 选择的权限
        usernames: '', // 用户信息
        usernameId: '' // 用户信息ID
      }
    },
    watch: {
      perAll_list () {
        this.usernames = ''
        for (let user of this.perAll_list) {
          if (this.usernames) {
            this.usernames += ',' + user.username
          } else {
            this.usernames = user.username
          }
        }
      }
    },
    methods: {
      // 关闭弹出框
      closePat () {
        this.$emit('closePat', true)
      },
      // 改变liClick_list列表
      changeLiClick (id) {},
      // 获取所有权限
      getAllAuthority () {
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/editUserStatus',
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
    height: 300px;
    position: absolute;
    top:50%;
    margin-top: -150px;
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
</style>
