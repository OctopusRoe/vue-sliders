import Vue from 'vue'
import VueRouter from 'vue-router'
import test from '../pages/test.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', name: 'test', component: test }
]

const router = new VueRouter({
  routes
})

export default router
