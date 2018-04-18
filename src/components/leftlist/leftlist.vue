<template>
  <div class="left">
    <ul>
        <li v-for="(val, key) in listData" :class="{iClick: val.id === urlFirst}"  onselectstart="return false" style="-moz-user-select:none;">
            <div :id="val.id + '1'" class="management" @click="tabToggle(key)">
                <i class="iNoClick"></i>
                <p class="pNoClick">{{val.name}}</p>
            </div>
            <ul class="management_list " v-show='val.ifChoose || val.id === urlFirst'>
                <li v-for="(listName, childKey) in val.clist" :class="{chioce: listName.route == urlSecond}" @click="childSelect(listName.route)"  onselectstart="return false" style="-moz-user-select:none;">
                    <router-link :to="'/' + listName.route + '/' + val.id + '/' + listName.route">{{listName.cname}}</router-link>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script>
/*  */
// import { leftJson } from '@/common/js/js/leftList.js'
import router from '@/router'
import { menuBuild, setRouter } from '@/components/leftlist/menuBuild'
export default {
  router,
  data: function () {
    return {
      listData: [],
      // chSelect: 'serviceAudit',
      urlFirst: '',
      urlSecond: ''
    }
  },
  created () {
    this.listData = menuBuild(this, router)
  },
  mounted () {
    setRouter(this, router)
    /*
     */
    this.$store.commit('changeUrlFirst', this.$route.params.first)
    this.urlFirst = this.$store.state.urlFirst
    this.$store.commit('changeUrlSecond', this.$route.params.second)
    this.urlSecond = this.$store.state.urlSecond
  },
  methods: {
    tabToggle (key) {
      this.listData[key].ifChoose = !(this.listData[key].ifChoose)
    },
    /*
     *  切换组件
     *  {String} route 组件名称
     */
    childSelect (route) {
      this.$store.commit('changeUrlFirst', this.$route.params.first)
      this.urlFirst = this.$store.state.urlFirst
      this.$store.commit('changeUrlSecond', this.$route.params.second)
      this.urlSecond = this.$store.state.urlSecond
    }
  },
  watch: {
    // 监控$route，发生改变，就重新给urlFirst和urlSecond赋值
    '$route': function (val, oldVal) {
      this.urlFirst = this.$store.state.urlFirst
      this.urlSecond = this.$store.state.urlSecond
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    padding: 0;
    margin: 0;
    font-family: 'Microsoft Yahei',Tahoma,'Simsun','宋体';
}
html,body{
    height: 100%;
}
a{
    text-decoration: none;
}
.left{
    width: 240px;
    background-color: #16375a;
    position: absolute;
    top:80px;
    bottom: 0px;
    left: 0px;
    overflow-x: hidden;
    z-index:99;
}
.left ul li{
    float: left;
}
.left > ul > li:first-child{
    border-top: 1px solid #0b2643;
}
.management{
    width: 260px;
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #0b2643;
    font-size: 18px;
    cursor: pointer;
    overflow: hidden;
}
.management i{
    width: 18px;
    height: 18px;
    margin-left: 30px;
    margin-right: 10px;
    background-repeat: no-repeat;
    margin-top: 32px;
    float: left;
}
#service1 i{
    background-image: url("http://static.crecgec.com/mmp/left1.png");
}
#shortMessage1 i{
    background-image: url("http://static.crecgec.com/mmp/left2.png");
}
#mailServe1 i{
    background-image: url("http://static.crecgec.com/mmp/left3.png");
}
#knowledgeBase1 i{
    background-image: url("http://static.crecgec.com/mmp/left4.png");
}
#userManagement1 i{
    background-image: url("http://static.crecgec.com/mmp/left5.png");
}
#informationDisplay1 i{
    background-image: url("http://static.crecgec.com/mmp/left6.png");
}
#compInfoSearch1 i{
    background-image: url("http://static.crecgec.com/mmp/left7.png");
}
#internalValueAdd1 i{
  background-image: url("http://static.crecgec.com/mmp/left8.png");
}
.iClick .management i{
    background-position: 0 -23px;
}

.iClick .management > p{
    color: #fff;
}
.management > p{
    color: #4ea0ea;
}
.management_list{
    width: 260px;
    overflow: hidden;
}
.management_list li a{
    font-size: 16px;
    list-style: none;
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin-left: 60px;
    border-bottom: 1px solid #0c5e8d;
    cursor: pointer;
    color: #4ea0ea;
    display: block;
    outline: none;
}
.management_list li.chioce a{
    color: white;
}
/*公共类 start*/
.displayBlock{
    display: block;
}
.displayNone{
    display: none;
}
.pClick,.liClick >a{
    color: #ffffff;
}
/*
.iClick{
    background-position: 0 -25px;
}
.pNoClick,.liNoClick > a{
    color: #4ea0ea;
}
*/
.iNoClick{
    background-position: 0 0;
}


/*公共类 end*/


</style>
