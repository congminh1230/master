import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import locale from 'element-ui/lib/locale/lang/vi'


Vue.use(Vuex)

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
