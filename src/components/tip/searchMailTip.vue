<template>
  <div class="searchMail">
    <div class="searchMailContent">
      <div class="searchMailTitle">
        <p>邮件详情</p>
        <a class="searchMailClose" @click="searchMailClose">
          <img src="http://static.crecgec.com/mmp/sre_05.png">
        </a>
      </div>
      <div class="searchMailShow">{{emails}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['emails'],
    methods: {
      searchMailClose () {
        this.$emit('closeTip', true)
      }
    }
  }
</script>

<style scoped>
  /*添加弹出框 start*/
  .searchMail{
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(153, 153, 153, 0.6);
    z-index: 9999;
  }
  .searchMailContent{
    width: 440px;
    height: 470px;
    position: absolute;
    top:50%;
    margin-top: -235px;
    left: 50%;
    margin-left: -220px;
    background-color: #ffffff;
  }
  .searchMailTitle{
    width: 440px;
    height: 34px;
    line-height: 34px;
    background-color: #4596d4;
    color: #ffffff;
  }
  .searchMailTitle  p{
    font-size: 16px;
    margin-left: 10px;
    float: left;
  }
  .searchMailTitle a{
    margin-right: 10px;
    display: block;
    float: right;
    cursor: pointer;
  }
  .searchMailShow{
    width: 420px;
    margin: 10px;
    overflow: auto;
  }

  /*添加弹出框 end*/
</style>
