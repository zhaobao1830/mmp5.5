<template>
  <div class="srqContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>短信管理</span>
      <i></i>
      <span>发送记录查询</span>
    </div>
    <div class="srqCon content">
      <div class="srqCon_search">
        <div>
          <p>发送日期：</p>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="sqTimef"></el-date-picker>
          <i></i>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_t" v-model="sqTimet"></el-date-picker>
        </div>
        <div>
          <p>发送内容：</p>
          <input class="sendContent" type="text" v-model="sendContent"/>
        </div>
        <div>
          <p>发送状态：</p>
          <select class="sendstat" v-model="sendstat">
            <option value="请选择">请选择</option>
            <option value="1">成功</option>
            <option value="2">失败</option>
            <option value="0">未发送</option>
          </select>
        </div>
        <a class="srqSearch" href="javascript:;" @click="searchSendSms">查&nbsp;&nbsp;询</a>
      </div>
      <table>
        <thead>
        <tr>
          <th width="25">
            <img class="thiNoClick" src="http://static.crecgec.com/mmp/srq_031.png">
          </th>
          <th width="50">序号</th>
          <th width="100">批次ID</th>
          <th width="100">号码数量</th>
          <th>发送内容</th>
          <th width="100">短信发送状态</th>
          <th width="50">号码</th>
          <th width="100">发送日期</th>
          <th width="50">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataList">
          <td>
            <img class="triNoClick" src="http://static.crecgec.com/mmp/srq_041.png">
          </td>
          <td>{{(page-1)*10 + index + 1}}</td>
          <td>{{item.taskid}}</td>
          <td>{{item.telnum | getTelSize}}</td>
          <td :title="item.content">{{item.content}}</td>
          <td>{{item.telnumstat | formatTelnumstat}}</td>
          <td><a href="javascript:;" @click="showTelTip(item.telnum)">查看</a></td>
          <td>{{item.addtime | formatDate}}</td>
          <td><a href="javascript:;" @click="goSmsSendDetails(item.taskid)">详情</a></td>
        </tr>
        </tbody>
      </table>
      <div v-show="dataList.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchSendSms('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchSendSms('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchSendSms('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchSendSms('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchSendSms('goPage')">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <transition name="tip">
      <tel-tip v-show="isShow" :telCon="telCon" @isShow="changeShow"></tel-tip>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {formatDate} from 'common/js/date'
  import telTip from 'components/tip/telTip'

  export default {
    data () {
      return {
        dataList: [],
        count: 0,
        isShow: false,
        telCon: '',
        page: 1, // 当前页数
        isButton: false,
        totalPages: 0, // 总页数
        goPageVal: '',
        sqTimef: '',
        sqTimet: '',
        sendstat: '请选择',
        sendContent: ''
      }
    },
    mounted () {
      this.searchSendSms()
    },
    methods: {
      goSmsSendDetails (id) {
        this.$router.push('/smsSendDetails/shortMessage/smsSendDetails?taskid=' + id)
        this.$store.commit('changeUrlFirst', 'shortMessage')
        this.$store.commit('changeUrlSecond', 'smsSendDetails')
      },
      searchSendSms (goPage) {
        let sqTimef = this.sqTimef ? formatDate(this.sqTimef, 'yyyy-MM-dd') : ''
        let sqTimet = this.sqTimet ? formatDate(this.sqTimet, 'yyyy-MM-dd') : ''
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
          'sq_time_f': sqTimef,
          'sq_time_t': sqTimet,
          'content': this.sendContent,
          'sendstat': this.sendstat,
          'size': SIZE,
          'page': newPage
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Sms/Index/recordinterface',
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
      showTelTip (telNum) {
        this.isShow = true
        this.telCon = telNum
      },
      changeShow () {
        this.isShow = false
      }
    },
    filters: {
      getTelSize (tel) {
        return tel ? tel.split(',').length : ''
      },
      // 日期格式化
      formatDate (time) {
        if (time) {
          let newTime = Number(time + '000')
          let date = new Date(newTime)
          return formatDate(date, 'yyyy-MM-dd')
        } else {
          return ''
        }
      },
      // 发送状态格式化
      formatTelnumstat (telnumstat) {
        if (telnumstat === '1') {
          return '成功'
        } else if (telnumstat === '2') {
          return '失败'
        } else {
          return '未发送'
        }
      }
    },
    components: {
      'tel-tip': telTip
    }
  }
</script>

<style scoped>
  .srqCon_search{
    overflow: hidden;
  }
  .srqCon_search > div{
    width: auto;
    height: 36px;
    line-height: 36px;
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
  .srqCon_search input[name]{
    text-align: center;
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
  .srqCon_search div i{
    width: 10px;
    height: 1px;
    background-color: #bbbbbb;
    margin-left: 10px;
    margin-top: 16px;
    margin-right: 10px;
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
  .trClick{
    background-color: #eaf3f8;
  }
  /*公共类 end*/
  .tip-enter-active,.tip-leave-active{
    transition: all 1s
  }
  .tip-enter{
    transform: translate3d(-100%, -100%, 0)
  }
  .tip-leave-to{
    transform: translate3d(100%, 100%, 0)
  }
</style>
