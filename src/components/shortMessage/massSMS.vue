<template>
  <div class="massSmsContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>短信管理</span>
      <i></i>
      <span>群发短信</span>
    </div>
    <form class="masSmsForm" name="masSmsForm">
      <div class="massSmsCon content">
        <div>
          <p>收信人：</p>
          <span>多个手机号请用英文半角格式的','号隔开</span>
          <textarea class="addressee" name="mobile_consignee" v-model="mobile_consignee"></textarea>
        </div>
        <div>
          <p>短信内容：</p>
          <textarea class="smsContent" name="mobile_content" ref="smsContent" v-model="mobile_content" @keyup="checkLen"></textarea>
        </div>
        <p class="textareaTip" v-show="textareaTip">包含签名已输入<span class="hasWrite" ref="hasWrite">{{hasWrite}}</span>个字，还剩<span class="hasSurplus">{{hasSurplus}}</span>个字，最多<span class="totalNum">402</span>个字，手机<span class="phoneNum">{{phoneNum}}</span>条，小灵通<span class="phsNum">{{phsNum}}</span>条</p>
        <div>
          <p>签名：</p>
          <span>请选择签名</span>
          <br/>
          <select name="mobile_sign" v-model="mobile_sign">
            <option value="1">中铁鲁班平台</option>
          </select>
        </div>
        <br/>
        <a href="javascript:;" class="massSmsA" @click="formSumbit">提交</a>
      </div>
    </form>
    <div class="footer">
      <p>中铁鲁班商务网 Copyright © 2014 Crecgec. All Rights Reserved.</p>
    </div>
    <transition name="tip">
      <sw-tip v-show="isShow" :tipContent="tipContent" :sendTrue="sendTrue" @tip="changeShow"></sw-tip>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import swTip from 'components/tip/successAndWarningTip'

  export default {
    data () {
      return {
        isShow: false,
        mobile_consignee: '',
        mobile_content: '',
        mobile_sign: 1,
        tipContent: '', // 提示框显示的内容
        sendTrue: false, // 是否发送成功
        textareaTip: false,
        hasWrite: '',
        hasSurplus: '',
        phoneNum: '',
        phsNum: ''
      }
    },
    methods: {
      formSumbit () {
        let _this = this
        let mobileConsignee = this.mobile_consignee
        let mobileContent = this.mobile_content
        let mobileSign = this.mobile_sign
        let flag = false
        if (mobileConsignee === '') {
          this.tipContent = '请输入收信人！'
          this.isShow = true
          flag = false
          return false
        } else {
          let re = new RegExp('^1[3|4|5|7|8|][0-9]{9}')
          let strs = [] // 定义一数组
          strs = mobileConsignee.split(',') // 字符分割
          for (let i = 0; i < strs.length; i++) {
            if (!re.test(strs[i])) {
              this.tipContent = '手机号错误！'
              this.isShow = true
              flag = false
              return false
            } else {
              flag = true
            }
          }
        }
        if (mobileContent === '') {
          this.tipContent = '请输入短信内容！'
          this.isShow = true
          flag = false
          return false
        } else {
          flag = true
        }
        if (flag) {
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Sms/Index/groupSendMessage',
            method: 'POST',
            data: {
              'mobile_consignee': mobileConsignee,
              'mobile_content': mobileContent,
              'mobile_sign': mobileSign
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
              _this.tipContent = '短信发送成功！'
              _this.isShow = true
              _this.sendTrue = true
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      },
      changeShow (val) {
        this.isShow = val.isShow
        if (val.sendTrue) {
          this.mobile_consignee = ''
          this.mobile_content = ''
          this.mobile_sign = 1
        }
      },
      checkLen () {
        let _this = this
        setTimeout(function () {
          let smsValLength = _this.$refs.smsContent.value.length
          if (smsValLength > 0) {
            _this.textareaTip = true
            if (smsValLength <= 394) {
              _this.hasWrite = smsValLength + 8
              _this.hasSurplus = 402 - (smsValLength + 8)
              _this.phoneNum = Math.ceil(_this.hasWrite / 68)
              _this.phsNum = Math.ceil(_this.hasWrite / 53)
            } else {
              _this.$message('您输入的文字最多只能402个字！')
              _this.mobile_content = _this.$refs.smsContent.value.substr(0, 394)
              _this.hasWrite = 402
              _this.hasSurplus = 0
              _this.phoneNum = 6
              _this.phsNum = 8
            }
          } else {
            _this.textareaTip = false
          }
        }, 500)
      }
    },
    components: {
      'sw-tip': swTip
    }
  }
</script>

<style scoped>
  .massSmsCon > div{
    width: auto;
    margin: 20px 20px 0 20px;
    overflow: hidden;
    text-align: left;
  }
  .massSmsCon div p,.massSmsCon div span{
    display: block;
    float: left;
    height: 15px;
    line-height: 15px;
  }
  .massSmsCon div p{
    color: #222222;
    font-size: 14px;
  }
  .massSmsCon div span{
    color: #f44848;
    font-size: 12px;
  }
  .massSmsCon div select{
    width: 200px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #bbbbbb;
    margin-top: 10px;
    border-radius: 2px;
  }
  .addressee,.smsContent{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 198px;
    border: 1px solid #bbbbbb;
    float: left;
    resize:none;
    margin-top: 10px;
    padding: 5px;
    font-size: 14px;
    border-radius: 2px;
  }
  .massSmsA{
    width: 80px;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    background-color: #4ea0ea;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    text-decoration: none;
    display: block;
    float: left;
    margin: 20px;
  }
  .massSmsA:hover{
    background-color: #4986c6;
  }
  .textareaTip{
    font-size: 12px;
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
  .textareaTip > span{
    color: #fd0000;
  }
</style>
