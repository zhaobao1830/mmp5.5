<template>
  <div class="payNumber se_rv_r_m short_msg_s_r">
      <div class="se_rv_r_m_l">
      <form action="" method="GET">
        <ul class="searchList">
          <li class="se_fufei">
            <span>收费金额：</span>
            <em>
              <input type="text" name="payMoney" class="payMoney" v-model='payMoney'/>
            </em>
          </li>
          <li class="se_fufei">
            <span>主营类别：</span>
            <em>
              <input type="text" name="category" class="category" v-model='category'/>
            </em>
          </li>
          <li>
              <input type="button" class="search" @click='search' value="查询"/>
          </li>
        </ul>
      </form>
      <table class="payList">
          <thead>
              <tr>
                  <th>
                      主营类别编号
                  </th>
                  <th>
                      主营类别名称
                  </th>
                  <th>
                      标的类型
                  </th>
                  <th>
                      收费档次
                  </th>
                  <th>
                      收费金额
                  </th>
              </tr>
          </thead>
          <tbody>
            <tr v-for='(value, key) in tabellist'>
              <td>{{value.vmsortcode || ''}}</td>
              <td>{{value.vmsortname || ''}}</td>
              <td>{{value.subtypename || ''}}</td>
              <td>{{value.costname || ''}}</td>
              <td>{{value.money || ''}}</td>
            </tr>
          </tbody>
      </table>
      <!-- 分页 TOP -->
      <!--<pagelst :total="total" :page-size='rows' :current='page' size="small" v-show='pageShow' @on-change='pagechange' show-elevator show-sizer></pagelst>-->
      <!-- 分页 BTM -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
require('es6-promise').polyfill()
// import {compInfo1} from '@/static/js/getAppInfo'

//import pagelst from 'iview/src/components/page'
//import iView from 'iview'
//import 'iview/dist/styles/iview.css' // 导入样式
/*
//当前页数
var smartpage = 1;
//一页内展示数据量
var pageSize = 10;
//总数据数
var totalrecords = 1000;
*/

export default {
  name: 'compInfo',
  data: function () {
    return {
      page: 1,
      rows: 10,
      total: 0,
      pageShow: false,
      payMoney: '',
      category: '',
      tabellist: []
    }
  },
  methods: {
    search () {
      counteList(this)
    },
    'pagechange': function(pageNum){
      this.page = pageNum
    }
  },
  watch: {
    page () {
      counteList(this)
    }
  }
}
function counteList (obj) {
  // url = url || '/api/chatbotdesigner.php'
  // data = data || {} interface:GetAppinfo&keyword:
  // var keyword = $(".keyword").val();
  let data = {
    interface: 'ChargeGrade',
    page: obj.page,
    rows: obj.rows,
    price: obj.payMoney,
    vmsort: obj.category,
    tabellist: []
  }

  axios({
    url: obj.$store.state.baseUrl + 'index.php?s=Queryinfosystem/Interface/Index',
    method: 'POST',
    data,
    // params: 'type=selectR',
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
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
    if (response.data !== 'null') {
      obj.pageShow = true
      var listJ = response.data
      obj.tabellist = listJ.rows
      obj.total = listJ.total
    } else {
      obj.pageShow = false
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.payList{
    width:770px;
}
.payNumber{
  min-width: 950px;
}
.payNumber table {
  width: 100%;
}
.payNumber {
  background-color: white;
}
.payNumber .searchList{
  padding: 20px 0px;
  overflow: hidden;
}
.payNumber .searchList li{
  float: left;
}
.payNumber .searchList li span, .payNumber .searchList li input{
  height: 32px;
  line-height: 30px;
  display: inline-block;
}
.payNumber .searchList li span{
  margin-left: 20px;
}
.payNumber .searchList .search{
  height: 32px;
  line-height: 30px;
  margin-left: 40px;
  width: 80px;
  border-radius: 3px;
  background-color: #4ea0ea;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
}
.payList th {
  height: 36px;
  font-size: 14px;
  color: white;
  font-weight: bold;
  background-color: #4ea0ea;
}
.payList td{
  height: 45px;
  line-height: 45px;
  font-size: 12px;
  color: #464646;
  text-align: center;
  border-top: none;
  border-collapse:collapse;
  border: 1px #ddd solid;
  border-bottom: 1px #ddd dashed;
}
.payList, th, td {
  border: 1px solid #C0C0C0;
  border-collapse: collapse;
}
#gray{
  width:755px;
}
#gray .pager div.short{
  width:85px;
}
#gray .pager div.short input{
  width:32px;
}
[v-cloak]{
  display:none;
}
</style>
