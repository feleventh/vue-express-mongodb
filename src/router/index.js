import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Help from '@/views/Help'
import Admin from '@/views/Admin'
import BookOverview from '@/views/BookOverview'
import BookManage from '@/views/BookManage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        app: Home
      }
    },
    {
      path: '/help',
      name: 'help',
      components: {
        app: Help
      }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        app: Admin
      },
      children: [
        {
          path: '',
          components: {bookMain: BookOverview}
        },
        {
          path: '/bookOverview',
          components: {bookMain: BookOverview}
        },
        {
          path: '/bookManage',
          components: {bookMain: BookManage}
        }
      ]
    }
  ]
})
