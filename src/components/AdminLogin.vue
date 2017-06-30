<template lang="pug">
  transition(name="fade")
    .mask(v-if="!isLogin")
      .admin-login
        el-card
          el-row(:gutter="20")
            el-col(:span="12")
              img(src="../assets/image/book.jpg")
            el-col(:span="12")
              el-form(label-width="65px" :model="adminLoginForm" ref="adminLoginForm" :rules="rules")
                h3 图书管理系统
                el-form-item(label="用户名" prop="user")
                  el-input(v-model="adminLoginForm.user")
                el-form-item(label="密码" prop="password")
                  el-input(type="password" v-model="adminLoginForm.password")
                el-form-item
                  el-button(@click="submitForm('adminLoginForm')") 登录
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data: () => {
      return {
        adminLoginForm: {
          user: '',
          password: ''
        },
        rules: {
          user: [
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            },
            {
              pattern: /^[0-9a-zA-Z]{3,12}$/,
              message: '用户名必须长度为3到12个数字和字母',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空'
            },
            {
              pattern: /^[0-9a-zA-Z]{6,18}$/,
              message: '密码必须长度为6到18个数字和字母'
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapMutations(['login', 'logout']),
      submitForm: function (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/login/adminLogin', {
              user: String.prototype.trim.call(this.adminLoginForm.user),
              password: String.prototype.trim.call(this.adminLoginForm.password)
            })
              .then((response) => {
                console.log('success')
//                that.isLogin = true
                that.login(that.$store.state)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(33,33,33,0.9);
  }
  .admin-login{
    width: 640px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    color: #415f83;
    .el-form-item{
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    h3{
      margin: 12px 0;
      color: #415f83;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
