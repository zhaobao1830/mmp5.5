<template>
  <div class="telTip">
    <div class="tipCon">
      <div class="tipTitle">
        <p>提示</p>
        <a href="javascript:;" class="titleClose" @click="closeTelTip">
          <img src="http://static.crecgec.com/mmp/close.png"/>
        </a>
      </div>
      <div class="tipContent">
        <div class="tipContent1">
          {{telCon}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['telCon'],
    methods: {
      closeTelTip () {
        this.$emit('isShow', false)
      }
    }
  }
</script>

<style scoped>
  .telTip{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(153, 153, 153, .5);
  }
  .tipCon{
    width: 440px;
    height: 265px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    margin-top: -132px;
    left: 50%;
    margin-left: -220px;
  }
  .tipTitle{
    width: 440px;
    height: 34px;
    line-height: 34px;
    background-color: #4ea0ea;
  }
  .tipTitle p{
    width: auto;
    float: left;
    margin-left: 10px;
    font-size: 16px;
    color: #ffffff;
  }
  .tipTitle a{
    float: right;
    margin-right: 10px;
  }
  .tipContent{
    width: 440px;
    height: 231px;
  }
  .tipContent1{
    width: 420px;
    height: 200px;
    padding: 20px 10px 10px;
    overflow: auto;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    font-size: 15px;
  }
</style>
