<template>
  <div class="add_con">
    <div class="addContent">
      <div class="addTitle">
        <p>信息显示</p>
        <a class="addClose" @click="addClose">
          <img src="http://static.crecgec.com/mmp/sre_05.png">
        </a>
      </div>
      <div class="addCon xg_form_list">
        <div>
          <span>公司全称：</span>
          <input type="text" :value="inforMation.nameVal" readonly=true>
        </div>
        <div>
          <span>联系人：</span>
          <input type="text" :value="inforMation.contactsVal" readonly=true>
        </div>
        <div>
          <span>手机号：</span>
          <input type="text" :value="inforMation.telephoneVal" readonly=true>
        </div>
        <div>
          <span>邮箱：</span>
          <input type="text" :value="inforMation.emailVal" readonly=true>
        </div>
        <div>
          <span>所在地：</span>
          <input type="text" :value="inforMation.addressPro" readonly=true>
        </div>
        <div>
          <span>业务需求：</span>
          <input type="text" :value="inforMation.bussNedds" readonly=true>
        </div>
        <div>
          <span>业务描述：</span>
          <input type="text" :value="inforMation.busDescription" readonly=true>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['inforMation'],
    data () {
      return {
        nameVal: ''
      }
    },
    watch: {
      inforMation () {
        this.nameVal = this.inforMation.nameVal
      }
    },
    methods: {
      addClose () {
        this.$emit('closeTip', true)
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
    z-index: 9999;
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
  .addCon div input{
    width: 298px;
    height: 32px;
    padding-left: 5px;
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
  /*添加弹出框 end*/
</style>
