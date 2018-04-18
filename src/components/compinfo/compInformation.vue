<template>
    <div class="compInformation">
        <div class="conTitle">
            <img src="http://static.crecgec.com/mmp/common_01.png">
            <p>当前位置：</p>
            <span>信息查询系统</span>
            <i></i>
            <span>企业信息查询</span>
        </div>
        <!-- 查询企业信息 -->
        <div class="se_rv_r_m short_msg_s_r compInfo compInfoCont" v-cloak>
            <div class="se_rv_r_m_l searchPoint">
            <form action="" method="GET" @submit.prevent="formSubmit">
              <ul class="searchFormUl">
                <li class="se_fufei">
                  <span>查询条件：</span>
                  <em>
                    <input type="text" name="keyword" class="keyword" v-model='keyword' placeholder="请填写企业账号,联系电话或邮箱"/>
                  </em>
                </li>
                <li>
                    <input type="button" class="search" value="查询" @click='seach'/>
                </li>
              </ul>
            </form>
            <div class="searchReturn" v-show="showTabList">
            <img :src="srcStr">
                <!-- 切换 -->
                <ul class="searchTab">
                    <li v-for="(val, key) in tabList" :class="{select:tabChioce === key}" onselectstart="return false" style="-moz-user-select:none;">
                        <div @click='changeTab(key)'>{{val.name}}</div>
                    </li>
                </ul>

                <div class="searchCont" v-for="(val, key) in tabList" :class="{select:tabChioce === key}" >
                    <div class="title">{{val.name}}</div>
                    <div>
                      <table border="0" cellspacing="0" cellpadding="0" class="se_rv_r_r short_msg_r_r table1" style="margin-top: 0px;" v-show='!val.isTitle'>
                        <thead>
                          <tr>
                            <th class="line1">名称</th>
                            <th class="line3">内容</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for='(compInfoVal, compInfoKey) in compInfo1[key]'>
                            <td>
                              {{compInfoVal}}
                            </td>
                            <td>
                              {{searchList[compInfoKey]}}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table2" style="margin-top:0;" id="tab" border="0" cellspacing="0" cellpadding="0" v-show='val.isTitle'>
                        <thead>
                          <tr>
                            <th v-for='compListTitle in compInfo1[key]'>
                                {{compListTitle}}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for='(compInfoVal, compInfoKey) in searchList[key]'>
                            <td>
                                {{compInfoVal.quatypename || ''}}
                            </td>
                            <td>
                                {{compInfoVal.fileid || ''}}
                            </td>
                            <td>
                                <a href="javascript:;" @click='downfile(compInfoVal.fileid, compInfoVal.filename)'>
                                {{compInfoVal.filename || ''}}
                                </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="footer">
            <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
require('es6-promise').polyfill()
import {compInfo1} from '@/common/js/getAppInfo'
export default {
  name: 'compInfo',
  data: function () {
    return {
      compInfo1,
      srcStr: '111',
      tabList: {
        compCount: {
          name: '企业账号信息',
          isTitle: false
        },
        compMsg: {
          name: '企业信息',
          isTitle: false
        },
        quafiles: {
          name: '资质信息',
          isTitle: true
        },
        vmsorts: {
          name: '主营类别',
          isTitle: true
        },
        srvorders: {
          name: '服务订单',
          isTitle: true
        },
        appinfobills: {
          name: '审核记录',
          isTitle: true
        }
      },
      keyword: '',
      searchList: {},
      tabChioce: 'compCount',
      showTabList: false
    }
  },
  methods: {
    seach () {
      messageSub(this)
    },
    changeTab (key) {
      this.tabChioce = key
    },
    formSubmit () {
      messageSub(this)
    },
    downfile (fileid, filename) {
      // var This = this
      // url = url || '/api/chatbotdesigner.php'
      // data = data || {} interface:GetAppinfo&keyword:
      // var keyword = $(".keyword").val();
      let data = {
        interface: 'GetAppQuasFile',
        keyword: fileid,
        filename
      }
      /*
      axios({
        url: this.$store.state.baseUrl + '/index.php?s=Queryinfosystem/Interface/Index',
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
        console.log(response)
        if (!response.data) {
          return false
        }
        const content = response.data
        This.srcStr = response.data
        // console.log(content.toString(2))
        const elink = document.createElement('a') // 创建a标签
        elink.download = filename // 文件名
        elink.style.display = 'none'
        const blob = new Blob([content], {type: 'image/png'})
        elink.href = URL.createObjectURL(blob)
        // elink.href = content
        document.body.appendChild(elink)
        elink.click() // 触发点击a标签事件
        document.body.removeChild(elink)
        if (response.data !== null) {
        }
      })
      .catch(function (err) {
        console.log(err)
      })
      */
      /* 下载文件
       * options:{
       * url:'',  //下载地址
       * data:{name:value}, //要发送的数据
       * method:'post'
       * }
       */
      var DownLoadFile = function (options) {
        var config = $.extend(true, { method: 'post' }, options)
        var $iframe = $('<iframe id="down-file-iframe" />')
        var $form = $('<form target="down-file-iframe" method="' + config.method + '" />')
        $form.attr('action', config.url)
        for (var key in config.data) {
          $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />')
        }
        $iframe.append($form)
        $(document.body).append($iframe)
        $form[0].submit()
        $iframe.remove()
      }
      DownLoadFile({
        url: this.$store.state.baseUrl + '/index.php?s=Queryinfosystem/Interface/Index', // 请求的 url
        data // 要发送的数据
      })
    }
  },
  watch: {
    searchList () {
      this.showTabList = true
    }
  }
}
function messageSub (obj) {
  // url = url || '/api/chatbotdesigner.php'
  // data = data || {} interface:GetAppinfo&keyword:
  // var keyword = $(".keyword").val();
  let data = {
    interface: 'GetAppinfo',
    keyword: obj.keyword
  }
  obj.showTabList = false
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
    console.log(response.data)
    if (response.data !== null) {
      var listJ = response.data
      obj.searchList = listJ
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.compInformation{
  position: relative;
  padding-bottom: 80px;
  min-height: 100%;
}
.compInfo{
    padding:0px;
    overflow:auto;
}
.compInfo .se_fufei input{
  padding-left:10px;
  width:250px;
  height:20px;
  line-height:20px;
}
.companySearch .compInfo .se_rv_r_m_l{
    /*
    */
    width:760px;
}
.compInfoCont{
  margin-right: 10px;
  min-height: 400px;
  background-color: white;
  border: 1px solid #4ea0ea;
  overflow: auto;
}
.searchFormUl{
  padding-top: 20px;
  padding-left: 20px;
  overflow: hidden;
}
.searchFormUl > li {
  float: left;
}
.searchPoint .se_fufei span, .searchPoint .se_fufei em, .searchPoint .se_fufei input,.searchFormUl .search{
  height: 32px;
  line-height: 32px;
  display: inline-block;
  outline: none;
}
.searchFormUl .search{
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
.searchPoint .searchTab{
  padding-top: 20px;
  padding-left: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.searchPoint .se_fufei input{
  width: 228px;
  height: 28px;
  line-height: 28px;
  border:1px #ccc solid;
}
.companySearch .compInfo .se_fufei_l{
    margin-right:20px;
}
.companySearch .compInfo .se_rv_r_r.short_msg_r_r{
    width:760px;
}
.searchReturn .searchTab{
    overflow:hidden;
    padding-bottom:10px;
}
.searchReturn .searchCont{
    display:none;
}
.searchReturn .searchCont.select{
    display:block;
}
.searchReturn .searchTab li div{
    height:20px;
    line-height:20px;
    padding:5px 10px;
    margin-right:15px;
    border:1px #bbb solid;
    border-radius: 3px;
    color:#777;
    background-color:#eee;
    cursor:pointer;
    float:left;
    box-sizing:content-box;
}
.searchReturn .searchCont .title{
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
.searchReturn .searchCont .table1, .searchReturn .searchCont .table2{
  width: 100%;
}
.searchReturn .searchCont .table1 th, .searchReturn .searchCont .table2 th{
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: white;
  background-color: #4ea0ea;
  border: 1px #ddd solid;
  border-top: none;
  border-bottom: 1px #ddd dashed;
}
.searchReturn .searchCont .table1 td, .searchReturn .searchCont .table2 td{
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
.searchReturn .searchTab li.select div{
    color:white;
    border-color: #4ea0ea;
    background-color:#4ea0ea;
}
#tab td{
    min-width:30px;
}
.tab1 th {
      height: 36px;
      font-size: 14px;
      font-weight: bold;
      background-color: #b2e9d4;
  }
[v-cloak]{
    display:none;
}
</style>
