// import axios from 'axios'
const state = {
  isLogin: false
}

const getters = {
  isLogin: state => state.isLogin
}

const mutations = {
  login: (state) => {
    state.isLogin = true
    window.sessionStorage.adminIsLogin = true
  },
  logout: (state) => {
    state.isLogin = false
    window.sessionStorage.adminIsLogin = false
  }
}

const actions = {
}

export default {
  state, getters, mutations, actions
}
