import Vue from 'vue'
import App from './App.vue'
import router from './router'
// md编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// http
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.config.productionTip = false

// 高亮
import Highlight from './highlight';
Vue.use(Highlight);
// md编辑器
Vue.use(mavonEditor)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
