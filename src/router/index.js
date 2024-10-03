import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/',
      name: 'homepage',
      meta: {
        requireAuth: true
      },
      component: () => import('../layout/LayoutIndex.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/welcome/WelecomeIndex.vue')
        },
        {
          path: 'books',
          name: 'books',
          component: () => import('@/views/books/BookIndex.vue')
        },
        {
          path: '/books/price',
          component: () => import('@/views/books/price.vue')
        },
        {
          path: '/books/delete',
          component: () => import('@/views/books/delete.vue')
        },
        {
          path: '/books/new',
          component: () => import('@/views/books/new.vue')
        },        
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/users/UserIndex.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/users/password.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/LoginIndex.vue')
    }
    // {
    //   path: '/books',
    //   name: 'books',
    //   component: () => import('@/views/books/BookIndex.vue')
    // }
  ]
})

export default router
