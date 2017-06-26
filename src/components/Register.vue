<template lang="pug">
  .login-bg(v-if="loginModal === 'open'")
    el-card.login-card(v-if="activeName === 'login'")
      i.el-icon-close(@click="closeLogin")
      el-form.login-form(label-width="100px" :model="user" ref="loginForm")
        el-form-item(label="用户名" prop="account")
          el-input(type="text" v-model="user.account")
        el-form-item(label="密码" prop="password")
          el-input(type="password" v-model="user.password")
        el-form-item
          el-button(@click="submitLoginForm()") 登录
    el-card.register-card(v-else)
      el-form.register-form(label-width="100px" :model="user" ref="registerForm")
        el-form-item(label="用户名" prop="account")
          el-input(type="text" v-model="user.account")
        el-form-item(label="密码" prop="password")
          el-input(type="password" v-model="user.password")
        el-form-item
          el-button(@click="submitRegisterForm()") 注册
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    name: 'register',
    computed: {
      ...mapGetters(['user', 'loginModal', 'activeName'])
    },
    methods: {
      submitLoginForm: function () {
//        this.$http.get(`/api/login/${this.loginForm.account}.${this.loginForm.password}`, function (response) {
//          console.log(response)
//        })
//        console.log(formName)
        // 获取已有账号密码
        let params = {
          account: this.user.account,
          password: this.user.password
        }
        console.log(params)
        this.$http.post('/api/login/getAccount', params)
        .then((response) => {
          // 响应成功回调
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
      },
      submitRegisterForm: function () {
        this.$http.get('/api/login/getAccount')
        .then((response) => {
          // 响应成功回调
          console.log(response)
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          }
          console.log(params)
          // 创建一个账号密码
          return this.$http.post('/api/login/createAccount', params)
        })
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
      },
      ...mapMutations(['closeLogin'])
    }
  }
</script>
<style lang="less">
  .login-bg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.65);
  }
  .login-card, .register-card{
    position: absolute;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .login-form, register-form{
      width: 360px;
      margin: 20px auto;
    }
  }
  .el-icon-close{
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
</style>
