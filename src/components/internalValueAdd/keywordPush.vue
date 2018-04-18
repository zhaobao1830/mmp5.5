<template>
  <div class="keywordPushContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>内部增值服务</span>
      <i></i>
      <span>关键字推送</span>
    </div>
    <div class="keywordPushCon content">
       <div class="keywordPushCon_operation">
         <div class="addKeyWords">
           <div>
             <p>添加关键词：</p>
             <input type="text" v-model="addKeyWords" placeholder="请输入关键词">
           </div>
           <div>
             <p>手机号：</p>
             <input type="text" v-model="addTelnum" placeholder="请输入手机号">
           </div>
           <a class="keyWordsSearch" href="javascript:;" @click="addKeyOwrdsAndTelnum">添&nbsp;&nbsp;加</a>
         </div>
         <div class="searchKeyWords">
           <div>
             <p>关键词：</p>
             <input type="text" v-model="searchKeyWords" placeholder="请输入关键词"/>
           </div>
           <div>
             <p>手机号：</p>
             <input type="text" v-model="searchTelnum" placeholder="请输入手机号">
           </div>
           <a class="keyWordsSearch" href="javascript:;" @click="getResultsByKeywordsOrTel()">查&nbsp;&nbsp;询</a>
         </div>
       </div>
       <div class="keywordPushCon_result">
         <p class="keywordPushCon_result_title">关键词</p>
         <ul class="keywordPushCon_result_ul">
           <li ref="resultUlLi" :style="{width: liWidth + 'px'}" v-for="(kwts,index) in keyWordsTels">
             <div class="resultFirst">
               <p>{{kwts.keywords}}</p>
               <a href="javascript:;" title="删除关键词" @click="deleteKeyWords(kwts.id, 'false')"></a>
             </div>
             <ul class="resultSecond">
               <li v-for="(tels, index) in kwts.telnum.split(',')" v-if="index < 5">
                 {{tels}}
               </li>
             </ul>
             <div class="editorsAll">
               <a class="allEditors" href="javascript:;" @click="showEditorsAll(kwts.id, kwts.keywords, kwts.telnum)">编辑全部</a>
             </div>
           </li>
         </ul>
       </div>
       <div v-show="keyWordsTels.length === 0" class="noTbodyList">没有数据</div>
       <div class="table_button" v-show="isButton">
        <div class="tableButton">
          <a href="javascript:;" class="goFirst" @click="keyWordsTelIsAll ? getKeywordPush('first') : getResultsByKeywordsOrTel('first')">首页</a>
          <a href="javascript:;" class="prePage" @click="keyWordsTelIsAll ? getKeywordPush('pre') : getResultsByKeywordsOrTel('pre')">上一页</a>
          <p class="currentPage">{{page}} / {{totalPages}}</p>
          <a href="javascript:;" class="nextPage" @click="keyWordsTelIsAll ? getKeywordPush('next') : getResultsByKeywordsOrTel('next')">下一页</a>
          <a href="javascript:;" class="goLast" @click="keyWordsTelIsAll ? getKeywordPush('end') : getResultsByKeywordsOrTel('end')">尾页</a>
          <input type="text" value="" class="pages" v-model="goPageVal">
          <a href="javascript:;" class="goPage" @click="keyWordsTelIsAll ? getKeywordPush('goPage') : getResultsByKeywordsOrTel('goPage')">跳转</a>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <editors-key-words-or-tel v-show="ekwotShow" :ekwotId="ekwotId" :ekwotKeyWords = "ekwotKeyWords" :ekwotTelnums = "ekwotTelnums" @closeEditors="closeEditors" @noTelnum="noTelnum"></editors-key-words-or-tel>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import editorsKeyWordsOrTel from 'components/tip/editorsKeyWordsOrTel'
  import ElAlert from '../../../node_modules/element-ui/packages/alert/src/main'

  export default {
    data () {
      return {
        isButton: false,
        page: 1, // 当前页数
        totalPages: 0, // 总页数
        goPageVal: '',
        addKeyWords: '', // 添加关键词
        addTelnum: '', // 添加手机号
        searchKeyWords: '', // 查询关键词
        searchTelnum: '', // 查询手机号
        keyWordsAndtels: {},
        keyWordsTels: [], // 后台返回的列表
        ekwotShow: false, // 编辑弹出框是否显示
        ekwotId: '', // 弹出框里关键词ID
        ekwotKeyWords: '', // 弹出框里关键词名称
        ekwotTelnums: '', // 弹出框里手机号列表
        keyWordsTelIsAll: true, // 是否是查询的所有的关键词和手机号
        liWidth: 196
      }
    },
    created () {
      this.getKeywordPush()
      this.calculationLiW()
    },
    mounted () {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          this.calculationLiW()
        }, 300)
      })
    },
    methods: {
      // 查询关键词手机号列表
      getKeywordPush (goPage) {
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
        const SIZE = 10 // 每次请求的页数
        let data = {
          'size': SIZE,
          'page': newPage
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index/getKeyList',
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
            _this.page = newPage
            _this.totalPages = Math.ceil(Number(response.data.count) / SIZE)
            _this.keyWordsTels = response.data.list
            if (Number(response.data.count) > Number(SIZE)) {
              _this.isButton = true
              _this.keyWordsTelIsAll = true
            } else {
              _this.isButton = false
            }
          })
      },
      // 通过关键词或手机号查询列表
      getResultsByKeywordsOrTel (goPage) {
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
        const SIZE = 10 // 每次请求的页数
        let data = {
          'keyword': this.searchKeyWords,
          'telnum': this.searchTelnum,
          'page': newPage,
          'size': SIZE
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index/SearchByKeyOrTel',
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
            _this.page = newPage
            _this.totalPages = Math.ceil(Number(response.data.count) / SIZE)
            _this.keyWordsTels = response.data.list
            if (Number(response.data.count) > Number(SIZE)) {
              _this.isButton = true
              _this.keyWordsTelIsAll = false
            } else {
              _this.isButton = false
            }
          })
      },
      // 显示编辑框
      showEditorsAll (ekwotId, ekwotKeyWords, ekwotTelnums) {
        this.ekwotId = ekwotId
        this.ekwotKeyWords = ekwotKeyWords
        this.ekwotTelnums = ekwotTelnums
        this.ekwotShow = true
      },
      // 关闭编辑框
      closeEditors (data) {
        if (data === true) {
          this.ekwotShow = false
          this.getKeywordPush()
        }
      },
      // 添加关键词和手机号
      addKeyOwrdsAndTelnum () {
        if (!this.addKeyWords) {
          this.$message('请输入关键词！')
          return false
        }
        if (this.addTelnum) {
          let re = new RegExp('^1[3|4|5|7|8|][0-9]{9}')
          if (!re.test(this.addTelnum)) {
            this.$message('手机号格式不正确！')
            return false
          }
        } else {
          this.$message('请输入手机号！')
          return false
        }
        let data = {
          'interface': 'addKeyword',
          'keyword': this.addKeyWords,
          'telnum': this.addTelnum
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index',
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
              _this.$message('添加关键词成功！')
              _this.getKeywordPush()
              _this.addKeyWords = ''
              _this.addTelnum = ''
            } else {
              _this.$message(response.data.detail)
            }
          })
      },
      // 删除关键字
      deleteKeyWords (id, noTelnum) {
        if (noTelnum === 'false') {
          if (!confirm('确定删除关键字吗？')) {
            return false
          }
        }
        let data = {
          'interface': 'delKey',
          'id': id
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index',
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
            _this.$message('删除关键字成功！')
            _this.getKeywordPush()
          })
      },
      // 当与关键词匹配的手机号数量为0时，删除这个关键词
      noTelnum (id) {
        this.deleteKeyWords(id, 'true')
        this.ekwotShow = false
      },
      // 计算li的新宽度
      calculationLiW () {
        let clientWidth = document.documentElement.clientWidth
        let ulW = clientWidth - 266
        let liW = (ulW - 120) / 5
        if (liW < 196) {
          this.liWidth = 196
        } else {
          this.liWidth = liW
        }
      }
    },
    components: {
      ElAlert,
      editorsKeyWordsOrTel
    }
  }
</script>

<style scoped>
  .keywordPushContent{
    width: auto;
    min-width: 1112px;
  }
  .keywordPushCon_operation{
    overflow: hidden;
  }
  .keywordPushCon_operation label,.keywordPushCon_operation label img,.keywordPushCon_operation label p{
    display: block;
    float: left;
    font-size: 14px;
    color: #464646;
    height: 20px;
    line-height: 20px;
  }
  .keywordPushCon_operation label{
    margin: 20px 0 0 20px;
    cursor: pointer;
  }
  .keywordPushCon_operation label p{
    margin-left: 5px;
  }
  .keywordPushCon_operation label p:hover{
    color: #ff0000;
  }
  .addKeyWords{
    float: left;
  }
  .searchKeyWords{
    float: left;
    margin-left: 28px;
  }
  .addKeyWords > div,.searchKeyWords > div{
    width: auto;
    height: 35px;
    line-height: 35px;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
  }
  .addKeyWords > div > p,.searchKeyWords > div > p{
    font-size: 14px;
    color: #464646;
    display: block;
    float: left;
  }
  .keywordPushCon_operation input{
    width: 220px;
    height: 31px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #bbbbbb;
    color: #777777;
  }
  .keywordPushCon_operation input:hover{
    border-color: #4986c6;
  }
  .keywordPushCon_operation select{
    width: 230px;
    height: 33px;
    font-size: 14px;
    color: #777777;
    border: 1px solid #bbbbbb;
  }
  .keyWordsSearch{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    margin-left: 20px;
    margin-top: 20px;
    text-decoration: none;
    display: block;
    float: left;
  }
  .keyWordsSearch{
    background-color: #4ea0ea;
  }
  .keywordPushCon_result{
    overflow: hidden;
    margin-top: 20px;
  }
  .keywordPushCon_result_title{
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #4ea0ea;
    color: #fff;
  }
  .keywordPushCon_result_ul{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .keywordPushCon_result > ul > li{
    /*min-width: 194px;*/
    height: 298px;
    margin-top: 20px;
    margin-left: 20px;
    float: left;
    border: 1px solid #ddd;
  }
  .keywordPushCon_result > ul > li > p{
    font-size: 14px;
    padding-left: 5px;
    padding-top: 5px;
  }
  .resultFirst{
    height: 34px;
    line-height: 34px;
    background-color: #dddddd;
  }
  .resultFirst p{
    color: #222222;
    font-size: 16px;
    margin-left: 10px;
    float: left;
  }
  .resultFirst a{
    display: block;
    width: 13px;
    height: 13px;
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    background-image: url("http://static.crecgec.com/mmp/km1_1.png");
  }
  .resultSecond{
    height: 205px;
  }
  .resultSecond > li{
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  .editorsAll{
    text-align: center;
  }
  .allEditors{
    display: block;
    width: 80px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #4ea0ea;
    color: #fff;
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 13px;
  }
</style>
