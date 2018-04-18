<template>
  <div class="common">
    <el-header></el-header>
    <leftlist></leftlist>
    <div class="contouter">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftlist from '@/components/leftlist/leftlist'
import elHeader from '@/components/el-header/el-header'

export default {
  name: 'common',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    leftlist,
    elHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
