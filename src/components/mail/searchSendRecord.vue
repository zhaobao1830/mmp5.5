<template>
  <div class="srqContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>邮件服务</span>
      <i></i>
      <span>发送记录查询</span>
    </div>
    <div class="srqCon content">
      <div class="srqCon_search">
        <div>
          <p>发送日期：</p>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="sqTimeF"></el-date-picker>
          <i></i>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_t" v-model="sqTimeT"></el-date-picker>
        </div>
        <div>
          <p>发送状态：</p>
          <select v-model="sendstat">
            <option value="请选择">请选择</option>
            <option value="1">成功</option>
            <option value="2">失败</option>
            <option value="0">未发送</option>
          </select>
        </div>
        <a class="srqSearch" href="javascript:;" @click="searchSendReco">查&nbsp;&nbsp;询</a>
      </div>
      <table>
        <thead>
        <tr>
          <th width="100">ID</th>
          <th>邮件数</th>
          <th>邮件发送状态</th>
          <th>邮件</th>
          <th>发送时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataList">
          <td>{{item.id}}</td>
          <td>{{item.email | getMailNum}}</td>
          <td><span :class="{'blueColor': item.emailstat === '1','redColor': item.emailstat !== '1'}">{{item.emailstat | getMailState}}</span></td>
          <td><a href="javascript:;" @click="showEmail(item.email)">查看</a></td>
          <td>{{item.addtime | formatDateMail}}</td>
        </tr>
        </tbody>
      </table>
      <div v-show="dataList.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchSendReco('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchSendReco('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchSendReco('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchSendReco('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchSendReco('goPage')">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <search-mail-tip v-show="tipShow" :emails="emails" @closeTip="closeTip"></search-mail-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'common/css/commons.css'
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {formatDate} from '@/common/js/date'
  import searchMailTip from '@/components/tip/searchMailTip'

  export default {
    data () {
      return {
        sqTimeF: '',
        sqTimeT: '',
        sendstat: '请选择',
        dataList: [],
        count: 0,
        isShow: false,
        page: 1, // 当前页数
        isButton: false,
        totalPages: 0, // 总页数
        goPageVal: '',
        tipShow: false,
        emails: ''
      }
    },
    mounted () {
      this.searchSendReco()
    },
    methods: {
      // 查询
      searchSendReco (goPage) {
        let sqTimeF = this.sqTimeF ? formatDate(this.sqTimeF, 'yyyy-MM-dd') : ''
        let sqTimeT = this.sqTimeT ? formatDate(this.sqTimeT, 'yyyy-MM-dd') : ''
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
        let sendstat = this.sendstat === '请选择' ? '' : this.sendstat
        let data = {
          'sq_time_f': sqTimeF,
          'sq_time_t': sqTimeT,
          'sendstat': sendstat,
          'size': SIZE,
          'page': newPage
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Email/Index/emailRecord',
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
      },
      // 显示mail
      showEmail (val) {
        this.emails = val
        this.tipShow = true
      },
      // 关闭tip
      closeTip () {
        this.tipShow = false
      }
    },
    filters: {
      getMailNum (val) {
        return val.split(';').length
      },
      getMailState (val) {
        if (val === '0') {
          return '未发送'
        } else if (val === '1') {
          return '成功'
        } else if (val === '2') {
          return '失败'
        }
      },
      formatDateMail (val) {
        if (val) {
          let newTime = Number(val + '000')
          let date = new Date(newTime)
          return formatDate(date, 'yyyy-MM-dd hh-mm-ss')
        } else {
          return ''
        }
      }
    },
    components: {
      'searchMailTip': searchMailTip
    }
  }
</script>

<style scoped>
  .srqCon_search{
    overflow: hidden;
  }
  .srqCon_search > div{
    width: auto;
    height: 34px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .srqCon_search p{
    font-size: 14px;
    color: #464646;
  }
  .srqCon_search p,.srqCon_search input,.srqCon_search select,.srqCon_search i,.srqCon_search a{
    display: block;
    float: left;
  }
  .srqCon_search input{
    width: 230px;
    height: 32px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .srqCon_search select{
    width: 230px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .srqCon_search input:hover,.srqCon_search input:focus,.srqCon_search select:hover,.srqCon_search select:focus{
    border-color: #4ea0ea;
  }
  .srqCon_search i{
    width: 10px;
    height: 1px;
    background-color: #bbbbbb;
    margin-left: 10px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .smallInput{
    width: 98px !important;
  }
  .srqSearch{
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
  .blueColor{
    color: #398fd1;
  }
  .redColor{
    color: #f44848;
  }
</style>
