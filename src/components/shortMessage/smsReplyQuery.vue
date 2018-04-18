<template>
  <div class="smsContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>短信管理</span>
      <i></i>
      <span>短信回复查询</span>
    </div>
    <div class="smsCon content">
      <div class="smsCon_search">
        <div>
          <p>发送日期：</p>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="sq_time_f"></el-date-picker>
          <i></i>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="sq_time_t"></el-date-picker>
        </div>
        <div>
          <p>手机号码：</p>
          <input name="mobile" v-model="mobile">
        </div>
        <a class="smsSearch" href="javascript:;" @click="searchSmsReplay">查&nbsp;&nbsp;询</a>
      </div>
      <table>
        <thead>
        <tr>
          <th width="150">手机号码</th>
          <th>回复内容</th>
          <th width="150">接收时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataList">
          <td>{{item.mobile}}</td>
          <td :title="item.content">{{item.content}}</td>
          <td>{{item.receivetime | formatDate}}</td>
        </tr>
        </tbody>
      </table>
      <div v-show="dataList.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchSmsReplay('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchSmsReplay('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchSmsReplay('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchSmsReplay('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchSmsReplay('goPage')">跳转</a>
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
  import {formatDate} from 'common/js/date'

  export default {
    data () {
      return {
        mobile: '',
        dataList: [],
        page: 1, // 当前页数
        isButton: false,
        totalPages: 0, // 总页数
        goPageVal: '',
        sq_time_f: '',
        sq_time_t: ''
      }
    },
    mounted () {
      this.searchSmsReplay()
    },
    methods: {
      searchSmsReplay (goPage) {
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
        let sqTimeF = this.sq_time_f ? formatDate(this.sq_time_f, 'yyyy-MM-dd') : ''
        let sqTimeT = this.sq_time_t ? formatDate(this.sq_time_t, 'yyyy-MM-dd') : ''
        let data = {
          'sq_time_f': sqTimeF,
          'sq_time_t': sqTimeT,
          'mobile': this.mobile,
          'size': SIZE,
          'page': newPage
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Sms/Index/sendReplay',
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
      }
    },
    filters: {
      formatDate (time) {
        let newTime = Number(time + '000')
        let date = new Date(newTime)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .smsCon_search{
    overflow: hidden;
  }
  .smsCon_search > div{
    width: auto;
    height: 34px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .smsCon_search p{
    font-size: 14px;
    color: #464646;
  }
  .smsCon_search p,.smsCon_search input,.smsCon_search select,.smsCon_search i,.smsCon_search a{
    display: block;
    float: left;
  }
  .smsCon_search input{
    width: 230px;
    height: 32px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .smsCon_search select{
    width: 230px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .smsCon_search input:hover,.smsCon_search input:focus,.smsCon_search select:hover,.smsCon_search select:focus{
    border-color: #4ea0ea;
  }
  .smsCon_search i{
    width: 10px;
    height: 1px;
    background-color: #bbbbbb;
    margin-left: 10px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .smallInput{
    width: 98px !important;
    text-align: center;
  }
  .smsSearch{
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
  .srqSearch:hover{
    background-color: #4986c6;
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
</style>
