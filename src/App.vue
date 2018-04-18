<template>
  <div id="app">
    <component :is="nowComponent"></component>
  </div>
</template>

<script>
import '@/common/css/commons.css'
import '@/common/css/element_modify.css'
import login from '@/components/login/login'
import modifyPassword from '@/components/modifyPassword/modifyPassword'
import register from '@/components/register/register'
import mmpcont from '@/components/mmpcont'
// import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {
    login,
    mmpcont,
    modifyPassword,
    register
  },
  computed: {
    nowComponent () {
      return this.$store.state.nowComp
    }
  },
  watch: {
    nowComp () {
      console.log(this.nowComp)
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height:100%;
  position:relative;
}

::-webkit-scrollbar{
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-track-piece {
    background-color: transparent;
}
::-webkit-scrollbar-thumb{
    background-color: #999;
    -webkit-border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover{
    background-color: #9f9f9f;
}

</style>
