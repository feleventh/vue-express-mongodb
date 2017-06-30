/**
 * Created by zhangchi on 2017/5/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import admin from './modules/admin'
import editBook from './modules/editBook'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    user, admin, editBook
  }
  // strict: debug,
  // middlewares: debug ? [] : []
})
