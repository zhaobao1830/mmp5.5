<template>
  <div class="ssdContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>短信管理</span>
      <i></i>
      <span>短信发送详情</span>
    </div>
    <div class="ssdCon content">
      <table>
        <thead>
        <tr>
          <th>批次</th>
          <th>手机号码</th>
          <th>是否成功</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,  index) in dataList">
          <td>{{item.taskid}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.status | judgeStatus}}</td>
        </tr>
        </tbody>
      </table>
      <div v-show="dataList.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchSmsDetail('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchSmsDetail('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchSmsDetail('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchSmsDetail('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchSmsDetail('goPage')">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {getUrlParam} from 'common/js/url'

  export default {
    data () {
      return {
        page: 1, // 当前页数
        dataList: [],
        isButton: false,
        totalPages: 0, // 总页数
        goPageVal: '',
        taskid: ''
      }
    },
    mounted () {
      if (window.location.href.indexOf('?') > 0) {
        this.taskid = getUrlParam('taskid')
        this.$store.commit('changeUrlFirst', this.$route.params.first)
        this.$store.commit('changeUrlSecond', this.$route.params.second)
      }
      this.searchSmsDetail()
    },
    methods: {
      searchSmsDetail (goPage) {
        const SIZE = 10
        let newPage = 1
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
          'size': SIZE,
          'page': newPage,
          'taskid': this.taskid
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Sms/Index/sendDetail',
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
            _this.dataList = response.data.list
            if (Number(response.data.count) > 10) {
              _this.isButton = true
            } else {
              _this.isButton = false
            }
            _this.page = newPage
            _this.totalPages = Math.ceil(response.data.count / SIZE)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    filters: {
      judgeStatus (value) {
        if (value === '10') {
          return '发送成功'
        } else if (value === '20') {
          return '发送失败'
        } else {
          return '提交成功'
        }
      }
    }
  }
</script>

<style scoped>
  table{
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
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
  thead tr{

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
</style>
