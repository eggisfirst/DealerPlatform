import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Register',
    component: resolve => require(['../pages/Register'], resolve)
  },{
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../pages/Login'], resolve)
  }
]
})