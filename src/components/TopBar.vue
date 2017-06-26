<template lang="pug">
  .topbar
    .right
      .login-register(v-if="hasLogin === false")
        button(@click="openLoginModal") 登陆
        button(@click="openRegisterModal") 注册
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'top-bar',
    computed: {
      ...mapGetters(['hasLogin'])
    },
    methods: {
      ...mapMutations(['openLoginModal', 'openRegisterModal'])
    }
  }
</script>
