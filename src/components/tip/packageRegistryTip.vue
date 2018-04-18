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
          <span>归属服务：</span>
          <select class="xgfl_gsfw" v-model="serviceid">
            <option v-for="(value, key, index) in homeServiceList" :value="value.serviceid">
              {{value.servicename}}
            </option>
          </select>
        </div>
        <div>
          <span>套餐名称：</span>
          <input type="text" class="fwcname" v-model="servicetypename">
        </div>
        <div>
          <span>描述：</span>
          <input type="text" class="xgfl_bewrite" v-model="servicetypedes">
        </div>
        <div>
          <span>单价（时间单位/数量）：</span>
          <input type="text" class="xgfl_tb" v-model="price">
        </div>
        <div>
          <span>最大允许数量：</span>
          <input type="text" class="xgfl_dgurl" v-model="clientcout">
        </div>
        <div>
          <span>可订购终端：</span>
          <input type="text" class="xgfl_seturl" v-model="product">
        </div>
        <div>
          <span>允许的支付方式：</span>
          <div class="payTypeDiv">
            <span v-for="(value, index) in payTypeList" class="payType" :class="{'tcClick':payTypeClickList.indexOf(value) > -1}" @click="checkPayTyoe(value)">{{value}}</span>
          </div>
        </div>
        <div>
          <a class="addSave regist_add" href="javascript:;" v-show="addOrUpdate === 'add'" @click="addPackge">保存</a>
          <a class="updateSave xgfl_upd" href="javascript:;" v-show="addOrUpdate === 'update'" @click="updatePackge">保存</a>
          <a class="addCancel" href="javascript:;" @click="addClose">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  require('es6-promise').polyfill()
  import {deleteArray} from 'common/js/dom'

  export default {
    props: ['addOrUpdate', 'packageRegistr'],
    data () {
      return {
        homeServiceList: [], // 归属服务列表
        servicetypeid: '', // 套餐ID
        serviceid: '', // 归属服务
        servicetypename: '', // 套餐名称
        servicetypedes: '', // 描述
        price: '', // 单价
        clientcout: '', // 最大允许数量
        product: '', // 可订购终端
        allowplaystpe: '',
        payTypeList: ['支付宝', '微信', '线下支付'], // 支付方式
        payTypeClickList: [] // 点击的支付方式
      }
    },
    watch: {
      packageRegistr () {
        this.servicetypeid = this.packageRegistr.servicetypeid
        this.serviceid = this.packageRegistr.servicename ? this.getServicenameByVal(this.packageRegistr.servicename) : 96
        this.servicetypename = this.packageRegistr.servicetypename
        this.servicetypedes = this.packageRegistr.servicetypedes
        this.price = this.packageRegistr.price
        this.clientcout = this.packageRegistr.clientcout
        this.product = this.packageRegistr.product
        this.payTypeClickList = this.operationPayType(this.packageRegistr.allowplaystpe)
      }
    },
    methods: {
      // 获取归属服务
      searchHomeService () {
        let data = {
          'interface': 'selectservice'
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
            _this.homeServiceList = response.data.detail
            _this.serviceid = _this.homeServiceList[0].serviceid
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      addClose () {
        this.$emit('isAddconShow', false)
      },
      addPackge () {
        if (this.servicetypename) {
          let data = {
            'interface': 'addServicetype',
            'serviceid': this.serviceid,
            'servicetypename': this.servicetypename,
            'servicetypedes': this.servicetypedes,
            'price': this.price,
            'clientcout': this.clientcout,
            'product': this.product,
            'allowplaystpe': this.payTypeClickList ? this.payTypeClickList.join(',') : ''
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
                _this.serviceid = 96
                _this.servicetypename = ''
                _this.servicetypedes = ''
                _this.price = ''
                _this.clientcout = ''
                _this.product = ''
                _this.payTypeClickList.length = 0
                _this.serviceid = _this.homeServiceList[0].serviceid
                _this.$emit('operation', true)
              }
            })
            .catch(function (err) {
              console.log(err)
            })
          this.$emit('isAddconShow', false)
        } else {
          this.$message('请输入套餐名称!')
        }
      },
      updatePackge () {
        let data = {
          'interface': 'updateservicetype',
          'serviceid': this.serviceid,
          'servicetypename': this.servicetypename,
          'servicetypedes': this.servicetypedes,
          'price': this.price,
          'clientcout': this.clientcout,
          'product': this.product,
          'allowplaystpe': this.payTypeClickList ? this.payTypeClickList.join(',') : '',
          'id': this.servicetypeid
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
              _this.$message('更新成功！')
              _this.$emit('operation', true)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
        this.$emit('isAddconShow', false)
      },
      // 点击选取支付方式
      checkPayTyoe (val) {
        if (this.payTypeClickList.indexOf(val) === -1) {
          this.payTypeClickList.push(val)
        } else {
          this.payTypeClickList = deleteArray(this.payTypeClickList, val)
        }
      },
      // 操作packageRegistr的servicename值，父组件返回的是value,select里面需要的是key
      getServicenameByVal (val) {
        for (let key in this.homeServiceList) {
          if (this.homeServiceList[key].servicename === val) {
            return this.homeServiceList[key].serviceid
          }
        }
      },
      // 操作packageRegistr.allowplaystpe，里面的值赋值给payTypeClickList
      operationPayType (val) {
        this.payTypeClickList = val.split(',')
        return this.payTypeClickList
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
    width: 170px;
    float: left;
    text-align: right;
    color: #464646;
    font-size: 14px;
  }
  .addCon div input,.addCon div select{
    width: 238px;
    height: 32px;
    border: 1px solid #bbbbbb;
  }
  .addCon div input{
    padding-left: 5px;
  }
  .addCon div select{
    width: 240px;
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
    margin-left: 170px;
  }
  .addCancel{
    background-color: #dddddd;
    color: #464646;
    margin-left: 20px;
  }
  .addSave:hover,.updateSave:hover{
    background-color: #4986c6
  }
  .tcClick{
    color: #4ea0ea !important;
  }
  .payTypeDiv{
    width: 240px !important;
    margin-top: 0 !important;
  }
  .payType{
    width: auto !important;
    height: 34px;
    margin-right: 5px;
    line-height: 34px;
    cursor: pointer
  }
  /*添加弹出框 end*/
</style>
