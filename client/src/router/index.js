import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由的懒加载
const IndexPage = () => import('../views/index/IndexPage')
const guestpage = () => import('../views/guest/GuestPage')
const storepage = () => import('../views/store/StorePage')
const orderform = () => import('../views/guest/OrderForm.vue')
const adminpage = () => import('../views/admin/adminPage.vue')
const messageboard = () => import('../components/content/MessageBoard.vue')


//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path: '',
    component: IndexPage
  },
  {
    path: '/guestpage', 
    component: guestpage 
  },
  {
    path: '/storepage', 
    component: storepage 
  },
  {
    path: '/messageboard',
    component: messageboard
  },
  {
    path: '/orderform',
    component: orderform
  },
  {
    path: '/adminpage',
    component: adminpage
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出
export default router