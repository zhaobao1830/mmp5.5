<template>
  <div class="jurisdictionList container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>用户管理</span>
      <i></i>
      <span>权限列表</span>
    </div>
    <div class="jurisdictionListCon content">
      <div class="jurisdictionListSave">
        <div>
          <p>英文：</p>
          <input type="text" class="pausername" name="ename" v-model="ename"/>
        </div>
        <div>
          <p>中文：</p>
          <input type="text" class="pausername" name="cname" v-model="cname"/>
        </div>
        <a class="usernameSave" href="javascript:;" @click="usernameSave">保存</a>
      </div>
      <div class="jurisdictionListShow">
         <table>
           <thead>
             <th width="80">序号</th>
             <th>英文</th>
             <th>中文</th>
             <th>操作</th>
           </thead>
           <tbody>
           <tr v-for="(value, index) in authority_list" :class="trClick_list.indexOf(value.id) === -1 ? 'triNoClick' : 'triClick'">
             <td>{{(page-1)*10 + index + 1}}</td>
             <td>{{value.ename}}</td>
             <td>
               <input :ref="value.id" :class="value.id" type="text" v-model="value.cname"/>
             </td>
             <td>
               <a class="edit" href="javascript:;" @click="editAuthority(value.id)">编辑</a>
               <a class="delete" href="javascript:;" @click="deleteAuthority(value.id)">删除</a>
             </td>
           </tr>
           </tbody>
         </table>
        <div v-show="authority_list.length === 0" class="noTbodyList">没有数据</div>
        <div class="table_button" v-show="isButton">
          <div class="tableButton">
            <a href="javascript:;" class="goFirst" @click="getAllAuthority('first')">首页</a>
            <a href="javascript:;" class="prePage" @click="getAllAuthority('pre')">上一页</a>
            <p class="currentPage">{{page}} / {{totalPages}}</p>
            <a href="javascript:;" class="nextPage" @click="getAllAuthority('next')">下一页</a>
            <a href="javascript:;" class="goLast" @click="getAllAuthority('end')">尾页</a>
            <input type="text" value="" class="pages" v-model="goPageVal">
            <a href="javascript:;" class="goPage" @click="getAllAuthority('goPage')">跳转</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  export default {
    data () {
      return {
        ename: '', // 英文名
        cname: '', // 中文名
        thIsClick: '',
        tbody_list: [],
        trClick_list: [],
        authority_list: [],
        isButton: false,
        page: 1, // 当前页数
        totalPages: 0, // 总页数
        goPageVal: '',
        flag: false
      }
    },
    mounted () {
      this.getAllAuthority()
    },
    methods: {
      // 保存英文名和中文名
      usernameSave () {
        let _this = this
        if (this.ename) {
          this.flag = true
        } else {
          this.flag = false
          this.$message('请输入英文名！')
          return
        }
        if (this.cname) {
          this.flag = true
        } else {
          this.flag = false
          this.$message('请输入中文名！')
          return
        }
        if (this.flag) {
          let data = {
            ename: this.ename,
            cname: this.cname
          }
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/addModule',
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
              console.log(response)
              _this.$message(response.data.detail)
              if (response.data.result === 'TRUE') {
                _this.getAllAuthority()
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      // 获取所有权限
      getAllAuthority (goPage) {
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
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/getAllAuthority',
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
            _this.authority_list = response.data.data
            _this.page = newPage
            if (Number(response.data.count) > 10) {
              _this.isButton = true
            } else {
              _this.isButton = false
            }
            _this.totalPages = Math.ceil(Number(response.data.count) / Number(SIZE))
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 编辑权限
      editAuthority (id) {
        let data = {
          id: id,
          cname: this.$refs[id][0].value
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/editModule',
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
            if (response.data.detail.result === 'TRUE') {
              _this.getAllAuthority()
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 删除权限
      deleteAuthority (id) {
        let data = {
          id: id
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=User/Authority/delModule',
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
            if (response.data.result === 'TRUE') {
              _this.getAllAuthority()
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .jurisdictionListSave{
    overflow: hidden;
  }
  .jurisdictionListSave > div{
    width: auto;
    min-width: 280px;
    height: 35px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .jurisdictionListSave p{
    font-size: 14px;
    color: #464646;
  }
  .jurisdictionListSave p{
    display: block;
    float: left;
  }
  .jurisdictionListSave input[type=text]{
    width: 218px;
    height: 32px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .usernameSave{
    display: block;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
    padding-left: 20px;
    padding-right: 20px;
    float: left;
    border: 1px solid #dddddd;
    background-color: #eeeeee;
    color: #777777;
  }
  .usernameSave:hover{
    border: 1px solid #4ea0ea;
    background-color: #4ea0ea;
    color: #ffffff;
  }
  .jurisdictionListShow{
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
  tbody tr:hover,tbody tr:hover input{
    background-color: #eaf3f8;
  }
  tbody td img, thead th img{
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  tbody input{
    outline: none;
    border: hidden;
    /*background-color: #fafafa;*/
  }
  .edit{
    color: #0062b2;
    margin-right: 10px;
    margin-left: 10px;
  }
  .delete{
    color: #ff0000;
    margin-right: 10px;
    margin-left: 10px;
  }
</style>
