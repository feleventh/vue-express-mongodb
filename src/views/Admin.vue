<template lang="pug">
  .app
    admin-login
    h3 图书管理系统
    i.el-icon-upload2(@click="logout")
    el-row
      el-col(:span="4")
        el-menu(router default-active="bookOverview")
          el-menu-item(index="bookOverview") 图书概览
          el-menu-item(index="bookManage") 图书管理
      el-col(:span="20")
        router-view(name="bookMain")
</template>
<script>
  import AdminLogin from '../components/AdminLogin.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    components: {AdminLogin},
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapMutations(['login', 'logout'])
    },
    created: function () {
      if (window.sessionStorage.adminIsLogin) {
        this.login(this.$store.state)
      }
    }
  }
</script>
<style scoped lang="less">
  .app{
    margin: auto;
    position: relative;
  }
  h3{
    background-color: lighten(#4db3ff, 30%);
    margin: 0;
    color: #11b95c;
    line-height: 60px;
  }
  .el-icon-upload2{
    transform: rotate(90deg);
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
</style>
