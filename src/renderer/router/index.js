import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'index-page',
      component: require('../components/IndexPage').default
    },
    {
      path: '/landing',
      name: 'index-page',
      component: require('../components/LandingPage').default
    },
    {
      path: '/email',
      name: 'index-page',
      component: require('../components/email/index').default
    },
    {
      path: '/email_edit',
      name: 'index-page',
      component: require('../components/email/edit').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
