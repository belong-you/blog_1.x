import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '鹏北海，凤朝阳。又携键盘两茫茫。'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'belong-you | 首页'
    }
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: () => import('../views/Dynamic'),
    meta: {
      title: 'belong-you | 动态文章'
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/Article'),
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('../views/Note'),
    redirect: '/note/webLabel',
    children: [
      {
        path: 'webLabel',
        name: 'WebLabel',
        component: () => import('../views/WebLabel'),
        meta: {
          title: 'belong-you | 个人笔记'
        },
      },
      {
        path: 'webPage/:id',
        name: 'WebPage',
        component: () => import('../views/WebPage'),
        meta: {
          title: 'belong-you | 个人笔记'
        },
      },
    ]
  },
  {
    path: '/stay',
    name: 'Stay',
    component: () => import('../views/Stay'),
    meta: {
      title: 'belong-you | 访客留言'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About'),
    meta: {
      title: 'belong-you | 关于博客'
    }
  },
  {
    path: '/notFound',
    name: 'NotFound',
    component: () => import('../views/NotFound'),
    meta: {
      title: '找不到该页面'
    }
  },
  {
    path: '*',
    redirect (to) {
      return '/NotFound'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;  // 设置 title 值
  next();
})

export default router
