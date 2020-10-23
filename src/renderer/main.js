import Vue from 'vue'
import axios from 'axios'
/*import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'*/
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/*Vue.use(Element)*/
Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
