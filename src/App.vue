<template lang="pug">
  #app
    router-view(name="app")
    <!--top-bar-->
    <!--register-->
    <!--p-->
      <!--router-link(v-bind:to="{name:'help'}") Help-->
      <!--router-link(v-bind:to="{name:'home'}") Home-->
    <!--.main-->
      <!--router-view-->
</template>

<script>
  import TopBar from './components/TopBar.vue'
  import Register from './components/Register.vue'
  export default {
    name: 'app',
    components: {
      TopBar, Register
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Default Title',
      // all titles will be injected into this template
      titleTemplate: '%s | My Awesome Webapp'
    }
  }
</script>

<style>
  body{
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
