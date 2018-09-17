import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store/store'
import moment from 'moment'

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('MMM DD, YYYY')
  }
})

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app');
