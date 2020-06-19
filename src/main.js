import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/animate.css'
import Vuelidate from "vuelidate";
import Vue2Filters from 'vue2-filters'
import formatDateFilter from './filters/formatDateFilter';
import logOnCreatedMixin from './mixins/logOnCreatedMixin';
import store from './store'
import vuetify from './plugins/vuetify';

Vue.mixin(logOnCreatedMixin);

Vue.filter('formatDate', formatDateFilter);

Vue.use(Vuelidate)
Vue.use(Vue2Filters)

Vue.config.productionTip = false

// JavaScript runtime error 
window.onerror = function(msg, src, linenum, colnum, error) {
  console.log('[JavaScript Error Handler]: ' + msg + '- ' + error);
  router.push({ name: 'error'});
}

// Vue related errors
Vue.config.errorHandler = function (err, vm, info) {
  console.log('[Vue Error Handler]: Error in ' + info + ': ' + err);
//  router.push({ name: 'error'});
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
