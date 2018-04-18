<template>
   <div class="editorsKeyWordsOrTel">
     <div class="ekwotContent">
       <div class="ekwot_title">
          <p>关键词</p>
          <a class="ekwot_close" href="javascript:;" @click="closeEditorsAll">
            <img src="http://static.crecgec.com/mmp/sre_05.png"/>
          </a>
       </div>
       <div class="ekwot_content">
          <div class="ekwot_keywords">
            <p>修改关键词：</p>
            <input class="ekwot_keywords_input" v-model="keywords" placeholder="请输入关键词"/>
            <a class="ekwot_keywords_add" href="javascript:;" @click="ekwot_keywords_telnum_update">保存</a>
          </div>
         <div class="ekwot_telnums">
           <p>添加手机号：</p>
           <input class="ekwot_telnums_input" v-model="ekwot_telnums" placeholder="请输入手机号"/>
           <a class="ekwot_telnums_add" href="javascript:;" @click="ekwot_telnums_add">添加</a>
         </div>
          <div class="ekwot_tel">
            <p>手机号：</p>
            <div class="ekwot_tel_show">
              <ul>
                <li class="ekwot_tel_show_li" v-for="(value, index) in telnum">
                  <a class="ekwot_tel_show_li_a" href="javascript:;" @click="changeAClick(value)">
                    <img :data-img="value" :src="aClick_list.indexOf(value) === -1 ? `http://static.crecgec.com/mmp/sau_041.png` : `http://static.crecgec.com/mmp/sau_042.png`">
                  </a>
                  <input class="ekwot_tel_show_li_input" name="ekwot_tel_show_li_input" type="text" :value=value>
                </li>
              </ul>
            </div>
          </div>
          <div class="ekwot_operation">
            <a class="ekwot_delete" @click="deleteTelnum">删除</a>
            <a class="ekwot_save" @click="ekwot_keywords_telnum_update">保存</a>
          </div>
       </div>
     </div>
   </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import $ from 'jquery'
  import {deleteArray} from 'common/js/dom'

  export default {
    props: ['ekwotId', 'ekwotKeyWords', 'ekwotTelnums'],
    data () {
      return {
        keywords: '', // 关键字
        telnum: '', // 手机号
        ekwot_telnums: '', // 手机号
        a_isClick: false, // a是否点击
        aClick_list: []
      }
    },
    watch: {
      ekwotId () {
        this.getKeyWordsAndTelById(this.ekwotId)
      }
    },
    methods: {
      // 关闭编辑框
      closeEditorsAll () {
        this.$emit('closeEditors', true)
      },
      // 修改关键词
      ekwot_keywords_telnum_update () {
        // 手机号列表
        let telInputVal = ''
        $('.ekwot_tel_show_li_input').each(function () {
          if (telInputVal) {
            telInputVal += ',' + this.value
          } else {
            telInputVal += this.value
          }
        })
        let data = {
          'interface': 'editKeyword',
          'id': this.ekwotId,
          'keyword': this.keywords,
          'newTelnum': telInputVal
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
            if (response.data.result) {
              _this.$message(response.data.detail)
            }
          })
      },
      // 添加手机号
      ekwot_telnums_add () {
        let data = {
          'id': this.ekwotId,
          'newTelNum': this.ekwot_telnums
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index/editTelnum',
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
            _this.$message(response.data.detail)
            _this.ekwot_telnums = ''
            _this.getKeyWordsAndTelById(_this.ekwotId)
          })
      },
      // 删除手机号
      deleteTelnum () {
        if (this.aClick_list.length > 0) {
          let data = {
            'interface': 'delTelNumbers',
            'id': this.ekwotId,
            'telnum': this.aClick_list.join(',')
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
              if (response.data.result) {
                _this.getKeyWordsAndTelById(_this.ekwotId)
                _this.aClick_list = []
              }
              _this.$message(response.data.detail)
            })
        } else {
          this.$message('请至少选择一个手机号！')
        }
      },
      changeAClick (value) {
        if (this.aClick_list.indexOf(value) === -1) {
          this.aClick_list.push(value)
        } else {
          this.aClick_list = deleteArray(this.aClick_list, value)
        }
      },
      // 通过id获取关键词名称和手机号
      getKeyWordsAndTelById (id) {
        let data = {
          'id': id
        }
        let _this = this
        axios({
          url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=VAS/Index/getListById',
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
            _this.keywords = response.data[0].keywords
            _this.telnum = response.data[0].telnum.length > 0 ? response.data[0].telnum.split(',') : []
            if (_this.telnum.length === 0) {
              _this.$emit('noTelnum', id)
            }
          })
      }
    }
  }
</script>

<style>
  .editorsKeyWordsOrTel{
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 100;
  }
  .ekwotContent{
    width: 456px;
    height: 544px;
    position: absolute;
    top:50%;
    margin-top: -272px;
    left: 50%;
    margin-left: -220px;
    background-color: #ffffff;
  }
  .ekwot_title{
    width: 456px;
    height: 34px;
    line-height: 34px;
    background-color: #4596d4;
    color: #ffffff;
  }
  .ekwot_title p{
    margin-left: 10px;
    font-size: 16px;
    float: left;
  }
  .ekwot_close{
    display: block;
    float: right;
    margin-right: 10px;
  }
  .ekwot_content{
    overflow: hidden;
  }
  .ekwot_keywords,.ekwot_telnums{
    margin-left: 20px;
    margin-top: 20px;
    height: 34px;
    line-height: 34px;
  }
  .ekwot_keywords p,.ekwot_telnums p{
    color: #464646;
    font-size: 14px;
    float: left;
  }
  .ekwot_keywords_input,.ekwot_telnums_input{
    float: left;
    width: 208px;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #bbbbbb;
  }
  .ekwot_tel{
    margin-left: 20px;
    margin-top: 20px;
    width: 416px;
    height: 307px;
  }
  .ekwot_tel p{
    color: #464646;
    font-size: 14px;
    float: left;
  }
  .ekwot_tel_show{
    width: 344px;
    height: 305px;
    border: 1px solid #bbbbbb;
    float: left;
    overflow: auto;
  }
  .ekwot_tel_show_li{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #bbbbbb;
  }
  .ekwot_tel_show_li_a{
    display: block;
    width: 54px;
    height: 40px;
    border-right: 1px solid #bbbbbb;
    text-align: center;
    float: left;
  }
  .ekwot_tel_show_li_input{
    width: 278px;
    height: 40px;
    line-height: 40px;
    float: left;
    text-align: center;
    border: none;
    outline: none;
  }
  .ekwot_operation{
    margin-top: 20px;
  }
  .ekwot_delete,.ekwot_save{
    width: 80px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    display: block;
    float: left;
    cursor: pointer;
    border-radius: 2px;
  }
  .ekwot_delete{
    color: #464646;
    background-color: #dddddd;
    margin-left: 140px;
  }
  .ekwot_save{
    color: #ffffff;
    background-color: #4ea0ea;
    margin-left: 20px;
  }
  .ekwot_telnums_add,.ekwot_keywords_add{
    width: 60px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    border-radius: 4px;
    display: block;
    color: #ffffff;
    background-color: #4ea0ea;
    float: left;
    text-align: center;
    margin-left: 10px;
  }
</style>
