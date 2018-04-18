<template>
  <div class="packRegContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>服务管理</span>
      <i></i>
      <span>套餐注册管理</span>
    </div>
    <div class="packRegCon content">
      <div class="packRegCon_operation">
        <label @click="addPackReg">
          <img src="http://static.crecgec.com/mmp/pre_01.png">
          <p>添加</p>
        </label>
        <label @click="delPackReg">
          <img src="http://static.crecgec.com/mmp/pre_02.png">
          <p>删除</p>
        </label>
        <label @click="updatePackReg">
          <img src="http://static.crecgec.com/mmp/pre_03.png">
          <p>编辑</p>
        </label>
      </div>
      <table>
        <thead>
        <tr>
          <th width="25" @click="changeThClik">
            <img :class="thIsClick ? 'thiClick' : 'thiNoClick'" :src="thIsClick ? `http://static.crecgec.com/mmp/sau_032.png`: `http://static.crecgec.com/mmp/sau_031.png`">
          </th>
          <th width="50">序号</th>
          <th width="100">创建日期</th>
          <th width="50">套餐ID</th>
          <th>归属服务</th>
          <th width="120">套餐名称</th>
          <th>描述</th>
          <th width="100">单价</th>
          <th width="50">最大允许数量</th>
          <th width="100">可订购终端</th>
          <th>允许的支付方式</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key, index) in tbody_list" :class="trClick_list.indexOf(key) === -1 ? 'triNoClick' : 'triClick'">
          <td @click="changeTrClik(key)">
            <img :data-img="key" :src="trClick_list.indexOf(key) === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
          </td>
          <td>{{(page-1)*10 + index + 1}}</td>
          <td>{{value.creatdate ? value.creatdate.split(" ")[0] : ''}}</td>
          <td>{{value.servicetypeid}}</td>
          <td :title="value.servicename">{{value.servicename}}</td>
          <td>{{value.servicetypename}}</td>
          <td :title="value.servicetypedes">{{value.servicetypedes}}</td>
          <td>{{value.price}}</td>
          <td>{{value.clientcout}}</td>
          <td>{{value.product}}</td>
          <td :title="value.allowplaystpe">{{value.allowplaystpe}}</td>
        </tr>
        </tbody>
      </table>
      <div v-show="tbody_list.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchPackageRegist('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchPackageRegist('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchPackageRegist('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchPackageRegist('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchPackageRegist('goPage')">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <package-registry-tip ref="packageRegistryTip" @operation="operation" @isAddconShow="changeAddconShow" :addOrUpdate="addOrUpdate" :packageRegistr="packageRegistr" v-show="tipShow"></package-registry-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import packageRegistryTip from 'components/tip/packageRegistryTip'
  import {deleteArray} from 'common/js/dom'

  export default {
    data () {
      return {
        addOrUpdate: 'add',
        packageRegistr: '', // 一个套餐对象
        tipShow: false,
        isButton: false,
        page: 1, // 当前页数
        totalPages: 0, // 总页数
        goPageVal: '',
        key_list: [], // 返回的数据的key值
        tbody_list: [], // 返回的数据
        trClick_list: [], // tr点击以后保持id的列表
        tbody_list_length: 0,
        thIsClick: false // th是否点击
      }
    },
    mounted () {
      this.searchPackageRegist()
      this.$refs.packageRegistryTip.searchHomeService()
    },
    methods: {
      // 查询套餐注册列表
      searchPackageRegist (goPage) {
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
          'interface': 'selectservicetypeD',
          'size': SIZE,
          'page': newPage
        }
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
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
            if (response.data.result === 'TRUE') {
              _this.tbody_list = response.data.detail
              _this.page = newPage
              _this.tbody_list_length = 0
              if (Number(response.data.count) > 10) {
                _this.isButton = true
              } else {
                _this.isButton = false
              }
              _this.totalPages = Math.ceil(Number(response.data.count) / SIZE)
              for (let keyVal in _this.tbody_list) {
                _this.key_list.push(keyVal)
                _this.tbody_list_length = _this.tbody_list_length + 1
              }
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      addPackReg () {
        this.addOrUpdate = 'add'
        this.tipShow = true
      },
      updatePackReg () {
        if (this.trClick_list.length === 0) {
          this.$message('请选择一个更新项目')
        } else if (this.trClick_list.length > 1) {
          this.$message('只能选择一个更新项目')
        } else {
          this.addOrUpdate = 'update'
          this.tipShow = true
          this.packageRegistr = this.tbody_list[this.trClick_list[0]]
        }
      },
      // 删除packageRegistration
      delPackReg () {
        let data = {
          'interface': 'deleteservicetype',
          'id': this.trClick_list
        }
        let _this = this
        if (confirm('您真的确定删除吗？')) {
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
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
              if (response.data.result === 'TRUE') {
                _this.$message('删除成功')
                _this.searchPackageRegist()
                _this.trClick_list = []
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      // th选择
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
      // tr选择
      changeTrClik (key) {
        if (this.trClick_list.indexOf(key) === -1) {
          this.trClick_list.push(key)
        } else {
          this.trClick_list = deleteArray(this.trClick_list, key)
        }
        if (this.trClick_list.length < this.tbody_list_length) {
          this.thIsClick = false
        } else {
          this.thIsClick = true
        }
      },
      // 通过addCon组件传回的值改变tipShow
      changeAddconShow () {
        this.tipShow = false
      },
      // 操作成功后进行操作
      operation (data) {
        if (data === true) {
          this.searchPackageRegist()
          this.trClick_list = []
        }
      }
    },
    components: {
      packageRegistryTip
    }
  }
</script>

<style scoped>
  .packRegCon_operation{
    overflow: hidden;
  }
  .packRegCon_operation label,.packRegCon_operation label img,.packRegCon_operation label p{
    display: block;
    float: left;
    font-size: 14px;
    color: #464646;
    height: 20px;
    line-height: 20px;
  }
  .packRegCon_operation label{
    margin: 20px 0 0 20px;
    cursor: pointer;
  }
  .packRegCon_operation label p{
    margin-left: 5px;
  }
  .packRegCon_operation label p:hover{
    color: #ff0000;
  }

  table{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 20px;
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
  tbody tr a{
    color: #398fd1;
    text-decoration: none;
  }
  tbody tr a:hover{
    color: #ff0000;
  }
  /*公共类 start*/
  .triClick{
    background-color: #eaf3f8;
  }
  .displayBlock{
    display: block;
  }
  .displayNone{
    display: none;
  }

</style>
