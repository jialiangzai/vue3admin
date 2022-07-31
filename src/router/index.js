import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
let LayOut = () => import('@/views/LayOut')
// 路由配置
const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/pages/login')
  },
  {
    path: '/',
    name: 'LayOut',
    component: LayOut,
    redirect:'/index',
      children:[
        {
          path:"/index",
          name:"index",
          component:()=>import("../views/pages/index.vue")
        }, 
        {
          path:"/roles",
          name:"roles",
          component:()=>import("../views/pages/rolesList")
        }, 
        {
          path:"/user",
          name:"user",
          component:()=>import("../views/pages/usersList")
        },
        {
          path:"/goods",
          name:"goods",
          component:()=>import("../views/pages/goodsList")
        }
      ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
