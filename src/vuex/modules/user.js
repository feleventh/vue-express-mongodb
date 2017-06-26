import axios from 'axios'
const state = {
  user: {
    account: '',
    password: ''
  },
  userInfo: '',
  hasLogin: false,
  loginModal: 'close',
  activeName: 'login'
}

const getters = {
  user: state => state.user,
  userInfo: state => state.userInfo,
  hasLogin: state => state.hasLogin,
  loginModal: state => state.loginModal,
  activeName: state => state.activeName
}

const mutations = {
  /**
   * 记录用户输入
   * */
  recordUserData: (state, data) => {
    switch (data.name) {
      case 'account':
        state.user.account = data.account
        break
      case 'password':
        state.user.password = data.password
        break
      default:
        break
    }
  },
  logout: (state) => {
    state.user.account = ''
    state.user.password = ''
    state.hasLogin = false
  },
  updateUserInfo: (state, userInfo) => {
    if (userInfo && userInfo !== '') {
      state.user.password = ''
      state.userInfo = userInfo
      state.hasLogin = true
    } else {
      state.hasLogin = false
    }
  },
  updateUserLocalStorage: (state, data) => {
    let newData = JSON.parse(window.localStorage.userInfo)
    switch (data.name) {
      case 'avatar':
        state.userInfo.avatar = data.value
        newData.avatar = data.value
        window.localStorage.userInfo = JSON.stringify(newData)
        break
      default:
        break
    }
  },
  openLoginModal: (state, data) => {
    state.loginModal = 'open'
    state.activeName = 'login'
  },
  openRegisterModal: (state, data) => {
    state.loginModal = 'open'
    state.activeName = 'register'
  },
  closeLogin: (state, data) => {
    state.loginMoal = 'close'
  }
}

const actions = {
  submitLoginData: (context) => {
    console.log(context.state)
    return axios.get('/api/login/getAccount', (req, res) => console.log(res.data))
  },
  updateUserInfo: (context) => {
    let userInfo = JSON.parse(window.localStorage.userInfo)
    context.commit('updateUserInfo', userInfo)
    // context.commit('showUsername', userInfo.username)
  },
  logout: (context) => {
    context.commit('logout')
  }
}

export default {
  state, getters, mutations, actions
}
