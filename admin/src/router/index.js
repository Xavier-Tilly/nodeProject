import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect:'/categoryEdit',
    children:[{
      path:'/categoryEdit',
      name:'categoryEdit',
      component:()=>import('../views/CategoryEdit.vue')
    },
    {
      path:'/categoryList',
      name:'categoryList',
      component:()=>import('../views/CategoryList.vue')
    },
    {
      path:'/charts',
      name:'charts',
      component:()=>import('../views/Charts.vue')
    }
  ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
