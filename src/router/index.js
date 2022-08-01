import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
let LayOut = () => import('@/views/LayOut')
// 路由配置
import store from '../store'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/login')
  },
  {
    path: '/',
    name: 'LayOut',
    component: LayOut,
    redirect: '/index',
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../views/pages/index.vue")
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import("../views/pages/rolesList")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/pages/usersList")
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/pages/goodsList")
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const uInfo = store.state.uInfo.userInfo
  if (!uInfo.username) {
    // 未登录,跳转到login 
    if (to.path === "/login") {
      next()
      return
    }
    next("/login")

  } else {

    next()
  }
})
export default router
