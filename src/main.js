import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from './router'
//引入MOCK
import './api/mock'
//引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入vuex
import store from "./store";
//引入cookie
import Cookie from 'js-cookie'

Vue.config.productionTip = false;

//element-ui
Vue.use(ElementUI);
// Vue.use(router)

// 添加全局前置导航守卫
router.beforeEach(( to, from, next)=>{
    //token存不存在
 const token =  Cookie.get('token')
    //token不存在，说明没有登录。
    if(!token && to.name !== 'login'){
      next({name:'login'})
  }else if(token && to.name === 'login'){ //token存在，说明用户登录，此时跳转至首页
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
