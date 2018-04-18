<template>
  <div class="successTip">
    <div class="tipCon">
      <div class="tipTitle">
        <p>提示</p>
        <a href="javascript:;" class="titleClose" @click="closeSuccessTip">
          <img src="http://static.crecgec.com/mmp/close.png"/>
        </a>
      </div>
      <div class="tipContent">
        <div class="tipContent1">
          <img src="http://static.crecgec.com/mmp/tip.png"/>
          <p>{{tipContent}}</p>
        </div>
       <a href="javascript:;" class="aClose" @click="closeSuccessTip">关&nbsp;&nbsp;闭</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tipContent: {
        type: String,
        default: ''
      },
      sendTrue: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeSuccessTip () {
        this.$emit('tip', {isShow: false, sendTrue: this.sendTrue})
      }
    }
  }
</script>

<style scoped>
  .successTip{
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
    width: 440px;
    float: left;
    margin-top: 70px;
  }
  .tipContent1 img,.tipContent1 p{
    display: block;
    float: left;
  }
  .tipContent1 img{
    margin-left: 132px;
  }
  .tipContent1 p{
    margin-left: 20px;
    margin-top: 10px;
    font-size: 16px;
    color: #4ea0ea;
    font-weight: bold;
  }
  .aClose{
    width: 80px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    display: block;
    font-size: 14px;
    float: left;
    background-color: #4ea0ea;
    color: #fff;
    margin-left: 180px;
    margin-top: 54px;
  }
</style>
