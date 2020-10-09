import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/login',
    children: [{
        path: '/categoryEdit',
        name: 'categoryEdit',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: '/categoryList',
        name: 'categoryList',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: '/charts',
        name: 'charts',
        component: () => import('../views/Charts.vue')
      },
      {
        path: '/picture',
        name: 'picture',
        component: () => import('../views/Picture.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
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

// router.beforeEach((to, from, next) => {
//   console.log(to.meta)
//   let username = sessionStorage.getItem('username');
//   let password = sessionStorage.getItem('password');
//   if (username&&password) {
//   return next('/login')
//   }
//   next()
// })
export default router