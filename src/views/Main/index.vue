<template>
  <div id="main">
    <Head />
    <router-view/>
  </div>
</template>

<script>
import Head from '../../components/Head'
  export default {
    data(){
      return {
        
      }
    },
    components:{
      Head
    }
    
  }
</script>

<style  lang="stylus">
#main
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height:100%

</style>