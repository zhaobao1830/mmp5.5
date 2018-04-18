<template>
  <div class="samContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>服务管理</span>
      <i></i>
      <span>服务审核管理</span>
    </div>
    <div class="samCon content">
      <div class="samCon_search" ref="samCon_search">
        <div>
          <p>申请时间：</p>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" ref="sq_time_f" v-model="sq_fromt"></el-date-picker>
          <i></i>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="sq_endt"></el-date-picker>
        </div>
        <div>
          <p>付费时间：</p>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="pay_fromt"></el-date-picker>
          <i></i>
          <el-date-picker type="date" placeholder="选择日期" style="width: 100px" class="sq_time_f" v-model="pay_endt"></el-date-picker>
        </div>
        <div>
          <p>是否付费：</p>
          <select class="se_fufei_ch" v-model="se_fufei_ch">
            <option value="">全部</option>
            <option value="已付费">
              已支付
            </option>
            <option value="未支付">
              未支付
            </option>
          </select>
        </div>
        <div>
          <p>是否审批：</p>
          <select class="se_sp_ch" v-model="spSelected">
            <option value="">全部</option>
            <option  value="审批通过">
              审批通过
            </option>
            <option value="未审批">
              未审批
            </option>
            <option value="驳回">
              驳回
            </option>
          </select>
        </div>
        <div>
          <p>客户名称：</p>
          <input type="text" class="kehu_name" name="kehu_name" v-model="kehu_name">
        </div>
        <div>
          <p>服务名称：</p>
          <select class="fw_opchoice" @change="tc_nameget" v-model="choiceSelected">
            <option value="">全部</option>
            <option v-for="(value, key, index) in fw_opchoice_list" :value="key">{{value.servicename}}--{{value.parentname}}</option>
          </select>
        </div>
        <div>
          <p>套餐名称：</p>
          <div class="tc_chioce">
            <div v-for="(value, key, index) in tc_chioce_list">
              <span :data-val="key" :class="{'tcClick':tc_chioce_click.indexOf(key) > -1}" @click="changeTc(key)">{{value}}</span>
            </div>
          </div>
        </div>
        <a class="samSearch" href="javascript:;" @click="searchServiceAudit">查&nbsp;&nbsp;询</a>
      </div>
      <div class="samOperation">
        <a href="javascript:;" class="sh_setxianxia" @click="setCash">确定</a>
        <input type="text" class="sh_text" v-model="cashVal">
        <p>设置金额：</p>
        <a href="javascript:;" class="sh_return" @click="adoptOrReject('驳回')">驳回</a>
        <a href="javascript:;" class="sh_pass" @click="adoptOrReject('审批通过')">通过</a>
      </div>
      <table class="sam_table se_rv_r_r">
        <thead>
        <tr class="tr_t">
          <th width="25" @click="changeThClik">
            <img  :class="thIsClick ? 'thiClick' : 'thiNoClick'" :src="thIsClick ? `http://static.crecgec.com/mmp/sau_032.png`: `http://static.crecgec.com/mmp/sau_031.png`">
          </th>
          <th width="5%">序号</th>
          <th width="9%">申请时间</th>
          <th width="16%">客户名称</th>
          <th width="17%">企业名称</th>
          <th width="16%">服务名称</th>
          <th width="16%">套餐名称</th>
          <th width="10%">订购数量</th>
          <th width="13%">订购时间(月)</th>
          <th width="7%">渠道</th>
          <th width="10%">是否付费</th>
          <th width="10%">支付方式</th>
          <th width="10%">支付金额</th>
          <th width="10%">应付金额</th>
          <th width="10%">付费时间</th>
          <th width="10%">审批结果</th>
        </tr>
        </thead>
        <tbody ref="tbody">
        <tr v-for="(value, key, index) in tbody_list" :class="trClick_list.indexOf(key) === -1 ? 'triNoClick' : 'triClick'">
          <td @click="changeTrClik(key)">
            <img :data-img="key" :src="trClick_list.indexOf(key) === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
          </td>
          <td>{{(page-1)*10 + index + 1}}</td>
          <td>{{value.createtime ? value.createtime.split(" ")[0] : ''}}</td>
          <td :title="value.gsuser">{{value.gsuser}}</td>
          <td :title="value.company">{{value.company}}</td>
          <td :title="value.servicename">{{value.servicename}}</td>
          <td :title="value.servicetypename">{{value.servicetypename}}</td>
          <td>{{value.ordercount}}</td>
          <td>{{value.ordertime}}</td>
          <td :title="value.sourcefrom">{{value.sourcefrom}}</td>
          <td :title="value.paystatus">{{value.paystatus}}</td>
          <td :title="value.paystyle">{{value.paystyle}}</td>
          <td>{{value.actualpayments}}</td>
          <td>{{value.amountpayable}}</td>
          <td>{{value.payovertime ? value.payovertime.split(" ")[0] : ''}}</td>
          <td :title="value.approvalstatus">{{value.approvalstatus}}</td>
        </tr>
        </tbody>
      </table>
      <div v-show="tbody_list.length === 0" class="noTbodyList">没有数据</div>
      <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="searchServiceAudit('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="searchServiceAudit('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="searchServiceAudit('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="searchServiceAudit('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="searchServiceAudit('goPage')">跳转</a>
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
  import {deleteArray} from 'common/js/dom'

  export default {
    data () {
      return {
        choiceSelected: '', // 服务名选择的id
        spSelected: '', // 审批
        isTcClick: false,
        isButton: false,
        page: 1, // 当前页数
        totalPages: 0, // 总页数
        goPageVal: '',
        fw_opchoice_list: [], // 服务名称列表
        tc_chioce_list: [], // 套餐名称列表
        tc_chioce_click: [], // 套餐名称点击的key列表
        tbody_list: '', // 后台返回的List数据
        tbody_list_length: 0,
        trClick_list: [], // tr点击以后保存id的列表
        key_list: [], // 返回的数据的key值
        thIsClick: false, // th是否点击
        cashVal: '', // 现金
        sq_fromt: '',
        sq_endt: '',
        pay_fromt: '',
        pay_endt: '',
        se_fufei_ch: '',
        kehu_name: ''
      }
    },
    mounted () {
      this.search_fw_opchoice()
    },
    computed: {
      // 判断数组里面是否包含key
      tc_chioce_indexOf (key) {
        if (this.tc_chioce_click.indexOf(key) > -1) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 查询serviceAudit
      searchServiceAudit (goPage) {
        let _this = this
        let sql_data = ''
        // 申请时间
        if (this.sq_fromt) {
          sql_data = `createtime >'` + formatDate(this.sq_fromt, 'yyyy-MM-dd') + `'`
        } else {
          sql_data = '1=1'
        }
        if (this.sq_endt) {
          sql_data = sql_data + ' and' + ` createtime <'` + formatDate(this.sq_endt, 'yyyy-MM-dd') + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 付费时间
        if (this.pay_fromt) {
          sql_data = sql_data + ' and' + ` payovertime >'` + formatDate(this.pay_fromt, 'yyyy-MM-dd') + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }

        if (this.pay_endt) {
          sql_data = sql_data + ' and' + ` payovertime <'` + formatDate(this.pay_endt, 'yyyy-MM-dd') + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 是否付费
        if (this.se_fufei_ch !== '') {
          sql_data = sql_data + ' and' + ` paystatus ='` + this.se_fufei_ch + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 是否审批
        if (this.spSelected !== '') {
          sql_data = sql_data + ' and' + ` approvalstatus ='` + this.spSelected + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 客户名称 (这个有问题)
        if (this.kehu_name !== '') {
          sql_data = sql_data + ' and' + ` company like '%` + this.kehu_name + `%'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 服务名
        if (this.choiceSelected !== '') {
          sql_data = sql_data + ' and' + ` serviceid ='` + this.choiceSelected + `'`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
        // 套餐名称
        let se_name_l = ''
        for (let i = 0; i < document.querySelectorAll('.tcClick').length; i++) {
          se_name_l = se_name_l + ',' + document.querySelectorAll('.tcClick').eq(i).attr('data-val')
        }
        if (se_name_l.substring(1) !== '') {
          sql_data = sql_data + ' and' + ` servicetypeid in (` + se_name_l.substring(1) + `)`
        } else {
          sql_data = sql_data + ' and' + ' 1=1'
        }
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
          'interface': 'selectSub',
          'sql': sql_data,
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
              _this.trClick_list.length = 0
              _this.key_list.length = 0
              _this.tbody_list_length = 0
              _this.tbody_list = response.data.detail
              if (Number(response.data.count) > 10) {
                _this.isButton = true
              } else {
                _this.isButton = false
              }
              _this.page = newPage
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
      // 获取服务名
      search_fw_opchoice () {
        let id = this.choiceSelected
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
          method: 'post',
          data: 'interface=selectservice'
        })
          .then(function (response) {
            if (response.data.result === 'TRUE') {
              _this.fw_opchoice_list = response.data.detail
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 获取套餐名称
      tc_nameget () {
        let id = this.choiceSelected
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
          method: 'post',
          data: {
            'interface': 'selectservicetype',
            'id': id
          },
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
              _this.tc_chioce_list = response.data.detail
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 点击改变套餐名称样式
      changeTc (key) {
        if (this.tc_chioce_click.indexOf(key) > -1) {
          this.tc_chioce_click = deleteArray(this.tc_chioce_click, key)
        } else {
          this.tc_chioce_click.push(key)
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
      // 审核通过
      adoptOrReject (str) {
        let flag = true
        if (str === '驳回') {
          if (confirm('是否确定驳回申请')) {
            flag = true
          } else {
            flag = false
          }
        }
        if (flag) {
          let id = this.trClick_list.join(',')
          let approvalstatus = str
          let _this = this
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
            method: 'POST',
            data: {
              'interface': 'approval',
              'subid': id,
              'approvalstatus': approvalstatus
            },
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
              let detailVal = ''
              for (let i = 0; i < response.data.length; i++) {
                detailVal = response.data[i].result
                if (detailVal === 'FALSE') {
                  _this.tbody_list[response.data[i].id].approvalstatus = (str === '审批通过' ? '审批通过' : '驳回')
                }
              }
              str === '审批通过' ? _this.$message('审批通过') : _this.$message('驳回通过')
              _this.trClick_list = []
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      // 设置金额
      setCash () {
        let id = this.trClick_list.join(',')
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Service/Interface',
          method: 'post',
          data: {
            'interface': 'setxianxia',
            'subid': id,
            'setxianxia': this.cashVal
          },
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
          .then(function () {
            for (let i = 0; i < _this.trClick_list.length; i++) {
              _this.tbody_list[_this.trClick_list[i]].actualpayments = _this.cashVal
            }
            _this.$message('设置金额成功！')
            _this.cashVal = ''
            _this.trClick_list = []
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .samCon_search,.samOperation{
    overflow: hidden;
  }
  .samCon_search{
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
  }
  .samOperation{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .samCon_search > div{
    width: auto;
    min-width: 300px;
    height: 34px;
    line-height: 34px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .samCon_search p{
    font-size: 14px;
    color: #464646;
  }
  .samCon_search p,.samCon_search input[type=text],.samCon_search select,.samCon_search i,.samCon_search a,.samCon_search span{
    display: block;
    float: left;
  }
  .samCon_search input[type=text]{
    width: 230px;
    height: 32px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .samCon_search select{
    width: 230px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .samCon_search input:hover,.samCon_search input:focus,.samCon_search select:hover,.samCon_search select:focus{
    border-color: #4ea0ea;
  }
  .samCon_search i{
    width: 10px;
    height: 1px;
    background-color: #bbbbbb;
    margin-left: 10px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .tc_chioce{
    height: 34px;
    line-height: 34px;
    float: left;
    color: #777777
  }
  .tc_chioce > div{
    float: left;
  }
  .tc_chioce > div > span{
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    margin-right: 20px;
  }
  .tc_chioce > div > label > input,.check_ch{
    display: none;
  }
  .smallInput{
    width: 98px !important;
    text-align: center;
  }
  .samSearch{
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
  .samSearch:hover{
    background-color: #4986c6;
  }
  /*操作div start*/
  .samOperation input,.samOperation p,.samOperation a{
    display: block;
    float: right;
    font-size: 14px;
    line-height: 30px;
  }
  .sh_setxianxia{
    padding: 0 10px;
    height: 30px;
    color: #ffffff;
    background-color: #4ea0ea;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    margin-right: 10px;
  }
  .sh_setxianxia:hover{
    background-color: #4986c6;
  }
  .samOperation input{
    width: 98px;
    height: 28px;
    line-height: 30px;
    border: 1px solid #bbbbbb;
  }
  .sh_text{
    text-align: center;
  }
  .sh_return,.sh_pass{
    width: 66px;
    height: 28px;
    border-radius: 4px;
    text-align: center;
    margin-right: 20px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }

  .sh_return:hover,.sh_pass:hover{
    border: 1px solid #4ea0ea;
    color: #4ea0ea;
  }
  /*操作div end*/
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
  /*套餐 点击/取消 start*/
  .tcClick{
    color: #4ea0ea;
  }
  /*套餐 点击/取消 end*/
  /*公共类 end*/
</style>
