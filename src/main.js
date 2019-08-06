import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios' 
import store from './store'
import Vuex from 'vuex' 
import './registerServiceWorker'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(router)
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://192.168.1.188:12';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//添加请求拦截器
axios.interceptors.request.use(function(config){
  //在发送请求之前做某事
  config.headers.Authorization =sessionStorage.getItem("token_type")
  return config
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response){
  //对响应数据做些事
  return  response;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
})
