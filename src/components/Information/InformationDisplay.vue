<template>
  <div class="inDisContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>信息管理</span>
      <i></i>
      <span>信息展示</span>
    </div>
    <div class="inDisCon content">
      <div class="inDisCon_search">
        <div>
          <p>公司名称：</p>
          <input type="text" v-model="compenyname">
        </div>
        <div>
          <p>业务需求：</p>
          <input type="text" v-model="bussNedds">
        </div>
        <div>
          <p>所在地区：</p>
          <select v-model="provice">
            <option value="请选择">请选择</option>
            <option v-for="(item, index) in proviceList" :value="item">{{item}}</option>
          </select>
        </div>
        <a class="samSearch" href="javascript:;" @click="searchInformation">查&nbsp;&nbsp;询</a>
      </div>
      <table>
        <thead>
        <tr>
          <th width="50">ID</th>
          <th>公司名称</th>
          <th>业务需求</th>
          <th>所在地区</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataList">
          <td>{{item.id}}</td>
          <td>{{item.nameVal}}</td>
          <td>{{item.bussNedds}}</td>
          <td>{{item.addressPro}}</td>
          <td>
            <a href="javascript:;" @click="seeInformation(item.id)">查看</a>
            <a href="javascript:;" @click="deleteInformation(item.id, index)">删除</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-show="dataList.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchInformation('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchInformation('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchInformation('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchInformation('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchInformation('goPage')">跳转</a>
        </div>
      </div>
      <div class="inDisCon_daochu">
        <a class="information-daochu" href="javascript:;" @click="exportInformation">导&nbsp;&nbsp;出</a>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <information-tip v-show="tipShow" :inforMation="inforMation" @closeTip="closeTip"></information-tip>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose"
        >
      <span>是否确定删除该条数据</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {proviceJson} from 'common/js/provice'
  import informationTip from 'components/tip/informationTip'

  export default {
    data () {
      return {
        tipShow: false,
        proviceList: proviceJson,
        dataList: [],
        count: 0,
        telCon: '',
        page: 1, // 当前页数
        isButton: false,
        totalPages: 0, // 总页数
        goPageVal: '',
        compenyname: '', // 公司名称
        bussNedds: '', // 业务需求
        provice: '请选择', // 所在地址
        inforMation: '',
        dialogVisible: false,
        deletaData: {
          id: '',
          index: ''
        }
      }
    },
    mounted () {
      this.searchInformation()
    },
    methods: {
      searchInformation (goPage) {
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
          'act': 'show',
          'compenyname': this.compenyname,
          'bussNedds': this.bussNedds,
          'provice': this.provice !== '请选择' ? this.provice : ''
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Info/Index/infolist',
          method: 'post',
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
          if (response.data.list) {
            _this.dataList = response.data.list
            if (Number(response.data.count) > 10) {
              _this.isButton = true
            } else {
              _this.isButton = false
            }
            _this.page = newPage
            _this.totalPages = Math.ceil(response.data.count / SIZE)
          } else {
            _this.dataList = []
            _this.isButton = false
            _this.page = 1
            _this.totalPages = 0
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      // 删除
      deleteInformation (id, index) {
        this.dialogVisible = true
        this.deletaData.id = id
        this.deletaData.index = index
      },
      deleteOk () {
        let data = {
          'act': 'delete',
          'id': this.deletaData.id
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Info/Index/delet',
          method: 'post',
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
          if (response.data.stat === 1 && response.data.message === '删除成功') {
            _this.dataList.splice(_this.deletaData.index, 1)
            _this.searchInformation()
            _this.$message('删除成功！')
            _this.dialogVisible = false
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      // 查看
      seeInformation (id) {
        let data = {
          'act': 'detail',
          'id': id
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Info/Index/details',
          method: 'post',
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
            _this.inforMation = response.data
            _this.tipShow = true
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      closeTip (data) {
        if (data === true) {
          this.tipShow = false
        }
      },
      // 导出excel文件
      exportInformation () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = ['ID', '公司名称', '联系人', '手机号', '邮箱', '所在地区', '业务需求', '业务描述']
          const filterVal = ['id', 'nameVal', 'contactsVal', 'telephoneVal', 'emailVal', 'addressPro', 'bussNedds', 'busDescription']
          const list = this.dataList
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
        })
      },
      // 格式化json数据
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 关闭弹出框
      handleClose () {
        this.modalState = false
      },
      tt () {
        console.log('tt')
      }
    },
    components: {
      'informationTip': informationTip
    }
  }
</script>

<style scoped>
  .inDisCon_search{
    overflow: hidden;
    min-width:1080px;
  }
  .inDisCon_search > div{
    width: auto;
    height: 34px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .inDisCon_search p{
    font-size: 14px;
    color: #464646;
  }
  .inDisCon_search p,.inDisCon_search input,.inDisCon_search select,.inDisCon_search a,.inDisCon_daochu a{
    display: block;
    float: left;
  }
  .inDisCon_search input{
    width: 230px;
    height: 32px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .inDisCon_search select{
    width: 230px;
    height: 34px;
    font-size: 14px;
    color: #777777;
    border: 1px solid #bbbbbb;
  }
  .inDisCon_search input:hover,.inDisCon_search input:focus,.inDisCon_search select:hover,.inDisCon_search select:focus{
    border-color: #4ea0ea
  }
  .samSearch,.information-daochu{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    background-color: #4ea0ea;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
  }
  .samSearch:hover,.information-daochu:hover{
    background-color: #4986c6;
  }
  .information-daochu{
    margin-bottom: 20px;
  }
  table{
    width: 100%;
    min-width: 1070px;
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 20px;
  }
  thead{
    width: auto;
    min-width: 1070px;
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
    font-size: 12px;
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
  tbody a{
    color: #4ea0ea;
    margin-left: 5px;
    margin-right: 5px;
    text-decoration: none;
  }
</style>
