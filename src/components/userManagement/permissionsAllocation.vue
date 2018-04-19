<template>
  <div class="permissionsAllocation container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>用户管理</span>
      <i></i>
      <span>权限分配</span>
    </div>
    <div class="permisAllCon content">
      <div class="permisAllSearch">
        <div>
          <p>用户名：</p>
          <input type="text" class="pausername" name="pausername" v-model="username"/>
        </div>
        <a class="usernameSearch" href="javascript:;" @click="usernameSearch">查询</a>
        <a class="batchEditing" href="javascript:;" @click="batchPermissionsAllocation">批量权限分配</a>
      </div>
      <div class="permisAllList">
        <table>
          <thead>
             <th width="25" @click="changeThClik">
               <img  :class="thIsClick ? 'thiClick' : 'thiNoClick'" :src="thIsClick ? `http://static.crecgec.com/mmp/sau_032.png`: `http://static.crecgec.com/mmp/sau_031.png`">
             </th>
             <th width="80">序号</th>
             <th>用户名</th>
             <th>状态</th>
             <th>操作</th>
          </thead>
          <tbody>
             <tr v-for="(value, index) in tbody_list" :class="trClick_list.indexOf(value.id) === -1 ? 'triNoClick' : 'triClick'">
               <td @click="changeTrClik(value.id)">
                 <img :data-img="value.id" :src="trClick_list.indexOf(value.id) === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
               </td>
               <td>{{(page-1)*10 + index + 1}}</td>
               <td>{{value.username}}</td>
               <td>
                 <a class="enable" href="javascript:;" :class="value.status === '1' ? 'enableClick' : 'enableNo'" @click = changeState(value.id,value.status,1)>启用</a>
                 <a class="disable" href="javascript:;" :class="value.status === '0' ? 'disableClick' : 'disableNo'" @click = changeState(value.id,value.status,0)>禁用</a>
               </td>
               <td>
                 <a class="permissionsAllocation" href="javascript:;" @click="batchPermissionsAllocation(0, value.id, value.username)">权限分配</a>
                 <a class="edit" href="javascript:;" @click="edit(value.username)">编辑</a>
               </td>
             </tr>
          </tbody>
        </table>
        <div v-show="tbody_list.length === 0" class="noTbodyList">没有数据</div>
        <div class="table_button" v-show="isButton">
          <div class="tableButton">
            <a href="javascript:;" class="goFirst" @click="allUserSearch('first')">首页</a>
            <a href="javascript:;" class="prePage" @click="allUserSearch('pre')">上一页</a>
            <p class="currentPage">{{page}} / {{totalPages}}</p>
            <a href="javascript:;" class="nextPage" @click="allUserSearch('next')">下一页</a>
            <a href="javascript:;" class="goLast" @click="allUserSearch('end')">尾页</a>
            <input type="text" value="" class="pages" v-model="goPageVal">
            <a href="javascript:;" class="goPage" @click="allUserSearch('goPage')">跳转</a>
          </div>
        </div>
      </div>
    </div>
    <per-all-update-password-tip v-show="paudShow" :paudUsername="paudUsername" @closePerAll="closePerAll"></per-all-update-password-tip>
    <permissions-allocation-tip v-show="patShow" :perAll_list="perAll_list" @closePat="closePat"></permissions-allocation-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {deleteArray} from 'common/js/dom'
  import perAllUpdatePasswordTip from 'components/tip/perAllUpdatePasswordTip'
  import permissionsAllocationTip from 'components/tip/permissionsAllocationTip'

  export default {
    data () {
      return {
        username: '', // 用户名
        thIsClick: false, // th是否点击
        tbody_list: [],
        trClick_list: [],
        key_list: [],
        isButton: false,
        page: 1, // 当前页数
        totalPages: 0, // 总页数
        goPageVal: '',
        tbody_list_length: 0,
        paudShow: false, // 修改密码弹出框是否显示
        paudUsername: '', // 传递给修改密码弹出框的用户名
        patShow: false, // 分配权限弹出框是否显示
        perAll_list: [], // 分配权限列表(里面包含了选择的用户信息，id和username)
        id_username_obj: {}  // 请求到body_list后，获取到里面的id和对应的username,保存到这个list里面
      }
    },
    mounted () {
      this.allUserSearch()
    },
    methods: {
      // 查询所有用户
      allUserSearch (goPage) {
        let _this = this
        const SIZE = 10 // 每次请求的页数
        let newPage = 1 // 跳转到第几页
        if (goPage === 'first') {
          newPage = 1
        } else if (goPage === 'pre') {
          newPage = this.page > 1 ? this.page - 1 : 1
        } else if (goPage === 'next') {
          newPage = this.page > this.totalPages ? this.page : this.page + 1
        } else if (goPage === 'end') {
          newPage = this.totalPages
        } else if (goPage === 'goPage') {
          newPage = this.goPageVal
        }
        let data = {
          'page': newPage,
          'size': SIZE
        }
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/getAllUsers',
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
            _this.thIsClick = false
            _this.trClick_list.length = 0
            _this.page = newPage
            _this.tbody_list = response.data.list
            _this.tbody_list_length = 0
            if (Number(response.data.count) > 10) {
              _this.isButton = true
            } else {
              _this.isButton = false
            }
            _this.totalPages = Math.ceil(Number(response.data.count) / Number(SIZE))
            for (var i = 0; i < _this.tbody_list.length; i++) {
              _this.key_list.push(_this.tbody_list[i].id)
              _this.tbody_list_length = _this.tbody_list_length + 1
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 通过用户名查询
      usernameSearch () {
        let _this = this
        let data = {
          'username': this.username
        }
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/getCurrentAuth',
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
            _this.thIsClick = false
            _this.trClick_list.length = 0
            _this.tbody_list = response.data.list
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 批量权限分配
      batchPermissionsAllocation (sta, id, username) {
        this.perAll_list.length = 0
        if (sta === 0) {
          this.perAll_list.push({id: id, username: username})
          this.patShow = true
        } else {
          if (this.trClick_list.length > 0) {
            this.getIdUsername(this.tbody_list)
            for (let i = 0; i < this.trClick_list.length; i++) {
              this.perAll_list.push({id: this.trClick_list[i], username: this.id_username_obj[this.trClick_list[i]]})
            }
            this.patShow = true
          } else {
            this.$message('请至少选择一个用户！')
          }
        }
      },
      changeThClik () {
        this.thIsClick = !this.thIsClick
        if (this.thIsClick) {
          for (let i = 0; i < this.key_list.length; i++) {
            this.trClick_list.push(this.key_list[i])
          }
        } else {
          this.trClick_list.length = 0
        }
      },
      changeTrClik (id) {
        if (this.trClick_list.indexOf(id) === -1) {
          this.trClick_list.push(id)
        } else {
          this.trClick_list = deleteArray(this.trClick_list, id)
        }
        if (this.trClick_list.length < this.tbody_list_length) {
          this.thIsClick = false
        } else {
          this.thIsClick = true
        }
      },
      // 编辑
      edit (username) {
        this.paudUsername = username
        this.paudShow = true
      },
      // 关闭修改密码弹出框
      closePerAll (data) {
        if (data) {
          this.paudShow = false
        }
      },
      // 改变状态
      changeState (id, oldStatus, newStatus) {
        if (Number(oldStatus.trim()) !== Number(newStatus)) {
          let data = {
            id: id,
            status: newStatus
          }
          let _this = this
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/editUserStatus',
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
              if (response.data.state) {
                _this.allUserSearch()
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      // 关闭分配权限弹出框
      closePat (data) {
        if (data) {
          this.patShow = false
        }
      },
      // 通过获取到的body_list，获取到id和对应的username
      getIdUsername (list) {
        if (list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            this.id_username_obj[list[i].id] = list[i].username
          }
        }
      }
    },
    components: {
      perAllUpdatePasswordTip,
      permissionsAllocationTip
    }
  }
</script>

<style scoped>
  .permisAllSearch{
    overflow: hidden;
  }
  .permisAllSearch > div{
    width: auto;
    min-width: 300px;
    height: 35px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .permisAllSearch p{
    font-size: 14px;
    color: #464646;
  }
  .permisAllSearch p{
    display: block;
    float: left;
  }
  .permisAllSearch input[type=text]{
    width: 218px;
    height: 32px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .usernameSearch,.batchEditing{
    display: block;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
  }
  .usernameSearch{
    padding-left: 20px;
    padding-right: 20px;
    float: left;
    background-color: #4ea0ea;
    color: #ffffff;
  }
  .batchEditing{
    padding-left: 10px;
    padding-right: 10px;
    float: right;
    margin-right: 20px;
    background-color: #eeeeee;
    color: #777777;
  }
  .usernameSearch:hover{
    background-color: #4986c6;
    color: #fff;
  }
  .batchEditing:hover{
    background-color: #4ea0ea;
    color: #ffffff;
  }
  .permissionsAllocation,.edit{
    color: #0062b2;
    margin-right: 10px;
    margin-left: 10px;
  }
  .enable,.disable{
    margin-left: 10px;
    margin-right: 10px;
  }
  .enableClick{
    color: #0062b2;
  }
  .disableClick{
    color: #ff0000;
  }
  .enableNo,.disableNo{
    color: #777777;
  }
  .permisAllList{
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  table{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 10px;
  }
  thead{
    width: auto;
    font-size: 14px;
    text-align: center;
    background-color: #4ea0ea;
  }
  thead tr,thead th{
    border: 1px solid #dddddd;
    border-left: none !important;
    color: #ffffff;
    height: 45px;
    font-size: 14px;
  }
  thead tr img,tbody td img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  tbody{
    width: auto;
    min-width: 1070px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    background-color: #fafafa;
  }
  tbody tr,tbody td{
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    height: 40px;
    color: #464646;
    padding-left: 3px;
    padding-right: 3px;
  }
  tbody td{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  tbody tr{
    border-top: 1px dotted #dddddd !important;
  }
  tbody tr:hover{
    background-color: #eaf3f8;
  }
  tbody td img, thead th img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
</style>
