<template>
  <div class="bulkSmsContent container">
    <div class="conTitle">
      <img src="http://static.crecgec.com/mmp/common_01.png">
      <p>当前位置：</p>
      <span>短信管理</span>
      <i></i>
      <span>批量发送短信</span>
    </div>
    <form class="bulkSmsForm" name="bulkSmsForm">
      <div class="bulkSmsCon content">
        <div>
          <p>文件：</p>
          <span>请上传Excel文件,并确保每一列的数据格式问文本类型</span>
          <br/>
          <input type="file" name="mobile_file" @change="getFile($event)" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        </div>
        <div>
          <p>短信模板：</p>
          <span>需要替换的部分请用%加数字（例：%1）代替</span>
          <textarea class="smsTemplate" name="mobile_model" v-model="mobile_model" ref="smsTemplate" @keyup="checkLen"></textarea>
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
        <a href="javascript:;" class="bulkSmsA" :class='{subing:bulkSubing == true}' @click="formSumbit($event)">提&nbsp;&nbsp;交</a>
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
        file: '',
        mobile_sign: 1,
        mobile_model: '',
        tipContent: '', // 提示框显示的内容
        sendTrue: false, // 是否发送成功
        textareaTip: false,
        hasWrite: '',
        hasSurplus: '',
        phoneNum: '',
        phsNum: '',
        bulkSubing: false
      }
    },
    methods: {
      getFile () {
        this.file = event.target.files[0]
      },
      formSumbit (event) {
        this.bulkSubing = true
        let _this = this
        let mobileSign = this.mobile_sign
        let mobileModel = this.mobile_model
        let flag = false
        if (this.file === '') {
          flag = false
          this.tipContent = '请选择文件！'
          this.isShow = true
          this.bulkSubing = false
          return false
        } else {
          flag = true
        }
        if (mobileSign === '') {
          flag = false
          this.tipContent = '请选择签名！'
          this.isShow = true
          this.bulkSubing = false
          return false
        } else {
          flag = true
        }
        if (mobileModel === '') {
          flag = false
          this.tipContent = '输入短信内容！'
          this.isShow = true
          this.bulkSubing = false
          return false
        } else {
          flag = true
        }
        if (flag) {
          event.preventDefault()
          let formData = new FormData()
          formData.append('mobile_file', this.file)
          formData.append('mobile_sign', mobileSign)
          formData.append('mobile_model', mobileModel)
          axios({
            url: this.$store.state.baseUrl + this.$store.state.mmpUrl + 'index.php?s=Sms/Index/batchSendMessage',
            method: 'post',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
          })
            .then(function (response) {
              _this.bulkSubing = false
              _this.tipContent = '短信发送成功！'
              _this.isShow = true
              _this.sendTrue = true
            })
            .catch(function (err) {
              _this.bulkSubing = false
              console.log(err)
            })
        }
      },
      changeShow (val) {
        this.isShow = val.isShow
        if (val.sendTrue) {
          document.querySelector('.bulkSmsForm').reset()
          this.file = ''
          this.mobile_model = ''
          this.mobile_sign = 1
        }
      },
      checkLen () {
        let _this = this
        setTimeout(function () {
          let smsValLength = _this.$refs.smsTemplate.value.length
          if (smsValLength > 0) {
            _this.textareaTip = true
            if (smsValLength <= 394) {
              _this.hasWrite = smsValLength + 8
              _this.hasSurplus = 402 - (smsValLength + 8)
              _this.phoneNum = Math.ceil(_this.hasWrite / 68)
              _this.phsNum = Math.ceil(_this.hasWrite / 53)
            } else {
              _this.$message('您输入的文字最多只能402个字！')
              _this.mobile_model = _this.$refs.smsTemplate.value.substr(0, 394)
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
.bulkSmsCon > div{
    width: auto;
    margin: 20px 20px 0 20px;
    overflow: hidden;
    text-align: left;
}
.bulkSmsCon div p,.bulkSmsCon div span{
    display: block;
    float: left;
    height: 15px;
    line-height: 15px;
}
.bulkSmsCon div p{
    color: #222222;
    font-size: 14px;
}
.bulkSmsCon div span{
    color: #f44848;
    font-size: 12px;
}
.bulkSmsCon div input[type=file]{
    margin-top: 10px;
    font-size: 14px;
    color: #777777;
}
.smsTemplate{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 198px;
    border: 1px solid #bbbbbb;
    float: left;
    resize:none;
    margin-top: 10px;
    font-size: 14px;
    border-radius: 2px;
}
.bulkSmsCon div select{
    width: 200px;
    height: 34px;
    border: 1px solid #bbbbbb;
    color: #bbbbbb;
    margin-top: 10px;
    border-radius: 2px;
}
.bulkSmsA{
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
.bulkSmsA.subing{
  background-color: #ccc;
}
.bulkSmsA:hover{
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
