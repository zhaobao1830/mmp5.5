<template>
  <div class="add_con">
    <div class="addContent">
      <div class="addTitle">
        <p>请在列表中填写添加内容</p>
        <a class="addClose" @click="addClose">
          <img src="http://static.crecgec.com/mmp/sre_05.png">
        </a>
      </div>
      <div class="addCon xg_form_list">
        <div>
          <span>类型：</span>
          <select class="xgfl_type" v-model="parentid">
            <option v-for="(value, key) in typeList" :value="key">
              {{value}}
            </option>
          </select>
        </div>
        <div>
          <span>服务名称：</span>
          <input type="text" class="fwcname" v-model="servicename">
        </div>
        <div>
          <span>描述：</span>
          <input type="text" class="xgfl_bewrite" v-model="description">
        </div>
        <div>
          <span>图标：</span>
          <input type="text" class="xgfl_tb" v-model="ico">
        </div>
        <div>
          <span>订购URL：</span>
          <input type="text" class="xgfl_dgurl" v-model="subscribeurl">
        </div>
        <div>
          <span>设置URL：</span>
          <input type="text" class="xgfl_seturl" v-model="setupurl">
        </div>
        <div>
          <span>审核模式：</span>
          <select class="xgfl_sh" v-model="checkmode">
            <option value ="即时后生效">即时后生效</option>
            <option value ="审批后生效">审批后生效</option>
            <option value ="支付后生效">支付后生效</option>
            <option value ="支付后审批生效">支付后审批生效</option>
          </select>
        </div>
        <div>
          <a class="addSave regist_add" href="javascript:;" v-show="addOrUpdate === 'add'" @click="addService">保存</a>
          <a class="updateSave xgfl_upd" href="javascript:;" v-show="addOrUpdate === 'update'" @click="updateService">保存</a>
          <a class="addCancel" href="javascript:;" @click="addClose">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  export default {
    props: ['tipShow', 'addOrUpdate', 'serviceReg'],
    data () {
      return {
        typeList: [], // 保存查询回来的type
        serviceid: '',
        parentid: 1,
        servicename: '',
        description: '',
        ico: '',
        subscribeurl: '',
        setupurl: '',
        checkmode: ''
      }
    },
    watch: {
      serviceReg () {
        this.serviceid = this.serviceReg.serviceid
        this.parentid = this.serviceReg.parentid ? this.getParentidByVal(this.serviceReg.parentid) : 1
        this.servicename = this.serviceReg.servicename
        this.description = this.serviceReg.description
        this.ico = this.serviceReg.ico
        this.subscribeurl = this.serviceReg.subscribeurl
        this.setupurl = this.serviceReg.setupurl
        this.checkmode = this.serviceReg.checkmode
      }
    },
    methods: {
      addClose () {
        this.$emit('isAddconShow', false)
      },
      addService () {
        if (this.servicename) {
          let data = {
            'interface': 'addService',
            'parentid': this.parentid,
            'servicename': this.servicename,
            'des': this.description ? this.description : '',
            'ico': this.ico ? this.ico : '',
            'subscribeurl': this.subscribeurl ? this.subscribeurl : '',
            'setupurl': this.setupurl ? this.setupurl : '',
            'checkmode': this.checkmode ? this.checkmode : ''
          }
          let _this = this
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
                _this.$message('插入成功！')
                _this.parentid = 1
                _this.servicename = ''
                _this.description = ''
                _this.ico = ''
                _this.subscribeurl = ''
                _this.setupurl = ''
                _this.checkmode = ''
                _this.$emit('operation', true)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
          this.$emit('isAddconShow', false)
        } else {
          this.$message('请输入服务名称！')
        }
      },
      updateService () {
        let data = {
          'interface': 'updateservice',
          'parentid': this.parentid,
          'servicename': this.servicename,
          'des': this.description,
          'ico': this.ico,
          'subscribeurl': this.subscribeurl,
          'setupurl': this.setupurl,
          'checkmode': this.checkmode,
          'id': this.serviceid
        }
        this.parentid = 1
        let _this = this
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
              _this.$message('更新成功')
              _this.$emit('operation', true)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
        this.$emit('isAddconShow', false)
      },
      // 查找类型
      searchType () {
        let data = {
          'interface': 'selectmainservice'
        }
        let _this = this
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
            _this.typeList = response.data.detail
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      // 操作serviceReg的parentid值，父组件返回的是value,select里面需要的是key
      getParentidByVal (val) {
        for (let key in this.typeList) {
          if (this.typeList[key] === val) {
            return key
          }
        }
      }
    }
  }
</script>

<style scoped>
  /*添加弹出框 start*/
  .add_con{
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 100;
  }
  .addContent{
    width: 440px;
    height: 470px;
    position: absolute;
    top:50%;
    margin-top: -235px;
    left: 50%;
    margin-left: -220px;
    background-color: #ffffff;
  }
  .addTitle{
    width: 440px;
    height: 34px;
    line-height: 34px;
    background-color: #4596d4;
    color: #ffffff;
  }
  .addTitle  p{
    font-size: 16px;
    margin-left: 10px;
    float: left;
  }
  .addTitle a{
    margin-right: 10px;
    display: block;
    float: right;
    cursor: pointer;
  }
  .addCon{
    width: 440px;
    overflow: hidden;
  }
  .addCon div{
    width: 440px;
    float: left;
    height: 34px;
    line-height: 34px;
    margin-top: 15px;
    text-align: left;
  }
  .addCon div span{
    width: 95px;
    float: left;
    text-align: right;
    color: #464646;
    font-size: 14px;
  }
  .addCon div input,.addCon div select{
    width: 298px;
    height: 32px;
    border: 1px solid #bbbbbb;
  }
  .addCon div input{
    padding-left: 5px;
  }
  .addCon div select{
    width: 300px;
    height: 34px;
    border: 1px solid #bbbbbb;
  }
  .addCon div a{
    width: 80px;
    height: 34px;border-radius: 2px;
    display: block;
    float: left;
    text-align: center;
    text-decoration: none;
  }
  .addSave,.updateSave{
    background-color: #4ea0ea;
    color: #ffffff;
    margin-left: 95px;
  }
  .addCancel{
    background-color: #dddddd;
    color: #464646;
    margin-left: 20px;
  }
  .addSave:hover,.updateSave:hover{
    background-color: #4986c6
  }
  /*添加弹出框 end*/
</style>
